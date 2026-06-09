import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { useStreamForge } from '../context/StreamForgeContext';
import { CHANNELS } from '../data/mockData';
import { formatViews } from './VideoCard';

const FeaturedVideo = ({ video }) => {
  const navigate = useNavigate();
  const { addToHistory } = useStreamForge();
  
  if (!video) return null;

  const channel = CHANNELS.find(ch => ch.id === video.channelId) || {
    name: 'Forge Creator',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
  };

  const handlePlayVideo = () => {
    addToHistory(video.id);
    navigate(`/watch/${video.id}`);
  };

  return (
    <section className="featured-video" onClick={handlePlayVideo} aria-label="Featured Stream">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="featured-backdrop"
      />
      <div className="featured-gradient"></div>
      
      <div className="featured-content">
        <span className="featured-badge">Featured Stream</span>
        <h2 className="featured-title">{video.title}</h2>
        <p className="featured-description line-clamp-2">{video.description}</p>
        
        <div className="featured-channel">
          <img
            src={channel.avatar}
            alt={channel.name}
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{channel.name}</span>
          <span style={{ fontSize: '0.8rem', color: '#ccc' }}>
            &bull; {formatViews(video.views)} views &bull; {video.uploadedAt}
          </span>
        </div>

        <div className="featured-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={handlePlayVideo} className="glow-btn flex-center" style={{ gap: '8px' }}>
            <Play size={18} fill="currentColor" />
            <span>Play Now</span>
          </button>
          
          <button
            onClick={() => navigate(`/channel/${video.channelId}`)}
            className="action-pill-btn flex-center"
            style={{ gap: '8px', background: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.2)', color: '#fff' }}
          >
            <Info size={18} />
            <span>Channel Info</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;
