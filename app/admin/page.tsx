import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  user,
  moodEntries,
  activities,
  savedActivities,
  activityCompletions,
  crisisEvents,
} from '@/lib/db/schema'
import { count, gte, eq, desc } from 'drizzle-orm'
import { Users, Activity, Heart, CheckCircle2, ShieldAlert } from 'lucide-react'

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // 1. Total users
  const [totalUsersRes] = await db.select({ value: count() }).from(user)
  const totalUsers = totalUsersRes?.value ?? 0

  // 2. Active check-ins
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [dailyCheckinsRes] = await db
    .select({ value: count() })
    .from(moodEntries)
    .where(gte(moodEntries.createdAt, oneDayAgo))
  const dailyCheckins = dailyCheckinsRes?.value ?? 0

  const [weeklyCheckinsRes] = await db
    .select({ value: count() })
    .from(moodEntries)
    .where(gte(moodEntries.createdAt, sevenDaysAgo))
  const weeklyCheckins = weeklyCheckinsRes?.value ?? 0

  // 3. Most-saved activities
  const savedCounts = await db
    .select({
      activityId: savedActivities.activityId,
      saveCount: count(),
    })
    .from(savedActivities)
    .groupBy(savedActivities.activityId)

  const allActivities = await db.select().from(activities)
  const activityMap = new Map(allActivities.map((a) => [a.id, a.title]))

  const topSaved = savedCounts
    .map((s) => ({
      title: activityMap.get(s.activityId) || s.activityId,
      count: Number(s.saveCount),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // 4. Most-completed activities
  const completedCounts = await db
    .select({
      activityId: activityCompletions.activityId,
      completionCount: count(),
    })
    .from(activityCompletions)
    .groupBy(activityCompletions.activityId)

  const topCompleted = completedCounts
    .map((c) => ({
      title: activityMap.get(c.activityId) || c.activityId,
      count: Number(c.completionCount),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // 5. Crisis trigger count
  const [crisisCountRes] = await db.select({ value: count() }).from(crisisEvents)
  const crisisTriggerCount = crisisCountRes?.value ?? 0

  return (
    <div className="page-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Aggregate Platform Analytics</p>
          <h1>Admin Overview<span className="sun-dot">.</span></h1>
          <p className="intro">
            High-level metrics and aggregate activity across MindGuard.
          </p>
        </div>
      </div>

      <div className="resource-grid">
        <article className="surface mood-card">
          <div className="section-kicker">
            <Users aria-hidden="true" /> TOTAL ACCOUNTS
          </div>
          <div className="mood-heading" style={{ margin: '12px 0 0' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>{totalUsers}</h2>
          </div>
        </article>

        <article className="surface mood-card">
          <div className="section-kicker">
            <Activity aria-hidden="true" /> CHECK-INS
          </div>
          <div className="mood-heading" style={{ margin: '12px 0 0' }}>
            <div>
              <h2>{dailyCheckins} 24h</h2>
              <p>{weeklyCheckins} in past 7 days</p>
            </div>
          </div>
        </article>

        <article className="surface mood-card">
          <div className="section-kicker">
            <ShieldAlert aria-hidden="true" /> CRISIS SAFETY TRIGGERS
          </div>
          <div className="mood-heading" style={{ margin: '12px 0 0' }}>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>{crisisTriggerCount}</h2>
              <p>Total safety resources displayed (count only)</p>
            </div>
          </div>
        </article>
      </div>

      <div className="insights-grid">
        <section className="surface entry-list">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                <Heart aria-hidden="true" /> POPULAR PRACTICES
              </span>
              <h2>Most-Saved Activities</h2>
            </div>
          </div>
          {topSaved.length === 0 ? (
            <p className="empty-state" style={{ marginTop: '16px' }}>No saved activities recorded yet.</p>
          ) : (
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {topSaved.map((item) => (
                <div key={item.title} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f3f6f0', borderRadius: '8px' }}>
                  <span>{item.title}</span>
                  <strong>{item.count} saves</strong>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="surface entry-list">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                <CheckCircle2 aria-hidden="true" /> ENGAGEMENT
              </span>
              <h2>Most-Completed Activities</h2>
            </div>
          </div>
          {topCompleted.length === 0 ? (
            <p className="empty-state" style={{ marginTop: '16px' }}>No activity completions recorded yet.</p>
          ) : (
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {topCompleted.map((item) => (
                <div key={item.title} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f3f6f0', borderRadius: '8px' }}>
                  <span>{item.title}</span>
                  <strong>{item.count} completions</strong>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
