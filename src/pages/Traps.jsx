import { AlertTriangle } from 'lucide-react'

const traps = [
  {
    category: 'Trick Wording',
    items: [
      { trap: '"MOST cost-effective" vs "MOST available"', tip: 'These pull you in opposite directions. Cost-effective = cheapest that works. Most available = Multi-AZ/Multi-Region regardless of cost. Read which one they ask for!' },
      { trap: '"LEAST operational overhead"', tip: 'This means MANAGED/SERVERLESS services. Lambda > EC2. Fargate > ECS on EC2. Aurora Serverless > RDS. DynamoDB > self-managed database.' },
      { trap: '"With MINIMAL changes to the application"', tip: 'They want a Lift-and-Shift or small modification. Don\'t choose a complete re-architecture. EC2 migration is less change than converting to Lambda.' },
      { trap: '"Durable" vs "Available"', tip: 'Durable = data won\'t be lost (S3 = 11 nines durability). Available = accessible when needed (S3 = 4 nines availability). A system can be durable but temporarily unavailable.' },
    ]
  },
  {
    category: 'Common Confusions',
    items: [
      { trap: 'Security Groups vs NACLs', tip: 'SG = stateful (return traffic auto-allowed), instance-level, ALLOW only. NACL = stateless (must allow return traffic explicitly), subnet-level, ALLOW + DENY. If they mention "deny a specific IP" → NACL.' },
      { trap: 'SQS vs SNS vs Kinesis', tip: 'SQS = queue (one consumer deletes message). SNS = pub/sub (fan-out to many). Kinesis = streaming (multiple consumers replay data). Real-time analytics → Kinesis. Decoupling → SQS. Notifications → SNS.' },
      { trap: 'CloudFront vs Global Accelerator', tip: 'CloudFront = caches CONTENT at edge. GA = routes TRAFFIC through AWS network (no caching). Static content → CloudFront. TCP/UDP apps, gaming, static IPs → GA.' },
      { trap: 'Multi-AZ vs Read Replicas', tip: 'Multi-AZ = HIGH AVAILABILITY (failover, same data). Read Replica = READ SCALING (async, can have lag). Multi-AZ does NOT improve read performance!' },
      { trap: 'S3 Standard-IA vs One Zone-IA', tip: 'Standard-IA = 3 AZs, good for important infrequent data. One Zone-IA = 1 AZ only, cheaper but data lost if AZ fails. For data that can be recreated → One Zone-IA.' },
      { trap: 'Secrets Manager vs Parameter Store', tip: 'Secrets Manager = auto-rotation, $0.40/secret/month. Parameter Store = free tier, no auto-rotation (without Lambda). If they mention "rotation" → Secrets Manager.' },
    ]
  },
  {
    category: 'Elimination Tactics',
    items: [
      { trap: 'Answers with "single AZ" for HA requirements', tip: 'If the question asks for high availability, ANY answer mentioning a single AZ is immediately wrong. HA always means Multi-AZ minimum.' },
      { trap: '"Store access keys in code/config"', tip: 'NEVER correct. Always use IAM Roles for EC2/Lambda/ECS. Roles provide temporary, auto-rotated credentials. Eliminate this answer immediately.' },
      { trap: '"Make the S3 bucket public"', tip: 'Almost NEVER the answer. Use pre-signed URLs, CloudFront with OAC, or VPC endpoints instead. Public buckets are a security anti-pattern.' },
      { trap: '"Use the root account"', tip: 'ALWAYS wrong. Root should only be used for initial setup and billing. Everything else should use IAM users/roles with least privilege.' },
      { trap: 'Answers that are technically correct but overly complex', tip: 'AWS prefers the simplest solution that meets ALL requirements. If one answer uses 2 services and another uses 5 services for the same outcome, the simpler one is usually correct.' },
    ]
  },
  {
    category: 'Key Numbers to Remember',
    items: [
      { trap: 'Lambda: 15 min max, 10GB RAM, 1000 concurrent (soft limit)', tip: 'If processing takes > 15 minutes → can\'t use Lambda. Consider ECS/Fargate or Step Functions to chain Lambdas.' },
      { trap: 'SQS: 256KB message, 14 days retention, 12h visibility timeout max', tip: 'For messages > 256KB → store in S3, send reference in SQS. Default retention is 4 days.' },
      { trap: 'S3: 5TB max object, 5GB max single PUT, 100 buckets per account (soft limit)', tip: 'For files > 5GB → must use multipart upload. Recommended for files > 100MB.' },
      { trap: 'EBS io2: 64,000 IOPS max. gp3: 16,000 IOPS. Instance store: highest IOPS but ephemeral', tip: 'If they need > 64,000 IOPS → use instance store (ephemeral) or io2 Block Express (256,000 IOPS on Nitro instances).' },
      { trap: 'RDS: 5 Read Replicas max. Aurora: 15 Read Replicas', tip: 'If they need more than 5 read replicas → Aurora. Aurora also has faster replication lag (usually < 100ms vs seconds for RDS).' },
    ]
  }
]

export default function Traps() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        <AlertTriangle size={28} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="#ff9900" />
        Exam Traps & Tips
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Common tricks in SAA-C03 questions. Learn these patterns to avoid losing easy points.
      </p>

      {traps.map((cat, ci) => (
        <div key={ci} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ff9900', marginBottom: '1rem' }}>{cat.category}</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {cat.items.map((item, i) => (
              <div key={i} style={{
                background: 'var(--bg-card)', borderRadius: '12px', padding: '1.25rem',
                border: '1px solid var(--border)', borderLeft: '4px solid rgba(255,153,0,0.5)'
              }}>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#ff9900' }}>{item.trap}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.tip}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
