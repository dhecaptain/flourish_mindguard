import { betterAuth } from 'better-auth'
import { eq } from 'drizzle-orm'
import { pool, db } from '@/lib/db'
import { activityCompletions, chatMessages, feedbackMessages, insightSummaries, journalEntries, moodEntries, savedActivities, wellnessProfile } from '@/lib/db/schema'

const developmentOrigins = [
  'http://localhost:3000',
  process.env.V0_RUNTIME_URL,
  process.env.V0_DEV_APP_URL,
  process.env.V0_BUILD_URL,
  process.env.V0_SANDBOX_URL,
].filter((origin): origin is string => Boolean(origin))

export const auth = betterAuth({
  database: pool,
  baseURL: process.env.BETTER_AUTH_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.V0_RUNTIME_URL),
  emailAndPassword: { enabled: true, autoSignIn: true },
  user: {
    deleteUser: {
      enabled: true,
      beforeDelete: async (user) => {
        const userId = user.id
        await db.delete(moodEntries).where(eq(moodEntries.userId, userId))
        await db.delete(journalEntries).where(eq(journalEntries.userId, userId))
        await db.delete(chatMessages).where(eq(chatMessages.userId, userId))
        await db.delete(savedActivities).where(eq(savedActivities.userId, userId))
        await db.delete(activityCompletions).where(eq(activityCompletions.userId, userId))
        await db.delete(insightSummaries).where(eq(insightSummaries.userId, userId))
        await db.delete(feedbackMessages).where(eq(feedbackMessages.userId, userId))
        await db.delete(wellnessProfile).where(eq(wellnessProfile.userId, userId))
      },
    },
  },
  trustedOrigins: process.env.NODE_ENV === 'development' ? developmentOrigins : [process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`, process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`].filter((origin): origin is string => Boolean(origin)),
  session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
  ...(process.env.NODE_ENV === 'development' ? { advanced: { defaultCookieAttributes: { sameSite: 'none' as const, secure: true } } } : {}),
})
