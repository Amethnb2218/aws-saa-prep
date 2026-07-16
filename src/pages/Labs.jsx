import { useState } from 'react'
import { FlaskConical, ChevronDown, ChevronUp, CheckSquare, Lightbulb } from 'lucide-react'

const architectureScenarios = [
  {
    title: '3-Tier E-Commerce Application',
    difficulty: 'Medium',
    requirements: 'Design a highly available e-commerce platform serving 100,000 concurrent users. Must handle Black Friday traffic spikes (10x normal), store product images, maintain user sessions, and process payments securely. Budget: moderate.',
    constraints: ['99.9% availability', 'Sub-200ms response time', 'PCI-DSS compliance for payments', 'Global user base', 'Survive AZ failure'],
    solution: {
      architecture: [
        'Route 53 → CloudFront (static assets from S3 + dynamic from ALB)',
        'ALB → Auto Scaling Group (EC2 or Fargate) across 3 AZs',
        'ElastiCache Redis for session storage + product catalog caching',
        'Aurora MySQL Multi-AZ for orders/users (Read Replicas for read scaling)',
        'S3 for product images (served via CloudFront)',
        'SQS for order processing queue (decouple checkout from fulfillment)',
        'WAF on CloudFront + ALB for PCI-DSS protection',
        'KMS for encryption of sensitive data at rest',
      ],
      whyThisWorks: 'CloudFront handles global delivery + DDoS protection. ALB + ASG handles traffic spikes automatically. ElastiCache eliminates session loss across instances. Aurora provides database HA. SQS ensures no orders are lost during peak.',
      keyDecisions: [
        'Aurora over RDS MySQL: 5x performance, 15 Read Replicas, faster failover',
        'ElastiCache over DynamoDB for sessions: sub-ms latency for session reads',
        'SQS for orders: decouples checkout (fast) from processing (slow)',
        'CloudFront over direct ALB: reduces origin load by 80%+, improves global latency',
      ]
    }
  },
  {
    title: 'Real-Time IoT Data Pipeline',
    difficulty: 'Hard',
    requirements: 'A manufacturing company has 50,000 IoT sensors sending data every second. They need real-time anomaly detection, a data lake for historical analysis, and dashboards for operations teams.',
    constraints: ['1 million events/second ingestion', 'Real-time processing (< 5 sec latency)', 'Store 2 years of raw data cheaply', 'Ad-hoc SQL queries on historical data', 'Minimal operational overhead'],
    solution: {
      architecture: [
        'IoT Core → Kinesis Data Streams (ingestion at scale)',
        'Kinesis Data Analytics (real-time anomaly detection with SQL/Flink)',
        'Lambda (triggered by anomalies → SNS alerts to operations)',
        'Kinesis Data Firehose → S3 (raw data lake, partitioned by date)',
        'S3 Lifecycle: Standard (30d) → IA (90d) → Glacier (2 years)',
        'AWS Glue (ETL + Data Catalog for schema discovery)',
        'Athena for ad-hoc SQL queries on S3 data',
        'QuickSight for operational dashboards',
      ],
      whyThisWorks: 'Kinesis handles millions of records/sec with real-time processing. Firehose auto-delivers to S3 without custom code. Athena queries S3 directly (serverless, pay-per-query). S3 Lifecycle minimizes storage cost over 2 years.',
      keyDecisions: [
        'Kinesis over SQS: need real-time ordered stream processing, not queue',
        'Firehose over custom Lambda: automatic batching, compression, delivery to S3',
        'Athena over Redshift: serverless, no cluster to manage, cheaper for ad-hoc',
        'S3 Lifecycle over manual: automated cost optimization over time',
      ]
    }
  },
  {
    title: 'Serverless API Backend',
    difficulty: 'Easy',
    requirements: 'A startup needs a REST API for their mobile app. Traffic is unpredictable (0 to 10,000 requests/second). They have a small team and want zero infrastructure management.',
    constraints: ['Pay-per-use (no idle costs)', 'Auto-scale to any traffic level', 'Authentication required', 'CRUD operations on user data', 'File uploads up to 10MB'],
    solution: {
      architecture: [
        'API Gateway (REST) with Cognito User Pools for auth',
        'Lambda functions (one per API endpoint or grouped by domain)',
        'DynamoDB (on-demand mode) for user data',
        'S3 + Pre-signed URLs for file uploads (bypass Lambda 6MB limit)',
        'CloudWatch for monitoring + X-Ray for tracing',
        'WAF on API Gateway for rate limiting and bot protection',
      ],
      whyThisWorks: 'Fully serverless = zero idle cost, infinite scale, no servers to manage. Cognito handles all auth complexity. DynamoDB on-demand scales with traffic. Pre-signed URLs let clients upload directly to S3 (no Lambda payload limits).',
      keyDecisions: [
        'DynamoDB over RDS: serverless, scales with traffic, no connection pooling issues',
        'Pre-signed URLs over Lambda upload: avoids 6MB Lambda payload limit',
        'API Gateway over ALB: native Lambda integration, auth, throttling built-in',
        'On-demand DynamoDB over provisioned: unpredictable traffic = on-demand',
      ]
    }
  },
  {
    title: 'Hybrid Architecture with On-Premises DC',
    difficulty: 'Hard',
    requirements: 'A bank has sensitive workloads in their on-premises data center that cannot move to cloud (regulatory). They want to use AWS for new applications while maintaining connectivity to on-premises databases and Active Directory.',
    constraints: ['Dedicated private connection (no internet)', 'Integrate with on-premises Active Directory', 'Some data must stay on-premises', 'High bandwidth (10 Gbps)', 'Redundant connectivity'],
    solution: {
      architecture: [
        'Direct Connect (primary, 10 Gbps) + Site-to-Site VPN (backup/failover)',
        'Transit Gateway connecting multiple VPCs + Direct Connect',
        'AD Connector or AWS Managed Microsoft AD (syncs with on-prem AD)',
        'IAM Identity Center (SSO) federated with Active Directory',
        'Storage Gateway (File Gateway) for hybrid file access',
        'Private VPC with no internet access for sensitive workloads',
        'VPC Endpoints for AWS service access without internet',
        'AWS Outposts for workloads that MUST run on-premises but use AWS APIs',
      ],
      whyThisWorks: 'Direct Connect provides dedicated, private, high-bandwidth connectivity. Transit Gateway simplifies multi-VPC routing. AD integration allows single sign-on across environments. Storage Gateway bridges on-prem and cloud storage.',
      keyDecisions: [
        'Direct Connect over VPN alone: consistent latency, higher bandwidth, truly private',
        'VPN as backup: provides failover if Direct Connect fails',
        'Transit Gateway over VPC Peering: scales better with multiple VPCs',
        'VPC Endpoints over NAT Gateway: keeps traffic within AWS network, no internet exposure',
      ]
    }
  },
  {
    title: 'Multi-Region Active-Active Application',
    difficulty: 'Expert',
    requirements: 'A global SaaS company needs their application available in US, Europe, and Asia with local latency. If one region goes down, users should be automatically routed to another region with no data loss.',
    constraints: ['< 50ms latency for users in each continent', 'RPO near zero (minimal data loss)', 'RTO < 1 minute', 'Consistent user experience regardless of region', 'GDPR: EU user data stays in EU'],
    solution: {
      architecture: [
        'Route 53 latency-based routing (sends users to nearest region)',
        'CloudFront for static content caching globally',
        'ALB + Auto Scaling in each region (us-east-1, eu-west-1, ap-southeast-1)',
        'DynamoDB Global Tables (active-active across all regions)',
        'Aurora Global Database (1 primary writer, 2 secondary readers) OR DynamoDB only',
        'S3 Cross-Region Replication for assets/uploads',
        'Route 53 health checks + automatic failover if region unhealthy',
        'Cognito User Pools per region for GDPR compliance',
        'EventBridge Global Endpoints for cross-region event routing',
      ],
      whyThisWorks: 'DynamoDB Global Tables enable active-active writes in all regions with automatic conflict resolution. Route 53 latency routing + health checks handle both performance and failover. Each region is independent but synchronized.',
      keyDecisions: [
        'DynamoDB Global Tables over Aurora Global: true active-active (write anywhere)',
        'Route 53 latency-based over geolocation: better performance when region is down',
        'Separate Cognito per region: GDPR compliance (EU data stays in EU)',
        'Global Tables over custom replication: built-in conflict resolution, managed',
      ]
    }
  },
  {
    title: 'Cost-Optimized Batch Processing',
    difficulty: 'Medium',
    requirements: 'A genomics company processes DNA sequencing data. Each job takes 2-6 hours, is fault-tolerant (can restart from checkpoint), runs daily with 500-2000 jobs. Current cost: $80,000/month on On-Demand.',
    constraints: ['Jobs can tolerate interruption (checkpointable)', 'Need 500-2000 parallel jobs daily', 'Each job needs 32 GB RAM, 8 vCPUs', 'Results stored long-term', 'Budget: minimize costs'],
    solution: {
      architecture: [
        'AWS Batch with Spot Instances (primary) + On-Demand (fallback for urgent)',
        'Spot Fleet diversified across multiple instance types and AZs',
        'S3 for input/output data (Intelligent-Tiering for results)',
        'EFS for shared intermediate checkpoints (accessible across instances)',
        'Step Functions to orchestrate job pipeline (retry on Spot interruption)',
        'CloudWatch for monitoring + SNS alerts on failures',
        'S3 Lifecycle: results to Glacier Deep Archive after 90 days',
      ],
      whyThisWorks: 'Spot Instances save up to 90% ($80K → ~$12K/month). AWS Batch manages job scheduling and instance provisioning. Diversification across instance types reduces Spot interruption probability. Checkpointing to EFS means interrupted jobs resume, not restart.',
      keyDecisions: [
        'AWS Batch over manual EC2: handles scheduling, scaling, Spot management',
        'Spot over Reserved: variable daily workload, can handle interruption',
        'EFS for checkpoints over S3: POSIX filesystem needed, mounted directly',
        'Step Functions for orchestration: handles retries, parallel execution, error handling',
      ]
    }
  },
  {
    title: 'Media Streaming Platform',
    difficulty: 'Hard',
    requirements: 'A media company streams live and on-demand video to 5 million global subscribers. They need adaptive bitrate streaming, DRM protection, and a recommendation engine.',
    constraints: ['Global low-latency delivery', 'Support 1080p and 4K streams', 'Content must be DRM-protected', 'Personalized recommendations', 'Handle live events (500K concurrent viewers)'],
    solution: {
      architecture: [
        'S3 for video storage (origin for VOD content)',
        'AWS Elemental MediaConvert (transcode to multiple bitrates/formats)',
        'AWS Elemental MediaLive (live stream encoding)',
        'AWS Elemental MediaPackage (package for different devices + DRM)',
        'CloudFront for global CDN delivery (signed URLs for access control)',
        'DynamoDB for user profiles, watch history, preferences',
        'Personalize (ML recommendation engine) fed by viewing history',
        'ElastiCache Redis for real-time "currently watching" and trending content',
        'Kinesis for real-time viewing event stream → analytics',
      ],
      whyThisWorks: 'Elemental services handle the full media pipeline. CloudFront delivers globally with low latency. DRM protects content. Personalize provides ML recommendations without building ML infrastructure. Kinesis captures real-time events for analytics and recommendations.',
      keyDecisions: [
        'CloudFront over direct S3: CDN caching reduces origin load, improves global latency',
        'Elemental over FFmpeg on EC2: managed, scalable, integrated DRM',
        'Personalize over custom ML: managed recommendation engine, no ML expertise needed',
        'DynamoDB over RDS for profiles: high-scale reads, flexible schema for preferences',
      ]
    }
  },
  {
    title: 'Disaster Recovery — Warm Standby',
    difficulty: 'Medium',
    requirements: 'A financial services company needs DR for their trading platform. RTO must be under 15 minutes, RPO under 1 minute. Primary region is us-east-1. DR region is us-west-2.',
    constraints: ['RTO < 15 minutes', 'RPO < 1 minute', 'Must handle 50% of production traffic immediately upon failover', 'Database consistency is critical', 'Automated failover preferred'],
    solution: {
      architecture: [
        'Primary: Full stack in us-east-1 (ALB + ASG + Aurora)',
        'DR: Warm standby in us-west-2 (smaller ASG, Aurora Read Replica promoted on failover)',
        'Aurora Global Database (replication lag < 1 second = RPO < 1 min)',
        'Route 53 health checks on primary → automatic failover to DR',
        'ASG in DR pre-scaled to 50% of production capacity',
        'S3 Cross-Region Replication for static assets',
        'CloudFormation StackSets for consistent infrastructure across regions',
        'Lambda function triggered by Route 53 alarm → scales up DR ASG to 100%',
      ],
      whyThisWorks: 'Aurora Global Database provides < 1 second RPO. Warm standby with 50% capacity means it handles traffic immediately on failover (< 15 min RTO). Route 53 health checks automate the DNS failover. Lambda auto-scales DR to full capacity after failover.',
      keyDecisions: [
        'Warm Standby over Pilot Light: 50% capacity already running = meets RTO < 15 min',
        'Aurora Global over RDS cross-region: < 1 second replication lag vs minutes',
        'Route 53 failover over manual: automated detection + DNS switch',
        'Pre-scaled DR ASG: handles immediate traffic without waiting for scale-up',
      ]
    }
  },
  {
    title: 'Monolith to Microservices Migration',
    difficulty: 'Expert',
    requirements: 'A retail company has a Java monolith on 4 large EC2 instances. They want to break it into microservices for independent scaling and deployments. The migration should be gradual (strangler fig pattern).',
    constraints: ['Zero downtime during migration', 'Gradual migration over 6 months', 'Team knows Java and is learning containers', 'Some services are CPU-heavy, others are IO-heavy', 'Need service discovery'],
    solution: {
      architecture: [
        'Phase 1: Containerize monolith as-is on ECS/Fargate (lift and shift)',
        'Phase 2: Extract services one by one (strangler fig via ALB path-based routing)',
        'ALB with path-based routing: /api/orders → orders-service, /api/users → users-service',
        'Default route still goes to monolith (shrinks over time)',
        'ECS with Fargate for microservices (no EC2 management)',
        'AWS Cloud Map for service discovery',
        'SQS/SNS between services for async communication',
        'Each service gets its own database (DynamoDB or Aurora depending on needs)',
        'API Gateway as public-facing API (routes to ALB internally)',
        'CI/CD with CodePipeline + CodeBuild + ECR for container images',
      ],
      whyThisWorks: 'Strangler fig: new requests gradually route to new services while monolith handles the rest. Zero downtime because the monolith keeps running until each service is extracted and validated. ALB routing makes the switch transparent to clients.',
      keyDecisions: [
        'ECS/Fargate over EKS: team is learning containers, Fargate simpler than Kubernetes',
        'ALB path routing over API Gateway alone: handles gradual migration transparently',
        'Per-service databases: avoids shared DB coupling (key microservice principle)',
        'SQS between services: decouples services, handles traffic differences',
      ]
    }
  },
  {
    title: 'Secure PCI-DSS Payment Processing',
    difficulty: 'Hard',
    requirements: 'An online retailer needs to process credit card payments while maintaining PCI-DSS compliance. Card data must be isolated, encrypted, and auditable. Only specific services can access cardholder data.',
    constraints: ['PCI-DSS Level 1 compliance', 'Cardholder data isolated in separate VPC', 'All access logged and auditable', 'Encryption at rest and in transit', 'Annual compliance audit'],
    solution: {
      architecture: [
        'Separate VPC for payment processing (PCI scope isolated)',
        'Private subnets only — no internet access in PCI VPC',
        'VPC Peering between app VPC and PCI VPC (controlled traffic flow)',
        'NACLs + Security Groups restricting access to payment services only',
        'KMS CMK (customer-managed) for cardholder data encryption',
        'CloudHSM for cryptographic key storage (PCI-DSS requirement)',
        'CloudTrail (all API calls logged) + Config (compliance monitoring)',
        'WAF + Shield Advanced on public-facing ALB',
        'AWS Artifact for compliance reports',
        'VPC Flow Logs for network traffic auditing',
        'Secrets Manager for database credentials (auto-rotation)',
        'AWS Config Rules for continuous compliance checking',
      ],
      whyThisWorks: 'Isolating PCI scope in a separate VPC minimizes the compliance surface area. CloudHSM meets PCI-DSS key management requirements. Full audit trail (CloudTrail + VPC Flow Logs + Config) satisfies auditor requirements. Encryption everywhere (KMS + TLS) protects cardholder data.',
      keyDecisions: [
        'Separate VPC over same VPC: reduces PCI scope (fewer resources to audit)',
        'CloudHSM over KMS alone: PCI-DSS requires dedicated HSM for certain operations',
        'Config Rules over manual checks: continuous automated compliance validation',
        'VPC Flow Logs over nothing: required for network-level audit trail',
      ]
    }
  },
]

const miniLabs = [
  {
    title: 'Build a VPC from Scratch',
    steps: [
      { step: 'Create VPC', detail: 'CIDR: 10.0.0.0/16 (65,536 IPs). This is your isolated network in AWS.' },
      { step: 'Create Subnets', detail: 'Public subnet: 10.0.1.0/24 (256 IPs) in AZ-a. Private subnet: 10.0.2.0/24 in AZ-a. Repeat for AZ-b (10.0.3.0/24 public, 10.0.4.0/24 private). Total: 4 subnets across 2 AZs.' },
      { step: 'Create Internet Gateway', detail: 'Attach to VPC. This enables internet access for public subnets.' },
      { step: 'Create Route Tables', detail: 'Public RT: 0.0.0.0/0 → IGW (all traffic to internet via IGW). Private RT: local only (no internet route). Associate public subnets with public RT.' },
      { step: 'Create NAT Gateway', detail: 'Place in PUBLIC subnet with Elastic IP. Add route in private RT: 0.0.0.0/0 → NAT-GW. Now private instances can reach internet (outbound only).' },
      { step: 'Security Groups', detail: 'Web-SG: Allow inbound 80/443 from 0.0.0.0/0. App-SG: Allow inbound 8080 from Web-SG only. DB-SG: Allow inbound 3306 from App-SG only. Chain of trust!' },
      { step: 'NACLs', detail: 'Add explicit DENY for known bad IPs on public subnet NACL. Remember: NACLs are stateless, so allow ephemeral ports (1024-65535) for return traffic.' },
      { step: 'Test', detail: 'EC2 in public subnet: has public IP, reachable from internet. EC2 in private subnet: no public IP, can reach internet via NAT, not reachable from internet.' },
    ]
  },
  {
    title: 'Secure an S3 Bucket (Defense in Depth)',
    steps: [
      { step: 'Block Public Access', detail: 'Enable all 4 Block Public Access settings at account AND bucket level. This prevents accidental public exposure.' },
      { step: 'Bucket Policy', detail: 'Deny all access except from specific IAM roles/VPC endpoints. Deny any request not using HTTPS (aws:SecureTransport condition).' },
      { step: 'Encryption', detail: 'Enable default encryption: SSE-KMS with customer-managed CMK. Add bucket policy denying PutObject without encryption header. All objects encrypted at rest.' },
      { step: 'Versioning', detail: 'Enable versioning for protection against accidental deletion. Combined with MFA Delete for critical data (requires MFA to delete versions).' },
      { step: 'Access Logging', detail: 'Enable S3 server access logging to a separate logging bucket. Tracks who accessed what and when.' },
      { step: 'VPC Endpoint', detail: 'Create S3 Gateway Endpoint in your VPC. Update bucket policy to only allow access from this VPC endpoint. Traffic never touches the internet.' },
      { step: 'Object Lock', detail: 'For compliance (WORM): enable Object Lock in Compliance mode. Objects cannot be deleted or overwritten for the retention period — even by root.' },
      { step: 'Lifecycle Policy', detail: 'Transition: Standard (30d) → Standard-IA (60d) → Glacier (365d) → Deep Archive. Expire non-current versions after 90 days.' },
    ]
  },
  {
    title: 'Set Up Auto Scaling with ALB',
    steps: [
      { step: 'Create Launch Template', detail: 'AMI: your app image. Instance type: t3.medium. User Data script: start app on boot. Security Group: allow port 8080 from ALB-SG only.' },
      { step: 'Create Target Group', detail: 'Protocol: HTTP, Port: 8080. Health check: /health endpoint, interval 30s, threshold 3. Healthy = HTTP 200.' },
      { step: 'Create ALB', detail: 'Internet-facing, in public subnets (both AZs). Listeners: HTTPS:443 (ACM certificate) → forward to Target Group. Security Group: allow 443 from 0.0.0.0/0.' },
      { step: 'Create Auto Scaling Group', detail: 'Use launch template. Min: 2, Desired: 2, Max: 10. Across 2+ AZs. Attach to ALB Target Group.' },
      { step: 'Scaling Policy - Target Tracking', detail: 'Metric: Average CPU Utilization. Target: 70%. Scale-in cooldown: 300s. Scale-out cooldown: 60s. ASG automatically adds/removes instances.' },
      { step: 'Additional Policy - Request Count', detail: 'ALBRequestCountPerTarget metric. Target: 1000 requests/target. Ensures scale-out when traffic increases even if CPU is low.' },
      { step: 'Test', detail: 'Run load test. Watch ASG add instances as CPU rises. Check ALB distributes traffic across new instances. Kill an instance — ASG replaces it automatically.' },
    ]
  },
  {
    title: 'Implement Serverless CRUD API',
    steps: [
      { step: 'Create DynamoDB Table', detail: 'Table: Users. Partition key: userId (String). On-demand capacity mode. Enable point-in-time recovery for backups.' },
      { step: 'Create Lambda Functions', detail: 'createUser (POST /users), getUser (GET /users/{id}), updateUser (PUT /users/{id}), deleteUser (DELETE /users/{id}). Runtime: Node.js. IAM Role: DynamoDB read/write.' },
      { step: 'Create API Gateway REST API', detail: 'Resources: /users and /users/{id}. Methods: POST, GET, PUT, DELETE. Integration: Lambda Proxy. Enable CORS.' },
      { step: 'Add Cognito Authorization', detail: 'Create Cognito User Pool. Add Authorizer in API Gateway. Attach to all methods. Now only authenticated users can call the API.' },
      { step: 'Add Validation', detail: 'Request validators in API Gateway: validate body schema on POST/PUT. Reject malformed requests before they reach Lambda (saves invocations).' },
      { step: 'Error Handling', detail: 'Lambda returns proper HTTP status codes (201 created, 404 not found, 500 error). DLQ on Lambda for failed invocations. CloudWatch Alarms on error rate.' },
      { step: 'Deploy & Test', detail: 'Deploy API to "prod" stage. Get invoke URL. Test with curl/Postman. Check CloudWatch Logs for each Lambda. Enable X-Ray tracing for full request flow.' },
    ]
  },
  {
    title: 'Configure Multi-AZ RDS with Read Replicas',
    steps: [
      { step: 'Create RDS Instance', detail: 'Engine: Aurora MySQL. Instance class: db.r6g.large. Multi-AZ: YES (creates synchronous standby). Storage: auto-scaling. VPC: private subnets only.' },
      { step: 'Configure Security', detail: 'Security Group: allow 3306 only from app-tier SG. No public access. Enable encryption (KMS). Enable IAM DB authentication for EC2 instances.' },
      { step: 'Enable Automated Backups', detail: 'Retention: 7 days. Backup window: 3-4 AM (low traffic). Aurora: continuous backups to S3 (free). Point-in-time recovery to any second.' },
      { step: 'Create Read Replicas', detail: 'Add 2 Aurora Replicas in different AZs. Same cluster, shared storage. They auto-promote on primary failure. Use reader endpoint for reads.' },
      { step: 'Configure Endpoints', detail: 'Writer endpoint: for INSERT/UPDATE/DELETE. Reader endpoint: auto load-balances across replicas for SELECT. Application uses both endpoints.' },
      { step: 'Cross-Region Replica (DR)', detail: 'Create Aurora Global Database: secondary cluster in us-west-2. Replication lag < 1 second. Promote secondary if primary region fails.' },
      { step: 'Monitoring', detail: 'CloudWatch metrics: CPU, connections, replica lag, free storage. Alarms: replica lag > 100ms, CPU > 80%, connections > 90% max. Enhanced Monitoring for OS-level metrics.' },
    ]
  },
  {
    title: 'Set Up CloudFront with S3 Origin',
    steps: [
      { step: 'Create S3 Bucket (Origin)', detail: 'Bucket: my-app-assets. Region: us-east-1. Block ALL public access (CloudFront will access it privately). Enable versioning.' },
      { step: 'Create Origin Access Control (OAC)', detail: 'Create OAC in CloudFront settings. This replaces the old OAI. It allows CloudFront to access your private S3 bucket without making it public.' },
      { step: 'Create CloudFront Distribution', detail: 'Origin: S3 bucket with OAC. Viewer Protocol: Redirect HTTP to HTTPS. Allowed methods: GET, HEAD. Compress objects: yes (gzip/brotli).' },
      { step: 'Update S3 Bucket Policy', detail: 'Add policy allowing cloudfront:GetObject from your distribution. Now ONLY CloudFront can read from S3 — direct S3 URLs won\'t work.' },
      { step: 'Custom Domain + SSL', detail: 'Request ACM certificate for your domain (must be in us-east-1 for CloudFront). Add CNAME record in Route 53 pointing to CloudFront domain.' },
      { step: 'Cache Behaviors', detail: '/api/* → ALB origin (no caching, all methods). /* → S3 origin (cache 24h, only GET). /images/* → S3 origin (cache 30 days, aggressive).' },
      { step: 'Invalidation & Versioning', detail: 'For updates: use file versioning (app-v2.js) over cache invalidation. Invalidation costs money per path. Versioned filenames are free and instant.' },
      { step: 'Security', detail: 'Enable WAF WebACL on distribution. Geo-restriction if needed. Signed URLs/Cookies for premium content. Security headers (HSTS, X-Frame-Options) via response headers policy.' },
    ]
  },
]

export default function Labs() {
  const [expandedScenario, setExpandedScenario] = useState(null)
  const [expandedLab, setExpandedLab] = useState(null)
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('saa-lab-progress')
    return saved ? JSON.parse(saved) : {}
  })

  const toggleStep = (labIdx, stepIdx) => {
    const key = `${labIdx}-${stepIdx}`
    const next = { ...completedSteps, [key]: !completedSteps[key] }
    setCompletedSteps(next)
    localStorage.setItem('saa-lab-progress', JSON.stringify(next))
  }

  const difficultyColor = { Easy: '#4caf50', Medium: '#ff9900', Hard: '#f44336', Expert: '#9c27b0' }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        <FlaskConical size={28} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="#ff9900" />
        Labs & Architecture Scenarios
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Think through real-world architecture problems. These are the types of scenarios you'll face in the exam.
      </p>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Architecture Design Challenges</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Read the requirements, think about your solution, then reveal the answer to compare.
      </p>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
        {architectureScenarios.map((s, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div onClick={() => setExpandedScenario(expandedScenario === i ? null : i)} style={{
              padding: '1.25rem 1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '6px', background: `${difficultyColor[s.difficulty]}22`, color: difficultyColor[s.difficulty], fontWeight: 700 }}>{s.difficulty}</span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{s.title}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{s.requirements.substring(0, 100)}...</p>
              </div>
              {expandedScenario === i ? <ChevronUp size={20} color="var(--text-secondary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
            </div>

            {expandedScenario === i && (
              <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ color: '#ff9900', marginBottom: '0.5rem' }}>Requirements:</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>{s.requirements}</p>
                  <h4 style={{ color: '#ff9900', marginBottom: '0.5rem' }}>Constraints:</h4>
                  <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.25rem', lineHeight: 2 }}>
                    {s.constraints.map((c, j) => <li key={j}>{c}</li>)}
                  </ul>
                </div>

                <details style={{ marginTop: '1.5rem' }}>
                  <summary style={{ cursor: 'pointer', color: '#4caf50', fontWeight: 700, padding: '0.75rem 1rem', background: 'rgba(76,175,80,0.1)', borderRadius: '10px', border: '1px solid rgba(76,175,80,0.3)' }}>
                    Show Solution
                  </summary>
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-card-hover)', borderRadius: '12px' }}>
                    <h4 style={{ color: '#4caf50', marginBottom: '0.75rem' }}>Architecture:</h4>
                    <ol style={{ color: 'var(--text-secondary)', paddingLeft: '1.25rem', lineHeight: 2.2 }}>
                      {s.solution.architecture.map((a, j) => <li key={j}>{a}</li>)}
                    </ol>
                    <h4 style={{ color: '#2196f3', marginTop: '1rem', marginBottom: '0.5rem' }}>Why This Works:</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>{s.solution.whyThisWorks}</p>
                    <h4 style={{ color: '#ff9900', marginTop: '1rem', marginBottom: '0.5rem' }}>Key Decisions:</h4>
                    <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.25rem', lineHeight: 2 }}>
                      {s.solution.keyDecisions.map((d, j) => <li key={j} style={{ fontSize: '0.9rem' }}>{d}</li>)}
                    </ul>
                  </div>
                </details>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Mini-Labs (Step-by-Step)</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Walk through each step mentally. Check off steps as you understand them. These teach you HOW services connect.
      </p>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {miniLabs.map((lab, li) => {
          const labSteps = lab.steps.length
          const labCompleted = lab.steps.filter((_, si) => completedSteps[`${li}-${si}`]).length
          return (
            <div key={li} style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div onClick={() => setExpandedLab(expandedLab === li ? null : li)} style={{
                padding: '1.25rem 1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{lab.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{labCompleted}/{labSteps} steps completed</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '60px', height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(labCompleted / labSteps) * 100}%`, background: '#4caf50', borderRadius: '3px' }}></div>
                  </div>
                  {expandedLab === li ? <ChevronUp size={20} color="var(--text-secondary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
                </div>
              </div>

              {expandedLab === li && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border)', marginTop: '0' }}>
                  <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
                    {lab.steps.map((s, si) => {
                      const done = completedSteps[`${li}-${si}`]
                      return (
                        <div key={si} onClick={() => toggleStep(li, si)} style={{
                          padding: '1rem', borderRadius: '10px', cursor: 'pointer',
                          background: done ? 'rgba(76,175,80,0.05)' : 'var(--bg-card-hover)',
                          border: `1px solid ${done ? 'rgba(76,175,80,0.3)' : 'var(--border)'}`,
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <CheckSquare size={18} color={done ? '#4caf50' : 'var(--text-secondary)'} />
                            <span style={{ fontWeight: 700, color: done ? '#4caf50' : 'var(--text-primary)', textDecoration: done ? 'line-through' : 'none' }}>
                              Step {si + 1}: {s.step}
                            </span>
                          </div>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.4rem', paddingLeft: '2.5rem', lineHeight: 1.6 }}>{s.detail}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: '2rem', background: 'rgba(255,153,0,0.05)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255,153,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Lightbulb size={18} color="#ff9900" />
          <h3 style={{ color: '#ff9900' }}>How to Use These Labs</h3>
        </div>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 2.2, paddingLeft: '1.25rem' }}>
          <li>Read the scenario and try to design the architecture BEFORE looking at the solution</li>
          <li>Draw the architecture on paper — visualizing helps you remember</li>
          <li>Focus on WHY each service was chosen, not just WHAT services are used</li>
          <li>For mini-labs, explain each step out loud as if teaching someone</li>
          <li>If you can explain the architecture and defend each decision, you'll ace the exam</li>
        </ul>
      </div>
    </div>
  )
}
