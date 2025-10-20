# EcoPoly - Quick Reference Guide

## 🎮 Quick Start
1. Open `game_app/index.html` in browser
2. Click "Start New Game"
3. Set players (2-6) and game mode
4. Roll dice → Resolve space → Take action → End turn

## 📊 Resources
| Resource | Symbol | Starting | Purpose |
|----------|--------|----------|---------|
| EcoCredits | 💰 | 1500 | Currency for purchases |
| Sustainability Score | 🌱 | 50 | Environmental impact |
| Community Influence | 👥 | 0 | Political power |
| Carbon Tokens | 🏭 | 0 | Pollution (penalty) |

## 🎯 Winning
**GIS = SS + (Credits÷100) + CI - (CO2×5)**

Highest GIS wins. Tie-breaker: Lower CO2, then higher Credits.

## 🏢 Property Paths
| Path | Rent | SS | CO2 | Strategy |
|------|------|----|----|----------|
| 🌱 Eco | Low | +5 | 0 | Long-term value |
| 🏭 Industrial | High | 0 | +1/round | Short-term profit |

## 🃏 Card Types
- **🌱 Green Cards**: Positive events, automatic bonuses
- **⚠️ Crisis Cards**: Challenges with choices
- **🏛️ Policy Cards**: Voted on in Global Summits

## ⚡ Strategic Actions
| Action | Cost | Effect |
|--------|------|--------|
| 💡 Invest in Innovation | ₑ300 | Draw Green Card |
| 📢 Launch Campaign | ₑ150 | +3 Community Influence |
| ♻️ Offset Emissions | ₑ100/token | Remove Carbon Tokens |
| 🏛️ Lobby for Policy | Free (1×) | Propose policy vote |

## 🌡️ CO2 Thresholds
| Global CO2 | Event |
|------------|-------|
| 10 | ⚠️ Climate Warning |
| 20 | 🌪️ Extreme Weather (all lose ₑ100) |
| 30 | 🏛️ Global Summit (vote on policy) |
| 40 | 🔥 Climate Crisis (properties destroyed) |

**Personal CO2 ≥ 6**: Disaster roll (1d6)

## ⌨️ Keyboard Shortcuts
- **Space**: Roll dice (if roll phase)
- **Enter**: End turn (if action phase)
- **Escape**: Close modals
- **H**: Show help/rules

## 🎲 Turn Phases
1. **Roll**: Press "Roll Dice" or Space
2. **Move**: Automatic (watch token hop!)
3. **Resolve**: Handle the space you land on
4. **Action**: Choose strategic action (optional)
5. **End**: Press "End Turn" or Enter

## 📍 Space Types
| Space | Icon | Effect |
|-------|------|--------|
| Start | 🏁 | Collect ₑ200 when passing |
| Property | Various | Buy or pay rent |
| Green Card | 🌱 | Draw positive card |
| Crisis Card | ⚠️ | Draw challenge card |
| Carbon Tax | 💸 | Pay ₑ50 per CO2 token |
| Eco Fund | 💚 | Receive ₑ150 |
| Global Summit | 🏛️ | Vote on policy |

## 🎮 Game Modes
**Competitive**: Highest GIS wins
**Co-op**: Keep global CO2 < 40 by round 20
**Corporate**: One secret polluter vs others

## 💾 Auto-Save
Game auto-saves every 30 seconds. Reload page to continue.

## 🐛 Debug Console
Open browser console (F12) and use:
```javascript
EcoPolyDebug.addCredits(500)  // Add credits
EcoPolyDebug.addSS(10)        // Add SS
EcoPolyDebug.skipToRound(15)  // Jump to round
EcoPolyDebug.getState()       // View game state
```

## 🏆 Scoring Example
Player with:
- SS: 75
- Credits: ₑ2000 → 20 points
- CI: 15
- CO2: 3 → -15 penalty

**GIS = 75 + 20 + 15 - 15 = 95**

## 📱 Mobile Tips
- Rotate to landscape for better view
- Tap and hold for property info
- Use sidebar scroll for full log
- Modals are touch-friendly

## ⚠️ Common Mistakes
❌ Forgetting CO2 generates each round from Industrial properties
❌ Not offsetting emissions before threshold
❌ Ignoring Community Influence for votes
❌ Only focusing on Credits, not SS
❌ Not using strategic actions

## ✅ Pro Tips
✓ Balance Eco and Industrial for best results
✓ Offset CO2 before hitting threshold 6
✓ Build Community Influence early
✓ Watch global CO2 - it affects everyone
✓ Convert Industrial to Eco mid-game
✓ Use strategic actions strategically!
✓ Complete property sets for bonuses

## 🎓 Teaching Tips
- Play cooperatively first to learn
- Discuss real-world parallels
- Pause to explain CO2 impacts
- Compare strategies after game
- Use as discussion starter
- Follow up with real climate data

## 🆘 Troubleshooting
**Dice won't roll**: Check turn phase (should be "roll")
**Button disabled**: Not the right phase for that action
**Modal stuck**: Press Escape or refresh page
**Game frozen**: Check console for errors (F12)
**Lost progress**: Check localStorage for autosave

## 📞 Need Help?
- Press **H** for in-game rules
- Check README.md for full documentation
- Review PROJECT_REPORT for detailed mechanics
- Try tutorial mode (first game has hints)

---

**Remember: Balance profit and planet! 🌍💚**
