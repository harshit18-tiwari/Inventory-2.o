import React from 'react'
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react'
import TransactionLog from '../components/TransactionLog'

export default function TransactionsPage({ transactions }) {
  const inCount = transactions.filter(t => t.type === 'in').length
  const outCount = transactions.filter(t => t.type === 'out').length
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Transactions</h1>
              <p className="text-gray-600 mt-1">Track all stock movements and adjustments</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-semibold">Stock In</p>
                <p className="text-3xl font-bold text-green-900 mt-2">{inCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <ArrowDownLeft className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 text-sm font-semibold">Stock Out</p>
                <p className="text-3xl font-bold text-red-900 mt-2">{outCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <ArrowUpRight className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <TransactionLog transactions={transactions} />
        </div>
      </div>
    </div>
  )
}
