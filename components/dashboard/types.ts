export type View = 'Today' | 'Explore' | 'Journal' | 'Insights' | 'Support' | 'Profile'

export type Activity = {
  id: string
  title: string
  category: string
  duration: string
  description?: string
}

export type Entry = {
  id: string
  content: string
  createdAt: string
}

export type WardState = 'idle' | 'listening' | 'speaking' | 'celebrating' | 'mood'
export type WardMood = 'Low' | 'Okay' | 'Good' | 'Great'
