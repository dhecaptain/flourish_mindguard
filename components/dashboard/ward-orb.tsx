'use client'

import { useEffect, useState } from 'react'
import type { WardMood, WardState } from './types'

export function WardOrb({ small = false, state = 'idle', mood }: { small?: boolean; state?: WardState; mood?: WardMood | string | null }) {
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    if (state !== 'idle') return
    const timer = window.setTimeout(() => setBlink(true), 4000 + Math.random() * 3000)
    return () => window.clearTimeout(timer)
  }, [state, blink])

  useEffect(() => {
    if (!blink) return
    const timer = window.setTimeout(() => setBlink(false), 150)
    return () => window.clearTimeout(timer)
  }, [blink])

  const label = state === 'listening' ? 'is listening' : state === 'speaking' ? 'is responding' : ''

  return <div className={`ward-orb ${small ? 'ward-orb-small' : ''} ward-state-${state} ${blink ? 'ward-blinking' : ''} ${mood ? `ward-mood-${mood.toLowerCase()}` : ''}`} aria-label={`Ward ${label}`} aria-live="polite"><div className="ward-halo" /><div className="ward-spark-one" /><div className="ward-spark-two" /><div className="ward-body"><div className="ward-face"><span className="ward-eye" /><span className="ward-eye" /><span className="ward-smile" /></div></div></div>
}
