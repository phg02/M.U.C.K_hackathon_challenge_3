# EcoPoly: Environmental Board Game

## 🌍 Overview

**EcoPoly** is an educational web-based board game that teaches players about the critical balance between economic growth and environmental sustainability. Players compete (or cooperate) to build the most sustainable city while managing resources, carbon emissions, and community influence.

### Theme
**Climate Change & Sustainability** - A pressing global challenge affecting both Vietnam and Australia

### Game Type
Strategic Board Game (Digital Adaptation)

### Players
2-6 players (Recommended: 4)

### Duration
60-120 minutes (20 rounds)

---

## 🎮 How to Play

### Quick Start
1. Open `game_app/index.html` in any modern web browser
2. Click "Start New Game"
3. Select number of players (2-6) and enter names
4. Choose game mode (Competitive, Co-op, or Corporate)
5. Click "Start Game" and follow the on-screen instructions

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or setup required
- No backend or server needed
- Runs entirely in the browser

---

## 🎯 Game Objective

### Competitive Mode
Achieve the highest **Global Impact Score (GIS)** by the end of 20 rounds.

**GIS Formula:**
```
GIS = Sustainability Score + (EcoCredits ÷ 100) + Community Influence - (Carbon Tokens × 5)
```

### Co-op Mode
Work together to keep Global CO2 below 40 by round 20.

### Corporate Mode
One secret player tries to maximize profits while others work for sustainability.

---

## 📋 Game Mechanics

### Resources
- **💰 EcoCredits** - Primary currency (starting: ₑ1500)
- **🌱 Sustainability Score** - Environmental impact metric (starting: 50)
- **👥 Community Influence** - Political power for voting (starting: 0)
- **🏭 Carbon Tokens** - Pollution footprint (starting: 0)

### Turn Structure
1. **Roll Dice** (2d6) and move your token
2. **Resolve Space** you land on:
   - **Properties**: Buy with Eco or Industrial path
   - **Green Cards**: Positive events
   - **Crisis Cards**: Challenging choices
   - **Carbon Tax**: Pay based on your emissions
   - **Eco Fund**: Receive funding
   - **Global Summit**: Vote on policies
3. **Strategic Action** (Optional):
   - Invest in Innovation (ₑ300)
   - Launch Campaign (ₑ150)
   - Offset Emissions (ₑ100/token)
   - Lobby for Policy (once per game)
4. **End Turn**

### Property System

#### Eco Path 🌱
- Lower rent income
- +5 Sustainability Score
- No CO2 emissions
- Builds long-term value

#### Industrial Path 🏭
- Higher rent income
- Generates 1 CO2 per round
- Short-term profits
- Can be converted to Eco later

### CO2 Thresholds
Global CO2 triggers events:
- **10 CO2**: Climate Warning ⚠️
- **20 CO2**: Extreme Weather (all lose ₑ100) 🌪️
- **30 CO2**: Global Summit 🏛️
- **40 CO2**: Climate Crisis (property destruction) 🔥

Personal CO2 >= 6 triggers disaster roll for that player.

---

## 🏆 Winning

Game ends after 20 rounds. Player with highest GIS wins!

**Tie-breakers:**
1. Lowest Carbon Tokens
2. Most EcoCredits

---

## 💡 Educational Value

EcoPoly teaches:
- **Sustainability Trade-offs**: Balance profit vs. planet
- **Collective Action**: Individual choices affect everyone
- **Policy Impact**: Governance matters in climate action
- **Real-world Concepts**: Carbon footprint, green technology, community engagement
- **Systems Thinking**: Understanding interconnected environmental challenges

---

## 🛠️ Technology Stack

### Core Technologies
- **HTML5** - Structure and content
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Game logic and interactivity

### AI Tools Used
- **ChatGPT/Claude** - Game design, mechanics, code generation
- **AI Prompts** - See `prompts/` directory for all prompts used

### Features
- Pure frontend (no backend required)
- Responsive design
- Auto-save functionality
- Keyboard shortcuts (Space=Roll, Enter=End Turn, Esc=Close Modal)
- Debug console tools

---

## 📁 Project Structure

```
game_submission/
├── README.md                    # This file
├── project_report.pdf           # Detailed project report
├── youtube_link.txt             # Demo video URL
├── prompts/                     # All AI prompts used
│   ├── concept_prompts.txt
│   ├── asset_generation_prompts.txt
│   ├── code_generation_prompts.txt
│   └── refinement_prompts.txt
├── game_app/                    # Playable game
│   ├── index.html              # Main entry point
│   ├── css/
│   │   └── styles.css          # All styling
│   ├── js/
│   │   ├── game.js             # Core game logic
│   │   ├── cards.js            # Card system & events
│   │   ├── board.js            # Board & strategic actions
│   │   └── ui.js               # UI utilities
│   └── assets/                 # Game assets
└── screenshots/                 # Game screenshots
    ├── menu_screen.png
    ├── play_screen1.png
    ├── play_screen2.png
    ├── play_screen3.png
    └── results_screen.png
```

---

## 🎨 Visual Design

### Color Palette
- **Primary Green**: #2ecc71 (Eco/Sustainability)
- **Blue**: #3498db (Urban/Water)
- **Orange**: #f39c12 (Energy/Warning)
- **Purple**: #9b59b6 (Policy)
- **Red**: #e74c3c (Crisis/Danger)
- **Dark**: #1a1a2e (Background)

### Player Tokens
🌿 🌱 🌳 🍃 🌾 🌻

### Icons
Extensive use of emoji for visual representation of game elements.

---

## 🚀 Future Enhancements

Potential additions:
- Sound effects and background music
- Animation improvements
- Advanced AI opponents
- Multiplayer online mode
- Achievement system
- Custom scenarios
- Mobile app version
- Localization (Vietnamese, English)

---

## 👥 Target Audience

- **Students** (Ages 12+) - Learning about sustainability
- **Educators** - Teaching climate concepts
- **Families** - Fun educational gaming
- **Environmental Advocates** - Raising awareness
- **Board Game Enthusiasts** - Strategic gameplay

---

## 📚 Learning Outcomes

Players will:
1. Understand carbon footprint concepts
2. Learn about renewable vs. fossil energy
3. Experience policy-making challenges
4. See consequences of short-term vs. long-term thinking
5. Appreciate collective action in climate issues

---

## 🌏 Social Impact

EcoPoly addresses:
- **Climate Change Awareness** - Making abstract concepts tangible
- **Education Access** - Free, browser-based learning tool
- **Community Engagement** - Discussion starter for sustainability
- **Behavioral Change** - Encouraging eco-conscious thinking

---

## 📖 Credits

**Developed for:** Challenge 3 - Hackathon: Social Impact Gaming

**Theme:** Climate Change & Sustainability

**Context:** Global Environmental Action (Vietnam & Australia)

**Version:** 1.0

**Year:** 2025

---

## 📞 Contact & Support

For questions, feedback, or issues, please refer to the project repository or contact information provided in the project report.

---

## 📄 License

This educational game is created for the hackathon challenge. Please refer to project documentation for usage rights.

---

## 🎓 Educational Use

Teachers and educators are encouraged to use EcoPoly in classrooms to:
- Introduce climate concepts
- Facilitate discussions on sustainability
- Demonstrate systems thinking
- Engage students in interactive learning

Lesson plans and educational guides available in project report.

---

**Play responsibly. Think sustainably. Act globally. 🌍**
