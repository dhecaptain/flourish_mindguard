import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { wellnessProfile } from '@/lib/db/schema'
async function getUser() { const session = await auth.api.getSession({ headers: await headers() }); return session?.user }
export async function GET() { const user = await getUser(); if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const [profile] = await db.select().from(wellnessProfile).where(eq(wellnessProfile.userId, user.id)).limit(1); return NextResponse.json(profile ?? { userId: user.id, displayName: user.name, streak: 0, notificationsEnabled: true, gentleModeEnabled: false, hasOnboarded: false, primaryFocus: 'feeling steady', reminderTime: null }) }
export async function PATCH(request: Request) { const user = await getUser(); if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const body = await request.json(); const values = { displayName: typeof body.displayName === 'string' ? body.displayName.trim().slice(0, 80) || user.name : user.name, notificationsEnabled: Boolean(body.notificationsEnabled), gentleModeEnabled: Boolean(body.gentleModeEnabled), hasOnboarded: typeof body.hasOnboarded === 'boolean' ? body.hasOnboarded : false, primaryFocus: typeof body.primaryFocus === 'string' ? body.primaryFocus.trim().slice(0, 120) || 'feeling steady' : 'feeling steady', reminderTime: typeof body.reminderTime === 'string' ? body.reminderTime.trim().slice(0, 20) || null : null, updatedAt: new Date() }; await db.insert(wellnessProfile).values({ userId: user.id, ...values }).onConflictDoUpdate({ target: wellnessProfile.userId, set: values }); return NextResponse.json(values) }
