import { Outlet, NavLink } from 'react-router-dom'
import { Home, Layers, Server, HelpCircle, AlertTriangle, BookOpen, Calendar, Languages, Compass, FlaskConical, BarChart3, FileText, Trophy } from 'lucide-react'

export default function Layout() {
  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/plan', icon: Calendar, label: '6-Week Plan' },
    { to: '/domains', icon: Layers, label: 'Domains' },
    { to: '/services', icon: Server, label: 'Services' },
    { to: '/well-architected', icon: Compass, label: 'Well-Architected' },
    { to: '/vocabulary', icon: Languages, label: 'English Vocab' },
    { to: '/labs', icon: FlaskConical, label: 'Labs & Scenarios' },
    { to: '/cheatsheet', icon: FileText, label: 'Cheat Sheet' },
    { to: '/quiz', icon: HelpCircle, label: 'Quiz' },
    { to: '/traps', icon: AlertTriangle, label: 'Traps' },
    { to: '/flashcards', icon: BookOpen, label: 'Flashcards' },
    { to: '/progress', icon: BarChart3, label: 'Progress' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{
        width: '220px', background: 'var(--bg-card)', borderRight: '1px solid var(--border)',
        padding: '1.5rem 1rem', position: 'fixed', height: '100vh', overflowY: 'auto'
      }}>
        <div style={{ marginBottom: '2rem', padding: '0 0.5rem' }}>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ff9900' }}>SAA-C03</h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Solutions Architect Associate</p>
        </div>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '0.25rem',
            color: isActive ? '#ff9900' : 'var(--text-secondary)',
            background: isActive ? 'rgba(255,153,0,0.1)' : 'transparent',
            fontWeight: isActive ? 600 : 400, fontSize: '0.9rem',
            transition: 'all 0.2s'
          })}>
            <l.icon size={18} />
            {l.label}
          </NavLink>
        ))}
      </nav>
      <main style={{ marginLeft: '220px', flex: 1, padding: '2rem', maxWidth: '1000px' }}>
        <Outlet />
      </main>
    </div>
  )
}
