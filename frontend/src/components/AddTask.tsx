import React, { useState } from 'react';

interface AddTaskProps {
  token: string;
  onSuccess: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ token, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'BOOLEAN' | 'TIME_BASED'>('BOOLEAN');
  const [minutes, setMinutes] = useState('25');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError('');

    const body = {
      title,
      type,
      targetTimeSeconds: type === 'TIME_BASED' ? parseInt(minutes) * 60 : null
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      setTitle('');
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            className="glass-input"
            style={{ marginBottom: 0, flex: 1 }}
            placeholder="What's your focus goal?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0 1.5rem' }} disabled={loading || !title.trim()}>
            {loading ? '...' : 'Add'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="radio"
              name="taskType"
              value="BOOLEAN"
              checked={type === 'BOOLEAN'}
              onChange={() => setType('BOOLEAN')}
              style={{ marginRight: '0.3rem' }}
            />
            Simple Task
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="radio"
              name="taskType"
              value="TIME_BASED"
              checked={type === 'TIME_BASED'}
              onChange={() => setType('TIME_BASED')}
              style={{ marginRight: '0.3rem' }}
            />
            Timed Focus
          </label>

          {type === 'TIME_BASED' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <input
                type="number"
                className="glass-input"
                style={{ width: '60px', padding: '0.2rem', margin: 0, textAlign: 'center' }}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min="1"
                max="120"
              />
              <span>mins</span>
            </div>
          )}
        </div>
        {error && <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.5rem' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddTask;
