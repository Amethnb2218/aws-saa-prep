import { useState, useEffect } from 'react'
import { Trophy, Target, TrendingUp, Clock, BarChart3 } from 'lucide-react'

export default function Progress() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('saa-exam-history')
    return saved ? JSON.parse(saved) : []
  })

  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem('saa-quiz-history')
    return saved ? JSON.parse(saved) : []
  })

  const avgScore = history.length > 0
    ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length)
    : 0

  const bestScore = history.length > 0
    ? Math.max(...history.map(h => h.score))
    : 0

  const totalQuestions = history.reduce((acc, h) => acc + h.totalQuestions, 0)
  const totalCorrect = history.reduce((acc, h) => acc + h.correct, 0)

  const domainScores = [1, 2, 3, 4].map(d => {
    const domainData = history.flatMap(h => h.domains ? h.domains.filter(dd => dd.id === d) : [])
    if (domainData.length === 0) return { id: d, avg: 0 }
    const avg = Math.round(domainData.reduce((acc, dd) => acc + dd.pct, 0) / domainData.length)
    return { id: d, avg }
  })

  const domainNames = ['Design Secure Architectures', 'Design Resilient Architectures', 'Design High-Performing Architectures', 'Design Cost-Optimized Architectures']
  const domainColors = ['#f44336', '#2196f3', '#4caf50', '#ff9900']

  const readyForExam = avgScore >= 80 && history.length >= 3

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        <BarChart3 size={28} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="#ff9900" />
        Your Progress
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Track your exam readiness. Target: 80%+ consistently before booking the real exam.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border)', textAlign: 'center' }}>
          <Trophy size={24} color="#ff9900" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: avgScore >= 72 ? '#4caf50' : '#f44336' }}>{avgScore}%</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Average Score</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border)', textAlign: 'center' }}>
          <Target size={24} color="#4caf50" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#4caf50' }}>{bestScore}%</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Best Score</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border)', textAlign: 'center' }}>
          <TrendingUp size={24} color="#2196f3" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2196f3' }}>{history.length}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Exams Taken</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border)', textAlign: 'center' }}>
          <Clock size={24} color="#9c27b0" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#9c27b0' }}>{totalQuestions}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Questions Answered</div>
        </div>
      </div>

      <div style={{
        background: readyForExam ? 'rgba(76,175,80,0.1)' : 'rgba(255,153,0,0.1)',
        borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem',
        border: `1px solid ${readyForExam ? 'rgba(76,175,80,0.3)' : 'rgba(255,153,0,0.3)'}`
      }}>
        <h3 style={{ color: readyForExam ? '#4caf50' : '#ff9900', marginBottom: '0.5rem' }}>
          {readyForExam ? 'YOU ARE READY! Book your exam!' : 'Keep practicing...'}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {readyForExam
            ? 'You\'re consistently scoring above 80% across multiple exams. You\'re ready to pass the SAA-C03!'
            : `Criteria: Score 80%+ on at least 3 practice exams. Current: ${avgScore}% avg across ${history.length} exam(s).`
          }
        </p>
        <div style={{ marginTop: '1rem', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.min(100, (avgScore / 80) * 100)}%`, background: readyForExam ? '#4caf50' : '#ff9900', borderRadius: '4px' }}></div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>Performance by Domain</h2>
      <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
        {domainScores.map((d, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '1rem 1.25rem', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem' }}>Domain {d.id}: {domainNames[i]}</span>
              <span style={{ fontWeight: 700, color: d.avg >= 72 ? '#4caf50' : d.avg > 0 ? '#f44336' : 'var(--text-secondary)' }}>{d.avg}%</span>
            </div>
            <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${d.avg}%`, background: domainColors[i], borderRadius: '3px', transition: 'width 0.5s' }}></div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>Exam History</h2>
      {history.length === 0 ? (
        <div style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '2rem', textAlign: 'center', border: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No practice exams taken yet. Go to Exam Mode to start!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {history.map((h, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', borderRadius: '10px', padding: '1rem 1.25rem',
              border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <span style={{ fontWeight: 600 }}>Exam #{i + 1}</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '1rem', fontSize: '0.85rem' }}>{h.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{h.correct}/{h.totalQuestions}</span>
                <span style={{ fontWeight: 700, color: h.score >= 72 ? '#4caf50' : '#f44336', fontSize: '1.1rem' }}>{h.score}%</span>
                <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '6px', background: h.score >= 72 ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.2)', color: h.score >= 72 ? '#4caf50' : '#f44336' }}>
                  {h.score >= 72 ? 'PASS' : 'FAIL'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '2rem', background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border)' }}>
        <h3 style={{ color: '#ff9900', marginBottom: '0.75rem' }}>Study Strategy Based on Your Scores:</h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 2.2, paddingLeft: '1.25rem' }}>
          <li><strong style={{ color: 'var(--text-primary)' }}>Below 60%:</strong> Go back to course material for weak domains. Don't rush practice exams.</li>
          <li><strong style={{ color: 'var(--text-primary)' }}>60-72%:</strong> Focus on Traps page + Flashcards for commonly confused topics. Review wrong answers carefully.</li>
          <li><strong style={{ color: 'var(--text-primary)' }}>72-80%:</strong> Good progress! Fine-tune weak domains. Pay attention to question wording tricks.</li>
          <li><strong style={{ color: 'var(--text-primary)' }}>80%+:</strong> You're exam-ready! Take 2-3 more exams to confirm consistency, then book the real one.</li>
        </ul>
      </div>
    </div>
  )
}
