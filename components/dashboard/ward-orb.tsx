export function WardOrb({ small = false }: { small?: boolean }) {
  return <div className={`ward-orb ${small ? 'ward-orb-small' : ''}`} aria-label="Ward"><div className="ward-halo" /><div className="ward-body"><div className="ward-face"><span className="ward-eye" /><span className="ward-eye" /><span className="ward-smile" /></div></div></div>
}
