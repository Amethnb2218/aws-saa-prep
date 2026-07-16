import { useState } from 'react'

const categories = [
  {
    name: 'Compute', color: '#ff9900',
    services: [
      { name: 'EC2', desc: 'Virtual servers in the cloud. Choose instance type, OS, storage. Full control over the server.' },
      { name: 'Lambda', desc: 'Serverless compute. Run code without provisioning servers. Max 15 min execution, 10GB RAM. Pay per invocation.' },
      { name: 'ECS', desc: 'Container orchestration for Docker. Run on EC2 or Fargate (serverless containers).' },
      { name: 'EKS', desc: 'Managed Kubernetes. For teams already using Kubernetes.' },
      { name: 'Fargate', desc: 'Serverless compute for containers (ECS/EKS). No EC2 management needed.' },
      { name: 'Auto Scaling', desc: 'Automatically adjust EC2 capacity based on demand. Uses launch templates and scaling policies.' },
      { name: 'Elastic Beanstalk', desc: 'PaaS — deploy apps without managing infrastructure. Handles capacity, load balancing, scaling.' },
    ]
  },
  {
    name: 'Storage', color: '#4caf50',
    services: [
      { name: 'S3', desc: 'Object storage. Unlimited storage, 11 nines durability. Storage classes from Standard to Glacier Deep Archive.' },
      { name: 'EBS', desc: 'Block storage for EC2. Types: gp3 (general), io2 (high IOPS), st1 (throughput), sc1 (cold). Attached to ONE instance.' },
      { name: 'EFS', desc: 'Network file system (NFS). Shared across multiple EC2 instances. Auto-scaling. Linux only.' },
      { name: 'FSx', desc: 'Managed file systems. FSx for Windows (SMB), FSx for Lustre (HPC), FSx for NetApp ONTAP.' },
      { name: 'Storage Gateway', desc: 'Hybrid storage. Connect on-premises to AWS storage. Types: File, Volume, Tape.' },
      { name: 'Snow Family', desc: 'Physical data transfer. Snowcone (8TB), Snowball Edge (80TB), Snowmobile (100PB).' },
    ]
  },
  {
    name: 'Database', color: '#9c27b0',
    services: [
      { name: 'RDS', desc: 'Managed relational DB. MySQL, PostgreSQL, MariaDB, Oracle, SQL Server. Multi-AZ, Read Replicas, automated backups.' },
      { name: 'Aurora', desc: 'AWS-built relational DB. 5x MySQL / 3x PostgreSQL performance. 6 copies across 3 AZs. Aurora Serverless available.' },
      { name: 'DynamoDB', desc: 'Serverless NoSQL. Key-value + document. Single-digit ms latency. Global Tables for multi-region. DAX for caching.' },
      { name: 'ElastiCache', desc: 'In-memory cache. Redis (persistence, replication, complex data) vs Memcached (simple, multi-threaded).' },
      { name: 'Redshift', desc: 'Data warehouse. Columnar storage, MPP. For BI/analytics on petabytes. Not for transactional workloads.' },
      { name: 'Neptune', desc: 'Graph database. For social networks, recommendation engines, fraud detection.' },
      { name: 'DocumentDB', desc: 'MongoDB-compatible document database. Managed by AWS.' },
    ]
  },
  {
    name: 'Networking', color: '#2196f3',
    services: [
      { name: 'VPC', desc: 'Virtual private network in AWS. Subnets, route tables, gateways. Foundation of networking.' },
      { name: 'CloudFront', desc: 'CDN. 400+ edge locations. Caches content close to users. Supports static & dynamic content.' },
      { name: 'Route 53', desc: 'DNS service. Routing policies: Simple, Weighted, Latency, Failover, Geolocation, Multi-Value.' },
      { name: 'Global Accelerator', desc: 'Routes traffic through AWS backbone for lower latency. Static IPs. TCP/UDP optimization.' },
      { name: 'Direct Connect', desc: 'Dedicated private connection from on-premises to AWS. 1Gbps or 10Gbps. Not over internet.' },
      { name: 'Transit Gateway', desc: 'Hub to connect multiple VPCs and on-premises networks. Simplifies complex network topologies.' },
      { name: 'API Gateway', desc: 'Managed REST/WebSocket APIs. Integrates with Lambda, EC2, other services. Throttling, caching, auth.' },
    ]
  },
  {
    name: 'Security', color: '#e91e63',
    services: [
      { name: 'IAM', desc: 'Identity management. Users, Groups, Roles, Policies. Principle of least privilege. Free service.' },
      { name: 'KMS', desc: 'Key Management Service. Create and manage encryption keys. Envelope encryption. Integrated with most AWS services.' },
      { name: 'WAF', desc: 'Web Application Firewall. Protects against SQL injection, XSS, bot traffic. Works with ALB, CloudFront, API Gateway.' },
      { name: 'Shield', desc: 'DDoS protection. Standard (free, layer 3/4) vs Advanced ($3000/mo, layer 7, DDoS Response Team).' },
      { name: 'GuardDuty', desc: 'Threat detection. ML-based analysis of CloudTrail, VPC Flow Logs, DNS logs. Detects compromised accounts.' },
      { name: 'Secrets Manager', desc: 'Store and rotate secrets (DB credentials, API keys). Auto-rotation with Lambda.' },
      { name: 'ACM', desc: 'Certificate Manager. Free SSL/TLS certificates. Auto-renewal. For ALB, CloudFront, API Gateway.' },
    ]
  },
  {
    name: 'Monitoring & Management', color: '#607d8b',
    services: [
      { name: 'CloudWatch', desc: 'Monitoring. Metrics, Alarms, Logs, Dashboards. Custom metrics. Trigger Auto Scaling actions.' },
      { name: 'CloudTrail', desc: 'API audit log. WHO did WHAT, WHEN. Every API call recorded. Governance, compliance, security.' },
      { name: 'Config', desc: 'Configuration compliance. Track resource configurations over time. Rules to evaluate compliance.' },
      { name: 'Systems Manager', desc: 'Manage EC2 fleet. Patch management, run commands, parameter store, session manager (no SSH needed).' },
      { name: 'CloudFormation', desc: 'Infrastructure as Code. YAML/JSON templates. Create, update, delete stacks of resources.' },
      { name: 'Trusted Advisor', desc: 'Best practice recommendations: cost, performance, security, fault tolerance, service limits.' },
    ]
  },
]

export default function Services() {
  const [filter, setFilter] = useState('')

  const filtered = categories.map(cat => ({
    ...cat,
    services: cat.services.filter(s =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.desc.toLowerCase().includes(filter.toLowerCase())
    )
  })).filter(cat => cat.services.length > 0)

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>AWS Services Guide</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Key services you need to know for SAA-C03</p>

      <input
        type="text" placeholder="Search services..." value={filter} onChange={e => setFilter(e.target.value)}
        style={{
          width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '2rem',
          background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)',
          fontSize: '1rem', outline: 'none'
        }}
      />

      {filtered.map(cat => (
        <div key={cat.name} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: cat.color, marginBottom: '0.75rem' }}>{cat.name}</h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {cat.services.map(s => (
              <div key={s.name} style={{
                background: 'var(--bg-card)', borderRadius: '12px', padding: '1rem 1.25rem',
                border: '1px solid var(--border)'
              }}>
                <span style={{ fontWeight: 700, color: cat.color }}>{s.name}</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.75rem', fontSize: '0.9rem' }}>— {s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
