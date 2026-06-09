import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListMusic, Play } from 'lucide-react';
import { VIDEOS } from '../data/mockData';

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();

  // Find first video to use as thumbnail
  const firstVideoId = playlist.videos[0];
  const firstVideo = VIDEOS.find(v => v.id === firstVideoId);
  
  const coverImage = firstVideo
    ? firstVideo.thumbnailUrl
    : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'; // fallback abstract theme

  const handleCardClick = () => {
    navigate(`/playlists/${playlist.id}`);
  };

  return (
    <div className="playlist-card-container" onClick={handleCardClick} aria-label="Playlist Card">
      <div className="playlist-thumbnail-stack">
        {/* Layer Stack effect */}
        <div className="playlist-shadow-layer"></div>
        <img
          src={coverImage}
          alt={playlist.name}
          className="playlist-base-thumbnail"
        />
        <div className="playlist-overlay-side">
          <ListMusic size={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
            {playlist.videos.length} vids
          </span>
        </div>
      </div>

      <div className="playlist-card-info">
        <h3 className="playlist-card-title text-truncate" title={playlist.name}>
          {playlist.name}
        </h3>
        <p className="playlist-card-meta">
          <span>Created {playlist.createdAt}</span>
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;
