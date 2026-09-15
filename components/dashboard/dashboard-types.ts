export type View = 'Today' | 'Explore' | 'Journal' | 'Insights' | 'Support' | 'Profile'

export type Activity = {
  id: string
  title: string
  description: string
  category: string
  durationMinutes: number
}

export type Entry = {
  id?: string
  content: string
  mood?: string | null
  createdAt?: string | Date | null
}
