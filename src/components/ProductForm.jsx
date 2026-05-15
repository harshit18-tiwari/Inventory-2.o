import React, { useEffect, useState } from 'react'

export default function ProductForm({ product = {}, onSave, onClose }) {
  const [form, setForm] = useState({ ...product })

  useEffect(() => setForm({ ...product }), [product])

  function submit(e) {
    e.preventDefault()
    const id = form.id || ('SKU' + Date.now())
    const sku = form.sku || id
    onSave({ ...form, id, sku })
  }

  return (
    <div className="modal">
      <form className="product-form" onSubmit={submit}>
        <div className="product-form__header">
          <h3>{form.id ? 'Edit' : 'Add'} Product</h3>
          <p>Fill in the product details below.</p>
        </div>

        <div className="product-form__grid">
          {/* SKU is auto-generated; removed input to simplify add form */}
          <label className="field field--full">
            <span>Name</span>
            <input value={form.name||''} onChange={e => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="field field--full">
            <span>Category</span>
            <input value={form.category||''} onChange={e => setForm({ ...form, category: e.target.value })} />
          </label>
          <label className="field">
            <span>Price</span>
            <input type="number" step="0.01" value={form.price||0} onChange={e => setForm({ ...form, price: parseFloat(e.target.value||0) })} />
          </label>
          <label className="field">
            <span>Quantity</span>
            <input type="number" value={form.quantity||0} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value||0) })} />
          </label>
          <label className="field field--full field--threshold">
            <span>Reorder Threshold</span>
            <input type="number" value={form.reorder||5} onChange={e => setForm({ ...form, reorder: parseInt(e.target.value||5) })} />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
