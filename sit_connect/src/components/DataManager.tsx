import React, { useRef, useState } from 'react';
import { Download, Upload, Trash2, Database, X, HardDrive } from 'lucide-react';
import { StorageService } from '../lib/storage';
import { toast } from 'sonner@2.0.3';
import { CustomButton } from './CustomButton';

interface DataManagerProps {
  onImport: (data: any) => void;
  onClearData: () => void;
}

export function DataManager({ onImport, onClearData }: DataManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState(StorageService.getStats());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      StorageService.exportData();
      toast.success('Data exported successfully! Check your downloads.');
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await StorageService.importData(file);
      onImport(data);
      setStats(StorageService.getStats());
      toast.success('Data imported successfully!');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to import data. Check file format.');
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure? This will delete all your data. Consider exporting first!')) {
      StorageService.clearData();
      onClearData();
      setStats(StorageService.getStats());
      toast.success('All data cleared');
      setIsOpen(false);
    }
  };

  const refreshStats = () => {
    setStats(StorageService.getStats());
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) refreshStats();
        }}
        className="fixed bottom-20 left-4 z-50 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        title="Data Manager"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Database className="w-6 h-6" />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
          <div
            className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-blue-600 flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  Data Manager
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stats */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm text-blue-900 mb-3">📊 Storage Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Notices:</span>
                    <span className="text-blue-600">{stats.noticeCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applications:</span>
                    <span className="text-blue-600">{stats.applicantCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage Used:</span>
                    <span className="text-blue-600">{stats.storageUsed}</span>
                  </div>
                  {stats.lastSync && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Sync:</span>
                      <span className="text-blue-600 text-xs">
                        {new Date(stats.lastSync).toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleExport}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <div>Export Data</div>
                    <div className="text-xs opacity-90">Download backup file</div>
                  </div>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  <div className="text-left">
                    <div>Import Data</div>
                    <div className="text-xs opacity-90">Restore from backup</div>
                  </div>
                </button>

                <button
                  onClick={handleClear}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  <div className="text-left">
                    <div>Clear All Data</div>
                    <div className="text-xs opacity-90">Delete everything</div>
                  </div>
                </button>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
                <p className="mb-2">💡 <strong>How it works:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Data saved in browser storage</li>
                  <li>Auto-saves every 2 seconds</li>
                  <li>Export for backup/transfer</li>
                  <li>Import to restore data</li>
                  <li>Works offline!</li>
                </ul>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
