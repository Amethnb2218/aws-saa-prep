import { Outlet, NavLink } from 'react-router-dom'
import { Home, Layers, Server, HelpCircle, AlertTriangle, BookOpen, Calendar, Languages, Compass, FlaskConical, BarChart3, FileText, Trophy, Map } from 'lucide-react'

export default function Layout() {
  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/plan', icon: Calendar, label: '6-Week Plan' },
    { to: '/domains', icon: Layers, label: 'Domains' },
    { to: '/services', icon: Server, label: 'Services' },
    { to: '/well-architected', icon: Compass, label: 'Well-Architected' },
    { to: '/vocabulary', icon: Languages, label: 'English Vocab' },
    { to: '/labs', icon: FlaskConical, label: 'Labs & Scenarios' },
    { to: '/architectures', icon: Map, label: 'Architecture Diagrams' },
    { to: '/cheatsheet', icon: FileText, label: 'Cheat Sheet' },
    { to: '/quiz', icon: HelpCircle, label: 'Quiz' },
    { to: '/traps', icon: AlertTriangle, label: 'Traps' },
    { to: '/flashcards', icon: BookOpen, label: 'Flashcards' },
    { to: '/progress', icon: BarChart3, label: 'Progress' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{
        width: '240px', background: 'linear-gradient(180deg, #131f33 0%, #0f1b2d 100%)', borderRight: '1px solid var(--border)',
        padding: '1.5rem 1rem', position: 'fixed', height: '100vh', overflowY: 'auto',
        boxShadow: '4px 0 20px rgba(0,0,0,0.3)'
      }}>
        <div style={{ marginBottom: '2rem', padding: '0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/aws-logo.svg" alt="AWS" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ff9900', letterSpacing: '-0.5px' }}>SAA-C03</h1>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', lineHeight: 1.2 }}>Solutions Architect Associate</p>
          </div>
        </div>
        <div style={{ borderBottom: '1px solid var(--border)', marginBottom: '1rem', paddingBottom: '0.5rem' }}>
          <NavLink to="/exam" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.75rem 1rem', borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(255,153,0,0.15), rgba(255,153,0,0.05))',
            border: '1px solid rgba(255,153,0,0.3)',
            color: '#ff9900', fontWeight: 700, fontSize: '0.85rem'
          }}>
            <Trophy size={18} />
            Practice Exam
          </NavLink>
        </div>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.65rem 1rem', borderRadius: '10px', marginBottom: '0.15rem',
            color: isActive ? '#ff9900' : 'var(--text-secondary)',
            background: isActive ? 'rgba(255,153,0,0.1)' : 'transparent',
            fontWeight: isActive ? 600 : 400, fontSize: '0.85rem',
            transition: 'all 0.2s'
          })}>
            <l.icon size={16} />
            {l.label}
          </NavLink>
        ))}
        <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '12px', background: 'rgba(255,153,0,0.05)', border: '1px solid rgba(255,153,0,0.15)' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            <strong style={{ color: '#ff9900' }}>1000+ Questions</strong><br/>
            15 Full Exams • Offline Ready
          </p>
        </div>
      </nav>
      <main style={{ marginLeft: '240px', flex: 1, padding: '2.5rem 3rem', maxWidth: '1100px' }}>
        <Outlet />
      </main>
    </div>
  )
}
