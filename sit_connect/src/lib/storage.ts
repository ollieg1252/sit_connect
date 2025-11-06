/**
 * LocalStorage Service - Browser-based data persistence
 * Provides backend-like functionality without requiring a server
 */

interface StorageData {
  notices: any[];
  applications: { [noticeId: string]: string[] };
  selectedApplicants: { [noticeId: string]: string[] };
  appliedNotices: string[];
  parentData: any;
  currentStudentData: any;
  userRole: 'parent' | 'student' | null;
  lastSync: string;
}

const STORAGE_KEY = 'sitconnect_data';
const STORAGE_VERSION = '1.0';

export class StorageService {
  /**
   * Save all app data to localStorage
   */
  static saveData(data: Partial<StorageData>): void {
    try {
      const existing = this.loadData();
      const updated = {
        ...existing,
        ...data,
        lastSync: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(`${STORAGE_KEY}_version`, STORAGE_VERSION);
      
      console.log('✅ Data saved to localStorage', updated);
    } catch (error) {
      console.error('❌ Failed to save data:', error);
      throw new Error('Failed to save data to local storage');
    }
  }

  /**
   * Load all app data from localStorage
   */
  static loadData(): StorageData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (!stored) {
        return this.getDefaultData();
      }

      const data = JSON.parse(stored);
      console.log('✅ Data loaded from localStorage', data);
      return data;
    } catch (error) {
      console.error('❌ Failed to load data:', error);
      return this.getDefaultData();
    }
  }

  /**
   * Clear all app data
   */
  static clearData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(`${STORAGE_KEY}_version`);
      console.log('✅ Data cleared from localStorage');
    } catch (error) {
      console.error('❌ Failed to clear data:', error);
    }
  }

  /**
   * Export data as JSON file for backup
   */
  static exportData(): void {
    try {
      const data = this.loadData();
      const exportData = {
        version: STORAGE_VERSION,
        exportDate: new Date().toISOString(),
        data,
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sitconnect_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('✅ Data exported successfully');
    } catch (error) {
      console.error('❌ Failed to export data:', error);
      throw new Error('Failed to export data');
    }
  }

  /**
   * Import data from JSON file
   */
  static async importData(file: File): Promise<StorageData> {
    try {
      const text = await file.text();
      const importedData = JSON.parse(text);
      
      if (!importedData.data) {
        throw new Error('Invalid backup file format');
      }

      this.saveData(importedData.data);
      console.log('✅ Data imported successfully');
      return importedData.data;
    } catch (error) {
      console.error('❌ Failed to import data:', error);
      throw new Error('Failed to import data');
    }
  }

  /**
   * Get storage statistics
   */
  static getStats(): {
    noticeCount: number;
    applicantCount: number;
    storageUsed: string;
    lastSync: string | null;
  } {
    const data = this.loadData();
    const stored = localStorage.getItem(STORAGE_KEY) || '';
    const sizeInBytes = new Blob([stored]).size;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);

    return {
      noticeCount: data.notices?.length || 0,
      applicantCount: Object.values(data.applications || {}).flat().length,
      storageUsed: `${sizeInKB} KB`,
      lastSync: data.lastSync || null,
    };
  }

  /**
   * Check if storage is available
   */
  static isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get default empty data structure
   */
  private static getDefaultData(): StorageData {
    return {
      notices: [],
      applications: {},
      selectedApplicants: {},
      appliedNotices: [],
      parentData: {
        name: '',
        email: '',
        phone: '',
        area: '',
      },
      currentStudentData: {
        id: 'current-user',
        name: '',
        gradYear: '',
        experience: '0',
        interests: [],
        email: '',
        phone: '',
        bio: '',
      },
      userRole: null,
      lastSync: new Date().toISOString(),
    };
  }
}

/**
 * Browser Notification Service
 */
export class NotificationService {
  /**
   * Request notification permission
   */
  static async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('Browser does not support notifications');
      return 'denied';
    }

    return await Notification.requestPermission();
  }

  /**
   * Show a notification
   */
  static async show(title: string, options?: NotificationOptions): Promise<void> {
    const permission = await this.requestPermission();
    
    if (permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options,
      });
    }
  }

  /**
   * Show notification for new applicant
   */
  static notifyNewApplicant(applicantName: string, noticeDetails: string): void {
    this.show('New Applicant! 🎉', {
      body: `${applicantName} applied for your job: ${noticeDetails}`,
      tag: 'new-applicant',
    });
  }

  /**
   * Show notification for selected applicant
   */
  static notifySelected(parentName: string): void {
    this.show('You were selected! ✨', {
      body: `${parentName} selected you as their babysitter!`,
      tag: 'selected',
    });
  }
}

/**
 * Auto-save hook for React components
 */
export function useAutoSave<T>(key: keyof StorageData, value: T, delay: number = 1000): void {
  if (typeof window === 'undefined') return;

  const timeoutRef = { current: null as NodeJS.Timeout | null };

  const cleanup = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  cleanup();
  
  timeoutRef.current = setTimeout(() => {
    StorageService.saveData({ [key]: value } as Partial<StorageData>);
  }, delay);

  return cleanup;
}
