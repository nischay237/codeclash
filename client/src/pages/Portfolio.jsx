import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Swords, 
  Bot, 
  BarChart3, 
  ShoppingBag, 
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
  Truck,
  Factory,
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
  },
  {
    id: 3,
    number: "3.",
    title: "B2B Merchant Procurement Platform",
    shortTitle: "B2B Procurement",
    tagline: "Direct-from-factory wholesale inventory for local retailers",
    category: "MERN Stack / B2B",
    categoryColor: "text-purple-600",
    badge: "LIVE PORTAL",
    colorName: "purple",
    bgGradient: "from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9]",
    cardBorder: "border-purple-300/40",
    hoverBorder: "group-hover:border-white",
    hoverGlow: "group-hover:shadow-purple-500/40",
    numberColor: "text-purple-100",
    badgeBg: "bg-white/20 text-white border-white/30",
    accentColor: "#8b5cf6",
    previewType: "b2b",
    popupBg: "from-[#1a0733]/95 via-[#110423]/95 to-[#0b0217]/95",
    popupBorder: "border-purple-400",
    popupGlow: "shadow-purple-500/50",
    popupAccentGradient: "from-purple-400 via-violet-300 to-fuchsia-300",
    popupBadge: "B2B Kirana Platform",
    popupBadgeStyle: "bg-purple-500/20 text-purple-200 border-purple-400/50",
    popupNumberColor: "text-purple-300",
    popupPointerBg: "bg-[#0d031a] border-purple-400",
    introLines: [
      "Direct wholesale procurement platform designed for local retail and kirana stores.",
      "Bypasses intermediate distributor layers to connect shopkeepers directly to factories.",
      "Delivers 15–20% higher profit margins with automated quotation and freight workflows."
    ],
    aboutHindi: "Direct wholesale procurement platform designed for local retail and kirana stores. Bypasses intermediate distributor layers to connect shopkeepers directly to factories. Delivers 15–20% higher profit margins with automated quotation and freight workflows.",
    aboutEnglish: "A wholesale procurement platform enabling retail shopkeepers (Kirana, Apparel, Hardware) to source goods directly from verified manufacturers, eliminating middleman markups with automated quotation workflows.",
    highlights: [
      "Cuts out middleman layers to save 15-20% on retail inventory purchases",
      "Dynamic freight & landed-cost calculator based on volume and pin codes",
      "Clear milestone delivery pipeline with simple digital quotation requests",
      "Full-stack MERN implementation with secure JWT authentication"
    ],
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "JWT Auth"],
    githubUrl: "https://github.com/nischay237/b2b-merchant-procurement-platform",
    driveUrl: "https://drive.google.com/drive/folders/1Xp__iFKqgaqY-5nIV3XXDM6GuyiH7y17?usp=sharing",
    isLiveApp: true,
    launchLabel: "Launch Live Portal"
  },
  {
    id: 4,
    number: "4.",
    title: "DSA AI Instructor — Interactive Algorithm Mentor",
    shortTitle: "DSA AI Instructor",
    tagline: "Step-by-step visual code dry-runs powered by Gemini",
    category: "AI & Education",
    categoryColor: "text-emerald-600",
    badge: "LIVE AI MENTOR",
    colorName: "green",
    bgGradient: "from-[#10b981] via-[#059669] to-[#047857]",
    cardBorder: "border-emerald-300/40",
    hoverBorder: "group-hover:border-white",
    hoverGlow: "group-hover:shadow-emerald-500/40",
    numberColor: "text-emerald-100",
    badgeBg: "bg-white/20 text-white border-white/30",
    accentColor: "#10b981",
    previewType: "ai",
    popupBg: "from-[#031d14]/95 via-[#02130d]/95 to-[#010c08]/95",
    popupBorder: "border-emerald-400",
    popupGlow: "shadow-emerald-500/50",
    popupAccentGradient: "from-emerald-400 via-teal-300 to-cyan-300",
    popupBadge: "Gemini AI Mentor",
    popupBadgeStyle: "bg-emerald-500/20 text-emerald-200 border-emerald-400/50",
    popupNumberColor: "text-emerald-300",
    popupPointerBg: "bg-[#02110c] border-emerald-400",
    introLines: [
      "Interactive algorithm tutor powered by Google Gemini to master tough DSA concepts.",
      "Guides with progressive Socratic hints and intuition building instead of spoiling answers.",
      "Visual line-by-line dry-runs of recursion trees, pointers, and memory state changes."
    ],
    aboutHindi: "Interactive algorithm tutor powered by Google Gemini to master tough DSA concepts. Guides with progressive Socratic hints and intuition building instead of spoiling answers. Visual line-by-line dry-runs of recursion trees, pointers, and memory state changes.",
    aboutEnglish: "An interactive algorithm mentor built with Google Gemini. Instead of just dumping solutions, it asks guiding questions, gives progressive hints, and visually dry-runs recursion trees and loops line by line.",
    highlights: [
      "Multimodal input: accepts handwritten code snippets and whiteboard diagrams",
      "Visual step-by-step execution walkthrough with custom test inputs",
      "Socratic progressive hints that teach problem-solving intuition",
      "Futuristic lightweight UI with zero external runtime dependencies"
    ],
    techStack: ["Gemini API", "JavaScript (ES6+)", "Glassmorphic CSS", "HTML5", "LocalStorage"],
    githubUrl: "https://github.com/nischay237/DSA-AI-INSTRUCTOR",
    driveUrl: "https://drive.google.com/drive/folders/1ID3t-IX57I6kGOGFmYmDU0UzRG169Gn9?usp=sharing",
    isLiveApp: true,
    launchLabel: "Launch Live AI Mentor"
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

export default function Portfolio({ onOpenArena, onOpenLeaderboard, onOpenAnalytics, onOpenB2B, onOpenAI }) {
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
    } else if (project.previewType === 'b2b') {
      onOpenB2B?.();
    } else if (project.previewType === 'ai') {
      onOpenAI?.();
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
          {/* BOTTOM SHELF: VIBRANT COLORED PROJECT CARDS (ORANGE, GREEN, RED, PURPLE) */}
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

            {/* 4 VIBRANT COLORED CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
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
                      {/* 2. DSA AI INSTRUCTOR: ANIMATED AI & SCANNER WAVES (GREEN CARD) */}
                      {/* ============================================================== */}
                      {project.previewType === 'ai' && (
                        <div className="my-auto py-1 flex flex-col items-center justify-center text-center">
                          <div className="relative w-full py-2.5 px-3 bg-black/35 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-inner flex flex-col items-center">
                            
                            {/* AI Bot Icon with glowing pulse ring */}
                            <div className="relative mb-1">
                              <div className="absolute inset-0 rounded-full bg-white/20 animate-ai-ring" />
                              <Bot className="w-7 h-7 text-emerald-100 relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
