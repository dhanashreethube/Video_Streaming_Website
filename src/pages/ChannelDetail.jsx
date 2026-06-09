import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, Calendar, Info, Play, ListMusic } from 'lucide-react';
import { useStreamForge } from '../context/StreamForgeContext';
import { CHANNELS, VIDEOS } from '../data/mockData';
import { formatViews } from '../components/VideoCard';
import VideoGrid from '../components/VideoGrid';
import { Loader } from '../components/Loader';

const ChannelDetail = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const { subscribedChannels, toggleSubscribeChannel } = useStreamForge();
  const [channel, setChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('videos'); // 'videos' | 'playlists' | 'about'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const foundChannel = CHANNELS.find(ch => ch.id === channelId);
    if (foundChannel) {
      setChannel(foundChannel);
      // Filter videos uploaded by this channel
      const uploads = VIDEOS.filter(v => v.channelId === channelId);
      setChannelVideos(uploads);
    } else {
      setChannel(null);
      setChannelVideos([]);
    }
    setLoading(false);
  }, [channelId]);

  if (loading) return <Loader message="Accessing creator forge..." />;
  if (!channel) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Creator Forge Not Found</h2>
        <p style={{ margin: '16px 0', color: 'var(--text-muted)' }}>The channel you are looking for may have been retired or renamed.</p>
        <button onClick={() => navigate('/')} className="glow-btn">Return Home</button>
      </div>
    );
  }

  const isSubscribed = subscribedChannels.includes(channel.id);
  const displaySubs = isSubscribed ? channel.subscribers + 1 : channel.subscribers;

  // Sum total views of this channel's videos
  const totalViews = channelVideos.reduce((sum, v) => sum + v.views, 0);

  return (
    <div className="channel-page-container page-transition">
      {/* Banner */}
      <div className="channel-banner-container">
        <img
          src={channel.banner}
          alt={`${channel.name} Banner`}
          className="channel-banner-img"
        />
      </div>

      {/* Profile Header */}
      <div className="channel-info-header">
        <div className="channel-profile-details">
          <img
            src={channel.avatar}
            alt={channel.name}
            className="channel-profile-avatar"
          />
          <div className="channel-profile-text">
            <h1 className="channel-profile-name">{channel.name}</h1>
            <p className="channel-profile-meta">
              <span>{channel.handle}</span>
              <span style={{ margin: '0 6px' }}>&bull;</span>
              <span>{formatViews(displaySubs)} subscribers</span>
              <span style={{ margin: '0 6px' }}>&bull;</span>
              <span>{channelVideos.length} videos</span>
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '600px' }} className="text-truncate">
              {channel.description}
            </p>
          </div>
        </div>

        <button
          onClick={() => toggleSubscribeChannel(channel.id)}
          className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
          style={{ padding: '10px 24px', fontSize: '0.9rem' }}
        >
          {isSubscribed ? (
            <span className="flex-center" style={{ gap: '6px' }}>
              <Check size={16} /> Subscribed
            </span>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="channel-page-tabs">
        <button
          onClick={() => setActiveTab('videos')}
          className={`channel-page-tab ${activeTab === 'videos' ? 'active' : ''}`}
        >
          Streams & Videos
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`channel-page-tab ${activeTab === 'about' ? 'active' : ''}`}
        >
          About Channel
        </button>
      </div>

      {/* Tab Panels */}
      <div className="channel-tab-content" style={{ marginTop: '12px' }}>
        {activeTab === 'videos' && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>Uploads</h2>
            <VideoGrid videos={channelVideos} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="channel-about-layout">
            <div className="channel-about-main text-left">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Description</h2>
              <p style={{ color: 'var(--text-color)', lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
                {channel.description}
              </p>
            </div>

            <div className="channel-about-stats">
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Stats</h2>
              <div className="about-stat-row">
                <Calendar size={18} className="text-muted" />
                <span>Joined {channel.joinedDate}</span>
              </div>
              <div className="about-stat-row">
                <Info size={18} className="text-muted" />
                <span>{formatViews(totalViews)} total stream views</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelDetail;
