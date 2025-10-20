// ===================================
// EcoPoly: UI Utilities and Helpers
// ===================================

// Additional UI helper functions

// Show notification toast
function showNotification(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'rgba(46, 204, 113, 0.9)' : 
                     type === 'error' ? 'rgba(231, 76, 60, 0.9)' : 
                     'rgba(52, 152, 219, 0.9)'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Format currency
function formatCurrency(amount) {
    return `${amount.toLocaleString()} Credits`;
}

// Get zone color
function getZoneColor(zone) {
    const colors = {
        'energy': '#f39c12',
        'urban': '#3498db',
        'natural': '#2ecc71',
        'policy': '#9b59b6'
    };
    return colors[zone] || '#95a5a6';
}

// Animate value change
function animateValue(element, start, end, duration = 500) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Highlight player token
function highlightPlayerToken(playerId) {
    const players = document.querySelectorAll('.player-token-on-board');
    players.forEach((token, idx) => {
        if (idx === playerId) {
            token.style.transform = 'scale(1.3)';
            token.style.filter = 'drop-shadow(0 0 10px rgba(46, 204, 113, 0.8))';
        } else {
            token.style.transform = 'scale(1)';
            token.style.filter = 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5))';
        }
    });
}

// Show loading spinner
function showLoading(show = true) {
    let loader = document.getElementById('loadingSpinner');
    
    if (!loader && show) {
        loader = document.createElement('div');
        loader.id = 'loadingSpinner';
        loader.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            border: 5px solid rgba(46, 204, 113, 0.3);
            border-top-color: #2ecc71;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            z-index: 10000;
        `;
        document.body.appendChild(loader);
    } else if (loader && !show) {
        loader.remove();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Only process if not in input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    // Space = roll dice
    if (e.code === 'Space' && gameState.turnPhase === 'roll') {
        e.preventDefault();
        rollDice();
    }
    
    // Enter = end turn
    if (e.code === 'Enter' && gameState.turnPhase === 'action') {
        e.preventDefault();
        endTurn();
    }
    
    // Escape = close modal
    if (e.code === 'Escape') {
        closeModal();
    }
    
    // H = help
    if (e.code === 'KeyH') {
        showHelp();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// Auto-save functionality (using localStorage)
function saveGameState() {
    try {
        localStorage.setItem('ecopoly_autosave', JSON.stringify(gameState));
        console.log('Game auto-saved');
    } catch (e) {
        console.error('Failed to save game:', e);
    }
}

function loadGameState() {
    try {
        const saved = localStorage.getItem('ecopoly_autosave');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load game:', e);
    }
    return null;
}

function clearSavedGame() {
    localStorage.removeItem('ecopoly_autosave');
}

// Auto-save every 30 seconds during gameplay
setInterval(() => {
    if (gameState.currentScreen === 'game') {
        saveGameState();
    }
}, 30000);

// Confirm before closing/refreshing during game
window.addEventListener('beforeunload', (e) => {
    if (gameState.currentScreen === 'game') {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Stats display helper
function getPlayerStats(player) {
    return {
        gis: calculateGIS(player),
        properties: player.properties.length,
        ecoProperties: player.properties.filter(id => {
            const prop = gameState.boardSpaces[id];
            return prop && prop.path === 'eco';
        }).length,
        industrialProperties: player.properties.filter(id => {
            const prop = gameState.boardSpaces[id];
            return prop && prop.path === 'industrial';
        }).length
    };
}

function calculateGIS(player) {
    return player.sustainabilityScore + 
           Math.floor(player.ecoCredits / 100) + 
           player.communityInfluence - 
           (player.carbonTokens * 5);
}

// Tutorial hints
const tutorialHints = [
    "💡 Tip: Eco properties generate less rent but improve your Sustainability Score!",
    "💡 Tip: Watch your Carbon Tokens - high levels trigger personal disasters!",
    "💡 Tip: Community Influence helps in Global Summit votes!",
    "💡 Tip: Strategic actions can turn the game around - use them wisely!",
    "💡 Tip: Convert Industrial properties to Eco to reduce CO2 generation!",
    "💡 Tip: Global CO2 thresholds trigger events that affect all players!",
    "💡 Tip: Balance is key - you need both credits AND sustainability to win!"
];

let hintIndex = 0;

function showRandomHint() {
    if (gameState.currentScreen === 'game') {
        addLog(tutorialHints[hintIndex % tutorialHints.length]);
        hintIndex++;
    }
}

// Show hint every 2 minutes during gameplay
setInterval(showRandomHint, 120000);

// Export functions for debugging in console
window.EcoPolyDebug = {
    getState: () => gameState,
    addCredits: (amount) => {
        getCurrentPlayer().ecoCredits += amount;
        updateUI();
    },
    addSS: (amount) => {
        getCurrentPlayer().sustainabilityScore += amount;
        updateUI();
    },
    skipToRound: (round) => {
        gameState.round = round;
        updateUI();
    },
    triggerEvent: (type) => {
        if (type === 'weather') triggerExtremeWeather();
        else if (type === 'crisis') triggerClimateCrisis();
    }
};

console.log('🌍 EcoPoly Debug tools available via window.EcoPolyDebug');
