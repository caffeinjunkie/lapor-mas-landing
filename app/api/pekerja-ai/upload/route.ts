import { NextResponse } from 'next/server'

export const runtime = 'edge' // Optional: Use Edge Runtime for faster responses

export async function POST(request: Request) {
  try {
    // Check if the request contains form data
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected multipart/form-data' },
        { status: 400 }
      )
    }

    // Get the form data
    const formData = await request.formData()
    const file = formData.get('image') as File | null

    // Validate the file
    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      )
    }

    // Prepare the upload to Pekerja-AI
    const pekerjaFormData = new FormData()
    pekerjaFormData.append('image', file)

    const response = await fetch(process.env.PEKERJA_AI_IMG_UPLOAD_URL!, {
      method: 'POST',
      headers: {
        'x-auth-token': process.env.PEKERJA_AI_IMG_UPLOAD_KEY!,
        'Accept': 'application/json',
      },
      body: pekerjaFormData,
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = { message: response.statusText }
      }
      return NextResponse.json(
        { 
          error: 'Pekerja-AI upload failed',
          details: errorData.message || 'Unknown server error',
          status: response.status 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}