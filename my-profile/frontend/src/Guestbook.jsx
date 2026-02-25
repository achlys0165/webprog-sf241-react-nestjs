import { useState, useEffect } from 'react';
import axios from 'axios';

// In Codespaces, requests to localhost usually get routed correctly by the forwarded ports
const API_URL = 'http://localhost:3000/guestbook';

export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const res = await axios.get(API_URL);
    setEntries(res.data);
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
    <div>
      <h2>Guestbook</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ display: 'block', marginBottom: '0.5rem' }}
        />
        <textarea 
          placeholder="Your Message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required
          style={{ display: 'block', marginBottom: '0.5rem' }}
        />
        <button type="submit">{editingId ? 'Update Message' : 'Sign Guestbook'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setName(''); setMessage(''); }}>Cancel</button>}
      </form>

      <div>
        {entries.map(entry => (
          <div key={entry.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <strong>{entry.name}</strong> 
            <span style={{ fontSize: '0.8rem', color: 'gray', marginLeft: '1rem' }}>
              {new Date(entry.created_at).toLocaleString()}
            </span>
            <p>{entry.message}</p>
            <button onClick={() => handleEdit(entry)}>Edit</button>
            <button onClick={() => handleDelete(entry.id)} style={{ marginLeft: '0.5rem', color: 'red' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}