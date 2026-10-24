import React, { useState, useEffect } from 'react';
import API from './api/axiosClient';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import ExplorePage from './pages/ExplorePage';
import MySeriesPage from './pages/MySeriesPage';
import SeriesDetailPage from './pages/SeriesDetailPage';
import ReadEpisodePage from './pages/ReadEpisodePage';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [view, setView] = useState('explore');

  const [seriesList, setSeriesList] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [activeEpisode, setActiveEpisode] = useState(null);
  const [navEpisodes, setNavEpisodes] = useState({ prev: null, next: null });

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      const res = await API.get('/series');
      setSeriesList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
    setView('explore');
  };

  const openSeriesDetail = async (id) => {
    try {
      const res = await API.get(`/series/${id}`);
      setSelectedSeries(res.data.series);
      setEpisodes(res.data.episodes);
      setView('series-detail');
    } catch (err) {
      alert('Could not load series detail.');
    }
  };

  const openEpisode = async (id) => {
    try {
      const res = await API.get(`/episodes/${id}`);
      setActiveEpisode(res.data.episode);
      setNavEpisodes({ prev: res.data.prevEpisode, next: res.data.nextEpisode });
      setView('read-episode');
    } catch (err) {
      alert('Could not load episode.');
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', maxWidth: '900px', margin: '0 auto', padding: '20px', color: '#333' }}>
      <Navbar setView={setView} token={token} user={user} logout={logout} />

      {view === 'auth' && <AuthPage setToken={setToken} setUser={setUser} setView={setView} />}
      {view === 'explore' && <ExplorePage seriesList={seriesList} openSeriesDetail={openSeriesDetail} />}
      {view === 'my-series' && (
        <MySeriesPage openSeriesDetail={openSeriesDetail} refreshExplore={fetchSeries} />
      )}
      {view === 'series-detail' && (
        <SeriesDetailPage
          selectedSeries={selectedSeries}
          episodes={episodes}
          token={token}
          user={user}
          setView={setView}
          openEpisode={openEpisode}
          refreshSeries={openSeriesDetail}
        />
      )}
      {view === 'read-episode' && (
        <ReadEpisodePage
          activeEpisode={activeEpisode}
          navEpisodes={navEpisodes}
          openEpisode={openEpisode}
          openSeriesDetail={openSeriesDetail}
        />
      )}
    </div>
  );
}