import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { desc, eq, gte } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { insightSummaries, moodEntries } from '@/lib/db/schema'

async function getUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user
}

export async function GET() {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const moods = await db.select().from(moodEntries).where(eq(moodEntries.userId, user.id)).orderBy(desc(moodEntries.createdAt)).limit(30)
  const [summary] = await db.select().from(insightSummaries).where(eq(insightSummaries.userId, user.id)).orderBy(desc(insightSummaries.createdAt)).limit(1)
  const counts = moods.reduce<Record<string, number>>((acc, item) => { acc[item.mood] = (acc[item.mood] || 0) + 1; return acc }, {})
  const recent = moods.filter((item) => item.createdAt >= since)
  return NextResponse.json({ moods: recent, counts, summary: summary?.summary ?? null })
}
