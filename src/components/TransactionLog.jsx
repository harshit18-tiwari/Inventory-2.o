import React from 'react'

export default function TransactionLog({ transactions = [] }) {
  return (
    <section className="transactions">
      <h3>Transactions</h3>
      <ul>
        {transactions.slice(0, 20).map(t => (
          <li key={t.id}>{new Date(t.at).toLocaleString()} — {t.sku} {t.delta>0? 'IN' : 'OUT'} {Math.abs(t.delta)}</li>
        ))}
      </ul>
    </section>
  )
}
