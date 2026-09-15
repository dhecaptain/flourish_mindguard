import { BookOpen, Home, Search, Sparkles, UserRound } from 'lucide-react'
import type { View } from './dashboard-types'

export function DashboardSidebar({ active, onChange, name }: { active: View; onChange: (view: View) => void; name: string }) {
  const items = [{ label: 'Today', icon: Home }, { label: 'Explore', icon: Search }, { label: 'Journal', icon: BookOpen }, { label: 'Insights', icon: Sparkles }]
  return <aside className="side-nav"><div className="brand-mark"><span>m</span></div><p className="brand-name">mindguard</p><nav className="nav-links" aria-label="Primary navigation">{items.map(({ label, icon: Icon }) => <button className={active === label ? 'nav-link active' : 'nav-link'} key={label} onClick={() => onChange(label as View)}><Icon aria-hidden="true" /><span>{label}</span></button>)}<button className={active === 'Support' ? 'nav-link active' : 'nav-link'} onClick={() => onChange('Support')}><span>Support</span></button><button className={active === 'Profile' ? 'nav-link active' : 'nav-link'} onClick={() => onChange('Profile')}><span>{name}</span></button></nav></aside>
}
