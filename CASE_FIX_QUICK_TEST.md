# 🚀 Quick Start: Testing Case Details Fix

## Test Steps

### 1. Navigate to Cases Page
```
http://localhost:3000/clerk/cases
```

### 2. Test Case Details (Grid View)
Click each case card and verify unique details:

| Case ID | Expected Title | Expected Priority | Expected Court |
|---------|---------------|------------------|----------------|
| 1 | State vs John Doe | High | District Court I |
| 2 | Smith vs ABC Corp | Medium | District Court II |
| 3 | Divorce - Jane vs Mark | Low | Family Court |
| 4 | State vs Crime Syndicate | Critical | Sessions Court |
| 5 | Property Dispute - Kumar vs Singh | Medium | District Court I |

### 3. Test Case Details (Table View)
- Click table/grid toggle
- Click "View" button on any row
- Verify correct case opens

### 4. Visual Checks
- [ ] Grid cards have rounded corners and shadows
- [ ] Hover on cards shows scale effect and darker border
- [ ] Table rows have gradient hover effect
- [ ] Priority badges show correct colors:
  - Critical = Red
  - High = Amber
  - Medium = Blue
  - Low = Green
- [ ] Status badges have visible borders
- [ ] Favorite stars have background when active
- [ ] Action buttons fill with color on hover

---

## Quick Command Reference

### Start Development Server
```powershell
npm start
```

### Check for Errors
```powershell
npm run build
```

### Navigate Directly to Case
```
http://localhost:3000/clerk/case/1  # Case 1
http://localhost:3000/clerk/case/5  # Case 5
http://localhost:3000/clerk/case/10 # Case 10
```

---

## Expected Behavior

✅ **Correct**: Each case shows unique:
- Case number (CRL/CIV/FAM)
- Title with party names
- Judge name
- Court location
- Hearing dates
- Priority level
- Status

❌ **Incorrect**: All cases showing "State vs John Doe"

---

## Color Reference (Quick Visual Check)

### Priority Colors
- 🔴 **Critical**: Red border, red text
- 🟠 **High**: Amber border, amber text
- 🔵 **Medium**: Blue border, blue text
- 🟢 **Low**: Green border, green text

### Status Colors
- 🟢 **Active**: Green
- 🟠 **Pending**: Amber
- ⚪ **Closed**: Gray

---

## Troubleshooting

### Issue: All cases still show same data
**Solution**: Clear browser cache and reload
```powershell
Ctrl + Shift + R  # Hard reload
```

### Issue: UI looks plain
**Solution**: Check browser console for CSS loading errors

### Issue: Case details not loading
**Solution**: Check route parameter in URL bar

---

**Happy Testing! 🎉**
