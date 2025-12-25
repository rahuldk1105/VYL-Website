import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send to Web3Forms with API key from environment variables
    const web3FormsApiKey = process.env.WEB3FORMS_API_KEY
    
    if (!web3FormsApiKey) {
      console.error('WEB3FORMS_API_KEY is not configured')
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      )
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: web3FormsApiKey,
        name,
        email,
        subject,
        message,
      }),
    })

    const data = await res.json()

    if (data.success) {
      return NextResponse.json(
        { success: true, message: 'Message sent successfully' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { success: false, message: data.message || 'Failed to send message' },
        { status: 500 }
      )
    }

  } catch (err) {
    console.error('Contact form submission error:', err)
    return NextResponse.json(
      { success: false, message: 'Network error. Please try again later.' },
      { status: 500 }
    )
  }
}