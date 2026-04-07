import { useState, useEffect } from 'react'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import './index.css'

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Load token and theme from storage on mount
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['token', 'theme'], (result) => {
        if (result && result.token) {
          setToken(result.token as string);
        }
        if (result && result.theme) {
          setTheme(result.theme as 'light' | 'dark');
        }
        setLoading(false);
      });
    } else {
      // Fallback for web development
      const savedToken = localStorage.getItem('token');
      const savedTheme = localStorage.getItem('theme');
      if (savedToken) setToken(savedToken);
      if (savedTheme) setTheme(savedTheme as 'light' | 'dark');
      setLoading(false);
    }
  }, []);

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ token: newToken });
    } else {
      localStorage.setItem('token', newToken);
    }
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ theme: newTheme });
    } else {
      localStorage.setItem('theme', newTheme);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-deep)' }}>
        <p style={{ color: 'var(--accent)', fontWeight: 600 }}>Loading Focus Session...</p>
      </div>
    );
  }

  return (
    <div id="app-root">
      <main>
        {!token ? (
          <>
            <header style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-glass)' }}>
              <h1 style={{ fontSize: '1.25rem', margin: 0, background: 'linear-gradient(to right, #8b5cf6, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>
                MotiveTODO
              </h1>
            </header>
            <Auth onLoginSuccess={handleLoginSuccess} />
          </>
        ) : (
          <Dashboard token={token} theme={theme} onToggleTheme={toggleTheme} />
        )}
      </main>
    </div>
  )
}

export default App
