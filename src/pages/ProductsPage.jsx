import React from 'react'
import { Package, Plus, Search } from 'lucide-react'
import ProductList from '../components/ProductList'

export default function ProductsPage(props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">Manage your inventory products and stock levels</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <ProductList {...props} />
        </div>
      </div>
    </div>
  )
}
