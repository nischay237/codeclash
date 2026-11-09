import React, { useState, useEffect, Component } from 'react';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import Portfolio from './pages/Portfolio';
import LandingLobby from './pages/LandingLobby';
import BattleArena from './pages/BattleArena';
import Leaderboard from './pages/Leaderboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import B2BProcurementPortal from './pages/B2BProcurementPortal';
import DSAAIInstructor from './pages/DSAAIInstructor';

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
  b2b: '/b2b',
  ai: '/ai',
  lobby: '/arena',
  battle: '/battle',
  leaderboard: '/leaderboard'
};

const PATH_VIEW_MAP = {
  '/': 'portfolio',
  '/analytics': 'analytics',
  '/b2b': 'b2b',
  '/ai': 'ai',
  '/dsa-ai': 'ai',
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
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${currentView === 'portfolio' ? 'bg-[#fed836]' : 'bg-[#06080e] text-slate-100'}`}>
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
            onOpenB2B={() => setCurrentView('b2b')}
            onOpenAI={() => setCurrentView('ai')}
          />
        ) : currentView === 'analytics' ? (
          <AnalyticsDashboard onExit={() => setCurrentView('portfolio')} />
        ) : currentView === 'b2b' ? (
          <B2BProcurementPortal onExit={() => setCurrentView('portfolio')} />
        ) : currentView === 'ai' ? (
          <DSAAIInstructor onExit={() => setCurrentView('portfolio')} />
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
      <footer className={`py-8 px-4 text-center text-xs font-bold border-t-2 ${currentView === 'portfolio' ? 'border-slate-950/20 bg-[#090d1c] text-slate-100' : 'border-slate-900 bg-[#04060a] text-slate-400'}`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-white">Nischay Srivastava</span>
            <span>•</span>
            <span className="font-bold text-slate-200">Portfolio & Engineering Showcase</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-300 font-bold">
            <button 
              onClick={() => setCurrentView('lobby')} 
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              1. CodeClash Arena
            </button>
            <span>•</span>
            <button 
              onClick={() => setCurrentView('analytics')} 
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              2. Live Analytics
            </button>
            <span>•</span>
            <button 
              onClick={() => setCurrentView('b2b')} 
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              3. B2B Wholesale
            </button>
            <span>•</span>
            <button 
              onClick={() => setCurrentView('ai')} 
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              4. DSA AI Instructor
            </button>
            <span>•</span>
            <a 
              href="https://github.com/nischay237" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-emerald-400 transition-colors"
            >
              GitHub
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
