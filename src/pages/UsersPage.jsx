import React, { useState } from 'react'
import { Settings, Moon, Sun, Bell, Lock, LogOut, Database } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function UsersPage({ onLogout }) {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')
  const [notifications, setNotifications] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)
  
  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode)
    // Apply theme
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
      navigate('/')
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-slate-100 rounded-lg">
              <Settings className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">Customize your Inventory Management System</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Appearance Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Sun className="w-5 h-5 text-blue-600" />
              </div>
              Appearance
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-5 h-5 text-indigo-600" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                  <div>
                    <p className="font-semibold text-gray-900">Dark Mode</p>
                    <p className="text-sm text-gray-600">Toggle between light and dark theme</p>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                    darkMode ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-9' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Notifications Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bell className="w-5 h-5 text-green-600" />
              </div>
              Notifications
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Low Stock Alerts</p>
                  <p className="text-sm text-gray-600">Receive notifications for low stock items</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                    notifications ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-9' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Data Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Database className="w-5 h-5 text-purple-600" />
              </div>
              Data
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Auto Backup</p>
                  <p className="text-sm text-gray-600">Automatically backup your data daily</p>
                </div>
                <button
                  onClick={() => setAutoBackup(!autoBackup)}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                    autoBackup ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      autoBackup ? 'translate-x-9' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <button className="w-full p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition-colors">
                Export Data
              </button>
            </div>
          </div>
          
          {/* Security Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <Lock className="w-5 h-5 text-red-600" />
              </div>
              Security
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={handleLogout}
                className="w-full p-4 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg transition-colors flex items-center gap-2 justify-center"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Version 0.1 • Prototype</strong><br />
            For support or feedback, contact the development team.
          </p>
        </div>
      </div>
    </div>
  )
}
