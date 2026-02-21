/**
 * PostHog Reverse Proxy Route Handler
 * Proxies PostHog requests through your domain to avoid ad blockers
 *
 * Usage: Set NEXT_PUBLIC_POSTHOG_REVERSE_PROXY=/api/posthog in your .env
 * Then PostHog will use this endpoint instead of directly connecting to PostHog servers
 */

import { NextRequest, NextResponse } from 'next/server'

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, params, 'GET')
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, params, 'POST')
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, params, 'OPTIONS')
}

async function handleRequest(
  request: NextRequest,
  params: Promise<{ path: string[] }>,
  method: string
) {
  try {
    const { path } = await params
    const posthogPath = path.join('/')

    // Construct the PostHog URL
    const posthogUrl = `${POSTHOG_HOST}/${posthogPath}${request.nextUrl.search}`

    // Get request body for POST requests
    let body: BodyInit | undefined
    if (method === 'POST') {
      try {
        body = await request.text()
      } catch {
        // If body parsing fails, continue without body
      }
    }

    // Forward the request to PostHog
    const response = await fetch(posthogUrl, {
      method,
      headers: {
        'Content-Type': request.headers.get('content-type') || 'application/json',
        'User-Agent': request.headers.get('user-agent') || 'Next.js PostHog Proxy',
        // Forward other relevant headers
        ...(request.headers.get('referer') && { Referer: request.headers.get('referer')! }),
      },
      body,
    })

    // Get response data
    const responseData = await response.text()

    // Create response with CORS headers
    return new NextResponse(responseData, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    })
  } catch (error) {
    console.error('[PostHog Proxy] Error:', error)
    return new NextResponse(JSON.stringify({ error: 'Proxy request failed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
