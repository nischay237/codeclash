import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Activity, 
  Users, 
  Globe, 
  Clock, 
  Zap, 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  Copy, 
  Flame, 
  ShieldCheck, 
  TrendingUp,
  Server,
  DollarSign,
  ShoppingCart,
  Percent,
  Target,
  Calendar,
  Monitor,
  Search,
  Sparkles,
  MousePointer,
  Compass,
  Layers,
  Bot,
  SlidersHorizontal,
  Eye,
  BookOpen
} from 'lucide-react';

// ==============================================================
// REAL CAUSALFUNNEL MOCK ANALYTICS DATA (USER'S ORIGINAL DATA ENGINE)
// ==============================================================
const INITIAL_SESSIONS = [
  { sessionId: 'sess-1725890400-a1', totalEvents: 14, lastSeen: '2026-11-16T18:40:00Z', device: 'Desktop', page: '/demo-page/index.html', completedOrder: true, revenue: 149.99 },
  { sessionId: 'sess-1725894000-b2', totalEvents: 8, lastSeen: '2026-11-16T18:45:00Z', device: 'Mobile', page: '/demo-page/index.html#product-1', completedOrder: false, revenue: 0 },
  { sessionId: 'sess-1725897600-c3', totalEvents: 22, lastSeen: '2026-11-16T18:50:00Z', device: 'Desktop', page: '/demo-page/index.html', completedOrder: true, revenue: 289.50 },
  { sessionId: 'sess-1725901200-d4', totalEvents: 4, lastSeen: '2026-11-16T18:52:00Z', device: 'Tablet', page: '/demo-page/index.html?search=headphones', completedOrder: false, revenue: 0 },
  { sessionId: 'sess-1725904800-e5', totalEvents: 19, lastSeen: '2026-11-16T18:55:00Z', device: 'Desktop', page: '/demo-page/index.html#product-3', completedOrder: true, revenue: 199.00 },
  { sessionId: 'sess-1725908400-f6', totalEvents: 11, lastSeen: '2026-11-16T18:58:00Z', device: 'Mobile', page: '/demo-page/index.html', completedOrder: false, revenue: 0 }
];

const SEARCHED_KEYWORDS = [
  { text: "apex anc headphones", count: 84 },
  { text: "tactile keyboard 75%", count: 62 },
  { text: "ultrawide curved monitor", count: 48 },
  { text: "horizon smart watch", count: 39 },
  { text: "precision gaming mouse", count: 27 }
];

const HEATMAP_CLICKS = [
  { x: 28, y: 35, count: 42, label: "Hero CTA Button" },
  { x: 74, y: 18, count: 68, label: "Search Bar" },
  { x: 22, y: 55, count: 54, label: "Product 1 (Headphones)" },
  { x: 50, y: 55, count: 38, label: "Product 2 (Watch)" },
  { x: 78, y: 55, count: 61, label: "Product 3 (Keyboard)" },
  { x: 82, y: 88, count: 79, label: "Checkout Button" }
];

const WEEKLY_SUMMARY = [
  { week: "Week of Oct 21", sessionsCount: 1420, interactions: 8490, orders: 124, revenue: 18450 },
  { week: "Week of Oct 28", sessionsCount: 1890, interactions: 11200, orders: 182, revenue: 26800 },
  { week: "Week of Nov 4", sessionsCount: 2240, interactions: 14890, orders: 219, revenue: 34120 },
  { week: "Week of Nov 11", sessionsCount: 2680, interactions: 18240, orders: 278, revenue: 42680 }
];

export default function AnalyticsDashboard({ onExit }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'heatmap', 'sessions', 'ai'
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [activeVisitors, setActiveVisitors] = useState(148);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  
  // Heatmap Controls
  const [spotSize, setSpotSize] = useState(48);
  const [opacity, setOpacity] = useState(0.65);
  const [selectedHeatPage, setSelectedHeatPage] = useState("demo-page/index.html");

  // Selected session for Journey modal
  const [selectedSession, setSelectedSession] = useState(null);

  // Live fluctuating telemetry pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVisitors((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(120, Math.min(200, prev + delta));
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const totalRevenue = sessions.reduce((acc, s) => acc + (s.revenue || 0), 0) + 122480;
  const totalOrders = sessions.filter(s => s.completedOrder).length + 840;
  const aovValue = Math.round(totalRevenue / totalOrders);
  const conversionRate = 4.2;
  const cartAbandonmentRate = 34.6;

  const trackingCodeSnippet = `<script 
  defer 
  data-domain="nischaysrivastava.com" 
  src="https://analytics-tracker-backend.onrender.com/tracker.js">
</script>`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(trackingCodeSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans pb-16">
      
      {/* ============================================================== */}
      {/* TOP STICKY NAVIGATION BAR */}
      {/* ============================================================== */}
      <div className="sticky top-0 z-50 bg-[#0d1124] text-white px-4 sm:px-8 py-3 flex items-center justify-between border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black transition-all cursor-pointer border border-slate-700 hover:border-slate-500"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Return to Portfolio</span>
          </button>
          
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-black tracking-wider uppercase text-white hidden sm:inline">
              CausalFunnel Analytics Tracker & Dashboard Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://analytics-tracker-frontend.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-lg shadow-teal-900/30"
          >
            <span>Launch Vercel App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/nischay237/analytics-tracker"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-lg shadow-rose-900/30"
          >
            <span>GitHub Repo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECONDARY NAVIGATION TABS (DASHBOARD, HEATMAP, SESSIONS, AI) */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Full Analytics Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('heatmap')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'heatmap'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4 text-yellow-300" />
              <span>Visual Click Heatmap</span>
            </button>

            <button
              onClick={() => setActiveTab('sessions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'sessions'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>User Session Journeys</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400">Live Backend API:</span>
            <a
              href="https://analytics-tracker-backend.onrender.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono font-bold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>onrender.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: FULL E-COMMERCE ANALYTICS DASHBOARD */}
      {/* ============================================================== */}
      {activeTab === 'dashboard' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
          
