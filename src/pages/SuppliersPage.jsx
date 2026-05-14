import React from 'react'
import { Users, Plus, Search } from 'lucide-react'
import SupplierList from '../components/SupplierList'

export default function SuppliersPage({ suppliers, onAdd }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Suppliers</h1>
              <p className="text-gray-600 mt-1">Manage your supplier information and contacts</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <SupplierList suppliers={suppliers} onAdd={onAdd} />
        </div>
      </div>
    </div>
  )
}
