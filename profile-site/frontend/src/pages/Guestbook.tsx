import { useEffect, useState } from 'react';
import { getEntries, createEntry, updateEntry, deleteEntry } from '../lib/api';

interface Entry {
  id: string;
  name: string;
  email?: string;
  message: string;
  created_at: string;
  updated_at?: string;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState('');

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const load = async () => {
    try {
      const data = await getEntries();
      setEntries(data);
    } catch {
      setError('Failed to load entries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await createEntry(form);
      setForm({ name: '', email: '', message: '' });
      setSuccess('Your message was posted!');
      await load();
    } catch {
      setError('Failed to post message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await updateEntry(id, { message: editMessage });
      setEditingId(null);
      setEditMessage('');
      await load();
    } catch {
      setError('Failed to update message.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry?')) return;
    try {
      await deleteEntry(id);
      await load();
    } catch {
      setError('Failed to delete entry.');
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const initials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <main style={{ paddingTop: '60px', minHeight: '100vh' }}>
      <section style={{
        maxWidth: '720px', margin: '0 auto',
        padding: '5rem 2rem',
        animation: 'fadeUp 0.6s ease forwards',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '0.75rem',
            color: 'var(--accent)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            — Sign the book
          </p>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            Guestbook
          </h1>
          <p style={{ color: 'var(--muted)', marginTop: '1rem', fontSize: '0.95rem' }}>
            Leave a message — say hi, share feedback, or just drop your name.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'var(--cream)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '2rem',
          marginBottom: '3rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: '1.2rem',
            marginBottom: '1.5rem', fontWeight: 700,
          }}>
            Leave a Message
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Name *</label>
              <input
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your name"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Email (optional)</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com"
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Message *</label>
            <textarea
              required
              minLength={5}
              maxLength={500}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Say something nice..."
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
            />
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
              {form.message.length}/500
            </p>
          </div>
          {error && <p style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '0.8rem', marginBottom: '1rem' }}>✖ {error}</p>}
          {success && <p style={{ color: '#2d7a4f', fontFamily: 'var(--mono)', fontSize: '0.8rem', marginBottom: '1rem' }}>✔ {success}</p>}
          <button type="submit" disabled={submitting} style={{
            background: 'var(--ink)', color: 'var(--paper)',
            border: 'none', padding: '0.7rem 2rem',
            fontFamily: 'var(--mono)', fontSize: '0.8rem',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            borderRadius: '2px', cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.7 : 1, transition: 'opacity 0.2s',
          }}>
            {submitting ? 'Posting...' : 'Post Message →'}
          </button>
        </form>

        {/* Entries */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 700 }}>
              Messages
            </h2>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.75rem',
              color: 'var(--muted)', letterSpacing: '0.06em',
            }}>
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>

          {loading ? (
            <p style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.85rem' }}>Loading...</p>
          ) : entries.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '4rem 2rem',
              border: '1px dashed var(--border)', borderRadius: '4px',
            }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', color: 'var(--muted)' }}>
                No messages yet. Be the first!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {entries.map((entry, i) => (
                <div key={entry.id} style={{
                  background: 'white',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  padding: '1.5rem',
                  animation: `fadeUp 0.4s ease ${i * 0.05}s both`,
                  transition: 'box-shadow 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    {/* Avatar */}
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: `hsl(${entry.name.charCodeAt(0) * 7}, 40%, 35%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontFamily: 'var(--serif)',
                      fontSize: '0.85rem', fontWeight: 700, flexShrink: 0,
                    }}>
                      {initials(entry.name)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <strong style={{ fontFamily: 'var(--serif)', fontSize: '1rem' }}>{entry.name}</strong>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>
                          {formatDate(entry.created_at)}
                        </span>
                      </div>
                      {editingId === entry.id ? (
                        <div>
                          <textarea
                            value={editMessage}
                            onChange={e => setEditMessage(e.target.value)}
                            rows={3}
                            style={{ ...inputStyle, marginBottom: '0.75rem', width: '100%' }}
                          />
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEdit(entry.id)} style={smallBtnStyle('var(--ink)', 'white')}>Save</button>
                            <button onClick={() => setEditingId(null)} style={smallBtnStyle('transparent', 'var(--muted)', true)}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p style={{ color: 'var(--ink)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                          {entry.message}
                        </p>
                      )}
                    </div>
                    {/* Actions */}
                    {editingId !== entry.id && (
                      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                        <button
                          onClick={() => { setEditingId(entry.id); setEditMessage(entry.message); }}
                          title="Edit"
                          style={iconBtnStyle}
                        >✎</button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          title="Delete"
                          style={{ ...iconBtnStyle, color: 'var(--accent)' }}
                        >✕</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--mono)',
  fontSize: '0.72rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: '0.4rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.6rem 0.75rem',
  border: '1px solid var(--border)',
  borderRadius: '2px',
  background: 'white',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const smallBtnStyle = (bg: string, color: string, outlined = false): React.CSSProperties => ({
  padding: '0.35rem 0.9rem',
  background: bg,
  color,
  border: outlined ? '1px solid var(--border)' : 'none',
  borderRadius: '2px',
  fontFamily: 'var(--mono)',
  fontSize: '0.75rem',
  letterSpacing: '0.04em',
  cursor: 'pointer',
});

const iconBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
  color: 'var(--muted)',
  padding: '0.2rem 0.4rem',
  borderRadius: '2px',
  transition: 'color 0.2s, background 0.2s',
};
