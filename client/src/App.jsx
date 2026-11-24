import React, { useState, useEffect, Component } from 'react';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import Portfolio from './pages/Portfolio';
import LandingLobby from './pages/LandingLobby';
import BattleArena from './pages/BattleArena';
import Leaderboard from './pages/Leaderboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import ForgePlatformDemo from './pages/ForgePlatformDemo';

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
  forge: '/forge',
  lobby: '/arena',
  battle: '/battle',
  leaderboard: '/leaderboard'
};

const PATH_VIEW_MAP = {
  '/': 'portfolio',
  '/analytics': 'analytics',
  '/forge': 'forge',
  '/arena': 'lobby',
  '/lobby': 'lobby',
  '/battle': 'battle',
  '/leaderboard': 'leaderboard'
};

function getInitialView() {
  if (typeof window === 'undefined') return 'portfolio';
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  return PATH_VIEW_MAP[pathname] || 'portfolio';
}

function AppContent() {
  const [currentView, setCurrentViewState] = useState(getInitialView);
  const [currentMatch, setCurrentMatch] = useState(null);

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
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${currentView === 'portfolio' || currentView === 'forge' ? 'bg-white text-[#111111]' : 'bg-[#06080e] text-slate-100'}`}>
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
            onOpenForge={() => setCurrentView('forge')}
          />
        ) : currentView === 'analytics' ? (
          <AnalyticsDashboard onExit={() => setCurrentView('portfolio')} />
        ) : currentView === 'forge' ? (
          <ForgePlatformDemo onExit={() => setCurrentView('portfolio')} />
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
      <footer
        className={`py-8 px-5 sm:px-8 text-[13px] font-bold ${
          currentView === 'portfolio'
            ? 'border-t border-stone-200/90 bg-[#F9F8F5] text-stone-700'
            : currentView === 'forge'
            ? 'border-t border-stone-200 bg-[#FAFAF8] text-stone-600'
            : 'border-t border-slate-900 bg-[#04060a] text-slate-400'
        }`}
      >
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span
              className={`font-bold ${currentView === 'portfolio' || currentView === 'forge' ? 'text-[#141413]' : 'text-white'}`}
              style={currentView === 'portfolio' ? { fontFamily: "'Newsreader', Georgia, serif", fontSize: '17px' } : undefined}
            >
              Nischay Srivastava
            </span>
            <span className="opacity-45">·</span>
            <span className="text-xs font-bold">Built with care in India</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-bold">
            <button
              onClick={() => setCurrentView('forge')}
              className={`transition-colors cursor-pointer ${currentView === 'portfolio' || currentView === 'forge' ? 'hover:text-[#141413]' : 'hover:text-emerald-400'}`}
            >
              Forge AI
            </button>
            <button
              onClick={() => setCurrentView('lobby')}
              className={`transition-colors cursor-pointer ${currentView === 'portfolio' || currentView === 'forge' ? 'hover:text-[#141413]' : 'hover:text-emerald-400'}`}
            >
              CodeClash
            </button>
            <button
              onClick={() => setCurrentView('analytics')}
              className={`transition-colors cursor-pointer ${currentView === 'portfolio' || currentView === 'forge' ? 'hover:text-[#141413]' : 'hover:text-emerald-400'}`}
            >
              Analytics
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={`transition-colors ${currentView === 'portfolio' || currentView === 'forge' ? 'hover:text-[#141413]' : 'hover:text-emerald-400'}`}
            >
              Resume ↗
            </a>
            <a
              href="https://github.com/nischay237"
              target="_blank"
              rel="noreferrer"
              className={`transition-colors ${currentView === 'portfolio' || currentView === 'forge' ? 'hover:text-[#141413]' : 'hover:text-emerald-400'}`}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </footer>
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
