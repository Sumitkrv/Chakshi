# 🧪 Quick Test: Fake Case Checker UI

## Test the Enhanced Buttons

### 1. Auto-Scan Toggle
✅ **Visibility Check**
- Should see clear white container with label
- Toggle switch should be prominent (14px wide, 7px tall)
- When OFF: Gray background with white circle on left
- When ON: Gold background with white circle on right
- When ON: Green "Active" text with pulsing dot appears

✅ **Interaction Check**
- Click toggle - should animate smoothly
- Hover toggle - should scale up slightly (105%)
- Focus with Tab key - should show blue ring

---

### 2. Run Scan Button
✅ **Visibility Check**
- Solid gold background (not gradient)
- White text with search icon
- Clear shadow below button (4px blur)
- Button has 2px gold border

✅ **Interaction Check**
- Hover - background darkens to #a08a65
- Hover - button scales up (105%)
- Click - triggers scan
- During scan:
  - Shows spinning circle animation
  - Text changes to "Scanning..."
  - Button becomes disabled (50% opacity)
  - No scale on hover when disabled

---

### 3. Risk Threshold Slider
✅ **Visibility Check**
- Track is 3px tall (not 2px)
- Filled portion is gold, unfilled is gray
- Thumb is 20px circle with white border
- Current value shows in gold badge (top right)
- Three colored badges below (Low/Medium/High)

✅ **Interaction Check**
- Drag slider - thumb moves smoothly
- Hover thumb - scales to 120%
- Focus with Tab - shows blue ring
- Value updates in real-time in badge

---

### 4. Scan Progress Bar (During Scan)
✅ **Visibility Check**
- Bar is 4px tall (not 2px)
- Has 2px border around it
- Progress fills with gold gradient
- Percentage shows INSIDE the bar (when > 10%)
- Pulsing dot below with status message

✅ **Interaction Check**
- Progress fills smoothly from 0-100%
- Percentage text visible after 10%
- Status message shows with animated dot
- Disappears when scan completes

---

## Color Verification

### Gold Elements (#b69d74)
- [x] Toggle switch background (when ON)
- [x] Run Scan button background
- [x] Slider filled track
- [x] Slider thumb
- [x] Progress bar fill
- [x] Value badges

### White Elements
- [x] Header background
- [x] Toggle container
- [x] Button text
- [x] Slider thumb border
- [x] Progress percentage text

### Border Colors (#1f283915)
- [x] Header border
- [x] Toggle container border
- [x] Button border
- [x] Progress bar border

---

## Quick Visual Test

Navigate to: `/clerk/fraud-detection` or `/clerk/fake-case-checker`

### Before Clicking Anything
```
Should see:
┌────────────────────────────────────────┐
│ Fake Case Checker                      │
│                                        │
│ [Auto-scan ○──]  [🔍 Run Scan]       │
│                                        │
│ Risk Threshold           [70%]        │
│ ├────────●──────┤                     │
│ [50% Low] [70% Med] [90% High]        │
└────────────────────────────────────────┘
```

### After Clicking Run Scan
```
Should see:
┌────────────────────────────────────────┐
│ Fake Case Checker                      │
│                                        │
│ [Auto-scan ●── ● Active] [⟳ Scanning...]│
│                                        │
│ Risk Threshold           [70%]        │
│ ├────────●──────┤                     │
│                                        │
│ Scan Progress            [45%]        │
│ [██████ 45% ░░░░░░░░░░]              │
│ ● Analyzing cases...                  │
└────────────────────────────────────────┘
```

---

## Mobile/Responsive Test

On small screens:
- Buttons should stack vertically
- Toggle and button remain full width
- Slider works with touch
- All text remains readable

---

## Accessibility Test

### Keyboard Navigation
1. Press Tab - should focus auto-scan toggle
2. Press Space - should toggle switch
3. Press Tab - should focus Run Scan button
4. Press Enter - should start scan
5. Press Tab - should focus slider
6. Press Arrow keys - should move slider

### Screen Reader Test
- Toggle announces: "Auto-scan, toggle button, off/on"
- Button announces: "Run Scan, button"
- Slider announces: "Risk Threshold, slider, 70 percent"

---

## Common Issues to Check

### If Toggle Not Visible
❌ Check: Background might be transparent
✅ Should: Have solid white background with shadow

### If Button Not Visible
❌ Check: Gradient might not render
✅ Should: Have solid #b69d74 background with shadow

### If Slider Hard to Click
❌ Check: Thumb might be default size (tiny)
✅ Should: Have 20px circular thumb with white border

### If Progress Bar Too Small
❌ Check: Height might be 2px
✅ Should: Be 4px with visible borders

---

## Expected Behavior

| Action | Visual Feedback | Duration |
|--------|----------------|----------|
| Toggle switch | Slide animation | 300ms |
| Button hover | Scale + color change | 300ms |
| Button click | Start scan immediately | - |
| Scanning | Progress 0→100% | ~2 seconds |
| Slider drag | Smooth thumb movement | Instant |
| Slider hover | Thumb scales up | 300ms |

---

**If all checkboxes pass, the UI is working perfectly!** ✅
