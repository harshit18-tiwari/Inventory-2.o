import React from 'react'
import { Line, Pie, Bar } from '../ui/Charts'
import { motion } from 'framer-motion'
import { TrendingUp, AlertCircle, Package, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { formatINR } from '../utils/format'

function KPICard({ title, value, icon: Icon, bgColor, textColor, trend }){
  return (
    <motion.div whileHover={{ y: -6 }} className={`${bgColor} rounded-2xl p-6 text-white shadow-lg`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm opacity-90 font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {trend && (
            <p className="text-sm mt-2 opacity-80 flex items-center gap-1">
              {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
              {Math.abs(trend)}% vs last month
            </p>
          )}
        </div>
        <div className="p-3 bg-white bg-opacity-20 rounded-lg">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}

export default function DashboardModern({ products = [], transactions = [] }){
  // Calculate metrics
  const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0)
  const lowStockCount = products.filter(p => (p.quantity || 0) <= (p.reorder || 5)).length
  const totalProducts = products.length
  const revenueFromTransactions = transactions
    .filter(t => t.type === 'out')
    .reduce((sum, t) => sum + ((t.quantity || 0) * (t.pricePerUnit || 0)), 0)
  
  const inCount = transactions.filter(t => t.type === 'in').length
  const outCount = transactions.filter(t => t.type === 'out').length
  
  // Category distribution
  const categories = {}
  products.forEach(p => {
    const cat = p.category || 'Other'
    categories[cat] = (categories[cat] || 0) + (p.quantity || 0)
  })
  
  // Recent transactions
  const recentTransactions = transactions.slice(0, 5)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your inventory overview.</p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Total Inventory Value" 
          value={formatINR(totalValue, { compact: true, decimals: 1 })}
          icon={TrendingUp}
          bgColor="bg-gradient-to-br from-blue-500 to-blue-700"
          trend={12}
        />
        <KPICard 
          title="Low Stock Items" 
          value={lowStockCount}
          icon={AlertCircle}
          bgColor="bg-gradient-to-br from-red-500 to-red-700"
          trend={-5}
        />
        <KPICard 
          title="Total Products" 
          value={totalProducts}
          icon={Package}
          bgColor="bg-gradient-to-br from-emerald-500 to-emerald-700"
          trend={8}
        />
        <KPICard 
          title="Revenue" 
          value={formatINR(revenueFromTransactions, { compact: true, decimals: 1 })}
          icon={TrendingUp}
          bgColor="bg-gradient-to-br from-purple-500 to-purple-700"
          trend={15}
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div whileHover={{ y: -4 }} className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Stock Growth Trend</h3>
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Last 7 days</span>
          </div>
          <Line />
        </motion.div>
        <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Product Distribution</h3>
          <Pie />
        </motion.div>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Movement */}
        <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Stock Movement</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <p className="text-green-700 text-sm font-semibold">Stock In</p>
              <p className="text-2xl font-bold text-green-900 mt-2">{inCount}</p>
              <p className="text-xs text-green-600 mt-2">transactions</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 border border-red-200">
              <p className="text-red-700 text-sm font-semibold">Stock Out</p>
              <p className="text-2xl font-bold text-red-900 mt-2">{outCount}</p>
              <p className="text-xs text-red-600 mt-2">transactions</p>
            </div>
          </div>
          <Bar />
        </motion.div>
        
        {/* Recent Activity */}
        <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <a href="/transactions" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">View all →</a>
          </div>
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((tx, idx) => (
                <div key={idx} className="p-3 rounded-lg hover:bg-gray-50 border border-gray-100 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tx.type === 'in' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {tx.type === 'in' ? (
                        <ArrowDownLeft className={`w-4 h-4 ${tx.type === 'in' ? 'text-green-600' : 'text-red-600'}`} />
                      ) : (
                        <ArrowUpRight className={`w-4 h-4 text-red-600`} />
                      )}
                    </div>
                    <div>
                          <p className="font-semibold text-gray-900">{tx.sku} {tx.type === 'in' ? 'received' : 'removed'}</p>
                          <p className="text-xs text-gray-500">{tx.user || 'System'} • {new Date(tx.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                      <p className={`font-bold ${tx.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type === 'in' ? '+' : '-'}{tx.delta || tx.quantity}
                        {tx.pricePerUnit ? (
                          <span className="text-sm font-normal ml-2">({formatINR((tx.pricePerUnit || 0) * (tx.quantity || tx.delta || 0), { compact: false })})</span>
                        ) : null}
                      </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No recent transactions</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
