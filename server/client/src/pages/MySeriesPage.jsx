import React, { useState, useEffect } from 'react';
import API from '../api/axiosClient';

export default function MySeriesPage({ openSeriesDetail, refreshExplore }) {
  const [mySeries, setMySeries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSeries, setNewSeries] = useState({ title: '', description: '', genre: 'Tech', coverImage: '' });

  useEffect(() => {
    fetchMySeries();
  }, []);

  const fetchMySeries = async () => {
    try {
      const res = await API.get('/series/my');
      setMySeries(res.data);
    } catch (err) {
      console.error('Error fetching user series:', err);
    }
  };

  const handleCreateSeries = async (e) => {
    e.preventDefault();
    try {
      await API.post('/series', newSeries);
      setShowModal(false);
      setNewSeries({ title: '', description: '', genre: 'Tech', coverImage: '' });
      fetchMySeries();
      refreshExplore();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create series.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>My Created Series</h2>
        <button onClick={() => setShowModal(true)} style={{ padding: '10px 16px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          + Create New Series
        </button>
      </div>

      {showModal && (
        <div style={modalOverlay}>
          <div style={modalBody}>
            <h3>Create New Series</h3>
            <form onSubmit={handleCreateSeries} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="Series Title" required value={newSeries.title} onChange={e => setNewSeries({ ...newSeries, title: e.target.value })} style={inputStyle} />
              <textarea placeholder="Description" required value={newSeries.description} onChange={e => setNewSeries({ ...newSeries, description: e.target.value })} style={inputStyle} />
              <input type="text" placeholder="Genre (e.g. Sci-Fi, Tech, WebDev)" required value={newSeries.genre} onChange={e => setNewSeries({ ...newSeries, genre: e.target.value })} style={inputStyle} />
              <input type="text" placeholder="Cover Image URL (optional)" value={newSeries.coverImage} onChange={e => setNewSeries({ ...newSeries, coverImage: e.target.value })} style={inputStyle} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '10px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px' }}>Save</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', background: '#ccc', border: 'none', borderRadius: '4px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mySeries.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>You haven't created any series yet. Click "+ Create New Series" to start!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {mySeries.map((item) => (
            <div key={item._id} onClick={() => openSeriesDetail(item._id)} style={cardStyle}>
              <h3 style={{ margin: '0 0 5px 0' }}>{item.title}</h3>
              <span style={{ fontSize: '12px', color: '#006064', background: '#e0f7fa', padding: '2px 6px', borderRadius: '4px', alignSelf: 'flex-start' }}>{item.genre}</span>
              <p style={{ fontSize: '14px', color: '#555', marginTop: '10px' }}>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' };
const modalOverlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalBody = { background: '#fff', padding: '25px', borderRadius: '8px', width: '90%', maxWidth: '500px' };
const cardStyle = { border: '1px solid #eee', borderRadius: '8px', padding: '15px', cursor: 'pointer', background: '#fff', display: 'flex', flexDirection: 'column' };