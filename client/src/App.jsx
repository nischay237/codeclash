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
