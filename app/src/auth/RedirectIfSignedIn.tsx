import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './useAuth'

export default function RedirectIfSignedIn() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="auth-loading" role="status" aria-live="polite">
        <div className="app-atmosphere" aria-hidden="true">
          <div className="app-orb app-orb-a" />
          <div className="app-orb app-orb-b" />
          <div className="app-grain" />
        </div>
        <p>Loading…</p>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
