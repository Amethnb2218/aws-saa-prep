import { useState } from 'react'
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'

const cards = [
  { front: 'What is the difference between Security Groups and NACLs?', back: 'Security Groups: STATEFUL, instance-level, ALLOW rules only.\nNACLs: STATELESS, subnet-level, ALLOW + DENY rules.\nSecurity Groups evaluate all rules; NACLs process rules in order.' },
  { front: 'RDS Multi-AZ vs Read Replicas?', back: 'Multi-AZ: Synchronous replication to standby. For HIGH AVAILABILITY (automatic failover). Same region only.\nRead Replicas: Asynchronous replication. For READ SCALING. Can be cross-region. Can be promoted to standalone DB.' },
  { front: 'ALB vs NLB — when to use which?', back: 'ALB (Layer 7): HTTP/HTTPS, path-based routing, host-based routing, WebSocket. Best for web apps.\nNLB (Layer 4): TCP/UDP, ultra-low latency, millions of requests/sec, static IP. Best for gaming, IoT, real-time.' },
  { front: 'S3 Storage Classes — cheapest to most expensive?', back: 'Glacier Deep Archive < Glacier Flexible < Glacier Instant < One Zone-IA < Standard-IA < Intelligent-Tiering < Standard.\nRetrieval: Deep Archive (12-48h), Flexible (1-12h), Instant (ms), IA (ms but retrieval fee).' },
  { front: 'SQS Standard vs FIFO?', back: 'Standard: Unlimited throughput, at-least-once delivery, best-effort ordering.\nFIFO: 300 msg/s (3000 with batching), exactly-once, strict ordering.\nUse FIFO when order matters (e.g., financial transactions).' },
  { front: 'CloudFront vs Global Accelerator?', back: 'CloudFront: CDN, caches content at edge, best for static content delivery.\nGlobal Accelerator: Routes traffic through AWS backbone, static IPs, best for TCP/UDP apps needing low latency (gaming, IoT). No caching.' },
  { front: 'What is Envelope Encryption?', back: 'Encrypt data with a Data Key, then encrypt the Data Key with a Master Key (CMK in KMS).\nWhy? You can\'t send large data to KMS (4KB limit). So KMS generates a data key, you encrypt locally, then store encrypted data + encrypted data key together.' },
  { front: 'VPC Endpoints — Gateway vs Interface?', back: 'Gateway Endpoint: FREE, only for S3 and DynamoDB. Route table entry, stays within AWS network.\nInterface Endpoint: Costs money (ENI + hourly + data). For all other AWS services. Uses PrivateLink.' },
  { front: 'RPO vs RTO?', back: 'RPO (Recovery Point Objective): Maximum acceptable DATA LOSS (time between last backup and failure).\nRTO (Recovery Time Objective): Maximum acceptable DOWNTIME (time to restore service).\nLower RPO/RTO = more expensive DR solution.' },
  { front: 'When to use Kinesis vs SQS?', back: 'Kinesis: Real-time streaming, multiple consumers read same data, order guaranteed per shard, data replay possible.\nSQS: Message queue, single consumer per message, no replay, simpler. Use SQS for decoupling; Kinesis for real-time analytics.' },
  { front: 'EC2 Placement Groups — 3 types?', back: 'Cluster: Same rack, lowest latency, highest throughput (HPC). Risk: rack failure = all fail.\nSpread: Different racks, max 7 per AZ. For critical instances that must be isolated.\nPartition: Groups of instances on separate racks. For HDFS, HBase, Cassandra.' },
  { front: 'What is AWS Transit Gateway?', back: 'Hub-and-spoke model to connect multiple VPCs and on-premises networks. Replaces complex VPC Peering mesh.\nSupports: VPC peering, VPN, Direct Connect. Simplifies routing with one central gateway.' },
  { front: 'Aurora Global Database vs DynamoDB Global Tables?', back: 'Aurora Global: 1 primary region (read/write) + up to 5 secondary regions (read only). RPO ~1 second. Promote secondary in disaster.\nDynamoDB Global Tables: Active-active in all regions. Read/write anywhere. Eventual consistency across regions.' },
  { front: 'NAT Gateway vs NAT Instance?', back: 'NAT Gateway: Managed by AWS, highly available in AZ, scales to 45 Gbps, no Security Groups.\nNAT Instance: Self-managed EC2, single point of failure, limited bandwidth, has Security Groups.\nAlways prefer NAT Gateway (exam answer).' },
  { front: 'What are the 4 DR strategies (cheapest to most expensive)?', back: '1. Backup & Restore: Cheapest. High RTO (hours). Restore from backups.\n2. Pilot Light: Core DB running. Scale up in disaster (minutes-hours).\n3. Warm Standby: Scaled-down full copy running. Scale up quickly (minutes).\n4. Multi-Site Active-Active: Most expensive. Near-zero RTO/RPO.' },
  { front: 'AWS Organizations — SCPs vs IAM Policies?', back: 'SCPs: Set MAXIMUM permissions for accounts/OUs. Don\'t grant permissions, only restrict. Apply to entire account including root.\nIAM Policies: Grant actual permissions to users/roles/groups. Effective permissions = SCP ∩ IAM Policy.' },
]

export default function Flashcards() {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const next = () => { setCurrent((current + 1) % cards.length); setFlipped(false) }
  const prev = () => { setCurrent((current - 1 + cards.length) % cards.length); setFlipped(false) }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Flashcards</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Click the card to flip. Master these key comparisons for the exam.</p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>{current + 1} / {cards.length}</span>
      </div>

      <div onClick={() => setFlipped(!flipped)} style={{
        background: flipped ? 'rgba(255,153,0,0.05)' : 'var(--bg-card)',
        borderRadius: '20px', padding: '3rem 2rem', minHeight: '300px',
        border: `2px solid ${flipped ? 'rgba(255,153,0,0.3)' : 'var(--border)'}`,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', transition: 'all 0.3s', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          {flipped ? 'ANSWER' : 'QUESTION'} — Click to flip
        </div>
        <div style={{ fontSize: flipped ? '0.95rem' : '1.2rem', lineHeight: 1.8, whiteSpace: 'pre-line', color: 'var(--text-primary)' }}>
          {flipped ? cards[current].back : cards[current].front}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
        <button onClick={prev} style={{
          display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.75rem 1.5rem',
          borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-card)',
          color: 'var(--text-primary)', cursor: 'pointer'
        }}><ChevronLeft size={18} /> Previous</button>
        <button onClick={() => setFlipped(!flipped)} style={{
          display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.75rem 1.5rem',
          borderRadius: '10px', border: 'none', background: 'rgba(255,153,0,0.15)',
          color: '#ff9900', cursor: 'pointer', fontWeight: 600
        }}><RotateCcw size={18} /> Flip</button>
        <button onClick={next} style={{
          display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.75rem 1.5rem',
          borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #ff9900, #ec7211)',
          color: '#0f1b2d', cursor: 'pointer', fontWeight: 700
        }}>Next <ChevronRight size={18} /></button>
      </div>
    </div>
  )
}
