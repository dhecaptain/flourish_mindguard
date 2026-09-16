'use client'

import { useState, useEffect } from 'react'
import { ShieldCheck, Phone, Heart, MapPin, AlertCircle, Save, X } from 'lucide-react'

export function SafetyPlanDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedNote, setSavedNote] = useState(false)
  const [formData, setFormData] = useState({
    emergencyContacts: '',
    copingStrategies: '',
    safePlaces: '',
    warningSigns: '',
  })

  useEffect(() => {
    if (!isOpen) return
    setLoading(true)
    fetch('/api/safety-plan')
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          emergencyContacts: data.emergencyContacts || '',
          copingStrategies: data.copingStrategies || '',
          safePlaces: data.safePlaces || '',
          warningSigns: data.warningSigns || '',
        })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [isOpen])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await fetch('/api/safety-plan', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setSavedNote(true)
      setTimeout(() => setSavedNote(false), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="chat-overlay" style={{ zIndex: 50 }}>
      <div className="chat-panel" style={{ width: 'min(500px, 100%)', overflowY: 'auto' }}>
        <div className="chat-header">
          <div className="chat-title">
            <ShieldCheck size={20} style={{ color: '#527b61', marginRight: '8px' }} />
            <div>
              <span>SAFETY & SUPPORT</span>
              <h2>Crisis Support & Personal Plan</h2>
            </div>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close safety drawer">
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Urgent Hotline Card */}
          <div className="crisis-card" style={{ padding: '20px', minHeight: 'auto', borderRadius: '16px' }}>
            <Phone size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <span className="section-kicker" style={{ color: '#876b55' }}>IMMEDIATE HUMAN HELP</span>
              <h3 style={{ font: '600 18px Georgia, serif', color: '#684a36', margin: '4px 0' }}>
                988 Suicide & Crisis Lifeline
              </h3>
              <p style={{ fontSize: '12px', color: '#876b55', lineHeight: 1.5 }}>
                Available 24 hours a day, 7 days a week in the U.S. Call or text <strong>988</strong>.
              </p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a className="outline-button" style={{ marginTop: 0, padding: '6px 12px', fontSize: '11px' }} href="tel:988">
                  Call 988
                </a>
                <a className="outline-button" style={{ marginTop: 0, padding: '6px 12px', fontSize: '11px' }} href="https://988lifeline.org/" target="_blank" rel="noreferrer">
                  Lifeline Web Chat
                </a>
              </div>
            </div>
          </div>

          {/* Personal Safety Plan Form */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ font: '600 20px Georgia, serif', color: '#355542', margin: 0 }}>
                My Personal Safety Plan
              </h3>
              <p style={{ fontSize: '12px', color: '#748078', margin: '4px 0 0' }}>
                Keep your coping strategies and trusted contacts stored privately for moments of difficulty.
              </p>
            </div>

            {loading ? (
              <p style={{ fontSize: '12px', color: '#748078' }}>Loading your plan...</p>
            ) : (
              <form className="auth-form" onSubmit={handleSave} style={{ gap: '16px' }}>
                <label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={13} /> Trusted Emergency Contacts
                  </div>
                  <textarea
                    value={formData.emergencyContacts}
                    onChange={(e) => setFormData({ ...formData, emergencyContacts: e.target.value })}
                    placeholder="e.g. Sarah (555-0192), Dr. Miller (555-0144)..."
                    style={{ minHeight: '60px' }}
                  />
                </label>

                <label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Heart size={13} /> Personal Coping Strategies
                  </div>
                  <textarea
                    value={formData.copingStrategies}
                    onChange={(e) => setFormData({ ...formData, copingStrategies: e.target.value })}
                    placeholder="e.g. 5-minute cold shower, box breathing, listening to quiet piano..."
                    style={{ minHeight: '60px' }}
                  />
                </label>

                <label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} /> Safe Places & Environments
                  </div>
                  <textarea
                    value={formData.safePlaces}
                    onChange={(e) => setFormData({ ...formData, safePlaces: e.target.value })}
                    placeholder="e.g. City park bench, local library, living room chair..."
                    style={{ minHeight: '60px' }}
                  />
                </label>

                <label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertCircle size={13} /> Personal Warning Signs
                  </div>
                  <textarea
                    value={formData.warningSigns}
                    onChange={(e) => setFormData({ ...formData, warningSigns: e.target.value })}
                    placeholder="e.g. Pacing back and forth, feeling heavy in chest, isolating..."
                    style={{ minHeight: '60px' }}
                  />
                </label>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  {savedNote ? (
                    <span style={{ fontSize: '12px', color: '#527b61', fontWeight: 600 }}>Plan saved safely.</span>
                  ) : <span />}
                  <button className="primary-button" style={{ marginTop: 0 }} type="submit" disabled={saving}>
                    <Save size={14} /> {saving ? 'Saving...' : 'Save Plan'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
