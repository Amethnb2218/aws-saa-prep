import { useState } from 'react'
import { CheckCircle, Circle, Calendar, Target, BookOpen } from 'lucide-react'

const plan = [
  {
    week: 1,
    title: 'Foundations & IAM + VPC',
    dates: 'July 16 - July 22',
    color: '#2196f3',
    days: [
      { day: 'Day 1-2', topic: 'IAM Deep Dive', details: 'Users, Groups, Roles, Policies (JSON), Permission Boundaries, STS, Identity Federation, AWS Organizations, SCPs' },
      { day: 'Day 3-4', topic: 'VPC Networking', details: 'Subnets (public/private), Route Tables, Internet Gateway, NAT Gateway, Security Groups vs NACLs, VPC Peering, VPC Endpoints, Transit Gateway' },
      { day: 'Day 5-6', topic: 'VPC Advanced', details: 'Site-to-Site VPN, Direct Connect, PrivateLink, Flow Logs, Bastion Hosts, Network Firewall' },
      { day: 'Day 7', topic: 'Review + Quiz', details: 'Flashcards review, take Domain 1 quiz, note weak areas' },
    ]
  },
  {
    week: 2,
    title: 'Compute & Containers',
    dates: 'July 23 - July 29',
    color: '#4caf50',
    days: [
      { day: 'Day 1-2', topic: 'EC2 Mastery', details: 'Instance types, AMIs, User Data, Instance Store vs EBS, Placement Groups, Hibernate, EC2 pricing (On-Demand, Reserved, Spot, Savings Plans, Dedicated)' },
      { day: 'Day 3', topic: 'Auto Scaling & ELB', details: 'Auto Scaling Groups (policies, lifecycle hooks), ALB vs NLB vs CLB, Connection Draining, Sticky Sessions, Cross-zone Load Balancing' },
      { day: 'Day 4-5', topic: 'Serverless & Containers', details: 'Lambda (limits, layers, destinations), API Gateway, ECS (EC2 vs Fargate), EKS, ECR, Step Functions, EventBridge' },
      { day: 'Day 6-7', topic: 'Review + Quiz', details: 'Practice questions on compute scenarios. Focus on "which compute to choose" decision trees' },
    ]
  },
  {
    week: 3,
    title: 'Storage & Databases',
    dates: 'July 30 - August 5',
    color: '#9c27b0',
    days: [
      { day: 'Day 1-2', topic: 'S3 Deep Dive', details: 'Storage classes, Lifecycle Policies, Versioning, Replication (CRR/SRR), Encryption (SSE-S3, SSE-KMS, SSE-C), Pre-signed URLs, S3 Select, Access Points, Object Lock' },
      { day: 'Day 3', topic: 'Other Storage', details: 'EBS (types: gp3, io2, st1, sc1), EFS vs FSx (Windows/Lustre), Storage Gateway, DataSync, Transfer Family, Snow Family' },
      { day: 'Day 4-5', topic: 'Databases', details: 'RDS (Multi-AZ, Read Replicas, Aurora), DynamoDB (keys, indexes, DAX, Streams, Global Tables), ElastiCache (Redis vs Memcached), Redshift, Neptune, DocumentDB, Keyspaces' },
      { day: 'Day 6-7', topic: 'Review + Quiz', details: 'Storage and DB scenario questions. "Which database for this use case?" practice' },
    ]
  },
  {
    week: 4,
    title: 'High Availability, Caching & Decoupling',
    dates: 'August 6 - August 12',
    color: '#ff5722',
    days: [
      { day: 'Day 1-2', topic: 'HA & Disaster Recovery', details: 'Multi-AZ vs Multi-Region, Route 53 routing policies, CloudFront, Global Accelerator, DR strategies (Backup/Restore, Pilot Light, Warm Standby, Active-Active), RTO vs RPO' },
      { day: 'Day 3-4', topic: 'Decoupling & Messaging', details: 'SQS (Standard vs FIFO, DLQ, visibility timeout), SNS, Kinesis (Data Streams vs Firehose vs Analytics), Amazon MQ, EventBridge' },
      { day: 'Day 5-6', topic: 'Caching & Performance', details: 'CloudFront (behaviors, origins, OAC), ElastiCache patterns, DAX, S3 Transfer Acceleration, Global Accelerator vs CloudFront' },
      { day: 'Day 7', topic: 'Review + Quiz', details: 'Architecture scenario practice — "design a highly available, fault-tolerant system"' },
    ]
  },
  {
    week: 5,
    title: 'Security, Monitoring & Cost Optimization',
    dates: 'August 13 - August 19',
    color: '#e91e63',
    days: [
      { day: 'Day 1-2', topic: 'Security Services', details: 'KMS (CMK, envelope encryption), CloudHSM, Secrets Manager vs Parameter Store, ACM, WAF & Shield, GuardDuty, Inspector, Macie, Security Hub, Detective' },
      { day: 'Day 3-4', topic: 'Monitoring & Governance', details: 'CloudWatch (metrics, alarms, logs, dashboards), CloudTrail, Config, Systems Manager, Trusted Advisor, AWS Health Dashboard, Service Quotas' },
      { day: 'Day 5-6', topic: 'Cost Optimization', details: 'Cost Explorer, Budgets, Compute Optimizer, Savings Plans vs RIs, S3 Intelligent-Tiering, right-sizing, spot strategies, data transfer costs' },
      { day: 'Day 7', topic: 'Review + Quiz', details: 'Security scenario questions + cost optimization problems' },
    ]
  },
  {
    week: 6,
    title: 'Practice Exams & Final Review',
    dates: 'August 20 - August 27',
    color: '#ff9900',
    days: [
      { day: 'Day 1-2', topic: 'Full Practice Exam #1', details: 'Take 65-question timed exam. Review ALL wrong answers. Note patterns in mistakes.' },
      { day: 'Day 3-4', topic: 'Weak Areas Review', details: 'Re-study topics where you scored below 70%. Focus on tricky scenarios and common traps.' },
      { day: 'Day 5', topic: 'Full Practice Exam #2', details: 'Second full exam. Target: 80%+ score. If not reached, focus one more day on weak areas.' },
      { day: 'Day 6', topic: 'Final Review', details: 'Quick flashcard review, re-read key comparisons (SQS vs SNS, ALB vs NLB, etc.), relax in the evening.' },
      { day: 'Day 7', topic: 'EXAM DAY', details: 'You got this. Trust your preparation. Read questions carefully. Eliminate wrong answers first.' },
    ]
  },
]

export default function StudyPlan() {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('saa-plan-progress')
    return saved ? JSON.parse(saved) : {}
  })

  const toggle = (weekIdx, dayIdx) => {
    const key = `${weekIdx}-${dayIdx}`
    const next = { ...completed, [key]: !completed[key] }
    setCompleted(next)
    localStorage.setItem('saa-plan-progress', JSON.stringify(next))
  }

  const totalTasks = plan.reduce((acc, w) => acc + w.days.length, 0)
  const completedCount = Object.values(completed).filter(Boolean).length
  const progress = Math.round((completedCount / totalTasks) * 100)

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,153,0,0.1), rgba(33,150,243,0.05))',
        borderRadius: '20px', padding: '2rem', marginBottom: '2rem',
        border: '1px solid rgba(255,153,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
              <Calendar size={28} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="#ff9900" />
              6-Week Study Plan
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>July 16 — August 27, 2026 | Target: SAA-C03 Certification</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ff9900' }}>{progress}%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{completedCount}/{totalTasks} completed</div>
          </div>
        </div>
        <div style={{ marginTop: '1rem', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #ff9900, #4caf50)', borderRadius: '4px', transition: 'width 0.5s' }}></div>
        </div>
      </div>

      {plan.map((week, wi) => (
        <div key={wi} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: `${week.color}22`,
              border: `2px solid ${week.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: week.color, fontSize: '0.9rem'
            }}>W{week.week}</div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{week.title}</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{week.dates}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '0.5rem', paddingLeft: '1rem', borderLeft: `3px solid ${week.color}33` }}>
            {week.days.map((day, di) => {
              const key = `${wi}-${di}`
              const done = completed[key]
              return (
                <div key={di} onClick={() => toggle(wi, di)} style={{
                  background: done ? `${week.color}11` : 'var(--bg-card)',
                  borderRadius: '12px', padding: '1rem 1.25rem', cursor: 'pointer',
                  border: `1px solid ${done ? week.color + '44' : 'var(--border)'}`,
                  transition: 'all 0.2s', opacity: done ? 0.7 : 1
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {done ? <CheckCircle size={20} color={week.color} /> : <Circle size={20} color="var(--text-secondary)" />}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.75rem', color: week.color, fontWeight: 700, background: `${week.color}22`, padding: '0.15rem 0.5rem', borderRadius: '6px' }}>{day.day}</span>
                        <span style={{ fontWeight: 600, textDecoration: done ? 'line-through' : 'none' }}>{day.topic}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>{day.details}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div style={{
        background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem',
        border: '1px solid var(--border)', marginTop: '2rem'
      }}>
        <h3 style={{ color: '#ff9900', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={20} /> Daily Routine Tips
        </h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 2.2, paddingLeft: '1.25rem' }}>
          <li><strong style={{ color: 'var(--text-primary)' }}>Morning (2-3h):</strong> Watch course content / Read documentation</li>
          <li><strong style={{ color: 'var(--text-primary)' }}>Afternoon (1-2h):</strong> Practice questions + Review wrong answers</li>
          <li><strong style={{ color: 'var(--text-primary)' }}>Evening (30min):</strong> Flashcards + Quick recap of key concepts</li>
          <li><strong style={{ color: 'var(--text-primary)' }}>Rule:</strong> Never move to next topic until you score 70%+ on current topic quiz</li>
        </ul>
      </div>
    </div>
  )
}
