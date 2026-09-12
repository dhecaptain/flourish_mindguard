import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { desc, eq } from 'drizzle-orm'
import { streamText } from 'ai'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { chatMessages, moodEntries } from '@/lib/db/schema'

const crisisResponse = "I’m really glad you told me. I can’t provide crisis care, but you deserve immediate human support. If you may hurt yourself or someone else, call emergency services now. In the U.S., call or text 988. If you’re elsewhere, contact your local crisis line or emergency number."
const crisisPattern = /suicide|kill myself|hurt myself|self harm|self-harm|end my life|can’t go on|can't go on/i
async function getUserId() { const session = await auth.api.getSession({ headers: await headers() }); return session?.user?.id }
export async function POST(request: Request) { const userId = await getUserId(); if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const body = await request.json(); const messages = Array.isArray(body.messages) ? body.messages : []; const latest = messages.at(-1)?.content ?? ''; if (crisisPattern.test(latest)) return new Response(crisisResponse, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-MindGuard-Safety': 'crisis-resources' } }); const history = await db.select().from(chatMessages).where(eq(chatMessages.userId, userId)).orderBy(desc(chatMessages.createdAt)).limit(12); const moods = await db.select().from(moodEntries).where(eq(moodEntries.userId, userId)).orderBy(desc(moodEntries.createdAt)).limit(1); await db.insert(chatMessages).values({ id: crypto.randomUUID(), userId, role: 'user', content: latest }); const result = streamText({ model: 'openai/gpt-4.1-mini', system: `You are Ward, a gentle wellness companion. Never diagnose or replace professional care. Latest mood: ${moods[0]?.mood ?? 'not recorded'}. Respond warmly and briefly.`, messages: [...history.reverse().map((message) => ({ role: message.role as 'user' | 'assistant', content: message.content })), ...messages] as never, onFinish: async ({ text }) => { await db.insert(chatMessages).values({ id: crypto.randomUUID(), userId, role: 'assistant', content: text }) } }); return result.toTextStreamResponse() }
