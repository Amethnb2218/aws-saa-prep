import { useState, useMemo } from 'react'
import { allQuestions as questions, shuffleArray } from '../data/allQuestions'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'

export default function Quiz() {
  const [domain, setDomain] = useState(0)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const filteredQuestions = useMemo(() => {
    const qs = domain === 0 ? questions : questions.filter(q => q.domain === domain)
    return shuffleArray(qs)
  }, [domain])

  const q = filteredQuestions[current]

  const handleSelect = (idx) => {
    if (showAnswer) return
    setSelected(idx)
    setShowAnswer(true)
    setScore(prev => ({
      correct: prev.correct + (idx === q.correct ? 1 : 0),
      total: prev.total + 1
    }))
  }

  const next = () => {
    setSelected(null)
    setShowAnswer(false)
    setCurrent(prev => (prev + 1) % filteredQuestions.length)
  }

  const reset = () => {
    setCurrent(0)
    setSelected(null)
    setShowAnswer(false)
    setScore({ correct: 0, total: 0 })
  }

  if (!q) return <p>No questions available for this domain.</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Practice Quiz</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Score: <strong style={{ color: score.total > 0 && score.correct / score.total >= 0.7 ? '#4caf50' : '#ff9900' }}>
              {score.correct}/{score.total}
            </strong>
            {score.total > 0 && ` (${Math.round(score.correct / score.total * 100)}%)`}
          </span>
          <button onClick={reset} style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.8rem',
            borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem'
          }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 0, label: 'All Domains' },
          { id: 1, label: 'D1: Secure' },
          { id: 2, label: 'D2: Resilient' },
          { id: 3, label: 'D3: High-Performing' },
          { id: 4, label: 'D4: Cost-Optimized' },
        ].map(d => (
          <button key={d.id} onClick={() => { setDomain(d.id); reset() }} style={{
            padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)',
            background: domain === d.id ? 'rgba(255,153,0,0.2)' : 'transparent',
            color: domain === d.id ? '#ff9900' : 'var(--text-secondary)',
            fontWeight: domain === d.id ? 700 : 400, cursor: 'pointer', fontSize: '0.85rem'
          }}>{d.label}</button>
        ))}
      </div>

      <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '2rem', border: '1px solid var(--border)' }}>
        <div style={{ fontSize: '0.85rem', color: '#ff9900', marginBottom: '1rem', fontWeight: 600 }}>
          Question {current + 1} / {filteredQuestions.length} — Domain {q.domain}
        </div>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>{q.q}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {q.opts.map((opt, i) => {
            let bg = 'transparent'
            let border = 'var(--border)'
            let icon = null

            if (showAnswer) {
              if (i === q.correct) { bg = 'rgba(76,175,80,0.1)'; border = '#4caf50'; icon = <CheckCircle size={18} color="#4caf50" /> }
              else if (i === selected && i !== q.correct) { bg = 'rgba(244,67,54,0.1)'; border = '#f44336'; icon = <XCircle size={18} color="#f44336" /> }
            } else if (i === selected) {
              bg = 'rgba(255,153,0,0.1)'; border = '#ff9900'
            }

            return (
              <div key={i} onClick={() => handleSelect(i)} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                padding: '1rem', borderRadius: '10px', cursor: showAnswer ? 'default' : 'pointer',
                border: `2px solid ${border}`, background: bg, transition: 'all 0.2s'
              }}>
                <span style={{ fontWeight: 700, color: 'var(--text-secondary)', minWidth: '24px' }}>{String.fromCharCode(65 + i)}.</span>
                <span style={{ flex: 1, color: 'var(--text-primary)', lineHeight: 1.6 }}>{opt}</span>
                {icon}
              </div>
            )
          })}
        </div>

        {showAnswer && (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ background: 'rgba(255,153,0,0.1)', borderRadius: '10px', padding: '1rem', border: '1px solid rgba(255,153,0,0.3)' }}>
              <p style={{ color: '#ff9900', fontSize: '0.9rem', lineHeight: 1.7 }}>
                <strong>Explanation:</strong> {q.exp}
              </p>
            </div>
            <button onClick={next} style={{
              marginTop: '1rem', padding: '0.75rem 2rem', borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff9900, #ec7211)', color: '#0f1b2d',
              border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '1rem'
            }}>
              Next Question →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
