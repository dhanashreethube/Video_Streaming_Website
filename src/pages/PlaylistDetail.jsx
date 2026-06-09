import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2, Play, ListMusic, ArrowLeft, Heart } from 'lucide-react';
import { useStreamForge } from '../context/StreamForgeContext';
import { VIDEOS } from '../data/mockData';
import { Loader } from '../components/Loader';

const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { playlists, deletePlaylist, removeVideoFromPlaylist } = useStreamForge();

  const playlist = playlists.find(pl => pl.id === playlistId);

  if (!playlist) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Playlist Not Found</h2>
        <p style={{ margin: '16px 0', color: 'var(--text-muted)' }}>This playlist may have been deleted.</p>
        <button onClick={() => navigate('/playlists')} className="glow-btn">Back to Playlists</button>
      </div>
    );
  }

  // Map video IDs to actual video objects
  const playlistVideos = playlist.videos
    .map(id => VIDEOS.find(v => v.id === id))
    .filter(Boolean);

  const handleDeletePlaylist = () => {
    if (window.confirm(`Are you sure you want to delete the playlist "${playlist.name}"?`)) {
      deletePlaylist(playlist.id);
      navigate('/playlists');
    }
  };

  const handlePlayAll = () => {
    if (playlistVideos.length > 0) {
      navigate(`/watch/${playlistVideos[0].id}`);
    }
  };

  const coverImage = playlistVideos.length > 0
    ? playlistVideos[0].thumbnailUrl
    : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';

  return (
    <div className="playlist-detail-container page-transition text-left">
      {/* Sidebar Details cover */}
      <div className="playlist-sidebar-summary">
        <button
          onClick={() => navigate('/playlists')}
          className="flex-center"
          style={{ gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, width: 'fit-content', marginBottom: '8px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Playlists</span>
        </button>

        <img
          src={coverImage}
          alt={playlist.name}
          className="playlist-detail-cover"
        />

        <h1 className="playlist-summary-title">{playlist.name}</h1>
        
        <p className="playlist-summary-stats">
          <span>{playlistVideos.length} videos</span>
          <span style={{ margin: '0 8px' }}>&bull;</span>
          <span>Created {playlist.createdAt}</span>
        </p>

        {playlist.description && (
          <p className="playlist-summary-description">{playlist.description}</p>
        )}

        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <button
            onClick={handlePlayAll}
            disabled={playlistVideos.length === 0}
            className="glow-btn flex-center"
            style={{ flex: 1, gap: '8px', opacity: playlistVideos.length === 0 ? 0.6 : 1 }}
          >
            <Play size={18} fill="currentColor" />
            <span>Play All</span>
          </button>

          {/* Delete playlist button (Default playlists cannot be deleted by design if desired, but here we can allow deleting any custom list) */}
          {playlist.id !== 'pl-favorites' && (
            <button
              onClick={handleDeletePlaylist}
              className="action-pill-btn flex-center"
              style={{ color: 'var(--accent-color)', borderColor: 'rgba(255, 77, 77, 0.2)' }}
              title="Delete Playlist"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Right List Column */}
      <div className="playlist-list-column">
        {playlistVideos.length > 0 ? (
          playlistVideos.map((video, idx) => (
            <div key={video.id} className="playlist-item-row">
              <span className="playlist-row-num">{idx + 1}</span>
              
              <div
                onClick={() => navigate(`/watch/${video.id}`)}
                className="playlist-row-thumb-wrapper"
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="playlist-row-thumb"
                />
              </div>

              <div
                onClick={() => navigate(`/watch/${video.id}`)}
                className="playlist-row-info"
                style={{ cursor: 'pointer' }}
              >
                <h3 className="playlist-row-title text-truncate" title={video.title}>{video.title}</h3>
                <span className="playlist-row-channel">Category: {video.category} &bull; duration: {video.duration}</span>
              </div>

              <button
                onClick={() => removeVideoFromPlaylist(playlist.id, video.id)}
                className="playlist-row-remove-btn"
                title="Remove video"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <div
            className="flex-center"
            style={{
              flexDirection: 'column',
              gap: '16px',
              minHeight: '300px',
              border: '1px dashed var(--border-color)',
              borderRadius: '16px',
              backgroundColor: 'var(--surface-color)',
              padding: '24px'
            }}
          >
            <ListMusic size={48} className="text-muted" style={{ strokeWidth: 1.5 }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Forge playlist is empty</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '300px', textAlign: 'center' }}>
              Explore gaming or technology streams, click the Save button and add them here.
            </p>
            <button onClick={() => navigate('/')} className="glow-btn">Browse Streams</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetail;
