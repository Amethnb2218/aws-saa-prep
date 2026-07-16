import { useState } from 'react'
import { Map, ChevronDown, ChevronUp } from 'lucide-react'

function AwsIcon({ type, x, y, size = 44 }) {
  const icons = {
    ec2: { bg: '#ED7100', fg: '#fff', label: 'EC2', icon: 'M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18L18.85 7.5 12 10.82 5.15 7.5 12 4.18zM5 9.32l6 3.33v6.53l-6-3.33V9.32zm14 0v6.53l-6 3.33v-6.53l6-3.33z' },
    s3: { bg: '#3F8624', fg: '#fff', label: 'S3', icon: 'M4 4h16v16H4V4zm2 2v12h12V6H6z' },
    rds: { bg: '#2E27AD', fg: '#fff', label: 'RDS', icon: 'M12 2C6.5 2 2 4.5 2 7v10c0 2.5 4.5 5 10 5s10-2.5 10-5V7c0-2.5-4.5-5-10-5z' },
    lambda: { bg: '#ED7100', fg: '#fff', label: 'Lambda', icon: 'M12 2L3 22h4l2.5-6h5L17 22h4L12 2z' },
    cloudfront: { bg: '#8C4FFF', fg: '#fff', label: 'CloudFront', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z' },
    alb: { bg: '#8C4FFF', fg: '#fff', label: 'ALB', icon: 'M4 12h4m8 0h4M12 4v4m0 8v4M8 8l2 2m4 4l2 2M8 16l2-2m4-4l2-2' },
    route53: { bg: '#8C4FFF', fg: '#fff', label: 'Route 53', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20z' },
    dynamodb: { bg: '#2E27AD', fg: '#fff', label: 'DynamoDB', icon: 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' },
    sqs: { bg: '#FF4F8B', fg: '#fff', label: 'SQS', icon: 'M3 5h18v14H3V5zm2 2v10h14V7H5z' },
    sns: { bg: '#FF4F8B', fg: '#fff', label: 'SNS', icon: 'M12 2L4 6v12l8 4 8-4V6l-8-4z' },
    apigateway: { bg: '#FF4F8B', fg: '#fff', label: 'API Gateway', icon: 'M4 4h16v16H4V4zm4 4v8h8V8H8z' },
    elasticache: { bg: '#2E27AD', fg: '#fff', label: 'ElastiCache', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
    aurora: { bg: '#2E27AD', fg: '#fff', label: 'Aurora', icon: 'M12 2C6.5 2 2 4.5 2 7v10c0 2.5 4.5 5 10 5s10-2.5 10-5V7c0-2.5-4.5-5-10-5z' },
    waf: { bg: '#FF4F8B', fg: '#fff', label: 'WAF', icon: 'M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z' },
    kinesis: { bg: '#8C4FFF', fg: '#fff', label: 'Kinesis', icon: 'M3 12h4l3-9 4 18 3-9h4' },
    glue: { bg: '#8C4FFF', fg: '#fff', label: 'Glue', icon: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94L6.7 20.23a2.12 2.12 0 01-3-3l6.77-6.77a6 6 0 017.94-7.94L14.7 6.3z' },
    athena: { bg: '#8C4FFF', fg: '#fff', label: 'Athena', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    ecs: { bg: '#ED7100', fg: '#fff', label: 'ECS', icon: 'M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2M9 12h6M12 9v6' },
    codepipeline: { bg: '#2E27AD', fg: '#fff', label: 'CodePipeline', icon: 'M4 6h16M4 12h16M4 18h16' },
    directconnect: { bg: '#8C4FFF', fg: '#fff', label: 'Direct Connect', icon: 'M8 12h8M12 4v16' },
    transitgw: { bg: '#8C4FFF', fg: '#fff', label: 'Transit GW', icon: 'M12 2v20M2 12h20M5 5l14 14M5 19l14-14' },
    autoscaling: { bg: '#ED7100', fg: '#fff', label: 'Auto Scaling', icon: 'M4 12h3l2-4 3 8 2-4h3' },
  }
  const info = icons[type] || { bg: '#666', fg: '#fff', label: type }
  const s = size
  return (
    <g transform={`translate(${x - s/2}, ${y - s/2})`} className="aws-icon">
      <rect width={s} height={s} rx={10} fill={info.bg} opacity={0.9} />
      <rect width={s} height={s} rx={10} fill="none" stroke={info.bg} strokeWidth={2} opacity={0.5} />
      <text x={s/2} y={s/2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize={s * 0.32} fill={info.fg} fontWeight={700}>{info.label.slice(0,3)}</text>
      <text x={s/2} y={s + 14} textAnchor="middle" fontSize={9} fill="#b0bec5" fontFamily="system-ui">{info.label}</text>
    </g>
  )
}

function Arrow({ x1, y1, x2, y2, color = 'rgba(74,144,217,0.8)', dashed = false, label = '' }) {
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.sqrt(dx*dx + dy*dy)
  const ux = dx/len, uy = dy/len
  const ax = x2 - ux*8, ay = y2 - uy*8
  const mx = (x1+x2)/2, my = (y1+y2)/2
  return (
    <g>
      <line x1={x1} y1={y1} x2={ax} y2={ay} stroke={color} strokeWidth={2} strokeDasharray={dashed ? '6,4' : 'none'} />
      <polygon points={`${x2},${y2} ${ax - uy*4},${ay + ux*4} ${ax + uy*4},${ay - ux*4}`} fill={color} />
      {label && <text x={mx} y={my - 6} textAnchor="middle" fontSize={8} fill="#90a4ae">{label}</text>}
    </g>
  )
}

function Zone({ x, y, width, height, label, color = '#4a90d9', dashed = true, children }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={14} fill={color} fillOpacity={0.04} stroke={color} strokeWidth={2} strokeDasharray={dashed ? '10,5' : '0'} />
      <rect x={x + 8} y={y - 10} width={label.length * 7 + 16} height={20} rx={4} fill={color} fillOpacity={0.15} />
      <text x={x + 16} y={y + 4} fontSize={10} fill={color} fontWeight={700} fontFamily="system-ui">{label}</text>
      {children}
    </g>
  )
}

function ThreeTierDiagram() {
  return (
    <svg viewBox="0 0 820 560" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect width="820" height="560" rx={16} fill="#0d1b2a" />
      <text x={410} y={30} textAnchor="middle" fontSize={14} fill="#ff9900" fontWeight={700} fontFamily="system-ui">High Availability 3-Tier Web Application</text>

      <AwsIcon type="route53" x={130} y={70} size={40} />
      <AwsIcon type="cloudfront" x={290} y={70} size={40} />
      <AwsIcon type="waf" x={440} y={70} size={36} />
      <AwsIcon type="s3" x={600} y={70} size={40} />

      <Arrow x1={155} y1={70} x2={265} y2={70} label="DNS" />
      <Arrow x1={315} y1={70} x2={415} y2={70} label="Filter" />
      <Arrow x1={465} y1={85} x2={575} y2={85} label="Static" />

      <Zone x={100} y={130} width={620} height={400} label="VPC" color="#248814">
        <Zone x={130} y={170} width={270} height={340} label="Availability Zone 1" color="#4a90d9">
          <AwsIcon type="alb" x={265} y={220} size={38} />
          <AwsIcon type="ec2" x={200} y={305} size={38} />
          <AwsIcon type="ec2" x={310} y={305} size={38} />
          <AwsIcon type="autoscaling" x={255} y={385} size={34} />
          <AwsIcon type="elasticache" x={255} y={460} size={38} />
        </Zone>
        <Zone x={430} y={170} width={270} height={340} label="Availability Zone 2" color="#ff9900">
          <AwsIcon type="ec2" x={500} y={305} size={38} />
          <AwsIcon type="ec2" x={610} y={305} size={38} />
          <AwsIcon type="autoscaling" x={555} y={385} size={34} />
          <AwsIcon type="aurora" x={555} y={460} size={38} />
        </Zone>
      </Zone>

      <Arrow x1={440} y1={95} x2={265} y2={195} color="rgba(140,79,255,0.7)" label="Dynamic" />
      <Arrow x1={265} y1={245} x2={200} y2={278} />
      <Arrow x1={265} y1={245} x2={310} y2={278} />
      <Arrow x1={200} y1={330} x2={200} y2={365} dashed />
      <Arrow x1={310} y1={330} x2={310} y2={365} dashed />
      <Arrow x1={255} y1={405} x2={255} y2={435} dashed color="rgba(46,39,173,0.6)" />
      <Arrow x1={555} y1={405} x2={555} y2={435} dashed color="rgba(46,39,173,0.6)" />

      <line x1={310} y1={460} x2={500} y2={460} stroke="rgba(46,39,173,0.4)" strokeWidth={1.5} strokeDasharray="5,3" />
      <text x={400} y={455} textAnchor="middle" fontSize={8} fill="#7986cb">Replication</text>
    </svg>
  )
}

function ServerlessDiagram() {
  return (
    <svg viewBox="0 0 820 440" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect width="820" height="440" rx={16} fill="#0d1b2a" />
      <text x={410} y={30} textAnchor="middle" fontSize={14} fill="#ff9900" fontWeight={700} fontFamily="system-ui">Serverless Event-Driven Architecture</text>

      <rect x={30} y={55} width={80} height={50} rx={10} fill="#37474f" stroke="#546e7a" strokeWidth={1.5} />
      <text x={70} y={78} textAnchor="middle" fontSize={10} fill="#eceff1" fontWeight={600}>Client</text>
      <text x={70} y={92} textAnchor="middle" fontSize={8} fill="#90a4ae">Browser/App</text>

      <AwsIcon type="apigateway" x={220} y={80} size={42} />
      <AwsIcon type="lambda" x={380} y={80} size={42} />
      <AwsIcon type="dynamodb" x={560} y={55} size={40} />
      <AwsIcon type="s3" x={560} y={140} size={40} />

      <Arrow x1={110} y1={80} x2={195} y2={80} label="HTTPS" />
      <Arrow x1={245} y1={80} x2={355} y2={80} label="Invoke" />
      <Arrow x1={405} y1={65} x2={535} y2={58} label="Read/Write" />
      <Arrow x1={405} y1={95} x2={535} y2={135} label="Store" />

      <rect x={480} y={210} width={160} height={40} rx={8} fill="rgba(255,79,139,0.1)" stroke="#FF4F8B" strokeWidth={1.5} />
      <text x={560} y={235} textAnchor="middle" fontSize={10} fill="#FF4F8B" fontWeight={600}>S3 Event Trigger</text>
      <Arrow x1={560} y1={165} x2={560} y2={210} color="#FF4F8B" />

      <AwsIcon type="lambda" x={560} y={300} size={40} />
      <text x={560} y={340} textAnchor="middle" fontSize={9} fill="#90a4ae">Image Resize</text>
      <Arrow x1={560} y1={250} x2={560} y2={275} color="#FF4F8B" />

      <AwsIcon type="sns" x={200} y={300} size={40} />
      <AwsIcon type="sqs" x={350} y={300} size={40} />
      <AwsIcon type="lambda" x={500} y={380} size={40} />

      <Arrow x1={405} y1={105} x2={225} y2={275} color="rgba(255,79,139,0.5)" dashed />
      <Arrow x1={225} y1={300} x2={325} y2={300} label="Fan-out" />
      <Arrow x1={375} y1={310} x2={475} y2={370} label="Dequeue" />

      <rect x={30} y={370} width={180} height={50} rx={10} fill="rgba(76,175,80,0.08)" stroke="#4caf50" strokeWidth={1.5} />
      <text x={120} y={392} textAnchor="middle" fontSize={11} fill="#4caf50" fontWeight={700}>$0 when idle</text>
      <text x={120} y={408} textAnchor="middle" fontSize={9} fill="#81c784">Pay only per invocation</text>
    </svg>
  )
}

function DataLakeDiagram() {
  return (
    <svg viewBox="0 0 820 520" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect width="820" height="520" rx={16} fill="#0d1b2a" />
      <text x={410} y={30} textAnchor="middle" fontSize={14} fill="#ff9900" fontWeight={700} fontFamily="system-ui">Data Lake Architecture on S3</text>

      <rect x={50} y={45} width={720} height={55} rx={10} fill="rgba(84,91,100,0.15)" stroke="#546e7a" strokeWidth={1.5} />
      <text x={410} y={63} textAnchor="middle" fontSize={10} fill="#90a4ae" fontWeight={600}>DATA SOURCES</text>
      <AwsIcon type="rds" x={140} y={80} size={32} />
      <AwsIcon type="kinesis" x={310} y={80} size={32} />
      <AwsIcon type="apigateway" x={480} y={80} size={32} />
      <AwsIcon type="s3" x={650} y={80} size={32} />

      <rect x={50} y={130} width={720} height={50} rx={10} fill="rgba(237,113,0,0.08)" stroke="#ED7100" strokeWidth={1.5} />
      <text x={410} y={160} textAnchor="middle" fontSize={10} fill="#ED7100" fontWeight={600}>Ingestion: DMS (CDC) • Kinesis Firehose • DataSync • S3 Transfer Acceleration</text>

      <Arrow x1={140} y1={100} x2={140} y2={130} />
      <Arrow x1={310} y1={100} x2={310} y2={130} />
      <Arrow x1={480} y1={100} x2={480} y2={130} />
      <Arrow x1={650} y1={100} x2={650} y2={130} />

      <Zone x={50} y={200} width={720} height={60} label="Raw Zone — S3" color="#3F8624" dashed={false}>
        <AwsIcon type="s3" x={410} y={235} size={32} />
        <text x={500} y={238} fontSize={9} fill="#81c784">JSON • CSV • Parquet — Partitioned by date</text>
      </Zone>
      <Arrow x1={410} y1={180} x2={410} y2={200} />

      <AwsIcon type="glue" x={410} y={310} size={44} />
      <text x={410} y={348} textAnchor="middle" fontSize={9} fill="#90a4ae">ETL + Data Catalog + Crawlers</text>
      <Arrow x1={410} y1={265} x2={410} y2={285} />

      <Zone x={50} y={370} width={720} height={55} label="Curated Zone — S3 (Parquet, Optimized)" color="#3F8624" dashed={false}>
        <AwsIcon type="s3" x={410} y={400} size={30} />
      </Zone>
      <Arrow x1={410} y1={350} x2={410} y2={370} />

      <AwsIcon type="athena" x={180} y={475} size={40} />
      <AwsIcon type="rds" x={410} y={475} size={40} />
      <AwsIcon type="kinesis" x={640} y={475} size={40} />
      <text x={180} y={510} textAnchor="middle" fontSize={9} fill="#90a4ae">Athena (SQL)</text>
      <text x={410} y={510} textAnchor="middle" fontSize={9} fill="#90a4ae">Redshift Spectrum</text>
      <text x={640} y={510} textAnchor="middle" fontSize={9} fill="#90a4ae">QuickSight</text>

      <Arrow x1={250} y1={425} x2={180} y2={450} />
      <Arrow x1={410} y1={425} x2={410} y2={450} />
      <Arrow x1={570} y1={425} x2={640} y2={450} />
    </svg>
  )
}

function DRDiagram() {
  return (
    <svg viewBox="0 0 820 470" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect width="820" height="470" rx={16} fill="#0d1b2a" />
      <text x={410} y={30} textAnchor="middle" fontSize={14} fill="#ff9900" fontWeight={700} fontFamily="system-ui">Disaster Recovery — Warm Standby (Cross-Region)</text>

      <AwsIcon type="route53" x={410} y={65} size={40} />
      <text x={410} y={100} textAnchor="middle" fontSize={9} fill="#90a4ae">Failover Routing</text>

      <Zone x={30} y={120} width={360} height={250} label="PRIMARY — us-east-1" color="#4caf50" dashed={false}>
        <AwsIcon type="alb" x={210} y={170} size={36} />
        <AwsIcon type="ec2" x={130} y={240} size={34} />
        <AwsIcon type="ec2" x={200} y={240} size={34} />
        <AwsIcon type="ec2" x={270} y={240} size={34} />
        <AwsIcon type="ec2" x={340} y={240} size={34} />
        <text x={235} y={280} textAnchor="middle" fontSize={8} fill="#a5d6a7">ASG: 4 instances (full)</text>
        <AwsIcon type="aurora" x={210} y={325} size={38} />
        <text x={210} y={360} textAnchor="middle" fontSize={9} fill="#4caf50" fontWeight={600}>Aurora Writer</text>
      </Zone>

      <Zone x={430} y={120} width={360} height={250} label="DR REGION — eu-west-1" color="#ff9900" dashed={false}>
        <AwsIcon type="alb" x={610} y={170} size={36} />
        <AwsIcon type="ec2" x={610} y={240} size={34} />
        <text x={610} y={280} textAnchor="middle" fontSize={8} fill="#ffcc80">ASG: 1 instance (minimal)</text>
        <AwsIcon type="aurora" x={610} y={325} size={38} />
        <text x={610} y={360} textAnchor="middle" fontSize={9} fill="#ff9900" fontWeight={600}>Aurora Reader</text>
      </Zone>

      <Arrow x1={385} y1={75} x2={210} y2={145} color="#4caf50" label="Active" />
      <Arrow x1={435} y1={75} x2={610} y2={145} color="#ff9900" dashed label="Standby" />

      <Arrow x1={365} y1={325} x2={455} y2={325} color="#ff9900" dashed label="< 1s lag" />

      <rect x={160} y={395} width={500} height={60} rx={12} fill="rgba(255,153,0,0.06)" stroke="#ff9900" strokeWidth={1.5} />
      <text x={410} y={415} textAnchor="middle" fontSize={11} fill="#ff9900" fontWeight={700}>ON DISASTER — Total RTO ~7 minutes</text>
      <text x={410} y={432} textAnchor="middle" fontSize={9} fill="#cfd8dc">1. Promote Aurora (1 min) → 2. Scale ASG 1→4 (5 min) → 3. Route 53 switch (30s)</text>
      <text x={410} y={447} textAnchor="middle" fontSize={9} fill="#81c784">RPO &lt; 1 second (Aurora Global Database async replication)</text>
    </svg>
  )
}

function MicroservicesDiagram() {
  return (
    <svg viewBox="0 0 820 500" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect width="820" height="500" rx={16} fill="#0d1b2a" />
      <text x={410} y={30} textAnchor="middle" fontSize={14} fill="#ff9900" fontWeight={700} fontFamily="system-ui">Microservices on ECS Fargate</text>

      <rect x={50} y={45} width={720} height={45} rx={10} fill="rgba(46,39,173,0.08)" stroke="#2E27AD" strokeWidth={1.5} />
      <text x={410} y={72} textAnchor="middle" fontSize={10} fill="#7986cb" fontWeight={600}>CI/CD: CodeCommit → CodeBuild → CodeDeploy (Blue/Green) → ECS</text>

      <AwsIcon type="alb" x={410} y={130} size={40} />
      <Arrow x1={410} y1={90} x2={410} y2={105} color="rgba(46,39,173,0.6)" />

      <Zone x={50} y={170} width={720} height={160} label="ECS Cluster (Fargate — Serverless Containers)" color="#ED7100" dashed={false}>
        <AwsIcon type="ecs" x={180} y={235} size={44} />
        <AwsIcon type="ecs" x={410} y={235} size={44} />
        <AwsIcon type="ecs" x={640} y={235} size={44} />
        <text x={180} y={278} textAnchor="middle" fontSize={10} fill="#eceff1" fontWeight={600}>User Service</text>
        <text x={410} y={278} textAnchor="middle" fontSize={10} fill="#eceff1" fontWeight={600}>Order Service</text>
        <text x={640} y={278} textAnchor="middle" fontSize={10} fill="#eceff1" fontWeight={600}>Payment Service</text>

        <line x1={225} y1={235} x2={365} y2={235} stroke="#00bcd4" strokeWidth={2} strokeDasharray="5,3" />
        <line x1={455} y1={235} x2={595} y2={235} stroke="#00bcd4" strokeWidth={2} strokeDasharray="5,3" />
        <rect x={250} y={300} width={320} height={22} rx={6} fill="rgba(0,188,212,0.08)" stroke="#00bcd4" strokeWidth={1} />
        <text x={410} y={315} textAnchor="middle" fontSize={9} fill="#4dd0e1" fontWeight={600}>Service Mesh — mTLS • Retries • Circuit Breaker</text>
      </Zone>

      <Arrow x1={410} y1={155} x2={410} y2={170} />

      <AwsIcon type="aurora" x={180} y={390} size={40} />
      <AwsIcon type="dynamodb" x={410} y={390} size={40} />
      <AwsIcon type="elasticache" x={640} y={390} size={40} />
      <text x={180} y={430} textAnchor="middle" fontSize={9} fill="#90a4ae">Aurora (Users DB)</text>
      <text x={410} y={430} textAnchor="middle" fontSize={9} fill="#90a4ae">DynamoDB (Orders)</text>
      <text x={640} y={430} textAnchor="middle" fontSize={9} fill="#90a4ae">ElastiCache (Sessions)</text>

      <Arrow x1={180} y1={330} x2={180} y2={365} />
      <Arrow x1={410} y1={330} x2={410} y2={365} />
      <Arrow x1={640} y1={330} x2={640} y2={365} />

      <rect x={150} y={455} width={520} height={30} rx={8} fill="rgba(255,79,139,0.06)" stroke="#FF4F8B" strokeWidth={1} />
      <text x={410} y={475} textAnchor="middle" fontSize={9} fill="#FF4F8B" fontWeight={600}>Observability: X-Ray (distributed traces) • CloudWatch (metrics/logs) • Container Insights</text>
    </svg>
  )
}

function HybridDiagram() {
  return (
    <svg viewBox="0 0 820 530" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <rect width="820" height="530" rx={16} fill="#0d1b2a" />
      <text x={410} y={30} textAnchor="middle" fontSize={14} fill="#ff9900" fontWeight={700} fontFamily="system-ui">Hybrid Cloud — On-Premises to AWS Migration</text>

      <Zone x={50} y={45} width={720} height={100} label="On-Premises Data Center" color="#78909c" dashed={false}>
        <AwsIcon type="ec2" x={180} y={100} size={36} />
        <AwsIcon type="rds" x={380} y={100} size={36} />
        <AwsIcon type="s3" x={580} y={100} size={36} />
        <text x={180} y={135} textAnchor="middle" fontSize={8} fill="#90a4ae">App Servers</text>
        <text x={380} y={135} textAnchor="middle" fontSize={8} fill="#90a4ae">Oracle DB</text>
        <text x={580} y={135} textAnchor="middle" fontSize={8} fill="#90a4ae">File Server (NFS)</text>
      </Zone>

      <AwsIcon type="directconnect" x={410} y={195} size={40} />
      <text x={410} y={232} textAnchor="middle" fontSize={9} fill="#90a4ae">Direct Connect 1 Gbps + VPN Backup</text>
      <Arrow x1={410} y1={150} x2={410} y2={172} />

      <AwsIcon type="transitgw" x={410} y={280} size={42} />
      <Arrow x1={410} y1={220} x2={410} y2={255} />

      <Zone x={30} y={330} width={230} height={160} label="Shared Services VPC" color="#8C4FFF" dashed={false}>
        <text x={145} y={370} fontSize={9} fill="#b39ddb">• AD Connector (IAM)</text>
        <text x={145} y={388} fontSize={9} fill="#b39ddb">• Route 53 Resolver</text>
        <text x={145} y={406} fontSize={9} fill="#b39ddb">• VPC Endpoints</text>
        <text x={145} y={424} fontSize={9} fill="#b39ddb">• CI/CD (CodePipeline)</text>
      </Zone>

      <Zone x={290} y={330} width={230} height={160} label="Production VPC" color="#4caf50" dashed={false}>
        <AwsIcon type="ecs" x={360} y={385} size={34} />
        <AwsIcon type="aurora" x={460} y={385} size={34} />
        <text x={360} y={425} textAnchor="middle" fontSize={8} fill="#a5d6a7">ECS/EC2</text>
        <text x={460} y={425} textAnchor="middle" fontSize={8} fill="#a5d6a7">Aurora</text>
        <text x={405} y={460} textAnchor="middle" fontSize={8} fill="#81c784">Migrated workloads</text>
      </Zone>

      <Zone x={550} y={330} width={240} height={160} label="Migration VPC" color="#ff9900" dashed={false}>
        <text x={670} y={370} fontSize={9} fill="#ffcc80">• MGN (App Migration)</text>
        <text x={670} y={388} fontSize={9} fill="#ffcc80">• DMS (Database CDC)</text>
        <text x={670} y={406} fontSize={9} fill="#ffcc80">• SCT (Schema Conv.)</text>
        <text x={670} y={430} fontSize={9} fill="#ff9900" fontWeight={600}>Continuous Replication</text>
      </Zone>

      <Arrow x1={330} y1={285} x2={145} y2={330} color="#8C4FFF" />
      <Arrow x1={410} y1={305} x2={405} y2={330} color="#4caf50" />
      <Arrow x1={490} y1={285} x2={670} y2={330} color="#ff9900" />
    </svg>
  )
}

const architectures = [
  {
    title: '3-Tier Web Application (High Availability)',
    category: 'Classic',
    description: 'Standard HA web app across multiple AZs with auto-scaling, caching, and managed database.',
    Component: ThreeTierDiagram,
    keyPoints: ['CloudFront + WAF for DDoS protection and global delivery', 'ALB distributes traffic across AZs with health checks', 'Auto Scaling Group handles traffic spikes automatically', 'ElastiCache eliminates database load for hot data', 'Aurora Multi-AZ: automatic failover in 30 seconds, up to 15 Read Replicas']
  },
  {
    title: 'Serverless Event-Driven Architecture',
    category: 'Serverless',
    description: 'Fully serverless with event-driven processing. Zero servers, pay-per-request pricing.',
    Component: ServerlessDiagram,
    keyPoints: ['API Gateway: rate limiting, API keys, request validation, caching', 'Lambda: scales from 0 to thousands of concurrent executions instantly', 'DynamoDB: single-digit ms latency, auto-scales capacity', 'S3 Events + SNS/SQS for decoupling and fan-out patterns', 'No cost when idle — ideal for variable/unpredictable workloads']
  },
  {
    title: 'Data Lake on S3',
    category: 'Analytics',
    description: 'Modern data lake with multi-source ingestion, cataloging, ETL, and analytics engines.',
    Component: DataLakeDiagram,
    keyPoints: ['S3 central storage: unlimited scale, $0.023/GB/month (Standard)', 'Glue Crawlers auto-discover schema (no manual DDL needed)', 'Parquet columnar format: up to 90% cost reduction for analytics queries', 'Multiple engines query the same data: Athena, Redshift Spectrum, EMR', 'Lake Formation for fine-grained access control (column/row level security)']
  },
  {
    title: 'Disaster Recovery — Warm Standby',
    category: 'DR',
    description: 'Cross-region DR with warm standby. RTO ~7 minutes, RPO < 1 second.',
    Component: DRDiagram,
    keyPoints: ['Aurora Global Database: RPO < 1 second (async cross-region replication)', 'S3 Cross-Region Replication (CRR) for data continuity', 'Warm Standby cost: ~25% of primary (minimal instances running)', 'Route 53 Failover routing with health checks for automatic DNS switchover', 'Pre-configured ASG + Launch Templates for rapid scale-up during disaster']
  },
  {
    title: 'Microservices on ECS Fargate',
    category: 'Containers',
    description: 'Container-based microservices with service mesh, observability, and Blue/Green CI/CD.',
    Component: MicroservicesDiagram,
    keyPoints: ['Fargate: zero instance management, per-second billing, no EC2 to patch', 'Service Mesh: mutual TLS between services, automatic retries, circuit breakers', 'Blue/Green deployment via CodeDeploy: instant rollback on failure', 'Database-per-service pattern: each microservice owns its data store', 'X-Ray: distributed tracing across all services for debugging']
  },
  {
    title: 'Hybrid Cloud Migration (On-Prem → AWS)',
    category: 'Migration',
    description: 'Hybrid architecture with Direct Connect and phased migration using MGN + DMS.',
    Component: HybridDiagram,
    keyPoints: ['Direct Connect: dedicated 1-10 Gbps private connection (not over internet)', 'VPN backup with BGP: automatic failover if Direct Connect fails', 'Transit Gateway: hub-spoke model connecting all VPCs + on-premises', 'MGN (Application Migration Service): continuous replication, cutover in minutes', 'DMS + SCT: heterogeneous database migration with minimal downtime (CDC)']
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
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
        Interactive reference architectures for the SAA-C03 exam. Click to expand each diagram — study the service relationships and data flow patterns.
      </p>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {architectures.map((arch, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)', borderRadius: '16px',
            border: open === i ? '1px solid #ff9900' : '1px solid var(--border)', overflow: 'hidden',
            transition: 'border-color 0.3s'
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
                    background: arch.category === 'Classic' ? '#2196f3' : arch.category === 'Serverless' ? '#4caf50' : arch.category === 'Analytics' ? '#9c27b0' : arch.category === 'Containers' ? '#00bcd4' : arch.category === 'DR' ? '#ff5722' : '#ff9900',
                    color: 'white', padding: '0.25rem 0.7rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.5px'
                  }}>{arch.category.toUpperCase()}</span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{arch.title}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.3rem' }}>{arch.description}</p>
              </div>
              {open === i ? <ChevronUp size={20} color="#ff9900" /> : <ChevronDown size={20} />}
            </div>

            {open === i && (
              <div style={{ padding: '0 1.5rem 1.5rem' }}>
                <div style={{
                  borderRadius: '14px', overflow: 'hidden', marginBottom: '1.25rem',
                  border: '1px solid rgba(255,153,0,0.2)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
                }}>
                  <arch.Component />
                </div>
                <div style={{ background: 'rgba(255,153,0,0.03)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(255,153,0,0.1)' }}>
                  <h4 style={{ color: '#ff9900', fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                    Key Points for the Exam
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {arch.keyPoints.map((p, j) => (
                      <li key={j} style={{
                        padding: '0.5rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)',
                        borderBottom: j < arch.keyPoints.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        display: 'flex', gap: '0.6rem', lineHeight: 1.4
                      }}>
                        <span style={{ color: '#ff9900', fontWeight: 700 }}>▸</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
