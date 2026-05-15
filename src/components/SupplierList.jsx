import React, { useMemo, useState } from 'react'

export default function SupplierList({ suppliers = [], onAdd }) {
  const [show, setShow] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })

  const filteredSuppliers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return suppliers
    return suppliers.filter(s => [s.name, s.email, s.phone, s.address].join(' ').toLowerCase().includes(q))
  }, [suppliers, searchTerm])

  function submit(e) {
    e.preventDefault()
    onAdd({ id: Date.now().toString(), ...form })
    setForm({ name: '', email: '', phone: '', address: '' })
    setShow(false)
  }

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-emerald-100 bg-white/90 p-5 shadow-sm shadow-emerald-100/60 backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Suppliers</h2>
            <p className="mt-1 text-sm text-slate-500">Search suppliers and keep contact details organized.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 sm:w-80"
              placeholder="Search name, email, phone, or address"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-emerald-700"
              onClick={() => setShow(s => !s)}
            >
              {show ? 'Close Form' : 'Add Supplier'}
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full border-collapse text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Supplier</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Email</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Phone</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSuppliers.map(s => (
                <tr key={s.id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{s.name}</td>
                  <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{s.email || '-'}</td>
                  <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{s.phone || '-'}</td>
                  <td className="px-6 py-4 text-slate-700">{s.address || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {show && (
        <div className="modal">
          <form className="product-form" onSubmit={submit}>
            <div className="product-form__header">
              <h3>Add Supplier</h3>
              <p>Enter supplier contact details.</p>
            </div>

            <div className="product-form__grid">
              <label className="field field--full">
                <span>Name</span>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </label>
              <label className="field field--full">
                <span>Email</span>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </label>
              <label className="field">
                <span>Phone</span>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </label>
              <label className="field">
                <span>Address</span>
                <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
