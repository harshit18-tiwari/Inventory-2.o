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
    <section className="space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-200/60 backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Products</h2>
            <p className="mt-1 text-sm text-slate-500">Search, add, edit, or remove inventory items.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:w-80"
              placeholder="Search SKU or name"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => setEditing({})}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
        <div className="overflow-x-auto">
          <table className="min-w-[1180px] w-full border-collapse text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold cursor-pointer whitespace-nowrap" onClick={() => toggleSort('sku')}>SKU {sortKey==='sku'? (sortDir==='asc'?'▲':'▼') : ''}</th>
                <th className="px-6 py-4 font-semibold cursor-pointer whitespace-nowrap min-w-[220px]" onClick={() => toggleSort('name')}>Name {sortKey==='name'? (sortDir==='asc'?'▲':'▼') : ''}</th>
                <th className="px-6 py-4 font-semibold cursor-pointer whitespace-nowrap min-w-[180px]" onClick={() => toggleSort('category')}>Category {sortKey==='category'? (sortDir==='asc'?'▲':'▼') : ''}</th>
                <th className="px-6 py-4 font-semibold cursor-pointer whitespace-nowrap" onClick={() => toggleSort('quantity')}>Qty {sortKey==='quantity'? (sortDir==='asc'?'▲':'▼') : ''}</th>
                <th className="px-6 py-4 font-semibold cursor-pointer whitespace-nowrap" onClick={() => toggleSort('price')}>Price {sortKey==='price'? (sortDir==='asc'?'▲':'▼') : ''}</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedFiltered().map(p => (
                <tr key={p.id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{p.sku}</td>
                  <td className="px-6 py-4 min-w-[220px]">
                    <button className="text-left font-medium text-blue-600 transition hover:text-blue-700" onClick={() => setDetail(p)}>
                      {p.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 min-w-[180px] text-slate-700 whitespace-nowrap">{p.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                    {editingQtyId === p.id ? (
                      <input
                        className="inline-qty w-20 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        type="number"
                        value={editingQtyVal}
                        onChange={e => setEditingQtyVal(e.target.value)}
                        onBlur={() => commitQty(p)}
                        onKeyDown={e => e.key === 'Enter' && commitQty(p)}
                        autoFocus
                      />
                    ) : (
                      <button className="rounded-lg px-2 py-1 text-left text-slate-700 transition hover:bg-slate-100" onDoubleClick={() => startQtyEdit(p)}>
                        {p.quantity || 0}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">${(p.price || 0).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200" onClick={() => handleStock(p.sku, 5)}>+5</button>
                      <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200" onClick={() => handleStock(p.sku, 1)}>+1</button>
                      <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200" onClick={() => handleStock(p.sku, -1)}>-1</button>
                      <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200" onClick={() => handleStock(p.sku, -5)}>-5</button>
                      <button className="rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100" onClick={() => setEditing(p)}>Edit</button>
                      <button className="rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100" onClick={() => setConfirm({ id: p.id, name: p.name })}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
