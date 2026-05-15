import React, { useMemo, useState } from 'react'
import { BarChart3, TrendingUp, AlertCircle, Package, CalendarDays, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

export default function ReportsPage({ products, transactions }) {
  const [selectedMonth, setSelectedMonth] = useState('all')

  const monthKey = date => {
    const d = new Date(date || Date.now())
    if (Number.isNaN(d.getTime())) return ''
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  const monthLabel = key => {
    if (key === 'all') return 'All months'
    const [year, month] = key.split('-').map(Number)
    return new Date(year, month - 1, 1).toLocaleString(undefined, { month: 'long', year: 'numeric' })
  }

  const availableMonths = useMemo(() => {
    const months = new Set()
    products.forEach(p => { const key = monthKey(p.createdAt); if (key) months.add(key) })
    transactions.forEach(t => { const key = monthKey(t.createdAt || t.at || t.timestamp); if (key) months.add(key) })
    return ['all', ...Array.from(months).sort((a, b) => b.localeCompare(a))]
  }, [products, transactions])

  const filteredProducts = useMemo(() => {
    if (selectedMonth === 'all') return products
    return products.filter(p => monthKey(p.createdAt) === selectedMonth)
  }, [products, selectedMonth])

  const filteredTransactions = useMemo(() => {
    if (selectedMonth === 'all') return transactions
    return transactions.filter(t => monthKey(t.createdAt || t.at || t.timestamp) === selectedMonth)
  }, [transactions, selectedMonth])

  const totalProducts = filteredProducts.length
  const lowStockCount = filteredProducts.filter(p => (p.quantity || 0) <= (p.reorder || 5)).length
  const totalTransactions = filteredTransactions.length
  const inCount = filteredTransactions.filter(t => t.type === 'in' || t.delta > 0).length
  const outCount = filteredTransactions.filter(t => t.type === 'out' || t.delta < 0).length
  const totalValue = filteredProducts.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0)

  const monthlyProductGroups = useMemo(() => {
    const groups = filteredProducts.reduce((acc, product) => {
      const key = monthKey(product.createdAt) || 'unknown'
      if (!acc[key]) acc[key] = []
      acc[key].push(product)
      return acc
    }, {})
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
  }, [filteredProducts])

  const monthlyTransactionGroups = useMemo(() => {
    const groups = filteredTransactions.reduce((acc, tx) => {
      const key = monthKey(tx.createdAt || tx.at || tx.timestamp) || 'unknown'
      if (!acc[key]) acc[key] = []
      acc[key].push(tx)
      return acc
    }, {})
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
  }, [filteredTransactions])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="p-8 space-y-8">
        <div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-2xl shadow-sm shadow-amber-100">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Reports</h1>
                <p className="text-gray-600 mt-1">Inventory insights and monthwise analytics</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-white/90 px-4 py-3 shadow-sm shadow-amber-100/50">
              <CalendarDays className="h-4 w-4 text-amber-600" />
              <label className="text-sm font-semibold text-slate-700" htmlFor="report-month">Month</label>
              <select
                id="report-month"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
              >
                {availableMonths.map(month => (
                  <option key={month} value={month}>{monthLabel(month)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-semibold">Total Products</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalProducts}</p>
            <p className="mt-2 text-xs text-slate-400">{monthLabel(selectedMonth)}</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Low Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{lowStockCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 p-6 border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-semibold">Transactions</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalTransactions}</p>
            <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1 text-emerald-600"><ArrowDownLeft className="h-3.5 w-3.5" />{inCount} in</span>
              <span className="inline-flex items-center gap-1 text-rose-600"><ArrowUpRight className="h-3.5 w-3.5" />{outCount} out</span>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-semibold">Inventory Value</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">${(totalValue/1000).toFixed(1)}k</p>
            <p className="mt-2 text-xs text-slate-400">Filtered stock value</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Monthwise Products</h2>
                <p className="text-sm text-gray-500 mt-1">Products created in {monthLabel(selectedMonth)}</p>
              </div>
              <Package className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 6).map((p, idx) => (
                  <div key={p.id} className="flex items-center justify-between pb-4 border-b last:border-b-0 border-slate-100">
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
                ))
              ) : (
                <p className="text-gray-500 text-sm py-4">No products found for this month.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Monthwise Transactions</h2>
                <p className="text-sm text-gray-500 mt-1">Activity recorded in {monthLabel(selectedMonth)}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
            <div className="space-y-3">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.slice(0, 8).map(tx => {
                  const isIn = tx.type === 'in' || tx.delta > 0
                  return (
                    <div key={tx.id} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3 hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="font-semibold text-slate-900">{tx.sku}</p>
                        <p className="text-xs text-slate-500">{tx.user || 'system'} • {new Date(tx.createdAt || tx.at || tx.timestamp || Date.now()).toLocaleString()}</p>
                      </div>
                      <div className={`font-bold ${isIn ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isIn ? '+' : '-'}{Math.abs(tx.delta)}
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-gray-500 text-sm py-4">No transactions found for this month.</p>
              )}
              </div>
            ))}
          </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Months</h2>
            <div className="space-y-3">
              {monthlyProductGroups.length > 0 ? monthlyProductGroups.map(([month, items]) => (
                <div key={month} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="font-medium text-slate-700">{month === 'unknown' ? 'Unknown month' : monthLabel(month)}</span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">{items.length}</span>
                </div>
              )) : (
                <p className="text-gray-500 text-sm">No monthly product history available.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction Months</h2>
            <div className="space-y-3">
              {monthlyTransactionGroups.length > 0 ? monthlyTransactionGroups.map(([month, items]) => (
                <div key={month} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="font-medium text-slate-700">{month === 'unknown' ? 'Unknown month' : monthLabel(month)}</span>
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">{items.length}</span>
                </div>
              )) : (
                <p className="text-gray-500 text-sm">No monthly transaction history available.</p>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
