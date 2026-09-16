'use client'

import { useState, useEffect } from 'react'
import { authClient } from '@/lib/auth-client'
import { Search, ShieldAlert, CheckCircle, Ban, RefreshCw } from 'lucide-react'

type UserRecord = {
  id: string
  name: string
  email: string
  role?: string | null
  banned?: boolean | null
  banReason?: string | null
  banExpires?: string | number | null
  createdAt: string | Date
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [banningId, setBanningId] = useState<string | null>(null)

  const loadUsers = async () => {
    setLoading(true)
    try {
      const res = await authClient.admin.listUsers({
        query: {
          limit: 100,
        },
      })
      if (res.data?.users) {
        setUsers(res.data.users as UserRecord[])
      }
    } catch (e) {
      console.error('Failed to load users:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const filteredUsers = users.filter((u) => {
    const q = query.toLowerCase()
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q))
    )
  })

  const handleBan = async (userId: string) => {
    setBanningId(userId)
    try {
      await authClient.admin.banUser({
        userId,
        banReason: 'Administrative action',
      })
      await loadUsers()
    } catch (e) {
      console.error('Failed to ban user:', e)
    } finally {
      setBanningId(null)
    }
  }

  const handleUnban = async (userId: string) => {
    setBanningId(userId)
    try {
      await authClient.admin.unbanUser({
        userId,
      })
      await loadUsers()
    } catch (e) {
      console.error('Failed to unban user:', e)
    } finally {
      setBanningId(null)
    }
  }

  return (
    <div className="page-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">User Management</p>
          <h1>Accounts<span className="sun-dot">.</span></h1>
          <p className="intro">
            View platform user accounts and manage access permissions.
          </p>
        </div>
        <button className="outline-button" onClick={loadUsers} disabled={loading}>
          <RefreshCw aria-hidden="true" className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="library-toolbar">
        <label className="search-field" style={{ maxWidth: '350px' }}>
          <Search aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email..."
          />
        </label>
      </div>

      <section className="surface entry-list" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e3eae0', color: '#748078' }}>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>Joined</th>
              <th style={{ padding: '12px' }}>Role</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && users.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#748078' }}>
                  Loading users...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#748078' }}>
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #eef1eb' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{u.name || 'N/A'}</td>
                  <td style={{ padding: '12px', color: '#52675a' }}>{u.email}</td>
                  <td style={{ padding: '12px', color: '#748078' }}>
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        background: u.role === 'admin' ? '#edf3eb' : '#eef1eb',
                        color: u.role === 'admin' ? '#3f6553' : '#748078',
                        fontWeight: u.role === 'admin' ? 'bold' : 'normal',
                      }}
                    >
                      {u.role || 'user'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    {u.banned ? (
                      <span style={{ color: '#b45151', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <ShieldAlert size={14} /> Banned
                      </span>
                    ) : (
                      <span style={{ color: '#3f6553', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={14} /> Active
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    {u.role !== 'admin' && (
                      u.banned ? (
                        <button
                          className="outline-button"
                          style={{ marginTop: 0, padding: '4px 10px', fontSize: '11px' }}
                          disabled={banningId === u.id}
                          onClick={() => handleUnban(u.id)}
                        >
                          Unban
                        </button>
                      ) : (
                        <button
                          className="danger-button"
                          style={{ padding: '4px 10px', fontSize: '11px' }}
                          disabled={banningId === u.id}
                          onClick={() => handleBan(u.id)}
                        >
                          <Ban size={12} style={{ display: 'inline', marginRight: '4px' }} />
                          Ban
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  )
}
