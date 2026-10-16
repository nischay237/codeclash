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
          
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-rose-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-rose-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                <span>CausalFunnel Telemetry Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Real-Time Visitor Purchase Signals & Conversion Tunnels
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-bold mt-1">
                Monitors page_view, click coordinates, add-to-cart events, and cart abandonment with lightweight client tracker under 3KB.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-black/40 p-4 rounded-2xl border border-rose-500/20 shrink-0">
              <div className="text-center">
                <span className="text-3xl font-black text-white">{activeVisitors}</span>
                <div className="text-[10px] font-black text-emerald-400 uppercase">● Live Visitors</div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center">
                <span className="text-3xl font-black text-yellow-300">14ms</span>
                <div className="text-[10px] font-black text-slate-400 uppercase">Socket Pulse</div>
              </div>
            </div>
          </div>

          {/* 4 Financial KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Total Sales (Revenue)</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">${totalRevenue.toLocaleString()}</h3>
                <p className="text-[11px] text-emerald-400 font-bold mt-0.5">Live payments decrypted</p>
              </div>
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Average Order Value (AOV)</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">${aovValue.toFixed(2)}</h3>
                <p className="text-[11px] text-slate-400 font-bold mt-0.5">Simulated ticket averages</p>
              </div>
              <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
                <ShoppingCart className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Cart Abandonment</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{cartAbandonmentRate}%</h3>
                <p className="text-[11px] text-rose-400 font-bold mt-0.5">Dropped carts before checkout</p>
              </div>
              <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl">
                <Percent className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Conversion Rate</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{conversionRate}%</h3>
                <p className="text-[11px] text-slate-400 font-bold mt-0.5">Visitor to checkout ratio</p>
              </div>
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                <Target className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Funnel & Traffic Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Checkout Funnel Analysis */}
            <div className="lg:col-span-2 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-rose-400" />
                  <span>Checkout Funnel Drop-off Analysis</span>
                </h3>
                <p className="text-xs text-slate-400 font-bold">
                  Identifies friction points where store visitors abandon before purchasing
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { step: "1. Product Views", count: "12,480 Users", pct: 100, color: "bg-indigo-500" },
                  { step: "2. Added to Cart", count: "3,890 Users", pct: 31.2, color: "bg-purple-500" },
                  { step: "3. Checkout Started", count: "1,450 Users", pct: 11.6, color: "bg-rose-500" },
                  { step: "4. Orders Completed", count: "524 Sales", pct: 4.2, color: "bg-emerald-500" }
                ].map((row, i) => (
                  <div key={i} className="space-y-1 text-xs font-bold">
                    <div className="flex justify-between text-slate-300">
                      <span>{row.step}</span>
                      <span className="font-mono text-white">{row.count} ({row.pct}%)</span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${row.color} rounded-full transition-all duration-700`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Distribution */}
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span>Terminal Distribution</span>
                </h3>
                <p className="text-xs text-slate-400 font-bold">Shopper browser viewports</p>
              </div>

              {/* Visual Ring */}
              <div className="my-6 flex items-center justify-center">
                <div className="relative w-36 h-36 rounded-full border-8 border-indigo-500 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl font-black text-white">68%</span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Desktop</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold uppercase">
                <div className="p-2 bg-slate-800/80 rounded-xl">
                  <span className="text-indigo-400 block font-black text-xs">68%</span>
                  <span className="text-slate-400">Desktop</span>
                </div>
                <div className="p-2 bg-slate-800/80 rounded-xl">
                  <span className="text-emerald-400 block font-black text-xs">24%</span>
                  <span className="text-slate-400">Mobile</span>
                </div>
                <div className="p-2 bg-slate-800/80 rounded-xl">
                  <span className="text-amber-400 block font-black text-xs">8%</span>
                  <span className="text-slate-400">Tablet</span>
                </div>
              </div>
            </div>

          </div>

          {/* Weekly Summary & Searched Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Weekly Performance Breakdown */}
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Weekly Store Performance Summary</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {WEEKLY_SUMMARY.map((w, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
                    <div className="text-indigo-300 font-black">{w.week}</div>
                    <div className="grid grid-cols-2 gap-1 text-[11px] font-bold text-slate-400">
                      <div>Users: <span className="text-white">{w.sessionsCount}</span></div>
                      <div>Clicks: <span className="text-white">{w.interactions}</span></div>
                      <div>Orders: <span className="text-white">{w.orders}</span></div>
                      <div>Sales: <span className="text-emerald-400">${w.revenue}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Searched Keywords */}
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-rose-400" />
                  <span>Internal Search Query Trends</span>
                </h3>
                <span className="text-[10px] font-black text-slate-400 uppercase">Live Aggregated</span>
              </div>

              <div className="space-y-2">
                {SEARCHED_KEYWORDS.map((k, idx) => (
                  <div key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-200 font-mono">"{k.text}"</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-black">
                      {k.count} queries
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Embed Snippet */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-white uppercase tracking-wide">
                Embed Lightweight Tracking Snippet (&lt; 3KB)
              </span>
              <button
                onClick={handleCopySnippet}
                className="text-xs font-black text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedSnippet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet ? 'Copied to Clipboard!' : 'Copy Script Tag'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-2xl bg-black/60 text-slate-300 font-mono text-xs overflow-x-auto border border-slate-800">
              {trackingCodeSnippet}
            </pre>
          </div>

        </main>
      )}

      {/* ============================================================== */}
      {/* TAB 2: VISUAL CLICK HEATMAP SCANNER */}
      {/* ============================================================== */}
      {activeTab === 'heatmap' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
