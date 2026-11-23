import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Swords, 
  Bot, 
  BarChart3, 
  ExternalLink, 
  Sparkles, 
  Terminal, 
  Layers, 
  Cpu, 
  Database, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Mail, 
  MapPin, 
  X,
  Play,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Eye,
  Activity,
  GitBranch,
  ChevronRight,
  TrendingUp,
  Flame,
  Brain
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const FLOATING_EMOJIS = [
  { emoji: "⚔️", top: "5%", left: "3%", speed: -0.15, anim: "animate-float-a", size: "text-3xl sm:text-4xl" },
  { emoji: "🚀", top: "12%", right: "4%", speed: 0.22, anim: "animate-float-b", size: "text-4xl sm:text-5xl" },
  { emoji: "💻", top: "25%", left: "2%", speed: -0.18, anim: "animate-float-c", size: "text-3xl sm:text-4xl" },
  { emoji: "⚡", top: "38%", right: "3%", speed: 0.12, anim: "animate-float-a", size: "text-3xl sm:text-4xl" },
  { image: "/robot-mascot.png", top: "50%", left: "3.5%", speed: -0.25, anim: "animate-float-b", size: "w-14 sm:w-16 h-auto" },
  { emoji: "🔥", top: "62%", right: "2%", speed: 0.18, anim: "animate-float-c", size: "text-3xl sm:text-4xl" },
  { emoji: "📊", top: "72%", left: "3%", speed: -0.14, anim: "animate-float-a", size: "text-3xl sm:text-4xl" },
  { emoji: "✨", top: "82%", right: "4%", speed: 0.20, anim: "animate-float-b", size: "text-4xl sm:text-5xl" },
  { emoji: "💡", top: "90%", left: "2%", speed: -0.22, anim: "animate-float-c", size: "text-3xl sm:text-4xl" },
  { emoji: "🎯", top: "18%", right: "8%", speed: -0.12, anim: "animate-float-a", size: "text-2xl sm:text-3xl" },
  { emoji: "📦", top: "45%", right: "6%", speed: 0.15, anim: "animate-float-b", size: "text-3xl sm:text-4xl" },
  { emoji: "🏆", top: "78%", left: "6%", speed: -0.17, anim: "animate-float-c", size: "text-3xl sm:text-4xl" }
];

const PROJECTS = [
  {
    id: 1,
    number: "1.",
    title: "CodeClash — 1v1 Real-Time Coding Battle Arena",
    shortTitle: "CodeClash Arena",
    tagline: "Live 1v1 Competitive Coding Duels with WebSocket Engine",
    category: "Real-Time Game",
    categoryColor: "text-orange-600",
    badge: "PLAYABLE LIVE",
    colorName: "orange",
    bgGradient: "from-[#f97316] via-[#ea580c] to-[#c2410c]",
    cardBorder: "border-orange-300/40",
    hoverBorder: "group-hover:border-white",
    hoverGlow: "group-hover:shadow-orange-500/40",
    numberColor: "text-amber-200",
    badgeBg: "bg-white/20 text-white border-white/30",
    accentColor: "#f97316",
    previewType: "codeclash",
    popupBg: "from-[#200e04]/95 via-[#140802]/95 to-[#0c0401]/95",
    popupBorder: "border-orange-400",
    popupGlow: "shadow-orange-500/50",
    popupAccentGradient: "from-orange-500 via-amber-400 to-yellow-300",
    popupBadge: "CodeClash Duels",
    popupBadgeStyle: "bg-orange-500/20 text-orange-200 border-orange-400/50",
    popupNumberColor: "text-amber-300",
    popupPointerBg: "bg-[#0f0602] border-orange-400",
    introLines: [
      "Real-time 1v1 coding arena where developers race head-to-head on DSA problems.",
      "Low-latency WebSocket engine syncs keystrokes with safe code execution in isolated sandboxes.",
      "Automated test case verification with live Elo ranking calculated after every duel."
    ],
    aboutHindi: "Real-time 1v1 coding arena where developers race head-to-head on DSA problems. Low-latency WebSocket engine syncs keystrokes with safe code execution in isolated sandboxes. Automated test case verification with live Elo ranking calculated after every duel.",
    aboutEnglish: "A fast real-time 1v1 competitive coding platform built for quick algorithm battles between friends. Features bidirectional WebSocket keystroke sync, an automated sandbox for evaluating test cases safely, and instant Elo rating computations.",
    highlights: [
      "Bidirectional WebSocket engine for zero-lag keystroke and duel sync",
      "Isolated code execution sandbox with security and timeout constraints",
      "FIDE-grade Elo rating engine calculating player ranks in real time",
      "Resilient dual persistence with MongoDB Atlas and in-memory fallback"
    ],
    techStack: ["React.js", "Node.js", "Express.js", "Socket.io", "Tailwind CSS", "MongoDB"],
    githubUrl: "https://github.com/nischay237/codeclash",
    isLiveApp: true,
    launchLabel: "Launch Live Arena"
  },
  {
    id: 2,
    number: "2.",
    title: "Real-Time Analytics Tracker & Dashboard",
    shortTitle: "Analytics Tracker",
    tagline: "Self-hosted, privacy-first web telemetry under 3KB",
    category: "Telemetry & Sockets",
    categoryColor: "text-rose-600",
    badge: "LIVE STATS",
    colorName: "red",
    bgGradient: "from-[#ef4444] via-[#dc2626] to-[#b91c1c]",
    cardBorder: "border-red-300/40",
    hoverBorder: "group-hover:border-white",
    hoverGlow: "group-hover:shadow-red-500/40",
    numberColor: "text-red-100",
    badgeBg: "bg-white/20 text-white border-white/30",
    accentColor: "#ef4444",
    previewType: "analytics",
    popupBg: "from-[#220707]/95 via-[#160404]/95 to-[#0d0202]/95",
    popupBorder: "border-rose-400",
    popupGlow: "shadow-rose-500/50",
    popupAccentGradient: "from-rose-500 via-red-400 to-orange-300",
    popupBadge: "Live Web Telemetry",
    popupBadgeStyle: "bg-rose-500/20 text-rose-200 border-rose-400/50",
    popupNumberColor: "text-rose-300",
    popupPointerBg: "bg-[#110303] border-rose-400",
    introLines: [
      "Privacy-first, self-hosted web analytics and live visitor telemetry dashboard.",
      "Ultra-lightweight tracking script under 3KB with zero third-party cookie bloat.",
      "Real-time active visitor counts, session heartbeats, and clean conversion funnels."
    ],
    aboutHindi: "Privacy-first, self-hosted web analytics and live visitor telemetry dashboard. Ultra-lightweight tracking script under 3KB with zero third-party cookie bloat. Real-time active visitor counts, session heartbeats, and clean conversion funnels.",
    aboutEnglish: "A self-hosted, lightweight web telemetry platform. Replaces bloated trackers with an embeddable <3KB snippet, streaming live pageviews, active visitor counts, and event funnels without tracking user cookies.",
    highlights: [
      "Ultra-lightweight embeddable snippet under 3KB with zero tracking cookies",
      "Real-time active visitors count synchronized over WebSocket heartbeats",
      "High-throughput ingestion pipeline built with Node.js & Express",
      "Interactive dashboard with live session graphs and conversion funnels"
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],
    githubUrl: "https://github.com/nischay237/analytics-tracker",
    driveUrl: "https://drive.google.com/drive/folders/1yDR9xbt8fTiyh9TyWV9C4lS6Y4Th3-61?usp=sharing",
    isLiveApp: true,
    launchLabel: "Launch Live Dashboard"
  }
];

const SKILLS = [
  { 
    id: "frontend",
    label: "Frontend Engineering", 
    tagline: "Snappy, responsive, accessible UIs",
    accentColor: "from-cyan-500 to-blue-600",
    badgeBg: "bg-cyan-500 text-white",
    iconColor: "text-cyan-600",
    borderColor: "group-hover:border-cyan-400",
    glowColor: "group-hover:shadow-cyan-500/20",
    icon: Code2,
    animType: "spin",
    items: [
      { name: "React.js", hot: true },
      { name: "Tailwind CSS", hot: true },
      { name: "Vite" },
      { name: "JavaScript (ES6+)", hot: true },
      { name: "HTML5 / Semantic" },
      { name: "CSS3 Animations" }
    ]
  },
  { 
    id: "backend",
    label: "Backend & Real-Time", 
    tagline: "Low-latency WebSockets & REST APIs",
    accentColor: "from-emerald-500 to-teal-600",
    badgeBg: "bg-emerald-600 text-white",
    iconColor: "text-emerald-600",
    borderColor: "group-hover:border-emerald-400",
    glowColor: "group-hover:shadow-emerald-500/20",
    icon: Activity,
    animType: "pulse",
    items: [
      { name: "Node.js", hot: true },
      { name: "Express.js", hot: true },
      { name: "Socket.io (WebSockets)", hot: true },
      { name: "RESTful Architecture" },
      { name: "JWT Authentication", hot: true },
      { name: "bcrypt & Middleware" }
    ]
  },
  { 
    id: "databases",
    label: "Databases & Storage", 
    tagline: "Persistent models & dual caching",
    accentColor: "from-purple-500 to-indigo-600",
    badgeBg: "bg-purple-600 text-white",
    iconColor: "text-purple-600",
    borderColor: "group-hover:border-purple-400",
    glowColor: "group-hover:shadow-purple-500/20",
    icon: Database,
    animType: "bounce",
    items: [
      { name: "MongoDB", hot: true },
      { name: "Mongoose ODM", hot: true },
      { name: "MongoDB Atlas", hot: true },
      { name: "In-Memory Store" },
      { name: "Aggregation Pipelines" }
    ]
  },
  { 
    id: "ai",
    label: "AI Systems & Tooling", 
    tagline: "Gemini API integrations & developer tools",
    accentColor: "from-amber-500 to-orange-600",
    badgeBg: "bg-amber-500 text-white",
    iconColor: "text-amber-600",
    borderColor: "group-hover:border-amber-400",
    glowColor: "group-hover:shadow-amber-500/20",
    icon: Brain,
    animType: "pulse",
    items: [
      { name: "Google Gemini API", hot: true },
      { name: "Git & GitHub", hot: true },
      { name: "Postman API Suite" },
      { name: "Linux / Bash CLI" },
      { name: "VS Code & Tooling" }
    ]
  },
  { 
    id: "cs",
    label: "Computer Science Core", 
    tagline: "Algorithmic thinking & system fundamentals",
    accentColor: "from-blue-600 to-indigo-700",
    badgeBg: "bg-blue-600 text-white",
    iconColor: "text-blue-600",
    borderColor: "group-hover:border-blue-400",
    glowColor: "group-hover:shadow-blue-500/20",
    icon: Cpu,
    animType: "spin",
    items: [
      { name: "Data Structures", hot: true },
      { name: "Algorithms & Elo", hot: true },
      { name: "OOP Principles" },
      { name: "DBMS & SQL" },
      { name: "Operating Systems" }
    ]
  }
];

export default function Portfolio({ onOpenArena, onOpenLeaderboard, onOpenAnalytics }) {
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax Scroll Tracking for background emojis
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenProject = (project) => {
    if (project.previewType === 'codeclash') {
      onOpenArena?.();
    } else if (project.previewType === 'analytics') {
      onOpenAnalytics?.();
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <div className="min-h-screen bg-[#fed836] text-slate-900 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 font-sans relative overflow-x-hidden">
      
      {/* ============================================================== */}
      {/* INTERACTIVE SCROLL-REACTIVE FLOATING EMOJIS BACKGROUND LAYER */}
      {/* ============================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {FLOATING_EMOJIS.map((item, idx) => {
          const parallaxOffset = scrollY * item.speed;
          return (
            <div
              key={idx}
              className={`absolute ${item.anim} transition-transform duration-100 ease-out opacity-85 hover:opacity-100 cursor-pointer pointer-events-auto filter drop-shadow-md`}
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                transform: `translate3d(0, ${parallaxOffset}px, 0)`
              }}
              title="Interactive floating emoji"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt="Robot Mascot"
                  className={`${item.size} object-contain select-none pointer-events-none drop-shadow-xl hover:scale-110 transition-transform`}
                />
              ) : (
                <span className={item.size}>{item.emoji}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* CANVA-THEMED HERO CARD FRAME (ROYAL BLUE FLOATING WINDOW) */}
      {/* ============================================================== */}
      <div className="max-w-6xl mx-auto rounded-[28px] sm:rounded-[38px] bg-gradient-to-b from-[#2b3ff2] via-[#2f42f5] to-[#2235e0] text-white shadow-2xl shadow-blue-950/30 border-4 border-[#2235e0]/40 overflow-hidden relative z-10">
        
        {/* Subtle decorative glow circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* HERO CONTAINER PADDING */}
        <div className="px-5 sm:px-10 lg:px-14 pt-8 pb-10 sm:pb-12 relative z-10 flex flex-col justify-between min-h-[580px]">
          
          {/* TOP NAV INSIDE THE HERO WINDOW */}
          <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-white/10 gap-3">
            {/* Brand Logo */}
            <div className="flex items-center gap-2.5">
              <span className="font-black text-lg sm:text-2xl tracking-tighter uppercase text-white">
                NISCHAY<span className="text-[#86efac]">.DEV</span>
              </span>
            </div>

            {/* Menu Items */}
            <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-white/90">
              <button 
                onClick={() => {
                  const el = document.getElementById('projects-shelf');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#86efac] transition-colors cursor-pointer"
              >
                Projects
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('skills-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#86efac] transition-colors cursor-pointer hidden sm:block"
              >
                Skills
              </button>
              <button 
                onClick={onOpenArena}
                className="hover:text-[#86efac] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Swords className="w-3.5 h-3.5 text-[#4ade80]" />
                <span>CodeClash</span>
              </button>
              <button 
                onClick={onOpenLeaderboard}
                className="hover:text-[#86efac] transition-colors cursor-pointer hidden md:flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5 text-[#86efac]" />
                <span>Leaderboard</span>
              </button>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-[#86efac] transition-colors hidden md:block"
              >
                Resume
              </a>
              <a 
                href="https://github.com/nischay237"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors hidden sm:block"
                title="GitHub @nischay237"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="mailto:nischaysrivastava2@gmail.com" 
                className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold transition-all"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* CENTER TYPOGRAPHY & HEADLINE (CANVA POSTER STYLE) */}
          <div className="text-center my-6 sm:my-8 max-w-4xl mx-auto">
            {/* Signature Bold Canva Lockup */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-[1.08] text-white">
              WHAT I BUILD <br />
              <span className="font-black text-white">JUST </span>
              <span className="italic font-serif text-[#4ade80] lowercase tracking-normal">
                smarter.
              </span>
            </h1>

            {/* Authentic Human Subtitle */}
            <p className="text-white text-sm sm:text-base max-w-xl mx-auto mt-3 font-bold leading-relaxed">
              Hey, I'm <strong className="text-white font-black">Nischay Srivastava</strong>. I'm a developer who loves building competitive real-time web apps, interactive games, and practical AI tools that feel snappy and solve real problems.
            </p>

            {/* Center Action Button */}
            <div className="mt-6 flex items-center justify-center">
              <button
                onClick={() => {
                  const el = document.getElementById('projects-shelf');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3 rounded-xl bg-white text-[#2235e0] font-black text-xs sm:text-sm tracking-wider uppercase hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 cursor-pointer flex items-center gap-2"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4 text-[#2235e0]" />
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BOTTOM SHELF: VIBRANT COLORED PROJECT CARDS (ORANGE, RED) */}
          {/* ============================================================== */}
          <div id="projects-shelf" className="pt-5 border-t border-white/15">
            <div className="flex items-center justify-between mb-3.5">
              <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-white">
                FEATURED PROJECTS
              </div>
              <span className="text-[11px] text-white/90 font-bold hidden sm:block">
                Hover on any card for details • Click to open
              </span>
            </div>

            {/* 2 VIBRANT COLORED CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {PROJECTS.map((project) => {
                const isHovered = hoveredProjectId === project.id;

                return (
                  <div
                    key={project.id}
                    id={`shelf-card-${project.id}`}
                    onMouseEnter={() => setHoveredProjectId(project.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    onClick={() => handleOpenProject(project)}
                    className="relative group cursor-pointer"
                  >
                    {/* Visual Card Container with its own punchy vibrant background */}
                    <div className={`h-[238px] rounded-2xl bg-gradient-to-b ${project.bgGradient} border-2 ${project.cardBorder} p-3.5 flex flex-col justify-between overflow-hidden shadow-xl ${project.hoverBorder} group-hover:shadow-2xl ${project.hoverGlow} group-hover:-translate-y-1.5 transition-all duration-300 text-white`}>
                      
                      {/* Top card header */}
                      <div className="flex items-center justify-between gap-1">
                        <span className={`font-black text-base tracking-tight ${project.numberColor}`}>
                          {project.number}
                        </span>
                        <span className="text-[10px] font-black tracking-wider uppercase text-white/90">
                          {project.badge}
                        </span>
                      </div>

                      {/* ============================================================== */}
                      {/* 1. CODECLASH: ANIMATED CLASHING SWORDS (ORANGE CARD) */}
                      {/* ============================================================== */}
                      {project.previewType === 'codeclash' && (
                        <div className="my-auto py-1 flex flex-col items-center justify-center text-center">
                          {/* Swords clashing container */}
                          <div className="relative flex items-center justify-center gap-2 w-full py-2.5 bg-black/35 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-inner">
                            
                            {/* Left Clashing Sword */}
                            <div className="animate-sword-left text-yellow-300">
                              <Swords className="w-6 h-6 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
                            </div>

                            {/* Centered Bold CODECLASH Title with Spark */}
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="font-black text-sm tracking-wider uppercase text-white drop-shadow">
                                CODECLASH
                              </div>
                              <span className="text-[9px] font-black tracking-wider text-amber-200 uppercase">
                                1V1 CODE BATTLES
                              </span>
                            </div>

                            {/* Right Clashing Sword */}
                            <div className="animate-sword-right text-yellow-300">
                              <Swords className="w-6 h-6 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
                            </div>

                            {/* Center Clashing Spark */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <Sparkles className="w-5 h-5 text-white animate-spark" />
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 mt-2 text-xs font-black text-amber-100 tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            <span>Live WebSocket Keystrokes</span>
                          </div>
                        </div>
                      )}

                      {/* ============================================================== */}
                      {/* 2. ANALYTICS TRACKER: REAL-TIME FLUCTUATING GRAPHS (RED CARD) */}
                      {/* ============================================================== */}
                      {project.previewType === 'analytics' && (
                        <div className="my-auto py-1 flex flex-col items-center justify-center text-center">
                          <div className="w-full py-2 px-3 bg-black/35 backdrop-blur-sm rounded-xl border border-white/20 shadow-inner flex flex-col items-center">
                            
                            {/* Header with Title */}
                            <div className="flex items-center justify-between w-full mb-1">
                              <span className="font-black text-[11px] tracking-wide uppercase text-white">
                                ANALYTICS TRACKER
                              </span>
                              <span className="text-[10px] text-emerald-300 font-black tracking-wider">
                                ● LIVE
                              </span>
                            </div>

                            {/* Animated Fluctuating Bar Chart */}
                            <div className="flex items-end justify-center gap-1.5 h-10 w-full pt-1 px-4 border-b border-white/20">
                              <div className="w-2.5 bg-white rounded-t animate-bar-1" />
                              <div className="w-2.5 bg-yellow-300 rounded-t animate-bar-2" />
                              <div className="w-2.5 bg-cyan-300 rounded-t animate-bar-3" />
                              <div className="w-2.5 bg-white rounded-t animate-bar-4" />
                              <div className="w-2.5 bg-emerald-300 rounded-t animate-bar-5" />
                            </div>
                          </div>

                          <div className="flex items-center gap-1 mt-2 text-xs font-black text-red-100 tracking-wide">
                            <TrendingUp className="w-3 h-3 text-yellow-300" />
                            <span>Live Visitor Heartbeats</span>
                          </div>
                        </div>
                      )}

                      {/* Card Bottom: Title & Launch Prompt */}
                      <div className="pt-2 border-t border-white/25 flex items-center justify-between text-xs">
                        <h4 className="font-black text-white group-hover:text-yellow-200 transition-colors truncate tracking-tight">
                          {project.shortTitle}
                        </h4>
                        <span className="text-white font-black flex items-center gap-1 group-hover:translate-x-1 group-hover:text-yellow-200 transition-all">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping inline-block" />
                          <span>Live Demo</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                    </div>

                    {/* ============================================================== */}
                    {/* ANIMATED THEMED POPUP HOVER INTRO */}
                    {/* ============================================================== */}
                    {isHovered && (
                      <div className="absolute bottom-full left-0 right-0 mb-3.5 z-40 pointer-events-none">
                        <div className={`relative p-3.5 rounded-2xl bg-gradient-to-b ${project.popupBg} backdrop-blur-xl border-2 ${project.popupBorder} shadow-2xl ${project.popupGlow} text-left animate-popup-spring`}>
                          
                          {/* Top glowing accent line */}
                          <div className={`absolute top-0 left-3 right-3 h-1 rounded-full bg-gradient-to-r ${project.popupAccentGradient}`} />

                          {/* Mini Badge Header */}
                          <div className="flex items-center justify-between mb-2.5 pt-0.5">
                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${project.popupBadgeStyle}`}>
                              {project.popupBadge}
                            </span>
                            <span className={`text-[10px] font-black tracking-wider uppercase ${project.popupNumberColor}`}>
                              3 Highlights
                            </span>
                          </div>

                          {/* 3 Numbered Points */}
                          <div className="space-y-2 text-xs text-white leading-snug font-bold">
                            {project.introLines.map((line, idx) => (
                              <p key={idx} className="flex items-start gap-2">
                                <span className={`font-black ${project.popupNumberColor} shrink-0 text-xs mt-0.5`}>
                                  {idx + 1}.
                                </span>
                                <span className="text-white/95 leading-relaxed">
                                  {line}
                                </span>
                              </p>
                            ))}
                          </div>

                          {/* Bottom Pointer Triangle */}
                          <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 border-r-2 border-b-2 ${project.popupPointerBg}`} />
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* DETAILED PROJECTS ARCHIVE (CANVA POST TEMPLATE FORMAT) */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto mt-16 pt-8 border-t-2 border-slate-900/20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-none">
              Things I've Built & Shipped.
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-950 font-bold max-w-md leading-relaxed">
            Here is a deeper look at the architecture, key decisions, and live codebases for each featured engineering project.
          </p>
        </div>

        {/* 2 Canva Post Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="group relative bg-white rounded-[32px] border-2 border-slate-900/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-slate-950/10 hover:shadow-slate-950/20 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden text-slate-900"
            >
              {/* Canva Signature Top Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r ${project.bgGradient}`} />

              <div>
                {/* Top Row: Clean Category Eyebrow with Dot + Big Bold Number */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-base sm:text-lg font-black leading-none ${project.categoryColor}`}>
                      •
                    </span>
                    <span className={`text-sm sm:text-base font-black tracking-wider uppercase ${project.categoryColor}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Big Bold Number */}
                  <span className="font-black text-4xl sm:text-5xl text-slate-950 tracking-tighter group-hover:text-blue-600 transition-colors">
                    {project.number}
                  </span>
                </div>

                {/* Card Title */}
                <h4 className="text-2xl sm:text-3xl font-black text-slate-950 group-hover:text-blue-600 transition-colors tracking-tight leading-snug mb-2">
                  {project.title}
                </h4>

                {/* Standard Clean Tagline / Subtitle (No Box, Bigger Font) */}
                <p className="text-sm sm:text-base font-extrabold text-slate-950 mb-3.5 leading-snug">
                  {project.tagline}
                </p>

                {/* Description Paragraph (Human, Clean English, Bigger Font) */}
                <p className="text-sm sm:text-base text-slate-900 leading-relaxed mb-5 font-bold">
                  {project.aboutEnglish}
                </p>

                {/* Checklist Highlights (Bigger Font & Icons) */}
                <div className="space-y-2.5 mb-6">
                  {project.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-950 font-extrabold leading-snug">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Clean Tech Stack Typography + Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-sm">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="font-black text-slate-900 flex items-center gap-2">
                      <span>{tech}</span>
                      {idx < project.techStack.length - 1 && (
                        <span className="text-slate-400 font-bold select-none">•</span>
                      )}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-950 transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProject(project);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-sm font-black tracking-wide transition-all flex items-center gap-2 shadow-md shadow-slate-950/20 cursor-pointer group-hover:bg-blue-600"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* TECHNICAL SKILLS SECTION (ANIMATED & HIGHLY INTERACTIVE) */}
      {/* ============================================================== */}
      <section id="skills-section" className="max-w-6xl mx-auto mt-20 pt-8 border-t-2 border-slate-900/20 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 mb-2">
            <Terminal className="w-4 h-4 text-blue-600" />
            <span>CORE TECH STACK & ARCHITECTURE</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Tools & Technologies I Use.
          </h3>
          <p className="text-xs sm:text-sm text-slate-950 font-bold mt-2 max-w-xl mx-auto">
            Hover over tech badges to explore stacks, frameworks, and low-latency protocols I build with.
          </p>
        </div>

        {/* 5 Animated Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((skillGroup) => {
            const IconComponent = skillGroup.icon;

            return (
              <div
                key={skillGroup.id}
                className={`group relative bg-white rounded-[32px] border-2 border-slate-900/10 p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-slate-950/5 hover:shadow-2xl ${skillGroup.glowColor} ${skillGroup.borderColor} hover:-translate-y-2 transition-all duration-300 text-slate-900 overflow-hidden`}
              >
                {/* Top Geometric Accent Bar with Gradient */}
                <div className={`absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r ${skillGroup.accentColor}`} />

                <div>
                  {/* Category Header with Animated Category Icon */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-7 h-7 sm:w-8 sm:h-8 ${skillGroup.iconColor} shrink-0 ${
                        skillGroup.animType === 'spin' ? 'animate-spin-slow' :
                        skillGroup.animType === 'pulse' ? 'animate-pulse' : 'animate-bounce-subtle'
                      }`} />
                      <div>
                        <h4 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-tight">
                          {skillGroup.label}
                        </h4>
                        <span className="text-xs sm:text-sm font-bold text-slate-700 block mt-0.5">
                          {skillGroup.tagline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Professional 2-Column Skills List (No Curved Boxes, Big Bold Font) */}
                  <div className="grid grid-cols-2 gap-y-3.5 gap-x-2.5 mt-4 pt-4 border-t border-slate-200/80">
                    {skillGroup.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm sm:text-base font-black text-slate-950 group/item hover:text-blue-600 transition-colors leading-snug"
                      >
                        <span className="w-2 h-2 rounded-full bg-slate-500 group-hover/item:bg-blue-600 shrink-0 mt-1.5 transition-colors" />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* ABOUT & EDUCATION SECTION (3D ORBS & ANIME SPEED CLASH THEME) */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto mt-20 pt-8 border-t-2 border-slate-900/20 relative z-10">
        
        {/* Masterpiece Showcase Window (Inspired by Image 4 & Image 2) */}
        <div className="relative rounded-[36px] bg-gradient-to-br from-[#1b2ecc] via-[#1a2ec0] to-[#0c1874] text-white p-7 sm:p-12 border-4 border-blue-400/30 shadow-2xl shadow-blue-950/40 overflow-hidden">
          
          {/* Floating 3D Golden Orbs (Directly inspired by Image 4!) */}
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full sphere-3d-gold animate-orb-1 pointer-events-none opacity-90 z-0" />
          <div className="absolute bottom-4 -left-8 w-20 h-20 rounded-full sphere-3d-gold animate-orb-2 pointer-events-none opacity-85 z-0" />
          <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full sphere-3d-cyan animate-orb-2 pointer-events-none opacity-75 z-0 hidden lg:block" />

          {/* Background curved organic ribbons (Image 4 style) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 z-0">
            <div className="absolute -top-24 left-1/3 w-[600px] h-[300px] rounded-full border-[18px] border-blue-300/30 blur-sm transform -rotate-12" />
            <div className="absolute -bottom-24 right-10 w-[500px] h-[250px] rounded-full border-[14px] border-amber-300/20 blur-sm transform rotate-6" />
          </div>

          {/* Content Container (relative z-10) */}
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">
            
            {/* Left: Avatar with Orbital Tech Rings + Live Status */}
            <div className="flex flex-col items-center shrink-0">
              
              {/* Orbital Rings Avatar Container */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
                
                {/* Outer dashed spinning ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#4ade80]/60 animate-spin-slow" />
                
                {/* Middle counter-spinning ring */}
                <div className="absolute inset-2 rounded-full border border-cyan-400/40 animate-spin-reverse-slow" />
                
                {/* Inner Glowing Monogram Orb */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 border-2 border-white/40 flex items-center justify-center shadow-2xl shadow-emerald-400/20 group">
                  <span className="font-black text-3xl sm:text-4xl text-white tracking-tighter drop-shadow-md">
                    NS
                  </span>
                </div>

                {/* Floating animated sparkles */}
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                </div>
              </div>

            </div>

            {/* Center / Right: Bio, Metrics & Contact Buttons */}
            <div className="flex-1 text-center lg:text-left">
              
              {/* Top Eyebrow */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-3 text-xs font-black tracking-widest uppercase">
                <span className="text-yellow-300">About The Developer</span>
                <span className="text-white/40">•</span>
                <span className="text-[#86efac]">CS Pre-Final Year (AKTU)</span>
              </div>

              <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
                Nischay Srivastava
              </h4>

              <p className="text-white text-xs sm:text-sm sm:text-base leading-relaxed max-w-2xl font-bold mb-6">
                I'm a Computer Science undergraduate at <strong className="font-black text-yellow-300">Feroze Gandhi Institute of Engineering and Technology (AKTU)</strong>. I love turning complex algorithmic challenges into fast, interactive real-time products. Whether it's crafting 1v1 WebSocket battle arenas, multimodal Gemini developer tools, or responsive web platforms, I'm passionate about building software that feels polished and snappy.
              </p>

              {/* 4 Interactive Feature Highlights (Esports & High-Energy) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-center hover:bg-white/20 hover:scale-105 transition-all">
                  <div className="h-6 flex items-center justify-center">
                    <Swords className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div className="text-xs font-black text-white mt-1">CodeClash</div>
                  <div className="text-[10px] font-bold text-white/90">1v1 PvP Arena</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-center hover:bg-white/20 hover:scale-105 transition-all">
                  <div className="h-6 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div className="text-xs font-black text-white mt-1">WebSockets</div>
                  <div className="text-[10px] font-bold text-white/90">Zero-Lag Sync</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-center hover:bg-white/20 hover:scale-105 transition-all">
                  <div className="h-6 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div className="text-xs font-black text-white mt-1">Gemini AI</div>
                  <div className="text-[10px] font-bold text-white/90">Multimodal Tools</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-center hover:bg-white/20 hover:scale-105 transition-all">
                  <div className="h-6 flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div className="text-xs font-black text-white mt-1">B.Tech CSE</div>
                  <div className="text-[10px] font-bold text-white/90">2023 – Present</div>
                </div>
              </div>

              {/* Contact Links & CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href="mailto:nischaysrivastava2@gmail.com"
                  className="px-5 py-2.5 rounded-xl bg-white text-[#1d4ed8] hover:bg-yellow-300 hover:text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-black/20 flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Say Hello / Email</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-yellow-300" />
                  <span>View Resume</span>
                </a>

                <a
                  href="https://github.com/nischay237"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white transition-all"
                  title="GitHub @nischay237"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <MapPin className="w-3.5 h-3.5 text-[#4ade80]" />
                  <span>Raebareli, UP, India</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ============================================================== */}
      {/* POPUP MODAL FOR NON-CODECLASH PROJECTS */}
      {/* ============================================================== */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#090d1c] border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-white">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#4ade80]">
                PROJECT {selectedProject.id} • {selectedProject.category}
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-yellow-300 font-bold mt-1">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedProject.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-black px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[#4ade80]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Hindi Overview */}
            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#4ade80] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Project Overview (Quick Summary)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-100 font-bold leading-relaxed">
                {selectedProject.aboutHindi}
              </p>
            </div>

            {/* English In-Depth Description */}
            <div className="mb-6">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-2">
                What Was Built
              </h4>
              <p className="text-xs sm:text-sm text-slate-100 font-bold leading-relaxed mb-4">
                {selectedProject.aboutEnglish}
              </p>

              <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-2">
                Key Technical Details
              </h4>
              <div className="space-y-2">
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-100 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  const proj = selectedProject;
                  setSelectedProject(null);
                  handleOpenProject(proj);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition-colors flex items-center gap-2 text-xs shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Live Demo ↗</span>
              </button>

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 transition-colors flex items-center gap-2 text-xs font-black"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View GitHub Repo ↗</span>
                </a>
              )}

              {selectedProject.driveUrl && (
                <a
                  href={selectedProject.driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#2b3ff2] hover:bg-blue-600 text-white transition-colors flex items-center gap-2 text-xs font-black shadow-md shadow-blue-600/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Demo & Artifacts ↗</span>
                </a>
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
