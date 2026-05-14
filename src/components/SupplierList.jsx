import React, { useState } from 'react'

export default function SupplierList({ suppliers = [], onAdd }) {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ name: '', contact: '' })

  function submit(e) {
    e.preventDefault()
    onAdd({ id: Date.now().toString(), ...form })
    setForm({ name: '', contact: '' })
    setShow(false)
  }

  return (
    <section className="suppliers">
      <h3>Suppliers</h3>
      <button onClick={() => setShow(s => !s)}>{show ? 'Close' : 'Add Supplier'}</button>
      {show && (
        <form onSubmit={submit} className="supplier-form">
          <input placeholder="Supplier name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Contact info" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
          <button type="submit">Save</button>
        </form>
      )}
      <ul>
        {suppliers.map(s => (
          <li key={s.id}>{s.name} — {s.contact}</li>
        ))}
      </ul>
    </section>
  )
}
