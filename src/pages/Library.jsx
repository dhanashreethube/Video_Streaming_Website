import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { History, ThumbsUp, Clock, Users, Trash2, Video } from 'lucide-react';
import { useStreamForge } from '../context/StreamForgeContext';
import { VIDEOS, CHANNELS } from '../data/mockData';
import VideoGrid from '../components/VideoGrid';
import ChannelCard from '../components/ChannelCard';

const Library = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    history,
    clearHistory,
    removeFromHistory,
    likedVideos,
    subscribedChannels,
    watchLater
  } = useStreamForge();

  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'history' | 'liked' | 'watchlater' | 'subscriptions'

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab('library');
    }
  }, [searchParams]);

  // Map IDs to actual video objects
  const historyVideos = history.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean);
  const likedVideosList = likedVideos.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean);
  const watchLaterVideos = watchLater.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean);
  
  // Subscribed channels details
  const subscribedList = CHANNELS.filter(ch => subscribedChannels.includes(ch.id));

  const handleTabChange = (tabName) => {
    navigate(`/library?tab=${tabName}`);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your watch history?')) {
      clearHistory();
    }
  };

  return (
    <div className="library-page-container page-transition text-left">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px' }}>Your Forge Library</h1>

      {/* Library Navigation Tabs */}
      <div className="channel-page-tabs" style={{ marginBottom: '24px' }}>
        <button
          onClick={() => handleTabChange('library')}
          className={`channel-page-tab ${activeTab === 'library' ? 'active' : ''}`}
        >
          Overview
        </button>
        <button
          onClick={() => handleTabChange('history')}
          className={`channel-page-tab ${activeTab === 'history' ? 'active' : ''}`}
        >
          History ({history.length})
        </button>
        <button
          onClick={() => handleTabChange('liked')}
          className={`channel-page-tab ${activeTab === 'liked' ? 'active' : ''}`}
        >
          Liked Streams ({likedVideos.length})
        </button>
        <button
          onClick={() => handleTabChange('watchlater')}
          className={`channel-page-tab ${activeTab === 'watchlater' ? 'active' : ''}`}
        >
          Watch Later ({watchLater.length})
        </button>
        <button
          onClick={() => handleTabChange('subscriptions')}
          className={`channel-page-tab ${activeTab === 'subscriptions' ? 'active' : ''}`}
        >
          Subscriptions ({subscribedChannels.length})
        </button>
      </div>

      {/* Tab Panels */}
      <div className="library-content">
        
        {/* OVERVIEW PANEL */}
        {activeTab === 'library' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* History Row Preview */}
            <div className="library-section">
              <div className="library-section-header">
                <h2 className="library-section-title">
                  <History size={20} />
                  <span>Recent History</span>
                </h2>
                {historyVideos.length > 0 && (
                  <button onClick={() => handleTabChange('history')} className="library-see-all-link">
                    See All
                  </button>
                )}
              </div>
              {historyVideos.length > 0 ? (
                <VideoGrid videos={historyVideos.slice(0, 4)} />
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Streams you watch will show up here.</p>
              )}
            </div>

            {/* Watch Later Preview */}
            <div className="library-section">
              <div className="library-section-header">
                <h2 className="library-section-title">
                  <Clock size={20} />
                  <span>Watch Later</span>
                </h2>
                {watchLaterVideos.length > 0 && (
                  <button onClick={() => handleTabChange('watchlater')} className="library-see-all-link">
                    See All
                  </button>
                )}
              </div>
              {watchLaterVideos.length > 0 ? (
                <VideoGrid videos={watchLaterVideos.slice(0, 4)} />
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Videos you save to watch later will list here.</p>
              )}
            </div>

            {/* Liked Videos Preview */}
            <div className="library-section">
              <div className="library-section-header">
                <h2 className="library-section-title">
                  <ThumbsUp size={20} />
                  <span>Liked Streams</span>
                </h2>
                {likedVideosList.length > 0 && (
                  <button onClick={() => handleTabChange('liked')} className="library-see-all-link">
                    See All
                  </button>
                )}
              </div>
              {likedVideosList.length > 0 ? (
                <VideoGrid videos={likedVideosList.slice(0, 4)} />
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Streams you like will be archived here.</p>
              )}
            </div>
          </div>
        )}

        {/* DETAILED HISTORY PANEL */}
        {activeTab === 'history' && (
          <div className="library-section">
            <div className="library-section-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px' }}>
              <h2 className="library-section-title">
                <History size={20} />
                <span>Watch History ({historyVideos.length})</span>
              </h2>
              {historyVideos.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="flex-center"
                  style={{ gap: '6px', color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 600 }}
                >
                  <Trash2 size={16} />
                  <span>Clear History</span>
                </button>
              )}
            </div>
            
            {historyVideos.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {historyVideos.map(video => (
                  <div key={video.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                    <div
                      onClick={() => navigate(`/watch/${video.id}`)}
                      style={{ display: 'flex', gap: '16px', cursor: 'pointer', flex: 1 }}
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        style={{ width: '120px', aspectRatio: '16/9', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{video.title}</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          Category: {video.category} &bull; {video.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromHistory(video.id)}
                      className="playlist-row-remove-btn"
                      title="Remove from history"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '40px 0' }}>
                Your history is clear. Start exploring streams!
              </p>
            )}
          </div>
        )}

        {/* DETAILED LIKED PANEL */}
        {activeTab === 'liked' && (
          <div className="library-section">
            <h2 className="library-section-title" style={{ marginBottom: '20px' }}>
              <ThumbsUp size={20} />
              <span>Liked Streams ({likedVideosList.length})</span>
            </h2>
            <VideoGrid videos={likedVideosList} />
          </div>
        )}

        {/* DETAILED WATCH LATER PANEL */}
        {activeTab === 'watchlater' && (
          <div className="library-section">
            <h2 className="library-section-title" style={{ marginBottom: '20px' }}>
              <Clock size={20} />
              <span>Watch Later ({watchLaterVideos.length})</span>
            </h2>
            <VideoGrid videos={watchLaterVideos} />
          </div>
        )}

        {/* DETAILED SUBSCRIPTIONS PANEL */}
        {activeTab === 'subscriptions' && (
          <div className="library-section">
            <h2 className="library-section-title" style={{ marginBottom: '24px' }}>
              <Users size={20} />
              <span>Subscribed Creators ({subscribedList.length})</span>
            </h2>
            {subscribedList.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {subscribedList.map(channel => (
                  <ChannelCard key={channel.id} channel={channel} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '40px 0' }}>
                You haven't subscribed to any creator channels yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
