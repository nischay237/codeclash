import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BarChart3,
  Check,
  CheckCircle2,
  Command,
  Copy,
  ExternalLink,
  FileText,
  Mail,
  Network,
  Play,
  Search,
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
    index: '01',
    displayTitle: 'FORGE AI',
    fullTitle: 'FORGE — AI Software Engineering Intelligence Platform',
    subtitle: 'JAVA 21 · SPRING BOOT 3.5 · KAFKA OUTBOX · AST BLAST RADIUS',
    badge: '100% F1 EVAL',
    accentBg: 'bg-[#FBBF04]',
    accentText: 'text-[#111111]',
    accentHex: '#FBBF04',
    summary:
      'Multi-tenant Spring Boot 3.5 control plane that parses JavaParser AST dependency graphs, computes BFS blast radius, masks leaked secrets & blocks prompt injections, and proves accuracy with an 8-case reproducible evaluation benchmark.',
    highlights: [
      'Java 21 + Spring Boot 3.5 modular monolith with Transactional Outbox, Kafka DLT, Redis & Resilience4j',
      'JavaParser AST Dependency Graph & BFS Change Impact Analysis computing affected classes & tests',
      'Gitleaks secret masking, Semgrep SAST, prompt-injection defense & 8-case Eval Suite (100% F1 / 0% FPR)',
      'Multi-tenant JWT + RBAC isolation, Flyway migrations, OpenTelemetry & 4 ArchUnit boundary rules',
    ],
    techStack: ['Java 21', 'Spring Boot 3.5', 'Apache Kafka', 'Redis', 'PostgreSQL', 'JavaParser AST', 'Spring AI', 'React + TS'],
    githubUrl: 'https://github.com/nischay237/forge-ai-platform',
    cta: 'OPEN CONTROL PLANE',
  },
  {
    id: 'codeclash',
    index: '02',
    displayTitle: 'CODECLASH',
    fullTitle: 'CodeClash — 1v1 Real-Time Coding Battle Arena',
    subtitle: 'WEBSOCKETS · NODE.JS · SANDBOX JUDGE · FIDE ELO RATINGS',
    badge: 'PLAYABLE LIVE',
    accentBg: 'bg-[#F94144]',
    accentText: 'text-white',
    accentHex: '#F94144',
    summary:
      'Head-to-head competitive DSA battle arena syncing live keystrokes & test-case progress over low-latency Socket.io channels, evaluating submissions inside an isolated sandbox, and computing real FIDE Elo ratings.',
    highlights: [
      'Bidirectional Socket.io WebSocket engine for zero-lag keystroke and match progress sync',
      'Isolated code execution sandbox with strict security and timeout guards',
      'FIDE-grade Elo rating system updating global player standings after every match',
      'Dual persistence on MongoDB Atlas with resilient in-memory fallback',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'Socket.io', 'Tailwind CSS', 'MongoDB'],
    githubUrl: 'https://github.com/nischay237/codeclash',
    cta: 'LAUNCH 1V1 ARENA',
  },
  {
    id: 'analytics',
    index: '03',
    displayTitle: 'ANALYTICS',
    fullTitle: 'Real-Time Analytics Tracker & Telemetry Dashboard',
    subtitle: '<3KB SCRIPT · ZERO COOKIES · LIVE HEARTBEATS · FUNNELS',
    badge: '<3KB LIVE',
    accentBg: 'bg-[#00B86B]',
    accentText: 'text-white',
    accentHex: '#00B86B',
    summary:
      'Self-hosted, privacy-first web telemetry platform under 3KB with zero third-party cookie bloat. Streams active visitor heartbeats, pageview velocity, and clean conversion funnels in real time.',
    highlights: [
      'Ultra-lightweight embeddable tracking snippet under 3KB with zero tracking cookies',
      'Real-time active visitor count synchronized over WebSocket session heartbeats',
      'High-throughput ingestion pipeline built with Node.js, Express, and MongoDB',
      'Interactive analytics dashboard with live session graphs and conversion funnels',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST APIs'],
    githubUrl: 'https://github.com/nischay237/analytics-tracker',
    driveUrl: 'https://drive.google.com/drive/folders/1yDR9xbt8fTiyh9TyWV9C4lS6Y4Th3-61?usp=sharing',
    cta: 'OPEN DASHBOARD',
  },
];

const FORGE_NODES = {
  TransferController: { layer: '01 API', callers: [], risk: 'LOW' },
  SettlementService: { layer: '02 SERVICE', callers: ['TransferController', 'SettlementServiceTest'], risk: 'HIGH' },
  FraudRiskEngine: { layer: '02 SERVICE', callers: ['SettlementService', 'TransferController', 'SettlementServiceTest'], risk: 'HIGH' },
  LedgerRepository: { layer: '03 DATA', callers: ['SettlementService', 'TransferController', 'SettlementServiceTest'], risk: 'HIGH' },
};

const SKILL_GROUPS = [
  {
    id: 'backend',
    label: 'BACKEND & DISTRIBUTED',
    dot: 'bg-[#2B44B8]',
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
    label: 'FRONTEND UI',
    dot: 'bg-[#FBBF04]',
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
    label: 'DATABASES & CACHE',
    dot: 'bg-[#00B86B]',
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
    label: 'AI & DEVOPS',
    dot: 'bg-[#F94144]',
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
    label: 'CS CORE',
    dot: 'bg-[#F26CA7]',
    items: [
      { name: 'Data Structures & Graphs', projects: ['forge', 'codeclash'] },
      { name: 'FIDE Elo Algorithms', projects: ['codeclash'] },
      { name: 'Transactional Outbox', projects: ['forge'] },
      { name: 'DBMS & Query Tuning', projects: ['forge', 'analytics'] },
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
  const [hoveredId, setHoveredId] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState('forge');
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

  const focusedHeroProject = useMemo(
    () => PROJECTS.find((p) => p.id === (hoveredId || activeProjectId)) || PROJECTS[0],
    [hoveredId, activeProjectId]
  );

  const activeLabProject = useMemo(
    () => PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0],
    [activeProjectId]
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
      { label: '01 / OPEN FORGE AI CONTROL PLANE', meta: '/forge', icon: Network, run: () => onOpenForge?.() },
      { label: '02 / LAUNCH CODECLASH 1V1 ARENA', meta: '/arena', icon: Swords, run: () => onOpenArena?.() },
      { label: '03 / CODECLASH GLOBAL LEADERBOARD', meta: '/leaderboard', icon: Award, run: () => onOpenLeaderboard?.() },
      { label: '04 / LAUNCH ANALYTICS DASHBOARD', meta: '/analytics', icon: BarChart3, run: () => onOpenAnalytics?.() },
      { label: '05 / VIEW RESUME.PDF', meta: 'PDF', icon: FileText, run: () => window.open('/resume.pdf', '_blank', 'noopener,noreferrer') },
      { label: '06 / COPY EMAIL ADDRESS', meta: 'CLIPBOARD', icon: Copy, run: handleCopyEmail },
      { label: '07 / GITHUB @NISCHAY237', meta: 'GITHUB', icon: GithubIcon, run: () => window.open('https://github.com/nischay237', '_blank', 'noopener,noreferrer') },
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
      className="min-h-screen bg-[#EAE8E4] text-[#111111] selection:bg-[#FBBF04] selection:text-[#111111]"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* ============================================================== */}
      {/* 1. CLEAN FROSTED EDITORIAL TOP NAVBAR                          */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-[#EAE8E4]/85 backdrop-blur-md border-b border-[#111111]/12">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span className="w-7 h-7 bg-[#111111] text-[#FBBF04] font-mono font-black text-xs flex items-center justify-center">
              NS
            </span>
            <span className="font-black text-sm sm:text-[15px] tracking-[-0.03em] uppercase text-[#111111]">
              NISCHAY SRIVASTAVA
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-[0.08em] text-[#111111]/70">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#111111] cursor-pointer">
              Projects
            </button>
            <button onClick={() => scrollTo('interactive-lab')} className="hover:text-[#111111] cursor-pointer">
              Interactive Lab
            </button>
            <button onClick={() => scrollTo('skills-section')} className="hover:text-[#111111] cursor-pointer">
              Skills
            </button>
            <button onClick={() => scrollTo('about-section')} className="hover:text-[#111111] cursor-pointer">
              About
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 h-9 px-3 bg-white/75 hover:bg-white border border-[#111111]/20 text-[11px] font-mono font-bold text-[#111111] transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>INDEX</span>
              <span className="px-1 bg-[#111111]/10 text-[10px]">⌘K</span>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="h-9 px-3.5 bg-white/80 hover:bg-white border border-[#111111] text-[11px] font-mono font-bold uppercase inline-flex items-center gap-1 transition-colors"
            >
              RESUME <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:nischaysrivastava2@gmail.com"
              className="h-9 px-4 bg-[#111111] hover:bg-[#2B44B8] text-white text-[11px] font-mono font-bold uppercase inline-flex items-center transition-colors"
            >
              CONTACT
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. FULL-BLEED BLURRED ARTWORK HERO + MASSIVE BOLD PROJECTS     */}
      {/* ============================================================== */}
      <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[#EAE8E4] border-b-2 border-[#111111]">
        {/* BACKGROUND LAYER: Softly Blurred Girl Looking Up + Bauhaus Shapes */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* Subtle wide ambient fill so ultrawide monitors match seamlessly */}
          <img
            src="/hero-creative-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center scale-110 blur-[26px] opacity-35"
          />

          {/* Primary Dreamy Blurred Artwork: Girl Looking Upward at Bold Project Titles */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-14 sm:pb-16"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
            }}
          >
            <img
              src="/hero-creative-bg.jpg"
              alt="Creative blurred background illustration"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 84%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 0%, black 84%, transparent 100%)',
              }}
              className={`h-[94%] w-auto max-w-[1040px] object-cover object-bottom transition-all duration-500 ${
                hoveredId ? 'blur-[6px] scale-[1.03] opacity-75' : 'blur-[3.5px] scale-[1.01] opacity-88'
              }`}
            />
          </div>

          {/* Gentle Editorial Ivory Wash so Giant Black Letters Have Razor-Sharp Contrast */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(234,232,228,0.46) 0%, rgba(234,232,228,0.28) 52%, rgba(234,232,228,0.52) 100%)',
            }}
          />
        </div>

        {/* FOREGROUND LAYER: MASSIVE BOLD INTERACTIVE PROJECT TITLES */}
        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-10 py-8 sm:py-10 min-h-[calc(100vh-64px)] flex flex-col justify-between gap-8">
          {/* Top Minimal Identity Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#111111]">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 border border-[#111111]/15">
              <span className="w-2 h-2 bg-[#00B86B]" />
              <span>FULL-STACK &amp; DISTRIBUTED SYSTEMS ENGINEER</span>
            </div>
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 border border-[#111111]/15">
              <span>B.TECH CSE (AKTU)</span>
              <span className="opacity-35">/</span>
              <span>SELECT A PROJECT TO LAUNCH LIVE</span>
            </div>
          </div>

          {/* GIANT ULTRA-BOLD INTERACTIVE PROJECT LIST (Hover & Click!) */}
          <div className="my-auto py-4">
            <div className="border-t-2 border-[#111111] divide-y-2 divide-[#111111]/85">
              {PROJECTS.map((project) => {
                const isDimmed = hoveredId && hoveredId !== project.id;
                const isFocused = hoveredId === project.id;
                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => {
                      setHoveredId(project.id);
                      setActiveProjectId(project.id);
                    }}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => launchProject(project.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        launchProject(project.id);
                      }
                    }}
                    className={`group py-4 sm:py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3 cursor-pointer transition-all duration-300 ${
                      isDimmed ? 'opacity-45' : 'opacity-100'
                    }`}
                  >
                    {/* Left: Massive Bold Project Index + Giant Bold Letters */}
                    <div
                      className={`flex items-baseline gap-4 sm:gap-7 transition-transform duration-300 ${
                        isFocused ? 'translate-x-2 sm:translate-x-4' : ''
                      }`}
                    >
                      <span className="font-mono text-sm sm:text-base font-black tracking-widest text-[#111111] bg-white/85 px-2 py-0.5 border border-[#111111]">
                        {project.index}
                      </span>
                      <h2
                        className="text-5xl sm:text-7xl lg:text-[92px] font-black tracking-[-0.055em] uppercase leading-[0.9] text-[#111111]"
                        style={{
                          textShadow: '0 2px 24px rgba(234, 232, 228, 0.9)',
                        }}
                      >
                        {project.displayTitle}
                      </h2>
                    </div>

                    {/* Right: Bold Category Subtitle + Bauhaus Accent Pill + Launch Arrow */}
                    <div className="flex flex-wrap items-center gap-3 pl-12 sm:pl-16 lg:pl-0">
                      <div className="text-left lg:text-right">
                        <span
                          className={`inline-block px-2.5 py-0.5 text-[10.5px] font-mono font-black uppercase tracking-wider border border-[#111111] ${project.accentBg} ${project.accentText}`}
                        >
                          {project.badge}
                        </span>
                        <div className="text-[11px] font-mono font-bold text-[#111111] bg-[#EAE8E4]/85 px-2 py-0.5 mt-1">
                          {project.subtitle}
                        </div>
                      </div>

                      <span
                        className={`w-12 h-12 sm:w-14 sm:h-14 border-2 border-[#111111] flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isFocused
                            ? 'bg-[#111111] text-[#FBBF04] rotate-12 scale-105'
                            : 'bg-white/90 text-[#111111]'
                        }`}
                      >
                        <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Frosted Interactive Spotlight Strip (Updates Live on Hover!) */}
          <div className="bg-white/90 backdrop-blur-md border-2 border-[#111111] p-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-[6px_6px_0px_#111111]">
            <div className="min-w-0 flex items-start sm:items-center gap-3.5">
              <span
                className={`px-2 py-1 text-[11px] font-mono font-black uppercase border border-[#111111] shrink-0 ${focusedHeroProject.accentBg} ${focusedHeroProject.accentText}`}
              >
                {focusedHeroProject.index} · {focusedHeroProject.displayTitle}
              </span>
              <p className="text-xs sm:text-[13px] font-semibold text-[#111111] leading-snug line-clamp-2">
                {focusedHeroProject.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => launchProject(focusedHeroProject.id)}
                className="h-10 px-4 bg-[#111111] hover:bg-[#2B44B8] text-white text-xs font-mono font-bold uppercase inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {focusedHeroProject.cta} <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollTo('interactive-lab')}
                className="h-10 px-4 bg-[#EAE8E4] hover:bg-[#FBBF04] border border-[#111111] text-[#111111] text-xs font-mono font-bold uppercase inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                INTERACTIVE LAB <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. INTERACTIVE PROJECT SANDBOX STUDIO                          */}
      {/* ============================================================== */}
      <section id="interactive-lab" className="bg-[#F6F5F2] py-14 sm:py-20 px-5 sm:px-8 border-b-2 border-[#111111]">
        <div className="max-w-[1360px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#2B44B8]">
                PLAYABLE PREVIEWS // TEST BEFORE LAUNCHING
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.045em] uppercase text-[#111111] mt-1 leading-none">
                INTERACTIVE LAB.
              </h2>
            </div>

            {/* Bold Project Switcher Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {PROJECTS.map((p) => {
                const active = p.id === activeProjectId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveProjectId(p.id)}
                    className={`px-4 py-2 text-xs font-mono font-black uppercase border-2 border-[#111111] transition-all cursor-pointer ${
                      active
                        ? 'bg-[#111111] text-[#FBBF04] shadow-[3px_3px_0px_#2B44B8]'
                        : 'bg-white text-[#111111] hover:bg-[#EAE8E4]'
                    }`}
                  >
                    {p.index} // {p.displayTitle}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Crisp Elevated Interactive Stage */}
          <div className="border-2 border-[#111111] bg-white shadow-[8px_8px_0px_#111111] grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Bold Project Details */}
            <div className="lg:col-span-6 p-6 sm:p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-[#111111] flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 text-[10.5px] font-mono font-black uppercase border border-[#111111] ${activeLabProject.accentBg} ${activeLabProject.accentText}`}
                  >
                    {activeLabProject.badge}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-stone-500">
                    {activeLabProject.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-[-0.035em] uppercase text-[#111111] leading-tight">
                  {activeLabProject.fullTitle}
                </h3>

                <p className="text-sm text-stone-700 leading-relaxed">
                  {activeLabProject.summary}
                </p>

                <div className="space-y-2 pt-1">
                  {activeLabProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-medium text-[#111111]">
                      <CheckCircle2 className="w-4 h-4 text-[#00B86B] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeLabProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#EAE8E4] border border-[#111111]/25 text-[11px] font-mono font-bold text-[#111111]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-stone-200">
                <button
                  onClick={() => launchProject(activeLabProject.id)}
                  className="h-10 px-5 bg-[#111111] hover:bg-[#2B44B8] text-white text-xs font-mono font-black uppercase inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {activeLabProject.cta} <ArrowUpRight className="w-4 h-4" />
                </button>
                <a
                  href={activeLabProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 px-4 bg-white hover:bg-[#FBBF04] border-2 border-[#111111] text-[#111111] text-xs font-mono font-black uppercase inline-flex items-center gap-1.5 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> GITHUB
                </a>
                {activeLabProject.driveUrl && (
                  <a
                    href={activeLabProject.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 px-4 bg-white hover:bg-[#EAE8E4] border-2 border-[#111111] text-[#111111] text-xs font-mono font-black uppercase inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> ARTIFACTS
                  </a>
                )}
              </div>
            </div>

            {/* Right: Playable Sandbox for Active Project */}
            <div className="lg:col-span-6 p-6 sm:p-8 bg-[#EAE8E4]/55 flex flex-col justify-center">
              {activeLabProject.id === 'forge' && (
                <div className="border-2 border-[#111111] bg-white p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-black uppercase text-[#111111]">
                      AST BLAST-RADIUS TRACER
                    </span>
                    <span className="px-2 py-0.5 bg-[#FBBF04] border border-[#111111] font-bold text-[10px]">
                      CLICK ANY NODE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {Object.entries(FORGE_NODES).map(([nodeName, meta]) => {
                      const isSel = nodeName === selectedAstNode;
                      const isImp = astInfo.callers.includes(nodeName);
                      return (
                        <button
                          key={nodeName}
                          onClick={() => setSelectedAstNode(nodeName)}
                          className={`text-left p-3 border-2 transition-all cursor-pointer ${
                            isSel
                              ? 'bg-[#111111] text-white border-[#111111]'
                              : isImp
                              ? 'bg-[#FFF1F2] text-[#F94144] border-[#F94144]'
                              : 'bg-[#F6F5F2] text-[#111111] border-[#111111]/25 hover:border-[#111111]'
                          }`}
                        >
                          <div className="flex justify-between text-[10px] font-mono font-bold">
                            <span className={isSel ? 'text-[#FBBF04]' : ''}>{meta.layer}</span>
                            {isImp && <span>↑ HIT</span>}
                          </div>
                          <div className="text-xs font-mono font-black truncate mt-1">{nodeName}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="border-t-2 border-[#111111] pt-3.5 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                    <span>
                      IMPACTED: <strong>{astInfo.callers.length}</strong> CALLER(S)
                    </span>
                    <span
                      className={`px-2 py-0.5 font-black text-[10.5px] border border-[#111111] ${
                        astInfo.risk === 'HIGH'
                          ? 'bg-[#F94144] text-white'
                          : 'bg-[#00B86B] text-white'
                      }`}
                    >
                      {astInfo.risk} RISK
                    </span>
                  </div>
                </div>
              )}

              {activeLabProject.id === 'codeclash' && (
                <div className="border-2 border-[#111111] bg-white p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-black uppercase">
                      LIVE 1V1 DUEL SIMULATOR
                    </span>
                    <button
                      onClick={simulateDuel}
                      disabled={duelRunning}
                      className="px-3 py-1 bg-[#F94144] hover:bg-[#111111] text-white border border-[#111111] font-mono text-[11px] font-black uppercase inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {duelRunning ? 'RUNNING...' : 'SIMULATE DUEL'}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-xs font-bold">
                        <span>NISCHAY_DEV</span>
                        <span>{p1Tests}/12 CASES</span>
                      </div>
                      <div className="h-3.5 bg-[#EAE8E4] border border-[#111111]">
                        <div
                          className="h-full bg-[#111111] transition-all duration-200"
                          style={{ width: `${(p1Tests / 12) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-xs font-bold text-stone-600">
                        <span>ALGO_RIVAL</span>
                        <span>{p2Tests}/12 CASES</span>
                      </div>
                      <div className="h-3.5 bg-[#EAE8E4] border border-[#111111]">
                        <div
                          className="h-full bg-[#F94144] transition-all duration-200"
                          style={{ width: `${(p2Tests / 12) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-[#111111] pt-3.5 flex items-center justify-between gap-2 font-mono">
                    <div>
                      <span className="text-[10px] text-stone-500 block">FIDE ELO RATING</span>
                      <span className="text-xl font-black tabular-nums">{elo}</span>
                      <span className="ml-2 px-1.5 py-0.5 bg-[#FBBF04] border border-[#111111] text-[10px] font-black">
                        {eloDelta} ELO
                      </span>
                    </div>
                    <button
                      onClick={onOpenLeaderboard}
                      className="px-3 py-1.5 bg-[#EAE8E4] hover:bg-[#111111] hover:text-white border border-[#111111] text-[11px] font-black uppercase cursor-pointer"
                    >
                      LEADERBOARD ↗
                    </button>
                  </div>
                </div>
              )}

              {activeLabProject.id === 'analytics' && (
                <div className="border-2 border-[#111111] bg-white p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-mono text-xs font-bold flex items-center gap-4">
                      <span>
                        ACTIVE: <strong className="text-[#00B86B] tabular-nums">{visitors}</strong>
                      </span>
                      <span>
                        EVENTS: <strong className="tabular-nums">{events.toLocaleString()}</strong>
                      </span>
                    </div>
                    <button
                      onClick={fireTelemetry}
                      className="px-3 py-1 bg-[#FBBF04] hover:bg-[#111111] hover:text-white border border-[#111111] font-mono text-[11px] font-black uppercase inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Zap className="w-3 h-3" /> FIRE EVENT
                    </button>
                  </div>

                  <div className="h-28 flex items-end gap-1.5 border-b-2 border-[#111111] pt-2">
                    {bars.map((val, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 border border-[#111111]/40 transition-all duration-200 ${
                          idx === bars.length - 1
                            ? 'bg-[#00B86B]'
                            : idx === bars.length - 2
                            ? 'bg-[#FBBF04]'
                            : idx % 3 === 0
                            ? 'bg-[#2B44B8]'
                            : 'bg-[#111111]'
                        }`}
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between font-mono text-[11px] text-stone-600">
                    <span>2.4KB SNIPPET · ZERO COOKIES</span>
                    <button
                      onClick={onOpenAnalytics}
                      className="font-black text-[#111111] hover:text-[#2B44B8] underline cursor-pointer"
                    >
                      FULL DASHBOARD ↗
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE SKILLS & SHIPPED PROOF                          */}
      {/* ============================================================== */}
      <section id="skills-section" className="bg-white py-14 sm:py-20 px-5 sm:px-8 border-b-2 border-[#111111]">
        <div className="max-w-[1360px] mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#F94144]">
                VERIFIED TECH STACK
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.045em] uppercase text-[#111111] mt-1 leading-none">
                SKILLS &amp; PROOF.
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[{ id: 'all', label: 'ALL' }, ...SKILL_GROUPS.map((g) => ({ id: g.id, label: g.label }))].map(
                (t) => (
                  <button
                    key={t.id}
                    onClick={() => setSkillFilter(t.id)}
                    className={`px-3 py-1.5 text-[11px] font-mono font-black uppercase border-2 border-[#111111] transition-colors cursor-pointer ${
                      skillFilter === t.id
                        ? 'bg-[#111111] text-[#FBBF04]'
                        : 'bg-[#F6F5F2] text-[#111111] hover:bg-[#EAE8E4]'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Live Proof Strip */}
          {selectedSkill && (
            <div className="border-2 border-[#111111] bg-[#EAE8E4] px-4 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2 py-0.5 bg-[#FBBF04] border border-[#111111] font-black text-[10px]">
                  SELECTED
                </span>
                <strong className="text-[#111111]">{selectedSkill.name}</strong>
                <span>→</span>
                <span className="text-stone-600 text-[11px]">SHIPPED IN:</span>
                {selectedSkill.projects.map((pid) => {
                  const proj = PROJECTS.find((p) => p.id === pid);
                  if (!proj) return null;
                  return (
                    <button
                      key={pid}
                      onClick={() => launchProject(pid)}
                      className="px-2.5 py-1 bg-[#111111] hover:bg-[#2B44B8] text-white text-[10.5px] font-black uppercase inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {proj.displayTitle} <ArrowUpRight className="w-3 h-3" />
                    </button>
                  );
                })}
              </div>
              <span className="text-[10.5px] text-stone-600 uppercase">
                CLICK ANY SKILL TO VERIFY LIVE USAGE
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleSkillGroups.map((group) => (
              <div key={group.id} className="border-2 border-[#111111] bg-[#F6F5F2] p-5">
                <div className="flex items-center justify-between border-b-2 border-[#111111] pb-2.5 mb-3.5 font-mono">
                  <span className="text-xs font-black tracking-wide flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 border border-[#111111] ${group.dot}`} />
                    {group.label}
                  </span>
                  <span className="text-[10px] font-bold text-stone-500">
                    0{group.items.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => {
                    const isPicked = selectedSkill?.name === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSelectedSkill(item)}
                        className={`px-2.5 py-1.5 text-xs font-mono font-bold border transition-colors cursor-pointer ${
                          isPicked
                            ? 'bg-[#111111] text-[#FBBF04] border-[#111111]'
                            : 'bg-white text-[#111111] border-[#111111]/30 hover:border-[#111111]'
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

      {/* ============================================================== */}
      {/* 5. ABOUT NISCHAY & DIRECT CONTACT                              */}
      {/* ============================================================== */}
      <section id="about-section" className="bg-[#EAE8E4] py-14 sm:py-20 px-5 sm:px-8">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          <div className="lg:col-span-7 border-2 border-[#111111] bg-white p-7 sm:p-10 shadow-[6px_6px_0px_#111111] flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <span className="w-12 h-12 bg-[#111111] text-[#FBBF04] font-black text-xl flex items-center justify-center shrink-0">
                  NS
                </span>
                <div>
                  <div className="text-[10.5px] font-mono font-bold uppercase tracking-[0.16em] text-[#2B44B8]">
                    ABOUT THE ENGINEER
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.04em] uppercase text-[#111111]">
                    NISCHAY SRIVASTAVA
                  </h2>
                </div>
              </div>

              <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed">
                Computer Science undergraduate at{' '}
                <strong className="text-[#111111]">
                  Feroze Gandhi Institute of Engineering and Technology (AKTU)
                </strong>
                , Raebareli, UP, India. Passionate about building deterministic AI software engineering platforms, distributed Spring Boot + Kafka architectures, and fast real-time WebSocket web apps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 border-2 border-[#111111] divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#111111] font-mono text-xs">
              <div className="p-3.5 bg-[#F6F5F2]">
                <div className="text-[10px] text-stone-500">DEGREE</div>
                <div className="font-black text-[#111111] mt-0.5">B.TECH CSE (2023–27)</div>
              </div>
              <div className="p-3.5 bg-[#F6F5F2]">
                <div className="text-[10px] text-stone-500">LOCATION</div>
                <div className="font-black text-[#111111] mt-0.5">RAEBARELI, UP, IN</div>
              </div>
              <div className="p-3.5 bg-[#F6F5F2]">
                <div className="text-[10px] text-stone-500">STATUS</div>
                <div className="font-black text-[#00B86B] mt-0.5">OPEN TO SWE ROLES</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 border-2 border-[#111111] bg-white p-7 sm:p-8 shadow-[6px_6px_0px_#111111] flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black tracking-[-0.03em] uppercase text-[#111111]">
                  GET IN TOUCH.
                </h3>
                <span className="px-2 py-0.5 bg-[#FBBF04] border border-[#111111] text-[10px] font-mono font-black">
                  DIRECT
                </span>
              </div>

              <div className="border-2 border-[#111111] bg-[#F6F5F2] px-3 py-2.5 flex items-center justify-between gap-2 font-mono text-xs">
                <span className="truncate font-bold">nischaysrivastava2@gmail.com</span>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 bg-[#111111] hover:bg-[#2B44B8] text-white text-[10px] font-black uppercase shrink-0 cursor-pointer"
                >
                  {copiedEmail ? 'COPIED ✓' : 'COPY'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                <a
                  href="mailto:nischaysrivastava2@gmail.com"
                  className="py-2.5 px-3 bg-[#111111] hover:bg-[#2B44B8] text-white font-black uppercase flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> SEND EMAIL
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 bg-[#FBBF04] hover:bg-[#111111] hover:text-white border-2 border-[#111111] text-[#111111] font-black uppercase flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" /> RESUME.PDF
                </a>
              </div>

              <a
                href="https://github.com/nischay237"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 bg-white hover:bg-[#111111] hover:text-white border-2 border-[#111111] text-[#111111] font-mono text-xs font-black uppercase flex items-center justify-between transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5" /> GITHUB.COM/NISCHAY237
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-4 border-t-2 border-[#111111] grid grid-cols-2 gap-2 font-mono text-[11px]">
              {[
                { label: 'FORGE AI', fn: onOpenForge },
                { label: 'CODECLASH', fn: onOpenArena },
                { label: 'LEADERBOARD', fn: onOpenLeaderboard },
                { label: 'ANALYTICS', fn: onOpenAnalytics },
              ].map((b) => (
                <button
                  key={b.label}
                  onClick={b.fn}
                  className="px-3 py-2 bg-[#F6F5F2] hover:bg-[#111111] hover:text-[#FBBF04] border border-[#111111] font-black uppercase flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{b.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. ⌘K COMMAND PALETTE                                          */}
      {/* ============================================================== */}
      {cmdOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/45 flex items-start justify-center pt-[14vh] px-4"
          onClick={() => setCmdOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white border-2 border-[#111111] shadow-[8px_8px_0px_#111111]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b-2 border-[#111111] flex items-center gap-2.5 bg-[#EAE8E4]">
              <Search className="w-4 h-4 text-[#111111] shrink-0" />
              <input
                autoFocus
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                placeholder="SEARCH PROJECTS, RESUME, EMAIL..."
                className="flex-1 bg-transparent font-mono text-xs font-bold text-[#111111] placeholder:text-stone-500 focus:outline-none uppercase"
              />
              <button
                onClick={() => setCmdOpen(false)}
                className="text-[#111111] hover:text-[#F94144] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-stone-200 max-h-80 overflow-y-auto">
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
                    className="w-full text-left px-4 py-3 hover:bg-[#111111] hover:text-white flex items-center justify-between gap-3 font-mono text-xs transition-colors cursor-pointer group"
                  >
                    <span className="flex items-center gap-2.5 font-black">
                      <Icon className="w-3.5 h-3.5 text-[#2B44B8] group-hover:text-[#FBBF04]" />
                      {c.label}
                    </span>
                    <span className="text-[10px] text-stone-500 group-hover:text-[#FBBF04]">
                      {c.meta}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="px-4 py-2 bg-[#111111] text-[#FBBF04] flex items-center justify-between text-[10px] font-mono font-bold uppercase">
              <span className="inline-flex items-center gap-1">
                <Command className="w-3 h-3" /> QUICK INDEX
              </span>
              <span>ESC TO CLOSE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
