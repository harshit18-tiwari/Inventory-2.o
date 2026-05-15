import React from 'react'
import { Search, Bell, Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Topbar({ onToggleTheme, darkMode = false }) {
  const [q, setQ] = React.useState('')

  function doAddProduct() {
    // reuse the global event that ProductList listens to
    window.dispatchEvent(new CustomEvent('open-add-product'))
  }

  function handleToggle() {
    if (onToggleTheme) onToggleTheme(!darkMode)
  }

  return (
    <header className="topbar sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4 p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-xl">
            <input
              aria-label="Search products"
              placeholder="Search products, SKUs..."
              className="pl-10 pr-4 py-2 rounded-xl border w-full bg-slate-50 text-slate-700"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-gray-50" aria-label="Notifications"><Bell className="w-5 h-5"/></button>

          <button onClick={handleToggle} className="p-2 rounded-md hover:bg-gray-50" aria-label="Toggle theme">
            <motion.div layout>
              {darkMode ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
            </motion.div>
          </button>

          <button className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm text-slate-700">ME</button>
        </div>
      </div>
    </header>
  )
}
