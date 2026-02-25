import { useEffect, useState } from 'react';
import { getProfile } from '../lib/api';

interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  avatar_url: string;
  github_url: string;
  linkedin_url: string;
  skills: string[];
}

const FALLBACK: Profile = {
  name: 'Your Name',
  title: 'Full-Stack Developer',
  bio: 'I build things for the web. Passionate about clean code, great UX, and making ideas come to life through technology.',
  location: 'Manila, Philippines',
  avatar_url: '',
  github_url: 'https://github.com',
  linkedin_url: 'https://linkedin.com',
  skills: ['TypeScript', 'React', 'NestJS', 'PostgreSQL', 'Docker'],
};

export default function Home() {
  const [profile, setProfile] = useState<Profile>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setProfile(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const initials = profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <main style={{ paddingTop: '60px', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        maxWidth: '960px', margin: '0 auto',
        padding: '6rem 2rem 4rem',
        display: 'grid', gridTemplateColumns: '1fr 280px', gap: '4rem',
        alignItems: 'start',
        animation: 'fadeUp 0.7s ease forwards',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '0.75rem',
            letterSpacing: '0.12em', color: 'var(--accent)',
            textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            — Personal Portfolio
          </p>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.05, fontWeight: 900, marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            {loading ? '...' : profile.name}
          </h1>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '0.9rem',
            color: 'var(--accent)', marginBottom: '1.5rem',
            letterSpacing: '0.04em',
          }}>
            {loading ? '' : profile.title}
          </p>
          <p style={{
            fontSize: '1.05rem', color: 'var(--muted)',
            lineHeight: 1.8, maxWidth: '520px', marginBottom: '2rem',
          }}>
            {loading ? '' : profile.bio}
          </p>
          {profile.location && (
            <p style={{
              fontFamily: 'var(--mono)', fontSize: '0.78rem',
              color: 'var(--muted)', marginBottom: '2.5rem',
            }}>
              📍 {profile.location}
            </p>
          )}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {profile.github_url && (
              <a href={profile.github_url} target="_blank" rel="noreferrer" style={btnStyle('#0f0e0c', 'white')}>
                GitHub →
              </a>
            )}
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" style={btnStyle('transparent', 'var(--ink)', true)}>
                LinkedIn →
              </a>
            )}
          </div>
        </div>

        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.name} style={{
              width: '220px', height: '220px', borderRadius: '4px',
              objectFit: 'cover', border: '3px solid var(--ink)',
              boxShadow: '8px 8px 0 var(--accent-light)',
            }} />
          ) : (
            <div style={{
              width: '220px', height: '220px', borderRadius: '4px',
              background: 'var(--ink)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--serif)', fontSize: '4rem',
              color: 'var(--paper)', fontWeight: 900,
              boxShadow: '8px 8px 0 var(--accent-light)',
            }}>
              {initials}
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 2rem' }}>
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
      </div>

      {/* Skills */}
      {profile.skills?.length > 0 && (
        <section style={{
          maxWidth: '960px', margin: '0 auto',
          padding: '4rem 2rem',
          animation: 'fadeUp 0.7s ease 0.2s both',
        }}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: '1.8rem',
            fontWeight: 700, marginBottom: '2rem',
          }}>
            Skills & Technologies
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {profile.skills.map((skill) => (
              <span key={skill} style={{
                fontFamily: 'var(--mono)', fontSize: '0.8rem',
                padding: '0.4rem 1rem',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                background: 'var(--cream)',
                letterSpacing: '0.04em',
                transition: 'background 0.2s, border-color 0.2s',
              }}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function btnStyle(bg: string, color: string, outlined = false): React.CSSProperties {
  return {
    display: 'inline-block',
    padding: '0.6rem 1.5rem',
    background: bg,
    color,
    border: outlined ? '1.5px solid var(--ink)' : 'none',
    borderRadius: '2px',
    fontFamily: 'var(--mono)',
    fontSize: '0.8rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    transition: 'opacity 0.2s',
  };
}
