import React from 'react'

export default function TransactionLog({ transactions = [] }) {
  const formatTime = tx => new Date(tx.createdAt || tx.at || tx.timestamp || Date.now()).toLocaleString()

  return (
    <section className="space-y-4">
      {transactions.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full border-collapse text-sm">
              <thead className="bg-slate-50 text-left text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Time</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">SKU</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Type</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Change</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">User</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {transactions.slice(0, 20).map(t => {
                  const isIn = t.delta > 0 || t.type === 'in'
                  const label = t.type === 'adjust' ? 'Adjust' : isIn ? 'Stock In' : 'Stock Out'
                  return (
                    <tr key={t.id} className="transition hover:bg-slate-50/70">
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">{formatTime(t)}</td>
                      <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{t.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${isIn ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {label}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap font-semibold ${isIn ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {isIn ? '+' : '-'}{Math.abs(t.delta)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">{t.user || 'system'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="text-slate-600 font-medium">No transactions found</p>
          <p className="mt-2 text-sm text-slate-400">Stock movements will appear here once inventory is adjusted.</p>
        </div>
      )}
    </section>
  )
}
