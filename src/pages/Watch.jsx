import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, FolderPlus, Send, MessageSquare, Check, X, Plus } from 'lucide-react';
import { useStreamForge } from '../context/StreamForgeContext';
import { VIDEOS, CHANNELS, MOCK_USER } from '../data/mockData';
import VideoPlayer from '../components/VideoPlayer';
import { formatViews } from '../components/VideoCard';
import { Loader } from '../components/Loader';

const Watch = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const {
    likedVideos,
    toggleLikeVideo,
    dislikedVideos,
    toggleDislikeVideo,
    subscribedChannels,
    toggleSubscribeChannel,
    watchLater,
    toggleWatchLater,
    playlists,
    createPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    addToHistory
  } = useStreamForge();

  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState([]);
  
  // Modals & Popups States
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    const foundVideo = VIDEOS.find(v => v.id === videoId);
    if (foundVideo) {
      setVideo(foundVideo);
      setLocalComments(foundVideo.comments || []);
      const foundChannel = CHANNELS.find(ch => ch.id === foundVideo.channelId);
      setChannel(foundChannel);
      addToHistory(foundVideo.id);
    } else {
      setVideo(null);
      setChannel(null);
    }
    setLoading(false);
    
    // Scroll to top when loading new video
    window.scrollTo(0, 0);
  }, [videoId]);

  if (loading) return <Loader message="Setting up stream..." />;
  if (!video) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Stream Not Found</h2>
        <p style={{ margin: '16px 0', color: 'var(--text-muted)' }}>The video you are looking for may have been deleted or archived.</p>
        <button onClick={() => navigate('/')} className="glow-btn">Return Home</button>
      </div>
    );
  }

  const isLiked = likedVideos.includes(video.id);
  const isDisliked = dislikedVideos.includes(video.id);
  const isSubscribed = subscribedChannels.includes(video.channelId);
  const isSavedWatchLater = watchLater.includes(video.id);

  // Likes calculation
  const currentLikes = isLiked ? video.likes + 1 : video.likes;
  const currentSubs = isSubscribed ? (channel?.subscribers || 0) + 1 : (channel?.subscribers || 0);

  const handleShare = () => {
    const videoUrl = window.location.href;
    navigator.clipboard.writeText(videoUrl)
      .then(() => {
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2500);
      })
      .catch((err) => console.error('Could not copy URL:', err));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      userName: MOCK_USER.name,
      userAvatar: MOCK_USER.avatar,
      text: commentText.trim(),
      timestamp: 'Just now',
      likes: 0
    };

    setLocalComments(prev => [newComment, ...prev]);
    setCommentText('');
  };

  const handleCreatePlaylistSubmit = (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    const pl = createPlaylist(newPlaylistName.trim(), newPlaylistDesc.trim());
    addVideoToPlaylist(pl.id, video.id);
    setNewPlaylistName('');
    setNewPlaylistDesc('');
    setShowCreateForm(false);
  };

  const handlePlaylistCheckboxChange = (playlistId, isChecked) => {
    if (isChecked) {
      addVideoToPlaylist(playlistId, video.id);
    } else {
      removeVideoFromPlaylist(playlistId, video.id);
    }
  };

  // Find recommended videos: exclude current video, prefer same category
  const recommendations = VIDEOS.filter(v => v.id !== video.id)
    .sort((a, b) => (b.category === video.category ? 1 : 0) - (a.category === video.category ? 1 : 0));

  return (
    <div className="watch-page-container page-transition">
      {/* Main Video Section */}
      <div className="watch-main-column">
        <VideoPlayer videoUrl={video.videoUrl} poster={video.thumbnailUrl} />

        <h1 className="watch-video-title">{video.title}</h1>

        <div className="watch-actions-bar">
          <div className="watch-channel-info">
            {channel && (
              <>
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="watch-channel-avatar"
                  onClick={() => navigate(`/channel/${channel.id}`)}
                  style={{ cursor: 'pointer' }}
                />
                <div className="watch-channel-name-subs">
                  <span
                    className="watch-channel-name"
                    onClick={() => navigate(`/channel/${channel.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {channel.name}
                  </span>
                  <span className="watch-channel-subs">{formatViews(currentSubs)} subscribers</span>
                </div>
                <button
                  onClick={() => toggleSubscribeChannel(channel.id)}
                  className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
                  style={{ marginLeft: '12px' }}
                >
                  {isSubscribed ? (
                    <span className="flex-center" style={{ gap: '6px' }}>
                      <Check size={14} /> Subscribed
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </>
            )}
          </div>

          <div className="watch-interactions-left">
            <div className="like-dislike-group">
              <button
                onClick={() => toggleLikeVideo(video.id)}
                className={`like-btn ${isLiked ? 'active' : ''}`}
                title="Like this stream"
              >
                <ThumbsUp size={16} fill={isLiked ? 'currentColor' : 'none'} />
                <span>{formatViews(currentLikes)}</span>
              </button>
              <button
                onClick={() => toggleDislikeVideo(video.id)}
                className={`dislike-btn ${isDisliked ? 'active' : ''}`}
                title="Dislike this stream"
              >
                <ThumbsDown size={16} fill={isDisliked ? 'currentColor' : 'none'} />
              </button>
            </div>

            <button
              onClick={handleShare}
              className="action-pill-btn flex-center"
              style={{ gap: '6px', position: 'relative' }}
              title="Share stream"
            >
              <Share2 size={16} />
              <span>Share</span>
              
              {showShareTooltip && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 10px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--accent-color)',
                    color: 'var(--text-inverse)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    zIndex: 100
                  }}
                >
                  Link copied!
                </div>
              )}
            </button>

            <button
              onClick={() => setShowPlaylistModal(true)}
              className="action-pill-btn flex-center"
              style={{ gap: '6px' }}
              title="Save to playlist"
            >
              <FolderPlus size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Description Box */}
        <div className="watch-description-box">
          <div className="watch-description-header">
            <span>{formatViews(video.views)} views</span>
            <span>&bull;</span>
            <span>{video.uploadedAt}</span>
            <span style={{ color: 'var(--accent-color)', cursor: 'pointer' }}>#{video.category}</span>
          </div>
          <p className="watch-description-text">{video.description}</p>
        </div>

        {/* Comments Section */}
        <div className="watch-comments-section">
          <h2 className="comments-count-title flex-center" style={{ justifyContent: 'flex-start', gap: '8px' }}>
            <MessageSquare size={20} />
            <span>{localComments.length} Comments</span>
          </h2>

          <div className="comment-input-row">
            <img src={MOCK_USER.avatar} alt="You" className="comment-input-avatar" />
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <input
                type="text"
                placeholder="Join the stream conversation..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="comment-textbox"
              />
              {commentText && (
                <div className="comment-submit-actions">
                  <button
                    type="button"
                    onClick={() => setCommentText('')}
                    className="comment-btn-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="comment-btn-submit flex-center"
                    style={{ gap: '6px' }}
                  >
                    <Send size={12} />
                    <span>Comment</span>
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="comments-list">
            {localComments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="comment-item-avatar"
                />
                <div className="comment-item-content">
                  <div className="comment-item-header">
                    <span className="comment-item-author">{comment.userName}</span>
                    <span className="comment-item-time">{comment.timestamp}</span>
                  </div>
                  <p className="comment-item-text">{comment.text}</p>
                  <div className="comment-item-actions">
                    <button className="comment-action-btn">
                      <ThumbsUp size={12} />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Sidebar Column */}
      <div className="watch-sidebar-column">
        <h2 className="recommended-title">Recommended Streams</h2>
        <div className="recommended-list">
          {recommendations.map((recVideo) => {
            const recChannel = CHANNELS.find(ch => ch.id === recVideo.channelId);
            return (
              <div
                key={recVideo.id}
                className="recommended-card"
                onClick={() => navigate(`/watch/${recVideo.id}`)}
              >
                <div className="recommended-thumbnail-wrapper">
                  <img
                    src={recVideo.thumbnailUrl}
                    alt={recVideo.title}
                    className="recommended-thumbnail"
                  />
                  {recVideo.isLive ? (
                    <span className="video-live-badge" style={{ fontSize: '0.65rem', padding: '1px 4px' }}>Live</span>
                  ) : (
                    <span className="video-duration" style={{ fontSize: '0.65rem', padding: '1px 4px' }}>{recVideo.duration}</span>
                  )}
                </div>
                <div className="recommended-info">
                  <h3 className="recommended-video-title line-clamp-2" title={recVideo.title}>
                    {recVideo.title}
                  </h3>
                  <span className="recommended-channel">{recChannel?.name}</span>
                  <span className="recommended-stats">
                    {formatViews(recVideo.views)} views &bull; {recVideo.uploadedAt}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Playlist Saving Modal Dialog */}
      {showPlaylistModal && (
        <div className="modal-overlay" onClick={() => setShowPlaylistModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Save to Playlist</h2>
              <button onClick={() => setShowPlaylistModal(false)} className="modal-close-btn" aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginMaxHeight: '200px', overflowY: 'auto', paddingRight: '8px', marginBottom: '20px' }}>
              {/* Default List: Watch Later */}
              <label className="flex-center" style={{ justifyContent: 'flex-start', gap: '12px', fontSize: '0.95rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isSavedWatchLater}
                  onChange={(e) => toggleWatchLater(video.id)}
                  style={{ accentColor: 'var(--accent-color)', width: '16px', height: '16px' }}
                />
                <span>Watch Later</span>
              </label>

              {/* User Custom Playlists */}
              {playlists.map((pl) => (
                <label
                  key={pl.id}
                  className="flex-center"
                  style={{ justifyContent: 'flex-start', gap: '12px', fontSize: '0.95rem', cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    checked={pl.videos.includes(video.id)}
                    onChange={(e) => handlePlaylistCheckboxChange(pl.id, e.target.checked)}
                    style={{ accentColor: 'var(--accent-color)', width: '16px', height: '16px' }}
                  />
                  <span className="text-truncate">{pl.name}</span>
                </label>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              {!showCreateForm ? (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="flex-center"
                  style={{ gap: '8px', color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem' }}
                >
                  <Plus size={16} />
                  <span>Create new playlist</span>
                </button>
              ) : (
                <form onSubmit={handleCreatePlaylistSubmit}>
                  <div className="modal-form-group">
                    <label className="modal-label">Playlist Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter playlist name..."
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      className="modal-input"
                    />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Description (Optional)</label>
                    <textarea
                      placeholder="Enter description..."
                      value={newPlaylistDesc}
                      onChange={(e) => setNewPlaylistDesc(e.target.value)}
                      className="modal-textarea"
                      style={{ minHeight: '60px' }}
                    />
                  </div>
                  <div className="modal-actions">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="modal-cancel-btn"
                      style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="glow-btn"
                      style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                    >
                      Create
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;
