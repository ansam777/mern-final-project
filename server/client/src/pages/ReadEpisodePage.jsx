import React from 'react';

export default function ReadEpisodePage({ activeEpisode, navEpisodes, openEpisode, openSeriesDetail }) {
  if (!activeEpisode) return null;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <button onClick={() => openSeriesDetail(activeEpisode.seriesId)} style={{ marginBottom: '15px', padding: '6px 12px', cursor: 'pointer' }}>
        ← Back to Series
      </button>

      <div style={{ padding: '20px', background: '#fff', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <span style={{ fontSize: '14px', color: '#888' }}>Episode {activeEpisode.episodeNumber}</span>
        <h2 style={{ margin: '5px 0 15px 0' }}>{activeEpisode.title}</h2>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <span>⏱️ {activeEpisode.readTime} min read</span> | <span>👁️ {activeEpisode.views} views</span>
        </div>

        <div style={{ fontSize: '16px', lineHeight: '1.8', whiteSpace: 'pre-line', color: '#2c3e50' }}>
          {activeEpisode.content}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {navEpisodes.prev ? (
          <button onClick={() => openEpisode(navEpisodes.prev)} style={btnStyle}>← Previous Episode</button>
        ) : <div />}
        {navEpisodes.next && (
          <button onClick={() => openEpisode(navEpisodes.next)} style={{ ...btnStyle, background: '#3498db', color: '#fff' }}>Next Episode →</button>
        )}
      </div>
    </div>
  );
}

const btnStyle = { padding: '8px 12px', background: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' };