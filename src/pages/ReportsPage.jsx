import React from 'react'
import { BarChart3, TrendingUp, AlertCircle, Package } from 'lucide-react'

export default function ReportsPage({ products, transactions }) {
  const totalProducts = products.length
  const lowStockCount = products.filter(p => (p.quantity || 0) <= (p.reorder || 5)).length
  const totalTransactions = transactions.length
  const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Reports</h1>
              <p className="text-gray-600 mt-1">Inventory insights and analytics</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-semibold">Total Products</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalProducts}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Low Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{lowStockCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-semibold">Transactions</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalTransactions}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-semibold">Inventory Value</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">${(totalValue/1000).toFixed(1)}k</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top 5 Products by Quantity</h2>
          <div className="space-y-4">
            {products.slice(0, 5).map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{p.name}</p>
                    <p className="text-sm text-gray-500">{p.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{p.quantity || 0} units</p>
                  <p className="text-sm text-gray-500">${((p.price || 0) * (p.quantity || 0)).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
