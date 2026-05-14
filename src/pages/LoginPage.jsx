import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginPage({ onAuth }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simple validation
      if (!email || !password) {
        setError('Please fill in all fields')
        setLoading(false)
        return
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email')
        setLoading(false)
        return
      }

      // Store auth state
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)

      // Notify parent app and redirect to dashboard
      if (typeof onAuth === 'function') onAuth()
      navigate('/')
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-center text-white">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">
              IMS
            </div>
            <span className="text-2xl font-bold">Inventory Pro</span>
          </Link>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Manage Your Inventory Effortlessly
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Sign in to your account to access real-time inventory tracking, analytics, and management tools.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Real-time stock tracking
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Automated alerts & reports
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Multi-user access & analytics
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-blue-900/30 border border-blue-800/50 rounded-2xl p-8 backdrop-blur">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400 mb-8">Sign in to your Inventory Pro account</p>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-blue-800/20 border border-blue-700/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-blue-800/20 border border-blue-700/30 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded bg-blue-800/20 border border-blue-700/30 text-blue-500" />
                    <span className="text-sm text-gray-400">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Signing in...' : 'Sign In'} {!loading && <ArrowRight className="w-5 h-5" />}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-blue-800/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-blue-900/30 text-gray-400">Or</span>
                  </div>
                </div>

                {/* Demo Login */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail('demo@example.com')
                    setPassword('demo123')
                  }}
                  className="w-full py-3 border border-blue-700/30 text-blue-300 rounded-lg font-semibold hover:bg-blue-800/20 transition-colors"
                >
                  Use Demo Account
                </button>
              </form>

              {/* Signup Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
