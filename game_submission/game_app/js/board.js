// ===================================
// EcoPoly: Board and Strategic Actions
// ===================================

// Strategic Actions
function investInnovation() {
    const player = getCurrentPlayer();
    const cost = 300;
    
    if (player.ecoCredits < cost) {
        addLog(`❌ ${player.name} can't afford Innovation Investment (need ${cost} Credits)`);
        return;
    }
    
    player.ecoCredits -= cost;
    addLog(`💡 ${player.name} invested in innovation for ${cost} Credits (draws Green Card benefit)`);
    
    // Draw a green card
    if (gameState.greenDeck.length === 0) {
        gameState.greenDeck = shuffleArray([...greenCardDefinitions]);
    }
    
    const card = gameState.greenDeck.pop();
    
    // Show card modal
    const modal = document.getElementById('cardModal');
    const overlay = document.getElementById('modalOverlay');
    
    document.getElementById('cardType').textContent = '💡 Innovation Result';
    document.getElementById('cardText').textContent = card.text;
    document.getElementById('cardEffect').textContent = formatCardEffect(card.effect);
    
    const optionsContainer = document.getElementById('cardOptions');
    optionsContainer.innerHTML = '';
    
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Apply Effect';
    btn.onclick = () => {
        applyCardEffect(card.effect);
        closeModal();
    };
    optionsContainer.appendChild(btn);
    
    modal.classList.add('active');
    overlay.classList.add('active');
    
    updateUI();
}

function launchCampaign() {
    const player = getCurrentPlayer();
    const cost = 150;
    
    if (player.ecoCredits < cost) {
        addLog(`❌ ${player.name} can't afford Campaign (need ${cost} Credits)`);
        return;
    }
    
    player.ecoCredits -= cost;
    player.communityInfluence += 3;
    
    addLog(`📢 ${player.name} launched awareness campaign for ${cost} Credits (+3 Community Influence)`, 'important');
    updateUI();
}

function offsetEmissions() {
    const player = getCurrentPlayer();
    
    if (player.carbonTokens === 0) {
        addLog(`❌ ${player.name} has no carbon emissions to offset`);
        return;
    }
    
    const costPerToken = 100;
    const maxOffset = Math.min(player.carbonTokens, Math.floor(player.ecoCredits / costPerToken));
    
    if (maxOffset === 0) {
        addLog(`❌ ${player.name} can't afford to offset any emissions (need ${costPerToken} Credits per token)`);
        return;
    }
    
    // Show modal to choose how many to offset
    const modal = document.getElementById('propertyModal');
    const overlay = document.getElementById('modalOverlay');
    
    document.getElementById('propertyName').textContent = '♻️ Offset Emissions';
    document.getElementById('propertyDescription').textContent = 
        `You have ${player.carbonTokens} Carbon Token${player.carbonTokens > 1 ? 's' : ''}\nCost: ${costPerToken} Credits per token\nYou can afford to offset: ${maxOffset} token${maxOffset > 1 ? 's' : ''}\n\nRemoving CO2 saves you 5 GIS points per token at game end!`;
    
    const optionsContainer = document.getElementById('propertyOptions');
    optionsContainer.innerHTML = '';
    
    for (let i = 1; i <= maxOffset; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-secondary';
        btn.textContent = `Offset ${i} token${i > 1 ? 's' : ''} (${i * costPerToken} Credits)`;
        btn.onclick = () => {
            player.ecoCredits -= i * costPerToken;
            player.carbonTokens -= i;
            gameState.globalCO2 = Math.max(0, gameState.globalCO2 - i);
            addLog(`♻️ ${player.name} offset ${i} Carbon Token${i > 1 ? 's' : ''} for ${i * costPerToken} Credits (saves ${i * 5} GIS!)`, 'important');
            updateUI();
            closeModal();
        };
        optionsContainer.appendChild(btn);
    }
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = closeModal;
    optionsContainer.appendChild(cancelBtn);
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function lobbyPolicy() {
    const player = getCurrentPlayer();
    
    if (player.hasUsedLobby) {
        addLog(`❌ ${player.name} has already used their Lobby action this game`);
        return;
    }
    
    addLog(`🏛️ ${player.name} proposes a policy change...`, 'important');
    player.hasUsedLobby = true;
    
    // Show policy selection
    const modal = document.getElementById('propertyModal');
    const overlay = document.getElementById('modalOverlay');
    
    document.getElementById('propertyName').textContent = '🏛️ Lobby for Policy';
    document.getElementById('propertyDescription').textContent = 
        'Choose a policy to propose. Other players will vote.';
    
    const optionsContainer = document.getElementById('propertyOptions');
    optionsContainer.innerHTML = '';
    
    // Show a few policy options
    const policies = [
        { name: 'Eco Property Bonus', desc: 'All Eco properties earn +100 Credits', effect: 'ecoBonus' },
        { name: 'Carbon Penalty', desc: 'Players with CO2 > 5 lose 200 Credits', effect: 'carbonPenalty' },
        { name: 'Green Tech Grant', desc: 'All players gain +5 SS', effect: 'ssBonus' }
    ];
    
    policies.forEach(policy => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-secondary';
        btn.innerHTML = `<strong>${policy.name}</strong><br><small>${policy.desc}</small>`;
        btn.onclick = () => {
            proposeCustomPolicy(policy);
            closeModal();
        };
        optionsContainer.appendChild(btn);
    });
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = () => {
        player.hasUsedLobby = false;
        closeModal();
    };
    optionsContainer.appendChild(cancelBtn);
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function proposeCustomPolicy(policy) {
    // Initialize voting data for custom policy
    gameState.customPolicyVoting = {
        policy: policy,
        votes: [],
        currentVoterIndex: 0,
        yesVotes: 0,
        noVotes: 0,
        isCustomPolicy: true
    };
    
    addLog(`🏛️ Policy proposed: "${policy.name}" - ${policy.desc}`, 'important');
    addLog(`🗳️ Voting begins for all players...`, 'important');
    
    // Start sequential voting
    showNextCustomPolicyVoter();
}

function showNextCustomPolicyVoter() {
    const votingData = gameState.customPolicyVoting;
    const voteCount = votingData.votes.length;
    
    // Check if all players have voted
    if (voteCount >= gameState.numPlayers) {
        finalizeCustomPolicyVote();
        return;
    }
    
    // Find next player who hasn't voted
    let nextPlayerIndex = -1;
    for (let i = 0; i < gameState.numPlayers; i++) {
        const hasVoted = votingData.votes.some(v => v.player === gameState.players[i].name);
        if (!hasVoted) {
            nextPlayerIndex = i;
            break;
        }
    }
    
    if (nextPlayerIndex === -1) {
        finalizeCustomPolicyVote();
        return;
    }
    
    const voter = gameState.players[nextPlayerIndex];
    const policy = votingData.policy;
    const voterInfluence = voter.communityInfluence || 1;
    
    // Always show voting modal for interactive gameplay
    // This allows multiplayer where all players can vote
    showCustomPolicyVotingModal(voter, nextPlayerIndex, policy, voterInfluence);
}

function showCustomPolicyVotingModal(voter, playerIndex, policy, influence) {
    const modal = document.getElementById('actionModal');
    const overlay = document.getElementById('modalOverlay');
    
    modal.innerHTML = `
        <h2>🗳️ Voting Time: ${voter.name}</h2>
        <div class="policy-vote-info">
            <h3>${policy.name}</h3>
            <p>${policy.desc}</p>
            <div class="vote-stats">
                <p><strong>Your Influence:</strong> ${influence} vote(s)</p>
                <p><strong>Current Tally:</strong></p>
                <p>👍 Yes: ${gameState.customPolicyVoting.yesVotes} | 👎 No: ${gameState.customPolicyVoting.noVotes}</p>
            </div>
        </div>
    `;
    
    const votingDiv = document.createElement('div');
    votingDiv.className = 'modal-actions';
    modal.appendChild(votingDiv);
    
    const yesBtn = document.createElement('button');
    yesBtn.className = 'btn btn-primary';
    yesBtn.textContent = `👍 Vote Yes (${influence} vote${influence > 1 ? 's' : ''})`;
    yesBtn.onclick = () => {
        recordCustomPolicyVote(voter, 'yes', influence);
        closeModal();
        showNextCustomPolicyVoter();
    };
    
    const noBtn = document.createElement('button');
    noBtn.className = 'btn btn-secondary';
    noBtn.textContent = `👎 Vote No (${influence} vote${influence > 1 ? 's' : ''})`;
    noBtn.onclick = () => {
        recordCustomPolicyVote(voter, 'no', influence);
        closeModal();
        showNextCustomPolicyVoter();
    };
    
    // Add AI auto-vote button for single-player convenience
    const aiBtn = document.createElement('button');
    aiBtn.className = 'btn btn-secondary';
    aiBtn.textContent = '🤖 AI Decides';
    aiBtn.style.opacity = '0.7';
    aiBtn.onclick = () => {
        const aiVote = determineCustomPolicyAIVote(voter, policy);
        recordCustomPolicyVote(voter, aiVote, influence);
        closeModal();
        showNextCustomPolicyVoter();
    };
    
    votingDiv.appendChild(yesBtn);
    votingDiv.appendChild(noBtn);
    votingDiv.appendChild(aiBtn);
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function determineCustomPolicyAIVote(player, policy) {
    let aiVote = 'no';
    const voteChance = Math.random();
    
    if (policy.effect === 'ecoBonus') {
        const ecoCount = player.properties.filter(propId => {
            const prop = gameState.boardSpaces[propId];
            return prop && prop.path === 'eco';
        }).length;
        
        if (ecoCount > 0 || voteChance > 0.4) {
            aiVote = 'yes';
        }
    } else if (policy.effect === 'carbonPenalty') {
        if (player.carbonTokens <= 5 || voteChance > 0.5) {
            aiVote = 'yes';
        }
    } else if (policy.effect === 'ssBonus') {
        if (voteChance > 0.4) {
            aiVote = 'yes';
        }
    }
    
    return aiVote;
}

function recordCustomPolicyVote(player, vote, influence) {
    const votingData = gameState.customPolicyVoting;
    
    votingData.votes.push({
        player: player.name,
        vote: vote,
        influence: influence
    });
    
    if (vote === 'yes') {
        votingData.yesVotes += influence;
    } else {
        votingData.noVotes += influence;
    }
    
    addLog(`${player.name} votes: ${vote === 'yes' ? '👍 Yes' : '👎 No'} (Influence: ${influence})`);
}

function finalizeCustomPolicyVote() {
    const votingData = gameState.customPolicyVoting;
    const policy = votingData.policy;
    
    addLog(`🗳️ Final Results: "${policy.name}" - Yes: ${votingData.yesVotes}, No: ${votingData.noVotes}`, 'important');
    
    if (votingData.yesVotes > votingData.noVotes) {
        addLog(`✅ Policy "${policy.name}" passed!`, 'important');
        applyCustomPolicy(policy);
    } else {
        addLog(`❌ Policy "${policy.name}" rejected`);
    }
    
    // Clean up voting data
    delete gameState.customPolicyVoting;
}

function applyCustomPolicy(policy) {
    switch (policy.effect) {
        case 'ecoBonus':
            gameState.players.forEach(p => {
                let ecoCount = 0;
                p.properties.forEach(propId => {
                    const prop = gameState.boardSpaces[propId];
                    if (prop && prop.path === 'eco') {
                        ecoCount++;
                    }
                });
                if (ecoCount > 0) {
                    p.ecoCredits += 100 * ecoCount;
                    addLog(`💚 ${p.name} received ${100 * ecoCount} Credits from Eco Property Bonus`);
                }
            });
            break;
            
        case 'carbonPenalty':
            gameState.players.forEach(p => {
                if (p.carbonTokens > 5) {
                    p.ecoCredits = Math.max(0, p.ecoCredits - 200);
                    addLog(`💸 ${p.name} penalized 200 Credits for high carbon pollution`);
                }
            });
            break;
            
        case 'ssBonus':
            gameState.players.forEach(p => {
                p.sustainabilityScore += 5;
            });
            addLog(`🌱 All players gained +5 Sustainability Score`);
            break;
    }
    
    updateUI();
}

// End Game
function endGame() {
    addLog('🏁 Game Over! Calculating final scores...', 'important');
    
    // Calculate Global Impact Score for each player
    const results = gameState.players.map(player => {
        const gis = player.sustainabilityScore + 
                    Math.floor(player.ecoCredits / 100) + 
                    player.communityInfluence - 
                    (player.carbonTokens * 5);
        
        return {
            player: player,
            gis: gis
        };
    });
    
    // Sort by GIS (highest first)
    results.sort((a, b) => {
        if (b.gis !== a.gis) return b.gis - a.gis;
        if (a.player.carbonTokens !== b.player.carbonTokens) 
            return a.player.carbonTokens - b.player.carbonTokens;
        return b.player.ecoCredits - a.player.ecoCredits;
    });
    
    // Show results screen
    showScreen('results');
    displayResults(results);
}

function displayResults(results) {
    const container = document.getElementById('resultsContent');
    container.innerHTML = '';
    
    // Winner announcement
    const winner = results[0];
    const winnerDiv = document.createElement('div');
    winnerDiv.className = 'winner-announcement';
    winnerDiv.innerHTML = `
        🏆 ${winner.player.token} ${winner.player.name} Wins! 🏆
        <br>Global Impact Score: ${winner.gis}
    `;
    container.appendChild(winnerDiv);
    
    // All players results
    results.forEach((result, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-result';
        if (index === 0) playerDiv.classList.add('winner');
        
        playerDiv.innerHTML = `
            <div class="player-result-header">
                ${index + 1}. ${result.player.token} ${result.player.name}
            </div>
            <div class="player-result-stats">
                <div><strong>Global Impact Score:</strong> ${result.gis}</div>
                <div><strong>Sustainability Score:</strong> ${result.player.sustainabilityScore}</div>
                <div><strong>EcoCredits:</strong> ${result.player.ecoCredits} Credits</div>
                <div><strong>Community Influence:</strong> ${result.player.communityInfluence}</div>
                <div><strong>Carbon Tokens:</strong> ${result.player.carbonTokens} 🏭</div>
                <div><strong>Properties Owned:</strong> ${result.player.properties.length}</div>
            </div>
        `;
        
        container.appendChild(playerDiv);
    });
    
    // Check co-op mode
    if (gameState.gameMode === 'coop') {
        const coopDiv = document.createElement('div');
        coopDiv.className = 'winner-announcement';
        if (gameState.globalCO2 < 40) {
            coopDiv.innerHTML = `✅ Co-op Victory! Global CO2: ${gameState.globalCO2} < 40`;
            coopDiv.style.background = 'rgba(46, 204, 113, 0.2)';
        } else {
            coopDiv.innerHTML = `❌ Co-op Defeat! Global CO2: ${gameState.globalCO2} >= 40`;
            coopDiv.style.background = 'rgba(231, 76, 60, 0.2)';
        }
        container.insertBefore(coopDiv, container.firstChild);
    }
}

// Property Management Functions
function upgradeProperty(propertyId) {
    const player = getCurrentPlayer();
    const property = gameState.boardSpaces[propertyId];
    
    if (!property || property.owner !== player.id) {
        addLog('❌ You do not own this property');
        return;
    }
    
    // Ensure upgrades property exists
    if (property.upgrades === undefined) {
        property.upgrades = 0;
    }
    
    const upgradeCost = 150 + (property.upgrades * 50);
    
    if (player.ecoCredits < upgradeCost) {
        addLog(`❌ Cannot afford upgrade (need ${upgradeCost} Credits)`);
        return;
    }
    
    player.ecoCredits -= upgradeCost;
    property.upgrades++;
    
    // Calculate new rent
    const newRent = property.path === 'eco' 
        ? (100 + property.upgrades * 50) 
        : (200 + property.upgrades * 75);
    
    if (property.path === 'eco') {
        player.sustainabilityScore += 3;
        addLog(`⬆️ ${player.name} upgraded ${property.name} to Level ${property.upgrades} | New rent: ${newRent} Credits | +3 SS bonus!`, 'important');
    } else {
        addLog(`⬆️ ${player.name} upgraded ${property.name} to Level ${property.upgrades} | New rent: ${newRent} Credits`, 'important');
    }
    
    updateUI();
    renderBoard();
}

function convertPropertyToEco(propertyId) {
    const player = getCurrentPlayer();
    const property = gameState.boardSpaces[propertyId];
    
    if (!property || property.owner !== player.id) {
        addLog('❌ You do not own this property');
        return;
    }
    
    if (property.path === 'eco') {
        addLog('❌ Property is already Eco');
        return;
    }
    
    const conversionCost = 200 + (property.upgrades * 100);
    
    if (player.ecoCredits < conversionCost) {
        addLog(`❌ Cannot afford conversion (need ${conversionCost} Credits)`);
        return;
    }
    
    player.ecoCredits -= conversionCost;
    property.path = 'eco';
    player.sustainabilityScore += 8;
    
    // Remove CO2 generation
    player.carbonTokens = Math.max(0, player.carbonTokens - 1);
    gameState.globalCO2 = Math.max(0, gameState.globalCO2 - 1);
    
    addLog(`♻️ ${player.name} converted ${property.name} to Eco Path! (lower rent, +8 SS, -1 CO2)`, 'important');
    updateUI();
    renderBoard();
}
