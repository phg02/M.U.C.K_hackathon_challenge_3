// ===================================
// EcoPoly: Cards and Events System
// ===================================

// Initialize Card Decks
function initializeCards() {
    gameState.greenDeck = shuffleArray([...greenCardDefinitions]);
    gameState.crisisDeck = shuffleArray([...crisisCardDefinitions]);
    gameState.policyDeck = shuffleArray([...policyCardDefinitions]);
}

// Green Cards (Positive Events)
const greenCardDefinitions = [
    {
        text: "You invent a plastic-eating enzyme!",
        effect: { carbonTokens: -2, sustainabilityScore: 10 }
    },
    {
        text: "Government funds your recycling hub.",
        effect: { ecoCredits: 250 }
    },
    {
        text: "Your solar panels win efficiency award.",
        effect: { ecoCredits: 200, sustainabilityScore: 5 }
    },
    {
        text: "Community volunteers help plant trees in your area.",
        effect: { sustainabilityScore: 8, communityInfluence: 2 }
    },
    {
        text: "Your green building becomes a tourist attraction.",
        effect: { ecoCredits: 300, communityInfluence: 3 }
    },
    {
        text: "Breakthrough in carbon capture technology!",
        effect: { carbonTokens: -3, sustainabilityScore: 12 }
    },
    {
        text: "International sustainability prize awarded to you.",
        effect: { ecoCredits: 400, sustainabilityScore: 10, communityInfluence: 5 }
    },
    {
        text: "Your advocacy leads to new green tax incentives.",
        effect: { ecoCredits: 150, communityInfluence: 4 }
    },
    {
        text: "Local university studies your eco project.",
        effect: { sustainabilityScore: 6, communityInfluence: 3 }
    },
    {
        text: "Energy company buys your renewable tech patent.",
        effect: { ecoCredits: 500 }
    },
    {
        text: "You develop a zero-waste manufacturing process.",
        effect: { carbonTokens: -1, sustainabilityScore: 8, ecoCredits: 200 }
    },
    {
        text: "Your wetland restoration attracts rare species.",
        effect: { sustainabilityScore: 10, communityInfluence: 2 }
    },
    {
        text: "Clean energy initiative grants funding.",
        effect: { ecoCredits: 350 }
    },
    {
        text: "Your bike share program becomes city model.",
        effect: { sustainabilityScore: 7, communityInfluence: 4 }
    },
    {
        text: "Rainwater harvesting system saves thousands.",
        effect: { ecoCredits: 100, sustainabilityScore: 5 }
    },
    {
        text: "Carbon Capture Breakthrough: Reduce emissions by 20 Carbon Units and gain +20 Sustainability Points.",
        effect: { carbonTokens: -20, sustainabilityScore: 20 }
    },
    {
        text: "Green Investment Fund: Collect 300 Credits if you own at least one renewable energy project.",
        effect: { ecoCredits: 300, conditionalOnProperty: 'renewable' }
    },
    {
        text: "Eco Trade Incentives: Gain +10 Sustainability Points and +150 Credits from reduced tariffs.",
        effect: { sustainabilityScore: 10, ecoCredits: 150 }
    },
    {
        text: "Reforestation Initiative: Gain +15 Sustainability Points, reduce emissions by 10 Carbon Units.",
        effect: { sustainabilityScore: 15, carbonTokens: -10 }
    }
];

// Crisis Cards (Challenging Events)
const crisisCardDefinitions = [
    {
        text: "Mega drought hits the region!",
        options: [
            { choice: "Pay for water conservation → Lose 150 Credits", effect: { ecoCredits: -150 } },
            { choice: "Accept impact → Lose 5 Sustainability Score", effect: { sustainabilityScore: -5 } }
        ]
    },
    {
        text: "Flooding damages infrastructure.",
        options: [
            { choice: "Pay for repairs → Lose 200 Credits", effect: { ecoCredits: -200 } },
            { choice: "Abandon temporarily → Lose 8 SS, +1 CO2 pollution", effect: { sustainabilityScore: -8, carbonTokens: 1 } }
        ]
    },
    {
        text: "Heatwave causes energy crisis.",
        options: [
            { choice: "Invest in cooling → Lose 100 Credits", effect: { ecoCredits: -100 } },
            { choice: "Suffer losses → Lose 150 Credits AND -3 SS", effect: { ecoCredits: -150, sustainabilityScore: -3 } }
        ]
    },
    {
        text: "Wildfire threatens your properties!",
        options: [
            { choice: "Emergency fireproofing → Lose 250 Credits", effect: { ecoCredits: -250 } },
            { choice: "Risk the damage → Lose 10 Sustainability Score", effect: { sustainabilityScore: -10 } }
        ]
    },
    {
        text: "Sea level rise affects coastal zones.",
        options: [
            { choice: "Build sea walls → Lose 300 Credits, Gain +3 SS", effect: { ecoCredits: -300, sustainabilityScore: 3 } },
            { choice: "Relocate operations → Lose 200 Credits, +1 CO2", effect: { ecoCredits: -200, carbonTokens: 1 } }
        ]
    },
    {
        text: "Air pollution reaches dangerous levels.",
        options: [
            { choice: "Install air filters → Lose 150 Credits, Gain +5 SS", effect: { ecoCredits: -150, sustainabilityScore: 5 } },
            { choice: "Accept health costs → Lose 2 Influence, -5 SS", effect: { communityInfluence: -2, sustainabilityScore: -5 } }
        ]
    },
    {
        text: "Supply chain disruption due to climate events.",
        options: [
            { choice: "Source locally → Lose 200 Credits, Gain +4 SS", effect: { ecoCredits: -200, sustainabilityScore: 4 } },
            { choice: "Wait it out → Lose 100 Credits", effect: { ecoCredits: -100 } }
        ]
    },
    {
        text: "Species extinction in your natural zone.",
        options: [
            { choice: "Fund conservation → Lose 180 Credits, Gain +8 SS", effect: { ecoCredits: -180, sustainabilityScore: 8 } },
            { choice: "Accept reality → Lose 7 SS, -2 Influence", effect: { sustainabilityScore: -7, communityInfluence: -2 } }
        ]
    },
    {
        text: "Extreme storm damages renewable energy.",
        options: [
            { choice: "Rebuild stronger → Lose 250 Credits, Gain +6 SS", effect: { ecoCredits: -250, sustainabilityScore: 6 } },
            { choice: "Basic repairs → Lose 100 Credits only", effect: { ecoCredits: -100 } }
        ]
    },
    {
        text: "Pollution scandal at one of your sites!",
        options: [
            { choice: "Clean up & compensate → Lose 300 Credits, -1 Influence", effect: { ecoCredits: -300, communityInfluence: -1 } },
            { choice: "Deny responsibility → Lose 5 Influence, -10 SS", effect: { communityInfluence: -5, sustainabilityScore: -10 } }
        ]
    },
    {
        text: "Invasive species threaten ecosystem.",
        options: [
            { choice: "Eradication program → Lose 150 Credits, Gain +5 SS", effect: { ecoCredits: -150, sustainabilityScore: 5 } },
            { choice: "Let nature balance → Lose 6 Sustainability Score", effect: { sustainabilityScore: -6 } }
        ]
    },
    {
        text: "Soil degradation reduces productivity.",
        options: [
            { choice: "Regenerative agriculture → Lose 200 Credits, Gain +7 SS", effect: { ecoCredits: -200, sustainabilityScore: 7 } },
            { choice: "Use more fertilizers → +1 CO2 pollution, -4 SS", effect: { carbonTokens: 1, sustainabilityScore: -4 } }
        ]
    },
    {
        text: "Global Recession: All players lose 200 Credits; trade income halved for one round.",
        options: [
            { choice: "Accept economic loss → Lose 200 Credits", effect: { ecoCredits: -200 } },
            { choice: "Emergency funds → Lose 150 Credits, -3 SS", effect: { ecoCredits: -150, sustainabilityScore: -3 } }
        ]
    },
    {
        text: "Drought Crisis: Lose 100 Credits and 5 Sustainability Points unless you own a water-related project.",
        options: [
            { choice: "Emergency water imports → Lose 100 Credits, -5 SS", effect: { ecoCredits: -100, sustainabilityScore: -5 } },
            { choice: "Strict rationing → Lose 50 Credits, -8 SS", effect: { ecoCredits: -50, sustainabilityScore: -8 } }
        ]
    },
    {
        text: "Carbon Market Collapse: Carbon Unit price drops temporarily for two rounds.",
        options: [
            { choice: "Hold carbon assets → Lose 150 Credits", effect: { ecoCredits: -150 } },
            { choice: "Sell at loss → Lose 200 Credits, -5 SS", effect: { ecoCredits: -200, sustainabilityScore: -5 } }
        ]
    },
    {
        text: "Extreme Weather Disaster: Lose 150 Credits and 10 Sustainability Points.",
        options: [
            { choice: "Emergency response → Lose 150 Credits, -10 SS", effect: { ecoCredits: -150, sustainabilityScore: -10 } },
            { choice: "Minimal response → Lose 100 Credits, -15 SS", effect: { ecoCredits: -100, sustainabilityScore: -15 } }
        ]
    }
];

// Policy Cards (For Global Summit)
const policyCardDefinitions = [
    {
        name: "Carbon Tax",
        description: "Each player pays 50 Credits per Carbon Token they own",
        type: "tax",
        effect: { carbonCost: 50 }
    },
    {
        name: "Green Innovation Fund",
        description: "Players with SS >= 60 receive 200 Credits",
        type: "bonus",
        effect: { ssThreshold: 60, payout: 200 }
    },
    {
        name: "Mandatory Emissions Reduction",
        description: "All players lose 1 Carbon Token",
        type: "reduction",
        effect: { carbonReduction: 1 }
    },
    {
        name: "Renewable Energy Subsidy",
        description: "Eco properties generate +50 Credits bonus this round",
        type: "subsidy",
        effect: { ecoBonus: 50 }
    },
    {
        name: "Industrial Shutdown",
        description: "All Industrial properties generate no income for 2 rounds",
        type: "penalty",
        effect: { industrialShutdown: 2 }
    },
    {
        name: "Community Action Grant",
        description: "All players gain +2 Community Influence",
        type: "bonus",
        effect: { ciBonus: 2 }
    },
    {
        name: "Climate Emergency Declaration",
        description: "Double SS gain/loss from all actions for 3 rounds",
        type: "modifier",
        effect: { ssMultiplier: 2, duration: 3 }
    },
    {
        name: "Reforestation Initiative",
        description: "Players with Natural zone properties gain +5 SS",
        type: "bonus",
        effect: { zoneBonus: 'natural', ssBonus: 5 }
    }
];

// Draw a Card
function drawCard(cardType) {
    let card, deck, deckName;
    
    if (cardType === 'green') {
        deck = gameState.greenDeck;
        deckName = 'Green Card';
    } else if (cardType === 'crisis') {
        deck = gameState.crisisDeck;
        deckName = 'Crisis Card';
    } else {
        return completeTurnResolution();
    }
    
    if (deck.length === 0) {
        // Reshuffle if empty
        if (cardType === 'green') {
            gameState.greenDeck = shuffleArray([...greenCardDefinitions]);
            deck = gameState.greenDeck;
        } else {
            gameState.crisisDeck = shuffleArray([...crisisCardDefinitions]);
            deck = gameState.crisisDeck;
        }
    }
    
    card = deck.pop();
    showCardModal(card, cardType);
}

function showCardModal(card, cardType) {
    const modal = document.getElementById('cardModal');
    const overlay = document.getElementById('modalOverlay');
    
    document.getElementById('cardType').textContent = 
        cardType === 'green' ? '🌱 Green Card - Positive Event!' : '⚠️ Crisis Card - Tough Choice!';
    document.getElementById('cardText').textContent = card.text;
    
    const optionsContainer = document.getElementById('cardOptions');
    optionsContainer.innerHTML = '';
    
    if (card.effect) {
        // Green card - automatic effect
        const effectText = formatCardEffect(card.effect);
        document.getElementById('cardEffect').innerHTML = effectText;
        
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.textContent = '✅ Accept & Continue';
        btn.onclick = () => {
            applyCardEffect(card.effect);
            closeModal();
            completeTurnResolution();
        };
        optionsContainer.appendChild(btn);
        
    } else if (card.options) {
        // Crisis card - player choice
        document.getElementById('cardEffect').innerHTML = '<strong>Choose your response:</strong>';
        
        card.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary';
            btn.textContent = option.choice;
            btn.onclick = () => {
                applyCardEffect(option.effect);
                closeModal();
                completeTurnResolution();
            };
            optionsContainer.appendChild(btn);
        });
    }
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function formatCardEffect(effect) {
    let text = 'Effect: ';
    const parts = [];
    
    if (effect.ecoCredits) {
        if (effect.ecoCredits > 0) {
            parts.push(`💰 Gain ${effect.ecoCredits} EcoCredits (money to buy properties and actions)`);
        } else {
            parts.push(`💸 Lose ${Math.abs(effect.ecoCredits)} EcoCredits (spend money)`);
        }
    }
    if (effect.sustainabilityScore) {
        if (effect.sustainabilityScore > 0) {
            parts.push(`🌱 Gain +${effect.sustainabilityScore} Sustainability Score (helps win! Each SS point = +1 GIS)`);
        } else {
            parts.push(`🌱 Lose ${effect.sustainabilityScore} Sustainability Score (hurts your GIS! Each SS point = +1 GIS)`);
        }
    }
    if (effect.communityInfluence) {
        if (effect.communityInfluence > 0) {
            parts.push(`👥 Gain +${effect.communityInfluence} Community Influence (political power for voting & lobbying)`);
        } else {
            parts.push(`👥 Lose ${Math.abs(effect.communityInfluence)} Community Influence (less political power)`);
        }
    }
    if (effect.carbonTokens) {
        if (effect.carbonTokens > 0) {
            parts.push(`🏭 Gain +${effect.carbonTokens} Carbon Token${effect.carbonTokens > 1 ? 's' : ''} (pollution! Each token = -5 GIS at game end)`);
        } else {
            parts.push(`♻️ Remove ${Math.abs(effect.carbonTokens)} Carbon Token${Math.abs(effect.carbonTokens) > 1 ? 's' : ''} (clean air! Each removed = +5 GIS saved)`);
        }
    }
    
    return parts.length > 0 ? parts.join('\n') : 'No immediate effect';
}

function applyCardEffect(effect) {
    const player = getCurrentPlayer();
    
    if (effect.ecoCredits) {
        player.ecoCredits = Math.max(0, player.ecoCredits + effect.ecoCredits);
    }
    if (effect.sustainabilityScore) {
        player.sustainabilityScore += effect.sustainabilityScore;
    }
    if (effect.communityInfluence) {
        player.communityInfluence = Math.max(0, player.communityInfluence + effect.communityInfluence);
    }
    if (effect.carbonTokens) {
        player.carbonTokens = Math.max(0, player.carbonTokens + effect.carbonTokens);
        if (effect.carbonTokens > 0) {
            gameState.globalCO2 += effect.carbonTokens;
            checkCO2Thresholds();
        }
    }
    
    updateUI();
    addLog(`🃏 Card effect applied to ${player.name}`);
}

// Handle Carbon Tax
function handleCarbonTax() {
    const player = getCurrentPlayer();
    const taxRate = 50;
    const tax = player.carbonTokens * taxRate;
    
    if (tax > 0) {
        player.ecoCredits = Math.max(0, player.ecoCredits - tax);
        addLog(`💸 ${player.name} paid ${tax} Credits in Carbon Tax (${player.carbonTokens} tokens × ${taxRate} Credits each)`, 'important');
        updateUI();
    } else {
        addLog(`✅ ${player.name} has no carbon tax to pay!`);
    }
    
    completeTurnResolution();
}

// Handle Eco Fund
function handleEcoFund() {
    const player = getCurrentPlayer();
    const funding = 150;
    
    player.ecoCredits += funding;
    addLog(`💚 ${player.name} received ${funding} Credits from Eco Fund`, 'important');
    updateUI();
    
    completeTurnResolution();
}

// Handle Global Summit
function handleGlobalSummit() {
    if (gameState.policyDeck.length === 0) {
        gameState.policyDeck = shuffleArray([...policyCardDefinitions]);
    }
    
    const policy = gameState.policyDeck.pop();
    showGlobalSummitModal(policy);
}

function showGlobalSummitModal(policy) {
    const modal = document.getElementById('summitModal');
    const overlay = document.getElementById('modalOverlay');
    
    const proposalDiv = document.getElementById('policyProposal');
    proposalDiv.innerHTML = `
        <h4>${policy.name}</h4>
        <p>${policy.description}</p>
    `;
    
    const votingDiv = document.getElementById('votingArea');
    votingDiv.innerHTML = '<h4>Vote:</h4>';
    
    const yesBtn = document.createElement('button');
    yesBtn.className = 'btn btn-primary';
    yesBtn.textContent = '✅ Vote Yes';
    yesBtn.onclick = () => {
        closeModal();
        conductVote(policy, 'yes');
    };
    
    const noBtn = document.createElement('button');
    noBtn.className = 'btn btn-secondary';
    noBtn.textContent = '❌ Vote No';
    noBtn.onclick = () => {
        closeModal();
        conductVote(policy, 'no');
    };
    
    votingDiv.appendChild(yesBtn);
    votingDiv.appendChild(noBtn);
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function conductVote(policy, firstPlayerVote) {
    console.log('=== CONDUCT VOTE STARTED ===');
    console.log('Policy:', policy.name);
    console.log('First player vote:', firstPlayerVote);
    console.log('Current player:', getCurrentPlayer().name);
    console.log('Total players in game:', gameState.numPlayers);
    
    // Initialize voting data
    gameState.votingInProgress = {
        policy: policy,
        votes: [],
        currentVoterIndex: 0,
        yesVotes: 0,
        noVotes: 0
    };
    
    // Record first player's vote (weighted by influence)
    const firstPlayer = getCurrentPlayer();
    const firstInfluence = firstPlayer.communityInfluence || 1;
    gameState.votingInProgress.votes.push({
        player: firstPlayer.name,
        vote: firstPlayerVote,
        influence: firstInfluence
    });
    
    if (firstPlayerVote === 'yes') {
        gameState.votingInProgress.yesVotes += firstInfluence;
    } else {
        gameState.votingInProgress.noVotes += firstInfluence;
    }
    
    console.log('First player vote recorded:', firstPlayer.name, firstPlayerVote);
    console.log('Votes array now has:', gameState.votingInProgress.votes.length, 'vote(s)');
    addLog(`${firstPlayer.name} votes: ${firstPlayerVote === 'yes' ? '👍 Yes' : '👎 No'} (Influence: ${firstInfluence})`);
    
    // Start sequential voting for remaining players
    // Add small delay to ensure modal transition completes
    console.log('Will call showNextVoterModal in 300ms...');
    setTimeout(() => {
        showNextVoterModal();
    }, 300);
}

function showNextVoterModal() {
    const votingData = gameState.votingInProgress;
    
    if (!votingData) {
        console.error('No voting in progress!');
        return;
    }
    
    const voteCount = votingData.votes.length;
    console.log('showNextVoterModal called. Votes so far:', voteCount, '/', gameState.numPlayers);
    
    // Check if all players have voted
    if (voteCount >= gameState.numPlayers) {
        console.log('All players voted, finalizing...');
        finalizeVote();
        return;
    }
    
    // Find next player who hasn't voted
    let nextPlayerIndex = -1;
    for (let i = 0; i < gameState.numPlayers; i++) {
        const hasVoted = votingData.votes.some(v => v.player === gameState.players[i].name);
        console.log(`Player ${i} (${gameState.players[i].name}): hasVoted = ${hasVoted}`);
        if (!hasVoted) {
            nextPlayerIndex = i;
            break;
        }
    }
    
    if (nextPlayerIndex === -1) {
        console.log('No next player found, finalizing...');
        finalizeVote();
        return;
    }
    
    console.log('Next voter:', nextPlayerIndex, gameState.players[nextPlayerIndex].name);
    const voter = gameState.players[nextPlayerIndex];
    const policy = votingData.policy;
    const voterInfluence = voter.communityInfluence || 1;
    
    // Always show voting modal for interactive gameplay
    // This allows multiplayer where all players can vote
    showPlayerVotingModal(voter, nextPlayerIndex, policy, voterInfluence);
}

function showPlayerVotingModal(voter, playerIndex, policy, influence) {
    console.log('Showing voting modal for:', voter.name, 'with influence:', influence);
    
    const modal = document.getElementById('actionModal');
    const overlay = document.getElementById('modalOverlay');
    
    if (!modal || !overlay) {
        console.error('Modal elements not found!');
        return;
    }
    
    // Get or create the modal-content div
    let modalContent = modal.querySelector('.modal-content');
    if (!modalContent) {
        modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modal.appendChild(modalContent);
    }
    
    modalContent.innerHTML = `
        <h2>🗳️ Voting Time: ${voter.name}</h2>
        <div class="policy-vote-info">
            <h3>${policy.name}</h3>
            <p>${policy.description}</p>
            <div class="vote-stats">
                <p><strong>Your Influence:</strong> ${influence} vote(s)</p>
                <p><strong>Current Tally:</strong></p>
                <p>👍 Yes: ${gameState.votingInProgress.yesVotes} | 👎 No: ${gameState.votingInProgress.noVotes}</p>
            </div>
        </div>
    `;
    
    const votingDiv = document.createElement('div');
    votingDiv.className = 'modal-actions';
    modalContent.appendChild(votingDiv);
    
    const yesBtn = document.createElement('button');
    yesBtn.className = 'btn btn-primary';
    yesBtn.textContent = `👍 Vote Yes (${influence} vote${influence > 1 ? 's' : ''})`;
    yesBtn.onclick = () => {
        recordVote(voter, 'yes', influence);
        closeModal();
        showNextVoterModal();
    };
    
    const noBtn = document.createElement('button');
    noBtn.className = 'btn btn-secondary';
    noBtn.textContent = `👎 Vote No (${influence} vote${influence > 1 ? 's' : ''})`;
    noBtn.onclick = () => {
        recordVote(voter, 'no', influence);
        closeModal();
        showNextVoterModal();
    };
    
    // Add AI auto-vote button for single-player convenience
    const aiBtn = document.createElement('button');
    aiBtn.className = 'btn btn-secondary';
    aiBtn.textContent = '🤖 AI Decides';
    aiBtn.style.opacity = '0.7';
    aiBtn.onclick = () => {
        const aiVote = determineAIVote(voter, policy);
        recordVote(voter, aiVote, influence);
        closeModal();
        showNextVoterModal();
    };
    
    votingDiv.appendChild(yesBtn);
    votingDiv.appendChild(noBtn);
    votingDiv.appendChild(aiBtn);
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function determineAIVote(player, policy) {
    let aiVote = 'no';
    const voteChance = Math.random();
    
    if (policy.type === 'tax') {
        if (player.carbonTokens <= 3 || voteChance > 0.6) {
            aiVote = 'yes';
        }
    } else if (policy.type === 'bonus') {
        if (player.sustainabilityScore > 30 || voteChance > 0.5) {
            aiVote = 'yes';
        }
    } else if (policy.type === 'subsidy') {
        if (voteChance > 0.3) {
            aiVote = 'yes';
        }
    } else {
        if (voteChance > 0.5) {
            aiVote = 'yes';
        }
    }
    
    return aiVote;
}

function recordVote(player, vote, influence) {
    console.log('Recording vote:', player.name, vote, 'influence:', influence);
    const votingData = gameState.votingInProgress;
    
    if (!votingData) {
        console.error('No voting data when recording vote!');
        return;
    }
    
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
    
    console.log('Vote recorded. Total votes:', votingData.votes.length, 'Yes:', votingData.yesVotes, 'No:', votingData.noVotes);
    addLog(`${player.name} votes: ${vote === 'yes' ? '👍 Yes' : '👎 No'} (Influence: ${influence})`);
}

function finalizeVote() {
    const votingData = gameState.votingInProgress;
    const policy = votingData.policy;
    
    addLog(`🏛️ Final Results: ${policy.name} - Yes: ${votingData.yesVotes}, No: ${votingData.noVotes}`, 'important');
    
    if (votingData.yesVotes > votingData.noVotes) {
        addLog(`✅ Policy passed: ${policy.name}`, 'important');
        applyPolicy(policy);
    } else {
        addLog(`❌ Policy rejected: ${policy.name}`);
    }
    
    // Clean up voting data
    delete gameState.votingInProgress;
    
    // Continue game flow
    completeTurnResolution();
}

function applyPolicy(policy) {
    switch (policy.type) {
        case 'tax':
            gameState.players.forEach(p => {
                const tax = p.carbonTokens * policy.effect.carbonCost;
                p.ecoCredits = Math.max(0, p.ecoCredits - tax);
            });
            break;
            
        case 'bonus':
            if (policy.effect.ssThreshold) {
                gameState.players.forEach(p => {
                    if (p.sustainabilityScore >= policy.effect.ssThreshold) {
                        p.ecoCredits += policy.effect.payout;
                    }
                });
            }
            if (policy.effect.ciBonus) {
                gameState.players.forEach(p => {
                    p.communityInfluence += policy.effect.ciBonus;
                });
            }
            break;
            
        case 'reduction':
            gameState.players.forEach(p => {
                p.carbonTokens = Math.max(0, p.carbonTokens - policy.effect.carbonReduction);
            });
            gameState.globalCO2 = Math.max(0, gameState.globalCO2 - (policy.effect.carbonReduction * gameState.numPlayers));
            break;
    }
    
    updateUI();
}

// Check CO2 Thresholds
function checkCO2Thresholds() {
    const co2 = gameState.globalCO2;
    
    if (co2 >= 40 && !gameState.threshold40Triggered) {
        gameState.threshold40Triggered = true;
        triggerClimateCrisis();
    } else if (co2 >= 30 && !gameState.threshold30Triggered) {
        gameState.threshold30Triggered = true;
        addLog('⚠️ CO2 threshold reached: 30 - Global Summit triggered!', 'important');
        // Trigger summit next
    } else if (co2 >= 20 && !gameState.threshold20Triggered) {
        gameState.threshold20Triggered = true;
        triggerExtremeWeather();
    } else if (co2 >= 10 && !gameState.threshold10Triggered) {
        gameState.threshold10Triggered = true;
        addLog('⚠️ CO2 threshold reached: 10 - Climate warning!', 'important');
    }
}

function triggerExtremeWeather() {
    addLog('🌪️ EXTREME WEATHER EVENT! All players lose 100 Credits', 'crisis');
    gameState.players.forEach(p => {
        p.ecoCredits = Math.max(0, p.ecoCredits - 100);
    });
    updateUI();
}

function triggerClimateCrisis() {
    addLog('🔥 CLIMATE CRISIS! Random properties destroyed in each zone!', 'crisis');
    
    // Simplified: reduce all player SS
    gameState.players.forEach(p => {
        p.sustainabilityScore -= 10;
    });
    
    updateUI();
}

function triggerPersonalDisaster(player) {
    const roll = Math.floor(Math.random() * 6) + 1;
    
    addLog(`⚠️ Personal disaster for ${player.name}! (CO2 >= 6)`, 'crisis');
    
    if (roll <= 2) {
        player.ecoCredits = Math.max(0, player.ecoCredits - 100);
        addLog(`💧 Drought: ${player.name} loses ₑ100`, 'crisis');
    } else if (roll <= 4) {
        player.sustainabilityScore -= 10;
        addLog(`🔥 Wildfire impact: ${player.name} loses 10 SS`, 'crisis');
    } else if (roll === 5) {
        player.ecoCredits = Math.max(0, player.ecoCredits - 200);
        addLog(`💸 Forced offset: ${player.name} pays ₑ200`, 'crisis');
    } else {
        addLog(`✅ ${player.name} averted disaster!`);
    }
    
    updateUI();
}

// Global Events (triggered every 5 rounds)
function triggerGlobalEvent(round) {
    const events = [
        {
            name: "UN Climate Review",
            description: "UN Climate Review: Players with high carbon footprints face penalties!",
            effect: () => {
                gameState.players.forEach(p => {
                    if (p.carbonTokens >= 10) {
                        p.ecoCredits = Math.max(0, p.ecoCredits - 200);
                        p.sustainabilityScore -= 10;
                        addLog(`🏛️ UN Review: ${p.name} exceeds carbon limits! Lost 200 Credits and 10 SS`, 'crisis');
                    }
                });
            }
        },
        {
            name: "Tech Innovation Leap",
            description: "Tech Innovation Leap: All players benefit from breakthrough green technology!",
            effect: () => {
                gameState.players.forEach(p => {
                    const reduction = Math.ceil(p.carbonTokens * 0.05); // 5% reduction
                    p.carbonTokens = Math.max(0, p.carbonTokens - reduction);
                    p.sustainabilityScore += 5;
                    addLog(`🚀 Tech Leap: ${p.name} reduced ${reduction} carbon tokens and gained 5 SS!`, 'success');
                });
            }
        }
    ];
    
    // Randomly select an event
    const selectedEvent = events[Math.floor(Math.random() * events.length)];
    
    addLog(`🌍 GLOBAL EVENT (Round ${round}): ${selectedEvent.description}`, 'important');
    
    // Apply the event effect
    selectedEvent.effect();
    
    updateUI();
}

// Utility Functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
