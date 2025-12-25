'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LogOut, Upload, Images } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminDashboard() {
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Get logged in user's email
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email)
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome, {userEmail || 'Admin'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Photos */}
          <Link
            href="/admin/upload"
            className="bg-gray-900 border border-white/10 hover:border-gold rounded-xl p-8 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gold/10 group-hover:bg-gold/20 rounded-xl flex items-center justify-center transition-colors">
                <Upload className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Upload Photos</h2>
                <p className="text-gray-400">Upload photos to events in bulk</p>
              </div>
            </div>
          </Link>

          {/* View Gallery */}
          <Link
            href="/gallery"
            className="bg-gray-900 border border-white/10 hover:border-gold rounded-xl p-8 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-500/10 group-hover:bg-purple-500/20 rounded-xl flex items-center justify-center transition-colors">
                <Images className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">View Gallery</h2>
                <p className="text-gray-400">Browse all uploaded photos</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gray-900 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Quick Guide</h3>
          <ul className="space-y-2 text-gray-400">
            <li>• Upload photos: Select an event and upload multiple photos at once</li>
            <li>• Photos are stored in Cloudflare R2 bucket</li>
            <li>• Photos are automatically categorized by event</li>
            <li>• Supported formats: JPEG, PNG, WebP, GIF</li>
            <li>• Maximum file size: 10MB per photo</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
