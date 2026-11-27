import React, { useState, useEffect, Component } from 'react';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import Portfolio from './pages/Portfolio';
import LandingLobby from './pages/LandingLobby';
import BattleArena from './pages/BattleArena';
import Leaderboard from './pages/Leaderboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

const EXTERNAL_FORGE_URL = (
  import.meta.env.VITE_FORGE_URL || 'https://nischay-portfolio.onrender.com/forge'
).replace(/\/$/, '');

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CodeClash ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
            <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h2>
            <p className="text-xs text-slate-400 mb-4">{this.state.error?.message || 'Unexpected application error'}</p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const VIEW_PATH_MAP = {
  portfolio: '/',
  analytics: '/analytics',
  lobby: '/arena',
  battle: '/battle',
  leaderboard: '/leaderboard'
};

const PATH_VIEW_MAP = {
  '/': 'portfolio',
  '/analytics': 'analytics',
  '/arena': 'lobby',
  '/lobby': 'lobby',
  '/battle': 'battle',
  '/leaderboard': 'leaderboard'
};

function openExternalForge() {
  if (typeof window !== 'undefined') {
    window.location.assign(EXTERNAL_FORGE_URL);
  }
}

function getInitialView() {
  if (typeof window === 'undefined') return 'portfolio';
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  return PATH_VIEW_MAP[pathname] || 'portfolio';
}

function AppContent() {
  const [currentView, setCurrentViewState] = useState(getInitialView);
  const [currentMatch, setCurrentMatch] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (pathname === '/forge') {
      window.location.replace(EXTERNAL_FORGE_URL);
    }
  }, []);

  // Synchronize URL and state with browser History API so URLs stay permanently live & shareable
  const setCurrentView = (view, replace = false) => {
    setCurrentViewState(view);
    if (typeof window !== 'undefined') {
      const targetPath = VIEW_PATH_MAP[view] || '/';
      if (window.location.pathname !== targetPath) {
        if (replace) {
          window.history.replaceState({ view }, '', targetPath);
        } else {
          window.history.pushState({ view }, '', targetPath);
        }
      }
    }
  };

  // Browser back/forward navigation support
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      const targetView = PATH_VIEW_MAP[pathname] || 'portfolio';
      setCurrentViewState(targetView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 24/7 Client-side pre-warm & periodic keep-alive
  useEffect(() => {
    // Initial warmup ping immediately upon visitor arrival
    fetch('/api/health').catch(() => {});

    // Periodic heartbeat every 4 minutes while browser tab is open
    const pingTimer = setInterval(() => {
      fetch('/api/health').catch(() => {});
    }, 240000);

    return () => clearInterval(pingTimer);
  }, []);

  const handleStartMatch = (matchData) => {
    setCurrentMatch(matchData);
    setCurrentView('battle');
  };

  const handleExitArena = () => {
    setCurrentMatch(null);
    setCurrentView('lobby');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${currentView === 'portfolio' ? 'bg-white text-[#111111]' : 'bg-[#06080e] text-slate-100'}`}>
      {/* Show top arena navbar only when playing CodeClash or on leaderboard */}
      {['lobby', 'battle', 'leaderboard'].includes(currentView) && (
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      )}

      <main className="flex-1">
        {currentView === 'portfolio' ? (
          <Portfolio 
            onOpenArena={() => setCurrentView('lobby')} 
            onOpenLeaderboard={() => setCurrentView('leaderboard')}
            onOpenAnalytics={() => setCurrentView('analytics')}
            onOpenForge={openExternalForge}
          />
        ) : currentView === 'analytics' ? (
          <AnalyticsDashboard onExit={() => setCurrentView('portfolio')} />
        ) : currentView === 'battle' && currentMatch ? (
          <BattleArena
            matchData={currentMatch}
            onExitArena={handleExitArena}
          />
        ) : currentView === 'leaderboard' ? (
          <Leaderboard />
        ) : (
          <div className="relative">
            {/* Quick banner to switch back to Portfolio from inside CodeClash */}
            <div className="bg-emerald-950/40 border-b border-emerald-500/20 py-2.5 px-4 text-center text-xs text-slate-300 flex items-center justify-center gap-3">
              <span>⚔️ <strong>CodeClash 1v1 Battle Arena</strong> is Active.</span>
              <button
                onClick={() => setCurrentView('portfolio')}
                className="underline text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
              >
                ← Return to Nischay's Portfolio
              </button>
            </div>
            <LandingLobby onStartMatch={handleStartMatch} />
          </div>
        )}
      </main>

      {/* Footer */}
      {currentView === 'portfolio' ? (
        <footer className="border-t border-stone-200 bg-[#141413] text-stone-300 py-12 px-5 sm:px-8 font-bold">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-md bg-[#F5C542] text-[#141413] text-xs font-extrabold flex items-center justify-center">
                  NS
                </span>
                <span
                  className="text-xl text-white font-bold"
                  style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                >
                  Nischay Srivastava
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                B.Tech CSE undergraduate (FGIET, AKTU) building production-style Java 21 + Spring Boot &amp; Kafka platforms, real-time WebSocket arenas, and full-stack web tools.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[11px] text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to SWE, Backend &amp; Full-Stack Roles
              </div>
            </div>

            <div className="md:col-span-3 space-y-2.5 text-xs">
              <div className="text-[11px] uppercase tracking-wider text-stone-400">Live Projects</div>
              <div className="flex flex-col gap-2">
                <button onClick={openExternalForge} className="text-left text-white hover:text-[#F5C542] transition-colors cursor-pointer">
                  01. FORGE AI Platform ↗
                </button>
                <button onClick={() => setCurrentView('lobby')} className="text-left text-white hover:text-[#F5C542] transition-colors cursor-pointer">
                  02. CodeClash 1v1 Arena ↗
                </button>
                <button onClick={() => setCurrentView('leaderboard')} className="text-left text-white hover:text-[#F5C542] transition-colors cursor-pointer">
                  03. Global Elo Leaderboard ↗
                </button>
                <button onClick={() => setCurrentView('analytics')} className="text-left text-white hover:text-[#F5C542] transition-colors cursor-pointer">
                  04. Real-Time Analytics ↗
                </button>
              </div>
            </div>

            <div className="md:col-span-4 space-y-2.5 text-xs">
              <div className="text-[11px] uppercase tracking-wider text-stone-400">GitHub &amp; Contact</div>
              <div className="flex flex-col gap-2">
                <a href="https://github.com/nischay237" target="_blank" rel="noreferrer" className="text-white hover:text-[#F5C542] transition-colors">
                  GitHub Profile — github.com/nischay237 ↗
                </a>
                <a href="https://github.com/nischay237/forge-ai-platform" target="_blank" rel="noreferrer" className="text-stone-300 hover:text-white transition-colors">
                  Repo: forge-ai-platform ↗
                </a>
                <a href="https://github.com/nischay237/codeclash" target="_blank" rel="noreferrer" className="text-stone-300 hover:text-white transition-colors">
                  Repo: codeclash ↗
                </a>
                <a href="https://github.com/nischay237/analytics-tracker" target="_blank" rel="noreferrer" className="text-stone-300 hover:text-white transition-colors">
                  Repo: analytics-tracker ↗
                </a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="text-[#F5C542] hover:underline">
                  Download / View Resume PDF ↗
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-[1240px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
            <span>© {new Date().getFullYear()} Nischay Srivastava · Raebareli, India</span>
            <a href="mailto:nischaysrivastava2@gmail.com" className="text-stone-200 hover:text-[#F5C542] transition-colors">
              nischaysrivastava2@gmail.com
            </a>
          </div>
        </footer>
      ) : (
        <footer
          className="py-8 px-5 sm:px-8 text-[13px] font-bold border-t border-slate-900 bg-[#04060a] text-slate-400"
        >
          <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-white">
                Nischay Srivastava
              </span>
              <span className="opacity-45">·</span>
              <span className="text-xs font-bold">Built with care in India</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-bold">
              <button
                onClick={openExternalForge}
                className="transition-colors cursor-pointer hover:text-emerald-400"
              >
                Forge AI ↗
              </button>
              <button
                onClick={() => setCurrentView('lobby')}
                className="transition-colors cursor-pointer hover:text-emerald-400"
              >
                CodeClash
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                className="transition-colors cursor-pointer hover:text-emerald-400"
              >
                Analytics
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-emerald-400"
              >
                Resume ↗
              </a>
              <a
                href="https://github.com/nischay237"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-emerald-400"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <AppContent />
        </SocketProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
