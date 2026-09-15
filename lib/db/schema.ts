import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

export const chatMessages = pgTable('mindguard_chat_messages', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  role: text('role').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const wellnessProfile = pgTable('mindguard_wellness_profiles', {
  userId: text('user_id').primaryKey(),
  displayName: text('display_name').notNull().default('Alex'),
  streak: integer('streak').notNull().default(0),
  notificationsEnabled: boolean('notifications_enabled').notNull().default(true),
  gentleModeEnabled: boolean('gentle_mode_enabled').notNull().default(false),
  hasOnboarded: boolean('has_onboarded').notNull().default(false),
  primaryFocus: text('primary_focus').notNull().default('feeling steady'),
  reminderTime: text('reminder_time'),
  morningReminder: boolean('morning_reminder').notNull().default(true),
  middayReminder: boolean('midday_reminder').notNull().default(true),
  eveningReminder: boolean('evening_reminder').notNull().default(true),
  weeklyInsightsEnabled: boolean('weekly_insights_enabled').notNull().default(true),
  hasSeenSafetyNotice: boolean('has_seen_safety_notice').notNull().default(false),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const moodEntries = pgTable('mindguard_mood_entries', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  mood: text('mood').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const journalEntries = pgTable('mindguard_journal_entries', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  content: text('content').notNull(),
  mood: text('mood'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const activities = pgTable('mindguard_activities', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  instructions: text('instructions').notNull(),
  estDuration: integer('est_duration').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const activityCompletions = pgTable('mindguard_activity_completions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  activityId: text('activity_id').notNull(),
  completedAt: timestamp('completed_at').notNull().defaultNow(),
})

export const savedActivities = pgTable('mindguard_saved_activities', {
  userId: text('user_id').notNull(),
  activityId: text('activity_id').notNull(),
  savedAt: timestamp('saved_at').notNull().defaultNow(),
})

export const insightSummaries = pgTable('mindguard_insights', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  periodStart: timestamp('period_start').notNull(),
  periodEnd: timestamp('period_end').notNull(),
  summary: text('summary_text').notNull(),
  createdAt: timestamp('generated_at').notNull().defaultNow(),
})

export const feedbackMessages = pgTable('mindguard_feedback_messages', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
