import React from 'react';

export default function SeriesCard({ item, onClick }) {
  return (
    <div onClick={onClick} style={cardStyle}>
      <img src={item.coverImage} alt={item.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }} />
      <span style={{ fontSize: '12px', background: '#e0f7fa', color: '#006064', padding: '3px 8px', borderRadius: '12px', alignSelf: 'flex-start', marginTop: '8px' }}>
        {item.genre}
      </span>
      <h3 style={{ margin: '8px 0 4px 0' }}>{item.title}</h3>
      <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>By {item.authorId?.name || 'Unknown'}</p>
      <p style={{ fontSize: '14px', color: '#444', marginTop: '8px' }}>{item.description.substring(0, 80)}...</p>
    </div>
  );
}

const cardStyle = { border: '1px solid #eee', borderRadius: '8px', padding: '15px', cursor: 'pointer', background: '#fff', display: 'flex', flexDirection: 'column' };