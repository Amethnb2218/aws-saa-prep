import { BookOpen, Database, HardDrive, Cpu, MessageSquare, Shield, Globe, DollarSign, Zap, Layers, Network, Key, ArrowRightLeft } from 'lucide-react'

const sectionStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  padding: '1.5rem',
  marginBottom: '1.5rem'
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.85rem',
  marginTop: '0.75rem'
}

const thStyle = {
  background: 'rgba(255,153,0,0.1)',
  color: '#ff9900',
  padding: '0.5rem 0.75rem',
  textAlign: 'left',
  borderBottom: '1px solid var(--border)',
  fontWeight: 700
}

const tdStyle = {
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid var(--border)',
  color: 'var(--text-secondary)',
  verticalAlign: 'top'
}

const decisionBoxStyle = {
  background: 'rgba(255,153,0,0.05)',
  border: '1px solid rgba(255,153,0,0.2)',
  borderRadius: '8px',
  padding: '1rem',
  marginBottom: '1rem',
  fontFamily: 'monospace',
  fontSize: '0.82rem',
  lineHeight: '1.6',
  color: 'var(--text-secondary)',
  whiteSpace: 'pre-wrap'
}

const accentText = { color: '#ff9900', fontWeight: 700 }
const h2Style = { fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }
const h3Style = { fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#ff9900' }
const numberBoxStyle = {
  display: 'inline-block',
  background: 'rgba(255,153,0,0.1)',
  border: '1px solid rgba(255,153,0,0.3)',
  borderRadius: '6px',
  padding: '0.4rem 0.75rem',
  margin: '0.25rem',
  fontSize: '0.8rem',
  color: 'var(--text-secondary)'
}

export default function CheatSheet() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        <BookOpen size={28} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="#ff9900" />
        SAA-C03 Cheat Sheet
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Everything you need to memorize before exam day. Decision trees, comparisons, key numbers, and acronyms.
      </p>

      {/* ===== SECTION 1: DECISION TREES ===== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>
          <ArrowRightLeft size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="#ff9900" />
          Decision Trees - "Which Service?"
        </h2>

        <h3 style={h3Style}><Database size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> Which Database?</h3>
        <div style={decisionBoxStyle}>{`Need a database?
|
+-- Relational (SQL, joins, ACID)?
|   +-- Need >5 read replicas or serverless? --> Aurora
|   +-- Need auto-scaling + MySQL/PostgreSQL? --> Aurora Serverless
|   +-- Standard RDBMS workload? --> RDS (MySQL/PostgreSQL/MariaDB/Oracle/SQL Server)
|
+-- Key-Value / Document (NoSQL)?
|   +-- Single-digit ms latency, auto-scaling? --> DynamoDB
|   +-- Need microsecond reads? --> DynamoDB + DAX
|   +-- Document DB with MongoDB compatibility? --> DocumentDB
|
+-- In-Memory / Caching?
|   +-- Sub-millisecond latency, session store? --> ElastiCache Redis
|   +-- Simple caching, no persistence needed? --> ElastiCache Memcached
|   +-- DynamoDB read caching specifically? --> DAX
|
+-- Graph (relationships, social networks)? --> Neptune
|
+-- Time-Series (IoT, metrics)? --> Timestream
|
+-- Ledger (immutable, verifiable history)? --> QLDB
|
+-- Data Warehouse (analytics, BI)?
    +-- Petabyte-scale, complex queries? --> Redshift
    +-- Serverless ad-hoc on S3? --> Athena`}</div>

        <h3 style={h3Style}><HardDrive size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> Which Storage?</h3>
        <div style={decisionBoxStyle}>{`Need storage?
|
+-- Object storage (files, backups, data lake)?
|   +-- Frequently accessed? --> S3 Standard
|   +-- Infrequent access, instant retrieval? --> S3 Standard-IA
|   +-- Infrequent, recreatable data? --> S3 One Zone-IA
|   +-- Archive, retrieval in minutes? --> S3 Glacier Instant Retrieval
|   +-- Archive, retrieval 5-12 hours OK? --> S3 Glacier Flexible Retrieval
|   +-- Compliance archive, 7-10yr, 12h OK? --> S3 Glacier Deep Archive
|   +-- Unknown/changing access pattern? --> S3 Intelligent-Tiering
|
+-- Block storage (OS boot, databases, high IOPS)?
|   +-- General purpose SSD? --> gp3 (baseline 3000 IOPS)
|   +-- High-performance databases? --> io2 Block Express (up to 256K IOPS)
|   +-- Big data, sequential throughput? --> st1 (throughput HDD)
|   +-- Infrequent, lowest cost? --> sc1 (cold HDD)
|   +-- Highest IOPS, temporary data OK? --> Instance Store (ephemeral!)
|
+-- File storage (shared across instances)?
|   +-- Linux NFS workload? --> EFS
|   +-- Windows SMB workload? --> FSx for Windows
|   +-- High-performance computing (HPC)? --> FSx for Lustre
|   +-- NetApp features? --> FSx for NetApp ONTAP`}</div>

        <h3 style={h3Style}><Cpu size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> Which Compute?</h3>
        <div style={decisionBoxStyle}>{`Need compute?
|
+-- Full OS control / long-running / GPUs / custom AMI?
|   --> EC2
|   +-- Steady-state 24/7? --> Reserved Instances / Savings Plans
|   +-- Fault-tolerant, flexible timing? --> Spot Instances
|   +-- Short burst / unknown duration? --> On-Demand
|
+-- Event-driven, short tasks (<15 min), pay-per-invocation?
|   --> Lambda
|   (Max 15 min, 10GB RAM, 10GB ephemeral storage)
|
+-- Containers?
|   +-- Don't want to manage servers? --> Fargate (serverless containers)
|   +-- Need GPU / full control of hosts? --> ECS on EC2
|   +-- Already using Kubernetes? --> EKS
|   +-- Simple single-container app? --> App Runner
|
+-- Batch processing (HPC, rendering, genomics)?
|   --> AWS Batch (auto-provisions optimal compute)
|
+-- Lightweight web apps / APIs?
    +-- No container knowledge needed? --> Elastic Beanstalk
    +-- HTTP APIs with containers? --> App Runner`}</div>

        <h3 style={h3Style}><MessageSquare size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> Which Messaging / Integration?</h3>
        <div style={decisionBoxStyle}>{`Need messaging / decoupling?
|
+-- Queue (one consumer processes each message once)?
|   +-- Standard (at-least-once, best-effort order)? --> SQS Standard
|   +-- Exactly-once, strict order? --> SQS FIFO
|   +-- Need message > 256KB? --> S3 + SQS (Extended Client Library)
|
+-- Pub/Sub (fan-out to multiple subscribers)?
|   --> SNS (push-based, up to 12.5M subs/topic)
|   +-- Need to filter messages per subscriber? --> SNS Message Filtering
|
+-- Streaming (real-time, replay, multiple consumers)?
|   +-- Millions/sec, real-time analytics? --> Kinesis Data Streams
|   +-- Transform/deliver to S3/Redshift? --> Kinesis Firehose
|
+-- Event routing (react to AWS events, rule-based)?
|   --> EventBridge (scheduled events, SaaS integration, fine-grained rules)
|
+-- Workflow orchestration (coordinate steps)?
|   --> Step Functions (visual, error handling, retries)
|
+-- Legacy migration (RabbitMQ, ActiveMQ)?
    --> Amazon MQ`}</div>

        <h3 style={h3Style}><Globe size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> Which Caching Solution?</h3>
        <div style={decisionBoxStyle}>{`Need caching / acceleration?
|
+-- Static content at edge (images, CSS, JS, video)?
|   --> CloudFront (CDN, 400+ PoPs worldwide)
|
+-- Dynamic content, TCP/UDP, static IPs needed?
|   --> Global Accelerator (routes via AWS backbone, no caching)
|
+-- Application-level data caching (sessions, queries)?
|   +-- Complex data types, persistence, pub/sub? --> ElastiCache Redis
|   +-- Simple key-value, multi-threaded? --> ElastiCache Memcached
|
+-- DynamoDB reads specifically?
|   --> DAX (microsecond latency, write-through)
|
+-- API response caching?
    --> API Gateway caching (0.5GB - 237GB)`}</div>
      </div>

      {/* ===== SECTION 2: COMPARISON TABLES ===== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>
          <Layers size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="#ff9900" />
          Comparison Tables
        </h2>

        {/* Security Groups vs NACLs */}
        <h3 style={h3Style}><Shield size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> Security Groups vs NACLs</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Feature</th>
                <th style={thStyle}>Security Groups</th>
                <th style={thStyle}>NACLs</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Level</td><td style={tdStyle}>Instance (ENI)</td><td style={tdStyle}>Subnet</td></tr>
              <tr><td style={tdStyle}>State</td><td style={tdStyle}><span style={accentText}>Stateful</span> (return auto-allowed)</td><td style={tdStyle}><span style={accentText}>Stateless</span> (must allow return)</td></tr>
              <tr><td style={tdStyle}>Rules</td><td style={tdStyle}>ALLOW only</td><td style={tdStyle}>ALLOW + DENY</td></tr>
              <tr><td style={tdStyle}>Evaluation</td><td style={tdStyle}>All rules evaluated</td><td style={tdStyle}>Rules processed in order (lowest #)</td></tr>
              <tr><td style={tdStyle}>Default</td><td style={tdStyle}>Denies all inbound</td><td style={tdStyle}>Allows all in/out</td></tr>
              <tr><td style={tdStyle}>Use Case</td><td style={tdStyle}>Allow specific traffic</td><td style={tdStyle}>Block specific IPs/ranges</td></tr>
            </tbody>
          </table>
        </div>

        {/* ALB vs NLB vs CLB */}
        <h3 style={{ ...h3Style, marginTop: '1.5rem' }}><Network size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> ALB vs NLB vs CLB</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Feature</th>
                <th style={thStyle}>ALB</th>
                <th style={thStyle}>NLB</th>
                <th style={thStyle}>CLB (Legacy)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Layer</td><td style={tdStyle}>7 (HTTP/HTTPS)</td><td style={tdStyle}>4 (TCP/UDP/TLS)</td><td style={tdStyle}>4 + 7</td></tr>
              <tr><td style={tdStyle}>Performance</td><td style={tdStyle}>Good</td><td style={tdStyle}><span style={accentText}>Millions req/sec, ultra-low latency</span></td><td style={tdStyle}>Basic</td></tr>
              <tr><td style={tdStyle}>Static IP</td><td style={tdStyle}>No (use GA)</td><td style={tdStyle}>Yes (Elastic IP per AZ)</td><td style={tdStyle}>No</td></tr>
              <tr><td style={tdStyle}>Path Routing</td><td style={tdStyle}>Yes</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td></tr>
              <tr><td style={tdStyle}>Host Routing</td><td style={tdStyle}>Yes</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td></tr>
              <tr><td style={tdStyle}>WebSockets</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td><td style={tdStyle}>No</td></tr>
              <tr><td style={tdStyle}>Target Types</td><td style={tdStyle}>IP, Instance, Lambda</td><td style={tdStyle}>IP, Instance, ALB</td><td style={tdStyle}>Instance</td></tr>
              <tr><td style={tdStyle}>Use Case</td><td style={tdStyle}>HTTP microservices, containers</td><td style={tdStyle}>Gaming, IoT, static IPs</td><td style={tdStyle}>Legacy only</td></tr>
            </tbody>
          </table>
        </div>

        {/* S3 Storage Classes */}
        <h3 style={{ ...h3Style, marginTop: '1.5rem' }}><HardDrive size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> S3 Storage Classes</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Class</th>
                <th style={thStyle}>Durability</th>
                <th style={thStyle}>AZs</th>
                <th style={thStyle}>Retrieval</th>
                <th style={thStyle}>Min Duration</th>
                <th style={thStyle}>Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Standard</td><td style={tdStyle}>11 9s</td><td style={tdStyle}>3+</td><td style={tdStyle}>Instant</td><td style={tdStyle}>None</td><td style={tdStyle}>Frequent access</td></tr>
              <tr><td style={tdStyle}>Intelligent-Tiering</td><td style={tdStyle}>11 9s</td><td style={tdStyle}>3+</td><td style={tdStyle}>Instant</td><td style={tdStyle}>None</td><td style={tdStyle}>Unknown/changing patterns</td></tr>
              <tr><td style={tdStyle}>Standard-IA</td><td style={tdStyle}>11 9s</td><td style={tdStyle}>3+</td><td style={tdStyle}>Instant</td><td style={tdStyle}>30 days</td><td style={tdStyle}>Infrequent but instant need</td></tr>
              <tr><td style={tdStyle}>One Zone-IA</td><td style={tdStyle}>11 9s</td><td style={tdStyle}><span style={accentText}>1</span></td><td style={tdStyle}>Instant</td><td style={tdStyle}>30 days</td><td style={tdStyle}>Recreatable infrequent data</td></tr>
              <tr><td style={tdStyle}>Glacier Instant</td><td style={tdStyle}>11 9s</td><td style={tdStyle}>3+</td><td style={tdStyle}>Instant (ms)</td><td style={tdStyle}>90 days</td><td style={tdStyle}>Archive with instant access</td></tr>
              <tr><td style={tdStyle}>Glacier Flexible</td><td style={tdStyle}>11 9s</td><td style={tdStyle}>3+</td><td style={tdStyle}>1-5min to 5-12hr</td><td style={tdStyle}>90 days</td><td style={tdStyle}>Archive, flexible retrieval</td></tr>
              <tr><td style={tdStyle}>Glacier Deep Archive</td><td style={tdStyle}>11 9s</td><td style={tdStyle}>3+</td><td style={tdStyle}>12-48 hours</td><td style={tdStyle}>180 days</td><td style={tdStyle}>Compliance, 7-10yr retention</td></tr>
            </tbody>
          </table>
        </div>

        {/* RDS vs Aurora vs DynamoDB */}
        <h3 style={{ ...h3Style, marginTop: '1.5rem' }}><Database size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> RDS vs Aurora vs DynamoDB</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Feature</th>
                <th style={thStyle}>RDS</th>
                <th style={thStyle}>Aurora</th>
                <th style={thStyle}>DynamoDB</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Type</td><td style={tdStyle}>Relational</td><td style={tdStyle}>Relational (cloud-native)</td><td style={tdStyle}>NoSQL (key-value/document)</td></tr>
              <tr><td style={tdStyle}>Engines</td><td style={tdStyle}>MySQL, PostgreSQL, Oracle, SQL Server, MariaDB</td><td style={tdStyle}>MySQL, PostgreSQL</td><td style={tdStyle}>Proprietary</td></tr>
              <tr><td style={tdStyle}>Max Storage</td><td style={tdStyle}>64 TB</td><td style={tdStyle}>128 TB (auto-scaling)</td><td style={tdStyle}>Unlimited</td></tr>
              <tr><td style={tdStyle}>Read Replicas</td><td style={tdStyle}><span style={accentText}>5</span></td><td style={tdStyle}><span style={accentText}>15</span></td><td style={tdStyle}>Global Tables</td></tr>
              <tr><td style={tdStyle}>Multi-AZ</td><td style={tdStyle}>Standby (sync)</td><td style={tdStyle}>Built-in (6 copies, 3 AZs)</td><td style={tdStyle}>Built-in</td></tr>
              <tr><td style={tdStyle}>Serverless</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes (Aurora Serverless v2)</td><td style={tdStyle}>Yes (on-demand mode)</td></tr>
              <tr><td style={tdStyle}>Global</td><td style={tdStyle}>Cross-region replicas</td><td style={tdStyle}>Aurora Global Database (&lt;1s RPO)</td><td style={tdStyle}>Global Tables (active-active)</td></tr>
              <tr><td style={tdStyle}>Latency</td><td style={tdStyle}>Single-digit ms</td><td style={tdStyle}>Single-digit ms (5x faster writes)</td><td style={tdStyle}>Single-digit ms (microsec with DAX)</td></tr>
            </tbody>
          </table>
        </div>

        {/* SQS Standard vs FIFO */}
        <h3 style={{ ...h3Style, marginTop: '1.5rem' }}><MessageSquare size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> SQS Standard vs FIFO</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Feature</th>
                <th style={thStyle}>SQS Standard</th>
                <th style={thStyle}>SQS FIFO</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Throughput</td><td style={tdStyle}><span style={accentText}>Unlimited</span></td><td style={tdStyle}>300 msg/sec (3000 with batching)</td></tr>
              <tr><td style={tdStyle}>Ordering</td><td style={tdStyle}>Best-effort</td><td style={tdStyle}><span style={accentText}>Guaranteed (per group)</span></td></tr>
              <tr><td style={tdStyle}>Delivery</td><td style={tdStyle}>At-least-once (possible duplicates)</td><td style={tdStyle}>Exactly-once</td></tr>
              <tr><td style={tdStyle}>Deduplication</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes (5-min window)</td></tr>
              <tr><td style={tdStyle}>Name</td><td style={tdStyle}>Any name</td><td style={tdStyle}>Must end in .fifo</td></tr>
              <tr><td style={tdStyle}>Use Case</td><td style={tdStyle}>High throughput, order doesn't matter</td><td style={tdStyle}>Banking, orders, sequencing</td></tr>
            </tbody>
          </table>
        </div>

        {/* CloudFront vs Global Accelerator */}
        <h3 style={{ ...h3Style, marginTop: '1.5rem' }}><Globe size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> CloudFront vs Global Accelerator</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Feature</th>
                <th style={thStyle}>CloudFront</th>
                <th style={thStyle}>Global Accelerator</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Purpose</td><td style={tdStyle}><span style={accentText}>Content caching</span> at edge</td><td style={tdStyle}><span style={accentText}>Traffic routing</span> via AWS backbone</td></tr>
              <tr><td style={tdStyle}>Caching</td><td style={tdStyle}>Yes</td><td style={tdStyle}>No</td></tr>
              <tr><td style={tdStyle}>Protocols</td><td style={tdStyle}>HTTP/HTTPS/WebSocket</td><td style={tdStyle}>TCP/UDP</td></tr>
              <tr><td style={tdStyle}>Static IPs</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes (2 anycast IPs)</td></tr>
              <tr><td style={tdStyle}>Best For</td><td style={tdStyle}>Static content, APIs, websites</td><td style={tdStyle}>Gaming, VoIP, IoT, non-HTTP</td></tr>
              <tr><td style={tdStyle}>Failover</td><td style={tdStyle}>Origin failover</td><td style={tdStyle}>Endpoint health-based failover</td></tr>
              <tr><td style={tdStyle}>DDoS</td><td style={tdStyle}>AWS Shield Standard (free)</td><td style={tdStyle}>AWS Shield Standard (free)</td></tr>
            </tbody>
          </table>
        </div>

        {/* NAT Gateway vs NAT Instance */}
        <h3 style={{ ...h3Style, marginTop: '1.5rem' }}><Network size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> NAT Gateway vs NAT Instance</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Feature</th>
                <th style={thStyle}>NAT Gateway</th>
                <th style={thStyle}>NAT Instance</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Management</td><td style={tdStyle}><span style={accentText}>Managed by AWS</span></td><td style={tdStyle}>You manage (patching, scaling)</td></tr>
              <tr><td style={tdStyle}>Availability</td><td style={tdStyle}>HA in single AZ</td><td style={tdStyle}>Must script failover</td></tr>
              <tr><td style={tdStyle}>Bandwidth</td><td style={tdStyle}>Up to 100 Gbps</td><td style={tdStyle}>Depends on instance type</td></tr>
              <tr><td style={tdStyle}>Cost</td><td style={tdStyle}>Higher (hourly + data)</td><td style={tdStyle}>Lower (just EC2 cost)</td></tr>
              <tr><td style={tdStyle}>Security Groups</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes</td></tr>
              <tr><td style={tdStyle}>Bastion Host</td><td style={tdStyle}>No</td><td style={tdStyle}>Can be used as bastion</td></tr>
              <tr><td style={tdStyle}>Use Case</td><td style={tdStyle}>Production (recommended)</td><td style={tdStyle}>Dev/test, cost-sensitive</td></tr>
            </tbody>
          </table>
        </div>

        {/* Secrets Manager vs Parameter Store */}
        <h3 style={{ ...h3Style, marginTop: '1.5rem' }}><Key size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> Secrets Manager vs Parameter Store</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Feature</th>
                <th style={thStyle}>Secrets Manager</th>
                <th style={thStyle}>SSM Parameter Store</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Auto-Rotation</td><td style={tdStyle}><span style={accentText}>Built-in (Lambda-based)</span></td><td style={tdStyle}>No (must build custom)</td></tr>
              <tr><td style={tdStyle}>Cost</td><td style={tdStyle}>$0.40/secret/month + API calls</td><td style={tdStyle}>Free (Standard), $0.05/param (Advanced)</td></tr>
              <tr><td style={tdStyle}>Size Limit</td><td style={tdStyle}>64 KB</td><td style={tdStyle}>4 KB (Standard), 8 KB (Advanced)</td></tr>
              <tr><td style={tdStyle}>Cross-Account</td><td style={tdStyle}>Yes (resource policy)</td><td style={tdStyle}>No</td></tr>
              <tr><td style={tdStyle}>Versioning</td><td style={tdStyle}>Yes (staging labels)</td><td style={tdStyle}>Yes</td></tr>
              <tr><td style={tdStyle}>Hierarchy</td><td style={tdStyle}>No</td><td style={tdStyle}>Yes (/app/prod/db-password)</td></tr>
              <tr><td style={tdStyle}>Use Case</td><td style={tdStyle}>DB credentials, API keys (need rotation)</td><td style={tdStyle}>Config values, feature flags, non-secret params</td></tr>
            </tbody>
          </table>
        </div>

        {/* KMS vs CloudHSM */}
        <h3 style={{ ...h3Style, marginTop: '1.5rem' }}><Key size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> KMS vs CloudHSM</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Feature</th>
                <th style={thStyle}>KMS</th>
                <th style={thStyle}>CloudHSM</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Management</td><td style={tdStyle}>Shared (multi-tenant)</td><td style={tdStyle}><span style={accentText}>Dedicated hardware (single-tenant)</span></td></tr>
              <tr><td style={tdStyle}>Key Control</td><td style={tdStyle}>AWS manages HSM</td><td style={tdStyle}>You control HSM + keys</td></tr>
              <tr><td style={tdStyle}>Compliance</td><td style={tdStyle}>FIPS 140-2 Level 2</td><td style={tdStyle}><span style={accentText}>FIPS 140-2 Level 3</span></td></tr>
              <tr><td style={tdStyle}>Symmetric</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td></tr>
              <tr><td style={tdStyle}>Asymmetric</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td></tr>
              <tr><td style={tdStyle}>Integration</td><td style={tdStyle}>Deep AWS integration</td><td style={tdStyle}>Must integrate manually</td></tr>
              <tr><td style={tdStyle}>Cost</td><td style={tdStyle}>$1/key/month + API calls</td><td style={tdStyle}>~$1.50/hour per HSM</td></tr>
              <tr><td style={tdStyle}>Use Case</td><td style={tdStyle}>Most encryption needs</td><td style={tdStyle}>Regulatory (FIPS L3), Oracle TDE, custom keystores</td></tr>
            </tbody>
          </table>
        </div>

        {/* Direct Connect vs Site-to-Site VPN */}
        <h3 style={{ ...h3Style, marginTop: '1.5rem' }}><Network size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> Direct Connect vs Site-to-Site VPN</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Feature</th>
                <th style={thStyle}>Direct Connect</th>
                <th style={thStyle}>Site-to-Site VPN</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Connection</td><td style={tdStyle}><span style={accentText}>Dedicated physical fiber</span></td><td style={tdStyle}>Encrypted over public internet</td></tr>
              <tr><td style={tdStyle}>Setup Time</td><td style={tdStyle}>Weeks to months</td><td style={tdStyle}><span style={accentText}>Minutes</span></td></tr>
              <tr><td style={tdStyle}>Bandwidth</td><td style={tdStyle}>1 Gbps, 10 Gbps, 100 Gbps</td><td style={tdStyle}>Up to 1.25 Gbps per tunnel</td></tr>
              <tr><td style={tdStyle}>Latency</td><td style={tdStyle}>Consistent, low</td><td style={tdStyle}>Variable (internet-dependent)</td></tr>
              <tr><td style={tdStyle}>Encryption</td><td style={tdStyle}>Not by default (add MACsec)</td><td style={tdStyle}>IPsec encrypted</td></tr>
              <tr><td style={tdStyle}>Redundancy</td><td style={tdStyle}>Need 2 connections (2 locations)</td><td style={tdStyle}>2 tunnels per connection</td></tr>
              <tr><td style={tdStyle}>Cost</td><td style={tdStyle}>Higher (port hours + data out)</td><td style={tdStyle}>Lower (hourly + data transfer)</td></tr>
              <tr><td style={tdStyle}>Failover</td><td style={tdStyle}>Use VPN as backup</td><td style={tdStyle}>Built-in 2 tunnels</td></tr>
              <tr><td style={tdStyle}>Use Case</td><td style={tdStyle}>Large data transfer, hybrid, consistent network</td><td style={tdStyle}>Quick setup, backup, lower bandwidth needs</td></tr>
            </tbody>
          </table>
        </div>

        {/* EBS Types */}
        <h3 style={{ ...h3Style, marginTop: '1.5rem' }}><HardDrive size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> EBS Volume Types</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Max IOPS</th>
                <th style={thStyle}>Max Throughput</th>
                <th style={thStyle}>Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}><span style={accentText}>gp3</span></td><td style={tdStyle}>SSD</td><td style={tdStyle}>16,000</td><td style={tdStyle}>1,000 MB/s</td><td style={tdStyle}>General purpose (boot, dev, apps)</td></tr>
              <tr><td style={tdStyle}>gp2</td><td style={tdStyle}>SSD</td><td style={tdStyle}>16,000</td><td style={tdStyle}>250 MB/s</td><td style={tdStyle}>Legacy general purpose</td></tr>
              <tr><td style={tdStyle}><span style={accentText}>io2 Block Express</span></td><td style={tdStyle}>SSD</td><td style={tdStyle}>256,000</td><td style={tdStyle}>4,000 MB/s</td><td style={tdStyle}>Critical databases (Oracle, SAP)</td></tr>
              <tr><td style={tdStyle}>io2</td><td style={tdStyle}>SSD</td><td style={tdStyle}>64,000</td><td style={tdStyle}>1,000 MB/s</td><td style={tdStyle}>High-performance databases</td></tr>
              <tr><td style={tdStyle}><span style={accentText}>st1</span></td><td style={tdStyle}>HDD</td><td style={tdStyle}>500</td><td style={tdStyle}>500 MB/s</td><td style={tdStyle}>Big data, data warehouse, logs</td></tr>
              <tr><td style={tdStyle}><span style={accentText}>sc1</span></td><td style={tdStyle}>HDD</td><td style={tdStyle}>250</td><td style={tdStyle}>250 MB/s</td><td style={tdStyle}>Cold data, infrequent access</td></tr>
            </tbody>
          </table>
        </div>

        {/* Lambda vs Fargate vs EC2 */}
        <h3 style={{ ...h3Style, marginTop: '1.5rem' }}><Cpu size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> Lambda vs Fargate vs EC2</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Feature</th>
                <th style={thStyle}>Lambda</th>
                <th style={thStyle}>Fargate</th>
                <th style={thStyle}>EC2</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdStyle}>Max Duration</td><td style={tdStyle}>15 minutes</td><td style={tdStyle}>Unlimited</td><td style={tdStyle}>Unlimited</td></tr>
              <tr><td style={tdStyle}>Scaling</td><td style={tdStyle}>Auto (instant, per-request)</td><td style={tdStyle}>Auto (task-level)</td><td style={tdStyle}>Auto (ASG, minutes)</td></tr>
              <tr><td style={tdStyle}>Pricing</td><td style={tdStyle}>Per request + duration</td><td style={tdStyle}>Per vCPU + memory/sec</td><td style={tdStyle}>Per hour (or RI/SP/Spot)</td></tr>
              <tr><td style={tdStyle}>Cold Start</td><td style={tdStyle}><span style={accentText}>Yes (100ms-10s)</span></td><td style={tdStyle}>Task startup (~30-60s)</td><td style={tdStyle}>Minutes (boot)</td></tr>
              <tr><td style={tdStyle}>OS Access</td><td style={tdStyle}>No</td><td style={tdStyle}>Container only</td><td style={tdStyle}>Full root</td></tr>
              <tr><td style={tdStyle}>GPU</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td><td style={tdStyle}><span style={accentText}>Yes</span></td></tr>
              <tr><td style={tdStyle}>State</td><td style={tdStyle}>Stateless</td><td style={tdStyle}>Stateless (use EFS)</td><td style={tdStyle}>Stateful possible</td></tr>
              <tr><td style={tdStyle}>Ops Overhead</td><td style={tdStyle}>None</td><td style={tdStyle}>Low (container mgmt)</td><td style={tdStyle}>High (patching, AMI, etc.)</td></tr>
              <tr><td style={tdStyle}>Best For</td><td style={tdStyle}>Events, APIs, short tasks</td><td style={tdStyle}>Microservices, long containers</td><td style={tdStyle}>Legacy, GPU, full control</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== SECTION 3: KEY NUMBERS ===== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>
          <Zap size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="#ff9900" />
          Key Numbers to Memorize
        </h2>

        <h3 style={h3Style}>Lambda</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
          <span style={numberBoxStyle}><span style={accentText}>15 min</span> max timeout</span>
          <span style={numberBoxStyle}><span style={accentText}>10 GB</span> max memory</span>
          <span style={numberBoxStyle}><span style={accentText}>10 GB</span> ephemeral /tmp</span>
          <span style={numberBoxStyle}><span style={accentText}>1,000</span> concurrent (default, soft)</span>
          <span style={numberBoxStyle}><span style={accentText}>50 MB</span> deployment zip (250 MB unzipped)</span>
          <span style={numberBoxStyle}><span style={accentText}>6 MB</span> payload (sync) / 256 KB (async)</span>
          <span style={numberBoxStyle}><span style={accentText}>1M</span> free requests/month</span>
        </div>

        <h3 style={h3Style}>S3</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
          <span style={numberBoxStyle}><span style={accentText}>5 TB</span> max object size</span>
          <span style={numberBoxStyle}><span style={accentText}>5 GB</span> max single PUT</span>
          <span style={numberBoxStyle}><span style={accentText}>100 MB</span> use multipart above this</span>
          <span style={numberBoxStyle}><span style={accentText}>3,500</span> PUT/POST/DELETE per prefix/sec</span>
          <span style={numberBoxStyle}><span style={accentText}>5,500</span> GET/HEAD per prefix/sec</span>
          <span style={numberBoxStyle}><span style={accentText}>100</span> buckets per account (soft)</span>
          <span style={numberBoxStyle}><span style={accentText}>0 bytes</span> min object size</span>
          <span style={numberBoxStyle}><span style={accentText}>11 9s</span> durability (99.999999999%)</span>
          <span style={numberBoxStyle}><span style={accentText}>Strong</span> read-after-write consistency</span>
        </div>

        <h3 style={h3Style}>SQS</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
          <span style={numberBoxStyle}><span style={accentText}>256 KB</span> max message size</span>
          <span style={numberBoxStyle}><span style={accentText}>14 days</span> max retention</span>
          <span style={numberBoxStyle}><span style={accentText}>4 days</span> default retention</span>
          <span style={numberBoxStyle}><span style={accentText}>12 hours</span> max visibility timeout</span>
          <span style={numberBoxStyle}><span style={accentText}>30 sec</span> default visibility timeout</span>
          <span style={numberBoxStyle}><span style={accentText}>300</span> msg/sec FIFO (3,000 batch)</span>
          <span style={numberBoxStyle}><span style={accentText}>120,000</span> inflight messages (Standard)</span>
          <span style={numberBoxStyle}><span style={accentText}>20,000</span> inflight messages (FIFO)</span>
        </div>

        <h3 style={h3Style}>EBS</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
          <span style={numberBoxStyle}><span style={accentText}>gp3:</span> 3,000 baseline IOPS (up to 16,000)</span>
          <span style={numberBoxStyle}><span style={accentText}>io2:</span> 64,000 IOPS (256K Block Express)</span>
          <span style={numberBoxStyle}><span style={accentText}>st1:</span> 500 IOPS, 500 MB/s throughput</span>
          <span style={numberBoxStyle}><span style={accentText}>sc1:</span> 250 IOPS, 250 MB/s throughput</span>
          <span style={numberBoxStyle}><span style={accentText}>16 TB</span> max volume size</span>
          <span style={numberBoxStyle}><span style={accentText}>gp3:</span> 125 MB/s baseline (up to 1,000)</span>
        </div>

        <h3 style={h3Style}>RDS / Aurora</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
          <span style={numberBoxStyle}><span style={accentText}>RDS:</span> 5 Read Replicas max</span>
          <span style={numberBoxStyle}><span style={accentText}>Aurora:</span> 15 Read Replicas</span>
          <span style={numberBoxStyle}><span style={accentText}>Aurora:</span> 6 copies across 3 AZs</span>
          <span style={numberBoxStyle}><span style={accentText}>Aurora:</span> 128 TB max storage</span>
          <span style={numberBoxStyle}><span style={accentText}>RDS:</span> 64 TB max (most engines)</span>
          <span style={numberBoxStyle}><span style={accentText}>Aurora:</span> &lt;100ms replication lag</span>
          <span style={numberBoxStyle}><span style={accentText}>RDS:</span> seconds replication lag</span>
          <span style={numberBoxStyle}><span style={accentText}>Aurora Global:</span> &lt;1 sec cross-region RPO</span>
          <span style={numberBoxStyle}><span style={accentText}>35 days</span> max automated backup retention</span>
        </div>

        <h3 style={h3Style}>VPC / Networking</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
          <span style={numberBoxStyle}><span style={accentText}>5</span> VPCs per region (soft)</span>
          <span style={numberBoxStyle}><span style={accentText}>200</span> subnets per VPC</span>
          <span style={numberBoxStyle}><span style={accentText}>5</span> Elastic IPs per region (soft)</span>
          <span style={numberBoxStyle}><span style={accentText}>5</span> Security Groups per ENI</span>
          <span style={numberBoxStyle}><span style={accentText}>60</span> inbound + 60 outbound rules per SG</span>
          <span style={numberBoxStyle}><span style={accentText}>200</span> route tables per VPC</span>
          <span style={numberBoxStyle}><span style={accentText}>/16</span> largest VPC CIDR</span>
          <span style={numberBoxStyle}><span style={accentText}>/28</span> smallest VPC CIDR</span>
          <span style={numberBoxStyle}><span style={accentText}>5</span> CIDR blocks per VPC</span>
        </div>

        <h3 style={h3Style}>DynamoDB</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
          <span style={numberBoxStyle}><span style={accentText}>400 KB</span> max item size</span>
          <span style={numberBoxStyle}><span style={accentText}>1 MB</span> max query/scan response</span>
          <span style={numberBoxStyle}><span style={accentText}>25</span> GSIs per table</span>
          <span style={numberBoxStyle}><span style={accentText}>20</span> LSIs per table (create at table creation)</span>
          <span style={numberBoxStyle}><span style={accentText}>1 RCU</span> = 1 strong read (4KB) or 2 eventual</span>
          <span style={numberBoxStyle}><span style={accentText}>1 WCU</span> = 1 write (1KB) per second</span>
          <span style={numberBoxStyle}><span style={accentText}>5 min</span> TTL delete delay</span>
        </div>

        <h3 style={h3Style}>CloudFront / Edge</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
          <span style={numberBoxStyle}><span style={accentText}>400+</span> edge locations (PoPs)</span>
          <span style={numberBoxStyle}><span style={accentText}>0-31536000</span> sec TTL (default 24hr)</span>
          <span style={numberBoxStyle}><span style={accentText}>30 GB</span> max single file via CF</span>
          <span style={numberBoxStyle}><span style={accentText}>25</span> origins per distribution</span>
          <span style={numberBoxStyle}><span style={accentText}>Lambda@Edge:</span> 5 sec (viewer), 30 sec (origin)</span>
          <span style={numberBoxStyle}><span style={accentText}>CloudFront Functions:</span> &lt;1 ms, viewer events only</span>
        </div>

        <h3 style={h3Style}>Auto Scaling / ELB</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
          <span style={numberBoxStyle}><span style={accentText}>300 sec</span> default cooldown period</span>
          <span style={numberBoxStyle}><span style={accentText}>ALB:</span> cross-zone enabled by default</span>
          <span style={numberBoxStyle}><span style={accentText}>NLB:</span> cross-zone disabled by default</span>
          <span style={numberBoxStyle}><span style={accentText}>ALB:</span> 1 min minimum health check interval</span>
          <span style={numberBoxStyle}><span style={accentText}>NLB:</span> supports Elastic IP per AZ</span>
          <span style={numberBoxStyle}><span style={accentText}>Target Tracking:</span> maintains metric at target value</span>
        </div>
      </div>

      {/* ===== SECTION 4: ACRONYMS ===== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>
          <BookOpen size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="#ff9900" />
          Acronyms and Abbreviations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.5rem' }}>
          {[
            ['VPC', 'Virtual Private Cloud'],
            ['CIDR', 'Classless Inter-Domain Routing'],
            ['NACL', 'Network Access Control List'],
            ['IGW', 'Internet Gateway'],
            ['NAT', 'Network Address Translation'],
            ['ENI', 'Elastic Network Interface'],
            ['EIP', 'Elastic IP Address'],
            ['ALB', 'Application Load Balancer'],
            ['NLB', 'Network Load Balancer'],
            ['ASG', 'Auto Scaling Group'],
            ['AMI', 'Amazon Machine Image'],
            ['EBS', 'Elastic Block Store'],
            ['EFS', 'Elastic File System'],
            ['S3', 'Simple Storage Service'],
            ['RDS', 'Relational Database Service'],
            ['DMS', 'Database Migration Service'],
            ['SCT', 'Schema Conversion Tool'],
            ['DAX', 'DynamoDB Accelerator'],
            ['GSI', 'Global Secondary Index'],
            ['LSI', 'Local Secondary Index'],
            ['RCU', 'Read Capacity Unit'],
            ['WCU', 'Write Capacity Unit'],
            ['SQS', 'Simple Queue Service'],
            ['SNS', 'Simple Notification Service'],
            ['SES', 'Simple Email Service'],
            ['SWF', 'Simple Workflow Service'],
            ['IAM', 'Identity and Access Management'],
            ['STS', 'Security Token Service'],
            ['MFA', 'Multi-Factor Authentication'],
            ['SCP', 'Service Control Policy'],
            ['CMK', 'Customer Master Key'],
            ['KMS', 'Key Management Service'],
            ['HSM', 'Hardware Security Module'],
            ['ACM', 'AWS Certificate Manager'],
            ['WAF', 'Web Application Firewall'],
            ['OAC', 'Origin Access Control'],
            ['OAI', 'Origin Access Identity (legacy)'],
            ['CDN', 'Content Delivery Network'],
            ['PoP', 'Point of Presence'],
            ['AZ', 'Availability Zone'],
            ['ARN', 'Amazon Resource Name'],
            ['SDK', 'Software Development Kit'],
            ['CLI', 'Command Line Interface'],
            ['HA', 'High Availability'],
            ['DR', 'Disaster Recovery'],
            ['RTO', 'Recovery Time Objective'],
            ['RPO', 'Recovery Point Objective'],
            ['IOPS', 'Input/Output Operations Per Second'],
            ['MPP', 'Massively Parallel Processing'],
            ['ETL', 'Extract, Transform, Load'],
            ['OLAP', 'Online Analytical Processing'],
            ['OLTP', 'Online Transaction Processing'],
            ['TTL', 'Time To Live'],
            ['FIFO', 'First In, First Out'],
            ['DLQ', 'Dead Letter Queue'],
            ['SSE', 'Server-Side Encryption'],
            ['TLS', 'Transport Layer Security'],
            ['SSL', 'Secure Sockets Layer'],
            ['IPsec', 'Internet Protocol Security'],
            ['BGP', 'Border Gateway Protocol'],
            ['DNS', 'Domain Name System'],
            ['CNAME', 'Canonical Name Record'],
            ['ECS', 'Elastic Container Service'],
            ['EKS', 'Elastic Kubernetes Service'],
            ['ECR', 'Elastic Container Registry'],
            ['EMR', 'Elastic MapReduce'],
            ['SNS', 'Simple Notification Service'],
            ['PITR', 'Point-In-Time Recovery'],
            ['RI', 'Reserved Instance'],
            ['SP', 'Savings Plan'],
          ].map(([abbr, full], i) => (
            <div key={i} style={{ padding: '0.4rem 0.75rem', background: 'rgba(255,153,0,0.03)', borderRadius: '6px', borderLeft: '3px solid rgba(255,153,0,0.3)' }}>
              <span style={accentText}>{abbr}</span>
              <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem', fontSize: '0.85rem' }}>{full}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== QUICK REFERENCE FOOTER ===== */}
      <div style={{ ...sectionStyle, background: 'rgba(255,153,0,0.05)', borderColor: 'rgba(255,153,0,0.3)' }}>
        <h2 style={h2Style}>
          <DollarSign size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="#ff9900" />
          Quick Cost Optimization Rules
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <div><span style={accentText}>Steady 24/7 workload:</span> Reserved Instances or Savings Plans (up to 72% savings)</div>
          <div><span style={accentText}>Fault-tolerant batch:</span> Spot Instances (up to 90% savings)</div>
          <div><span style={accentText}>Unpredictable traffic:</span> Auto Scaling + On-Demand or Fargate</div>
          <div><span style={accentText}>Data archival:</span> S3 Lifecycle policies to Glacier/Deep Archive</div>
          <div><span style={accentText}>Unused resources:</span> Trusted Advisor + Cost Explorer + AWS Budgets</div>
          <div><span style={accentText}>Right-sizing:</span> AWS Compute Optimizer recommendations</div>
          <div><span style={accentText}>Data transfer:</span> VPC endpoints (free for S3/DynamoDB), CloudFront reduces origin fetches</div>
          <div><span style={accentText}>Multi-AZ vs cost:</span> Only pay for HA you need. Dev/test = single AZ fine</div>
          <div><span style={accentText}>Lambda vs Fargate:</span> Lambda cheaper for sporadic, Fargate cheaper for sustained</div>
          <div><span style={accentText}>Storage optimization:</span> S3 Intelligent-Tiering when access pattern is unknown</div>
        </div>
      </div>
    </div>
  )
}
