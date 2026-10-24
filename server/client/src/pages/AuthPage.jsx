import React, { useState } from 'react';
import API from '../api/axiosClient';

export default function AuthPage({ setToken, setUser, setView }) {
  const [isRegister, setIsRegister] = useState(false);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', bio: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    try {
      const res = await API.post(endpoint, authForm);
      if (!isRegister) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.token);
        setUser(res.data.user);
        setView('explore');
      } else {
        setIsRegister(false);
        alert('Registration complete! Please login.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Authentication failed.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '25px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {isRegister && (
          <>
            <input type="text" placeholder="Full Name" required value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} style={inputStyle} />
            <textarea placeholder="Short Bio (Optional)" value={authForm.bio} onChange={e => setAuthForm({ ...authForm, bio: e.target.value })} style={inputStyle} />
          </>
        )}
        <input type="email" placeholder="Email" required value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} style={inputStyle} />
        <input type="password" placeholder="Password" required value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} style={inputStyle} />
        <button type="submit" style={{ padding: '10px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '15px', fontSize: '14px', textAlign: 'center' }}>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span style={{ color: '#3498db', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </span>
      </p>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' };