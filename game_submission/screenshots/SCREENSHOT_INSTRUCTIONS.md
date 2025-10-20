# Screenshot Instructions for EcoPoly

## Required Screenshots (Maximum 5)

### 1. menu_screen.png
**What to capture:**
- Main menu screen with game title "EcoPoly"
- "Start New Game" button prominently displayed
- "How to Play" and "About" buttons
- Theme info showing "Climate Change & Sustainability"
- Clean, professional appearance

**How to capture:**
1. Open index.html in browser
2. Should automatically show menu screen
3. Take full window screenshot
4. Crop to game area if needed
5. Save as menu_screen.png

---

### 2. play_screen1.png
**What to capture:**
- Full game board with all 40 spaces visible
- Player tokens on various spaces
- Left sidebar showing current player stats
- Right sidebar with all players list and activity log
- Header showing round number and global CO2
- Dice visible in center

**How to capture:**
1. Start a new game with 2-4 players
2. Play a few turns to populate the board
3. Make sure some properties are owned
4. Activity log has several entries
5. Take screenshot during "action" phase
6. Save as play_screen1.png

---

### 3. play_screen2.png
**What to capture:**
- A Crisis Card modal open and displayed
- Card showing challenge text
- Multiple choice options visible
- Game board visible in background (blurred by overlay)
- Shows player decision-making moment

**How to capture:**
1. During gameplay, land on a Crisis Card space
2. Wait for modal to fully appear
3. Ensure card text is readable
4. Options buttons clearly visible
5. Take screenshot
6. Save as play_screen2.png

---

### 4. play_screen3.png
**What to capture:**
- Property purchase modal open
- Property name and details displayed
- Eco Path vs Industrial Path choice buttons
- Cost information visible
- Shows strategic decision point

**How to capture:**
1. During gameplay, land on unowned property
2. Modal should appear with purchase options
3. Both Eco and Industrial buttons visible
4. Property description readable
5. Take screenshot
6. Save as play_screen3.png

---

### 5. results_screen.png
**What to capture:**
- Final results screen
- Winner announcement with trophy 🏆
- All players ranked with their scores
- Global Impact Score displayed
- Individual stats (Credits, SS, CI, CO2) visible
- "Back to Menu" and "Play Again" buttons

**How to capture:**
1. Either play through to round 20 OR
2. Use debug console: `gameState.round = 21; endGame();`
3. Wait for results screen to display
4. Ensure all player rankings visible
5. Take screenshot
6. Save as results_screen.png

---

## Technical Requirements

### Resolution
- Minimum: 1920x1080 (Full HD)
- Recommended: 2560x1440 (2K) or higher
- Format: PNG (for quality and transparency)

### Tools
- macOS: Cmd+Shift+4 (select area) or Cmd+Shift+3 (full screen)
- Windows: Windows+Shift+S or Snipping Tool
- Browser: Developer Tools → Screenshot tool (some browsers)
- Third-party: Lightshot, Greenshot, etc.

### Composition
- Center the game in frame
- Remove browser UI if possible (F11 fullscreen)
- Ensure good contrast and readability
- No visible personal information
- Clean, professional appearance

### File Management
- Save all 5 screenshots in `screenshots/` folder
- Name exactly as specified (lowercase, underscores)
- Check file size (ideally < 2MB each)
- Verify images open correctly

---

## Tips for Best Screenshots

1. **Use a consistent browser window size** for all screenshots
2. **Wait for animations to complete** before capturing
3. **Ensure text is sharp and readable** at full resolution
4. **Show gameplay in progress** rather than empty states
5. **Include variety** - different game situations
6. **Check lighting/contrast** - should look professional
7. **Avoid UI glitches** - reload page if elements look wrong
8. **Test on different displays** - ensure quality on various screens

---

## Quick Screenshot Sequence

For fastest results:
1. Open game in browser
2. Take menu screenshot immediately
3. Start game with 3 players
4. Roll dice and move 2-3 turns
5. Use debug to add credits and buy properties
6. Land on card space - screenshot when modal opens
7. Land on property - screenshot purchase modal
8. Use `gameState.round = 21; endGame();` in console
9. Screenshot results screen
10. Review all 5 images
11. Retake any that aren't perfect

---

## Verification Checklist

Before finalizing:
- [ ] All 5 screenshots present in screenshots/ folder
- [ ] Correct filenames (exactly as specified)
- [ ] PNG format
- [ ] Good resolution (1920x1080 minimum)
- [ ] Images are clear and readable
- [ ] Show game functionality clearly
- [ ] Professional appearance
- [ ] No personal/sensitive information visible
- [ ] File sizes reasonable (< 2MB each)
- [ ] Tested opening in different viewers

---

## Alternative: Using Browser Developer Tools

Some browsers offer screenshot tools:
1. Open Developer Tools (F12)
2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
3. Type "screenshot"
4. Select "Capture full size screenshot" or "Capture node screenshot"
5. Choose appropriate element
6. Save with correct filename

This method ensures consistent sizing and quality.
