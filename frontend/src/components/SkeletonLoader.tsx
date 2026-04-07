import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="container animate-in">
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="shimmer" style={{ width: '120px', height: '32px' }}></div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <div className="shimmer" style={{ width: '32px', height: '32px' }}></div>
          <div className="shimmer" style={{ width: '32px', height: '32px' }}></div>
          <div className="shimmer" style={{ width: '60px', height: '32px' }}></div>
        </div>
      </header>

      {/* Quote Shimmer */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <div className="shimmer" style={{ width: '100%', height: '20px', marginBottom: '0.5rem' }}></div>
        <div className="shimmer" style={{ width: '60%', height: '14px' }}></div>
      </div>

      {/* Add Task Shimmer */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div className="shimmer" style={{ width: '100%', height: '40px' }}></div>
      </div>

      {/* Task Item Shimmers */}
      <div className="glass-card" style={{ padding: '0' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ flex: 1 }}>
              <div className="shimmer" style={{ width: '40%', height: '18px', marginBottom: '0.5rem' }}></div>
              <div className="shimmer" style={{ width: '20%', height: '12px' }}></div>
            </div>
            <div className="shimmer" style={{ width: '60px', height: '28px' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
