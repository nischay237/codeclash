import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Award,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  Command,
  Copy,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Network,
  Play,
  Search,
  ShieldCheck,
  Swords,
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
    icon: Network,
    iconBg: 'bg-rose-50 text-[#E64978]',
    badge: '100% F1 EVAL',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    shortTitle: 'FORGE AI Platform',
    title: 'FORGE — AI Software Engineering Intelligence Platform',
    category: 'Java 21 · Spring Boot 3.5 · Kafka · AI',
    summary:
      'Multi-tenant Spring Boot 3.5 control plane parsing JavaParser AST dependency graphs, computing exact BFS blast radius, masking leaked secrets & blocking prompt injections with reproducible 100% F1 benchmarks.',
    highlights: [
      'Java 21 + Spring Boot 3.5 modular monolith with Kafka Transactional Outbox, DLT & Redis',
      'JavaParser AST Dependency Graph & BFS Change Impact Analysis for callers & tests',
      'Gitleaks secret masking, Semgrep SAST, prompt-injection defense & 8-case Eval Suite',
      'Multi-tenant JWT + RBAC isolation, Flyway migrations, OpenTelemetry & ArchUnit tests',
    ],
    techStack: ['Java 21', 'Spring Boot 3.5', 'Apache Kafka', 'Redis', 'PostgreSQL', 'JavaParser AST', 'React + TS'],
    githubUrl: 'https://github.com/nischay237/forge-ai-platform',
    cta: 'Open Control Plane',
  },
  {
    id: 'codeclash',
    icon: Swords,
    iconBg: 'bg-amber-50 text-amber-600',
    badge: 'PLAYABLE LIVE',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    shortTitle: 'CodeClash 1v1 Arena',
    title: 'CodeClash — 1v1 Real-Time Coding Battle Arena',
    category: 'WebSockets · Node.js · Sandbox · FIDE Elo',
    summary:
      'Head-to-head competitive DSA battle arena synchronizing live keystrokes and test progress over Socket.io, judging code inside an isolated sandbox, and updating live FIDE Elo leaderboards.',
    highlights: [
      'Bidirectional Socket.io WebSocket engine for zero-lag keystroke and match sync',
      'Isolated code execution sandbox with strict security and timeout guards',
      'FIDE-grade Elo rating system updating global player standings after every match',
      'Dual persistence backed by MongoDB Atlas with resilient in-memory fallback',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'Socket.io', 'Tailwind CSS', 'MongoDB'],
    githubUrl: 'https://github.com/nischay237/codeclash',
    cta: 'Launch 1v1 Arena',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    iconBg: 'bg-sky-50 text-sky-600',
    badge: '<3KB SCRIPT',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
    shortTitle: 'Analytics Tracker',
    title: 'Real-Time Analytics Tracker & Telemetry Dashboard',
    category: 'Privacy-First · Node.js · Live Telemetry',
    summary:
      'Self-hosted, cookieless web telemetry platform under 3KB replacing heavy trackers with real-time visitor heartbeats, pageview velocity streams, and clean conversion funnels.',
    highlights: [
      'Ultra-lightweight embeddable tracking snippet under 3KB with zero tracking cookies',
      'Real-time active visitor counts synchronized via WebSocket session heartbeats',
      'High-throughput ingestion pipeline engineered on Node.js, Express, and MongoDB',
      'Interactive analytics dashboard displaying live session graphs and funnels',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST APIs'],
    githubUrl: 'https://github.com/nischay237/analytics-tracker',
    driveUrl: 'https://drive.google.com/drive/folders/1yDR9xbt8fTiyh9TyWV9C4lS6Y4Th3-61?usp=sharing',
    cta: 'Open Live Dashboard',
  },
];

const FORGE_NODES = {
  TransferController: { layer: 'API', callers: [], risk: 'LOW' },
  SettlementService: { layer: 'SERVICE', callers: ['TransferController', 'SettlementServiceTest'], risk: 'HIGH' },
  FraudRiskEngine: { layer: 'SERVICE', callers: ['SettlementService', 'TransferController', 'SettlementServiceTest'], risk: 'HIGH' },
  LedgerRepository: { layer: 'DATA', callers: ['SettlementService', 'TransferController', 'SettlementServiceTest'], risk: 'HIGH' },
};

const SKILL_GROUPS = [
  {
    id: 'backend',
    label: 'Backend & Distributed',
    items: [
      { name: 'Java 21 LTS', projects: ['forge'] },
      { name: 'Spring Boot 3.5', projects: ['forge'] },
      { name: 'Apache Kafka & Outbox', projects: ['forge'] },
      { name: 'Node.js & Express', projects: ['codeclash', 'analytics'] },
      { name: 'Spring Security & JWT', projects: ['forge'] },
      { name: 'Socket.io WebSockets', projects: ['codeclash', 'analytics'] },
      { name: 'Resilience4j & ArchUnit', projects: ['forge'] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend UI',
    items: [
      { name: 'React 18 & TypeScript', projects: ['forge', 'codeclash', 'analytics'] },
      { name: 'Tailwind CSS', projects: ['forge', 'codeclash', 'analytics'] },
      { name: 'React Flow & Monaco', projects: ['forge'] },
      { name: 'TanStack Query & Zustand', projects: ['forge'] },
      { name: 'Vite & Recharts', projects: ['forge', 'analytics'] },
    ],
  },
  {
    id: 'data',
    label: 'Databases & Cache',
    items: [
      { name: 'PostgreSQL + pgvector', projects: ['forge'] },
      { name: 'Redis Rate Limiting', projects: ['forge'] },
      { name: 'Flyway Migrations', projects: ['forge'] },
      { name: 'MongoDB Atlas', projects: ['codeclash', 'analytics'] },
      { name: 'Spring Data JPA', projects: ['forge'] },
    ],
  },
  {
    id: 'ai',
    label: 'AI & DevOps',
    items: [
      { name: 'JavaParser AST & BFS', projects: ['forge'] },
      { name: 'Spring AI / Gemini API', projects: ['forge'] },
      { name: 'Prompt-Injection Defense', projects: ['forge'] },
      { name: 'Docker & CI Pipelines', projects: ['forge', 'codeclash'] },
      { name: 'OpenTelemetry & Prometheus', projects: ['forge'] },
    ],
  },
  {
    id: 'cs',
    label: 'CS Core',
    items: [
      { name: 'Data Structures & Graphs', projects: ['forge', 'codeclash'] },
      { name: 'FIDE Elo Algorithms', projects: ['codeclash'] },
      { name: 'Transactional Outbox', projects: ['forge'] },
      { name: 'DBMS & Indexing', projects: ['forge', 'analytics'] },
      { name: 'Concurrency & OS', projects: ['forge', 'codeclash'] },
    ],
  },
];

export default function Portfolio({
  onOpenArena,
  onOpenLeaderboard,
  onOpenAnalytics,
  onOpenForge,
}) {
  const [showBanner, setShowBanner] = useState(true);
  const [activeLabId, setActiveLabId] = useState('forge');
  const [selectedAstNode, setSelectedAstNode] = useState('FraudRiskEngine');
  const [duelRunning, setDuelRunning] = useState(false);
  const [p1Tests, setP1Tests] = useState(12);
  const [p2Tests, setP2Tests] = useState(9);
  const [elo, setElo] = useState(1438);
  const [eloDelta, setEloDelta] = useState('+18');
  const [visitors, setVisitors] = useState(42);
  const [events, setEvents] = useState(1284);
  const [bars, setBars] = useState([46, 68, 52, 86, 62, 95, 74, 88, 60, 92]);
  const [skillFilter, setSkillFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState({ name: 'Java 21 LTS', projects: ['forge'] });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const activeLab = useMemo(
    () => PROJECTS.find((p) => p.id === activeLabId) || PROJECTS[0],
    [activeLabId]
  );

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
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const simulateDuel = () => {
    if (duelRunning) return;
    setDuelRunning(true);
    setP1Tests(2);
    setP2Tests(1);
    const seq = [
      [4, 3],
      [7, 5],
      [9, 8],
      [11, 9],
      [12, 10],
    ];
    seq.forEach(([a, b], idx) => {
      setTimeout(() => {
        setP1Tests(a);
        setP2Tests(b);
        if (idx === seq.length - 1) {
          setDuelRunning(false);
          setElo((v) => v + 14);
          setEloDelta('+14');
        }
      }, (idx + 1) * 240);
    });
  };

  const fireTelemetry = () => {
    setVisitors((v) => v + 1);
    setEvents((e) => e + 1);
    setBars((prev) => [...prev.slice(1), Math.floor(45 + Math.random() * 54)]);
  };

  const astInfo = FORGE_NODES[selectedAstNode];
  const visibleSkillGroups =
    skillFilter === 'all' ? SKILL_GROUPS : SKILL_GROUPS.filter((g) => g.id === skillFilter);

  const commands = useMemo(
    () => [
      { label: 'Open FORGE AI Control Plane', meta: '/forge', icon: Network, run: () => onOpenForge?.() },
      { label: 'Launch CodeClash 1v1 Battle Arena', meta: '/arena', icon: Swords, run: () => onOpenArena?.() },
      { label: 'View CodeClash Global Leaderboard', meta: '/leaderboard', icon: Award, run: () => onOpenLeaderboard?.() },
      { label: 'Launch Real-Time Analytics Tracker', meta: '/analytics', icon: BarChart3, run: () => onOpenAnalytics?.() },
      { label: 'Open Resume PDF', meta: '/resume.pdf', icon: FileText, run: () => window.open('/resume.pdf', '_blank', 'noopener,noreferrer') },
      { label: 'Copy Email (nischaysrivastava2@gmail.com)', meta: 'Clipboard', icon: Copy, run: handleCopyEmail },
      { label: 'Open GitHub Profile (@nischay237)', meta: 'GitHub', icon: GithubIcon, run: () => window.open('https://github.com/nischay237', '_blank', 'noopener,noreferrer') },
    ],
    [onOpenForge, onOpenArena, onOpenLeaderboard, onOpenAnalytics]
  );

  const filteredCmds = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(cmdQuery.toLowerCase()) ||
      c.meta.toLowerCase().includes(cmdQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-white text-[#1E2438] selection:bg-[#E64978] selection:text-white"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* 1. DEEP NAVY TOP ANNOUNCEMENT BAR (Signature GrowFast Header Strip) */}
      {showBanner && (
        <div className="bg-[#232946] text-white/90 text-[11.5px] py-2 px-4 relative">
          <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-2 text-center pr-6">
            <span>
              Open to Software Engineering, Backend &amp; Full-Stack Roles — Explore{' '}
              <button
                onClick={onOpenForge}
                className="underline underline-offset-2 font-semibold text-white hover:text-rose-300 cursor-pointer"
              >
                FORGE AI Platform
              </button>{' '}
              &amp;{' '}
              <button
                onClick={onOpenArena}
                className="underline underline-offset-2 font-semibold text-white hover:text-rose-300 cursor-pointer"
              >
                CodeClash 1v1
              </button>{' '}
              live.
            </span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss announcement"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. CRISP PURE-WHITE CLEAN NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className="w-7 h-7 rounded-full shrink-0"
              style={{
                background: 'linear-gradient(135deg, #F687B3 0%, #E64978 55%, #C5305C 100%)',
              }}
            />
            <span className="text-[19px] tracking-[-0.03em] text-[#1E2438]">
              <strong className="font-bold">Nischay</strong>
              <span className="italic font-semibold text-[#E64978]">Dev</span>
            </span>
          </button>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-medium text-slate-600">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#1E2438] font-semibold cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('projects-section')}
              className="hover:text-[#E64978] transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo('interactive-lab')}
              className="hover:text-[#E64978] transition-colors cursor-pointer"
            >
              Interactive Lab
            </button>
            <button
              onClick={() => scrollTo('skills-section')}
              className="hover:text-[#E64978] transition-colors cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => scrollTo('about-section')}
              className="hover:text-[#E64978] transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Right Controls: Search Icon + Resume + Rose-Coral Pill CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCmdOpen(true)}
              title="Quick Jump (Ctrl + K)"
              className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-600 hover:text-[#1E2438] inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#1E2438] transition-colors"
            >
              Resume <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onOpenForge}
              className="h-10 px-5 rounded-full bg-[#E64978] hover:bg-[#D43666] text-white text-xs font-semibold shadow-sm shadow-rose-500/25 inline-flex items-center gap-1 transition-all cursor-pointer"
            >
              Launch FORGE AI <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. WARM HUMAN TEAM HERO BANNER (Crisp Smiling Engineers + Left White Editorial Copy) */}
      <section className="relative min-h-[540px] lg:min-h-[600px] flex items-center overflow-hidden bg-[#1D1B29]">
        {/* Crisp Full-Width Human Photograph */}
        <img
          src="/hero-team-bg.jpg"
          alt="Software engineers collaborating warmly in a sunlit studio"
          className="absolute inset-0 w-full h-full object-cover object-[65%_center]"
        />

        {/* Smooth Directional Scrim: Left dark-warm for crisp white text, Right open & sunlit for people */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(96deg, rgba(24,20,34,0.86) 0%, rgba(30,22,38,0.68) 42%, rgba(28,22,36,0.22) 72%, rgba(24,20,34,0.08) 100%)',
          }}
        />

        {/* Foreground Left Editorial Hero Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 w-full">
          <div className="max-w-[580px] space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-[11px] font-medium text-white/95">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Nischay Srivastava · Full-Stack &amp; Distributed Systems
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-bold tracking-[-0.025em] leading-[1.14] text-white">
              There&apos;s a Better Way to Build{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Scalable</span>
                <span
                  className="absolute left-0 right-0 bottom-1 h-3 bg-[#E64978]/80 -z-0 rounded-xs"
                  aria-hidden="true"
                />
              </span>{' '}
              Software
            </h1>

            <p className="text-sm sm:text-[16px] text-white/85 leading-relaxed max-w-lg">
              Computer Science engineer building Java 21 + Spring Boot &amp; Kafka control planes,
              real-time 1v1 WebSocket coding arenas, and privacy-first analytics tools you can test
              live.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('projects-section')}
                className="h-11 px-6 rounded-full bg-[#E64978] hover:bg-[#D43666] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-900/30 inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                Explore Live Projects <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="h-11 px-5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-all"
              >
                View Resume <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Direct Live Project Quick Pills */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-xs text-white/80">
              <span className="text-white/60 mr-1">Jump live:</span>
              <button
                onClick={onOpenForge}
                className="px-3 py-1 rounded-full bg-white/12 hover:bg-white/25 border border-white/20 text-white font-medium transition-colors cursor-pointer"
              >
                FORGE AI ↗
              </button>
              <button
                onClick={onOpenArena}
                className="px-3 py-1 rounded-full bg-white/12 hover:bg-white/25 border border-white/20 text-white font-medium transition-colors cursor-pointer"
              >
                CodeClash 1v1 ↗
              </button>
              <button
                onClick={onOpenAnalytics}
                className="px-3 py-1 rounded-full bg-white/12 hover:bg-white/25 border border-white/20 text-white font-medium transition-colors cursor-pointer"
              >
                Analytics ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PURE-WHITE "PROJECTS I'VE BUILT" SECTION (Direct GrowFast "Services We Offer" Style) */}
      <section id="projects-section" className="py-16 sm:py-22 px-5 sm:px-8 bg-white">
        <div className="max-w-[1200px] mx-auto space-y-10">
          {/* Editorial Section Header with Rose Highlighter Underline + Outlined Button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-[-0.025em] text-[#1E2438]">
                Projects{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">I&apos;ve Built</span>
                  <span
                    className="absolute left-0 right-0 bottom-1 h-2.5 bg-[#E64978]/25 -z-0"
                    aria-hidden="true"
                  />
                </span>
              </h2>
              <p className="text-sm text-slate-500 mt-2.5 leading-relaxed">
                Three production-focused systems covering distributed Java microservices, real-time
                WebSockets, and lightweight web telemetry — all deployed and interactive.
              </p>
            </div>

            <button
              onClick={onOpenForge}
              className="h-10 px-5 rounded-md border border-slate-300 hover:border-[#232946] text-xs font-semibold text-[#1E2438] hover:bg-slate-50 inline-flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer self-start sm:self-auto"
            >
              Open FORGE Control Plane <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Clean White Project Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className="rounded-xl bg-white border border-slate-200/85 p-6 sm:p-7 hover:shadow-[0_16px_42px_rgba(30,36,56,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${project.iconBg}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold border ${project.badgeClass}`}
                      >
                        {project.badge}
                      </span>
                    </div>

                    <div>
                      <div className="text-[11px] font-mono text-slate-400 mb-1">
                        {project.category}
                      </div>
                      <h3 className="text-lg font-bold text-[#1E2438] leading-snug">
                        {project.shortTitle}
                      </h3>
                      <p className="text-xs sm:text-[13.5px] text-slate-600 mt-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-1">
                      {project.highlights.slice(0, 3).map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E64978] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200/70 text-[10.5px] font-mono text-slate-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={() => launchProject(project.id)}
                        className="text-xs font-semibold text-[#E64978] hover:text-[#C5305C] inline-flex items-center gap-1 cursor-pointer"
                      >
                        {project.cta} <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveLabId(project.id);
                            scrollTo('interactive-lab');
                          }}
                          className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-[#1E2438] transition-colors cursor-pointer"
                        >
                          Try Sandbox
                        </button>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="GitHub Repository"
                          className="w-7 h-7 rounded-md border border-slate-200 hover:border-slate-400 text-slate-600 hover:text-[#1E2438] inline-flex items-center justify-center transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE LIVE ENGINEERING LAB (Playable Preview Sandboxes) */}
      <section
        id="interactive-lab"
        className="py-16 sm:py-20 px-5 sm:px-8 bg-[#F7F8FC] border-y border-slate-200/70"
      >
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#1E2438]">
                Interactive{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Engineering Lab</span>
                  <span
                    className="absolute left-0 right-0 bottom-1 h-2.5 bg-[#E64978]/25 -z-0"
                    aria-hidden="true"
                  />
                </span>
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Test each system live right here — trace AST blast radius, simulate a 1v1 Elo duel,
                or stream live telemetry events.
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white border border-slate-200 shadow-xs">
              {PROJECTS.map((p) => {
                const act = p.id === activeLabId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveLabId(p.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      act
                        ? 'bg-[#E64978] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#1E2438]'
                    }`}
                  >
                    {p.shortTitle}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-[0_12px_36px_rgba(30,36,56,0.06)] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-4">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold border ${activeLab.badgeClass}`}
              >
                {activeLab.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E2438] leading-snug">
                {activeLab.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{activeLab.summary}</p>
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  onClick={() => launchProject(activeLab.id)}
                  className="h-10 px-5 rounded-full bg-[#E64978] hover:bg-[#D43666] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {activeLab.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={activeLab.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 px-4 rounded-full border border-slate-300 hover:border-[#232946] text-xs font-semibold text-[#1E2438] inline-flex items-center gap-1.5 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> Source Code
                </a>
                {activeLab.driveUrl && (
                  <a
                    href={activeLab.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 px-4 rounded-full border border-slate-200 hover:border-slate-400 text-xs font-semibold text-slate-600 inline-flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Docs
                  </a>
                )}
              </div>
            </div>

            {/* Right Interactive Live Widget */}
            <div className="lg:col-span-7">
              {activeLab.id === 'forge' && (
                <div className="rounded-xl bg-[#F8F9FC] border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1E2438] flex items-center gap-2">
                      <Network className="w-4 h-4 text-[#E64978]" />
                      JavaParser AST Blast-Radius Tracer
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">Click any service</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {Object.entries(FORGE_NODES).map(([name, meta]) => {
                      const isSel = name === selectedAstNode;
                      const isImp = astInfo.callers.includes(name);
                      return (
                        <button
                          key={name}
                          onClick={() => setSelectedAstNode(name)}
                          className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSel
                              ? 'bg-[#232946] text-white border-[#232946] shadow-md'
                              : isImp
                              ? 'bg-rose-50 text-[#C5305C] border-rose-300'
                              : 'bg-white text-[#1E2438] border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className={isSel ? 'text-rose-300' : 'text-slate-400'}>
                              {meta.layer}
                            </span>
                            {isImp && <span className="font-bold text-[#E64978]">↑ Impacted</span>}
                          </div>
                          <div className="text-xs font-mono font-semibold mt-1 truncate">{name}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="rounded-lg bg-white border border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-600">
                      BFS Blast Radius for <strong className="text-[#1E2438]">{selectedAstNode}</strong>:{' '}
                      <strong>{astInfo.callers.length}</strong> downstream caller(s)
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold ${
                        astInfo.risk === 'HIGH'
                          ? 'bg-rose-100 text-[#C5305C]'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {astInfo.risk} RISK
                    </span>
                  </div>
                </div>
              )}

              {activeLab.id === 'codeclash' && (
                <div className="rounded-xl bg-[#F8F9FC] border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#1E2438] flex items-center gap-2">
                      <Swords className="w-4 h-4 text-amber-600" />
                      Live 1v1 Match &amp; FIDE Elo Simulator
                    </span>
                    <button
                      onClick={simulateDuel}
                      disabled={duelRunning}
                      className="px-3.5 py-1.5 rounded-full bg-[#E64978] hover:bg-[#D43666] text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {duelRunning ? 'Simulating...' : 'Simulate Duel'}
                    </button>
                  </div>

                  <div className="space-y-3 bg-white rounded-xl border border-slate-200 p-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <strong className="text-[#1E2438]">nischay_dev (You)</strong>
                        <span className="text-emerald-700 font-semibold">{p1Tests}/12 passed</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#232946] transition-all duration-200"
                          style={{ width: `${(p1Tests / 12) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono text-slate-500">
                        <span>algo_rival (Opponent)</span>
                        <span>{p2Tests}/12 passed</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#E64978] transition-all duration-200"
                          style={{ width: `${(p2Tests / 12) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-4 py-3">
                    <div>
                      <div className="text-[10.5px] font-mono uppercase text-slate-400">
                        Live FIDE Elo Rating
                      </div>
                      <div className="text-lg font-mono font-bold text-[#1E2438]">
                        {elo}{' '}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 ml-1">
                          {eloDelta} Elo
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={onOpenLeaderboard}
                      className="px-3.5 py-1.5 rounded-full border border-slate-300 hover:border-[#232946] text-xs font-semibold text-[#1E2438] cursor-pointer"
                    >
                      Leaderboard ›
                    </button>
                  </div>
                </div>
              )}

              {activeLab.id === 'analytics' && (
                <div className="rounded-xl bg-[#F8F9FC] border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Active: <strong className="text-[#1E2438]">{visitors}</strong>
                      </span>
                      <span>
                        Events: <strong className="text-[#1E2438]">{events.toLocaleString()}</strong>
                      </span>
                    </div>
                    <button
                      onClick={fireTelemetry}
                      className="px-3.5 py-1.5 rounded-full bg-[#E64978] hover:bg-[#D43666] text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Zap className="w-3 h-3" /> Send Event
                    </button>
                  </div>

                  <div className="rounded-xl bg-white border border-slate-200 p-4">
                    <div className="h-28 flex items-end gap-2 pt-2">
                      {bars.map((val, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 rounded-t-md transition-all duration-200 ${
                            idx === bars.length - 1 ? 'bg-[#E64978]' : 'bg-[#232946]/85'
                          }`}
                          style={{ height: `${val}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 mt-2 border-t border-slate-100">
                      <span>2.4KB snippet · 0 tracking cookies</span>
                      <span className="text-emerald-600 font-semibold">WebSocket Stream</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE SKILLS & VERIFIED PROOF */}
      <section id="skills-section" className="py-16 sm:py-20 px-5 sm:px-8 bg-white">
        <div className="max-w-[1200px] mx-auto space-y-7">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#1E2438]">
                Technical{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Skills &amp; Stack</span>
                  <span
                    className="absolute left-0 right-0 bottom-1 h-2.5 bg-[#E64978]/25 -z-0"
                    aria-hidden="true"
                  />
                </span>
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Click any technology pill to see which deployed project uses it in production.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[{ id: 'all', label: 'All' }, ...SKILL_GROUPS.map((g) => ({ id: g.id, label: g.label }))].map(
                (t) => (
                  <button
                    key={t.id}
                    onClick={() => setSkillFilter(t.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      skillFilter === t.id
                        ? 'bg-[#232946] text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-[#1E2438]'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              )}
            </div>
          </div>

          {selectedSkill && (
            <div className="rounded-xl bg-[#F8F9FC] border border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#E64978] font-semibold">
                  {selectedSkill.name}
                </span>
                <span className="text-slate-400">→</span>
                <span className="text-slate-600">Shipped live in:</span>
                {selectedSkill.projects.map((pid) => {
                  const proj = PROJECTS.find((p) => p.id === pid);
                  if (!proj) return null;
                  return (
                    <button
                      key={pid}
                      onClick={() => launchProject(pid)}
                      className="px-3 py-1 rounded-full bg-white hover:bg-[#E64978] hover:text-white border border-slate-200 font-semibold text-[#1E2438] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {proj.shortTitle} <ArrowUpRight className="w-3 h-3" />
                    </button>
                  );
                })}
              </div>
              <span className="text-[11px] font-mono text-slate-400">Verified project links</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleSkillGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-xl bg-white border border-slate-200/85 p-6 space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#1E2438]">{group.label}</h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {group.items.length} skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const isPicked = selectedSkill?.name === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSelectedSkill(item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          isPicked
                            ? 'bg-[#232946] text-white border-[#232946]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#E64978] hover:text-[#1E2438]'
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ABOUT NISCHAY & DEEP-NAVY CONTACT CTA */}
      <section
        id="about-section"
        className="py-16 sm:py-20 px-5 sm:px-8 bg-[#F7F8FC] border-t border-slate-200/70"
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200/85 p-7 sm:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E64978]">
                <Layers className="w-4 h-4" /> About The Engineer
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#1E2438]">
                Nischay Srivastava
              </h2>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                I&apos;m a Computer Science undergraduate at{' '}
                <strong className="text-[#1E2438]">
                  Feroze Gandhi Institute of Engineering and Technology (AKTU)
                </strong>
                . I enjoy turning complex distributed systems and algorithmic problems into fast,
                clean, interactive products — from multi-tenant Spring Boot + Kafka AI platforms to
                1v1 real-time WebSocket coding arenas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              <div className="p-3.5 rounded-xl bg-[#F8F9FC] border border-slate-200/70">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <GraduationCap className="w-3.5 h-3.5 text-[#E64978]" /> Education
                </div>
                <div className="text-xs font-bold text-[#1E2438] mt-1">B.Tech CSE (AKTU)</div>
                <div className="text-[11px] text-slate-500">2023 – Present</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8F9FC] border border-slate-200/70">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#E64978]" /> Location
                </div>
                <div className="text-xs font-bold text-[#1E2438] mt-1">Raebareli, UP</div>
                <div className="text-[11px] text-slate-500">India · Remote Ready</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8F9FC] border border-slate-200/70">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Focus
                </div>
                <div className="text-xs font-bold text-[#1E2438] mt-1">Backend &amp; Full-Stack</div>
                <div className="text-[11px] text-slate-500">Java · Spring · React</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#232946] text-white p-7 sm:p-9 flex flex-col justify-between gap-6 shadow-xl shadow-slate-900/15">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-rose-300 text-[11px] font-semibold">
                Let&apos;s Connect
              </span>
              <h3 className="text-2xl font-bold tracking-[-0.02em]">
                Ready to ship together?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Available for SWE, Backend, and Full-Stack engineering roles &amp; internships.
              </p>

              <div className="p-3 rounded-xl bg-white/8 border border-white/15 flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-white/90 truncate">
                  nischaysrivastava2@gmail.com
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded-md bg-white/15 hover:bg-white/25 text-[11px] font-semibold text-white inline-flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-300" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-1">
                <a
                  href="mailto:nischaysrivastava2@gmail.com"
                  className="flex-1 h-10 px-4 rounded-full bg-[#E64978] hover:bg-[#D43666] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> Send Email
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 h-10 px-4 rounded-full bg-white/12 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" /> Resume PDF
                </a>
                <a
                  href="https://github.com/nischay237"
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub @nischay237"
                  className="w-10 h-10 rounded-full bg-white/12 hover:bg-white/20 border border-white/20 text-white inline-flex items-center justify-center transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
              {[
                { label: 'FORGE AI', fn: onOpenForge },
                { label: 'CodeClash 1v1', fn: onOpenArena },
                { label: 'Leaderboard', fn: onOpenLeaderboard },
                { label: 'Analytics', fn: onOpenAnalytics },
              ].map((b) => (
                <button
                  key={b.label}
                  onClick={b.fn}
                  className="px-3 py-2 rounded-lg bg-white/8 hover:bg-[#E64978] text-white/90 hover:text-white font-medium flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{b.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLEAN ⌘K QUICK JUMP MODAL */}
      {cmdOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1E2438]/45 backdrop-blur-xs flex items-start justify-center pt-[14vh] px-4"
          onClick={() => setCmdOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                autoFocus
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                placeholder="Jump to FORGE AI, CodeClash, Resume, GitHub..."
                className="flex-1 bg-transparent text-sm text-[#1E2438] placeholder:text-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setCmdOpen(false)}
                className="text-slate-400 hover:text-[#1E2438] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto divide-y divide-slate-100">
              {filteredCmds.map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.label}
                    onClick={() => {
                      setCmdOpen(false);
                      setCmdQuery('');
                      c.run();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5 text-xs font-semibold text-[#1E2438]">
                      <Icon className="w-4 h-4 text-[#E64978]" />
                      {c.label}
                    </span>
                    <span className="font-mono text-[10.5px] text-slate-400">{c.meta}</span>
                  </button>
                );
              })}
            </div>
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10.5px] font-mono text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Command className="w-3 h-3" /> Quick Jump
              </span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
