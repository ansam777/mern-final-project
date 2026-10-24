import React from 'react';
import SeriesCard from '../components/SeriesCard';

export default function ExplorePage({ seriesList, openSeriesDetail }) {
  return (
    <div>
      <h2>Explore Series</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {seriesList.map((item) => (
          <SeriesCard key={item._id} item={item} onClick={() => openSeriesDetail(item._id)} />
        ))}
      </div>
    </div>
  );
}