import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const domains = [
  {
    id: 1, title: 'Design Secure Architectures', pct: 30, color: '#f44336',
    topics: [
      { name: 'IAM', details: 'Users, Groups, Roles, Policies, Permission Boundaries, STS (Security Token Service), Identity Federation (SAML, Web Identity), AWS SSO / IAM Identity Center' },
      { name: 'VPC Security', details: 'Security Groups (stateful, allow only), NACLs (stateless, allow + deny), VPC Flow Logs, VPC Endpoints (Gateway for S3/DynamoDB, Interface for others), PrivateLink' },
      { name: 'Encryption', details: 'KMS (CMKs, envelope encryption, key policies), CloudHSM (dedicated hardware), SSE-S3 / SSE-KMS / SSE-C, Client-side encryption, TLS in transit, ACM for SSL certificates' },
      { name: 'Network Architecture', details: 'Public vs Private subnets, NAT Gateway/Instance, Bastion Hosts, Internet Gateway, VPN (Site-to-Site, Client), Direct Connect, Transit Gateway, Network Firewall' },
      { name: 'Security Services', details: 'GuardDuty (threat detection), Inspector (vulnerabilities), Macie (PII in S3), WAF (web attacks), Shield (DDoS), Security Hub (central view), Detective (investigation), Secrets Manager, Parameter Store' },
    ]
  },
  {
    id: 2, title: 'Design Resilient Architectures', pct: 26, color: '#2196f3',
    topics: [
      { name: 'High Availability', details: 'Multi-AZ deployments, Auto Scaling Groups (launch templates, scaling policies, cooldown), ELB (ALB layer 7, NLB layer 4, CLB legacy), Health checks, Cross-zone load balancing' },
      { name: 'Disaster Recovery', details: '4 strategies: Backup/Restore (cheapest, high RTO), Pilot Light (core running), Warm Standby (scaled down copy), Multi-Site Active-Active (lowest RTO/RPO, most expensive). Know RTO vs RPO!' },
      { name: 'Decoupling', details: 'SQS (Standard vs FIFO, Dead Letter Queue, visibility timeout, long polling), SNS (pub/sub, fanout), EventBridge (event-driven), Step Functions (orchestration), Amazon MQ (legacy protocols)' },
      { name: 'Database Resilience', details: 'RDS Multi-AZ (synchronous standby), Aurora (6 copies across 3 AZs, auto-failover), DynamoDB Global Tables (multi-region active-active), Read Replicas (async, cross-region)' },
      { name: 'Storage Resilience', details: 'S3 (11 nines durability, cross-region replication), EBS snapshots (incremental, cross-region copy), EFS (Multi-AZ), Backup service (centralized backup management)' },
    ]
  },
  {
    id: 3, title: 'Design High-Performing Architectures', pct: 24, color: '#4caf50',
    topics: [
      { name: 'Compute', details: 'EC2 instance types (M=general, C=compute, R=memory, G/P=GPU, I/D=storage), Lambda (15min max, 10GB memory, layers, concurrency), ECS/Fargate, EKS, Placement Groups (cluster, spread, partition)' },
      { name: 'Storage Performance', details: 'EBS types (gp3=baseline, io2=highest IOPS, st1=throughput, sc1=cold), S3 performance (3,500 PUT/5,500 GET per prefix), S3 Transfer Acceleration, multipart upload, byte-range fetches' },
      { name: 'Database Performance', details: 'Aurora (5x MySQL, 3x PostgreSQL), DynamoDB (single-digit ms, DAX for microsecond cache), ElastiCache (Redis vs Memcached), Redshift (columnar, MPP for analytics), Read Replicas for read scaling' },
      { name: 'Networking Performance', details: 'CloudFront (global CDN, edge caching), Global Accelerator (AWS backbone, static IPs), Route 53 routing policies (latency, weighted, geolocation, failover), Enhanced Networking (ENA)' },
      { name: 'Caching Strategies', details: 'CloudFront (edge), ElastiCache (application), DAX (DynamoDB), API Gateway caching. Patterns: Lazy loading (cache-aside), Write-through, TTL expiration' },
    ]
  },
  {
    id: 4, title: 'Design Cost-Optimized Architectures', pct: 20, color: '#ff9900',
    topics: [
      { name: 'EC2 Pricing', details: 'On-Demand (no commitment), Reserved (1yr/3yr, up to 72% off), Savings Plans (flexible), Spot (up to 90% off, can be interrupted), Dedicated Host/Instance. Right-sizing with Compute Optimizer.' },
      { name: 'Storage Cost', details: 'S3 classes: Standard > Standard-IA > One Zone-IA > Glacier Instant > Glacier Flexible > Glacier Deep Archive. Lifecycle policies for automatic transitions. Intelligent-Tiering for unknown patterns.' },
      { name: 'Data Transfer', details: 'Data IN = FREE. Data OUT = paid. Same AZ = free (private IP). Cross-AZ = small cost. Cross-region = higher cost. VPC Endpoints save NAT Gateway data processing costs.' },
      { name: 'Architecture Cost Patterns', details: 'Serverless for sporadic traffic (Lambda, Fargate, Aurora Serverless). Spot for fault-tolerant workloads. Reserved for steady-state. Auto Scaling to match demand. Instance Scheduler for dev/test.' },
      { name: 'Cost Tools', details: 'Cost Explorer (visualize, forecast), Budgets (alerts), Pricing Calculator (estimate before deploy), Compute Optimizer (right-sizing), Trusted Advisor (waste detection), Organizations consolidated billing (volume discounts)' },
    ]
  }
]

export default function Domains() {
  const [expanded, setExpanded] = useState({})

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>SAA-C03 Exam Domains</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Master these 4 domains to pass the exam. Each topic is what you need to know.</p>

      {domains.map(d => (
        <div key={d.id} style={{ marginBottom: '1.5rem' }}>
          <div onClick={() => toggle(d.id)} style={{
            background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem',
            border: `1px solid ${d.color}33`, cursor: 'pointer', transition: 'all 0.2s'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: d.color }}>{d.pct}%</div>
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Domain {d.id}: {d.title}</h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{d.topics.length} key topics</p>
                </div>
              </div>
              {expanded[d.id] ? <ChevronUp color="var(--text-secondary)" /> : <ChevronDown color="var(--text-secondary)" />}
            </div>
          </div>

          {expanded[d.id] && (
            <div style={{ marginTop: '0.5rem', display: 'grid', gap: '0.5rem', paddingLeft: '1rem' }}>
              {d.topics.map((t, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card-hover)', borderRadius: '12px', padding: '1.25rem',
                  borderLeft: `3px solid ${d.color}`
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: d.color, marginBottom: '0.5rem' }}>{t.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{t.details}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
