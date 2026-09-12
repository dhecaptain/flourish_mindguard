import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { and, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { activities, activityCompletions, savedActivities } from '@/lib/db/schema'
async function userId() { const session = await auth.api.getSession({ headers: await headers() }); return session?.user?.id }
export async function GET() { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const [items, saved, completed] = await Promise.all([db.select().from(activities), db.select().from(savedActivities).where(eq(savedActivities.userId, id)), db.select().from(activityCompletions).where(eq(activityCompletions.userId, id))]); return NextResponse.json({ items, saved: saved.map((x) => x.activityId), completed: completed.map((x) => x.activityId) }) }
export async function POST(request: Request) { const id = await userId(); if (!id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const body = await request.json(); if (typeof body.activityId !== 'string' || !['save', 'unsave', 'complete'].includes(body.action)) return NextResponse.json({ error: 'Invalid request' }, { status: 400 }); if (body.action === 'save') await db.insert(savedActivities).values({ userId: id, activityId: body.activityId }).onConflictDoNothing(); if (body.action === 'unsave') await db.delete(savedActivities).where(and(eq(savedActivities.userId, id), eq(savedActivities.activityId, body.activityId))); if (body.action === 'complete') await db.insert(activityCompletions).values({ id: crypto.randomUUID(), userId: id, activityId: body.activityId }); return NextResponse.json({ ok: true }) }
