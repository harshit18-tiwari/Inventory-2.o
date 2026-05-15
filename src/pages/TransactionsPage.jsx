import React, { useMemo, useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, Clock, Search } from 'lucide-react'
import TransactionLog from '../components/TransactionLog'

export default function TransactionsPage({ transactions }) {
  const [searchTerm, setSearchTerm] = useState('')
  const inCount = transactions.filter(t => t.type === 'in').length
  const outCount = transactions.filter(t => t.type === 'out').length
  const adjustCount = transactions.filter(t => t.type === 'adjust').length

  const filteredTransactions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return transactions
    return transactions.filter(t => [t.sku, t.user, t.type, String(t.delta)].join(' ').toLowerCase().includes(q))
  }, [transactions, searchTerm])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="p-8 space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-100 rounded-2xl shadow-sm shadow-purple-100">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Transactions</h1>
              <p className="text-gray-600 mt-1">Track all stock movements and adjustments</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-6 border border-emerald-200 shadow-sm shadow-emerald-100/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-700 text-sm font-semibold">Stock In</p>
                <p className="text-3xl font-bold text-emerald-900 mt-2">{inCount}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <ArrowDownLeft className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-6 border border-rose-200 shadow-sm shadow-rose-100/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-700 text-sm font-semibold">Stock Out</p>
                <p className="text-3xl font-bold text-rose-900 mt-2">{outCount}</p>
              </div>
              <div className="p-3 bg-rose-100 rounded-2xl">
                <ArrowUpRight className="w-8 h-8 text-rose-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-3xl p-6 border border-slate-200 shadow-sm shadow-slate-100/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold">Adjustments</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{adjustCount}</p>
              </div>
              <div className="p-3 bg-slate-100 rounded-2xl">
                <Clock className="w-8 h-8 text-slate-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-lg shadow-slate-200/70 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Transactions</h2>
              <p className="mt-1 text-sm text-slate-500">Review stock movement history, filter by SKU, user, or type.</p>
            </div>
            <div className="relative w-full lg:w-[360px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100"
                placeholder="Search SKU, user, or type"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <TransactionLog transactions={filteredTransactions} />
          </div>
        </div>
      </div>
    </div>
  )
}
