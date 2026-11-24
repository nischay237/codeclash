import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Brain,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Command,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Network,
  Play,
  RefreshCw,
  Search,
  ShieldCheck,
  Swords,
  Terminal,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';

const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const PROJECTS = [
  {
    id: 'forge',
    index: '01',
    title: 'FORGE — AI Software Engineering Intelligence Platform',
    shortTitle: 'FORGE AI Platform',
    category: 'Java 21 · Spring Boot · AI',
    statusBadge: '100% F1 EVAL',
    tagline: 'Multi-tenant engineering control plane with JavaParser AST blast radius, Kafka Outbox, Redis & prompt-injection defense.',
    summary:
      'Production-style Spring Boot 3.5 modular monolith that verifies HMAC-signed GitHub webhooks, parses Java AST dependency graphs to compute exact BFS blast radius, runs Gitleaks secret masking & Semgrep SAST, enforces human approval before posting reviews, and proves accuracy with an 8-case reproducible evaluation benchmark.',
    highlights: [
      'Java 21 + Spring Boot 3.5 modular monolith with Transactional Outbox, Kafka DLT, Redis & Resilience4j',
      'JavaParser AST Dependency Graph & BFS Change Impact Analysis calculating affected callers & tests',
      'Gitleaks secret masking, Semgrep SAST, prompt-injection defense & 8-case Eval Benchmark (100% F1 / 0% FPR)',
      'Multi-tenant JWT + RBAC isolation, Flyway migrations, MapStruct, OpenTelemetry & ArchUnit boundary tests',
    ],
    techStack: ['Java 21', 'Spring Boot 3.5', 'Apache Kafka', 'Redis', 'PostgreSQL', 'JavaParser AST', 'Spring AI', 'React + TS'],
    metrics: [
      { label: 'Eval F1', value: '100.0%' },
      { label: 'False Positives', value: '0.0%' },
      { label: 'ArchUnit Rules', value: '4 / 4' },
    ],
    githubUrl: 'https://github.com/nischay237/forge-ai-platform',
    launchLabel: 'Open FORGE Control Plane',
  },
  {
    id: 'codeclash',
    index: '02',
    title: 'CodeClash — 1v1 Real-Time Coding Battle Arena',
    shortTitle: 'CodeClash Arena',
    category: 'Real-Time WebSockets · Game',
    statusBadge: 'PLAYABLE LIVE',
    tagline: 'Head-to-head competitive DSA duels synced over low-latency WebSockets with sandbox execution & FIDE Elo ratings.',
    summary:
      'A fast 1v1 competitive coding platform engineered for live algorithm battles between developers. Synchronizes opponent progress and keystrokes over bidirectional Socket.io channels, evaluates submissions in an isolated timeout-guarded sandbox, and updates global FIDE Elo standings after every match.',
    highlights: [
      'Bidirectional Socket.io WebSocket engine for zero-lag keystroke and match state synchronization',
      'Isolated code execution sandbox with strict memory, security, and timeout constraints',
      'FIDE-grade Elo rating algorithm computing live global leaderboard ranks after every duel',
      'Resilient dual persistence backed by MongoDB Atlas with automatic in-memory fallback',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'Socket.io', 'Tailwind CSS', 'MongoDB'],
    metrics: [
      { label: 'Sync Mode', value: 'WebSocket' },
      { label: 'Ranking', value: 'FIDE Elo' },
      { label: 'Execution', value: 'Sandboxed' },
    ],
    githubUrl: 'https://github.com/nischay237/codeclash',
    launchLabel: 'Launch 1v1 Battle Arena',
  },
  {
    id: 'analytics',
    index: '03',
    title: 'Real-Time Analytics Tracker & Telemetry Dashboard',
    shortTitle: 'Analytics Tracker',
    category: 'Telemetry · High-Throughput',
    statusBadge: '<3KB SCRIPT',
    tagline: 'Self-hosted, privacy-first web telemetry streaming active visitors, heartbeats, and conversion funnels without cookies.',
    summary:
      'Replaces bloated third-party analytics suites with an embeddable sub-3KB tracking script and a Node.js + Express ingestion pipeline. Streams live active visitor counts, session heartbeats, pageview velocity, and clean event conversion funnels in real time.',
    highlights: [
      'Ultra-lightweight embeddable tracking snippet under 3KB with zero third-party cookie bloat',
      'Real-time active visitor telemetry synchronized via WebSocket session heartbeats',
      'High-throughput ingestion REST API engineered on Node.js, Express, and MongoDB',
      'Interactive analytics dashboard displaying live session graphs and conversion funnels',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST APIs'],
    metrics: [
      { label: 'Bundle Size', value: '< 3 KB' },
      { label: 'Cookies', value: 'Zero' },
      { label: 'Streaming', value: 'Real-Time' },
    ],
    githubUrl: 'https://github.com/nischay237/analytics-tracker',
    driveUrl: 'https://drive.google.com/drive/folders/1yDR9xbt8fTiyh9TyWV9C4lS6Y4Th3-61?usp=sharing',
    launchLabel: 'Open Live Dashboard',
  },
];

const FORGE_MINI_NODES = {
  SettlementService: {
    layer: 'SERVICE',
    callers: ['TransferController', 'SettlementServiceTest'],
    risk: 'HIGH',
    tests: 1,
    deps: ['FraudRiskEngine', 'LedgerRepository', 'OutboxEventPublisher'],
  },
  FraudRiskEngine: {
    layer: 'SERVICE',
    callers: ['SettlementService', 'TransferController', 'SettlementServiceTest'],
    risk: 'HIGH',
    tests: 1,
    deps: ['VelocityCacheClient'],
  },
  LedgerRepository: {
    layer: 'DATA',
    callers: ['SettlementService', 'TransferController', 'SettlementServiceTest'],
    risk: 'HIGH',
    tests: 1,
    deps: ['PostgreSQL 16 (Flyway)'],
  },
  TransferController: {
    layer: 'API',
    callers: [],
    risk: 'LOW',
    tests: 0,
    deps: ['SettlementService', 'IdempotencyGuard'],
  },
};

const SKILL_GROUPS = [
  {
    id: 'backend',
    label: 'Backend & Distributed',
    icon: Layers,
    tagline: 'Spring Boot, Kafka Outbox, WebSockets & resilient APIs',
    items: [
      { name: 'Java 21 & Spring Boot 3.5', projects: ['forge'] },
      { name: 'Apache Kafka & Outbox', projects: ['forge'] },
      { name: 'Node.js & Express.js', projects: ['codeclash', 'analytics'] },
      { name: 'Spring Security & JWT/RBAC', projects: ['forge'] },
      { name: 'Socket.io (WebSockets)', projects: ['codeclash', 'analytics'] },
      { name: 'Resilience4j & ArchUnit', projects: ['forge'] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend Engineering',
    icon: Code2,
    tagline: 'Snappy, interactive, light-first Swiss UI architecture',
    items: [
      { name: 'React 18 & TypeScript', projects: ['forge', 'codeclash', 'analytics'] },
      { name: 'Tailwind CSS', projects: ['forge', 'codeclash', 'analytics'] },
      { name: 'React Flow & Monaco Editor', projects: ['forge'] },
      { name: 'TanStack Query & Zustand', projects: ['forge'] },
      { name: 'Vite Build Tooling', projects: ['forge', 'codeclash', 'analytics'] },
      { name: 'Recharts & Custom SVG', projects: ['forge', 'analytics'] },
    ],
  },
  {
    id: 'databases',
    label: 'Databases & Caching',
    icon: Database,
    tagline: 'ACID relational schemas, Redis limits & document stores',
    items: [
      { name: 'PostgreSQL & pgvector', projects: ['forge'] },
      { name: 'Redis (Cache & Rate Limits)', projects: ['forge'] },
      { name: 'Flyway Migrations', projects: ['forge'] },
      { name: 'MongoDB & Atlas', projects: ['codeclash', 'analytics'] },
      { name: 'Spring Data JPA', projects: ['forge'] },
    ],
  },
  {
    id: 'ai',
    label: 'AI Systems & DevOps',
    icon: Brain,
    tagline: 'AST-grounded LLM pipelines, security guards & evaluation',
    items: [
      { name: 'JavaParser AST & BFS', projects: ['forge'] },
      { name: 'Spring AI & OpenAI/Gemini', projects: ['forge'] },
      { name: 'Prompt-Injection Defense', projects: ['forge'] },
      { name: 'Docker & CI/CD Pipelines', projects: ['forge', 'codeclash'] },
      { name: 'Git, GitHub & OpenTelemetry', projects: ['forge', 'codeclash', 'analytics'] },
    ],
  },
  {
    id: 'cs',
    label: 'CS Fundamentals',
    icon: Cpu,
    tagline: 'Algorithmic problem solving & system design',
    items: [
      { name: 'Data Structures & Graph BFS', projects: ['forge', 'codeclash'] },
      { name: 'Algorithms & FIDE Elo', projects: ['codeclash'] },
      { name: 'System Design & Outbox', projects: ['forge'] },
      { name: 'DBMS & Query Optimization', projects: ['forge', 'analytics'] },
      { name: 'Operating Systems & Concurrency', projects: ['forge', 'codeclash'] },
    ],
  },
];

export default function Portfolio({
  onOpenArena,
  onOpenLeaderboard,
  onOpenAnalytics,
  onOpenForge,
}) {
  const [activeProjectId, setActiveProjectId] = useState('forge');
  const [selectedAstNode, setSelectedAstNode] = useState('FraudRiskEngine');
  const [skillTab, setSkillTab] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState({
    name: 'Java 21 & Spring Boot 3.5',
    projects: ['forge'],
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');

  // CodeClash mini-simulator state
  const [duelRunning, setDuelRunning] = useState(false);
  const [p1Score, setP1Score] = useState(12);
  const [p2Score, setP2Score] = useState(9);
  const [eloRating, setEloRating] = useState(1438);
  const [eloDelta, setEloDelta] = useState('+18');

  // Analytics mini-simulator state
  const [liveVisitors, setLiveVisitors] = useState(42);
  const [eventsCount, setEventsCount] = useState(1284);
  const [bars, setBars] = useState([48, 66, 54, 82, 71, 94, 68, 86]);

  const activeProject = useMemo(
    () => PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0],
    [activeProjectId]
  );

  // Cmd+K / Ctrl+K shortcut for Command Palette
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const launchProject = (id) => {
    if (id === 'forge') onOpenForge?.();
    else if (id === 'codeclash') onOpenArena?.();
    else if (id === 'analytics') onOpenAnalytics?.();
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('nischaysrivastava2@gmail.com').catch(() => {});
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const simulateDuel = () => {
    if (duelRunning) return;
    setDuelRunning(true);
    setP1Score(2);
    setP2Score(1);
    const steps = [
      [4, 3],
      [7, 5],
      [9, 8],
      [11, 9],
      [12, 10],
    ];
    steps.forEach(([s1, s2], idx) => {
      setTimeout(() => {
        setP1Score(s1);
        setP2Score(s2);
        if (idx === steps.length - 1) {
          setDuelRunning(false);
          setEloRating((r) => r + 14);
          setEloDelta('+14');
        }
      }, (idx + 1) * 260);
    });
  };

  const fireAnalyticsEvent = () => {
    setLiveVisitors((v) => v + 1);
    setEventsCount((e) => e + 1);
    setBars((prev) => [...prev.slice(1), Math.floor(55 + Math.random() * 44)]);
  };

  const commandActions = useMemo(
    () => [
      {
        label: 'Open FORGE AI Control Plane',
        hint: 'Live Demo · /forge',
        icon: Network,
        run: () => onOpenForge?.(),
      },
      {
        label: 'Launch CodeClash 1v1 Battle Arena',
        hint: 'Playable · /arena',
        icon: Swords,
        run: () => onOpenArena?.(),
      },
      {
        label: 'View CodeClash Global Elo Leaderboard',
        hint: 'Rankings · /leaderboard',
        icon: Award,
        run: () => onOpenLeaderboard?.(),
      },
      {
        label: 'Launch Real-Time Analytics Tracker',
        hint: 'Telemetry · /analytics',
        icon: BarChart3,
        run: () => onOpenAnalytics?.(),
      },
      {
        label: 'Open Resume PDF',
        hint: '/resume.pdf',
        icon: FileText,
        run: () => window.open('/resume.pdf', '_blank', 'noopener,noreferrer'),
      },
      {
        label: 'Copy Email Address (nischaysrivastava2@gmail.com)',
        hint: 'Clipboard',
        icon: Copy,
        run: () => handleCopyEmail(),
      },
      {
        label: 'Open GitHub Profile (@nischay237)',
        hint: 'github.com/nischay237',
        icon: GithubIcon,
        run: () => window.open('https://github.com/nischay237', '_blank', 'noopener,noreferrer'),
      },
      {
        label: 'Jump to Interactive Skills & Proof Matrix',
        hint: 'Section',
        icon: Layers,
        run: () => scrollTo('skills-section'),
      },
    ],
    [onOpenForge, onOpenArena, onOpenLeaderboard, onOpenAnalytics]
  );

  const filteredCommands = commandActions.filter(
    (c) =>
      c.label.toLowerCase().includes(cmdQuery.toLowerCase()) ||
      c.hint.toLowerCase().includes(cmdQuery.toLowerCase())
  );

  const visibleSkillGroups =
    skillTab === 'all' ? SKILL_GROUPS : SKILL_GROUPS.filter((g) => g.id === skillTab);

  const astDetail = FORGE_MINI_NODES[selectedAstNode];

  return (
    <div
      className="min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* ============================================================== */}
      {/* 1. CRISP STICKY EDITORIAL TOP NAVBAR                           */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/85">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Mark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-[5px] bg-[#111111] text-white font-mono font-bold text-xs flex items-center justify-center tracking-tight">
              NS
            </div>
            <div className="text-left leading-tight">
              <div className="font-semibold text-[14.5px] tracking-[-0.03em] text-[#111111]">
                Nischay Srivastava
              </div>
              <div className="text-[10px] font-mono text-stone-400 hidden sm:block">
                nischaysrivastava.com
              </div>
            </div>
          </button>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-stone-600">
            <button
              onClick={() => scrollTo('projects-shelf')}
              className="hover:text-[#111111] transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo('skills-section')}
              className="hover:text-[#111111] transition-colors cursor-pointer"
            >
              Skills &amp; Proof
            </button>
            <button
              onClick={() => scrollTo('about-section')}
              className="hover:text-[#111111] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={onOpenForge}
              className="hover:text-[#111111] transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              FORGE AI
            </button>
            <button
              onClick={onOpenArena}
              className="hover:text-[#111111] transition-colors cursor-pointer"
            >
              CodeClash
            </button>
          </nav>

          {/* Right Controls: Command Palette + Resume + Contact */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-md bg-[#FAFAF8] hover:bg-stone-100 border border-stone-200 text-xs text-stone-500 hover:text-[#111111] transition-colors cursor-pointer"
              title="Quick jump (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Quick Jump</span>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white border border-stone-200 text-stone-500">
                ⌘K
              </kbd>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="h-9 px-3.5 rounded-md border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-700 hover:text-[#111111] inline-flex items-center gap-1 transition-colors"
            >
              Resume <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:nischaysrivastava2@gmail.com"
              className="h-9 px-4 rounded-md bg-[#111111] hover:bg-[#27272A] text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. LUMINOUS ARCHITECTURAL SWISS-GRID HERO                      */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div
          className="relative"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.44) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.44) 1px, transparent 1px),
              radial-gradient(ellipse 60% 80% at 8% 32%, #1D6E86 0%, #3E9BB2 38%, transparent 72%),
              radial-gradient(ellipse 55% 65% at 62% 24%, #6EE7F5 0%, #C8F3FB 46%, transparent 76%),
              radial-gradient(ellipse 50% 60% at 54% 82%, #E5C8FA 0%, #F7D7EE 48%, transparent 75%),
              radial-gradient(ellipse 55% 70% at 92% 76%, #E85D1F 0%, #F58F4B 44%, transparent 78%),
              linear-gradient(135deg, #2B839C 0%, #98E6F2 36%, #F3E3FA 64%, #EF7D3B 100%)
            `,
            backgroundSize:
              '56px 56px, 56px 56px, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%',
          }}
        >
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Pure-White Stepped Editorial Cutout */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 sm:p-11 lg:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-white/85 max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-stone-500 mb-5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Full-Stack &amp; Distributed Systems · B.Tech CSE (AKTU)
                  </div>

                  <h1 className="text-3xl sm:text-[44px] lg:text-[48px] font-medium tracking-[-0.04em] leading-[1.08] text-[#111111]">
                    <span className="bg-[#EFE8FF]/85 px-1.5 box-decoration-clone">
                      Building distributed backends, real-time arenas, &amp;{' '}
                      <span
                        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                        className="italic font-normal text-[1.12em]"
                      >
                        verified
                      </span>{' '}
                      AI systems.
                    </span>
                  </h1>

                  <p className="mt-5 text-sm sm:text-[16px] text-stone-700 leading-relaxed max-w-xl">
                    Hey, I&apos;m <strong className="font-semibold text-[#111111]">Nischay Srivastava</strong>. I build low-latency WebSocket games, Java 21 + Spring Boot &amp; Kafka control planes, and crisp interactive developer tools you can test live right here.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => scrollTo('projects-shelf')}
                      className="h-11 px-6 rounded-[4px] bg-[#111111] hover:bg-[#27272A] text-white text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      Explore Live Projects
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onOpenForge}
                      className="h-11 px-5 rounded-[4px] bg-white hover:bg-stone-50 text-[#111111] border border-stone-300 text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      Launch FORGE AI
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCopyEmail}
                      className="h-11 px-4 rounded-[4px] bg-[#FAFAF8] hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-mono inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Email Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Staggered Interactive Live Product Launcher Cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                {/* Floating Card 1: FORGE AI */}
                <button
                  onClick={onOpenForge}
                  className="text-left bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
                      <Network className="w-4 h-4 text-sky-700" />
                      FORGE AI
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div className="space-y-2">
                    {[
                      'JavaParser AST blast radius',
                      'Kafka Outbox & Redis limits',
                      '100% F1 / 0% FPR AI eval',
                    ].map((t) => (
                      <div
                        key={t}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#F8F8F6] border border-stone-200/70 text-[12px] text-stone-700"
                      >
                        <Check className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </button>

                {/* Floating Card 2: CodeClash Arena */}
                <button
                  onClick={onOpenArena}
                  className="text-left bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:translate-y-7 hover:sm:translate-y-6 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
                      <Swords className="w-4 h-4 text-amber-700" />
                      CodeClash 1v1
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div className="space-y-2">
                    {[
                      'Zero-lag WebSocket duels',
                      'Isolated code judge sandbox',
                      'Live FIDE Elo leaderboard',
                    ].map((t) => (
                      <div
                        key={t}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#F8F8F6] border border-stone-200/70 text-[12px] text-stone-700"
                      >
                        <Check className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </button>

                {/* Floating Card 3: Real-Time Analytics */}
                <button
                  onClick={onOpenAnalytics}
                  className="text-left bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:col-span-2 sm:max-w-[300px] sm:mx-auto sm:translate-y-2 hover:sm:translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
                      <BarChart3 className="w-4 h-4 text-emerald-700" />
                      Analytics Tracker
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div className="space-y-2">
                    {[
                      'Sub-3KB cookieless tracker',
                      'Real-time visitor heartbeats',
                      'Live conversion funnel stream',
                    ].map((t) => (
                      <div
                        key={t}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#F8F8F6] border border-stone-200/70 text-[12px] text-stone-700"
                      >
                        <Check className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Monochrome Stack Bar */}
        <div className="bg-white py-6 px-5 sm:px-8">
          <div className="max-w-[1320px] mx-auto flex flex-col items-center gap-3.5">
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-stone-400 text-center">
              Core engineering stack shipped across production projects
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 text-[13px] font-semibold text-stone-500">
              {[
                'Java 21 LTS',
                'Spring Boot 3.5',
                'Apache Kafka',
                'PostgreSQL + Flyway',
                'Redis 7',
                'React + TypeScript',
                'Node.js + Socket.io',
                'Spring AI',
                'ArchUnit',
              ].map((tech) => (
                <span key={tech} className="tracking-[-0.02em] hover:text-[#111111] transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. INTERACTIVE PROJECT SHOWCASE STUDIO                         */}
      {/* ============================================================== */}
      <section
        id="projects-shelf"
        className="bg-[#F7F7F5] py-14 sm:py-20 px-4 sm:px-8 border-b border-stone-200"
      >
        <div className="max-w-[1320px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-stone-500">
                Interactive Showcase
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em] text-[#111111] mt-1">
                Things I&apos;ve built &amp;{' '}
                <span
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  className="italic font-normal text-[1.12em]"
                >
                  shipped.
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md leading-relaxed">
              Switch tabs to test a live interactive preview of each project right here, or launch the full deployed application in one click.
            </p>
          </div>

          {/* Elevated SaaS Window */}
          <div className="rounded-2xl bg-white border border-stone-200/90 shadow-[0_14px_45px_rgba(15,23,42,0.06)] overflow-hidden">
            {/* Project Switcher Tab Bar */}
            <div className="px-4 sm:px-6 border-b border-stone-200 bg-[#FAFAF8] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 overflow-x-auto">
                {PROJECTS.map((p) => {
                  const active = p.id === activeProjectId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveProjectId(p.id)}
                      className={`relative px-4 py-3.5 text-xs font-medium whitespace-nowrap inline-flex items-center gap-2 transition-colors cursor-pointer ${
                        active ? 'text-[#111111] font-semibold' : 'text-stone-500 hover:text-[#111111]'
                      }`}
                    >
                      <span className="font-mono text-[11px] text-stone-400">{p.index}</span>
                      <span>{p.shortTitle}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                          active ? 'bg-[#111111] text-white' : 'bg-stone-200/80 text-stone-600'
                        }`}
                      >
                        {p.statusBadge}
                      </span>
                      {active && (
                        <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#111111] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => launchProject(activeProject.id)}
                className="my-2 h-8 px-3.5 rounded-md bg-[#111111] hover:bg-[#27272A] text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                {activeProject.launchLabel}
              </button>
            </div>

            {/* Split Interactive Stage: Story (Left) + Live Playable Sandbox (Right) */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start bg-[#FCFCFA]">
              {/* Left: Project Deep Dive */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-stone-500">
                    {activeProject.index} · {activeProject.category}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.025em] text-[#111111] mt-1.5 leading-snug">
                    {activeProject.title}
                  </h3>
                  <p className="text-sm text-stone-600 mt-2.5 leading-relaxed">
                    {activeProject.summary}
                  </p>
                </div>

                {/* 3 Hairline KPI Pills */}
                <div className="grid grid-cols-3 divide-x divide-stone-200 rounded-xl bg-white border border-stone-200 overflow-hidden">
                  {activeProject.metrics.map((m) => (
                    <div key={m.label} className="p-3.5">
                      <div className="text-[10px] font-mono uppercase text-stone-500">{m.label}</div>
                      <div className="text-base font-semibold text-[#111111] mt-0.5 tabular-nums">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Technical Highlights */}
                <div className="space-y-2.5">
                  {activeProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-stone-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white border border-stone-200 text-[11px] font-mono text-stone-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    onClick={() => launchProject(activeProject.id)}
                    className="h-10 px-5 rounded-md bg-[#111111] hover:bg-[#27272A] text-white text-xs font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{activeProject.launchLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="h-10 px-4 rounded-md bg-white hover:bg-stone-50 border border-stone-300 text-xs font-medium text-[#111111] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      GitHub Repo
                    </a>
                  )}
                  {activeProject.driveUrl && (
                    <a
                      href={activeProject.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="h-10 px-4 rounded-md bg-white hover:bg-stone-50 border border-stone-300 text-xs font-medium text-stone-700 hover:text-[#111111] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Artifacts
                    </a>
                  )}
                </div>
              </div>

              {/* Right: Live Interactive Mini-Sandbox per Project */}
              <div className="lg:col-span-6">
                {/* SANDBOX 1: FORGE Interactive Blast-Radius Mini-Inspector */}
                {activeProject.id === 'forge' && (
                  <div className="rounded-xl bg-white border border-stone-200 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                    <div className="px-4 py-3 bg-[#FAFAF8] border-b border-stone-200 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#111111] flex items-center gap-2">
                        <Network className="w-3.5 h-3.5 text-sky-700" />
                        Interactive AST Blast-Radius Preview
                      </span>
                      <span className="font-mono text-[10.5px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        Click a service node
                      </span>
                    </div>

                    <div
                      className="p-5 space-y-4"
                      style={{
                        backgroundImage: 'radial-gradient(#D6D3CD 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                        backgroundColor: '#FAFAF8',
                      }}
                    >
                      <div className="grid grid-cols-2 gap-2.5">
                        {Object.entries(FORGE_MINI_NODES).map(([name, info]) => {
                          const isSel = name === selectedAstNode;
                          const isImpacted = astDetail.callers.includes(name);
                          return (
                            <button
                              key={name}
                              onClick={() => setSelectedAstNode(name)}
                              className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                                  : isImpacted
                                  ? 'bg-red-50 text-red-950 border-red-300'
                                  : 'bg-white text-[#111111] border-stone-200 hover:border-stone-400'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                                <span className={isSel ? 'text-stone-400' : isImpacted ? 'text-red-700' : 'text-stone-500'}>
                                  {info.layer}
                                </span>
                                {isImpacted && (
                                  <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 text-[9px]">
                                    IMPACTED
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-mono font-semibold truncate">{name}</div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="rounded-xl bg-white border border-stone-200 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-mono uppercase text-stone-400">
                              BFS Blast Result for {selectedAstNode}
                            </div>
                            <div className="text-sm font-semibold text-[#111111] mt-0.5">
                              {astDetail.callers.length} downstream component(s) affected
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10.5px] font-mono font-semibold border ${
                              astDetail.risk === 'HIGH'
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {astDetail.risk} RISK
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {astDetail.callers.length === 0 ? (
                            <span className="text-xs text-stone-500">
                              Entry-point controller — zero upstream callers affected.
                            </span>
                          ) : (
                            astDetail.callers.map((c) => (
                              <span
                                key={c}
                                className="px-2 py-1 rounded-md bg-red-50 text-red-800 border border-red-200 text-[11px] font-mono"
                              >
                                ↑ {c}
                              </span>
                            ))
                          )}
                        </div>

                        <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                          <span className="text-stone-500 font-mono text-[11px]">
                            Kafka Outbox · Gitleaks Masking · Human Gate
                          </span>
                          <button
                            onClick={onOpenForge}
                            className="font-semibold text-[#111111] hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            Full Control Plane <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SANDBOX 2: CodeClash Interactive 1v1 Duel & Elo Simulator */}
                {activeProject.id === 'codeclash' && (
                  <div className="rounded-xl bg-white border border-stone-200 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                    <div className="px-4 py-3 bg-[#FAFAF8] border-b border-stone-200 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#111111] flex items-center gap-2">
                        <Swords className="w-3.5 h-3.5 text-amber-700" />
                        Live 1v1 Duel &amp; Elo Simulator
                      </span>
                      <button
                        onClick={simulateDuel}
                        disabled={duelRunning}
                        className="px-2.5 py-1 rounded bg-[#111111] hover:bg-[#27272A] text-white text-[11px] font-medium inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        {duelRunning ? 'Simulating...' : 'Simulate Duel'}
                      </button>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono bg-[#FAFAF8] border border-stone-200 rounded-lg px-3.5 py-2.5">
                        <span className="text-stone-500">Problem:</span>
                        <span className="font-semibold text-[#111111]">
                          Longest Substring Without Repeating Chars
                        </span>
                        <span className="text-emerald-700">MEDIUM</span>
                      </div>

                      {/* Player 1 */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#111111] font-mono">
                            nischay_dev <span className="text-stone-400 font-normal">(You)</span>
                          </span>
                          <span className="font-mono text-emerald-700 font-semibold">
                            {p1Score}/12 tests passed
                          </span>
                        </div>
                        <div className="h-2.5 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#111111] transition-all duration-300"
                            style={{ width: `${(p1Score / 12) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Player 2 */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-stone-600 font-mono">
                            algo_rival <span className="text-stone-400 font-normal">(Opponent)</span>
                          </span>
                          <span className="font-mono text-stone-500">
                            {p2Score}/12 tests passed
                          </span>
                        </div>
                        <div className="h-2.5 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-amber-500 transition-all duration-300"
                            style={{ width: `${(p2Score / 12) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="rounded-xl bg-[#FAFAF8] border border-stone-200 p-4 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-stone-500">
                            Computed FIDE Elo Rating
                          </div>
                          <div className="text-xl font-mono font-semibold text-[#111111] mt-0.5 tabular-nums">
                            {eloRating}{' '}
                            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded ml-1">
                              {eloDelta} Elo
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={onOpenLeaderboard}
                            className="h-8 px-3 rounded-md bg-white hover:bg-stone-100 border border-stone-300 text-xs font-medium text-[#111111] cursor-pointer"
                          >
                            Leaderboard
                          </button>
                          <button
                            onClick={onOpenArena}
                            className="h-8 px-3 rounded-md bg-[#111111] hover:bg-[#27272A] text-white text-xs font-medium cursor-pointer"
                          >
                            Play Live →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SANDBOX 3: Real-Time Analytics Interactive Event Pulse */}
                {activeProject.id === 'analytics' && (
                  <div className="rounded-xl bg-white border border-stone-200 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                    <div className="px-4 py-3 bg-[#FAFAF8] border-b border-stone-200 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#111111] flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-emerald-700" />
                        Live Telemetry Stream Preview
                      </span>
                      <button
                        onClick={fireAnalyticsEvent}
                        className="px-2.5 py-1 rounded bg-[#111111] hover:bg-[#27272A] text-white text-[11px] font-medium inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Zap className="w-3 h-3" />
                        Send Pageview Event
                      </button>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="p-3 rounded-lg bg-[#FAFAF8] border border-stone-200">
                          <div className="text-[10px] font-mono uppercase text-stone-500">
                            Active Now
                          </div>
                          <div className="text-xl font-semibold text-emerald-700 tabular-nums mt-0.5 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            {liveVisitors}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#FAFAF8] border border-stone-200">
                          <div className="text-[10px] font-mono uppercase text-stone-500">
                            Events Ingested
                          </div>
                          <div className="text-xl font-semibold text-[#111111] tabular-nums mt-0.5">
                            {eventsCount.toLocaleString()}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#FAFAF8] border border-stone-200">
                          <div className="text-[10px] font-mono uppercase text-stone-500">
                            Snippet Size
                          </div>
                          <div className="text-xl font-semibold text-[#111111] tabular-nums mt-0.5">
                            2.4 KB
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl bg-[#FAFAF8] border border-stone-200 p-4">
                        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-3">
                          <span>Live WebSocket Heartbeat Velocity</span>
                          <span className="text-emerald-700">0 cookies · GDPR clean</span>
                        </div>
                        <div className="flex items-end gap-2 h-28 pt-2">
                          {bars.map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                              <div
                                className={`w-full rounded-t transition-all duration-300 ${
                                  i === bars.length - 1 ? 'bg-emerald-600' : 'bg-[#111111]/85'
                                }`}
                                style={{ height: `${val}%` }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-stone-500 font-mono text-[11px]">
                          Click &ldquo;Send Pageview Event&rdquo; above to stream live spikes
                        </span>
                        <button
                          onClick={onOpenAnalytics}
                          className="font-semibold text-[#111111] hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          Open Full Dashboard <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick-Scan 3-Column Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROJECTS.map((p) => {
              const isSelected = p.id === activeProjectId;
              return (
                <div
                  key={p.id}
                  onClick={() => setActiveProjectId(p.id)}
                  className={`rounded-xl p-5 border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? 'bg-white border-[#111111] shadow-[0_6px_20px_rgba(17,17,17,0.06)]'
                      : 'bg-white/80 border-stone-200 hover:border-stone-400 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-stone-400">{p.index} · {p.category}</span>
                      <span className="text-emerald-700 font-semibold">{p.statusBadge}</span>
                    </div>
                    <h4 className="text-base font-semibold text-[#111111] mt-2">{p.shortTitle}</h4>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed line-clamp-2">
                      {p.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                    <span className="font-mono text-[11px] text-stone-500">
                      {isSelected ? 'Viewing above' : 'Preview interactive'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        launchProject(p.id);
                      }}
                      className="font-semibold text-[#111111] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      Launch Live <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE SKILLS & PROJECT-PROOF MATRIX                   */}
      {/* ============================================================== */}
      <section id="skills-section" className="bg-white py-14 sm:py-20 px-5 sm:px-8 border-b border-stone-200">
        <div className="max-w-[1320px] mx-auto space-y-7">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-stone-500">
                Verified Tech Stack
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#111111] mt-1">
                Skills backed by{' '}
                <span
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  className="italic font-normal text-[1.12em]"
                >
                  working code.
                </span>
              </h2>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[{ id: 'all', label: 'All Stack' }, ...SKILL_GROUPS.map((g) => ({ id: g.id, label: g.label }))].map(
                (t) => (
                  <button
                    key={t.id}
                    onClick={() => setSkillTab(t.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      skillTab === t.id
                        ? 'bg-[#111111] text-white'
                        : 'bg-[#FAFAF8] border border-stone-200 text-stone-600 hover:text-[#111111]'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Live Interactive Proof Banner */}
          {selectedSkill && (
            <div className="rounded-xl bg-[#FAFAF8] border border-stone-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-stone-500">
                  Selected Skill:
                </span>
                <span className="font-semibold text-[#111111]">{selectedSkill.name}</span>
                <span className="text-stone-300">→</span>
                <span className="text-stone-600">Shipped in:</span>
                {selectedSkill.projects.map((pid) => {
                  const proj = PROJECTS.find((p) => p.id === pid);
                  if (!proj) return null;
                  return (
                    <button
                      key={pid}
                      onClick={() => {
                        setActiveProjectId(pid);
                        scrollTo('projects-shelf');
                      }}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-[#111111] hover:text-white border border-stone-300 text-xs font-medium text-[#111111] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {proj.shortTitle}
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  );
                })}
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                Click any technology pill below to verify where it is used
              </span>
            </div>
          )}

          {/* Clean Hairline Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleSkillGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.id}
                  className="rounded-2xl bg-[#FAFAF8] border border-stone-200/90 p-6 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#111111]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#111111]">{group.label}</h3>
                        <p className="text-[11.5px] text-stone-500">{group.tagline}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-3 border-t border-stone-200/80">
                      {group.items.map((item) => {
                        const isPicked = selectedSkill?.name === item.name;
                        return (
                          <button
                            key={item.name}
                            onClick={() => setSelectedSkill(item)}
                            className={`px-2.5 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                              isPicked
                                ? 'bg-[#111111] text-white border-[#111111]'
                                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:text-[#111111]'
                            }`}
                          >
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. ABOUT, EDUCATION & QUICK INTERACTIVE CONNECT                */}
      {/* ============================================================== */}
      <section
        id="about-section"
        className="bg-[#F7F7F5] py-14 sm:py-20 px-5 sm:px-8"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(17,17,17,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.035) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      >
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Bio & Education Editorial Sheet */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-stone-200 p-7 sm:p-10 shadow-[0_4px_24px_rgba(15,23,42,0.04)] flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#111111] text-white font-mono font-bold text-sm flex items-center justify-center">
                  NS
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-stone-500">
                    About The Engineer
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.025em] text-[#111111]">
                    Nischay Srivastava
                  </h2>
                </div>
              </div>

              <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed">
                I&apos;m a Computer Science undergraduate at{' '}
                <strong className="font-semibold text-[#111111]">
                  Feroze Gandhi Institute of Engineering and Technology (AKTU)
                </strong>
                . I care about turning complex distributed systems and algorithmic ideas into fast, verifiable, interactive software — from multi-tenant Spring Boot + Kafka control planes to 1v1 real-time WebSocket arenas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100">
              <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-500">
                  <GraduationCap className="w-3.5 h-3.5" /> Education
                </div>
                <div className="text-xs font-semibold text-[#111111] mt-1">B.Tech CSE (AKTU)</div>
                <div className="text-[11px] font-mono text-stone-500">2023 – Present</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-500">
                  <MapPin className="w-3.5 h-3.5" /> Location
                </div>
                <div className="text-xs font-semibold text-[#111111] mt-1">Raebareli, UP</div>
                <div className="text-[11px] font-mono text-stone-500">India · Remote Ready</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Focus
                </div>
                <div className="text-xs font-semibold text-[#111111] mt-1">Backend &amp; Full-Stack</div>
                <div className="text-[11px] font-mono text-stone-500">Java · Spring · React</div>
              </div>
            </div>
          </div>

          {/* Right: Quick Connect & Direct App Launchers */}
          <div className="lg:col-span-5 rounded-2xl bg-white border border-stone-200 p-7 sm:p-8 shadow-[0_4px_24px_rgba(15,23,42,0.04)] flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-stone-500">
                  Get In Touch
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#111111] mt-1">
                  Let&apos;s build something real.
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Open to Backend, Full-Stack, and Distributed Systems engineering roles &amp; internships.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAF8] border border-stone-200 flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-[#111111] truncate">
                  nischaysrivastava2@gmail.com
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="h-7 px-2.5 rounded-md bg-white hover:bg-stone-100 border border-stone-300 text-[11px] font-medium text-[#111111] inline-flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href="mailto:nischaysrivastava2@gmail.com"
                  className="flex-1 h-10 px-4 rounded-md bg-[#111111] hover:bg-[#27272A] text-white text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Send Email
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 h-10 px-4 rounded-md bg-white hover:bg-stone-50 border border-stone-300 text-xs font-medium text-[#111111] inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Resume PDF
                </a>
                <a
                  href="https://github.com/nischay237"
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-md bg-white hover:bg-stone-50 border border-stone-300 text-[#111111] inline-flex items-center justify-center transition-colors"
                  title="GitHub @nischay237"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2">
              <div className="text-[10.5px] font-mono uppercase tracking-[0.12em] text-stone-400">
                Direct Live Launchers
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'FORGE AI', fn: onOpenForge },
                  { label: 'CodeClash 1v1', fn: onOpenArena },
                  { label: 'Leaderboard', fn: onOpenLeaderboard },
                  { label: 'Live Analytics', fn: onOpenAnalytics },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.fn}
                    className="px-3 py-2 rounded-lg bg-[#FAFAF8] hover:bg-[#111111] hover:text-white border border-stone-200 text-xs font-medium text-[#111111] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. INTERACTIVE ⌘K COMMAND PALETTE                              */}
      {/* ============================================================== */}
      {cmdOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[2px] flex items-start justify-center pt-[14vh] px-4"
          onClick={() => setCmdOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-stone-200 flex items-center gap-2.5">
              <Search className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                autoFocus
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                placeholder="Jump to FORGE AI, CodeClash, Resume, GitHub..."
                className="flex-1 bg-transparent text-sm text-[#111111] placeholder:text-stone-400 focus:outline-none"
              />
              <button
                onClick={() => setCmdOpen(false)}
                className="text-stone-400 hover:text-[#111111] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto divide-y divide-stone-100">
              {filteredCommands.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-500">
                  No matching commands.
                </div>
              ) : (
                filteredCommands.map((c) => {
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.label}
                      onClick={() => {
                        setCmdOpen(false);
                        setCmdQuery('');
                        c.run();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#FAFAF8] flex items-center justify-between gap-3 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5 text-xs font-medium text-[#111111]">
                        <Icon className="w-4 h-4 text-stone-500" />
                        {c.label}
                      </span>
                      <span className="font-mono text-[10.5px] text-stone-400">{c.hint}</span>
                    </button>
                  );
                })
              )}
            </div>
            <div className="px-4 py-2 bg-[#FAFAF8] border-t border-stone-200 flex items-center justify-between text-[10.5px] font-mono text-stone-400">
              <span className="inline-flex items-center gap-1">
                <Command className="w-3 h-3" /> Quick Navigator
              </span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
