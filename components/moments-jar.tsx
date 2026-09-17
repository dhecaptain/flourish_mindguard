'use client'

import { useState } from 'react'

type JarItem = { type: 'mood' | 'journal' | 'activity'; mood?: string; category?: string; createdAt: string; context?: string }

export function MomentsJar({ items, total = items.length }: { items: JarItem[]; total?: number }) {
  const [open, setOpen] = useState(false)
  const visible = items.slice(-20)
  const full = total >= 20
  return <>
    <button className={`moments-jar ${full ? 'moments-jar-full' : ''}`} onClick={() => setOpen(true)} aria-label="Open moments jar">
      <svg viewBox="0 0 160 200" aria-hidden="true"><path className="jar-outline" d="M45 20h70M51 20v21c0 7-19 17-19 39v75c0 19 15 28 48 28s48-9 48-28V80c0-22-19-32-19-39V20" /><path className="jar-glow" d="M38 133c21 14 63 14 84 0v22c0 13-14 20-42 20s-42-7-42-20z" />{visible.map((item, index) => <circle key={`${item.createdAt}-${index}`} className="jar-mote" cx={48 + ((index * 29) % 64)} cy={164 - ((index * 17) % 72)} r={index % 3 === 0 ? 5 : 4} style={{ animationDelay: `${index * 80}ms` }} />)}</svg>
      <span className="jar-caption" aria-live="polite">{total < 3 ? 'Your jar is just getting started.' : full ? 'A jar full of you showing up.' : `${total} moments and counting.`}</span>
    </button>
    {open && <div className="jar-history-backdrop" onClick={() => setOpen(false)}><section className="jar-history" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><div className="section-heading"><div><span className="section-kicker">YOUR MOMENTS</span><h2>A little history</h2></div><button className="icon-button" aria-label="Close moments history" onClick={() => setOpen(false)}>×</button></div>{items.length === 0 ? <p className="empty-state">Your first moment can begin today.</p> : items.slice().reverse().map((item, index) => <div className="jar-history-item" key={`${item.createdAt}-${index}`}><span className={`jar-history-dot jar-${item.type}`} /><div><strong>{item.context || item.mood || item.category || 'A moment'}</strong><small>{new Date(item.createdAt).toLocaleDateString()}</small></div></div>)}</section></div>}
  </>
}
