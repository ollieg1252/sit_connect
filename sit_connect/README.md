# SitConnect 🎓

A mobile-first web app connecting parents with student babysitters in a school community.

![SitConnect](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![LocalStorage](https://img.shields.io/badge/Backend-LocalStorage-orange)

## Features

### For Parents
- 📝 Post babysitting notices with job details
- 👀 View student applicants with full profiles
- ✅ Select babysitters for your jobs
- 🔔 Get browser notifications when students apply
- 💾 All data persists locally

### For Students
- 📋 Browse available babysitting opportunities
- 🎯 Apply for jobs with one click
- 📱 Build detailed profile with interests and experience
- 🔔 Get notified when selected by parents
- ⭐ Showcase skills and availability

### Technical Highlights
- ✨ **No Backend Required** - Uses browser localStorage
- 📱 **Mobile-First Design** - Optimized for 390px screens
- 🎨 **Custom Design System** - Orange/Brown/Beige palette
- 💾 **Auto-Save** - Data persists automatically
- 📤 **Export/Import** - Backup and restore data
- 🔔 **Browser Notifications** - Real-time alerts
- 🛠️ **Dev Tools** - Built-in testing panel

## Quick Start

### Option 1: Run Locally (Vite)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Option 2: Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

### Option 3: Deploy to GitHub Pages

See `DEPLOYMENT.md` for detailed deployment instructions.

## Testing the App

### Using the Dev Panel

1. Click the **purple bug icon** (bottom right)
2. Jump to any screen instantly
3. Add mock data with one click
4. Switch between Parent/Student roles

### Using the Data Manager

1. Click the **blue database icon** (bottom left)
2. View storage statistics
3. Export data for backup
4. Import previous backups
5. Clear all data (with confirmation)

### Test Scenarios

**Quick Parent Test:**
```
Dev Panel → Jump to "Parent Home" → Click "Post a Notice" 
→ Fill form → Post → View applicants
```

**Quick Student Test:**
```
Dev Panel → Jump to "Student Home" → Click any notice 
→ Apply → Check profile is updated
```

**Data Persistence Test:**
```
Make changes → Refresh page → Data still there! ✅
```

See `DEV_GUIDE.md` for comprehensive testing instructions.

## Project Structure

```
sitconnect/
├── App.tsx                 # Main app component
├── components/             # Reusable components
│   ├── screens/           # Screen components
│   ├── ui/                # shadcn/ui components
│   ├── BottomNav.tsx      # Bottom navigation
│   ├── DataManager.tsx    # Data export/import
│   └── DevPanel.tsx       # Developer tools
├── lib/
│   └── storage.ts         # LocalStorage service
├── styles/
│   └── globals.css        # Global styles + design tokens
└── README.md              # This file
```

## Color Palette

- **Primary Orange:** `#F36B2A` - Buttons, accents, CTAs
- **Heading Brown:** `#5A3E2B` - Headings, titles
- **Background Beige:** `#FFF6EE` - Page backgrounds
- **White:** `#FFFFFF` - Cards, containers
- **Gray Shades:** Text and borders

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4.0** - Styling
- **LocalStorage API** - Data persistence
- **Notifications API** - Browser alerts
- **Vite** - Build tool
- **lucide-react** - Icons
- **sonner** - Toast notifications

## Documentation

- 📖 **README.md** (this file) - Overview and quick start
- 🧪 **DEV_GUIDE.md** - Comprehensive testing guide
- 💾 **BACKEND_README.md** - LocalStorage backend details
- 🚀 **DEPLOYMENT.md** - Deployment instructions

## Browser Support

- ✅ Chrome 90+ (all features)
- ✅ Firefox 88+ (all features)
- ✅ Safari 14+ (notifications limited)
- ✅ Edge 90+ (all features)
- ✅ Mobile Chrome/Safari (all features except iOS notifications)

## Key Features Explained

### LocalStorage Backend
No server needed! All data is stored in your browser:
- Notices and applications
- User profiles
- Settings and preferences
- Auto-saves every 2 seconds
- Export/import for backup

### Browser Notifications
Native notifications for key events:
- Parents: Notified when students apply
- Students: Notified when selected
- Enable in Profile settings

### Mobile-First Design
- 48px minimum tap targets
- Optimized for 390px width
- Bottom navigation for easy access
- Swipe-friendly interface

## Development

### Adding New Features

1. **Add a new screen:**
   - Create file in `components/screens/`
   - Add route in `App.tsx`
   - Update `Screen` type

2. **Add new data:**
   - Update interfaces in `App.tsx`
   - Add to `StorageData` in `lib/storage.ts`
   - Include in auto-save effect

3. **Add new component:**
   - Create in `components/`
   - Follow existing patterns
   - Use design tokens from `globals.css`

### Design Tokens

Located in `styles/globals.css`:
- Typography scales (h1-h6, p)
- Spacing system
- Color variables
- Component defaults

## License

MIT License - Feel free to use for your school community!

## Contributing

This is a school community project. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions:
1. Check `DEV_GUIDE.md` for testing help
2. Review `BACKEND_README.md` for storage issues
3. Open an issue on GitHub

## Roadmap

Potential future enhancements:
- [ ] Real-time sync with Supabase (optional)
- [ ] SMS notifications via Twilio
- [ ] Calendar integration
- [ ] Reviews and ratings
- [ ] Payment processing
- [ ] Multi-school support

---

Built with ❤️ for school communities

**No backend. No cost. No complexity.** 🚀
