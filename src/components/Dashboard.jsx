import React from 'react'
import { formatINR } from '../utils/format'

export default function Dashboard({ products = [], transactions = [] }) {
  const totalValue = products.reduce((s, p) => s + (p.price || 0) * (p.quantity || 0), 0)
  const lowStock = products.filter(p => (p.quantity || 0) <= (p.reorder || 5))
  const recent = transactions.slice(0, 5)

  return (
    <section className="dashboard">
      <div className="tile">
        <h3>Total Inventory Value</h3>
        <div className="big">{formatINR(totalValue, { compact: false })}</div>
      </div>
      <div className="tile">
        <h3>Low Stock Items</h3>
        <div>{lowStock.length}</div>
      </div>
      <div className="tile">
        <h3>Recent Activity</h3>
        <ul>
          {recent.map(r => (
            <li key={r.id}>{r.sku} {r.delta > 0 ? 'in' : 'out'} {Math.abs(r.delta)}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
