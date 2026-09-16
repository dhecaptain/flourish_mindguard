import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { feedbackMessages } from '@/lib/db/schema'

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 2000) : null
  const rating = Number.isInteger(body.rating) && body.rating >= 1 && body.rating <= 5 ? body.rating : null
  if (!message && rating === null) return NextResponse.json({ error: 'Message or rating is required' }, { status: 400 })
  await db.insert(feedbackMessages).values({ id: crypto.randomUUID(), userId: session.user.id, message, rating })
  return NextResponse.json({ ok: true })
}
