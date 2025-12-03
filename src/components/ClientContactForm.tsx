'use client'

import { useState } from 'react'

export default function ClientContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; text: string }>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '0be0e885-9030-4c58-b011-b8ed369d8759',
          name,
          email,
          subject,
          message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus({ ok: true, text: 'Message sent successfully. We will contact you soon.' })
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        setStatus({ ok: false, text: data.message || 'Something went wrong. Please try again.' })
      }
    } catch (err) {
      setStatus({ ok: false, text: 'Network error. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl p-6 text-black space-y-4 max-w-xl w-full mx-auto shadow-lg">
      {status && (
        <div className={`rounded-md px-3 py-2 text-sm ${status.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{status.text}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required type="text" className="w-full border rounded-md px-3 py-2" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="w-full border rounded-md px-3 py-2" placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Subject</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} required type="text" className="w-full border rounded-md px-3 py-2" placeholder="How can we help?" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={6} className="w-full border rounded-md px-3 py-2" placeholder="Tell us more" />
      </div>
      <button disabled={loading} type="submit" className="bg-black text-white font-black uppercase text-sm px-6 py-3 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60">
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

