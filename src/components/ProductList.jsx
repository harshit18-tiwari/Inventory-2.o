import React, { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import Confirm from './Confirm'
import ProductDetail from './ProductDetail'

export default function ProductList({ products = [], onAdd, onUpdate, onDelete, onAdjust }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)
  const [sortKey, setSortKey] = useState('sku')
  const [sortDir, setSortDir] = useState('asc')
  const [confirm, setConfirm] = useState(null)
  const [detail, setDetail] = useState(null)
  const [editingQtyId, setEditingQtyId] = useState(null)
  const [editingQtyVal, setEditingQtyVal] = useState(0)

  // Debounce search for performance
  useEffect(() => {
    const t = setTimeout(() => setQuery(searchTerm.trim()), 250)
    return () => clearTimeout(t)
  }, [searchTerm])

  // global event to open add-product
  useEffect(() => {
    function onOpen() {
      setEditing({})
    }
    window.addEventListener('open-add-product', onOpen)
    return () => window.removeEventListener('open-add-product', onOpen)
  }, [])

  function handleStock(sku, delta) {
    onAdjust(sku, delta, delta > 0 ? 'in' : 'out')
  }

  function sortedFiltered() {
    let list = products.filter(p => {
      if (!query) return true
      return [p.name, p.sku, p.category].join(' ').toLowerCase().includes(query.toLowerCase())
    })
    list = list.sort((a, b) => {
      const A = (a[sortKey] || '').toString().toLowerCase()
      const B = (b[sortKey] || '').toString().toLowerCase()
      if (A < B) return sortDir === 'asc' ? -1 : 1
      if (A > B) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return list
  }

  function toggleSort(key) {
    if (sortKey === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  function startQtyEdit(p) {
    setEditingQtyId(p.id)
    setEditingQtyVal(p.quantity || 0)
  }

  function commitQty(p) {
    const updated = { ...p, quantity: Number(editingQtyVal) }
    onUpdate(updated)
    setEditingQtyId(null)
  }

  return (
    <section className="product-list">
      <div className="list-header">
        <h2>Products</h2>
        <div>
          <input placeholder="Search SKU or name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <button onClick={() => setEditing({})}>Add</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSort('sku')}>SKU {sortKey==='sku'? (sortDir==='asc'?'▲':'▼') : ''}</th>
            <th onClick={() => toggleSort('name')}>Name {sortKey==='name'? (sortDir==='asc'?'▲':'▼') : ''}</th>
            <th onClick={() => toggleSort('category')}>Category {sortKey==='category'? (sortDir==='asc'?'▲':'▼') : ''}</th>
            <th onClick={() => toggleSort('quantity')}>Qty {sortKey==='quantity'? (sortDir==='asc'?'▲':'▼') : ''}</th>
            <th onClick={() => toggleSort('price')}>Price {sortKey==='price'? (sortDir==='asc'?'▲':'▼') : ''}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedFiltered().map(p => (
            <tr key={p.id}>
              <td>{p.sku}</td>
              <td className="clickable" onClick={() => setDetail(p)}>{p.name}</td>
              <td>{p.category}</td>
              <td>
                {editingQtyId === p.id ? (
                  <input
                    className="inline-qty"
                    type="number"
                    value={editingQtyVal}
                    onChange={e => setEditingQtyVal(e.target.value)}
                    onBlur={() => commitQty(p)}
                    onKeyDown={e => e.key === 'Enter' && commitQty(p)}
                    autoFocus
                  />
                ) : (
                  <span onDoubleClick={() => startQtyEdit(p)}>{p.quantity || 0}</span>
                )}
              </td>
              <td>${(p.price || 0).toFixed(2)}</td>
              <td className="actions">
                <button onClick={() => handleStock(p.sku, 5)}>+5</button>
                <button onClick={() => handleStock(p.sku, 1)}>+1</button>
                <button onClick={() => handleStock(p.sku, -1)}>-1</button>
                <button onClick={() => handleStock(p.sku, -5)}>-5</button>
                <button onClick={() => setEditing(p)}>Edit</button>
                <button onClick={() => setConfirm({ id: p.id, name: p.name })}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing !== null && (
        <ProductForm
          product={editing}
          onClose={() => setEditing(null)}
          onSave={p => {
            if (p.id && products.find(x => x.id === p.id)) onUpdate(p)
            else onAdd(p)
            setEditing(null)
          }}
        />
      )}

      {confirm && (
        <Confirm
          title="Delete product"
          message={`Delete ${confirm.name}? This cannot be undone.`}
          onCancel={() => setConfirm(null)}
          onConfirm={() => { onDelete(confirm.id); setConfirm(null) }}
        />
      )}

      {detail && (
        <ProductDetail product={detail} onClose={() => setDetail(null)} onAdjust={(d)=>onAdjust(detail.sku,d,d>0?'in':'out')} onEdit={()=>{ setEditing(detail); setDetail(null) }} />
      )}
    </section>
  )
}
