import React from 'react'

export default function Toasts({ items = [] }) {
  return (
    <div className="toasts">
      {items.map(t => (
        <div key={t.id} className="toast">{t.message}</div>
      ))}
    </div>
  )
}
