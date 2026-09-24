import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use sessionStorage so every browser tab has an independent identity
    const token = sessionStorage.getItem('codeclash_token');
    const storedUser = sessionStorage.getItem('codeclash_user');

    if (token && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        sessionStorage.removeItem('codeclash_token');
        sessionStorage.removeItem('codeclash_user');
        autoGuestLogin();
      }
    } else {
      // Auto-assign unique guest profile per tab
      autoGuestLogin();
    }
    setLoading(false);
  }, []);

  const autoGuestLogin = async (customName) => {
    try {
      const res = await fetch('/api/auth/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: customName })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        sessionStorage.setItem('codeclash_token', data.token);
        sessionStorage.setItem('codeclash_user', JSON.stringify(data.user));
        return data.user;
      }
    } catch (err) {
      console.error('Guest login failed:', err);
    }
  };

  const changeUsername = async (newName) => {
    if (!newName || !newName.trim()) return;
    return await autoGuestLogin(newName.trim());
  };

  const updateUserElo = (newElo, newTier) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, eloRating: newElo, tier: newTier || prev.tier };
      sessionStorage.setItem('codeclash_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, autoGuestLogin, changeUsername, updateUserElo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}