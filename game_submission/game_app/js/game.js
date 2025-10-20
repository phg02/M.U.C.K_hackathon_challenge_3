// ===================================
// EcoPoly: Environmental Board Game
// Main Game Logic
// ===================================

// Game State
const gameState = {
    currentScreen: 'menu',
    numPlayers: 2,
    players: [],
    currentPlayerIndex: 0,
    round: 1,
    maxRounds: 20,
    globalCO2: 0,
    gameMode: 'competitive',
    properties: [],
    greenDeck: [],
    crisisDeck: [],
    policyDeck: [],
    activePolicies: [],
    boardSpaces: [],
    diceRolled: false,
    turnPhase: 'roll', // roll, resolve, action, end
    lastDiceRoll: [0, 0]
};

// Player Tokens (emojis)
const playerTokens = ['🌿', '🌱', '🌳', '🍃', '🌾', '🌻'];

// Initialize Game
function initGame() {
    console.log('EcoPoly: Initializing game...');
    showScreen('menu');
}

// Screen Management
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const screen = document.getElementById(screenName + 'Screen');
    if (screen) {
        screen.classList.add('active');
        gameState.currentScreen = screenName;
    }
}

function showMenu() {
    showScreen('menu');
}

function showPlayerSetup() {
    showScreen('playerSetup');
    updatePlayerSetupForm();
}

function showRules() {
    showScreen('rules');
}

function showAbout() {
    showScreen('about');
}

function showHelp() {
    showRules();
}

function pauseGame() {
    if (confirm('Pause game and return to menu? (Progress will be lost)')) {
        showMenu();
    }
}

// Player Setup
function updatePlayerSetupForm() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value) || 2;
    const container = document.getElementById('playerNames');
    container.innerHTML = '';
    
    for (let i = 0; i < numPlayers; i++) {
        const div = document.createElement('div');
        div.className = 'player-name-input';
        div.innerHTML = `
            <span>${playerTokens[i]}</span>
            <input type="text" 
                   id="playerName${i}" 
                   placeholder="Player ${i + 1} Name" 
                   value="Player ${i + 1}">
        `;
        container.appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const numPlayersInput = document.getElementById('numPlayers');
    if (numPlayersInput) {
        numPlayersInput.addEventListener('change', updatePlayerSetupForm);
    }
});

// Start Game
function startGame() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value) || 2;
    const gameMode = document.getElementById('gameMode').value;
    
    // Initialize players
    gameState.players = [];
    for (let i = 0; i < numPlayers; i++) {
        const nameInput = document.getElementById(`playerName${i}`);
        const name = nameInput ? nameInput.value : `Player ${i + 1}`;
        
        gameState.players.push({
            id: i,
            name: name,
            token: playerTokens[i],
            position: 0,
            ecoCredits: 1500,
            sustainabilityScore: 50,
            communityInfluence: 0,
            carbonTokens: 0,
            properties: [],
            cards: [],
            hasUsedLobby: false
        });
    }
    
    gameState.numPlayers = numPlayers;
    gameState.gameMode = gameMode;
    gameState.currentPlayerIndex = 0;
    gameState.round = 1;
    gameState.globalCO2 = 0;
    gameState.diceRolled = false;
    gameState.turnPhase = 'roll';
    
    // Initialize game components
    initializeBoard();
    initializeCards();
    
    // Show game screen
    showScreen('game');
    updateUI();
    
    addLog('🎮 Game started! Good luck to all players!', 'important');
    addLog(`🎯 Game Mode: ${gameMode}`, 'important');
}

// Initialize Board
function initializeBoard() {
    gameState.boardSpaces = [
        { id: 0, type: 'start', name: 'Start', icon: '🏁' },
        { id: 1, type: 'property', name: 'Solar Farm', zone: 'energy', icon: '☀️', cost: 300, eco: true },
        { id: 2, type: 'card', name: 'Green Card', icon: '🌱', cardType: 'green' },
        { id: 3, type: 'property', name: 'Wind Turbine', zone: 'energy', icon: '💨', cost: 350, eco: true },
        { id: 4, type: 'tax', name: 'Carbon Tax', icon: '💸' },
        { id: 5, type: 'property', name: 'Coal Plant', zone: 'energy', icon: '🏭', cost: 300, industrial: true },
        { id: 6, type: 'property', name: 'Green Building', zone: 'urban', icon: '🏢', cost: 400, eco: true },
        { id: 7, type: 'card', name: 'Crisis Card', icon: '⚠️', cardType: 'crisis' },
        { id: 8, type: 'property', name: 'Public Transit', zone: 'urban', icon: '🚇', cost: 350, eco: true },
        { id: 9, type: 'fund', name: 'Eco Fund', icon: '💚' },
        { id: 10, type: 'summit', name: 'Global Summit', icon: '🏛️' },
        { id: 11, type: 'property', name: 'Industrial Zone', zone: 'urban', icon: '🏗️', cost: 400, industrial: true },
        { id: 12, type: 'property', name: 'Forest Reserve', zone: 'natural', icon: '🌲', cost: 450, eco: true },
        { id: 13, type: 'card', name: 'Green Card', icon: '🌱', cardType: 'green' },
        { id: 14, type: 'property', name: 'Wildlife Park', zone: 'natural', icon: '🦋', cost: 400, eco: true },
        { id: 15, type: 'property', name: 'Mining Site', zone: 'natural', icon: '⛏️', cost: 450, industrial: true },
        { id: 16, type: 'property', name: 'Recycling Hub', zone: 'urban', icon: '♻️', cost: 350, eco: true },
        { id: 17, type: 'card', name: 'Crisis Card', icon: '⚠️', cardType: 'crisis' },
        { id: 18, type: 'property', name: 'Landfill', zone: 'urban', icon: '🗑️', cost: 300, industrial: true },
        { id: 19, type: 'tax', name: 'Carbon Tax', icon: '💸' },
        { id: 20, type: 'summit', name: 'Global Summit', icon: '🏛️' },
        { id: 21, type: 'property', name: 'Hydro Dam', zone: 'energy', icon: '🌊', cost: 500, eco: true },
        { id: 22, type: 'card', name: 'Green Card', icon: '🌱', cardType: 'green' },
        { id: 23, type: 'property', name: 'Oil Refinery', zone: 'energy', icon: '🛢️', cost: 450, industrial: true },
        { id: 24, type: 'fund', name: 'Eco Fund', icon: '💚' },
        { id: 25, type: 'property', name: 'Organic Farm', zone: 'natural', icon: '🌾', cost: 350, eco: true },
        { id: 26, type: 'property', name: 'Factory', zone: 'urban', icon: '🏭', cost: 400, industrial: true },
        { id: 27, type: 'card', name: 'Crisis Card', icon: '⚠️', cardType: 'crisis' },
        { id: 28, type: 'property', name: 'Wetland', zone: 'natural', icon: '🦆', cost: 400, eco: true },
        { id: 29, type: 'tax', name: 'Carbon Tax', icon: '💸' },
        { id: 30, type: 'summit', name: 'Global Summit', icon: '🏛️' },
        { id: 31, type: 'property', name: 'Bike Share', zone: 'urban', icon: '🚴', cost: 300, eco: true },
        { id: 32, type: 'card', name: 'Green Card', icon: '🌱', cardType: 'green' },
        { id: 33, type: 'property', name: 'Parking Lot', zone: 'urban', icon: '🅿️', cost: 300, industrial: true },
        { id: 34, type: 'property', name: 'Geothermal', zone: 'energy', icon: '🌋', cost: 550, eco: true },
        { id: 35, type: 'fund', name: 'Eco Fund', icon: '💚' },
        { id: 36, type: 'property', name: 'Gas Plant', zone: 'energy', icon: '⚡', cost: 400, industrial: true },
        { id: 37, type: 'card', name: 'Crisis Card', icon: '⚠️', cardType: 'crisis' },
        { id: 38, type: 'property', name: 'Marine Reserve', zone: 'natural', icon: '🐠', cost: 500, eco: true },
        { id: 39, type: 'tax', name: 'Carbon Tax', icon: '💸' }
    ];
    
    // Add ownership and upgrade info to properties
    gameState.boardSpaces.forEach(space => {
        if (space.type === 'property') {
            space.owner = null;
            space.path = null; // will be 'eco' or 'industrial'
            space.upgrades = 0;
        }
    });
    
    renderBoard();
}

// Render Board
function renderBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    
    // Wait for board to render with correct size, then calculate positions
    setTimeout(() => {
        const boardRect = board.getBoundingClientRect();
        const boardSize = boardRect.width;
        const spaceSize = Math.floor(boardSize * 0.08); // 8% of board width
        
        const totalSpaces = gameState.boardSpaces.length;
        const spacesPerSide = 10;
        
        gameState.boardSpaces.forEach((space, index) => {
            const spaceEl = document.createElement('div');
            spaceEl.className = `space ${space.type}`;
            spaceEl.id = `space-${space.id}`;
            
            // Set space size dynamically
            spaceEl.style.width = spaceSize + 'px';
            spaceEl.style.height = spaceSize + 'px';
            
            // Add additional classes
            if (space.owner !== null && space.owner !== undefined) {
                spaceEl.classList.add('owned');
            }
            if (space.path) {
                spaceEl.classList.add(space.path);
            }
            
            spaceEl.innerHTML = `
                <div class="space-icon">${space.icon}</div>
                <div class="space-name">${space.name}</div>
            `;
            
            // Position the space on the board
            let pos = calculateSpacePosition(index, totalSpaces, boardSize, spaceSize);
            // Small inward offset for corner-like spaces to avoid exact overlaps
            if (space.type === 'summit' || space.type === 'tax') {
                const cornerInset = Math.floor(spaceSize * 0.08); // proportional inset
                // push summits/taxes slightly inward depending on their side
                if (pos.x === 0) pos.x += cornerInset;
                if (Math.abs(pos.x - (boardSize - spaceSize)) < 1) pos.x -= cornerInset;
                if (pos.y === 0) pos.y += cornerInset;
                if (Math.abs(pos.y - (boardSize - spaceSize)) < 1) pos.y -= cornerInset;
            }
            spaceEl.style.left = pos.x + 'px';
            spaceEl.style.top = pos.y + 'px';
            
            spaceEl.onclick = () => handleSpaceClick(space);
            
            board.appendChild(spaceEl);
        });
        
        // Render player tokens
        renderPlayerTokens();
    }, 0);
}

// Calculate position of spaces around the board (CLOCKWISE)
function calculateSpacePosition(index, total, boardSize, spaceSize) {
    // Use a perimeter-distance layout so each of the `total` spaces is placed
    // uniquely and evenly around the board perimeter. This avoids any corner
    // duplicates (no two indexes map to the same x,y).
    //
    // Board coords measure the top-left of the space box. We place spaces
    // along the inset square of size (boardSize - spaceSize) so the full
    // space boxes fit inside the board.

    const count = total || 40; // fallback to 40 if total not provided
    const inset = boardSize - spaceSize; // length of each side where spaces sit
    const perimeter = inset * 4;

    // Distance along perimeter for this index (0 .. perimeter)
    const dist = (index / count) * perimeter;

    // Map distance to x,y
    if (dist < inset) {
        // bottom side (left -> right)
        return { x: dist, y: boardSize - spaceSize };
    } else if (dist < inset * 2) {
        // right side (bottom -> top)
        const d = dist - inset;
        return { x: boardSize - spaceSize, y: boardSize - spaceSize - d };
    } else if (dist < inset * 3) {
        // top side (right -> left)
        const d = dist - inset * 2;
        return { x: boardSize - spaceSize - d, y: 0 };
    } else {
        // left side (top -> bottom)
        const d = dist - inset * 3;
        return { x: 0, y: d };
    }
}

// Render player tokens on board
function renderPlayerTokens() {
    // Remove existing tokens
    document.querySelectorAll('.player-token-on-board').forEach(el => el.remove());
    
    // Remove existing space highlights
    document.querySelectorAll('.space').forEach(space => {
        space.classList.remove('has-players', 'current-player-space');
    });
    
    // Track which spaces have players
    const spacesWithPlayers = {};
    
    gameState.players.forEach((player, idx) => {
        const space = document.getElementById(`space-${player.position}`);
        if (space) {
            // Mark space as having players
            if (!spacesWithPlayers[player.position]) {
                spacesWithPlayers[player.position] = [];
            }
            spacesWithPlayers[player.position].push(idx);
            
            // Add token
            const token = document.createElement('div');
            token.className = 'player-token-on-board';
            token.textContent = player.token;
            
            // Add position number badge
            const positionBadge = document.createElement('div');
            positionBadge.className = 'position-number';
            positionBadge.textContent = player.position;
            
            // Highlight current player's token
            if (idx === gameState.currentPlayer) {
                token.classList.add('current-player');
                positionBadge.style.background = 'rgba(255, 215, 0, 1)';
                positionBadge.style.color = 'rgba(0, 0, 0, 0.8)';
            }
            
            token.appendChild(positionBadge);
            token.style.left = (idx * 20) + 'px';
            token.style.top = (idx * 5) + 'px';
            
            space.appendChild(token);
        }
    });
    
    // Add visual indicators to spaces
    Object.keys(spacesWithPlayers).forEach(position => {
        const space = document.getElementById(`space-${position}`);
        if (space) {
            space.classList.add('has-players');
            
            // Highlight current player's space with special styling
            if (spacesWithPlayers[position].includes(gameState.currentPlayer)) {
                space.classList.add('current-player-space');
            }
        }
    });
}

// Handle space click (for info)
function handleSpaceClick(space) {
    if (space.type === 'property') {
        showPropertyInfo(space);
    }
}

function showPropertyInfo(property) {
    const modal = document.getElementById('propertyModal');
    const overlay = document.getElementById('modalOverlay');
    
    document.getElementById('propertyName').textContent = property.name;
    
    let description = `Zone: ${property.zone}\n`;
    description += `Cost: ${property.cost} Credits\n`;
    
    if (property.owner !== null) {
        const owner = gameState.players[property.owner];
        description += `Owner: ${owner.name}\n`;
        description += `Path: ${property.path}\n`;
        description += `Upgrades: ${property.upgrades}\n`;
    } else {
        description += 'Status: Unowned\n';
    }
    
    document.getElementById('propertyDescription').textContent = description;
    
    // Clear any purchase options (this is just info view)
    document.getElementById('propertyOptions').innerHTML = '';
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Roll Dice
function rollDice() {
    if (gameState.turnPhase !== 'roll') {
        addLog('❌ Not the right time to roll dice!');
        return;
    }
    
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;
    
    gameState.lastDiceRoll = [dice1, dice2];
    gameState.diceRolled = true;
    gameState.turnPhase = 'moving';
    
    // Show and animate dice
    const diceDisplay = document.getElementById('diceDisplay');
    const dice1El = document.getElementById('dice1');
    const dice2El = document.getElementById('dice2');
    
    diceDisplay.classList.add('active');
    dice1El.textContent = '?';
    dice2El.textContent = '?';
    dice1El.classList.add('rolling');
    dice2El.classList.add('rolling');
    
    // Simulate rolling with random numbers
    let rollCount = 0;
    const rollInterval = setInterval(() => {
        dice1El.textContent = Math.floor(Math.random() * 6) + 1;
        dice2El.textContent = Math.floor(Math.random() * 6) + 1;
        rollCount++;
        
        if (rollCount >= 8) {
            clearInterval(rollInterval);
        }
    }, 75);
    
    // Show final result after animation
    setTimeout(() => {
        dice1El.classList.remove('rolling');
        dice2El.classList.remove('rolling');
        dice1El.classList.add('result');
        dice2El.classList.add('result');
        dice1El.textContent = dice1;
        dice2El.textContent = dice2;
        
        addLog(`🎲 ${getCurrentPlayer().name} rolled ${dice1} + ${dice2} = ${total}`, 'important');
        
        // Remove result animation class
        setTimeout(() => {
            dice1El.classList.remove('result');
            dice2El.classList.remove('result');
        }, 500);
        
        // Hide dice and move player
        setTimeout(() => {
            diceDisplay.classList.remove('active');
            movePlayer(total);
        }, 1500);
    }, 600);
    
    // Update UI
    document.getElementById('rollDiceBtn').disabled = true;
}

// Move Player
function movePlayer(spaces) {
    const player = getCurrentPlayer();
    const oldPosition = player.position;
    const oldSpace = document.getElementById(`space-${oldPosition}`);
    
    // Show movement start with highlight
    if (oldSpace) {
        oldSpace.style.background = 'rgba(255, 152, 0, 0.4)';
        oldSpace.style.borderColor = 'rgba(255, 152, 0, 0.8)';
    }
    
    // Calculate new position
    const newPosition = (player.position + spaces) % gameState.boardSpaces.length;
    
    // Check if passed or landed on Start (space 0)
    // This happens when: old position + spaces >= 40 (wrapped around)
    const passedStart = (oldPosition + spaces) >= gameState.boardSpaces.length;
    
    player.position = newPosition;
    const newSpace = document.getElementById(`space-${player.position}`);
    
    // Add movement complete highlight
    if (newSpace) {
        newSpace.style.background = 'rgba(76, 175, 80, 0.4)';
        newSpace.style.borderColor = 'rgba(76, 175, 80, 0.8)';
        newSpace.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.6)';
    }
    
    // Give Start bonus if passed or landed on Start
    if (passedStart) {
        player.ecoCredits += 200;
        console.log(`💰 ${player.name} passed Start! Credits before: ${player.ecoCredits - 200}, after: ${player.ecoCredits}`);
        if (player.position === 0) {
            addLog(`🏁 ${player.name} landed on Start! Collected 200 Credits`, 'important');
        } else {
            addLog(`💰 ${player.name} passed Start! Collected 200 Credits`, 'important');
        }
    }
    
    // Show movement details in log
    addLog(`🚀 ${player.name} moved ${spaces} spaces to ${gameState.boardSpaces[player.position].name} (Space ${player.position})`, 'important');
    
    renderPlayerTokens();
    updateUI();
    
    // Resolve the space
    setTimeout(() => {
        // Clear highlights
        if (oldSpace) {
            oldSpace.style.background = '';
            oldSpace.style.borderColor = '';
        }
        if (newSpace) {
            newSpace.style.background = '';
            newSpace.style.borderColor = '';
            newSpace.style.boxShadow = '';
        }
        resolveSpace();
    }, 1000);
}

// Resolve Space
function resolveSpace() {
    const player = getCurrentPlayer();
    const space = gameState.boardSpaces[player.position];
    
    addLog(`📍 ${player.name} landed on ${space.name}`);
    
    gameState.turnPhase = 'resolve';
    
    // Show landing action modal (except for cards and summit - they show their own modals)
    if (space.type !== 'card' && space.type !== 'summit') {
        showLandingAction(space, player);
    }
    
    switch (space.type) {
        case 'start':
            // Start bonus already given in movePlayer, just complete turn
            completeTurnResolution();
            break;
        case 'property':
            handlePropertyLanding(space);
            break;
        case 'card':
            drawCard(space.cardType);
            break;
        case 'tax':
            handleCarbonTax();
            break;
        case 'fund':
            handleEcoFund();
            break;
        case 'summit':
            handleGlobalSummit();
            break;
        default:
            completeTurnResolution();
            break;
    }
}

// Show landing action with clear description
function showLandingAction(space, player) {
    const modal = document.getElementById('landingModal');
    const overlay = document.getElementById('modalOverlay');
    
    const actionEl = document.getElementById('landingAction');
    const detailsEl = document.getElementById('landingDetails');
    const consequencesEl = document.getElementById('landingConsequences');
    
    let action = '';
    let details = '';
    let consequences = '';
    
    switch (space.type) {
        case 'start':
            action = '🏁 You landed on START!';
            details = `Welcome back to Start! You've completed a full lap around the board.`;
            consequences = '✅ You already collected 200 Credits for passing/landing on Start!';
            break;
            
        case 'property':
            if (space.owner === null) {
                action = `🏘️ ${space.name} is unowned!`;
                details = `You can buy this property for ${space.cost} Credits. Choose between Eco Path (lower rent, +5 Sustainability) or Industrial Path (higher rent, +1 pollution).`;
                consequences = '⚠️ This will be a purchase choice. Choose wisely!';
            } else if (space.owner !== player.id) {
                const owner = gameState.players[space.owner];
                
                // Ensure upgrades property exists
                if (space.upgrades === undefined) {
                    space.upgrades = 0;
                }
                
                let rent = 100;
                if (space.path === 'eco') {
                    rent = 100 + (space.upgrades * 50);
                } else {
                    rent = 200 + (space.upgrades * 75);
                }
                action = `💸 ${space.name} is owned by ${owner.name}!`;
                details = `This is a ${space.path === 'eco' ? '🌱 Green' : '🏭 Industrial'} property (Level ${space.upgrades}). You must pay rent!`;
                consequences = `💸 You pay ${rent} Credits to ${owner.name}. Ouch!`;
            } else {
                action = `🏠 ${space.name} is yours!`;
                details = `You own this property. Safe landing - no rent!`;
                consequences = '✅ Your own property - free zone!';
            }
            break;
            
        case 'card':
            if (space.cardType === 'green') {
                action = '🌱 Green Card!';
                details = `Lucky! You draw a Green Card with environmental benefits.`;
                consequences = '✅ Environmental reward coming!';
            } else {
                action = '⚠️ Crisis Card!';
                details = `Oh no! You draw a Crisis Card - environmental challenge ahead.`;
                consequences = '❌ Prepare for consequences!';
            }
            break;
            
        case 'tax':
            const taxAmount = player.carbonTokens * 50;
            action = '💸 Carbon Tax Space!';
            details = `You must pay 50 Credits for each Carbon Token you have.`;
            consequences = `💸 You pay ${taxAmount} Credits (${player.carbonTokens} tokens × 50). Reduce pollution to minimize taxes!`;
            break;
            
        case 'fund':
            action = '💚 Eco Fund!';
            details = `You receive 150 Credits from the global environmental fund.`;
            consequences = '✅ Free money! Great spot to land!';
            break;
            
        case 'summit':
            action = '🏛️ Summit!';
            details = `A global environmental policy is being voted on.`;
            consequences = '🗳️ All players will vote on the policy. It may help or hurt you!';
            break;
            
        default:
            action = '🎲 You landed!';
            details = 'Processing your landing...';
            consequences = '';
    }
    
    actionEl.textContent = action;
    detailsEl.innerHTML = details;
    consequencesEl.innerHTML = consequences ? `<strong>Result:</strong> ${consequences}` : '';
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Handle Property Landing
function handlePropertyLanding(property) {
    const player = getCurrentPlayer();
    
    if (property.owner === null) {
        // Unowned property - offer to buy
        offerPropertyPurchase(property);
    } else if (property.owner !== player.id) {
        // Owned by another player - pay rent
        payRent(property);
        completeTurnResolution();
    } else {
        // Own property - offer upgrade/convert options
        addLog(`🏠 ${player.name} landed on their own property: ${property.name}`);
        offerPropertyManagement(property);
    }
}

function offerPropertyPurchase(property) {
    const player = getCurrentPlayer();
    
    const modal = document.getElementById('propertyModal');
    const overlay = document.getElementById('modalOverlay');
    
    document.getElementById('propertyName').textContent = property.name;
    document.getElementById('propertyDescription').textContent = 
        `Cost: ${property.cost} Credits\nZone: ${property.zone}\n\nChoose your development path:\n\n💡 Eco Path: Base rent 100 Credits (+50 per upgrade)\n💡 Industrial Path: Base rent 200 Credits (+75 per upgrade)`;
    
    const options = document.getElementById('propertyOptions');
    options.innerHTML = '';
    
    if (player.ecoCredits >= property.cost) {
        // Eco path option
        const ecoBtn = document.createElement('button');
        ecoBtn.className = 'btn btn-primary';
        ecoBtn.innerHTML = '🌱 <strong>Eco Path</strong><br><small>Rent: 100 Credits | +5 Sustainability | No CO2</small>';
        ecoBtn.onclick = () => {
            purchaseProperty(property, 'eco');
        };
        options.appendChild(ecoBtn);
        
        // Industrial path option
        const indBtn = document.createElement('button');
        indBtn.className = 'btn btn-secondary';
        indBtn.innerHTML = '🏭 <strong>Industrial Path</strong><br><small>Rent: 200 Credits | +1 CO2 pollution per round</small>';
        indBtn.onclick = () => {
            purchaseProperty(property, 'industrial');
        };
        options.appendChild(indBtn);
    } else {
        // Show insufficient funds message
        const noFundsMsg = document.createElement('p');
        noFundsMsg.style.color = '#e74c3c';
        noFundsMsg.style.fontWeight = 'bold';
        noFundsMsg.textContent = `❌ Insufficient funds! You need ${property.cost} Credits but only have ${player.ecoCredits} Credits.`;
        options.appendChild(noFundsMsg);
    }
    
    // Decline option
    const declineBtn = document.createElement('button');
    declineBtn.className = 'btn btn-secondary';
    declineBtn.textContent = 'Pass (Don\'t Buy)';
    declineBtn.onclick = () => {
        addLog(`${player.name} declined to purchase ${property.name}`);
        closeModal();
        completeTurnResolution();
    };
    options.appendChild(declineBtn);
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function offerPropertyManagement(property) {
    const player = getCurrentPlayer();
    
    // Ensure upgrades property exists
    if (property.upgrades === undefined) {
        property.upgrades = 0;
    }
    
    const modal = document.getElementById('propertyModal');
    const overlay = document.getElementById('modalOverlay');
    
    document.getElementById('propertyName').textContent = `${property.name} (Your Property)`;
    
    const upgradeCost = 150 + (property.upgrades * 50);
    const convertCost = 200 + (property.upgrades * 100);
    const currentRent = property.path === 'eco' 
        ? (100 + property.upgrades * 50) 
        : (200 + property.upgrades * 75);
    const nextRent = property.path === 'eco' 
        ? (100 + (property.upgrades + 1) * 50) 
        : (200 + (property.upgrades + 1) * 75);
    
    let description = `Path: ${property.path === 'eco' ? '🌱 Eco' : '🏭 Industrial'}\n`;
    description += `Level: ${property.upgrades}\n`;
    description += `Current Rent: ${currentRent} Credits\n\n`;
    description += `Manage your property:`;
    
    document.getElementById('propertyDescription').textContent = description;
    
    const options = document.getElementById('propertyOptions');
    options.innerHTML = '';
    
    // Upgrade option
    const upgradeBtn = document.createElement('button');
    upgradeBtn.className = 'btn btn-primary';
    upgradeBtn.innerHTML = `⬆️ <strong>Upgrade Property</strong><br><small>Cost: ${upgradeCost} Credits | Rent increases to ${nextRent}</small>`;
    if (player.ecoCredits >= upgradeCost) {
        upgradeBtn.onclick = () => {
            upgradeProperty(property.id);
            closeModal();
            completeTurnResolution();
        };
    } else {
        upgradeBtn.disabled = true;
        upgradeBtn.innerHTML = `⬆️ <strong>Upgrade Property</strong><br><small>Cost: ${upgradeCost} Credits (Not enough funds)</small>`;
    }
    options.appendChild(upgradeBtn);
    
    // Convert to Eco option (only if Industrial)
    if (property.path === 'industrial') {
        const convertBtn = document.createElement('button');
        convertBtn.className = 'btn btn-secondary';
        convertBtn.innerHTML = `♻️ <strong>Convert to Eco Path</strong><br><small>Cost: ${convertCost} Credits | +8 SS, -1 CO2, lower rent</small>`;
        if (player.ecoCredits >= convertCost) {
            convertBtn.onclick = () => {
                convertPropertyToEco(property.id);
                closeModal();
                completeTurnResolution();
            };
        } else {
            convertBtn.disabled = true;
            convertBtn.innerHTML = `♻️ <strong>Convert to Eco Path</strong><br><small>Cost: ${convertCost} Credits (Not enough funds)</small>`;
        }
        options.appendChild(convertBtn);
    }
    
    // Continue without changes
    const continueBtn = document.createElement('button');
    continueBtn.className = 'btn btn-secondary';
    continueBtn.textContent = 'Continue (No changes)';
    continueBtn.onclick = () => {
        closeModal();
        completeTurnResolution();
    };
    options.appendChild(continueBtn);
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function purchaseProperty(property, path) {
    const player = getCurrentPlayer();
    
    console.log('Attempting purchase:', property.name, 'by', player.name, 'at position', player.position);
    console.log('Property ID:', property.id, 'Player position space ID:', gameState.boardSpaces[player.position].id);
    
    // Validate player is on this property
    const currentSpace = gameState.boardSpaces[player.position];
    if (currentSpace.id !== property.id) {
        addLog(`❌ ${player.name} cannot purchase ${property.name} - not on that space!`, 'crisis');
        console.error('Position mismatch:', currentSpace.id, '!==', property.id);
        closeModal();
        completeTurnResolution();
        return;
    }
    
    // Validate property is unowned
    if (property.owner !== null) {
        addLog(`❌ ${property.name} is already owned!`, 'crisis');
        console.error('Property already owned by:', property.owner);
        closeModal();
        completeTurnResolution();
        return;
    }
    
    // Validate player has enough credits
    if (player.ecoCredits < property.cost) {
        addLog(`❌ ${player.name} cannot afford ${property.name} (need ${property.cost} Credits)`, 'crisis');
        console.error('Insufficient credits:', player.ecoCredits, '<', property.cost);
        closeModal();
        completeTurnResolution();
        return;
    }
    
    // Purchase successful
    player.ecoCredits -= property.cost;
    property.owner = player.id;
    property.path = path;
    player.properties.push(property.id);
    
    if (path === 'eco') {
        player.sustainabilityScore += 5;
        addLog(`✅ ${player.name} bought ${property.name} (Eco Path) for ${property.cost} Credits (low rent, +5 SS, no pollution)`, 'important');
    } else {
        player.carbonTokens += 1;
        gameState.globalCO2 += 1;
        addLog(`✅ ${player.name} bought ${property.name} (Industrial Path) for ${property.cost} Credits (high rent, +1 CO2 pollution)`, 'important');
    }
    
    console.log('Purchase successful!', property.name, 'now owned by', player.name);
    
    closeModal();
    renderBoard();
    updateUI();
    checkCO2Thresholds();
    completeTurnResolution();
}

function payRent(property) {
    const player = getCurrentPlayer();
    const owner = gameState.players[property.owner];
    
    // Ensure upgrades property exists
    if (property.upgrades === undefined) {
        property.upgrades = 0;
    }
    
    let rent = 100;
    const pathLabel = property.path === 'eco' ? 'Eco (lower)' : 'Industrial (higher)';
    if (property.path === 'eco') {
        rent = 100 + (property.upgrades * 50);
    } else {
        rent = 200 + (property.upgrades * 75);
    }
    
    if (player.ecoCredits >= rent) {
        player.ecoCredits -= rent;
        owner.ecoCredits += rent;
        addLog(`💸 ${player.name} paid ${rent} Credits rent to ${owner.name} for ${property.name} Level ${property.upgrades} (${pathLabel} rent)`);
    } else {
        // Can't afford full rent
        const payment = player.ecoCredits;
        player.ecoCredits = 0;
        owner.ecoCredits += payment;
        player.sustainabilityScore -= 5;
        addLog(`💸 ${player.name} only paid ${payment} Credits (insufficient funds, -5 SS penalty)`, 'crisis');
    }
    
    updateUI();
}

function completeTurnResolution() {
    gameState.turnPhase = 'action';
    document.getElementById('endTurnBtn').disabled = false;
    addLog('🔄 Choose a strategic action or end your turn');
}

// End Turn
function endTurn() {
    const player = getCurrentPlayer();
    
    // Apply CO2 from industrial properties each turn
    let co2Generated = 0;
    player.properties.forEach(propId => {
        const prop = gameState.boardSpaces[propId];
        if (prop && prop.path === 'industrial') {
            co2Generated += 1;
        }
    });
    
    if (co2Generated > 0) {
        player.carbonTokens += co2Generated;
        gameState.globalCO2 += co2Generated;
        addLog(`🏭 ${player.name}'s industrial properties generated ${co2Generated} CO2`);
        checkCO2Thresholds();
    }
    
    // Check personal CO2 threshold
    if (player.carbonTokens >= 6) {
        triggerPersonalDisaster(player);
    }
    
    // Move to next player
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.numPlayers;
    
    // Check if round complete
    if (gameState.currentPlayerIndex === 0) {
        gameState.round++;
        addLog(`🔔 Round ${gameState.round} begins!`, 'important');
        
        // Check for global events every 5 rounds
        if (gameState.round % 5 === 0) {
            triggerGlobalEvent(gameState.round);
        }
        
        // Check if game over
        if (gameState.round > gameState.maxRounds) {
            endGame();
            return;
        }
    }
    
    // Reset turn state
    gameState.diceRolled = false;
    gameState.turnPhase = 'roll';
    document.getElementById('rollDiceBtn').disabled = false;
    document.getElementById('endTurnBtn').disabled = true;
    
    updateUI();
    addLog(`➡️ ${getCurrentPlayer().name}'s turn begins`);
}

// Get current player
function getCurrentPlayer() {
    return gameState.players[gameState.currentPlayerIndex];
}

// Modal Functions
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.getElementById('modalOverlay').classList.remove('active');
}

// Activity Log
function addLog(message, type = '') {
    const logContainer = document.getElementById('logMessages');
    const logEntry = document.createElement('div');
    logEntry.className = `log-message ${type}`;
    logEntry.textContent = message;
    
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Keep only last 50 messages
    while (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.lastChild);
    }
    
    // Auto-scroll to top (newest message)
    logContainer.scrollTop = 0;
}

// Update UI
function updateUI() {
    // Update header
    document.getElementById('roundNumber').textContent = gameState.round;
    document.getElementById('globalCO2').textContent = gameState.globalCO2;
    
    // Update current player info
    const player = getCurrentPlayer();
    document.getElementById('playerCredits').textContent = player.ecoCredits;
    document.getElementById('playerSS').textContent = player.sustainabilityScore;
    document.getElementById('playerCI').textContent = player.communityInfluence;
    document.getElementById('playerCO2').textContent = player.carbonTokens;
    
    const playerInfo = document.getElementById('currentPlayerInfo');
    playerInfo.querySelector('.player-name').textContent = player.name;
    playerInfo.querySelector('.player-token').textContent = player.token;
    
    // Update all players list
    updateAllPlayersList();
}

function updateAllPlayersList() {
    const container = document.getElementById('allPlayersList');
    container.innerHTML = '';
    
    gameState.players.forEach((player, index) => {
        const div = document.createElement('div');
        div.className = 'player-summary';
        if (index === gameState.currentPlayerIndex) {
            div.classList.add('active');
        }
        
        const spaceName = gameState.boardSpaces[player.position]?.name || 'Unknown';
        
        div.innerHTML = `
            <div class="player-summary-header">
                <span class="player-summary-name">${player.token} ${player.name}</span>
                <span class="player-position-badge">Space ${player.position}</span>
            </div>
            <div class="player-position-name">📍 ${spaceName}</div>
            <div class="player-summary-stats">
                <div>💰 ${player.ecoCredits}</div>
                <div>🌱 ${player.sustainabilityScore}</div>
                <div>👥 ${player.communityInfluence}</div>
                <div>🏭 ${player.carbonTokens}</div>
            </div>
        `;
        
        container.appendChild(div);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});
