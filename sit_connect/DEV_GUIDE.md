# SitConnect - Developer Testing Guide

## 🚀 Quick Start

### Dev Panel (Bottom Right Corner)
Click the **purple bug icon** in the bottom right to access the Dev Panel. This allows you to:
- Jump to any screen instantly
- Switch between Parent and Student roles
- Add mock notices with one click
- See current screen and role

### Data Manager (Bottom Left Corner)
Click the **blue database icon** in the bottom left to access the Data Manager. This provides:
- **Local Storage Stats** - See notice count, applicants, storage used
- **Export Data** - Download a JSON backup file
- **Import Data** - Restore from a previous backup
- **Clear All Data** - Reset the app (with confirmation)
- **Auto-save** - Data automatically saves every 2 seconds

### Testing Flows

#### **Parent Flow**
1. Welcome → Select "I'm a Parent"
2. Sign In (any email/password works)
3. **Parent Home** - View your notices
4. **Post Notice** - Create a babysitting request
   - Add date, time, pay rate, area
   - Add children with age, gender, interests
5. **Notice Detail** - View applicants
   - See student profiles
   - Select babysitters

#### **Student Flow**
1. Welcome → Select "I'm a Student"
2. Sign In (any email/password works)
3. **Student Home** - Browse available jobs
4. **Notice Detail** - View job details & apply
5. **Profile** - Edit your babysitter profile
   - Update experience
   - Add interests (tap pre-defined or add custom)
   - Update contact info

### Quick Testing Tips

**Use Dev Panel to:**
- Jump directly to "Parent Home" or "Student Home" (skips auth)
- Jump to "Parent Notice Detail" to see applicants
- Add mock notices instantly
- Switch roles without signing out

**Pre-filled Mock Data:**
- 2 sample notices already exist
- 3 mock student applicants (Emma, Michael, Sofia)
- Sample applications on first notice

**Bottom Navigation:**
- Available when logged in as Parent or Student
- Quick access to Home, Post (Parents), and Profile

### Key Features to Test

✅ **Parent Side:**
- Post a notice with multiple children
- View applicants on a notice
- Select a babysitter (shows success toast)
- View student full profiles
- Edit parent profile

✅ **Student Side:**
- Browse all notices
- Apply to a job (button changes to "Applied")
- Edit profile with interests
- Message on WhatsApp (placeholder link)

✅ **UI Features:**
- Toast notifications for actions
- Bottom navigation (shows on main screens)
- Large tap targets (48px minimum)
- Orange/Brown/Beige color scheme
- Mobile-optimized (390px)

✅ **Backend Features (No Server Required!):**
- **Local Storage** - All data persists in browser
- **Auto-save** - Changes saved every 2 seconds
- **Export/Import** - Backup and restore data as JSON
- **Browser Notifications** - Get alerts for new applicants/selections
- **Offline Ready** - Works without internet connection

### Common Testing Scenarios

**Scenario 1: Parent posts and selects sitter**
1. Dev Panel → Jump to "Parent Home" (as Parent)
2. Click "Post a Notice"
3. Fill form, click "Post Notice"
4. Click on the notice from home
5. Review applicants and click "Select"

**Scenario 2: Student applies for job**
1. Dev Panel → Jump to "Student Home" (as Student)
2. Click any notice
3. Click "Apply for this job"
4. See "Applied" state and toast

**Scenario 3: Quick mock data**
1. Open Dev Panel
2. Click "Add Mock Notice" multiple times
3. See new notices appear on both Parent and Student home screens

**Scenario 4: Data backup & restore**
1. Open Data Manager (blue icon, bottom left)
2. Click "Export Data" to download backup
3. Make some changes (add notices, apply to jobs)
4. Click "Import Data" and select your backup file
5. See data restored to previous state

**Scenario 5: Browser notifications**
1. Go to Parent or Student Profile
2. Click "Enable Notifications"
3. Allow notifications in browser prompt
4. Apply to a job or select an applicant
5. See browser notification appear!

### Data Structure

**Notice includes:**
- Date, Time, Pay per hour
- Area/Location
- Notes
- Children (age, gender, interests)
- Applicant count

**Student Profile includes:**
- Name, Grad year
- Years of experience
- Interests/skills (tags)
- Bio
- Email, Phone

### Tips for Best Testing Experience

1. **Start with Dev Panel** - Jump to screens instead of clicking through
2. **Add Mock Data** - Click "Add Mock Notice" to populate the app
3. **Test Both Roles** - Use Dev Panel to quickly switch
4. **Check Toasts** - Look for success messages after actions
5. **Mobile View** - Keep browser at ~390px width for authentic mobile experience
6. **Export Before Clearing** - Always export data before clicking "Clear All Data"
7. **Enable Notifications** - Test browser notifications for full experience
8. **Refresh Page** - Data persists! Reload to see localStorage in action

## 🎨 Color Palette

- **Primary Orange:** #F36B2A
- **Heading Brown:** #5A3E2B
- **Background Beige:** #FFF6EE
- **White Cards:** #FFFFFF
- **Gray Text:** Various shades

## 📱 Screen Map

```
Welcome
├── Sign In → Parent Home
│              ├── Post Notice → Parent Home
│              ├── Notice Detail → View Profile
│              └── Profile (Edit, Enable Notifications, Sign Out)
└── Sign In → Student Home
               ├── Notice Detail (Apply)
               └── Profile (Edit, Interests, Enable Notifications)
```

## 💾 Backend Features (LocalStorage)

### How It Works
SitConnect uses **browser localStorage** as a backend - no server or paid service needed!

- ✅ **Persistent Data** - All notices, applications, and profiles saved
- ✅ **Auto-save** - Changes automatically saved every 2 seconds
- ✅ **Works Offline** - No internet connection required
- ✅ **Export/Import** - Backup your data as JSON files
- ✅ **Browser Notifications** - Get alerts for important events

### Storage Limits
- Most browsers: ~5-10MB of storage
- Enough for hundreds of notices and applications
- Check storage usage in Data Manager

### Data Backup Strategy
1. Regularly export your data (Data Manager → Export)
2. Keep backups before testing destructive operations
3. Import to restore from backup

### Browser Notifications
After enabling notifications in your profile:
- **Parents** get notified when students apply
- **Students** get notified when selected
- Notifications work even when tab is in background!

## 🔧 Technical Notes

**Tech Stack:**
- React + TypeScript
- Tailwind CSS
- LocalStorage API
- Notifications API
- No backend server required!

**Key Libraries:**
- sonner - Toast notifications
- lucide-react - Icons

Happy Testing! 🎉
