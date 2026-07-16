import { useState } from 'react'
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'

const pillars = [
  {
    name: 'Operational Excellence',
    color: '#2196f3',
    principles: [
      'Perform operations as code (CloudFormation, CDK)',
      'Make frequent, small, reversible changes',
      'Refine operations procedures frequently',
      'Anticipate failure (chaos engineering)',
      'Learn from all operational failures',
    ],
    services: 'CloudFormation, Config, CloudWatch, CloudTrail, Systems Manager, X-Ray',
    examTips: 'Questions about automation, IaC, monitoring, and operational best practices. If they ask "how to automate infrastructure deployment" → CloudFormation. "How to manage fleet of EC2" → Systems Manager.'
  },
  {
    name: 'Security',
    color: '#f44336',
    principles: [
      'Implement a strong identity foundation (least privilege)',
      'Enable traceability (CloudTrail, Config)',
      'Apply security at all layers',
      'Automate security best practices',
      'Protect data in transit and at rest',
      'Keep people away from data',
      'Prepare for security events',
    ],
    services: 'IAM, Organizations/SCPs, KMS, CloudHSM, WAF, Shield, GuardDuty, Inspector, Macie, Security Hub, ACM, Secrets Manager',
    examTips: 'Biggest domain (30%). Focus on: IAM roles vs users, encryption at rest/transit, VPC security layers (SG + NACL + WAF), cross-account access patterns. If in doubt → IAM Role with least privilege.'
  },
  {
    name: 'Reliability',
    color: '#4caf50',
    principles: [
      'Automatically recover from failure',
      'Test recovery procedures',
      'Scale horizontally to increase aggregate availability',
      'Stop guessing capacity',
      'Manage change in automation',
    ],
    services: 'Auto Scaling, ELB, Multi-AZ (RDS, ElastiCache), Route 53 (failover), S3 (cross-region replication), Backup, CloudFormation',
    examTips: 'Focus on: Multi-AZ for HA, Auto Scaling for elasticity, SQS for decoupling, DR strategies (know all 4 and their RTO/RPO). If they want "automatically recover" → Auto Scaling + health checks + Multi-AZ.'
  },
  {
    name: 'Performance Efficiency',
    color: '#9c27b0',
    principles: [
      'Democratize advanced technologies (use managed services)',
      'Go global in minutes (CloudFront, Global Accelerator)',
      'Use serverless architectures',
      'Experiment more often',
      'Consider mechanical sympathy (right tool for the job)',
    ],
    services: 'CloudFront, ElastiCache, DAX, Aurora, DynamoDB, Lambda, Global Accelerator, Redshift, Kinesis',
    examTips: 'Questions about caching strategies, choosing the right database, optimizing latency. Decision tree: static content → CloudFront, app data → ElastiCache, DynamoDB reads → DAX, SQL analytics → Redshift.'
  },
  {
    name: 'Cost Optimization',
    color: '#ff9900',
    principles: [
      'Implement cloud financial management',
      'Adopt a consumption model (pay for what you use)',
      'Measure overall efficiency',
      'Stop spending money on undifferentiated heavy lifting',
      'Analyze and attribute expenditure',
    ],
    services: 'Cost Explorer, Budgets, Compute Optimizer, Savings Plans, Reserved Instances, Spot Instances, S3 Lifecycle, Trusted Advisor',
    examTips: 'Key patterns: Spot for fault-tolerant batch, RI/SP for steady-state, Lambda for sporadic, Instance Scheduler for dev/test, S3 Lifecycle for aging data. Data transfer costs: IN=free, OUT=paid, same-AZ private=free.'
  },
  {
    name: 'Sustainability',
    color: '#00bcd4',
    principles: [
      'Understand your impact',
      'Establish sustainability goals',
      'Maximize utilization',
      'Anticipate and adopt more efficient offerings',
      'Use managed services (shared infrastructure)',
      'Reduce downstream impact of cloud workloads',
    ],
    services: 'Graviton instances, Auto Scaling (right-sizing), Serverless (Lambda, Fargate), S3 Intelligent-Tiering',
    examTips: 'Newest pillar, less likely to appear heavily. If mentioned: think efficient instance types (Graviton), serverless, right-sizing, reducing waste.'
  },
]

const scenarios = [
  {
    q: 'A company wants to deploy a web application that handles 50,000 concurrent users, must survive the failure of an entire AZ, and needs to minimize costs. Which architecture meets ALL requirements?',
    options: [
      'A) Single EC2 instance in one AZ with Auto Scaling',
      'B) Auto Scaling Group across 3 AZs + ALB + RDS Multi-AZ + CloudFront',
      'C) Single large EC2 + EBS in 2 AZs',
      'D) Lambda + DynamoDB only',
    ],
    answer: 'B',
    pillars: ['Reliability', 'Cost Optimization', 'Performance Efficiency'],
    explanation: 'B covers all bases: Multi-AZ ASG handles AZ failure (Reliability), ALB distributes load (Performance), CloudFront caches (Performance + Cost), RDS Multi-AZ ensures DB availability. A fails single-AZ requirement. C doesn\'t auto-scale. D might not handle 50K concurrent for all workloads.'
  },
  {
    q: 'A healthcare company must store patient records with encryption at rest and in transit, access audit trails, and restrict access to specific IAM roles only. Data must be retained for 7 years. Design the storage solution.',
    options: [
      'A) S3 with SSE-KMS + bucket policy restricting to specific roles + CloudTrail + Lifecycle to Glacier',
      'B) EBS encrypted volumes + CloudWatch logs',
      'C) S3 public bucket with client-side encryption',
      'D) RDS with TDE encryption + no backup',
    ],
    answer: 'A',
    pillars: ['Security', 'Cost Optimization'],
    explanation: 'A: SSE-KMS provides auditable encryption at rest, bucket policies restrict access, CloudTrail provides audit trail, lifecycle policies move to Glacier for cost-effective long-term retention. S3 also handles TLS in transit. B doesn\'t scale for records. C is insecure (public). D has no backup = no durability.'
  },
  {
    q: 'A streaming company needs to process 1 million events per second from mobile devices, perform real-time analytics, and store raw data in a data lake for later analysis. Which architecture?',
    options: [
      'A) API Gateway + SQS + Lambda + RDS',
      'B) Kinesis Data Streams + Kinesis Data Analytics + Kinesis Data Firehose → S3',
      'C) SNS + Lambda + DynamoDB',
      'D) Direct S3 uploads from mobile devices',
    ],
    answer: 'B',
    pillars: ['Performance Efficiency', 'Reliability'],
    explanation: 'Kinesis Data Streams handles millions of records/sec ingestion. Kinesis Analytics provides real-time SQL queries on the stream. Firehose automatically delivers to S3 (data lake) without managing infrastructure. This is the canonical real-time analytics architecture on AWS.'
  },
  {
    q: 'A company runs batch processing jobs that take 2-4 hours. Jobs are fault-tolerant and can be checkpointed. They run 200 instances nightly. Current cost: $50,000/month on On-Demand. Optimize costs.',
    options: [
      'A) Switch to Reserved Instances',
      'B) Use Spot Instances with checkpointing and Spot Fleet diversification',
      'C) Move to Lambda',
      'D) Use smaller instance types',
    ],
    answer: 'B',
    pillars: ['Cost Optimization'],
    explanation: 'Spot Instances save up to 90% for fault-tolerant batch workloads. Checkpointing means interrupted jobs resume without data loss. Spot Fleet diversification across instance types reduces interruption probability. Potential savings: $50K → ~$5-10K/month. Lambda has 15-min limit (jobs take 2-4h). RIs require commitment for variable workloads.'
  },
]

export default function WellArchitected() {
  const [expanded, setExpanded] = useState({})
  const [showAnswers, setShowAnswers] = useState({})

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>AWS Well-Architected Framework</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The foundation of the SAA-C03 exam. Every question maps to one or more of these pillars.
      </p>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
        {pillars.map((p, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', borderRadius: '16px', border: `1px solid ${p.color}33`, overflow: 'hidden' }}>
            <div onClick={() => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))} style={{
              padding: '1.25rem 1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: p.color }}></div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{p.name}</h2>
              </div>
              {expanded[i] ? <ChevronUp size={20} color="var(--text-secondary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
            </div>
            {expanded[i] && (
              <div style={{ padding: '0 1.5rem 1.5rem', borderTop: `1px solid ${p.color}22` }}>
                <h4 style={{ color: p.color, marginTop: '1rem', marginBottom: '0.5rem' }}>Design Principles:</h4>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.25rem' }}>
                  {p.principles.map((pr, j) => <li key={j}>{pr}</li>)}
                </ul>
                <h4 style={{ color: p.color, marginTop: '1rem', marginBottom: '0.5rem' }}>Key Services:</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{p.services}</p>
                <div style={{ marginTop: '1rem', background: `${p.color}11`, borderRadius: '10px', padding: '1rem', border: `1px solid ${p.color}33` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <Lightbulb size={16} color={p.color} />
                    <span style={{ fontWeight: 700, color: p.color, fontSize: '0.85rem' }}>Exam Tips:</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>{p.examTips}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Practice Scenarios — Multi-Pillar</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Real exam questions often test multiple pillars at once. Try to identify which pillars apply before checking the answer.
      </p>

      {scenarios.map((s, i) => (
        <div key={i} style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.25rem', border: '1px solid var(--border)' }}>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>{s.q}</p>
          <div style={{ display: 'grid', gap: '0.4rem', marginBottom: '1rem' }}>
            {s.options.map((opt, j) => (
              <div key={j} style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)', borderRadius: '8px', background: 'var(--bg-card-hover)' }}>{opt}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            {s.pillars.map((pil, j) => {
              const pillar = pillars.find(p => p.name === pil)
              return <span key={j} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '6px', background: `${pillar?.color || '#ff9900'}22`, color: pillar?.color || '#ff9900' }}>{pil}</span>
            })}
          </div>
          <button onClick={() => setShowAnswers(prev => ({ ...prev, [i]: !prev[i] }))} style={{
            padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,153,0,0.3)',
            background: 'rgba(255,153,0,0.1)', color: '#ff9900', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600
          }}>{showAnswers[i] ? 'Hide Answer' : 'Show Answer'}</button>
          {showAnswers[i] && (
            <div style={{ marginTop: '0.75rem', background: 'rgba(76,175,80,0.1)', borderRadius: '10px', padding: '1rem', border: '1px solid rgba(76,175,80,0.3)' }}>
              <p style={{ color: '#4caf50', fontWeight: 700, marginBottom: '0.3rem' }}>Answer: {s.answer}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{s.explanation}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
