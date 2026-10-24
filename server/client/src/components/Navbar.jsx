import React from 'react';

export default function Navbar({ setView, token, user, logout }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
      <h1 style={{ cursor: 'pointer', margin: 0, color: '#2c3e50' }} onClick={() => setView('explore')}>StoryLoop 📖</h1>
      <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button onClick={() => setView('explore')} style={btnStyle}>Explore</button>
        {token ? (
          <>
            <button onClick={() => setView('my-series')} style={btnStyle}>My Series</button>
            <span style={{ fontSize: '14px', color: '#666' }}>Hi, <strong>{user?.name}</strong></span>
            <button onClick={logout} style={{ ...btnStyle, background: '#e74c3c', color: '#fff' }}>Logout</button>
          </>
        ) : (
          <button onClick={() => setView('auth')} style={{ ...btnStyle, background: '#3498db', color: '#fff' }}>Sign In</button>
        )}
      </nav>
    </header>
  );
}

const btnStyle = { padding: '8px 12px', background: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' };