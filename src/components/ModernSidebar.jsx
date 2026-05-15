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
  const [isCollapsed, setCollapsed] = React.useState(!!collapsed)

  function toggle() { setCollapsed(c => !c) }

  return (
    <aside className={`bg-white h-full border-r border-gray-200 overflow-y-auto shadow-sm transition-width duration-200 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`p-4 flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold">IMS</div>
        {!isCollapsed && <div className="font-semibold text-lg">Inventory Pro</div>}
      </div>

      <nav className="p-2 space-y-1">
        {items.map(it=>{
          const Icon = it.icon
          const isActive = location.pathname === it.to || (it.to !== '/' && location.pathname.startsWith(it.to))
          return (
            <Link
              key={it.key}
              to={it.to}
              title={it.label}
              className={`flex items-center gap-3 p-2 mx-2 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-md ${isActive ? 'bg-blue-100' : 'bg-transparent'}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              </div>
              {!isCollapsed && <span className="font-medium">{it.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto p-3">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed ? (
            <div className="text-sm text-gray-500">v0.1 • Prototype</div>
          ) : (
            <div className="text-xs text-gray-400">v0.1</div>
          )}

          <button
            onClick={toggle}
            aria-pressed={isCollapsed}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}
