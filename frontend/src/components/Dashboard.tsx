import React, { useState, useEffect, useCallback } from 'react';
import AddTask from './AddTask';
import ImmersiveView from './ImmersiveView';
import SkeletonLoader from './SkeletonLoader';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  title: string;
  type: 'BOOLEAN' | 'TIME_BASED';
  status: 'PENDING' | 'DONE' | 'IN_PROGRESS';
  targetTimeSeconds?: number;
}

interface Quote {
  text: string;
  author: string;
}

interface DashboardProps {
  token: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ token, theme, onToggleTheme }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const fetchData = useCallback(async () => {
    const showFullLoader = tasks.length === 0;
    if (showFullLoader) setLoading(true);
    
    setError('');
    try {
      const tasksRes = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!tasksRes.ok) throw new Error('Could not fetch tasks');
      const tasksData = await tasksRes.json();
      setTasks(tasksData);

      const quoteRes = await fetch(`${import.meta.env.VITE_API_URL}/api/quotes/random`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (quoteRes.ok) {
        const quoteData = await quoteRes.json();
        setQuote(quoteData);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, tasks.length]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLaunchFocus = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
      chrome.tabs.create({ url: 'index.html' });
    } else {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  if (loading && tasks.length === 0) {
    return <SkeletonLoader />;
  }

  return (
    <div className="container animate-in">
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            MOTIVE<span style={{ color: 'var(--accent)' }}>TODO</span>
          </h1>
          <button 
            onClick={onToggleTheme} 
            title={theme === 'light' ? 'Switch to Dark' : 'Switch to Light'} 
            className="btn-icon"
            style={{ padding: '0.5rem', opacity: 0.8, color: '#94a3b8' }}
          >
            {theme === 'light' ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <button onClick={handleLaunchFocus} title="Enter Immersive Mode" className="btn-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--success)' }}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
          </button>
          <button onClick={() => {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
              chrome.storage.local.remove(['token'], () => window.location.reload());
            } else {
              localStorage.removeItem('token');
              window.location.reload();
            }
          }} className="btn-primary" style={{ width: 'auto', padding: '0.45rem 1rem', fontSize: '0.75rem', marginLeft: '0.2rem' }}>
            Logout
          </button>
        </div>
      </header>

      {/* Quote Banner with Integrated Refresh */}
      {quote && (
        <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem', borderLeft: '4px solid var(--accent)', position: 'relative' }}>
          <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '0.5rem', paddingRight: '2rem', color: 'var(--text-primary)', fontWeight: 500 }}>"{quote.text}"</p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>— {quote.author.toUpperCase()}</p>
          
          <button 
            onClick={fetchData} 
            title="Refresh Quotes & Tasks" 
            className="btn-icon" 
            style={{ 
              position: 'absolute', 
              top: '1rem', 
              right: '1rem', 
              padding: '0.4rem',
              background: 'var(--border-glass)',
              opacity: 0.8
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
          </button>
        </div>
      )}

      {error && <p style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</p>}

      <AddTask token={token} onSuccess={fetchData} />

      <div className="glass-card" style={{ padding: '0' }}>
        <div style={{ marginTop: '0.5rem' }}>
          {tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state-icon">🌸</span>
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>Breathe deep.</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Your journey is just beginning.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                token={token} 
                onRefresh={fetchData} 
                onFocus={setActiveTask} 
              />
            ))
          )}
        </div>
      </div>

      {activeTask && (
        <ImmersiveView 
          task={activeTask} 
          token={token}
          quote={quote} 
          onExit={() => {
            setActiveTask(null);
            fetchData();
          }} 
        />
      )}
    </div>
  );
};

export default Dashboard;
