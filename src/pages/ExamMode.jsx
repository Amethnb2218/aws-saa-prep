import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { allQuestions, shuffleArray } from '../data/allQuestions'
import { Shield, Clock, ChevronLeft, ChevronRight, Flag, RotateCcw } from 'lucide-react'

function prepareQuestion(q) {
  const indices = q.opts.map((_, i) => i)
  const shuffledIndices = shuffleArray(indices)
  const newOpts = shuffledIndices.map(i => q.opts[i])
  const newCorrect = shuffledIndices.indexOf(q.correct)
  return { ...q, opts: newOpts, correct: newCorrect }
}

function generateExam() {
  return shuffleArray(allQuestions).slice(0, 65).map(prepareQuestion)
}

export default function ExamMode() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flagged, setFlagged] = useState({})
  const [timeLeft, setTimeLeft] = useState(130 * 60)
  const [submitted, setSubmitted] = useState(false)
  const [examSeed, setExamSeed] = useState(0)
  const [showReview, setShowReview] = useState(false)

  const examQuestions = useMemo(() => generateExam(), [examSeed])
  const totalQ = examQuestions.length

  useEffect(() => {
    if (!started || submitted) return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(interval); setSubmitted(true); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [started, submitted])

  const startExam = () => setStarted(true)

  const restartExam = () => {
    setExamSeed(s => s + 1)
    setStarted(false)
    setCurrentQ(0)
    setAnswers({})
    setFlagged({})
    setTimeLeft(130 * 60)
    setSubmitted(false)
    setShowReview(false)
  }

  const selectAnswer = (idx) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [currentQ]: idx }))
  }

  const isAnswered = (i) => answers[i] !== undefined
  const isCorrect = (i) => answers[i] === examQuestions[i].correct
  const answeredCount = examQuestions.filter((_, i) => isAnswered(i)).length
  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  if (!started) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--aws-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Shield size={64} color="#ff9900" />
            <h1 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginTop: '1rem' }}>Practice Exam Mode</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>AWS Solutions Architect Associate SAA-C03</p>
          </div>
          <div style={{ background: 'var(--bg-card-hover)', borderRadius: '16px', padding: '2rem', border: '1px solid var(--border)' }}>
            <h3 style={{ color: '#ff9900', marginBottom: '1rem' }}>Exam Conditions:</h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 2.2, listStyle: 'none', padding: 0 }}>
              <li>⏱ Duration: <strong style={{ color: 'white' }}>130 minutes</strong></li>
              <li>📝 Questions: <strong style={{ color: 'white' }}>65 questions (randomized each session)</strong></li>
              <li>✅ Passing score: <strong style={{ color: 'white' }}>720/1000 (~72%)</strong></li>
              <li>📋 All questions are scenario-based</li>
              <li>🔀 Answer positions are shuffled</li>
              <li>🚩 Flag questions to review later</li>
            </ul>
          </div>
          <button onClick={startExam} style={{
            width: '100%', marginTop: '1.5rem', padding: '1.25rem',
            background: 'linear-gradient(135deg, #ff9900, #ec7211)', color: '#0f1b2d',
            border: 'none', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer'
          }}>Start Exam</button>
          <button onClick={() => navigate('/')} style={{
            width: '100%', marginTop: '0.75rem', padding: '1rem',
            background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)',
            borderRadius: '12px', fontSize: '1rem', cursor: 'pointer'
          }}>Back to Home</button>
        </div>
      </div>
    )
  }

  if (submitted) {
    const score = examQuestions.filter((_, i) => isCorrect(i)).length
    const percent = Math.round((score / totalQ) * 100)
    const scaledScore = Math.round((score / totalQ) * 1000)
    const passed = scaledScore >= 720

    return (
      <div style={{ minHeight: '100vh', background: 'var(--aws-dark)', padding: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center', padding: '3rem', borderRadius: '20px',
            background: passed ? 'linear-gradient(135deg, rgba(76,175,80,0.1), rgba(0,230,118,0.05))' : 'linear-gradient(135deg, rgba(244,67,54,0.1), rgba(255,82,82,0.05))',
            border: `1px solid ${passed ? 'rgba(76,175,80,0.3)' : 'rgba(244,67,54,0.3)'}`
          }}>
            <div style={{ fontSize: '4rem', fontWeight: 900, color: passed ? '#4caf50' : '#f44336' }}>{scaledScore}/1000</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>{passed ? 'PASSED! CONGRATULATIONS!' : 'Keep studying...'}</div>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{score}/{totalQ} correct ({percent}%) | Time used: {formatTime(130 * 60 - timeLeft)} | Passing: 720/1000</p>
          </div>

          <div style={{ marginTop: '2rem', background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Performance by Domain:</h3>
            {[
              { id: 1, name: 'Design Secure Architectures', weight: '30%' },
              { id: 2, name: 'Design Resilient Architectures', weight: '26%' },
              { id: 3, name: 'Design High-Performing Architectures', weight: '24%' },
              { id: 4, name: 'Design Cost-Optimized Architectures', weight: '20%' }
            ].map(d => {
              const domainQs = examQuestions.map((q, i) => ({ q, i })).filter(x => x.q.domain === d.id)
              const domainCorrect = domainQs.filter(x => isCorrect(x.i)).length
              const domainTotal = domainQs.length
              const domainPct = domainTotal > 0 ? Math.round((domainCorrect / domainTotal) * 100) : 0
              return (
                <div key={d.id} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{d.name} ({d.weight})</span>
                    <span style={{ color: domainPct >= 72 ? '#4caf50' : '#f44336', fontWeight: 600 }}>{domainCorrect}/{domainTotal} ({domainPct}%)</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${domainPct}%`, background: domainPct >= 72 ? '#4caf50' : '#f44336', borderRadius: '3px' }}></div>
                  </div>
                </div>
              )
            })}
          </div>

          <h3 style={{ margin: '2rem 0 1rem' }}>Detailed Correction:</h3>
          {examQuestions.map((q, i) => {
            const correct = isCorrect(i)
            return (
              <div key={i} style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', borderLeft: `4px solid ${correct ? '#4caf50' : '#f44336'}` }}>
                <span style={{ fontSize: '0.8rem', color: correct ? '#4caf50' : '#f44336', fontWeight: 600 }}>Question {i + 1} — {correct ? 'CORRECT' : 'INCORRECT'}</span>
                <p style={{ margin: '0.5rem 0', lineHeight: 1.6 }}>{q.q}</p>
                <div style={{ marginBottom: '0.75rem' }}>
                  {q.opts.map((opt, j) => {
                    const isRight = q.correct === j
                    const wasSelected = answers[i] === j
                    let color = '#78909c'
                    if (isRight) color = '#4caf50'
                    else if (wasSelected) color = '#f44336'
                    return (
                      <div key={j} style={{ padding: '0.3rem 0', fontSize: '0.9rem', color }}>
                        {String.fromCharCode(65 + j)}. {opt} {isRight ? '✓' : ''} {wasSelected && !isRight ? '✗' : ''}
                      </div>
                    )
                  })}
                </div>
                <div style={{ background: 'rgba(255,153,0,0.1)', borderRadius: '8px', padding: '0.75rem' }}>
                  <span style={{ color: '#ff9900', fontSize: '0.85rem' }}>{q.exp}</span>
                </div>
              </div>
            )
          })}

          <button onClick={restartExam} style={{
            width: '100%', padding: '1.25rem', marginTop: '1rem',
            background: 'linear-gradient(135deg, #ff9900, #ec7211)', color: '#0f1b2d',
            border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer'
          }}><RotateCcw size={18} style={{ verticalAlign: 'middle' }} /> New Exam (different questions)</button>
        </div>
      </div>
    )
  }

  const q = examQuestions[currentQ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--aws-dark)', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        background: 'var(--glass)', borderBottom: '1px solid var(--border)',
        padding: '0.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Shield size={20} color="#ff9900" />
          <span style={{ fontWeight: 700 }}>SAA-C03</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} color={timeLeft < 600 ? '#f44336' : '#ff9900'} />
            <span style={{ fontWeight: 700, color: timeLeft < 600 ? '#f44336' : '#ff9900', fontFamily: 'monospace', fontSize: '1.1rem' }}>{formatTime(timeLeft)}</span>
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{answeredCount}/{totalQ}</span>
          <button onClick={() => setShowReview(true)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(33,150,243,0.5)', background: 'rgba(33,150,243,0.1)', color: '#64b5f6', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Review</button>
          <button onClick={() => setSubmitted(true)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(244,67,54,0.5)', background: 'rgba(244,67,54,0.1)', color: '#ff5252', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Submit</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '1.5rem', gap: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '2rem', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ color: '#ff9900', fontWeight: 600 }}>Question {currentQ + 1} / {totalQ}</span>
              <button onClick={() => setFlagged(p => ({ ...p, [currentQ]: !p[currentQ] }))} style={{
                background: flagged[currentQ] ? 'rgba(255,153,0,0.2)' : 'transparent',
                border: `1px solid ${flagged[currentQ] ? '#ff9900' : 'var(--border)'}`,
                borderRadius: '8px', padding: '0.5rem 1rem', color: flagged[currentQ] ? '#ff9900' : '#78909c',
                display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer'
              }}><Flag size={14} /> {flagged[currentQ] ? 'Flagged' : 'Flag'}</button>
            </div>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>{q.q}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {q.opts.map((opt, i) => (
                <div key={i} onClick={() => selectAnswer(i)} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  padding: '1rem 1.25rem', borderRadius: '12px', cursor: 'pointer',
                  border: answers[currentQ] === i ? '2px solid #ff9900' : '2px solid var(--border)',
                  background: answers[currentQ] === i ? 'rgba(255,153,0,0.08)' : 'transparent',
                  transition: 'all 0.2s'
                }}>
                  <div style={{
                    minWidth: '28px', height: '28px', borderRadius: '50%',
                    border: `2px solid ${answers[currentQ] === i ? '#ff9900' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: answers[currentQ] === i ? '#ff9900' : 'transparent',
                    color: answers[currentQ] === i ? '#0f1b2d' : '#78909c', fontWeight: 700, fontSize: '0.8rem'
                  }}>{String.fromCharCode(65 + i)}</div>
                  <span style={{ color: answers[currentQ] === i ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>{opt}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '10px',
              background: 'var(--bg-card-hover)', border: '1px solid var(--border)',
              color: currentQ === 0 ? '#455a64' : 'white', cursor: currentQ === 0 ? 'not-allowed' : 'pointer'
            }}><ChevronLeft size={18} /> Previous</button>
            <button onClick={() => setCurrentQ(Math.min(totalQ - 1, currentQ + 1))} disabled={currentQ === totalQ - 1} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '10px',
              background: 'rgba(255,153,0,0.1)', border: '1px solid rgba(255,153,0,0.3)',
              color: '#ff9900', fontWeight: 600, cursor: currentQ === totalQ - 1 ? 'not-allowed' : 'pointer'
            }}>Next <ChevronRight size={18} /></button>
          </div>
        </div>

        <div style={{ width: '200px' }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border)', position: 'sticky', top: '80px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 600 }}>NAVIGATION</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
              {examQuestions.map((_, i) => (
                <button key={i} onClick={() => setCurrentQ(i)} style={{
                  width: '32px', height: '32px', borderRadius: '6px', border: 'none',
                  fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer',
                  background: i === currentQ ? '#ff9900' : flagged[i] ? 'rgba(255,153,0,0.3)' : isAnswered(i) ? 'rgba(76,175,80,0.3)' : 'var(--bg-card-hover)',
                  color: i === currentQ ? '#0f1b2d' : isAnswered(i) ? '#4caf50' : '#78909c',
                }}>{i + 1}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showReview && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9998, background: 'rgba(10,15,26,0.98)', overflow: 'auto', padding: '2rem' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2>Review</h2>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setShowReview(false)} style={{ padding: '0.7rem 1.5rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}>Back to Exam</button>
                <button onClick={() => setSubmitted(true)} style={{ padding: '0.7rem 1.5rem', borderRadius: '10px', border: 'none', background: '#f44336', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Submit Exam</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px', gap: '0.5rem', padding: '0.5rem' }}>
              {examQuestions.map((eq, i) => (
                <div key={i} onClick={() => { setCurrentQ(i); setShowReview(false) }} style={{ display: 'contents', cursor: 'pointer' }}>
                  <span style={{ color: flagged[i] ? '#ff9900' : '#78909c', fontWeight: 600 }}>{flagged[i] ? '⚑ ' : ''}{i + 1}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{eq.q.substring(0, 60)}...</span>
                  <span style={{ fontSize: '0.8rem', color: isAnswered(i) ? '#4caf50' : '#f44336', fontWeight: 600 }}>{isAnswered(i) ? '✓ Answered' : '✗ Empty'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
