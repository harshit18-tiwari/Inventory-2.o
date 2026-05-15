import React from 'react'
import { formatINR } from '../utils/format'
import { ArrowRight, Package, BarChart3, Lock, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-blue-800/30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center font-bold">
            IMS
          </div>
          <span className="text-xl font-bold">Inventory Pro</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="px-6 py-2 rounded-lg border border-blue-400 text-blue-300 hover:bg-blue-400/10 transition-colors font-medium">
            Login
          </Link>
          <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Smart Inventory <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Management</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Streamline your inventory operations with real-time tracking, automated alerts, and powerful analytics. Perfect for warehouses, retail, and supply chain teams.
            </p>
            <div className="flex gap-4">
              <Link to="/signup" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-blue-600 hover:to-indigo-700 font-bold flex items-center gap-2 transition-all">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-3 border-2 border-blue-400 rounded-lg text-blue-300 hover:bg-blue-400/10 font-bold transition-colors">
                View Demo
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-2xl p-8 border border-blue-800/50 backdrop-blur">
              <div className="space-y-4">
                <div className="p-4 bg-blue-800/20 rounded-lg border border-blue-700/30">
                  <p className="text-sm text-blue-300 font-mono">Total Inventory Value</p>
                  <p className="text-3xl font-bold mt-2">{formatINR(125480, { compact: false })}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-800/20 rounded-lg border border-green-700/30">
                    <p className="text-sm text-green-300">Stock In</p>
                    <p className="text-2xl font-bold mt-1">2,450</p>
                  </div>
                  <div className="p-4 bg-red-800/20 rounded-lg border border-red-700/30">
                    <p className="text-sm text-red-300">Stock Out</p>
                    <p className="text-2xl font-bold mt-1">1,230</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-2xl p-8 hover:bg-blue-900/50 transition-all">
            <Package className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Product Management</h3>
            <p className="text-gray-400">Organize and track all your products with SKUs, categories, and reorder levels.</p>
          </div>
          
          <div className="bg-indigo-900/30 border border-indigo-800/50 rounded-2xl p-8 hover:bg-indigo-900/50 transition-all">
            <BarChart3 className="w-12 h-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Analytics & Reports</h3>
            <p className="text-gray-400">Get detailed insights with charts, trends, and custom reports.</p>
          </div>
          
          <div className="bg-emerald-900/30 border border-emerald-800/50 rounded-2xl p-8 hover:bg-emerald-900/50 transition-all">
            <Zap className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
            <p className="text-gray-400">Instant notifications for stock movements and low inventory alerts.</p>
          </div>
          
          <div className="bg-purple-900/30 border border-purple-800/50 rounded-2xl p-8 hover:bg-purple-900/50 transition-all">
            <Lock className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
            <p className="text-gray-400">Enterprise-grade security with data backup and role-based access.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center border border-blue-500/50">
          <h2 className="text-3xl font-bold mb-4">Ready to optimize your inventory?</h2>
          <p className="text-lg text-blue-100 mb-8">Join hundreds of businesses using Inventory Pro to streamline operations.</p>
          <Link to="/signup" className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Start Free Trial
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-blue-800/30 py-8 px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 Inventory Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
