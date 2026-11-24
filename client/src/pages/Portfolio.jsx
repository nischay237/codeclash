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
  Sparkles,
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

const FONT_DISPLAY = { fontFamily: "'Bricolage Grotesque', 'DM Sans', sans-serif" };
const FONT_SERIF = { fontFamily: "'Newsreader', Georgia, serif" };
const FONT_SANS = { fontFamily: "'DM Sans', system-ui, sans-serif" };
const FONT_MONO = { fontFamily: "'IBM Plex Mono', monospace" };

const PROJECTS = [
  {
    id: 'forge',
    index: '01',
    displayTitle: 'FORGE AI',
    shortName: 'Forge AI',
    editorialTitle: 'Forge — Software Engineering Intelligence Control Plane',
    subtitle: 'Java 21 · Spring Boot 3.5 · Kafka Outbox · AST Blast Radius',
    badge: '100% F1 Eval',
    badgeClass: 'bg-[#F5C542] text-[#141413]',
    accentBar: 'bg-[#F5C542]',
    impactStat: '100% F1 · 0% FPR · 8/8 Tests',
    summary:
      'A multi-tenant Spring Boot 3.5 platform that parses real Java AST dependency graphs, computes exact BFS blast radius before merge, masks leaked secrets and blocks prompt injections, and verifies accuracy with an 8-case reproducible eval suite.',
    highlights: [
      'Modular monolith on Java 21 + Spring Boot 3.5 with Transactional Outbox, Kafka DLT, Redis rate limits, and Resilience4j.',
      'JavaParser AST engine & BFS Change Impact analysis calculating every affected service and JUnit test.',
      'Gitleaks secret masking, Semgrep SAST, XML-fenced prompt-injection defense, and 8-case eval benchmark (100% F1, 0% FPR).',
      'Multi-tenant JWT + RBAC isolation, Flyway migrations, OpenTelemetry tracing, and 4 automated ArchUnit boundary tests.',
    ],
    techStack: ['Java 21', 'Spring Boot 3.5', 'Apache Kafka', 'Redis', 'PostgreSQL', 'JavaParser AST', 'Spring AI', 'React + TypeScript'],
    githubUrl: 'https://github.com/nischay237/forge-ai-platform',
    repoSlug: 'nischay237/forge-ai-platform',
    cta: 'Open Control Plane',
  },
  {
    id: 'codeclash',
    index: '02',
    displayTitle: 'CODECLASH',
    shortName: 'CodeClash',
    editorialTitle: 'CodeClash — Real-Time 1v1 Competitive Coding Arena',
    subtitle: 'WebSockets · Node.js · Sandbox Judge · FIDE Elo',
    badge: 'Playable Live',
    badgeClass: 'bg-[#DC4A3D] text-white',
    accentBar: 'bg-[#DC4A3D]',
    impactStat: 'Zero-Lag Sockets · FIDE Elo',
    summary:
      'Head-to-head DSA battle arena where two developers race on the same algorithmic problem over low-latency Socket.io channels, with isolated sandbox judging and live FIDE Elo ratings.',
    highlights: [
      'Bidirectional Socket.io WebSocket engine syncing keystrokes, test-case pass counts, and match state in real time.',
      'Isolated code execution sandbox with strict runtime and timeout guards.',
      'FIDE-grade Elo rating calculation updating global player standings after every match.',
      'Dual persistence backed by MongoDB Atlas with automatic in-memory resilience fallback.',
    ],
    techStack: ['React', 'Node.js', 'Express', 'Socket.io', 'Tailwind CSS', 'MongoDB Atlas'],
    githubUrl: 'https://github.com/nischay237/codeclash',
    repoSlug: 'nischay237/codeclash',
    cta: 'Launch 1v1 Arena',
  },
  {
    id: 'analytics',
    index: '03',
    displayTitle: 'ANALYTICS',
    shortName: 'Analytics',
    editorialTitle: 'Lightweight Real-Time Web Telemetry & Analytics',
    subtitle: '<3KB Script · Cookieless · Live Heartbeats · Funnels',
    badge: '<3KB Live',
    badgeClass: 'bg-[#1D8F5A] text-white',
    accentBar: 'bg-[#1D8F5A]',
    impactStat: '2.4KB Snippet · 0 Cookies',
    summary:
      'A privacy-first, self-hosted alternative to heavy third-party analytics. Embeds under 3KB with zero cookies and streams live visitor heartbeats, pageview velocity, and conversion funnels.',
    highlights: [
      'Embeddable tracking snippet under 3KB gzipped with zero third-party cookies.',
      'Live active visitor heartbeats streamed over WebSockets to the telemetry dashboard.',
      'High-throughput ingestion API built with Node.js, Express, and MongoDB.',
      'Clean interactive dashboard visualizing live session spikes and funnel drop-offs.',
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    githubUrl: 'https://github.com/nischay237/analytics-tracker',
    repoSlug: 'nischay237/analytics-tracker',
    driveUrl: 'https://drive.google.com/drive/folders/1yDR9xbt8fTiyh9TyWV9C4lS6Y4Th3-61?usp=sharing',
    cta: 'Open Live Dashboard',
  },
];

const FORGE_NODES = {
  TransferController: { layer: 'API Layer', callers: [], risk: 'Low' },
  SettlementService: { layer: 'Service Layer', callers: ['TransferController', 'SettlementServiceTest'], risk: 'High' },
  FraudRiskEngine: { layer: 'Service Layer', callers: ['SettlementService', 'TransferController', 'SettlementServiceTest'], risk: 'High' },
  LedgerRepository: { layer: 'Data Layer', callers: ['SettlementService', 'TransferController', 'SettlementServiceTest'], risk: 'High' },
};

const SKILL_ROWS = [
  {
    id: 'backend',
    title: 'Backend & Distributed',
    note: 'Resilient APIs, event outbox patterns, WebSockets & security',
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
    title: 'Frontend & Interface',
    note: 'Interactive workbenches, code editors, graph views & responsive UI',
    items: [
      { name: 'React 18', projects: ['forge', 'codeclash', 'analytics'] },
      { name: 'TypeScript', projects: ['forge'] },
      { name: 'Tailwind CSS', projects: ['forge', 'codeclash', 'analytics'] },
      { name: 'React Flow', projects: ['forge'] },
      { name: 'Monaco Editor', projects: ['forge'] },
      { name: 'TanStack Query & Zustand', projects: ['forge'] },
      { name: 'Recharts & Vite', projects: ['forge', 'analytics'] },
    ],
  },
  {
    id: 'data',
    title: 'Data & Infrastructure',
    note: 'ACID schemas, migrations, caching, containers & observability',
    items: [
      { name: 'PostgreSQL & pgvector', projects: ['forge'] },
      { name: 'Redis Rate Limiting', projects: ['forge'] },
      { name: 'Flyway Migrations', projects: ['forge'] },
      { name: 'MongoDB Atlas', projects: ['codeclash', 'analytics'] },
      { name: 'Docker & CI/CD', projects: ['forge', 'codeclash'] },
      { name: 'OpenTelemetry & Prometheus', projects: ['forge'] },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Computer Science',
    note: 'Static analysis, AST graphs, evaluation benchmarks & algorithms',
    items: [
      { name: 'JavaParser AST & BFS', projects: ['forge'] },
      { name: 'Spring AI & Gemini API', projects: ['forge'] },
      { name: 'Prompt-Injection Defense', projects: ['forge'] },
      { name: 'Data Structures & Graphs', projects: ['forge', 'codeclash'] },
      { name: 'FIDE Elo Algorithms', projects: ['codeclash'] },
      { name: 'DBMS & Concurrency', projects: ['forge', 'codeclash'] },
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

  const commands = useMemo(
    () => [
      { label: 'Open Forge AI Control Plane', meta: '/forge', icon: Network, run: () => onOpenForge?.() },
      { label: 'Launch CodeClash 1v1 Arena', meta: '/arena', icon: Swords, run: () => onOpenArena?.() },
      { label: 'View CodeClash Leaderboard', meta: '/leaderboard', icon: Award, run: () => onOpenLeaderboard?.() },
      { label: 'Launch Real-Time Analytics', meta: '/analytics', icon: BarChart3, run: () => onOpenAnalytics?.() },
      { label: 'Open Resume PDF', meta: 'PDF', icon: FileText, run: () => window.open('/resume.pdf', '_blank', 'noopener,noreferrer') },
      { label: 'Copy email address', meta: 'Clipboard', icon: Copy, run: handleCopyEmail },
      { label: 'Open GitHub @nischay237', meta: 'GitHub', icon: GithubIcon, run: () => window.open('https://github.com/nischay237', '_blank', 'noopener,noreferrer') },
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
      className="min-h-screen bg-[#F9F8F5] text-[#141413] font-bold selection:bg-[#F5C542] selection:text-[#141413]"
      style={FONT_SANS}
    >
      {/* ============================================================== */}
      {/* 1. CLEAN FROSTED TOP NAVBAR (With Direct GitHub & Resume)      */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-[#EAE8E4]/90 backdrop-blur-md border-b border-[#141413]/10">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className="w-7 h-7 rounded-md bg-[#141413] text-[#F5C542] font-extrabold text-xs flex items-center justify-center"
              style={FONT_DISPLAY}
            >
              NS
            </span>
            <span
              className="font-extrabold text-[15px] tracking-[-0.02em] text-[#141413]"
              style={FONT_DISPLAY}
            >
              Nischay Srivastava
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-bold text-[#141413]/80">
            <button onClick={() => scrollTo('projects-gallery')} className="hover:text-[#141413] transition-colors cursor-pointer">
              Projects
            </button>
            <button onClick={() => scrollTo('interactive-lab')} className="hover:text-[#141413] transition-colors cursor-pointer">
              Interactive Lab
            </button>
            <button onClick={() => scrollTo('skills-section')} className="hover:text-[#141413] transition-colors cursor-pointer">
              Tech Stack
            </button>
            <button onClick={() => scrollTo('about-section')} className="hover:text-[#141413] transition-colors cursor-pointer">
              About &amp; Hire
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-white/80 hover:bg-white border border-[#141413]/15 text-xs font-bold text-[#141413] transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#141413]" />
              <span>Search</span>
              <span className="text-[10.5px] text-stone-600" style={FONT_MONO}>
                ⌘K
              </span>
            </button>
            <a
              href="https://github.com/nischay237"
              target="_blank"
              rel="noreferrer"
              className="h-9 px-3 rounded-lg bg-white/85 hover:bg-white border border-[#141413]/20 text-xs font-bold text-[#141413] inline-flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="h-9 px-3.5 rounded-lg bg-[#F5C542] hover:bg-[#e5b532] text-xs font-extrabold text-[#141413] inline-flex items-center gap-1 transition-colors"
            >
              Resume <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:nischaysrivastava2@gmail.com"
              className="h-9 px-4 rounded-lg bg-[#141413] hover:bg-[#2E2D2A] text-white text-xs font-bold inline-flex items-center transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO: FULL-BLEED BLURRED TEAM PHOTO + PUSH-DOWN ACCORDION   */}
      {/*    Hovering a project smoothly expands its full info below &   */}
      {/*    pushes the next project smoothly down; leaving glides it up */}
      {/* ============================================================== */}
      <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[#EAE8E4]">
        {/* Full-Bleed Blurred Team Photo */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/hero-team-bg.jpg"
            alt="Software engineers collaborating in studio"
            className={`w-full h-full object-cover object-[62%_center] transition-all duration-500 ${
              hoveredId ? 'blur-[5px] scale-[1.04] opacity-85' : 'blur-[2px] scale-[1.02] opacity-95'
            }`}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(96deg, rgba(244,242,238,0.82) 0%, rgba(244,242,238,0.60) 44%, rgba(244,242,238,0.28) 78%, rgba(244,242,238,0.20) 100%)',
            }}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-10 py-8 sm:py-10 min-h-[calc(100vh-64px)] flex flex-col justify-between gap-6">
          {/* Top Identity Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-[#141413]">
            <div className="inline-flex items-center gap-2 bg-white/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#141413]/12">
              <span className="w-2 h-2 rounded-full bg-[#1D8F5A] animate-pulse" />
              <span>Full-Stack &amp; Distributed Systems Engineer · Open to SWE Roles</span>
            </div>
            <div className="inline-flex items-center gap-2.5 bg-white/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#141413]/12 text-[#141413]">
              <span>Hover any project to expand details</span>
              <span className="opacity-35">·</span>
              <span>Click to launch live</span>
            </div>
          </div>

          {/* SMOOTH PUSH-DOWN HOVER ACCORDION PROJECT LIST */}
          <div
            className="my-auto py-2"
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="border-t border-[#141413]/75 divide-y divide-[#141413]/30">
              {PROJECTS.map((project) => {
                const isExpanded = hoveredId === project.id;
                const isDimmed = hoveredId !== null && !isExpanded;
                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => {
                      setHoveredId(project.id);
                      setActiveProjectId(project.id);
                    }}
                    className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isDimmed ? 'opacity-50' : 'opacity-100'
                    }`}
                  >
                    {/* Main Bold Project Header Row */}
                    <div
                      onClick={() => launchProject(project.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          launchProject(project.id);
                        }
                      }}
                      className="py-4 sm:py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 cursor-pointer"
                    >
                      <div
                        className={`flex items-baseline gap-4 sm:gap-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isExpanded ? 'translate-x-2 sm:translate-x-4' : ''
                        }`}
                      >
                        <span
                          className="text-sm font-bold text-[#141413] bg-white/90 px-2 py-0.5 rounded border border-[#141413]/25"
                          style={FONT_MONO}
                        >
                          {project.index}
                        </span>
                        <h2
                          className="text-5xl sm:text-7xl lg:text-[86px] font-extrabold tracking-[-0.04em] uppercase leading-[0.92] text-[#141413]"
                          style={{
                            ...FONT_DISPLAY,
                            textShadow: '0 2px 24px rgba(244, 242, 238, 0.9)',
                          }}
                        >
                          {project.displayTitle}
                        </h2>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pl-12 sm:pl-16 lg:pl-0">
                        <div className="text-left lg:text-right">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-tight ${project.badgeClass}`}
                          >
                            {project.badge}
                          </span>
                          <div className="text-xs font-bold text-[#141413] bg-[#F4F2EE]/90 backdrop-blur-xs px-2.5 py-0.5 rounded mt-1">
                            {project.subtitle}
                          </div>
                        </div>

                        <span
                          className={`w-12 h-12 rounded-full border border-[#141413]/45 flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isExpanded
                              ? 'bg-[#141413] text-[#F5C542] border-[#141413] rotate-12 scale-105'
                              : 'bg-white/90 text-[#141413]'
                          }`}
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>

                    {/* SILKY PUSH-DOWN EXPANDING PROJECT DETAIL DRAWER */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pl-0 sm:pl-14 lg:pl-16">
                          <div className="rounded-2xl bg-white/92 backdrop-blur-md border border-[#141413]/15 p-5 sm:p-6 shadow-[0_14px_36px_rgba(20,20,19,0.10)] grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                            <div className="lg:col-span-7 space-y-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${project.badgeClass}`}
                                >
                                  {project.impactStat}
                                </span>
                                <span className="text-xs font-bold text-stone-700" style={FONT_MONO}>
                                  {project.repoSlug}
                                </span>
                              </div>
                              <p className="text-sm sm:text-[15px] font-bold text-[#141413] leading-relaxed">
                                {project.summary}
                              </p>
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {project.techStack.slice(0, 6).map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2.5 py-1 rounded-full bg-[#F4F2EC] border border-stone-300/80 text-[11.5px] font-bold text-[#141413]"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-2.5 lg:items-end justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  launchProject(project.id);
                                }}
                                className="h-10 px-5 rounded-full bg-[#141413] hover:bg-[#2E2D2A] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full sm:w-auto lg:w-56"
                              >
                                {project.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="h-10 px-5 rounded-full bg-white hover:bg-[#F5C542] border border-[#141413] text-[#141413] text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors w-full sm:w-auto lg:w-56"
                              >
                                <GithubIcon className="w-3.5 h-3.5" /> View GitHub Repo ↗
                              </a>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveProjectId(project.id);
                                  scrollTo('interactive-lab');
                                }}
                                className="text-xs font-bold text-[#141413] underline underline-offset-4 hover:opacity-70 inline-flex items-center justify-center gap-1 pt-1 cursor-pointer lg:w-56"
                              >
                                Try interactive sandbox <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Quick Hint Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-[#141413]">
            <button
              onClick={() => scrollTo('projects-gallery')}
              className="inline-flex items-center gap-2 bg-white/88 hover:bg-white backdrop-blur-sm px-4 py-2 rounded-full border border-[#141413]/15 transition-colors cursor-pointer"
            >
              <span>Scroll for full projects, GitHub links &amp; live sandboxes</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/nischay237"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#141413] hover:bg-[#2E2D2A] text-white px-4 py-2 rounded-full transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" /> github.com/nischay237 ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. EYE-CATCHING HR / RECRUITER PROOF & METRICS BANNER          */}
      {/* ============================================================== */}
      <section className="bg-[#141413] text-white py-10 px-5 sm:px-8 border-y border-white/10">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-6 items-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F5C542]" style={FONT_DISPLAY}>
              03
            </div>
            <div className="text-xs font-bold text-stone-300 mt-1">Live Production Systems</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white" style={FONT_DISPLAY}>
              100%
            </div>
            <div className="text-xs font-bold text-stone-300 mt-1">AI Eval F1 · 0.0% FPR</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400" style={FONT_DISPLAY}>
              8 / 8
            </div>
            <div className="text-xs font-bold text-stone-300 mt-1">ArchUnit &amp; Backend Suites</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white" style={FONT_DISPLAY}>
              Java 21 + TS
            </div>
            <div className="text-xs font-bold text-stone-300 mt-1">Spring Boot · Kafka · React</div>
          </div>
          <div className="col-span-2 lg:col-span-1 flex flex-wrap lg:flex-col gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="h-9 px-4 rounded-full bg-[#F5C542] hover:bg-white text-[#141413] text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" /> Resume PDF ↗
            </a>
            <a
              href="https://github.com/nischay237"
              target="_blank"
              rel="noreferrer"
              className="h-9 px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" /> GitHub Profile ↗
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. EYE-CATCHING FEATURED PROJECTS SHOWCASE WITH GITHUB LINKS   */}
      {/* ============================================================== */}
      <section id="projects-gallery" className="bg-white py-20 sm:py-24 px-5 sm:px-8 border-b border-stone-200/90">
        <div className="max-w-[1240px] mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold text-stone-700 mb-2">Featured Engineering Work</p>
              <h2
                className="text-3xl sm:text-[44px] font-bold tracking-[-0.02em] leading-[1.1] text-[#141413]"
                style={FONT_SERIF}
              >
                Built, tested &amp; <em className="italic">deployed live.</em>
              </h2>
            </div>
            <a
              href="https://github.com/nischay237"
              target="_blank"
              rel="noreferrer"
              className="h-10 px-5 rounded-full bg-[#141413] hover:bg-[#2E2D2A] text-white text-xs font-bold inline-flex items-center gap-2 self-start md:self-auto transition-colors"
            >
              <GithubIcon className="w-4 h-4" /> Explore All Repositories on GitHub ↗
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl bg-[#FAF9F6] border border-stone-200 hover:border-[#141413] hover:shadow-[0_16px_40px_rgba(20,20,19,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Bold Top Accent Stripe */}
                <div className={`h-2 w-full ${project.accentBar}`} />

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-stone-700" style={FONT_MONO}>
                        {project.index} · {project.shortName}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${project.badgeClass}`}
                      >
                        {project.badge}
                      </span>
                    </div>

                    <div>
                      <h3
                        className="text-2xl font-bold tracking-[-0.015em] text-[#141413] leading-snug"
                        style={FONT_SERIF}
                      >
                        {project.editorialTitle}
                      </h3>
                      <p className="text-[14px] font-bold text-[#1E1D1B] mt-2.5 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-1">
                      {project.highlights.slice(0, 2).map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs font-bold text-[#1E1D1B] leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#1D8F5A] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold text-[#141413]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Prominent Live Demo + GitHub Links */}
                  <div className="pt-4 border-t border-stone-200/90 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => launchProject(project.id)}
                        className="h-10 px-3 rounded-full bg-[#141413] hover:bg-[#2E2D2A] text-white text-xs font-bold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="h-10 px-3 rounded-full bg-white hover:bg-[#F5C542] border border-[#141413] text-[#141413] text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> GitHub ↗
                      </a>
                    </div>
                    <button
                      onClick={() => {
                        setActiveProjectId(project.id);
                        scrollTo('interactive-lab');
                      }}
                      className="w-full py-1.5 text-xs font-bold text-[#141413] hover:underline underline-offset-4 cursor-pointer"
                    >
                      Try interactive sandbox below ↓
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. INTERACTIVE LAB (Playable Architecture Sandboxes)           */}
      {/* ============================================================== */}
      <section id="interactive-lab" className="bg-[#F9F8F5] py-20 sm:py-24 px-5 sm:px-8 border-b border-stone-200/80">
        <div className="max-w-[1240px] mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/90 pb-6">
            <div>
              <p className="text-xs font-bold text-[#1E1D1B] mb-2">Interactive walkthrough</p>
              <h2
                className="text-3xl sm:text-[44px] font-bold tracking-[-0.02em] leading-[1.1] text-[#141413]"
                style={FONT_SERIF}
              >
                A closer look at <em className="italic">how they work.</em>
              </h2>
            </div>

            <div className="flex items-center gap-6 overflow-x-auto">
              {PROJECTS.map((p) => {
                const active = p.id === activeProjectId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveProjectId(p.id)}
                    className={`relative pb-2 text-sm font-bold transition-colors cursor-pointer whitespace-nowrap flex items-baseline gap-2 ${
                      active ? 'text-[#141413]' : 'text-stone-600 hover:text-[#141413]'
                    }`}
                  >
                    <span className="text-[11px]" style={FONT_MONO}>
                      {p.index}
                    </span>
                    <span>{p.shortName}</span>
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#141413]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#1E1D1B]" style={FONT_MONO}>
                  {activeLabProject.subtitle}
                </div>
                <h3
                  className="text-2xl sm:text-[31px] font-bold tracking-[-0.015em] leading-[1.2] text-[#141413]"
                  style={FONT_SERIF}
                >
                  {activeLabProject.editorialTitle}
                </h3>
                <p className="text-[15.5px] font-bold text-[#1E1D1B] leading-[1.72]">
                  {activeLabProject.summary}
                </p>
              </div>

              <ul className="space-y-3 pt-2 border-t border-stone-200/80">
                {activeLabProject.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[14px] font-bold text-[#1E1D1B] leading-[1.65]"
                  >
                    <span className="text-[#141413] select-none mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => launchProject(activeLabProject.id)}
                  className="h-10 px-5 rounded-full bg-[#141413] hover:bg-[#2E2D2A] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {activeLabProject.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={activeLabProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 px-4 rounded-full bg-white hover:bg-[#F5C542] border border-[#141413] text-xs font-bold text-[#141413] inline-flex items-center gap-1.5 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub Repo ↗
                </a>
                {activeLabProject.driveUrl && (
                  <a
                    href={activeLabProject.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#141413] underline underline-offset-4 inline-flex items-center gap-1 ml-1"
                  >
                    Artifacts <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-[0_4px_28px_rgba(20,20,19,0.04)]">
                {activeLabProject.id === 'forge' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-[15px] font-bold text-[#141413]" style={FONT_DISPLAY}>
                          AST Blast-Radius Tracer
                        </h4>
                        <p className="text-xs font-bold text-[#1E1D1B] mt-0.5">
                          Select any service class to inspect downstream callers and test impact
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          astInfo.risk === 'High'
                            ? 'bg-orange-50 text-orange-800 border border-orange-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {astInfo.risk} blast risk
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(FORGE_NODES).map(([nodeName, meta]) => {
                        const isSel = nodeName === selectedAstNode;
                        const isImp = astInfo.callers.includes(nodeName);
                        return (
                          <button
                            key={nodeName}
                            onClick={() => setSelectedAstNode(nodeName)}
                            className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                              isSel
                                ? 'bg-[#141413] text-white border-[#141413]'
                                : isImp
                                ? 'bg-orange-50/70 text-orange-950 border-orange-300'
                                : 'bg-[#FAF9F6] text-[#141413] border-stone-200 hover:border-stone-400'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className={isSel ? 'text-stone-300' : 'text-[#1E1D1B]'}>
                                {meta.layer}
                              </span>
                              {isImp && (
                                <span className="text-[10.5px] font-bold text-orange-700">
                                  Impacted
                                </span>
                              )}
                            </div>
                            <div className="text-sm font-bold truncate" style={FONT_MONO}>
                              {nodeName}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-[#1E1D1B]">
                      <span>
                        Editing <strong className="text-[#141413]">{selectedAstNode}</strong> touches{' '}
                        <strong className="text-[#141413]">{astInfo.callers.length}</strong>{' '}
                        downstream component{astInfo.callers.length === 1 ? '' : 's'}.
                      </span>
                      <button
                        onClick={onOpenForge}
                        className="font-bold text-[#141413] underline underline-offset-4 hover:opacity-70 cursor-pointer"
                      >
                        Open full AST graph ↗
                      </button>
                    </div>
                  </div>
                )}

                {activeLabProject.id === 'codeclash' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="text-[15px] font-bold text-[#141413]" style={FONT_DISPLAY}>
                          1v1 Duel &amp; FIDE Elo Simulator
                        </h4>
                        <p className="text-xs font-bold text-[#1E1D1B] mt-0.5">
                          Watch live test-case progress race and calculate updated rating
                        </p>
                      </div>
                      <button
                        onClick={simulateDuel}
                        disabled={duelRunning}
                        className="h-9 px-4 rounded-full bg-[#141413] hover:bg-[#2E2D2A] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        {duelRunning ? 'Running match...' : 'Simulate duel'}
                      </button>
                    </div>

                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-[#141413]" style={FONT_MONO}>
                            nischay_dev
                          </span>
                          <span className="text-[#1E1D1B]" style={FONT_MONO}>
                            {p1Tests} / 12 passed
                          </span>
                        </div>
                        <div className="h-2.5 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#141413] transition-all duration-200"
                            style={{ width: `${(p1Tests / 12) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-[#1E1D1B]">
                          <span style={FONT_MONO}>algo_rival</span>
                          <span style={FONT_MONO}>{p2Tests} / 12 passed</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#DC4A3D] transition-all duration-200"
                            style={{ width: `${(p2Tests / 12) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-xs font-bold text-[#1E1D1B]">FIDE Elo</span>
                        <span className="text-2xl font-extrabold text-[#141413]" style={FONT_DISPLAY}>
                          {elo}
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                          {eloDelta}
                        </span>
                      </div>
                      <button
                        onClick={onOpenLeaderboard}
                        className="text-xs font-bold text-[#141413] underline underline-offset-4 hover:opacity-70 cursor-pointer"
                      >
                        View global leaderboard ↗
                      </button>
                    </div>
                  </div>
                )}

                {activeLabProject.id === 'analytics' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="text-[15px] font-bold text-[#141413]" style={FONT_DISPLAY}>
                          Live Web Telemetry Stream
                        </h4>
                        <p className="text-xs font-bold text-[#1E1D1B] mt-0.5">
                          Fire simulated visitor events to watch real-time ingestion velocity
                        </p>
                      </div>
                      <button
                        onClick={fireTelemetry}
                        className="h-9 px-4 rounded-full bg-[#141413] hover:bg-[#2E2D2A] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Zap className="w-3 h-3" /> Send pageview
                      </button>
                    </div>

                    <div className="flex items-center gap-8 text-xs font-bold">
                      <div>
                        <div className="text-stone-700">Active visitors</div>
                        <div className="text-2xl font-extrabold text-[#141413] mt-0.5 flex items-center gap-2" style={FONT_DISPLAY}>
                          <span className="w-2 h-2 rounded-full bg-[#1D8F5A] animate-pulse" />
                          {visitors}
                        </div>
                      </div>
                      <div>
                        <div className="text-stone-700">Events ingested</div>
                        <div className="text-2xl font-extrabold text-[#141413] mt-0.5" style={FONT_DISPLAY}>
                          {events.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-stone-700">Script weight</div>
                        <div className="text-2xl font-extrabold text-[#141413] mt-0.5" style={FONT_DISPLAY}>
                          2.4 KB
                        </div>
                      </div>
                    </div>

                    <div className="h-32 flex items-end gap-2 pt-3 border-b border-stone-200">
                      {bars.map((val, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 rounded-t-md transition-all duration-200 ${
                            idx === bars.length - 1 ? 'bg-[#1D8F5A]' : 'bg-[#141413]/85'
                          }`}
                          style={{ height: `${val}%` }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-[#1E1D1B]">
                      <span>Zero cookies · Self-hosted Node + MongoDB</span>
                      <button
                        onClick={onOpenAnalytics}
                        className="font-bold text-[#141413] underline underline-offset-4 hover:opacity-70 cursor-pointer"
                      >
                        Open full dashboard ↗
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. SKILLS & VERIFIED PROOF LEDGER                              */}
      {/* ============================================================== */}
      <section id="skills-section" className="bg-white py-20 sm:py-24 px-5 sm:px-8 border-b border-stone-200/80">
        <div className="max-w-[1240px] mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold text-[#1E1D1B] mb-2">Stack &amp; craft</p>
              <h2
                className="text-3xl sm:text-[44px] font-bold tracking-[-0.02em] leading-[1.1] text-[#141413]"
                style={FONT_SERIF}
              >
                Tools I actually <em className="italic">ship with.</em>
              </h2>
            </div>

            {selectedSkill && (
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#1E1D1B]">
                <span className="px-2.5 py-1 rounded-full bg-[#F5C542] text-[#141413]">
                  {selectedSkill.name}
                </span>
                <span>shipped in</span>
                {selectedSkill.projects.map((pid) => {
                  const proj = PROJECTS.find((p) => p.id === pid);
                  if (!proj) return null;
                  return (
                    <span key={pid} className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => launchProject(pid)}
                        className="px-3 py-1 rounded-full bg-[#141413] hover:bg-[#2E2D2A] text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {proj.shortName} <ArrowUpRight className="w-3 h-3" />
                      </button>
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        title={`${proj.shortName} GitHub`}
                        className="w-7 h-7 rounded-full border border-stone-300 hover:border-[#141413] inline-flex items-center justify-center text-[#141413]"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t border-stone-200/90 divide-y divide-stone-200/90">
            {SKILL_ROWS.map((row) => (
              <div
                key={row.id}
                className="py-7 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start"
              >
                <div className="lg:col-span-4">
                  <h3 className="text-[17px] font-extrabold text-[#141413]" style={FONT_DISPLAY}>
                    {row.title}
                  </h3>
                  <p className="text-[13.5px] font-bold text-stone-700 mt-1 leading-relaxed">
                    {row.note}
                  </p>
                </div>

                <div className="lg:col-span-8 flex flex-wrap gap-2">
                  {row.items.map((item) => {
                    const isPicked = selectedSkill?.name === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSelectedSkill(item)}
                        className={`px-3.5 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                          isPicked
                            ? 'bg-[#141413] text-[#F5C542]'
                            : 'bg-[#F6F5F0] text-[#141413] hover:bg-stone-200/80'
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
      {/* 7. EYE-CATCHING HR ABOUT & DARK-INK HIRE / GITHUB CARD         */}
      {/* ============================================================== */}
      <section id="about-section" className="bg-[#F4F2EC] py-20 sm:py-24 px-5 sm:px-8">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left: Bold Bio & HR Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-300 text-xs font-bold text-[#141413]">
                <Sparkles className="w-3.5 h-3.5 text-[#DC4A3D]" />
                <span>Candidate Profile · Open for 2026–27 SWE &amp; Internships</span>
              </div>

              <h2
                className="text-3xl sm:text-[48px] font-bold tracking-[-0.02em] leading-[1.08] text-[#141413]"
                style={FONT_SERIF}
              >
                Hi, I&apos;m <em className="italic">Nischay Srivastava.</em>
              </h2>

              <div className="space-y-4 text-[16px] font-bold text-[#1E1D1B] leading-[1.75] max-w-xl">
                <p>
                  Computer Science undergraduate at{' '}
                  <strong className="text-[#141413] underline decoration-[#F5C542] decoration-4 underline-offset-2">
                    Feroze Gandhi Institute of Engineering and Technology (AKTU)
                  </strong>
                  . I build end-to-end systems where backend architecture and user experience both
                  hold up under scrutiny — tested with ArchUnit, Flyway, Kafka Outbox, and
                  reproducible evaluation benchmarks.
                </p>
                <p>
                  Every project on this website is live, interactive, and backed by public source
                  code on GitHub so engineering managers and recruiters can inspect both the code
                  and the running product in seconds.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-300/80 text-sm font-bold">
              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <div className="text-xs text-stone-600">Education</div>
                <div className="text-[#141413] mt-1">B.Tech CSE, AKTU</div>
                <div className="text-xs text-stone-600 mt-0.5">2023 – 2027</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <div className="text-xs text-stone-600">Location</div>
                <div className="text-[#141413] mt-1">Raebareli, India</div>
                <div className="text-xs text-stone-600 mt-0.5">Open to relocate / remote</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <div className="text-xs text-stone-600">Target Roles</div>
                <div className="text-[#1D8F5A] mt-1">SWE · Backend · Full-Stack</div>
                <div className="text-xs text-stone-600 mt-0.5">Java · Spring · React</div>
              </div>
            </div>
          </div>

          {/* Right: Eye-Catching Dark-Ink HR Action & GitHub Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#141413] text-white p-7 sm:p-9 shadow-[0_18px_45px_rgba(20,20,19,0.18)] flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C542] text-[#141413] text-[11px] font-extrabold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#141413]" />
                  Open To Work
                </span>
                <span className="text-xs text-stone-400" style={FONT_MONO}>
                  Fast reply
                </span>
              </div>

              <h3
                className="text-3xl font-bold tracking-[-0.015em] text-white"
                style={FONT_SERIF}
              >
                Let&apos;s work <em className="italic text-[#F5C542]">together.</em>
              </h3>

              <p className="text-sm font-bold text-stone-300 leading-relaxed">
                Hiring for Backend, Java/Spring Boot, or Full-Stack roles? Grab my resume, inspect my
                GitHub repos, or drop a direct email below.
              </p>

              {/* Email Copy Box */}
              <div className="p-3 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between gap-2">
                <a
                  href="mailto:nischaysrivastava2@gmail.com"
                  className="text-xs font-bold text-white hover:text-[#F5C542] truncate"
                  style={FONT_MONO}
                >
                  nischaysrivastava2@gmail.com
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-[#F5C542] hover:text-[#141413] text-[11px] font-extrabold text-white inline-flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy
                    </>
                  )}
                </button>
              </div>

              {/* Primary HR CTAs */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="h-11 px-4 rounded-full bg-[#F5C542] hover:bg-white text-[#141413] text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-4 h-4" /> Resume PDF ↗
                </a>
                <a
                  href="mailto:nischaysrivastava2@gmail.com"
                  className="h-11 px-4 rounded-full bg-white hover:bg-stone-200 text-[#141413] text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Send Email
                </a>
              </div>

              {/* Prominent GitHub Profile & Repo Links */}
              <a
                href="https://github.com/nischay237"
                target="_blank"
                rel="noreferrer"
                className="w-full h-11 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-[#F5C542]" />
                  github.com/nischay237
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#F5C542]" />
              </a>
            </div>

            <div className="pt-4 border-t border-white/15 space-y-2.5">
              <div className="text-[11px] uppercase tracking-wider text-stone-400">
                Direct GitHub Repositories
              </div>
              <div className="flex flex-wrap gap-2">
                {PROJECTS.map((p) => (
                  <a
                    key={p.id}
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#F5C542] hover:text-[#141413] text-xs font-bold text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <GithubIcon className="w-3 h-3" /> {p.shortName} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. CLEAN ⌘K QUICK JUMP PALETTE                                 */}
      {/* ============================================================== */}
      {cmdOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#141413]/45 backdrop-blur-xs flex items-start justify-center pt-[14vh] px-4"
          onClick={() => setCmdOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3.5 border-b border-stone-100 flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#141413] shrink-0" />
              <input
                autoFocus
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                placeholder="Jump to Forge AI, CodeClash, Resume, GitHub..."
                className="flex-1 bg-transparent text-sm font-bold text-[#141413] placeholder:text-stone-500 focus:outline-none"
              />
              <button
                onClick={() => setCmdOpen(false)}
                className="text-stone-600 hover:text-[#141413] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-1.5 max-h-80 overflow-y-auto divide-y divide-stone-100">
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
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#F6F5F0] flex items-center justify-between gap-3 text-sm transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5 font-bold text-[#141413]">
                      <Icon className="w-4 h-4 text-[#141413]" />
                      {c.label}
                    </span>
                    <span className="text-[11px] font-bold text-stone-600" style={FONT_MONO}>
                      {c.meta}
                    </span>
                  </button>
                );
              })}
            </div>
            <div
              className="px-4 py-2.5 bg-[#FAF9F6] border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-stone-600"
              style={FONT_MONO}
            >
              <span className="inline-flex items-center gap-1">
                <Command className="w-3 h-3" /> Quick jump
              </span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
