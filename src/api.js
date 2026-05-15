const BASE = 'http://localhost:4000/api'

async function request(path, opts) {
  const res = await fetch(BASE + path, opts)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const err = new Error(body.error || res.statusText || 'API error')
    err.status = res.status
    throw err
  }
  return res.json().catch(() => ({}))
}

export const api = {
  getProducts: () => request('/products'),
  getProduct: id => request(`/products/${encodeURIComponent(id)}`),
  createProduct: p => request('/products', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(p) }),
  updateProduct: (id, p) => request(`/products/${encodeURIComponent(id)}`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(p) }),
  deleteProduct: id => request(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  adjustStock: (sku, delta, type='manual', user='frontend') => request(`/products/${encodeURIComponent(sku)}/adjust`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ delta, type, user }) }),

  getSuppliers: () => request('/suppliers'),
  createSupplier: s => request('/suppliers', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(s) }),
  updateSupplier: (id, s) => request(`/suppliers/${encodeURIComponent(id)}`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(s) }),
  deleteSupplier: id => request(`/suppliers/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  getTransactions: () => request('/transactions')
}

export default api
