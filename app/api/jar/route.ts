import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { activityCompletions, journalEntries, moodEntries } from '@/lib/db/schema'

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = session.user.id
  const [moods, journals, activities] = await Promise.all([
    db.select().from(moodEntries).where(eq(moodEntries.userId, userId)).orderBy(desc(moodEntries.createdAt)).limit(60),
    db.select().from(journalEntries).where(eq(journalEntries.userId, userId)).orderBy(desc(journalEntries.createdAt)).limit(60),
    db.select().from(activityCompletions).where(eq(activityCompletions.userId, userId)).orderBy(desc(activityCompletions.completedAt)).limit(60),
  ])
  const items = [...moods.map((item) => ({ type: 'mood', mood: item.mood, createdAt: item.createdAt })), ...journals.map((item) => ({ type: 'journal', context: item.content.slice(0, 90), createdAt: item.createdAt })), ...activities.map((item) => ({ type: 'activity', category: 'practice', createdAt: item.completedAt }))].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 60)
  return NextResponse.json({ items, total: items.length })
}
