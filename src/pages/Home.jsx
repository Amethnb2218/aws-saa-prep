import { Link } from 'react-router-dom'
import { Layers, Shield, Server, DollarSign, Clock, Target, GraduationCap } from 'lucide-react'

export default function Home() {
  const domains = [
    { icon: Layers, title: 'Design Secure Architectures', pct: 30, questions: '~20 questions', color: '#f44336' },
    { icon: Server, title: 'Design Resilient Architectures', pct: 26, questions: '~17 questions', color: '#2196f3' },
    { icon: Shield, title: 'Design High-Performing Architectures', pct: 24, questions: '~16 questions', color: '#4caf50' },
    { icon: DollarSign, title: 'Design Cost-Optimized Architectures', pct: 20, questions: '~13 questions', color: '#ff9900' },
  ]

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,153,0,0.1), rgba(33,150,243,0.05))',
        borderRadius: '20px', padding: '3rem', marginBottom: '2rem',
        border: '1px solid rgba(255,153,0,0.2)'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          AWS Solutions Architect <span style={{ color: '#ff9900' }}>SAA-C03</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Intensive Preparation — Target: <strong style={{ color: '#ff9900' }}>August 27, 2026</strong>
        </p>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="#ff9900" />
            <span style={{ color: 'var(--text-secondary)' }}>130 minutes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={18} color="#ff9900" />
            <span style={{ color: 'var(--text-secondary)' }}>65 questions</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GraduationCap size={18} color="#ff9900" />
            <span style={{ color: 'var(--text-secondary)' }}>Passing score: 720/1000</span>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>The 4 Domains</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {domains.map((d, i) => (
          <Link to="/domains" key={i}>
            <div style={{
              background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem',
              border: `1px solid ${d.color}33`, transition: 'all 0.3s', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${d.color}11`; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.transform = 'none' }}
            >
              <d.icon size={28} color={d.color} />
              <div style={{ fontSize: '2rem', fontWeight: 800, color: d.color, margin: '0.5rem 0' }}>{d.pct}%</div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{d.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{d.questions}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <Link to="/exam">
          <button style={{
            background: 'linear-gradient(135deg, #ff9900, #ec7211)', color: '#0f1b2d',
            border: 'none', padding: '1rem 3rem', borderRadius: '12px',
            fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(255,153,0,0.3)'
          }}>
            Start Practice Exam (65 Questions - 130 min)
          </button>
        </Link>
        <Link to="/plan">
          <button style={{
            background: 'linear-gradient(135deg, #2196f3, #1976d2)', color: 'white',
            border: 'none', padding: '1rem 3rem', borderRadius: '12px',
            fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(33,150,243,0.3)'
          }}>
            View 6-Week Study Plan
          </button>
        </Link>
      </div>
    </div>
  )
}
