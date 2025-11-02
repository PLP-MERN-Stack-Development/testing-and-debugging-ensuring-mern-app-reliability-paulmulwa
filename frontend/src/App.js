import React, { useState, useEffect } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import BugForm from './components/BugForm';
import BugList from './components/BugList';

const API_URL = '/api/bugs';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBug, setEditingBug] = useState(null);

  // Fetch all bugs
  const fetchBugs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching bugs from:', API_URL); // Debug log
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch bugs: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Fetched bugs:', data); // Debug log
      setBugs(data);
    } catch (err) {
      console.error('Error fetching bugs:', err); // Debug log
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load bugs on component mount
  useEffect(() => {
    fetchBugs();
  }, []);

  // Create or update bug
  const handleSubmit = async (bugData) => {
    try {
      setError(null);
      
      if (editingBug) {
        // Update existing bug
        console.log('Updating bug:', editingBug.id, bugData); // Debug log
        const response = await fetch(`${API_URL}/${editingBug.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bugData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update bug');
        }

        const updatedBug = await response.json();
        setBugs(bugs.map(bug => bug.id === updatedBug.id ? updatedBug : bug));
        setEditingBug(null);
      } else {
        // Create new bug
        console.log('Creating new bug:', bugData); // Debug log
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bugData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create bug');
        }

        const newBug = await response.json();
        setBugs([...bugs, newBug]);
      }
    } catch (err) {
      console.error('Error submitting bug:', err); // Debug log
      setError(err.message);
    }
  };

  // Update bug status
  const handleUpdateStatus = async (id, status) => {
    try {
      setError(null);
      
      console.log('Updating bug status:', id, status); // Debug log
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      const updatedBug = await response.json();
      setBugs(bugs.map(bug => bug.id === updatedBug.id ? updatedBug : bug));
    } catch (err) {
      console.error('Error updating status:', err); // Debug log
      setError(err.message);
    }
  };

  // Delete bug
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bug?')) {
      return;
    }

    try {
      setError(null);
      
      console.log('Deleting bug:', id); // Debug log
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete bug');
      }

      setBugs(bugs.filter(bug => bug.id !== id));
    } catch (err) {
      console.error('Error deleting bug:', err); // Debug log
      setError(err.message);
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <h1>🐛 Bug Tracker</h1>
          <p>Track and manage your application bugs</p>
        </header>

        <main className="App-main">
          {error && (
            <div className="error-banner" role="alert">
              <strong>Error:</strong> {error}
              <button onClick={() => setError(null)} className="close-error">×</button>
            </div>
          )}

          <BugForm 
            onSubmit={handleSubmit} 
            editingBug={editingBug}
            onCancel={() => setEditingBug(null)}
          />

          {loading ? (
            <div className="loading">Loading bugs...</div>
          ) : (
            <BugList 
              bugs={bugs}
              onEdit={setEditingBug}
              onDelete={handleDelete}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
        </main>

        <footer className="App-footer">
          <p>© 2025 Bug Tracker App - Testing & Debugging Demo</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
