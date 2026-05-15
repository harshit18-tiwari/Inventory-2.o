import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import ProductList from './components/ProductList'
import SupplierList from './components/SupplierList'
import TransactionLog from './components/TransactionLog'
import Toasts from './components/Toasts'
import { api } from './api'
import NavBar from './components/NavBar'
import ModernSidebar from './components/ModernSidebar'
import Topbar from './components/Topbar'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import SuppliersPage from './pages/SuppliersPage'
import TransactionsPage from './pages/TransactionsPage'
import ReportsPage from './pages/ReportsPage'
import UsersPage from './pages/UsersPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [transactions, setTransactions] = useState([])

  // Check auth status on mount
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true'
    setIsAuthenticated(auth)
    setLoading(false)
  }, [])

  // Load initial data from backend
  useEffect(() => {
    if (!isAuthenticated) return
    let mounted = true
    async function load() {
      try {
        const [ps, ss, ts] = await Promise.all([api.getProducts(), api.getSuppliers(), api.getTransactions()])
        if (!mounted) return
        setProducts(ps || [])
        setSuppliers(ss || [])
        setTransactions(ts || [])
      } catch (err) {
        console.error('Failed to load data', err)
        showToast('Failed to load initial data')
      }
    }
    load()
    return () => { mounted = false }
  }, [isAuthenticated])

  async function addProduct(p) {
    try {
      const created = await api.createProduct(p)
      setProducts(prev => [created, ...prev])
      showToast('Product added')
    } catch (err) {
      showToast('Failed to add product')
      console.error(err)
    }
  }

  async function updateProduct(updated) {
    try {
      const up = await api.updateProduct(updated.id, updated)
      setProducts(prev => prev.map(p => (p.id === up.id ? up : p)))
      showToast('Product updated')
    } catch (err) {
      showToast('Failed to update product')
      console.error(err)
    }
  }

  async function deleteProduct(id) {
    try {
      await api.deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      showToast('Product deleted')
    } catch (err) {
      showToast('Failed to delete product')
      console.error(err)
    }
  }

  async function addSupplier(s) {
    try {
      const created = await api.createSupplier(s)
      setSuppliers(prev => [created, ...prev])
      showToast('Supplier added')
    } catch (err) {
      showToast('Failed to add supplier')
      console.error(err)
    }
  }

  async function updateSupplier(updated) {
    try {
      const up = await api.updateSupplier(updated.id, updated)
      setSuppliers(prev => prev.map(s => (s.id === up.id ? up : s)))
      showToast('Supplier updated')
    } catch (err) {
      showToast('Failed to update supplier')
      console.error(err)
    }
  }

  async function deleteSupplier(id) {
    try {
      await api.deleteSupplier(id)
      setSuppliers(prev => prev.filter(s => s.id !== id))
      showToast('Supplier deleted')
    } catch (err) {
      showToast('Failed to delete supplier')
      console.error(err)
    }
  }

  function recordTransaction(tx) {
    setTransactions(prev => [tx, ...prev])
  }

  async function adjustStock(sku, delta, type, user = 'warehouse') {
    // optimistic update
    setProducts(prev => prev.map(p => (p.sku === sku ? { ...p, quantity: Math.max(0, (p.quantity||0) + delta) } : p)))
    try {
      const res = await api.adjustStock(sku, delta, type, user)
      if (res && res.transaction) recordTransaction(res.transaction)
      if (res && res.product) {
        setProducts(prev => prev.map(p => (p.sku === sku ? res.product : p)))
      }
      showToast(`${sku} ${delta > 0 ? 'received' : 'removed'} (${delta})`)
    } catch (err) {
      showToast('Failed to adjust stock')
      console.error(err)
      // rollback: refetch product
      try {
        const fresh = await api.getProduct(sku)
        if (fresh) setProducts(prev => prev.map(p => (p.sku === sku ? fresh : p)))
      } catch (_) {}
    }
  }

  // Toasts
  const [toasts, setToasts] = React.useState([])
  function showToast(message, ms = 3000) {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 8)
    setToasts(t => [...t, { id, message }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), ms)
  }

  // Logout function
  function handleLogout() {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    setIsAuthenticated(false)
    showToast('Logged out successfully')
  }

  // Low-stock banner dismiss
  const [bannerDismissed, setBannerDismissed] = React.useState(false)
  const lowStock = products.filter(p => (p.quantity || 0) <= (p.reorder || 5))

  // Keyboard shortcuts
  React.useEffect(() => {
    function onKey(e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return
      if (e.key === 'n') {
        const ev = new CustomEvent('open-add-product')
        window.dispatchEvent(ev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // apply saved theme
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  function toggleTheme(next) {
    const newMode = typeof next === 'boolean' ? next : !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode)
    if (newMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }

  return (
    <BrowserRouter>
      {loading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      ) : !isAuthenticated ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onAuth={() => setIsAuthenticated(true)} />} />
          <Route path="/signup" element={<SignupPage onAuth={() => setIsAuthenticated(true)} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <div className="flex h-screen">
            <ModernSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Topbar onToggleTheme={toggleTheme} darkMode={darkMode} />
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div />
                  <div />
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                {lowStock.length>0 && !bannerDismissed && (
                  <div className="mx-6 my-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-between">
                    <div className="text-yellow-800 font-medium">⚠️ {lowStock.length} low-stock item(s). Review reorder levels.</div>
                    <div>
                      <button className="px-3 py-1 bg-yellow-200 rounded" onClick={() => { setBannerDismissed(true); showToast('Banner dismissed') }}>Dismiss</button>
                    </div>
                  </div>
                )}

                <main className="app-main">
                  <Toasts items={toasts} />
                <Routes>
                  <Route path="/" element={<DashboardPage products={products} transactions={transactions} />} />
                  <Route path="/products" element={<ProductsPage products={products} onAdd={addProduct} onUpdate={updateProduct} onDelete={deleteProduct} onAdjust={adjustStock} />} />
                  <Route path="/suppliers" element={<SuppliersPage suppliers={suppliers} onAdd={addSupplier} onUpdate={updateSupplier} onDelete={deleteSupplier} />} />
                  <Route path="/transactions" element={<TransactionsPage transactions={transactions} />} />
                  <Route path="/reports" element={<ReportsPage products={products} transactions={transactions} />} />
                  <Route path="/users" element={<UsersPage onLogout={handleLogout} darkMode={darkMode} onToggleTheme={toggleTheme} />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              </div>
            </div>
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}
