import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStreamForge } from '../context/StreamForgeContext';
import { CHANNELS } from '../data/mockData';

export const formatViews = (views) => {
  if (views >= 1000000) {
    const formatted = (views / 1000000).toFixed(1);
    return formatted.endsWith('.0') ? formatted.slice(0, -2) + 'M' : formatted + 'M';
  }
  if (views >= 1000) {
    const formatted = (views / 1000).toFixed(1);
    return formatted.endsWith('.0') ? formatted.slice(0, -2) + 'K' : formatted + 'K';
  }
  return views;
};

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const { addToHistory } = useStreamForge();
  
  // Find channel details
  const channel = CHANNELS.find(ch => ch.id === video.channelId) || {
    name: 'Unknown Channel',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
  };

  const handlePlayVideo = () => {
    addToHistory(video.id);
    navigate(`/watch/${video.id}`);
  };

  const handleChannelClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${video.channelId}`);
  };

  return (
    <div className="video-card" onClick={handlePlayVideo}>
      <div className="video-thumbnail-wrapper">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="video-thumbnail"
          loading="lazy"
        />
        {video.isLive ? (
          <span className="video-live-badge">Live</span>
        ) : (
          <span className="video-duration">{video.duration}</span>
        )}
      </div>

      <div className="video-card-details">
        <img
          src={channel.avatar}
          alt={channel.name}
          className="video-channel-avatar"
          onClick={handleChannelClick}
          title={channel.name}
        />
        <div className="video-info-text">
          <h3 className="video-card-title line-clamp-2" title={video.title}>
            {video.title}
          </h3>
          <button
            onClick={handleChannelClick}
            className="video-channel-name text-truncate"
            title={channel.name}
          >
            {channel.name}
          </button>
          <div className="video-meta-stats text-truncate">
            <span>{formatViews(video.views)} views</span>
            <span className="video-meta-divider">{video.uploadedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
