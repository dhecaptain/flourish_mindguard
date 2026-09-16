import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { activities } from '@/lib/db/schema'

async function checkAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session?.user || (session.user as any).role !== 'admin') {
    return false
  }
  return true
}

export async function GET() {
  const isAdmin = await checkAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const items = await db.select().from(activities).orderBy(desc(activities.createdAt))
  return NextResponse.json({ items })
}

export async function POST(request: Request) {
  const isAdmin = await checkAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const { title, category, description, instructions, estDuration } = body

  if (!title || !category || !description || !instructions || estDuration === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const newActivity = {
    id: crypto.randomUUID(),
    title,
    category,
    description,
    instructions,
    estDuration: Number(estDuration),
  }

  await db.insert(activities).values(newActivity)
  return NextResponse.json(newActivity)
}

export async function PATCH(request: Request) {
  const isAdmin = await checkAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const { id, title, category, description, instructions, estDuration } = body

  if (!id) {
    return NextResponse.json({ error: 'Activity ID is required' }, { status: 400 })
  }

  const updateData: Record<string, any> = {}
  if (title !== undefined) updateData.title = title
  if (category !== undefined) updateData.category = category
  if (description !== undefined) updateData.description = description
  if (instructions !== undefined) updateData.instructions = instructions
  if (estDuration !== undefined) updateData.estDuration = Number(estDuration)

  await db.update(activities).set(updateData).where(eq(activities.id, id))
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const isAdmin = await checkAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Activity ID is required' }, { status: 400 })
  }

  await db.delete(activities).where(eq(activities.id, id))
  return NextResponse.json({ success: true })
}
