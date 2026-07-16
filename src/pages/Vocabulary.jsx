import { useState } from 'react'
import { BookOpen, Search } from 'lucide-react'

const vocabulary = [
  {
    category: 'General Cloud & Architecture',
    terms: [
      { en: 'High Availability (HA)', fr: 'Haute disponibilite — Le systeme reste accessible meme en cas de panne' },
      { en: 'Fault Tolerance', fr: 'Tolerance aux pannes — Le systeme continue de fonctionner malgre une defaillance' },
      { en: 'Scalability', fr: 'Mise a l\'echelle — Capacite a grandir selon la demande' },
      { en: 'Elasticity', fr: 'Elasticite — Ajuster les ressources automatiquement (scale up/down)' },
      { en: 'Resilience', fr: 'Resilience — Capacite a se remettre rapidement d\'une panne' },
      { en: 'Latency', fr: 'Latence — Temps de reponse (delai entre requete et reponse)' },
      { en: 'Throughput', fr: 'Debit — Quantite de donnees traitees par unite de temps' },
      { en: 'Workload', fr: 'Charge de travail — L\'ensemble des ressources et du code qui fournissent un service' },
      { en: 'Decoupling', fr: 'Decouplage — Separer les composants pour qu\'ils soient independants' },
      { en: 'Loosely coupled', fr: 'Faiblement couple — Les composants ne dependent pas directement les uns des autres' },
      { en: 'Tightly coupled', fr: 'Fortement couple — Les composants sont dependants (mauvais design)' },
      { en: 'Stateless', fr: 'Sans etat — L\'application ne garde pas d\'info en memoire entre les requetes' },
      { en: 'Stateful', fr: 'Avec etat — L\'application garde les sessions/donnees en memoire' },
      { en: 'Provisioning', fr: 'Provisionner — Preparer/allouer des ressources' },
      { en: 'Overhead', fr: 'Surcharge/Charge supplementaire — Effort ou cout additionnel pour gerer quelque chose' },
      { en: 'Trade-off', fr: 'Compromis — Choisir entre deux options avec avantages/inconvenients' },
      { en: 'On-premises (on-prem)', fr: 'Sur site — Infrastructure physique dans les locaux de l\'entreprise' },
      { en: 'Lift and shift', fr: 'Migration directe sans modification (rehost)' },
      { en: 'Serverless', fr: 'Sans serveur — AWS gere toute l\'infra, tu paies uniquement a l\'utilisation' },
      { en: 'Managed service', fr: 'Service gere — AWS s\'occupe de la maintenance, patching, backups' },
    ]
  },
  {
    category: 'Networking Terms',
    terms: [
      { en: 'Subnet', fr: 'Sous-reseau — Division d\'un VPC en segments plus petits' },
      { en: 'Route table', fr: 'Table de routage — Regles qui dirigent le trafic reseau' },
      { en: 'CIDR block', fr: 'Bloc CIDR — Notation pour definir une plage d\'adresses IP (ex: 10.0.0.0/16)' },
      { en: 'Inbound traffic', fr: 'Trafic entrant — Donnees qui arrivent vers ta ressource' },
      { en: 'Outbound traffic', fr: 'Trafic sortant — Donnees qui partent de ta ressource' },
      { en: 'Ingress', fr: 'Entree (synonyme de inbound)' },
      { en: 'Egress', fr: 'Sortie (synonyme de outbound) — Aussi utilise pour les couts de transfert' },
      { en: 'Peering', fr: 'Appairage — Connexion directe entre deux VPCs' },
      { en: 'Edge location', fr: 'Point de presence — Serveur cache CloudFront proche des utilisateurs' },
      { en: 'Endpoint', fr: 'Point d\'acces — URL ou interface pour acceder a un service' },
      { en: 'DNS resolution', fr: 'Resolution DNS — Convertir un nom de domaine en adresse IP' },
      { en: 'Bandwidth', fr: 'Bande passante — Capacite maximale de transfert de donnees' },
      { en: 'Gateway', fr: 'Passerelle — Point d\'entree/sortie d\'un reseau' },
      { en: 'Load balancing', fr: 'Repartition de charge — Distribuer le trafic entre plusieurs serveurs' },
      { en: 'Sticky sessions', fr: 'Sessions persistantes — Le load balancer envoie un user toujours au meme serveur' },
      { en: 'Health check', fr: 'Verification de sante — Tester si une instance est fonctionnelle' },
    ]
  },
  {
    category: 'Security Terms',
    terms: [
      { en: 'Encryption at rest', fr: 'Chiffrement au repos — Donnees chiffrees quand elles sont stockees' },
      { en: 'Encryption in transit', fr: 'Chiffrement en transit — Donnees chiffrees quand elles circulent (HTTPS/TLS)' },
      { en: 'Least privilege', fr: 'Moindre privilege — Donner uniquement les permissions necessaires, rien de plus' },
      { en: 'Credentials', fr: 'Identifiants — Access keys, mots de passe, tokens' },
      { en: 'Role assumption', fr: 'Prise de role — Un service ou user utilise temporairement un role IAM' },
      { en: 'Cross-account access', fr: 'Acces inter-comptes — Un compte AWS accede aux ressources d\'un autre' },
      { en: 'Audit trail', fr: 'Piste d\'audit — Historique de toutes les actions (CloudTrail)' },
      { en: 'Compliance', fr: 'Conformite — Respecter les regles et normes (ISO, SOC, HIPAA, GDPR)' },
      { en: 'Remediation', fr: 'Remediation — Corriger un probleme de securite ou conformite detecte' },
      { en: 'Vulnerability', fr: 'Vulnerabilite — Faille de securite exploitable' },
      { en: 'Threat detection', fr: 'Detection de menaces — Identifier les activites suspectes (GuardDuty)' },
      { en: 'Federated identity', fr: 'Identite federee — Se connecter a AWS avec un compte externe (Google, Active Directory)' },
      { en: 'Pre-signed URL', fr: 'URL pre-signee — Lien temporaire avec permissions integrees pour acceder a S3' },
    ]
  },
  {
    category: 'Storage & Database Terms',
    terms: [
      { en: 'Object storage', fr: 'Stockage objet — Fichiers plats accessibles via API (S3)' },
      { en: 'Block storage', fr: 'Stockage bloc — Disque dur virtuel pour EC2 (EBS)' },
      { en: 'File storage', fr: 'Stockage fichier — Systeme de fichiers partage (EFS)' },
      { en: 'Durability', fr: 'Durabilite — Probabilite que la donnee ne soit pas perdue (S3 = 99.999999999%)' },
      { en: 'Lifecycle policy', fr: 'Politique de cycle de vie — Regles pour deplacer automatiquement les donnees entre classes de stockage' },
      { en: 'Replication', fr: 'Replication — Copier les donnees dans un autre emplacement' },
      { en: 'Read Replica', fr: 'Replique en lecture — Copie de la DB pour lire, soulage la DB principale' },
      { en: 'Failover', fr: 'Basculement — Passer automatiquement au backup quand le principal tombe' },
      { en: 'Snapshot', fr: 'Instantane — Copie complete a un moment donne (backup EBS, RDS)' },
      { en: 'Partition key', fr: 'Cle de partition — Attribut qui determine ou DynamoDB stocke les donnees' },
      { en: 'Hot partition', fr: 'Partition chaude — Une partition recoit trop de trafic (mauvaise distribution)' },
      { en: 'Eventual consistency', fr: 'Coherence a terme — Les repliques seront synchronisees mais avec un court delai' },
      { en: 'Strong consistency', fr: 'Coherence forte — Lire retourne toujours la derniere ecriture' },
      { en: 'IOPS', fr: 'Nombre d\'operations d\'entree/sortie par seconde (performance disque)' },
    ]
  },
  {
    category: 'Compute & Scaling Terms',
    terms: [
      { en: 'Instance type', fr: 'Type d\'instance — La taille et les specs du serveur (CPU, RAM, GPU)' },
      { en: 'Auto Scaling', fr: 'Mise a l\'echelle automatique — Ajuster le nombre d\'instances selon la demande' },
      { en: 'Scaling policy', fr: 'Politique de scaling — Regle qui definit quand ajouter/retirer des instances' },
      { en: 'Target tracking', fr: 'Suivi de cible — Auto Scaling ajuste pour maintenir une metrique (ex: CPU a 70%)' },
      { en: 'Cooldown period', fr: 'Periode de refroidissement — Temps d\'attente entre deux actions de scaling' },
      { en: 'Launch template', fr: 'Modele de lancement — Configuration pre-definie pour creer des instances EC2' },
      { en: 'Placement group', fr: 'Groupe de placement — Strategie pour positionner les instances (cluster, spread, partition)' },
      { en: 'Spot interruption', fr: 'Interruption Spot — AWS reprend ton instance Spot (2 min d\'avertissement)' },
      { en: 'Concurrency', fr: 'Concurrence — Nombre d\'executions en parallele (Lambda)' },
      { en: 'Cold start', fr: 'Demarrage a froid — Premier lancement d\'une Lambda (plus lent)' },
      { en: 'Container orchestration', fr: 'Orchestration de conteneurs — Gerer et deployer des conteneurs (ECS, EKS)' },
    ]
  },
  {
    category: 'Disaster Recovery & Availability',
    terms: [
      { en: 'RTO (Recovery Time Objective)', fr: 'Duree maximale d\'indisponibilite acceptable — Combien de temps le systeme peut etre DOWN' },
      { en: 'RPO (Recovery Point Objective)', fr: 'Perte de donnees maximale acceptable — Combien de donnees tu peux perdre (en temps)' },
      { en: 'Pilot light', fr: 'Veilleuse — Version minimale (juste la DB) tournant dans la region de secours' },
      { en: 'Warm standby', fr: 'Secours tiede — Version reduite mais fonctionnelle dans la region de secours' },
      { en: 'Active-active', fr: 'Actif-actif — Les deux regions traitent du trafic en meme temps' },
      { en: 'Failback', fr: 'Retour au principal — Retourner a la region principale apres resolution de la panne' },
      { en: 'Multi-AZ', fr: 'Multi-zones — Deployer dans plusieurs zones de disponibilite (meme region)' },
      { en: 'Multi-Region', fr: 'Multi-regions — Deployer dans plusieurs regions AWS (plus resilient)' },
      { en: 'Cross-region replication', fr: 'Replication inter-regions — Copier les donnees automatiquement dans une autre region' },
    ]
  },
  {
    category: 'Cost & Billing Terms',
    terms: [
      { en: 'On-Demand', fr: 'A la demande — Payer par heure/seconde sans engagement' },
      { en: 'Reserved Instance (RI)', fr: 'Instance reservee — Engagement 1 ou 3 ans pour reduction (jusqu\'a 72%)' },
      { en: 'Savings Plans', fr: 'Plans d\'economie — Engagement en $/heure (plus flexible que RI)' },
      { en: 'Spot Instance', fr: 'Instance ponctuelle — Capacite inutilisee a prix reduit (jusqu\'a 90%), interruptible' },
      { en: 'Right-sizing', fr: 'Dimensionnement correct — Choisir la bonne taille d\'instance pour pas payer trop' },
      { en: 'Data transfer costs', fr: 'Couts de transfert — Payer quand les donnees SORTENT d\'AWS ou traversent les regions' },
      { en: 'Consolidated billing', fr: 'Facturation consolidee — Une seule facture pour tous les comptes d\'une organisation' },
      { en: 'Volume discount', fr: 'Remise sur volume — Plus tu utilises, moins c\'est cher par unite' },
      { en: 'Pay-as-you-go', fr: 'Payer a l\'utilisation — Tu paies uniquement ce que tu consommes' },
      { en: 'Total Cost of Ownership (TCO)', fr: 'Cout total de possession — Comparer le cout global cloud vs on-premises' },
    ]
  },
  {
    category: 'Exam Question Key Phrases',
    terms: [
      { en: '"MOST cost-effective solution"', fr: 'La solution la MOINS CHERE qui repond aux exigences' },
      { en: '"LEAST operational overhead"', fr: 'Le MOINS de gestion/maintenance possible → services manages/serverless' },
      { en: '"MOST highly available"', fr: 'La PLUS HAUTE disponibilite → Multi-AZ, Multi-Region, redondance' },
      { en: '"With MINIMAL changes"', fr: 'Avec le MINIMUM de modifications → Lift and shift, pas de re-architecture' },
      { en: '"Durable and secure"', fr: 'Durable (pas de perte) et securise (chiffrement + acces controle)' },
      { en: '"Meets the requirements"', fr: 'Repond aux exigences — Attention a TOUS les criteres mentionnes' },
      { en: '"Which combination of steps"', fr: 'Quelle combinaison d\'etapes — Question a reponses multiples' },
      { en: '"Best practices"', fr: 'Bonnes pratiques — La facon recommandee par AWS' },
      { en: '"Fault-tolerant"', fr: 'Tolerant aux pannes — Continue de marcher si un composant tombe' },
      { en: '"Decouple the architecture"', fr: 'Decoupler l\'architecture — Separer les composants (SQS, SNS, EventBridge)' },
      { en: '"Near real-time"', fr: 'Quasi temps reel — Traitement en secondes (pas en millisecondes)' },
      { en: '"Minimize data loss"', fr: 'Minimiser la perte de donnees → Faible RPO → replication synchrone' },
      { en: '"Automatically recover"', fr: 'Recuperation automatique → Auto Scaling, Multi-AZ failover, health checks' },
      { en: '"Shared responsibility model"', fr: 'Modele de responsabilite partagee — AWS gere l\'infra, toi les configs/donnees' },
    ]
  },
]

export default function Vocabulary() {
  const [filter, setFilter] = useState('')
  const [expandedCat, setExpandedCat] = useState(null)

  const filtered = vocabulary.map(cat => ({
    ...cat,
    terms: cat.terms.filter(t =>
      t.en.toLowerCase().includes(filter.toLowerCase()) ||
      t.fr.toLowerCase().includes(filter.toLowerCase())
    )
  })).filter(cat => cat.terms.length > 0)

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        <BookOpen size={28} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} color="#ff9900" />
        Technical English Vocabulary
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        All the terms and phrases you'll encounter in the SAA-C03 exam, with French translations.
      </p>

      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input
          type="text" placeholder="Search a term (English or French)..." value={filter} onChange={e => setFilter(e.target.value)}
          style={{
            width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '10px',
            background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)',
            fontSize: '1rem', outline: 'none'
          }}
        />
      </div>

      {filtered.map((cat, ci) => (
        <div key={ci} style={{ marginBottom: '1.5rem' }}>
          <h2 onClick={() => setExpandedCat(expandedCat === ci ? null : ci)} style={{
            fontSize: '1.1rem', fontWeight: 700, color: '#ff9900', marginBottom: '0.75rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            {cat.category}
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 400 }}>({cat.terms.length} terms)</span>
          </h2>
          <div style={{ display: 'grid', gap: '0.4rem' }}>
            {cat.terms.map((t, i) => (
              <div key={i} style={{
                background: 'var(--bg-card)', borderRadius: '10px', padding: '0.85rem 1.25rem',
                border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
                alignItems: 'center'
              }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{t.en}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', borderLeft: '2px solid var(--border)', paddingLeft: '1rem' }}>{t.fr}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        background: 'rgba(255,153,0,0.05)', borderRadius: '16px', padding: '1.5rem',
        border: '1px solid rgba(255,153,0,0.2)', marginTop: '2rem'
      }}>
        <h3 style={{ color: '#ff9900', marginBottom: '0.5rem' }}>Tips for reading exam questions in English:</h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.25rem' }}>
          <li>Read the LAST sentence first — it tells you what they're actually asking</li>
          <li>Identify keywords: "MOST", "LEAST", "BEST", "cost-effective", "operational overhead"</li>
          <li>Eliminate obviously wrong answers first (public access, root account, single AZ for HA)</li>
          <li>If two answers seem correct, pick the one that best matches ALL requirements mentioned</li>
          <li>Don't panic if you don't know a word — focus on the architecture pattern being described</li>
        </ul>
      </div>
    </div>
  )
}
