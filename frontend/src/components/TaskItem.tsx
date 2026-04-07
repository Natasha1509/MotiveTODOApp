import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  type: 'BOOLEAN' | 'TIME_BASED';
  status: 'PENDING' | 'DONE' | 'IN_PROGRESS';
  targetTimeSeconds?: number;
}

interface TaskItemProps {
  task: Task;
  token: string;
  onRefresh: () => void;
  onFocus: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, token, onRefresh, onFocus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleUpdate = async (newProps: Partial<Task>) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          title: newProps.title || task.title, 
          type: task.type, 
          targetTimeSeconds: task.targetTimeSeconds,
          status: newProps.status || task.status
        })
      });
      if (res.ok) {
        setIsEditing(false);
        onRefresh();
      }
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const toggleStatus = async () => {
    const newStatus = task.status === 'DONE' ? 'PENDING' : 'DONE';
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${task.id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error('Failed to update task status', err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${task.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  if (isConfirming) {
    return (
      <div className="task-item animate-in" style={{ background: 'rgba(239, 68, 68, 0.15)', borderColor: 'var(--error)' }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, color: 'var(--error)' }}>DELETE THIS TASK?</p>
          <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8, color: 'var(--text-primary)' }}>This action cannot be undone.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleDelete} className="btn-primary" style={{ width: 'auto', padding: '0.4rem 1.2rem', background: 'var(--error)' }}>YES</button>
          <button onClick={() => setIsConfirming(false)} className="btn-primary" style={{ width: 'auto', padding: '0.4rem 1.2rem', background: 'var(--border-glass)', color: 'var(--text-primary)' }}>NO</button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-item">
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)}
              className="glass-input"
              style={{ padding: '0.45rem', fontSize: '0.9rem', marginBottom: 0 }}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleUpdate({ title: editTitle })}
            />
            <button onClick={() => handleUpdate({ title: editTitle })} title="Save" className="btn-primary" style={{ width: 'auto', padding: '0.5rem' }}>💾</button>
            <button onClick={() => setIsEditing(false)} title="Cancel" className="btn-primary" style={{ width: 'auto', padding: '0.5rem', background: 'var(--border-glass)', color: 'var(--text-primary)' }}>❌</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <button 
                onClick={toggleStatus}
                title={task.status === 'DONE' ? 'Mark Pending' : 'Mark Done'}
                style={{ 
                  width: '22px', 
                  height: '22px', 
                  borderRadius: '50%', 
                  border: task.status === 'DONE' ? 'none' : '2px solid var(--accent)',
                  background: task.status === 'DONE' ? 'var(--success)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                {task.status === 'DONE' && <span style={{ color: 'white', fontSize: '14px', fontWeight: 800 }}>✓</span>}
              </button>
              <h3 style={{ 
                margin: 0, 
                fontSize: '1.05rem', 
                fontWeight: 600,
                color: 'var(--text-primary)',
                textDecoration: task.status === 'DONE' ? 'line-through' : 'none', 
                opacity: task.status === 'DONE' ? 0.4 : 1 
              }}>
                {task.title}
              </h3>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.3rem', marginLeft: '2rem' }}>
              {task.type === 'TIME_BASED' ? `Focus Session: ${Math.floor(task.targetTimeSeconds! / 60)}m` : 'Simple Goal'}
            </div>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        {!isEditing && (
          <>
            <button onClick={() => setIsEditing(true)} title="Edit" className="btn-icon" style={{ fontSize: '1.1rem' }}>✏️</button>
            <button onClick={() => setIsConfirming(true)} title="Delete" className="btn-icon" style={{ fontSize: '1.1rem' }}>🗑️</button>
          </>
        )}
        {task.type === 'TIME_BASED' && (
          <button 
            onClick={() => onFocus(task)}
            disabled={task.status === 'DONE'}
            className="btn-primary" 
            style={{ 
              width: 'auto', 
              padding: '0.4rem 1rem', 
              fontSize: '0.75rem', 
              background: task.status === 'DONE' ? 'var(--border-glass)' : 'var(--accent)',
              color: task.status === 'DONE' ? 'var(--text-secondary)' : 'white',
              cursor: task.status === 'DONE' ? 'default' : 'pointer'
            }}
          >
            {task.status === 'DONE' ? 'DONE' : 'FOCUS'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
