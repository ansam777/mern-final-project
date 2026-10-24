import React, { useState } from 'react';
import API from '../api/axiosClient';

export default function SeriesDetailPage({ selectedSeries, episodes, token, user, setView, openEpisode, refreshSeries }) {
  const [showModal, setShowModal] = useState(false);
  const [newEpisode, setNewEpisode] = useState({ title: '', content: '', episodeNumber: episodes.length + 1, readTime: 3 });

  const handleCreateEpisode = async (e) => {
    e.preventDefault();
    try {
      await API.post('/episodes', {
        ...newEpisode,
        seriesId: selectedSeries._id
      });
      setShowModal(false);
      setNewEpisode({ title: '', content: '', episodeNumber: episodes.length + 2, readTime: 3 });
      refreshSeries(selectedSeries._id);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create episode.');
    }
  };

  const isAuthor = token && user?.id === (selectedSeries.authorId?._id || selectedSeries.authorId);

  return (
    <div>
      <button onClick={() => setView('explore')} style={{ marginBottom: '15px', padding: '6px 12px', cursor: 'pointer' }}>← Back</button>
      <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '20px', marginBottom: '20px' }}>
        <h2>{selectedSeries.title}</h2>
        <p style={{ color: '#666' }}>Author: <strong>{selectedSeries.authorId?.name}</strong> | Genre: {selectedSeries.genre}</p>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{selectedSeries.description}</p>

        {isAuthor && (
          <button onClick={() => setShowModal(true)} style={{ padding: '8px 14px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
            + Add Episode
          </button>
        )}
      </div>

      {showModal && (
        <div style={modalOverlay}>
          <div style={modalBody}>
            <h3>Add New Episode</h3>
            <form onSubmit={handleCreateEpisode} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="number" placeholder="Episode Number" required value={newEpisode.episodeNumber} onChange={e => setNewEpisode({ ...newEpisode, episodeNumber: e.target.value })} style={inputStyle} />
              <input type="text" placeholder="Episode Title" required value={newEpisode.title} onChange={e => setNewEpisode({ ...newEpisode, title: e.target.value })} style={inputStyle} />
              <input type="number" placeholder="Estimated Read Time (mins)" value={newEpisode.readTime} onChange={e => setNewEpisode({ ...newEpisode, readTime: e.target.value })} style={inputStyle} />
              <textarea placeholder="Episode Content" required rows={8} value={newEpisode.content} onChange={e => setNewEpisode({ ...newEpisode, content: e.target.value })} style={inputStyle} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '10px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px' }}>Publish Episode</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', background: '#ccc', border: 'none', borderRadius: '4px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h3>Episodes ({episodes.length})</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {episodes.map((ep) => (
          <div key={ep._id} onClick={() => openEpisode(ep._id)} style={{ padding: '12px 16px', border: '1px solid #e0e0e0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: '#f9f9f9' }}>
            <div>
              <strong>Ep {ep.episodeNumber}: {ep.title}</strong>
              <span style={{ marginLeft: '15px', fontSize: '12px', color: '#888' }}>{ep.readTime} min read</span>
            </div>
            <span style={{ fontSize: '13px', color: '#666' }}>👁️ {ep.views} views</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' };
const modalOverlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalBody = { background: '#fff', padding: '25px', borderRadius: '8px', width: '90%', maxWidth: '500px' };