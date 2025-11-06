# SitConnect Backend - LocalStorage Implementation

## Overview

SitConnect uses **browser-based localStorage** as its backend, providing full persistence and data management without requiring a server, database, or paid services.

## Features

### 🗄️ Data Persistence
- All data stored in browser localStorage
- Survives page refreshes and browser restarts
- Automatic serialization/deserialization
- Up to 5-10MB storage (browser dependent)

### 💾 Auto-Save
- Changes automatically saved every 2 seconds
- Debounced to prevent excessive writes
- Console logs confirm each save operation
- Toast notification on initial data load

### 📤 Export/Import
- **Export**: Download complete app state as JSON
- **Import**: Restore from backup file
- Filename includes date for easy organization
- Perfect for:
  - Creating backups
  - Transferring data between browsers
  - Testing with different datasets

### 🔔 Browser Notifications
- Native browser notification support
- Notifications for:
  - New applicants (Parents)
  - Being selected (Students)
- Works even when tab is in background
- Respects browser notification permissions

### 📊 Storage Stats
Real-time statistics showing:
- Number of notices
- Number of applicants
- Storage space used
- Last sync timestamp

## Architecture

### Storage Service (`/lib/storage.ts`)

```typescript
// Save data
StorageService.saveData({
  notices: [...],
  applications: {...},
  // ... other state
});

// Load data
const data = StorageService.loadData();

// Export to file
StorageService.exportData();

// Import from file
await StorageService.importData(file);

// Get stats
const stats = StorageService.getStats();

// Clear everything
StorageService.clearData();
```

### Notification Service

```typescript
// Request permission
await NotificationService.requestPermission();

// Show notification
NotificationService.show('Title', { body: 'Message' });

// Convenience methods
NotificationService.notifyNewApplicant(name, details);
NotificationService.notifySelected(parentName);
```

## Data Structure

All data is stored under a single key: `sitconnect_data`

```json
{
  "notices": [...],
  "applications": {...},
  "selectedApplicants": {...},
  "appliedNotices": [...],
  "parentData": {...},
  "currentStudentData": {...},
  "userRole": "parent" | "student",
  "lastSync": "2025-11-04T10:30:00.000Z"
}
```

## Usage in App

### Initial Load
```typescript
useEffect(() => {
  if (StorageService.isAvailable()) {
    const savedData = StorageService.loadData();
    // Restore state from savedData
  }
}, []);
```

### Auto-Save
```typescript
useEffect(() => {
  if (!isLoaded) return;
  
  const saveTimeout = setTimeout(() => {
    StorageService.saveData({
      notices,
      applications,
      // ... all state
    });
  }, 2000);

  return () => clearTimeout(saveTimeout);
}, [notices, applications, ...]);
```

## Components

### DataManager Component
- Blue database icon (bottom left)
- Shows storage statistics
- Export/Import buttons
- Clear data button (with confirmation)
- Located in `/components/DataManager.tsx`

### Integration Points
- Parent Profile: "Enable Notifications" button
- Student Profile: "Enable Notifications" button
- App.tsx: Auto-save on state changes
- App.tsx: Auto-load on mount

## Browser Compatibility

### LocalStorage
- ✅ All modern browsers
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Notifications
- ✅ Chrome, Firefox, Edge
- ⚠️ Safari (requires user interaction)
- ✅ Mobile Chrome Android
- ❌ iOS Safari (not supported)

## Advantages Over Supabase

| Feature | LocalStorage | Supabase |
|---------|-------------|----------|
| Cost | Free | Paid plans required |
| Setup | Zero configuration | Account + API keys |
| Privacy | Data stays local | Data on servers |
| Offline | Works offline | Requires connection |
| Speed | Instant | Network latency |
| Scalability | Limited to device | Unlimited |
| Sync | Export/Import | Real-time sync |

## Limitations

1. **Single Device**: Data doesn't sync across devices (use Export/Import)
2. **Storage Limit**: ~5-10MB depending on browser
3. **Data Loss**: Clearing browser data deletes everything (use Export!)
4. **No Real-time**: Changes don't sync between tabs automatically

## Best Practices

1. **Regular Backups**: Export data frequently
2. **Before Testing**: Export before major changes or data clearing
3. **Device Transfer**: Export → Move file → Import on new device
4. **Development**: Keep a backup export file for resetting to known state

## Future Enhancements

Possible upgrades that could be added:

1. **IndexedDB**: For larger storage capacity
2. **Service Workers**: For background sync
3. **BroadcastChannel**: For cross-tab communication
4. **File System Access**: For direct file saving
5. **WebRTC**: For peer-to-peer sync

## Testing

See `DEV_GUIDE.md` for full testing scenarios including:
- Data persistence across refreshes
- Export/Import workflows
- Notification testing
- Storage limits

## Support

For issues:
1. Check browser console for errors
2. Verify localStorage is enabled (not in private browsing)
3. Check browser storage quota in DevTools
4. Try exporting data before clearing

---

**Built without a backend, but works like one!** 🚀
