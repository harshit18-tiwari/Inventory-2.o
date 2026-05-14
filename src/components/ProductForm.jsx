import React, { useEffect, useState } from 'react'

export default function ProductForm({ product = {}, onSave, onClose }) {
  const [form, setForm] = useState({ ...product })

  useEffect(() => setForm({ ...product }), [product])

  function submit(e) {
    e.preventDefault()
    const id = form.id || (form.sku || 'sku-' + Date.now())
    onSave({ ...form, id })
  }

  return (
    <div className="modal">
      <form className="product-form" onSubmit={submit}>
        <h3>{form.id ? 'Edit' : 'Add'} Product</h3>
        <label>SKU<input value={form.sku||''} onChange={e => setForm({ ...form, sku: e.target.value })} /></label>
        <label>Name<input value={form.name||''} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
        <label>Category<input value={form.category||''} onChange={e => setForm({ ...form, category: e.target.value })} /></label>
        <label>Price<input type="number" step="0.01" value={form.price||0} onChange={e => setForm({ ...form, price: parseFloat(e.target.value||0) })} /></label>
        <label>Quantity<input type="number" value={form.quantity||0} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value||0) })} /></label>
        <label>Reorder Threshold<input type="number" value={form.reorder||5} onChange={e => setForm({ ...form, reorder: parseInt(e.target.value||5) })} /></label>
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
