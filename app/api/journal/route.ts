import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { journalEntries } from '@/lib/db/schema'
async function userId() { const session = await auth.api.getSession({ headers: await headers() }); return session?.user?.id }
export async function GET() { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); return NextResponse.json(await db.select().from(journalEntries).where(eq(journalEntries.userId, id)).orderBy(desc(journalEntries.createdAt)).limit(50)) }
export async function POST(request: Request) { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const body = await request.json(); const content = typeof body.content === 'string' ? body.content.trim() : ''; if (!content || content.length > 10000) return NextResponse.json({ error: 'Journal content is required' }, { status: 400 }); const entry = { id: crypto.randomUUID(), userId: id, content, mood: typeof body.mood === 'string' ? body.mood : null }; await db.insert(journalEntries).values(entry); return NextResponse.json(entry, { status: 201 }) }
