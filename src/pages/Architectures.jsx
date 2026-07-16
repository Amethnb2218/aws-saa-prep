import { useState } from 'react'
import { Map, ChevronDown, ChevronUp } from 'lucide-react'

const diagrams = [
  {
    title: '3-Tier Web Application (High Availability)',
    category: 'Classic',
    description: 'Standard highly available web application architecture across 3 AZs with auto-scaling, caching, and managed database.',
    diagram: `
┌─────────────────────────────────────────────────────────────────┐
│                         Route 53 (DNS)                          │
└────────────────────────────────┬────────────────────────────────┘
                                 │
┌────────────────────────────────▼────────────────────────────────┐
│                    CloudFront (CDN + WAF)                        │
│              Static assets from S3 + Dynamic from ALB           │
└───────────┬────────────────────────────────────────┬────────────┘
            │ static                                 │ dynamic
┌───────────▼───────────┐        ┌───────────────────▼────────────┐
│    S3 Bucket          │        │    Application Load Balancer    │
│  (static assets)      │        │         (Multi-AZ)             │
└───────────────────────┘        └─────┬──────────┬───────────────┘
                                       │          │
                          ┌────────────▼─┐  ┌────▼────────────┐
                          │  AZ-1        │  │  AZ-2           │
                          │ ┌──────────┐ │  │ ┌──────────┐    │
                          │ │EC2 / ECS │ │  │ │EC2 / ECS │    │
                          │ │(ASG)     │ │  │ │(ASG)     │    │
                          │ └────┬─────┘ │  │ └────┬─────┘    │
                          └──────┼───────┘  └──────┼──────────┘
                                 │                 │
                    ┌────────────▼─────────────────▼──────────┐
                    │        ElastiCache Redis (Multi-AZ)      │
                    │           (sessions + caching)            │
                    └────────────────────┬─────────────────────┘
                                         │
                    ┌────────────────────▼──────────────────────┐
                    │      Aurora MySQL (Multi-AZ)               │
                    │   Writer ──── Reader Replica(s)            │
                    │   (AZ-1)      (AZ-2)                      │
                    └───────────────────────────────────────────┘`,
    keyPoints: ['CloudFront + WAF for DDoS protection and global delivery', 'ALB distributes across AZs with health checks', 'ASG handles traffic spikes automatically (scale 2x-10x)', 'ElastiCache eliminates database pressure for hot data', 'Aurora Multi-AZ: 30-second failover, 15 Read Replicas']
  },
  {
    title: 'Serverless Event-Driven Architecture',
    category: 'Serverless',
    description: 'Fully serverless application with event-driven processing, zero servers to manage.',
    diagram: `
┌──────────────┐      ┌──────────────────┐      ┌──────────────┐
│   Client     │─────▶│  API Gateway     │─────▶│   Lambda     │
│  (Browser)   │      │  (REST/HTTP)     │      │  (Function)  │
└──────────────┘      └──────────────────┘      └──────┬───────┘
                                                       │
                              ┌─────────────────────────┼──────────┐
                              │                         │          │
                   ┌──────────▼─────┐    ┌─────────────▼───┐      │
                   │   DynamoDB     │    │     S3 Bucket    │      │
                   │   (NoSQL DB)   │    │  (file storage)  │      │
                   └────────────────┘    └────────┬─────────┘      │
                                                  │                │
                                         ┌────────▼─────────┐     │
                                         │  S3 Event         │     │
                                         │  Notification     │     │
                                         └────────┬──────────┘     │
                                                  │                │
                                         ┌────────▼──────────┐    │
                                         │  Lambda            │    │
                                         │  (image resize)    │    │
                                         └────────┬──────────┘    │
                                                  │               │
                              ┌────────────────────▼────────┐     │
                              │  SNS → SQS → Lambda         │◀────┘
                              │  (async processing)         │
                              └─────────────────────────────┘

💰 Cost: Pay only for actual invocations — $0 when idle`,
    keyPoints: ['API Gateway: rate limiting, auth, caching — no servers', 'Lambda: auto-scales from 0 to thousands of concurrent executions', 'DynamoDB: single-digit ms latency at any scale', 'S3 Events trigger downstream processing automatically', 'SNS/SQS for decoupling and fan-out patterns']
  },
  {
    title: 'Data Lake Architecture',
    category: 'Analytics',
    description: 'Modern data lake on S3 with ingestion, cataloging, ETL, and multi-engine analytics.',
    diagram: `
┌─────────────────────────────── DATA SOURCES ─────────────────────┐
│  Databases    │  Applications  │  IoT/Streams  │  Files/Logs     │
└──────┬────────┴───────┬────────┴───────┬───────┴────────┬────────┘
       │                │                │                │
┌──────▼────┐   ┌───────▼──────┐  ┌──────▼──────┐  ┌─────▼──────┐
│  DMS      │   │  Kinesis     │  │  IoT Core   │  │  DataSync  │
│  (CDC)    │   │  Firehose    │  │  → Kinesis  │  │  / S3 PUT  │
└──────┬────┘   └───────┬──────┘  └──────┬──────┘  └─────┬──────┘
       │                │                │                │
┌──────▼────────────────▼────────────────▼────────────────▼──────┐
│                    S3 DATA LAKE (Raw Zone)                       │
│            Parquet / JSON / CSV — Partitioned by date            │
└─────────────────────────────┬───────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│              AWS Glue (ETL + Data Catalog)                        │
│         Crawlers discover schema → Catalog for query             │
└─────────────────────────────┬───────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│                   S3 DATA LAKE (Curated Zone)                     │
│           Cleaned, transformed, Parquet, partitioned             │
└──────┬──────────────┬──────────────────┬────────────────────────┘
       │              │                  │
┌──────▼──────┐ ┌─────▼────────┐  ┌─────▼──────────┐
│  Athena     │ │  Redshift    │  │  SageMaker     │
│  (SQL)      │ │  Spectrum    │  │  (ML Training)  │
└──────┬──────┘ └─────┬────────┘  └────────────────┘
       │              │
┌──────▼──────────────▼──────────────────────────────┐
│              QuickSight (Dashboards)                 │
└─────────────────────────────────────────────────────┘`,
    keyPoints: ['S3 as central storage: unlimited scale, $0.023/GB', 'Glue Crawlers auto-discover schema (no manual DDL)', 'Parquet format: 90% cost reduction for Athena queries', 'Multiple query engines on same data (Athena, Redshift, EMR)', 'Lake Formation for fine-grained access control (column/row level)']
  },
  {
    title: 'Disaster Recovery — Warm Standby',
    category: 'DR / Migration',
    description: 'Cross-region DR with warm standby (RTO ~15 min, RPO ~seconds). Minimal running infrastructure in DR region, scale up during disaster.',
    diagram: `
┌─────────── PRIMARY REGION (us-east-1) ──────────────────────────┐
│                                                                  │
│  Route 53 ──▶ ALB ──▶ ASG (4 instances)                        │
│                        │                                         │
│              Aurora Writer (Primary)                              │
│                   │                                              │
│              S3 Bucket (data)                                     │
│                                                                  │
└──────────┬─────────────────────────────────────┬─────────────────┘
           │ Aurora Global Replication            │ S3 CRR
           │ (< 1 sec lag)                       │ (async)
           ▼                                     ▼
┌─────────── DR REGION (eu-west-1) ───────────────────────────────┐
│                                                                  │
│  Route 53 (secondary, health-checked)                           │
│       ──▶ ALB ──▶ ASG (1 instance — scaled DOWN)                │
│                    │                                             │
│              Aurora Reader (promote on failover)                  │
│                                                                  │
│              S3 Bucket (replica)                                  │
│                                                                  │
│  ⚠️  ON DISASTER:                                                │
│  1. Promote Aurora Reader → Writer (~1 min)                      │
│  2. Scale ASG from 1 → 4 instances (~5 min)                     │
│  3. Route 53 failover → DR ALB (~30 sec)                        │
│                                                                  │
│  Total RTO: ~7 minutes                                           │
└──────────────────────────────────────────────────────────────────┘`,
    keyPoints: ['Aurora Global Database: RPO < 1 second (async replication)', 'S3 CRR: replicates data continuously to DR region', 'Warm Standby: minimal infra running (1 instance vs 4) — cost ~25% of primary', 'Route 53 Failover routing with health checks for automatic DNS switch', 'Scale-up during disaster using pre-configured ASG and launch templates']
  },
  {
    title: 'Microservices on ECS with Service Mesh',
    category: 'Containers',
    description: 'Container-based microservices architecture with service discovery, observability, and CI/CD.',
    diagram: `
┌──────────────────────────────────────────────────────────────────┐
│                     CodePipeline (CI/CD)                          │
│  Source (GitHub) → Build (CodeBuild) → Deploy (CodeDeploy B/G)  │
└──────────────────────────────────┬───────────────────────────────┘
                                   │ deploy
┌──────────────────────────────────▼───────────────────────────────┐
│                        ECS Cluster (Fargate)                      │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ User Service │  │ Order Service│  │ Payment Svc  │           │
│  │ + Envoy      │  │ + Envoy      │  │ + Envoy      │           │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘           │
│         │                 │                 │                    │
│         └─────── Service Connect / App Mesh ─┘                   │
│                  (mTLS, retries, circuit breaker)                 │
│                                                                   │
└───────────────────────────────┬──────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────▼───────┐  ┌───────────▼──────┐  ┌────────────▼─────┐
│  Aurora       │  │  DynamoDB        │  │  ElastiCache     │
│  (Users DB)   │  │  (Orders)        │  │  (Sessions)      │
└───────────────┘  └──────────────────┘  └──────────────────┘

┌──────────────── Observability ────────────────────────────────┐
│  X-Ray (traces) │ CloudWatch (metrics/logs) │ Container Insights│
└──────────────────────────────────────────────────────────────┘`,
    keyPoints: ['Fargate: zero instance management, per-second billing', 'Service Connect/App Mesh: mTLS between services, automatic retries', 'Blue/Green deploys via CodeDeploy: instant rollback on failure', 'Each service owns its database (database-per-service pattern)', 'X-Ray traces requests across all services end-to-end']
  },
  {
    title: 'Hybrid Cloud — On-Premises to AWS Migration',
    category: 'DR / Migration',
    description: 'Hybrid architecture connecting on-premises data center to AWS with Direct Connect, shared services, and phased migration.',
    diagram: `
┌────────────── ON-PREMISES DATA CENTER ──────────────────────────┐
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐              │
│  │ App      │  │ Database │  │ File Server      │              │
│  │ Servers  │  │ (Oracle) │  │ (NFS/SMB)        │              │
│  └────┬─────┘  └────┬─────┘  └────────┬─────────┘              │
│       │              │                 │                         │
│       └──────────────┼─────────────────┘                         │
│                      │                                           │
└──────────────────────┼───────────────────────────────────────────┘
                       │
         ┌─────────────▼──────────────┐
         │  Direct Connect (1 Gbps)   │  ← Private, dedicated
         │  + VPN backup (IPsec)      │  ← Encrypted failover
         └─────────────┬──────────────┘
                       │
┌──────────────────────▼────────────────────────────────────────────┐
│                      Transit Gateway                              │
│              (hub connecting all VPCs + on-prem)                   │
└───────┬──────────────┬─────────────────────┬─────────────────────┘
        │              │                     │
┌───────▼──────┐ ┌─────▼───────────┐  ┌─────▼────────────────┐
│ Shared VPC   │ │ Production VPC  │  │  Migration VPC       │
│              │ │                 │  │                      │
│ • AD Connectorr│ │ • EC2 / ECS    │  │ • MGN Replication   │
│ • DNS        │ │ • Aurora (from  │  │ • DMS (DB migrate)  │
│ • Endpoints  │ │   Oracle via    │  │ • SCT (schema conv) │
│              │ │   DMS + SCT)    │  │                      │
└──────────────┘ └─────────────────┘  └──────────────────────┘

📋 MIGRATION PHASES:
  Phase 1: Direct Connect + VPN (connectivity)
  Phase 2: Lift & Shift VMs via MGN (Application Migration Service)
  Phase 3: Database migration via DMS + SCT (Oracle → Aurora)
  Phase 4: Modernize (containers, serverless)
  Phase 5: Decommission on-premises`,
    keyPoints: ['Direct Connect: dedicated 1-10 Gbps private connection', 'VPN as backup: automatic failover via BGP if DX fails', 'Transit Gateway: hub-spoke connects all VPCs + on-premises', 'MGN: continuous replication, cutover in minutes (VM migration)', 'DMS + SCT: migrate databases with minimal downtime (CDC)']
  },
  {
    title: 'Multi-Account Organization Structure',
    category: 'Governance',
    description: 'AWS Organizations multi-account strategy with OUs, SCPs, and centralized security.',
    diagram: `
┌────────────────── AWS Organizations ─────────────────────────────┐
│                                                                   │
│  Management Account (billing + org management only)              │
│                                                                   │
│  ┌─── Security OU ────────────────────────────────────────┐      │
│  │  • Log Archive Account (CloudTrail, Config, VPC Flow)  │      │
│  │  • Security Audit Account (GuardDuty, Detective, Macie)│      │
│  │  SCP: prevent log deletion, restrict regions           │      │
│  └────────────────────────────────────────────────────────┘      │
│                                                                   │
│  ┌─── Infrastructure OU ─────────────────────────────────┐       │
│  │  • Networking Account (Transit GW, Direct Connect)     │       │
│  │  • Shared Services (AD, DNS, CI/CD tools)              │       │
│  │  SCP: restrict to approved services                    │       │
│  └────────────────────────────────────────────────────────┘      │
│                                                                   │
│  ┌─── Workloads OU ──────────────────────────────────────┐       │
│  │                                                        │       │
│  │  ┌─ Production OU ──────────────────────────────┐     │       │
│  │  │  Prod-App1 │ Prod-App2 │ Prod-App3          │     │       │
│  │  │  SCP: strict (no public S3, required encrypt)│     │       │
│  │  └──────────────────────────────────────────────┘     │       │
│  │                                                        │       │
│  │  ┌─ Development OU ─────────────────────────────┐     │       │
│  │  │  Dev-App1 │ Dev-App2 │ Dev-App3              │     │       │
│  │  │  SCP: permissive (allow experimentation)     │     │       │
│  │  └──────────────────────────────────────────────┘     │       │
│  └────────────────────────────────────────────────────────┘      │
│                                                                   │
│  ┌─── Sandbox OU ────────────────────────────────────────┐       │
│  │  Individual developer accounts (auto-nuke after 7 days)│      │
│  │  SCP: budget limit, deny expensive services            │       │
│  └────────────────────────────────────────────────────────┘      │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘

🔑 KEY: Control Tower manages guardrails across all accounts`,
    keyPoints: ['Separate accounts = blast radius isolation (breach in dev ≠ breach in prod)', 'SCPs: preventive guardrails (can\'t be bypassed by account admins)', 'Centralized logging: all accounts → Log Archive (immutable)', 'IAM Identity Center: one login, different permissions per account', 'Control Tower Account Factory: standardized new account provisioning']
  }
]

export default function Architectures() {
  const [open, setOpen] = useState(null)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
        <Map size={32} color="#ff9900" />
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Architecture Diagrams</h1>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Reference architectures for the most common SAA-C03 scenarios. Study these patterns — they appear in almost every exam.
      </p>

      {diagrams.map((d, i) => (
        <div key={i} style={{
          background: 'var(--bg-card)', borderRadius: '16px', marginBottom: '1rem',
          border: '1px solid var(--border)', overflow: 'hidden',
          transition: 'all 0.3s'
        }}>
          <div
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              padding: '1.25rem 1.5rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  background: d.category === 'Classic' ? '#2196f3' : d.category === 'Serverless' ? '#4caf50' : d.category === 'Analytics' ? '#9c27b0' : d.category === 'Containers' ? '#00bcd4' : d.category === 'Governance' ? '#ff5722' : '#ff9900',
                  color: 'white', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600
                }}>{d.category}</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{d.title}</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.3rem' }}>{d.description}</p>
            </div>
            {open === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {open === i && (
            <div style={{ padding: '0 1.5rem 1.5rem' }}>
              <div style={{
                background: '#0a1628', borderRadius: '12px', padding: '1.5rem',
                overflowX: 'auto', marginBottom: '1rem', border: '1px solid #1a3050'
              }}>
                <pre style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                  fontSize: '0.72rem', lineHeight: 1.5, color: '#a8d4ff', margin: 0, whiteSpace: 'pre'
                }}>{d.diagram}</pre>
              </div>
              <div>
                <h4 style={{ color: '#ff9900', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 700 }}>Key Points for the Exam:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {d.keyPoints.map((p, j) => (
                    <li key={j} style={{
                      padding: '0.4rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)',
                      borderBottom: j < d.keyPoints.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      display: 'flex', gap: '0.5rem'
                    }}>
                      <span style={{ color: '#ff9900' }}>▸</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
