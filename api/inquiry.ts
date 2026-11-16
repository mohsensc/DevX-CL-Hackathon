import { put } from '@vercel/blob'

const maxBodyBytes = 10_000
const fieldLimits = { fullName: 120, company: 120, email: 200, interest: 40, message: 4000 }
const requiredFields = ['fullName', 'company', 'email']
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type InquiryField = keyof typeof fieldLimits

function reply(status: number, ok: boolean) {
  return Response.json({ ok }, { status, headers: { 'Cache-Control': 'no-store' } })
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (!origin || !host) return false
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

function readInquiry(payload: unknown) {
  if (typeof payload !== 'object' || payload === null) return null
  const source = payload as Record<string, unknown>
  const inquiry = {} as Record<InquiryField, string>
  for (const field of Object.keys(fieldLimits) as InquiryField[]) {
    const value = source[field] ?? ''
    if (typeof value !== 'string') return null
    const trimmed = value.trim()
    if (trimmed.length > fieldLimits[field]) return null
    if (requiredFields.includes(field) && trimmed.length === 0) return null
    inquiry[field] = trimmed
  }
  if (!emailPattern.test(inquiry.email)) return null
  return inquiry
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'unknown'
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return reply(403, false)
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415, false)

  const rawBody = await request.text()
  if (new TextEncoder().encode(rawBody).length > maxBodyBytes) return reply(413, false)

  let payload: unknown
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return reply(400, false)
  }

  if (typeof payload === 'object' && payload !== null && (payload as Record<string, unknown>).website) {
    return reply(200, true)
  }

  const inquiry = readInquiry(payload)
  if (!inquiry) return reply(400, false)

  const receivedAt = new Date().toISOString()
  const pathname = `inquiries/${receivedAt.replace(/[:.]/g, '-')}-${slugify(inquiry.company)}.json`

  try {
    await put(pathname, JSON.stringify({ receivedAt, ...inquiry }, null, 2), {
      access: 'private',
      addRandomSuffix: true,
      contentType: 'application/json',
    })
  } catch (error) {
    console.error('inquiry storage failed', error)
    return reply(500, false)
  }

  return reply(200, true)
}
