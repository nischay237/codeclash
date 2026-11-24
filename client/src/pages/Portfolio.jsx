import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BarChart3,
  Check,
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

const GithubIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const FORGE_NODES = {
  TransferController: {
    layer: '01 API',
    callers: [],
    risk: 'LOW',
    deps: ['SettlementService', 'IdempotencyGuard'],
  },
  SettlementService: {
    layer: '02 SERVICE',
    callers: ['TransferController', 'SettlementServiceTest'],
    risk: 'HIGH',
    deps: ['FraudRiskEngine', 'LedgerRepository', 'OutboxEventPublisher'],
  },
  FraudRiskEngine: {
    layer: '02 SERVICE',
    callers: ['SettlementService', 'TransferController', 'SettlementServiceTest'],
    risk: 'HIGH',
    deps: ['VelocityCacheClient'],
  },
  LedgerRepository: {
    layer: '03 DATA',
    callers: ['SettlementService', 'TransferController', 'SettlementServiceTest'],
    risk: 'HIGH',
    deps: ['PostgreSQL 16'],
  },
};

const SKILL_GROUPS = [
  {
    id: 'backend',
    code: 'A',
    label: 'BACKEND & DISTRIBUTED',
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
    code: 'B',
    label: 'FRONTEND SYSTEMS',
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
    code: 'C',
    label: 'DATABASES & CACHING',
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
    code: 'D',
    label: 'AI & ENGINEERING OPS',
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
    code: 'E',
    label: 'CS FUNDAMENTALS',
    items: [
      { name: 'Data Structures & Graphs', projects: ['forge', 'codeclash'] },
      { name: 'FIDE Elo Algorithms', projects: ['codeclash'] },
      { name: 'Transactional Outbox', projects: ['forge'] },
      { name: 'DBMS & Indexing', projects: ['forge', 'analytics'] },
      { name: 'Concurrency & OS', projects: ['forge', 'codeclash'] },
    ],
  },
];

const PROJECT_META = {
  forge: {
    code: '01',
    name: 'FORGE AI Platform',
    cat: 'distributed',
    github: 'https://github.com/nischay237/forge-ai-platform',
  },
  codeclash: {
    code: '02',
    name: 'CodeClash 1v1 Arena',
    cat: 'realtime',
    github: 'https://github.com/nischay237/codeclash',
  },
  analytics: {
    code: '03',
    name: 'Analytics Tracker',
    cat: 'telemetry',
    github: 'https://github.com/nischay237/analytics-tracker',
    drive: 'https://drive.google.com/drive/folders/1yDR9xbt8fTiyh9TyWV9C4lS6Y4Th3-61?usp=sharing',
  },
};

export default function Portfolio({
  onOpenArena,
  onOpenLeaderboard,
  onOpenAnalytics,
  onOpenForge,
}) {
  const [workFilter, setWorkFilter] = useState('all');
  const [selectedAstNode, setSelectedAstNode] = useState('FraudRiskEngine');
  const [duelRunning, setDuelRunning] = useState(false);
  const [p1Tests, setP1Tests] = useState(12);
  const [p2Tests, setP2Tests] = useState(9);
  const [elo, setElo] = useState(1438);
  const [eloDelta, setEloDelta] = useState('+18');
  const [visitors, setVisitors] = useState(42);
  const [events, setEvents] = useState(1284);
  const [bars, setBars] = useState([42, 68, 52, 86, 60, 94, 72, 84, 58, 90]);
  const [skillFilter, setSkillFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState({
    name: 'Java 21 LTS',
    projects: ['forge'],
  });
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const launchProject = (id) => {
    if (id === 'forge') onOpenForge?.();
    else if (id === 'codeclash') onOpenArena?.();
    else if (id === 'analytics') onOpenAnalytics?.();
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
    seq.forEach(([a, b], i) => {
      setTimeout(() => {
        setP1Tests(a);
        setP2Tests(b);
        if (i === seq.length - 1) {
          setDuelRunning(false);
          setElo((v) => v + 14);
          setEloDelta('+14');
        }
      }, (i + 1) * 240);
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

  const showForge = workFilter === 'all' || workFilter === 'distributed';
  const showCodeClash = workFilter === 'all' || workFilter === 'realtime';
  const showAnalytics = workFilter === 'all' || workFilter === 'telemetry';

  const commands = useMemo(
    () => [
      { label: '01 / OPEN FORGE AI CONTROL PLANE', meta: '/forge', icon: Network, run: () => onOpenForge?.() },
      { label: '02 / LAUNCH CODECLASH 1V1 ARENA', meta: '/arena', icon: Swords, run: () => onOpenArena?.() },
      { label: '03 / VIEW CODECLASH LEADERBOARD', meta: '/leaderboard', icon: Award, run: () => onOpenLeaderboard?.() },
      { label: '04 / LAUNCH ANALYTICS DASHBOARD', meta: '/analytics', icon: BarChart3, run: () => onOpenAnalytics?.() },
      { label: '05 / OPEN RESUME.PDF', meta: 'PDF', icon: FileText, run: () => window.open('/resume.pdf', '_blank', 'noopener,noreferrer') },
      { label: '06 / COPY EMAIL ADDRESS', meta: 'CLIPBOARD', icon: Copy, run: handleCopyEmail },
      { label: '07 / GITHUB @NISCHAY237', meta: 'EXTERNAL', icon: GithubIcon, run: () => window.open('https://github.com/nischay237', '_blank', 'noopener,noreferrer') },
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
      className="min-h-screen text-[#111111] selection:bg-[#FFE600] selection:text-[#111111]"
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        backgroundColor: '#F5F5F3',
        backgroundImage: `
          linear-gradient(to right, rgba(17,17,17,0.055) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(17,17,17,0.055) 1px, transparent 1px)
        `,
        backgroundSize: '18px 18px',
      }}
    >
      {/* OUTER ARCHITECTURAL SWISS SHEET */}
      <div className="max-w-[1360px] mx-auto bg-white/95 border-x border-[#111111]/20 shadow-[0_0_40px_rgba(0,0,0,0.04)]">
        {/* ============================================================== */}
        {/* 1. CLASSIC SWISS MASTHEAD ("MINIMAL // DESIGN" ARCHITECTURE)   */}
        {/* ============================================================== */}
        <header className="px-5 sm:px-8 pt-6 pb-4 border-b border-[#111111]/15">
          {/* Top Metadata + Giant Typographic Lockup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end pb-5">
            <div className="lg:col-span-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-[#E11D24]" />
                PORTFOLIO MONOGRAPH · EDITION 2026
              </div>
              <h1 className="text-3xl sm:text-[42px] leading-none tracking-[-0.05em] uppercase select-none">
                <span className="font-black text-[#111111]">NISCHAY</span>{' '}
                <span className="font-black text-[#E11D24]">//</span>{' '}
                <span className="font-light tracking-[0.02em] text-[#111111]">ENGINEER</span>
              </h1>
            </div>

            <div className="lg:col-span-3 lg:border-l border-[#111111]/20 lg:pl-4 text-[11px] font-mono leading-relaxed text-stone-700">
              <div className="font-bold text-[#111111]">FULL-STACK &amp; DISTRIBUTED SYSTEMS</div>
              <div>JAVA 21 · SPRING BOOT 3.5 · KAFKA</div>
              <div>REACT · TYPESCRIPT · WEBSOCKETS</div>
            </div>

            <div className="lg:col-span-3 lg:border-l border-[#111111]/20 lg:pl-4 text-[11px] font-mono leading-relaxed text-stone-700 flex flex-col justify-between gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-[#111111]">RAEBARELI, IN</span>
                <span className="px-1.5 py-0.5 bg-[#FFE600] text-[#111111] font-bold text-[10px]">
                  OPEN TO ROLES
                </span>
              </div>
              <div>B.TECH CSE — FGIET (AKTU)</div>
              <button
                onClick={() => setCmdOpen(true)}
                className="inline-flex items-center justify-between px-2 py-1 border border-[#111111] bg-white hover:bg-[#111111] hover:text-white text-[10.5px] font-bold transition-colors cursor-pointer"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Search className="w-3 h-3" /> QUICK INDEX
                </span>
                <span>⌘K</span>
              </button>
            </div>
          </div>

          {/* SIGNATURE SOLID BLACK HORIZONTAL BAR NAVIGATION */}
          <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[3px] pt-1">
            {[
              { label: '01 / PORTFOLIO', action: () => scrollTo('swiss-gallery'), active: true },
              { label: '02 / FORGE AI ↗', action: onOpenForge, accent: 'red' },
              { label: '03 / CODECLASH ↗', action: onOpenArena },
              { label: '04 / ANALYTICS ↗', action: onOpenAnalytics },
              { label: '05 / SKILLS', action: () => scrollTo('skills-section') },
              { label: '06 / CONTACT', action: () => scrollTo('about-section') },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`h-8 px-3 text-left text-[10.5px] font-mono font-bold tracking-[0.08em] uppercase transition-colors cursor-pointer flex items-center justify-between ${
                  item.active
                    ? 'bg-[#111111] text-[#FFE600]'
                    : item.accent === 'red'
                    ? 'bg-[#111111] text-white hover:bg-[#E11D24]'
                    : 'bg-[#111111] text-white hover:bg-[#FFE600] hover:text-[#111111]'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[9px] opacity-60">■</span>
              </button>
            ))}
          </nav>
        </header>

        {/* ============================================================== */}
        {/* 2. ASYMMETRIC SWISS 3-COLUMN EDITORIAL GALLERY                 */}
        {/*    (Left Index Rail + Center Poster Spreads + Right Specimens) */}
        {/* ============================================================== */}
        <div
          id="swiss-gallery"
          className="px-5 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start"
        >
          {/* COLUMN A: NARROW SWISS LEFT INDEX RAIL (2 cols) */}
          <aside className="lg:col-span-2 space-y-6 lg:sticky lg:top-6">
            {/* Block 1: Index Filter */}
            <div className="border-t-2 border-[#111111] pt-2.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#111111] mb-2.5">
                WORK INDEX
              </div>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Projects', count: '03' },
                  { id: 'distributed', label: 'Distributed & AI', count: '01' },
                  { id: 'realtime', label: 'Real-Time Arena', count: '01' },
                  { id: 'telemetry', label: 'Web Telemetry', count: '01' },
                ].map((f) => {
                  const isAct = workFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setWorkFilter(f.id)}
                      className={`w-full text-left py-1 px-1.5 flex items-center justify-between transition-colors cursor-pointer ${
                        isAct
                          ? 'bg-[#111111] text-white font-semibold'
                          : 'text-stone-700 hover:bg-stone-100 hover:text-[#111111]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {isAct && <span className="w-1.5 h-1.5 bg-[#FFE600]" />}
                        {f.label}
                      </span>
                      <span className="font-mono text-[10px] opacity-75">{f.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Block 2: Brief Profile */}
            <div className="border-t-2 border-[#111111] pt-2.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#111111] mb-2">
                PROFILE
              </div>
              <p className="text-[11.5px] text-stone-700 leading-relaxed">
                <strong className="text-[#111111]">Nischay Srivastava</strong> — CS undergraduate at FGIET (AKTU) building verified AI systems, Spring Boot + Kafka backends, and low-latency WebSocket engines.
              </p>
            </div>

            {/* Block 3: Direct Live Links */}
            <div className="border-t-2 border-[#111111] pt-2.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#111111] mb-2">
                LIVE LAUNCHERS
              </div>
              <div className="divide-y divide-stone-200 text-[11.5px] font-medium">
                <button
                  onClick={onOpenForge}
                  className="w-full py-1.5 text-left flex items-center justify-between hover:text-[#E11D24] cursor-pointer"
                >
                  <span>FORGE Control Plane</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
                <button
                  onClick={onOpenArena}
                  className="w-full py-1.5 text-left flex items-center justify-between hover:text-[#E11D24] cursor-pointer"
                >
                  <span>CodeClash 1v1 Arena</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
                <button
                  onClick={onOpenLeaderboard}
                  className="w-full py-1.5 text-left flex items-center justify-between hover:text-[#E11D24] cursor-pointer"
                >
                  <span>Global Leaderboard</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
                <button
                  onClick={onOpenAnalytics}
                  className="w-full py-1.5 text-left flex items-center justify-between hover:text-[#E11D24] cursor-pointer"
                >
                  <span>Analytics Tracker</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Block 4: Contact & Documents */}
            <div className="border-t-2 border-[#111111] pt-2.5 space-y-1.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#111111] mb-2">
                DOCUMENTS
              </div>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="w-full py-1.5 px-2 bg-[#111111] hover:bg-[#E11D24] text-white text-[11px] font-mono font-bold flex items-center justify-between transition-colors"
              >
                <span>RESUME.PDF</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/nischay237"
                target="_blank"
                rel="noreferrer"
                className="w-full py-1.5 px-2 border border-[#111111] hover:bg-[#111111] hover:text-white text-[11px] font-mono font-bold flex items-center justify-between transition-colors"
              >
                <span>GITHUB @237</span>
                <GithubIcon className="w-3 h-3" />
              </a>
              <button
                onClick={handleCopyEmail}
                className="w-full py-1.5 px-2 border border-stone-300 hover:border-[#111111] bg-[#FAFAF8] text-[11px] font-mono font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>{copiedEmail ? 'EMAIL COPIED' : 'COPY EMAIL'}</span>
                {copiedEmail ? (
                  <Check className="w-3 h-3 text-[#E11D24]" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </aside>

          {/* COLUMN B: CENTER FEATURED SWISS INTERACTIVE POSTER PLATES (7 cols) */}
          <div className="lg:col-span-7 space-y-9">
            {/* ---------------------------------------------------------- */}
            {/* POSTER PLATE 01: FORGE AI (Type + Signal Yellow Vertical)  */}
            {/* ---------------------------------------------------------- */}
            {showForge && (
              <article className="border-t-2 border-[#111111] pt-3 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="font-bold text-[#111111]">
                    PLATE 01 // FORGE AI SOFTWARE ENGINEERING PLATFORM
                  </span>
                  <span className="text-stone-500">JAVA 21 · SPRING BOOT 3.5 · KAFKA · AST</span>
                </div>

                {/* SWISS GRAPHIC DESIGN POSTER SPREAD (LIVE INTERACTIVE) */}
                <div className="border border-[#111111] bg-[#F4F4F1] p-4 sm:p-5 relative overflow-hidden">
                  <div className="bg-white border border-stone-300 grid grid-cols-1 md:grid-cols-12 relative">
                    {/* Left Typographic Composition */}
                    <div className="md:col-span-5 p-5 sm:p-6 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col justify-between relative">
                      <div>
                        <div className="inline-block px-1.5 py-0.5 bg-[#FFE600] text-[#111111] text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
                          EVAL F1: 100.0% · 0% FPR
                        </div>
                        <div className="text-4xl sm:text-5xl font-black tracking-[-0.06em] leading-[0.88] text-[#111111] uppercase">
                          FORGE
                          <br />
                          <span className="font-light text-stone-400">AST.01</span>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <p className="text-[11.5px] font-mono text-stone-600 leading-relaxed">
                          JavaParser AST dependency graph + BFS blast radius + Kafka Outbox + Gitleaks secret masking.
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <button
                            onClick={onOpenForge}
                            className="px-3 py-1.5 bg-[#111111] hover:bg-[#E11D24] text-white text-[11px] font-mono font-bold uppercase inline-flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            OPEN CONTROL PLANE <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={PROJECT_META.forge.github}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 border border-[#111111] hover:bg-[#111111] hover:text-white text-[11px] font-mono font-bold uppercase inline-flex items-center gap-1 transition-colors"
                          >
                            <GithubIcon className="w-3 h-3" /> CODE
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Right Interactive AST Specimen Board + Vertical Signal Yellow Stripe */}
                    <div className="md:col-span-7 p-5 sm:p-6 pr-12 bg-[#FAFAF8] relative flex flex-col justify-between gap-4">
                      {/* Iconic Rotated Signal Yellow Vertical Tag (like "perfection" in reference!) */}
                      <div
                        className="absolute top-0 right-0 bottom-0 w-7 bg-[#FFE600] border-l border-[#111111]/15 flex items-center justify-center select-none"
                        aria-hidden="true"
                      >
                        <span
                          className="text-[10px] font-mono font-black uppercase tracking-[0.22em] text-[#111111] whitespace-nowrap"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          VERIFIED // BLAST RADIUS
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono uppercase text-stone-500">
                        <span className="font-bold text-[#111111]">
                          INTERACTIVE AST NODES (CLICK TO TRACE)
                        </span>
                        <span className="text-[#E11D24] font-bold">
                          {astInfo.callers.length} IMPACTED
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(FORGE_NODES).map(([nodeName, meta]) => {
                          const isSel = nodeName === selectedAstNode;
                          const isImp = astInfo.callers.includes(nodeName);
                          return (
                            <button
                              key={nodeName}
                              onClick={() => setSelectedAstNode(nodeName)}
                              className={`text-left p-2.5 border transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-[#111111] text-white border-[#111111]'
                                  : isImp
                                  ? 'bg-white text-[#E11D24] border-2 border-[#E11D24]'
                                  : 'bg-white text-[#111111] border-stone-300 hover:border-[#111111]'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[9.5px] font-mono">
                                <span className={isSel ? 'text-[#FFE600]' : isImp ? 'text-[#E11D24] font-bold' : 'text-stone-400'}>
                                  {meta.layer}
                                </span>
                                {isImp && <span className="font-bold">↑ HIT</span>}
                              </div>
                              <div className="text-[11.5px] font-mono font-bold truncate mt-0.5">
                                {nodeName}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="border-t border-[#111111]/15 pt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                        <span className="text-stone-700">
                          TARGET: <strong className="text-[#111111]">{selectedAstNode}</strong>
                        </span>
                        <span
                          className={`px-1.5 py-0.5 font-bold text-[10px] ${
                            astInfo.risk === 'HIGH'
                              ? 'bg-[#E11D24] text-white'
                              : 'bg-[#111111] text-[#FFE600]'
                          }`}
                        >
                          RISK: {astInfo.risk}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editorial Monograph Caption Paragraph */}
                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed">
                  Multi-tenant Java 21 + Spring Boot 3.5 modular monolith verifying HMAC-signed GitHub webhooks, computing exact JavaParser AST blast radius via BFS, streaming async PR reviews over Transactional Outbox &amp; Apache Kafka DLT, and enforcing human approval before comments touch GitHub. Verified with 4 ArchUnit rules &amp; 8-case AI Evaluation Suite.
                </p>
              </article>
            )}

            {/* ---------------------------------------------------------- */}
            {/* POSTER PLATE 02: CODECLASH (Bold Swiss Red Diagonal Slash) */}
            {/* ---------------------------------------------------------- */}
            {showCodeClash && (
              <article className="border-t-2 border-[#111111] pt-3 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="font-bold text-[#111111]">
                    PLATE 02 // CODECLASH 1V1 REAL-TIME CODING ARENA
                  </span>
                  <span className="text-stone-500">WEBSOCKETS · NODE.JS · SANDBOX · FIDE ELO</span>
                </div>

                {/* SWISS RED-SLASH TYPOGRAPHIC POSTER + LIVE DUEL SIMULATOR */}
                <div className="border border-[#111111] bg-[#111111] p-4 sm:p-5">
                  <div className="bg-white grid grid-cols-1 md:grid-cols-12 relative overflow-hidden">
                    {/* Left Iconic Swiss Red Slash Typographic Graphic */}
                    <div className="md:col-span-5 p-5 sm:p-6 bg-[#111111] text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                      {/* Authentic Swiss Red Diagonal Beam */}
                      <div
                        className="absolute -right-8 top-0 bottom-0 w-10 bg-[#E11D24] transform -skew-x-12 pointer-events-none"
                        aria-hidden="true"
                      />
                      <div className="relative z-10">
                        <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-400">
                          REAL-TIME PVP ENGINE
                        </div>
                        <div className="text-5xl sm:text-6xl font-black tracking-[-0.06em] leading-none mt-2">
                          1v1
                        </div>
                        <div className="text-sm font-mono font-bold tracking-[0.14em] uppercase mt-1 text-[#FFE600]">
                          CODE // CLASH
                        </div>
                      </div>

                      <div className="relative z-10 mt-6 flex flex-wrap gap-1.5">
                        <button
                          onClick={onOpenArena}
                          className="px-3 py-1.5 bg-white hover:bg-[#FFE600] text-[#111111] text-[11px] font-mono font-bold uppercase inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          ENTER ARENA <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={onOpenLeaderboard}
                          className="px-2.5 py-1.5 border border-white/40 hover:border-white text-white text-[11px] font-mono font-bold uppercase cursor-pointer"
                        >
                          ELO RANKS
                        </button>
                      </div>
                    </div>

                    {/* Right Interactive Live Duel Simulator */}
                    <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between gap-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#111111]">
                          INTERACTIVE DUEL SIMULATOR
                        </span>
                        <button
                          onClick={simulateDuel}
                          disabled={duelRunning}
                          className="px-2.5 py-1 bg-[#E11D24] hover:bg-[#111111] text-white text-[10.5px] font-mono font-bold uppercase inline-flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Play className="w-2.5 h-2.5 fill-current" />
                          {duelRunning ? 'RUNNING...' : 'SIMULATE DUEL'}
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="font-bold text-[#111111]">NISCHAY_DEV</span>
                            <span className="font-bold">{p1Tests}/12 CASES</span>
                          </div>
                          <div className="h-3 bg-stone-200 w-full">
                            <div
                              className="h-full bg-[#111111] transition-all duration-200"
                              style={{ width: `${(p1Tests / 12) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-mono text-stone-600">
                            <span>ALGO_RIVAL</span>
                            <span>{p2Tests}/12 CASES</span>
                          </div>
                          <div className="h-3 bg-stone-200 w-full">
                            <div
                              className="h-full bg-[#E11D24] transition-all duration-200"
                              style={{ width: `${(p2Tests / 12) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-[#111111]/15 pt-3 flex items-center justify-between font-mono text-xs">
                        <div>
                          <span className="text-[10px] text-stone-500 block">FIDE ELO RATING</span>
                          <span className="text-lg font-black text-[#111111] tabular-nums">
                            {elo}
                          </span>
                          <span className="ml-2 px-1.5 py-0.5 bg-[#FFE600] text-[#111111] text-[10px] font-bold">
                            {eloDelta} ELO
                          </span>
                        </div>
                        <a
                          href={PROJECT_META.codeclash.github}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1.5 border border-[#111111] hover:bg-[#111111] hover:text-white text-[10.5px] font-bold uppercase inline-flex items-center gap-1 transition-colors"
                        >
                          <GithubIcon className="w-3 h-3" /> SOURCE
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed">
                  Competitive 1v1 coding arena synchronizing live keystrokes and opponent progress over Socket.io WebSockets. Evaluates submissions in a timeout-guarded sandbox and updates global player rankings via real FIDE Elo mathematics backed by MongoDB Atlas with in-memory fallback.
                </p>
              </article>
            )}

            {/* ---------------------------------------------------------- */}
            {/* POSTER PLATE 03: ANALYTICS TRACKER (<3KB Signal Yellow)    */}
            {/* ---------------------------------------------------------- */}
            {showAnalytics && (
              <article className="border-t-2 border-[#111111] pt-3 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="font-bold text-[#111111]">
                    PLATE 03 // REAL-TIME WEB TELEMETRY &amp; ANALYTICS
                  </span>
                  <span className="text-stone-500">&lt;3KB SNIPPET · COOKIELESS · NODE + REACT</span>
                </div>

                <div className="border border-[#111111] bg-[#EAEAE6] p-4 sm:p-5">
                  <div className="bg-white border border-stone-300 grid grid-cols-1 md:grid-cols-12">
                    {/* Left Geometric Bold <3KB Poster */}
                    <div className="md:col-span-5 p-5 sm:p-6 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-2 bg-[#FFE600] mb-3 border border-[#111111]/20" />
                        <div className="text-4xl sm:text-5xl font-black tracking-[-0.06em] leading-none text-[#111111]">
                          &lt;3KB
                        </div>
                        <div className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-stone-500 mt-1.5">
                          ZERO-COOKIE TELEMETRY
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-1.5">
                        <button
                          onClick={onOpenAnalytics}
                          className="px-3 py-1.5 bg-[#111111] hover:bg-[#E11D24] text-white text-[11px] font-mono font-bold uppercase inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          LIVE DASHBOARD <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={PROJECT_META.analytics.drive}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1.5 border border-[#111111] hover:bg-[#111111] hover:text-white text-[10.5px] font-mono font-bold uppercase inline-flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" /> DOCS
                        </a>
                      </div>
                    </div>

                    {/* Right Interactive Live Telemetry Pulse */}
                    <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between gap-4 bg-[#FAFAF8]">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-mono text-xs flex items-center gap-4">
                          <span>
                            ACTIVE:{' '}
                            <strong className="text-[#111111] tabular-nums">{visitors}</strong>
                          </span>
                          <span>
                            EVENTS:{' '}
                            <strong className="text-[#111111] tabular-nums">
                              {events.toLocaleString()}
                            </strong>
                          </span>
                        </div>
                        <button
                          onClick={fireTelemetry}
                          className="px-2.5 py-1 bg-[#FFE600] hover:bg-[#111111] hover:text-white text-[#111111] border border-[#111111] text-[10.5px] font-mono font-bold uppercase inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Zap className="w-3 h-3" /> FIRE EVENT
                        </button>
                      </div>

                      {/* Sharp Swiss Bar Chart */}
                      <div className="h-24 flex items-end gap-1.5 border-b-2 border-[#111111] pt-2">
                        {bars.map((v, idx) => (
                          <div
                            key={idx}
                            className={`flex-1 transition-all duration-200 ${
                              idx === bars.length - 1
                                ? 'bg-[#E11D24]'
                                : idx === bars.length - 2
                                ? 'bg-[#FFE600] border border-[#111111]/30'
                                : 'bg-[#111111]'
                            }`}
                            style={{ height: `${v}%` }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[10.5px] font-mono text-stone-500">
                        <span>PAYLOAD: 2.4KB GZIP · WEBSOCKET HEARTBEATS</span>
                        <a
                          href={PROJECT_META.analytics.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#111111] font-bold hover:text-[#E11D24] underline"
                        >
                          GITHUB ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed">
                  Self-hosted, privacy-first web telemetry platform replacing bloated trackers with a sub-3KB script. Streams live active visitors, session heartbeats, and conversion funnels over Node.js, Express, and MongoDB without third-party cookies.
                </p>
              </article>
            )}
          </div>

          {/* COLUMN C: RIGHT SWISS SPECIMEN & POSTER INDEX COLUMN (3 cols) */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Specimen 1: Iconic Swiss Manifesto Poster Block */}
            <div className="border-2 border-[#111111] bg-white p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.14em] text-stone-500 mb-3">
                <span>SPECIMEN 01</span>
                <span className="text-[#E11D24] font-bold">● LIVE</span>
              </div>
              <div className="text-3xl font-black tracking-[-0.05em] leading-[0.95] uppercase text-[#111111]">
                SYSTEMS
                <br />
                BUILT FOR
                <br />
                <span className="bg-[#FFE600] px-1 inline-block mt-0.5">PRECISION.</span>
              </div>
              <div className="mt-4 pt-3 border-t border-[#111111] grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div>
                  <div className="text-stone-400 text-[9.5px]">LIVE APPS</div>
                  <div className="font-black text-base text-[#111111]">03</div>
                </div>
                <div>
                  <div className="text-stone-400 text-[9.5px]">AI EVAL F1</div>
                  <div className="font-black text-base text-[#E11D24]">100%</div>
                </div>
                <div>
                  <div className="text-stone-400 text-[9.5px]">ARCH TESTS</div>
                  <div className="font-black text-base text-[#111111]">08/08</div>
                </div>
                <div>
                  <div className="text-stone-400 text-[9.5px]">GRADUATION</div>
                  <div className="font-black text-base text-[#111111]">2027</div>
                </div>
              </div>
            </div>

            {/* Specimen 2: Live System Telemetry Table */}
            <div className="border-t-2 border-[#111111] pt-2.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#111111] mb-2.5">
                DEPLOYED ENDPOINTS
              </div>
              <div className="border border-[#111111] divide-y divide-[#111111]/20 font-mono text-[11px] bg-white">
                {[
                  { path: '/forge', label: 'FORGE Control Plane', tag: 'LIVE', fn: onOpenForge },
                  { path: '/arena', label: 'CodeClash 1v1', tag: 'PLAY', fn: onOpenArena },
                  { path: '/leaderboard', label: 'Elo Rankings', tag: 'SYNC', fn: onOpenLeaderboard },
                  { path: '/analytics', label: 'Web Telemetry', tag: '<3KB', fn: onOpenAnalytics },
                ].map((row) => (
                  <button
                    key={row.path}
                    onClick={row.fn}
                    className="w-full px-3 py-2.5 text-left hover:bg-[#111111] hover:text-white flex items-center justify-between gap-2 transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold">{row.path}</div>
                      <div className="text-[10px] text-stone-500 group-hover:text-stone-300">
                        {row.label}
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 text-[9.5px] font-bold bg-[#F2F2EE] text-[#111111] group-hover:bg-[#FFE600]">
                      {row.tag} ↗
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specimen 3: Red Accent Architecture Highlight Tile */}
            <div className="bg-[#111111] text-white p-5 relative overflow-hidden">
              <div className="w-full h-1.5 bg-[#E11D24] mb-4" />
              <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-400">
                ARCHITECTURAL PROOF
              </div>
              <div className="text-lg font-bold tracking-[-0.02em] mt-1 leading-snug">
                Every skill below links straight to a live shipped system.
              </div>
              <button
                onClick={() => scrollTo('skills-section')}
                className="mt-4 w-full py-2 bg-[#FFE600] hover:bg-white text-[#111111] text-[11px] font-mono font-bold uppercase transition-colors cursor-pointer"
              >
                INSPECT SKILLS MATRIX ↓
              </button>
            </div>
          </aside>
        </div>

        {/* ============================================================== */}
        {/* 3. INTERACTIVE SWISS SKILLS & PROOF SPECIMEN GRID              */}
        {/* ============================================================== */}
        <section
          id="skills-section"
          className="px-5 sm:px-8 py-12 border-t-2 border-[#111111] bg-[#FAFAF8]"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#E11D24]">
                SECTION 02 // INTERACTIVE TECHNICAL INDEX
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.04em] uppercase text-[#111111] mt-1">
                SKILLS <span className="text-stone-400 font-light">&amp;</span> SHIPPED PROOF
              </h2>
            </div>

            {/* Solid Black Bar Filter Tabs */}
            <div className="flex flex-wrap gap-[2px]">
              {[
                { id: 'all', label: 'ALL' },
                ...SKILL_GROUPS.map((g) => ({ id: g.id, label: `${g.code} / ${g.id.toUpperCase()}` })),
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSkillFilter(t.id)}
                  className={`px-3 py-1.5 text-[10.5px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                    skillFilter === t.id
                      ? 'bg-[#E11D24] text-white'
                      : 'bg-[#111111] text-white hover:bg-[#FFE600] hover:text-[#111111]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Interactive Skill Proof Bar */}
          {selectedSkill && (
            <div className="mb-6 border-2 border-[#111111] bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-1.5 py-0.5 bg-[#FFE600] text-[#111111] font-bold text-[10px]">
                  SELECTED
                </span>
                <strong className="text-[#111111]">{selectedSkill.name}</strong>
                <span className="text-stone-400">→</span>
                <span className="text-stone-600 text-[11px]">USED IN:</span>
                {selectedSkill.projects.map((pid) => (
                  <button
                    key={pid}
                    onClick={() => launchProject(pid)}
                    className="px-2.5 py-1 bg-[#111111] hover:bg-[#E11D24] text-white text-[10.5px] font-bold uppercase inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {PROJECT_META[pid].name} <ArrowUpRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
              <span className="text-[10.5px] text-stone-400 uppercase">
                CLICK ANY SKILL CELL TO VERIFY
              </span>
            </div>
          )}

          {/* Crisp Hairline Swiss Grid Cells */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleSkillGroups.map((group) => (
              <div key={group.id} className="border border-[#111111] bg-white p-5">
                <div className="flex items-center justify-between border-b border-[#111111] pb-2 mb-3.5 font-mono">
                  <span className="text-xs font-black tracking-[0.06em] text-[#111111]">
                    {group.code} // {group.label}
                  </span>
                  <span className="text-[10px] text-stone-400">{group.items.length} ITEMS</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => {
                    const active = selectedSkill?.name === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSelectedSkill(item)}
                        className={`px-2.5 py-1.5 text-[11.5px] font-mono border transition-colors cursor-pointer flex items-center gap-1.5 ${
                          active
                            ? 'bg-[#111111] text-white border-[#111111] font-bold'
                            : 'bg-[#FAFAF8] text-[#111111] border-stone-300 hover:border-[#111111]'
                        }`}
                      >
                        {active && <span className="w-1.5 h-1.5 bg-[#FFE600]" />}
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. ABOUT, EDUCATION & CONTACT SWISS COLOPHON                   */}
        {/* ============================================================== */}
        <section id="about-section" className="px-5 sm:px-8 py-12 border-t-2 border-[#111111] bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Biography & Academic Record */}
            <div className="lg:col-span-7 space-y-5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#E11D24]">
                SECTION 03 // BIOGRAPHY &amp; COLOPHON
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#111111] text-[#FFE600] font-black text-2xl flex items-center justify-center tracking-tighter shrink-0">
                  NS
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.04em] uppercase text-[#111111]">
                    NISCHAY SRIVASTAVA
                  </h2>
                  <div className="text-xs font-mono text-stone-500">
                    B.TECH COMPUTER SCIENCE &amp; ENGINEERING · 2023 – PRESENT
                  </div>
                </div>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed max-w-2xl">
                Computer Science undergraduate at{' '}
                <strong className="text-[#111111]">
                  Feroze Gandhi Institute of Engineering and Technology (AKTU)
                </strong>
                , Raebareli, Uttar Pradesh. Focused on architecting deterministic AI engineering platforms, multi-tenant Spring Boot &amp; Kafka backends, and ultra-responsive real-time web systems.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#111111] divide-y sm:divide-y-0 sm:divide-x divide-[#111111] font-mono text-xs">
                <div className="p-3.5">
                  <div className="text-[10px] text-stone-400">INSTITUTION</div>
                  <div className="font-bold text-[#111111] mt-0.5">FGIET (AKTU)</div>
                </div>
                <div className="p-3.5">
                  <div className="text-[10px] text-stone-400">LOCATION</div>
                  <div className="font-bold text-[#111111] mt-0.5">RAEBARELI, UP, IN</div>
                </div>
                <div className="p-3.5">
                  <div className="text-[10px] text-stone-400">AVAILABILITY</div>
                  <div className="font-bold text-[#E11D24] mt-0.5">SWE / BACKEND / FULL-STACK</div>
                </div>
              </div>
            </div>

            {/* Right: Direct Contact Ledger */}
            <div className="lg:col-span-5 border-2 border-[#111111] p-6 bg-[#FAFAF8] space-y-4">
              <div className="flex items-center justify-between border-b border-[#111111] pb-2 font-mono text-xs font-bold">
                <span>DIRECT CONTACT LEDGER</span>
                <span className="bg-[#FFE600] px-1.5 py-0.5 text-[10px]">FAST REPLY</span>
              </div>

              <div className="border border-[#111111] bg-white px-3 py-2.5 flex items-center justify-between gap-2 font-mono text-xs">
                <span className="truncate font-semibold">nischaysrivastava2@gmail.com</span>
                <button
                  onClick={handleCopyEmail}
                  className="px-2 py-1 bg-[#111111] hover:bg-[#E11D24] text-white text-[10px] font-bold uppercase shrink-0 cursor-pointer transition-colors"
                >
                  {copiedEmail ? 'COPIED ✓' : 'COPY'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <a
                  href="mailto:nischaysrivastava2@gmail.com"
                  className="py-2.5 px-3 bg-[#111111] hover:bg-[#E11D24] text-white font-bold uppercase flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> SEND EMAIL
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 bg-white hover:bg-[#FFE600] border border-[#111111] text-[#111111] font-bold uppercase flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" /> RESUME.PDF
                </a>
              </div>

              <a
                href="https://github.com/nischay237"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 bg-white hover:bg-[#111111] hover:text-white border border-[#111111] text-[#111111] font-mono text-xs font-bold uppercase flex items-center justify-between transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5" /> GITHUB.COM/NISCHAY237
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================== */}
      {/* 5. RAZOR-SHARP SWISS ⌘K COMMAND INDEX MODAL                    */}
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
            <div className="px-4 py-3 border-b-2 border-[#111111] flex items-center gap-2.5 bg-[#FAFAF8]">
              <Search className="w-4 h-4 text-[#111111] shrink-0" />
              <input
                autoFocus
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                placeholder="TYPE COMMAND (FORGE, CODECLASH, RESUME, EMAIL)..."
                className="flex-1 bg-transparent font-mono text-xs text-[#111111] placeholder:text-stone-400 focus:outline-none uppercase"
              />
              <button
                onClick={() => setCmdOpen(false)}
                className="text-[#111111] hover:text-[#E11D24] cursor-pointer"
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
                    <span className="flex items-center gap-2.5 font-bold">
                      <Icon className="w-3.5 h-3.5 text-[#E11D24] group-hover:text-[#FFE600]" />
                      {c.label}
                    </span>
                    <span className="text-[10px] text-stone-400 group-hover:text-[#FFE600]">
                      {c.meta}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="px-4 py-2 bg-[#111111] text-[#FFE600] flex items-center justify-between text-[10px] font-mono uppercase">
              <span className="inline-flex items-center gap-1">
                <Command className="w-3 h-3" /> SWISS QUICK INDEX
              </span>
              <span>ESC TO CLOSE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
