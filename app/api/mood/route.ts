import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { moodEntries, wellnessProfile } from '@/lib/db/schema'

async function userId() { const session = await auth.api.getSession({ headers: await headers() }); return session?.user?.id }
export async function GET() { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const entries = await db.select().from(moodEntries).where(eq(moodEntries.userId, id)).orderBy(desc(moodEntries.createdAt)).limit(30); return NextResponse.json(entries) }
export async function POST(request: Request) { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const body = await request.json(); const mood = ['Low', 'Okay', 'Good', 'Great'].includes(body.mood) ? body.mood : null; if (!mood) return NextResponse.json({ error: 'Invalid mood' }, { status: 400 }); const entry = { id: crypto.randomUUID(), userId: id, mood }; await db.insert(moodEntries).values(entry); const [profile] = await db.select().from(wellnessProfile).where(eq(wellnessProfile.userId, id)).limit(1); if (profile) await db.update(wellnessProfile).set({ streak: profile.streak + 1, updatedAt: new Date() }).where(eq(wellnessProfile.userId, id)); else await db.insert(wellnessProfile).values({ userId: id, streak: 1 }); return NextResponse.json(entry, { status: 201 }) }
