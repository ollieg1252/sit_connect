# Deployment Guide

## Testing in Browser (Current Environment)

You're currently in **Figma Make**, which has a built-in preview. Your app is already running!

### Preview Mode
- The app is live and interactive in this window
- All features work including localStorage
- You can test everything right now

### Testing Checklist
1. ✅ Click purple bug icon (bottom right) - Dev Panel
2. ✅ Click blue database icon (bottom left) - Data Manager
3. ✅ Jump to different screens using Dev Panel
4. ✅ Add mock notices
5. ✅ Test parent and student flows
6. ✅ Refresh page - data should persist
7. ✅ Export data - download should start
8. ✅ Enable notifications - browser should ask permission

---

## Export to GitHub

### Method 1: Create New Repository (Recommended)

1. **Go to GitHub**
   - Visit https://github.com
   - Click "New repository"
   - Name it: `sitconnect` (or your preferred name)
   - Keep it public or private
   - DON'T initialize with README (we have one)
   - Click "Create repository"

2. **Download Your Code**
   - In Figma Make, look for an "Export" or "Download" button
   - Or copy all files manually (see file list below)

3. **Set Up Local Git**
   ```bash
   # Navigate to your project folder
   cd sitconnect
   
   # Initialize git
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - SitConnect app"
   
   # Add GitHub remote (replace with your URL)
   git remote add origin https://github.com/YOUR_USERNAME/sitconnect.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

### Method 2: GitHub Desktop (Easiest)

1. Download GitHub Desktop: https://desktop.github.com
2. Install and sign in to GitHub
3. Click "Create New Repository"
4. Choose your project folder
5. Click "Publish repository"
6. Done! ✅

---

## Deploy to Production

### Option 1: GitHub Pages (Free & Easy)

1. **Create GitHub repository** (see above)

2. **Add deployment config**

Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/sitconnect/', // Replace with your repo name
})
```

3. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

4. **Update package.json** - Add these scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

5. **Deploy!**
```bash
npm run deploy
```

6. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` / `root`
   - Save

Your app will be live at: `https://YOUR_USERNAME.github.io/sitconnect/`

### Option 2: Netlify (Super Easy)

1. **Create account** at https://netlify.com
2. **Drag & drop** your `dist` folder after running `npm run build`
3. **Or connect GitHub** for auto-deploy:
   - "New site from Git"
   - Connect GitHub
   - Select repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy!

Live in seconds! Gets a URL like: `your-site-name.netlify.app`

### Option 3: Vercel (Also Easy)

1. **Create account** at https://vercel.com
2. **Import Git repository**
   - Click "New Project"
   - Import from GitHub
   - Select your repo
   - Vercel auto-detects Vite
   - Click "Deploy"

Live at: `sitconnect.vercel.app`

### Option 4: Cloudflare Pages (Free & Fast)

1. Sign up at https://pages.cloudflare.com
2. Connect GitHub repo
3. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
4. Deploy!

---

## Files to Include in Repository

### Required Files
```
✅ App.tsx
✅ All /components files
✅ All /lib files
✅ /styles/globals.css
✅ package.json
✅ index.html
✅ vite.config.ts (or tsconfig.json)
✅ README.md
✅ .gitignore
```

### Optional Documentation
```
📄 DEV_GUIDE.md
📄 BACKEND_README.md
📄 DEPLOYMENT.md (this file)
📄 Attributions.md
```

### Don't Include
```
❌ node_modules/
❌ dist/
❌ .env files
❌ .DS_Store
❌ package-lock.json (optional)
```

---

## Create .gitignore File

Create `.gitignore` in your project root:

```
# Dependencies
node_modules/

# Build output
dist/
build/
.next/
out/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Misc
*.tsbuildinfo
.cache/
```

---

## package.json Example

If you need to create one:

```json
{
  "name": "sitconnect",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "latest",
    "sonner": "2.0.3",
    "react-hook-form": "7.55.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "gh-pages": "^6.1.0"
  }
}
```

---

## Environment Setup

### For Local Development

1. **Install Node.js** (if not installed)
   - Download from https://nodejs.org
   - Choose LTS version

2. **Create project structure**
   ```bash
   mkdir sitconnect
   cd sitconnect
   ```

3. **Copy all your files** into this directory

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Run locally**
   ```bash
   npm run dev
   ```

6. **Open browser**
   - Navigate to http://localhost:5173
   - App should work exactly like in Figma Make!

---

## Troubleshooting

### "Module not found"
```bash
npm install
```

### Build fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### GitHub Pages shows blank page
- Check `base` in `vite.config.ts` matches repo name
- Verify `dist` folder is built correctly
- Check browser console for errors

### LocalStorage not working
- Check if browser is in private/incognito mode
- Verify site has storage permissions
- Clear browser cache and try again

### Notifications not working
- Must be HTTPS or localhost
- User must grant permission
- iOS Safari doesn't support notifications

---

## Quick Deploy Commands

```bash
# Clone from GitHub (after setup)
git clone https://github.com/YOUR_USERNAME/sitconnect.git
cd sitconnect
npm install
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Or just build and upload dist/ to any static host!
```

---

## Custom Domain (Optional)

### GitHub Pages
1. Add `CNAME` file to `public/` folder
2. Content: `yourdomain.com`
3. Configure DNS:
   - Add A records pointing to GitHub IPs
   - Or CNAME to `username.github.io`

### Netlify/Vercel
1. Add domain in dashboard
2. Update DNS to their nameservers
3. Done! Auto SSL included

---

## Next Steps After Deployment

1. ✅ Test on mobile devices
2. ✅ Share with your school community
3. ✅ Gather feedback
4. ✅ Add analytics (optional)
5. ✅ Consider real backend if needed (Supabase)

---

## Support

- 📖 Read `DEV_GUIDE.md` for testing
- 💾 Read `BACKEND_README.md` for storage details
- 🐛 Check browser console for errors
- 🔍 Search GitHub issues

**Your app is ready to deploy!** 🚀
