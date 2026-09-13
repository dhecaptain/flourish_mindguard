import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { desc, eq, gte } from 'drizzle-orm'
import { generateText } from 'ai'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { insightSummaries, journalEntries, moodEntries } from '@/lib/db/schema'

async function getUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user
}

export async function GET() {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const periodStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const moods = await db.select().from(moodEntries).where(eq(moodEntries.userId, user.id)).orderBy(desc(moodEntries.createdAt)).limit(30)
  const recentMoods = moods.filter((item) => item.createdAt >= periodStart)
  const journals = await db.select().from(journalEntries).where(eq(journalEntries.userId, user.id)).orderBy(desc(journalEntries.createdAt)).limit(20)
  const recentJournals = journals.filter((item) => item.createdAt >= periodStart)
  let [summary] = await db.select().from(insightSummaries).where(eq(insightSummaries.userId, user.id)).orderBy(desc(insightSummaries.createdAt)).limit(1)
  if (!summary || summary.createdAt < periodStart) {
    if (recentMoods.length || recentJournals.length) {
      const moodText = recentMoods.map((item) => `${item.mood} (${item.createdAt.toISOString().slice(0, 10)})`).join(', ') || 'none recorded'
      const journalText = recentJournals.map((item) => item.content.slice(0, 240)).join('\n') || 'none recorded'
      const generated = await generateText({ model: 'openai/gpt-4.1-mini', system: "You are Ward, a warm, non-clinical wellness companion. Never diagnose or give medical advice.", prompt: `Write a short 2–4 sentence reflection for this user in Ward's voice based only on the last 7 days. Be specific but gentle, avoid claims of certainty, and do not mention that you are an AI. Moods: ${moodText}\nJournal notes:\n${journalText}` })
      const [created] = await db.insert(insightSummaries).values({ id: crypto.randomUUID(), userId: user.id, periodStart, periodEnd: new Date(), summary: generated.text.trim() }).returning()
      summary = created
    }
  }
  const counts = recentMoods.reduce<Record<string, number>>((acc, item) => { acc[item.mood] = (acc[item.mood] || 0) + 1; return acc }, {})
  return NextResponse.json({ moods: recentMoods, counts, summary: summary?.summary ?? null })
}
