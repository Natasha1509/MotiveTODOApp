import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  type: 'BOOLEAN' | 'TIME_BASED';
  targetTimeSeconds?: number;
}

interface ImmersiveViewProps {
  task: Task;
  token: string;
  quote: { text: string; author: string } | null;
  onExit: () => void;
}

const ImmersiveView: React.FC<ImmersiveViewProps> = ({ task, token, quote, onExit }) => {
  const [timeLeft, setTimeLeft] = useState(task.targetTimeSeconds || 1500);
  const [isActive, setIsActive] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Detect Light Mode context for specific UI tweaks
  const isLightMode = document.documentElement.classList.contains('light-theme');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isComplete) {
      setIsActive(false);
      setIsComplete(true);
      clearInterval(interval);

      fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${task.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'DONE' })
      }).catch(err => console.error('Failed to sync completion', err));

      setTimeout(onExit, 3000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, task.id, isComplete, onExit, token]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      // High-contrast gradient: Lavender-White center for Light Mode, Glow-Deep center for Dark
      background: isLightMode
        ? 'radial-gradient(circle at center, rgba(255, 255, 255, 0.95), var(--bg-deep))'
        : 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15), var(--bg-deep))',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
      color: 'var(--text-primary)',
      textAlign: 'center',
      padding: '1rem',
      transition: 'all 0.5s ease',
      boxSizing: 'border-box'
    }}>
      {/* Immersive Header */}
      <div className="glass-card" style={{ 
        backgroundColor: isLightMode ? 'var(--bg-card)' : 'rgba(0,0,0,0.5)', 
        width: '100%', 
        maxWidth: '1000px', 
        padding: '2rem 1rem', 
        borderRadius: '1.5rem',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ fontSize: '1.25rem', opacity: isLightMode ? 0.8 : 0.6, marginBottom: '2rem', letterSpacing: '0.2rem', fontWeight: 600 }}>
          FOCUSING ON: <span style={{ color: 'var(--accent)', opacity: 1 }}>{task.title.toUpperCase()}</span>
        </h2>

        {/* Large Timer Component */}
        <div style={{
          fontSize: 'clamp(3.5rem, 18vw, 12rem)',
          lineHeight: '1',
          fontWeight: 900,
          fontVariantNumeric: 'tabular-nums',
          // In Light Mode, we use a crisp shadow instead of a blurry glow
          textShadow: isLightMode ? '0 4px 20px var(--shadow-color)' : '0 0 60px var(--accent-glow)',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          animation: isActive ? 'timerPulse 2s infinite ease-in-out' : 'none'
        }}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Immersive Quote */}
      {quote && (
        <div style={{ maxWidth: '500px', width: '100%', margin: '1.5rem auto', borderLeft: '3px solid var(--accent)', paddingLeft: '1.25rem', textAlign: 'left', boxSizing: 'border-box' }}>
          <p style={{ fontSize: 'clamp(0.9rem, 4vw, 1.3rem)', fontStyle: 'italic', marginBottom: '0.75rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>"{quote.text}"</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>— {quote.author.toUpperCase()}</p>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', marginBottom: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        {!isComplete && (
          <button
            onClick={() => setIsActive(!isActive)}
            className="btn-primary"
            style={{ flex: '1 1 auto', maxWidth: '200px', padding: '0.8rem 1rem', background: isActive ? 'var(--border-glass)' : 'var(--success)', color: isActive ? 'var(--text-primary)' : 'white' }}
          >
            {isActive ? 'PAUSE' : 'RESUME'}
          </button>
        )}
        <button
          onClick={onExit}
          className="btn-primary"
          style={{ flex: '1 1 auto', maxWidth: '200px', padding: '0.8rem 1rem', background: 'var(--error)' }}
        >
          {isComplete ? 'WELL DONE' : 'EXIT SESSION'}
        </button>
      </div>

      {/* Success Overlay */}
      {isComplete && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // Use a deeper frosted backdrop for the rewards screen in Light Mode
          background: isLightMode ? 'rgba(240, 244, 248, 0.95)' : 'var(--bg-deep)',
          backdropFilter: 'blur(32px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 11000,
          animation: 'fadeIn 0.6s ease-out'
        }}>
          <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>💎</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '0.3rem', color: 'var(--accent)' }}>MISSION COMPLETE</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.6, marginTop: '1rem', color: 'var(--text-primary)' }}>Your focus reward is synchronizing...</p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes timerPulse {
          0% { opacity: 1; }
          50% { opacity: 0.9; transform: scale(1.02); }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ImmersiveView;
