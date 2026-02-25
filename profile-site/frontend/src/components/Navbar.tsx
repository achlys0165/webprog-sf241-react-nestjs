import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: '1px solid var(--border)',
      background: 'rgba(245, 242, 236, 0.92)',
      backdropFilter: 'blur(12px)',
      padding: '0 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '60px',
    }}>
      <Link to="/" style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 700 }}>
        <span style={{ color: 'var(--accent)' }}>◆</span> Portfolio
      </Link>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {[{ to: '/', label: 'Home' }, { to: '/guestbook', label: 'Guestbook' }].map(({ to, label }) => (
          <Link key={to} to={to} style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: pathname === to ? 'var(--accent)' : 'var(--muted)',
            borderBottom: pathname === to ? '2px solid var(--accent)' : '2px solid transparent',
            paddingBottom: '2px',
            transition: 'color 0.2s, border-color 0.2s',
          }}>{label}</Link>
        ))}
      </div>
    </nav>
  );
}
