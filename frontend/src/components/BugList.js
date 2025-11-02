import React from 'react';
import './BugList.css';

function BugList({ bugs, onEdit, onDelete, onUpdateStatus }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in-progress': return 'status-in-progress';
      case 'resolved': return 'status-resolved';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low': return 'priority-low';
      case 'medium': return 'priority-medium';
      case 'high': return 'priority-high';
      default: return '';
    }
  };

  if (bugs.length === 0) {
    return (
      <div className="bug-list-empty">
        <p>No bugs reported yet. Start by reporting your first bug!</p>
      </div>
    );
  }

  return (
    <div className="bug-list">
      <h2>Bug List ({bugs.length})</h2>
      <div className="bugs-container">
        {bugs.map(bug => (
          <div key={bug.id} className="bug-card">
            <div className="bug-header">
              <h3>{bug.title}</h3>
              <div className="bug-badges">
                <span className={`badge ${getPriorityClass(bug.priority)}`}>
                  {bug.priority}
                </span>
                <span className={`badge ${getStatusClass(bug.status)}`}>
                  {bug.status}
                </span>
              </div>
            </div>
            
            <p className="bug-description">{bug.description}</p>
            
            <div className="bug-meta">
              <small>Created: {new Date(bug.createdAt).toLocaleString()}</small>
              {bug.updatedAt !== bug.createdAt && (
                <small>Updated: {new Date(bug.updatedAt).toLocaleString()}</small>
              )}
            </div>

            <div className="bug-actions">
              <select
                value={bug.status}
                onChange={(e) => onUpdateStatus(bug.id, e.target.value)}
                className="status-select"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              
              <button 
                onClick={() => onEdit(bug)}
                className="edit-button"
              >
                Edit
              </button>
              
              <button 
                onClick={() => onDelete(bug.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BugList;
