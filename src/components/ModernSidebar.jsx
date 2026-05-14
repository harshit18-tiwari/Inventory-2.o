import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Box, Users, FileText, Settings, Grid } from 'lucide-react'

const items = [
  { key: 'dashboard', icon: Home, label: 'Dashboard', to: '/' },
  { key: 'products', icon: Box, label: 'Products', to: '/products' },
  { key: 'suppliers', icon: Users, label: 'Suppliers', to: '/suppliers' },
  { key: 'transactions', icon: FileText, label: 'Transactions', to: '/transactions' },
  { key: 'reports', icon: Grid, label: 'Reports', to: '/reports' },
  { key: 'settings', icon: Settings, label: 'Settings', to: '/users' }
]

export default function ModernSidebar({ collapsed=false }) {
  const location = useLocation()

  return (
    <aside className={`w-64 ${collapsed? 'hidden md:block':'block'} bg-white h-full border-r border-gray-200 overflow-y-auto shadow-sm`}>
      <div className="p-4 flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg" />
        <div className="font-semibold text-lg">IMS</div>
      </div>
      <nav className="p-4 space-y-1">
        {items.map(it=>{
          const Icon = it.icon
          const isActive = location.pathname === it.to || (it.to !== '/' && location.pathname.startsWith(it.to))
          return (
            <Link key={it.key} to={it.to} className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className="font-medium">{it.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 mt-auto text-sm text-gray-500">v0.1 • Prototype</div>
    </aside>
  )
}
