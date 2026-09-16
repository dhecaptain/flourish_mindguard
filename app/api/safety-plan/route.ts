import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { safetyPlans } from '@/lib/db/schema'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id
}

export async function GET() {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [plan] = await db.select().from(safetyPlans).where(eq(safetyPlans.userId, userId))
  return NextResponse.json(
    plan || {
      emergencyContacts: '',
      copingStrategies: '',
      safePlaces: '',
      warningSigns: '',
    }
  )
}

export async function PATCH(request: Request) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { emergencyContacts, copingStrategies, safePlaces, warningSigns } = body

  const existing = await db.select().from(safetyPlans).where(eq(safetyPlans.userId, userId))
  if (existing.length > 0) {
    await db
      .update(safetyPlans)
      .set({
        emergencyContacts,
        copingStrategies,
        safePlaces,
        warningSigns,
        updatedAt: new Date(),
      })
      .where(eq(safetyPlans.userId, userId))
  } else {
    await db.insert(safetyPlans).values({
      userId,
      emergencyContacts,
      copingStrategies,
      safePlaces,
      warningSigns,
    })
  }

  return NextResponse.json({ success: true })
}
