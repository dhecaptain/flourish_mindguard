'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, RefreshCw } from 'lucide-react'

type ActivityItem = {
  id: string
  title: string
  category: string
  description: string
  instructions: string
  estDuration: number
}

export default function AdminActivitiesPage() {
  const [items, setItems] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ActivityItem | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    category: 'Breathe',
    description: '',
    instructions: '',
    estDuration: 5,
  })

  const loadActivities = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/activities')
      if (res.ok) {
        const data = await res.json()
        setItems(data.items || [])
      }
    } catch (e) {
      console.error('Failed to load activities:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadActivities()
  }, [])

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      category: 'Breathe',
      description: '',
      instructions: '',
      estDuration: 5,
    })
    setIsModalOpen(true)
  }

  const openEditModal = (item: ActivityItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      instructions: item.instructions,
      estDuration: item.estDuration,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      // Edit
      const res = await fetch('/api/admin/activities', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingItem.id, ...formData }),
      })
      if (res.ok) {
        setIsModalOpen(false)
        loadActivities()
      }
    } else {
      // Create
      const res = await fetch('/api/admin/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsModalOpen(false)
        loadActivities()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return
    const res = await fetch(`/api/admin/activities?id=${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      loadActivities()
    }
  }

  return (
    <div className="page-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Activities Management</p>
          <h1>Explore Library<span className="sun-dot">.</span></h1>
          <p className="intro">
            Create, update, and manage guided wellness practices.
          </p>
        </div>
        <button className="primary-button" style={{ marginTop: 0 }} onClick={openCreateModal}>
          <Plus aria-hidden="true" /> Add Activity
        </button>
      </div>

      <section className="surface entry-list">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e3eae0', color: '#748078' }}>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Category</th>
              <th style={{ padding: '12px' }}>Duration</th>
              <th style={{ padding: '12px' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && items.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#748078' }}>
                  Loading activities...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#748078' }}>
                  No activities in library yet.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eef1eb' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{item.title}</td>
                  <td style={{ padding: '12px' }}>
                    <span className="mood-badge">{item.category}</span>
                  </td>
                  <td style={{ padding: '12px', color: '#748078' }}>{item.estDuration} min</td>
                  <td style={{ padding: '12px', color: '#52675a', maxWidth: '300px' }}>
                    {item.description}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        className="outline-button"
                        style={{ marginTop: 0, padding: '4px 8px', fontSize: '11px' }}
                        onClick={() => openEditModal(item)}
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        className="danger-button"
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {isModalOpen && (
        <div className="chat-overlay" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div className="surface" style={{ width: 'min(500px, 90vw)', padding: '24px', position: 'relative' }}>
            <div className="composer-heading" style={{ marginBottom: '16px' }}>
              <h2>{editingItem ? 'Edit Activity' : 'New Activity'}</h2>
              <button className="icon-button" onClick={() => setIsModalOpen(false)}>
                <X aria-hidden="true" />
              </button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label>
                Title
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </label>

              <label>
                Category
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: '100%',
                    border: '1px solid #dfe8dc',
                    borderRadius: '10px',
                    padding: '12px 13px',
                    background: '#fff',
                    color: '#294536',
                    fontSize: '13px',
                  }}
                >
                  <option value="Breathe">Breathe</option>
                  <option value="Reflect">Reflect</option>
                  <option value="Move">Move</option>
                  <option value="Rest">Rest</option>
                </select>
              </label>

              <label>
                Duration (minutes)
                <input
                  type="number"
                  value={formData.estDuration}
                  onChange={(e) => setFormData({ ...formData, estDuration: Number(e.target.value) })}
                  min={1}
                  required
                />
              </label>

              <label>
                Description
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    minHeight: '60px',
                    border: '1px solid #dfe8dc',
                    borderRadius: '10px',
                    padding: '12px 13px',
                    background: '#fff',
                    color: '#294536',
                    fontSize: '13px',
                  }}
                  required
                />
              </label>

              <label>
                Instructions
                <textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    border: '1px solid #dfe8dc',
                    borderRadius: '10px',
                    padding: '12px 13px',
                    background: '#fff',
                    color: '#294536',
                    fontSize: '13px',
                  }}
                  required
                />
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" className="outline-button" style={{ marginTop: 0 }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-button" style={{ marginTop: 0 }}>
                  {editingItem ? 'Save Changes' : 'Create Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
