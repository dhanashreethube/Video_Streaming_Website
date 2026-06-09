import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useStreamForge } from '../context/StreamForgeContext';
import { formatViews } from './VideoCard';

const ChannelCard = ({ channel }) => {
  const navigate = useNavigate();
  const { subscribedChannels, toggleSubscribeChannel } = useStreamForge();
  
  if (!channel) return null;
  const isSubscribed = subscribedChannels.includes(channel.id);

  const handleCardClick = () => {
    navigate(`/channel/${channel.id}`);
  };

  const handleSubscribeClick = (e) => {
    e.stopPropagation();
    toggleSubscribeChannel(channel.id);
  };

  // Adjust subscriber number if subscribed
  const displaySubs = isSubscribed ? channel.subscribers + 1 : channel.subscribers;

  return (
    <div className="channel-card-widget" onClick={handleCardClick}>
      <img
        src={channel.avatar}
        alt={channel.name}
        className="channel-card-avatar"
      />
      
      <div>
        <h3 className="channel-card-name">{channel.name}</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{channel.handle}</p>
      </div>

      <div className="channel-card-subs">
        <span>{formatViews(displaySubs)} subscribers</span>
        <span style={{ margin: '0 6px' }}>&bull;</span>
        <span>{channel.videoCount} videos</span>
      </div>

      <p className="channel-card-desc line-clamp-2">
        {channel.description || 'Welcome to the official creator channel on StreamForge.'}
      </p>

      <button
        onClick={handleSubscribeClick}
        className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
        style={{ width: '100%' }}
      >
        {isSubscribed ? (
          <span className="flex-center" style={{ gap: '6px' }}>
            <Check size={14} /> Subscribed
          </span>
        ) : (
          'Subscribe'
        )}
      </button>
    </div>
  );
};

export default ChannelCard;
