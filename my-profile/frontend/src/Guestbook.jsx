import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get(API_URL);
      setEntries(res.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, { name, message });
      setEditingId(null);
    } else {
      await axios.post(API_URL, { name, message });
    }
    setName('');
    setMessage('');
    fetchEntries();
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setName(entry.name);
    setMessage(entry.message);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEntries();
  };

  return (
    <div className="guestbook-wrapper">
      <header className="guestbook-header">
        <h1>Terminal Guestbook</h1>
        <p>Leave a trace in the system.</p>
      </header>
      
      <form className="guestbook-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="System Alias (Name)" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <textarea 
            placeholder="Enter your transmission..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required
            rows="4"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingId ? 'Update Transmission' : 'Send Transmission'}
          </button>
          {editingId && (
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => { setEditingId(null); setName(''); setMessage(''); }}
            >
              Abort Edit
            </button>
          )}
        </div>
      </form>

      <div className="entries-container">
        {entries.length === 0 ? (
          <p className="no-entries">No transmissions found. Be the first.</p>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="entry-card">
              <div className="entry-header">
                <strong>{entry.name}</strong>
                <span className="entry-timestamp">
                  {new Date(entry.created_at).toLocaleString()}
                </span>
              </div>
              <p className="entry-message">{entry.message}</p>
              <div className="entry-actions">
                <button className="btn-edit" onClick={() => handleEdit(entry)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(entry.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}