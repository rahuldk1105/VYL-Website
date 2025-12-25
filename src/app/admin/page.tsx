'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Users, Camera, Image, Settings, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminDashboard() {
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user?.email) {
        setUserEmail(session.user.email)
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <LayoutDashboard className="text-gold w-6 h-6 sm:w-7 sm:h-7" />
              <span>Admin Dashboard</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Logged in as: {userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-blue-400" size={24} />
              <h3 className="text-lg font-semibold">Users</h3>
            </div>
            <p className="text-3xl font-bold">Coming Soon</p>
            <p className="text-gray-400 text-sm mt-2">User management will be available soon</p>
          </div>

          <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Camera className="text-green-400" size={24} />
              <h3 className="text-lg font-semibold">Photos</h3>
            </div>
            <p className="text-3xl font-bold">Coming Soon</p>
            <p className="text-gray-400 text-sm mt-2">Photo management will be available soon</p>
          </div>

          <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Image className="text-purple-400" size={24} />
              <h3 className="text-lg font-semibold">Gallery</h3>
            </div>
            <p className="text-3xl font-bold">Coming Soon</p>
            <p className="text-gray-400 text-sm mt-2">Gallery management will be available soon</p>
          </div>

          <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="text-yellow-400" size={24} />
              <h3 className="text-lg font-semibold">Settings</h3>
            </div>
            <p className="text-3xl font-bold">Coming Soon</p>
            <p className="text-gray-400 text-sm mt-2">System settings will be available soon</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Link
              href="/admin/index-faces"
              className="bg-gray-900 border border-white/10 hover:border-gold rounded-xl p-6 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 group-hover:bg-gold/20 rounded-lg flex items-center justify-center transition-colors">
                  <Camera className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Face Indexing</h3>
                  <p className="text-gray-400">Upload and index photos with face recognition</p>
                </div>
              </div>
            </Link>

            <div className="bg-gray-900 border border-white/10 rounded-xl p-6 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">User Management</h3>
                  <p className="text-gray-400">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
            <div className="text-center py-12">
              <p className="text-gray-400">Activity tracking will be implemented soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}