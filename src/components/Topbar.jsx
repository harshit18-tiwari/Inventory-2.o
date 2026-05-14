import React from 'react'
import { Search, Bell, Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Topbar({ onToggleTheme }) {
  const [dark, setDark] = React.useState(false)
  function toggle(){ setDark(d=>!d); onToggleTheme && onToggleTheme(!dark) }
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white border-b sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="relative">
          <input placeholder="Search products, SKUs..." className="pl-10 pr-4 py-2 rounded-xl border w-80" />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
        </div>
        <button className="px-3 py-2 bg-primary text-white rounded-lg">Add Product</button>
        <button className="px-3 py-2 border rounded-lg">Export</button>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-md hover:bg-gray-50"><Bell className="w-5 h-5"/></button>
        <button className="p-2 rounded-md hover:bg-gray-50" onClick={toggle}>
          <motion.div layout>
            {dark ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
          </motion.div>
        </button>
        <div className="w-9 h-9 rounded-full bg-gray-300" />
      </div>
    </div>
  )
}
