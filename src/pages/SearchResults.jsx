import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Film, PlayCircle, HelpCircle } from 'lucide-react';
import { VIDEOS, CHANNELS } from '../data/mockData';
import { formatViews } from '../components/VideoCard';
import ChannelCard from '../components/ChannelCard';
import { useStreamForge } from '../context/StreamForgeContext';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToHistory } = useStreamForge();
  const query = searchParams.get('q') || '';

  // Filter and Sorting state
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance' | 'date' | 'views'
  const [filterType, setFilterType] = useState('all'); // 'all' | 'live' | 'videos'

  const [filteredVideos, setFilteredVideos] = useState([]);
  const [matchedChannels, setMatchedChannels] = useState([]);

  useEffect(() => {
    if (!query) return;

    const lowerQuery = query.toLowerCase();

    // 1. Find matching channels
    const channelsMatch = CHANNELS.filter(
      ch => ch.name.toLowerCase().includes(lowerQuery) || ch.handle.toLowerCase().includes(lowerQuery)
    );
    setMatchedChannels(channelsMatch);

    // 2. Find matching videos
    let videosMatch = VIDEOS.filter(
      v =>
        v.title.toLowerCase().includes(lowerQuery) ||
        v.category.toLowerCase().includes(lowerQuery) ||
        v.description.toLowerCase().includes(lowerQuery)
    );

    // If query is 'trending', grab all trending videos
    if (lowerQuery === 'trending') {
      videosMatch = VIDEOS.filter(v => v.isTrending);
    }

    // Apply Filter Type
    if (filterType === 'live') {
      videosMatch = videosMatch.filter(v => v.isLive);
    } else if (filterType === 'videos') {
      videosMatch = videosMatch.filter(v => !v.isLive);
    }

    // Apply Sorting
    if (sortBy === 'date') {
      // Since upload dates are mock strings (e.g. "2 hours ago", "5 days ago"),
      // we sort with a simple mock heuristic: LIVE > hours > days > weeks > months
      const getWeight = (uploadedStr) => {
        if (uploadedStr.includes('LIVE')) return 0;
        if (uploadedStr.includes('hour')) return 1;
        if (uploadedStr.includes('day')) return 2;
        if (uploadedStr.includes('week')) return 3;
        if (uploadedStr.includes('month')) return 4;
        return 5;
      };
      videosMatch.sort((a, b) => getWeight(a.uploadedAt) - getWeight(b.uploadedAt));
    } else if (sortBy === 'views') {
      videosMatch.sort((a, b) => b.views - a.views);
    }

    setFilteredVideos(videosMatch);
  }, [query, sortBy, filterType]);

  const handlePlayVideo = (video) => {
    addToHistory(video.id);
    navigate(`/watch/${video.id}`);
  };

  return (
    <div className="search-results-container page-transition text-left">
      <div className="search-header-row">
        <h1 className="search-query-title">
          {query.toLowerCase() === 'trending' ? (
            <span>Trending Feed</span>
          ) : (
            <span>Search results for: <span style={{ color: 'var(--accent-color)' }}>"{query}"</span></span>
          )}
        </h1>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="search-filter-toggle action-pill-btn"
          aria-expanded={showFilters}
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </button>
      </div>

      {/* Expandable filters box */}
      {showFilters && (
        <div className="search-filters-drawer">
          <div className="filter-group">
            <span className="filter-group-title flex-center" style={{ justifyContent: 'flex-start', gap: '6px' }}>
              <ArrowUpDown size={12} />
              Sort By
            </span>
            <button
              onClick={() => setSortBy('relevance')}
              className={`filter-option-btn ${sortBy === 'relevance' ? 'active' : ''}`}
            >
              Relevance
            </button>
            <button
              onClick={() => setSortBy('date')}
              className={`filter-option-btn ${sortBy === 'date' ? 'active' : ''}`}
            >
              Upload Date
            </button>
            <button
              onClick={() => setSortBy('views')}
              className={`filter-option-btn ${sortBy === 'views' ? 'active' : ''}`}
            >
              View Count
            </button>
          </div>

          <div className="filter-group">
            <span className="filter-group-title flex-center" style={{ justifyContent: 'flex-start', gap: '6px' }}>
              <Film size={12} />
              Type
            </span>
            <button
              onClick={() => setFilterType('all')}
              className={`filter-option-btn ${filterType === 'all' ? 'active' : ''}`}
            >
              All Content
            </button>
            <button
              onClick={() => setFilterType('live')}
              className={`filter-option-btn ${filterType === 'live' ? 'active' : ''}`}
            >
              Live Streams
            </button>
            <button
              onClick={() => setFilterType('videos')}
              className={`filter-option-btn ${filterType === 'videos' ? 'active' : ''}`}
            >
              Completed Videos
            </button>
          </div>
        </div>
      )}

      {/* Matched Channels Section */}
      {matchedChannels.length > 0 && filterType === 'all' && (
        <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
          <h2 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Channels matching query
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {matchedChannels.map(channel => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </div>
      )}

      {/* Video Results list */}
      <div className="search-results-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => {
            const channel = CHANNELS.find(ch => ch.id === video.channelId) || {
              name: 'Forge Creator',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
            };

            return (
              <div
                key={video.id}
                className="search-result-row-card"
                onClick={() => handlePlayVideo(video)}
              >
                <div className="search-result-thumbnail-wrapper">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="search-result-thumbnail"
                    loading="lazy"
                  />
                  {video.isLive ? (
                    <span className="video-live-badge">Live</span>
                  ) : (
                    <span className="video-duration">{video.duration}</span>
                  )}
                </div>

                <div className="search-result-info">
                  <h2 className="search-result-title line-clamp-2" title={video.title}>
                    {video.title}
                  </h2>
                  <div className="search-result-stats">
                    <span>{formatViews(video.views)} views</span>
                    <span className="video-meta-divider">{video.uploadedAt}</span>
                  </div>

                  <div className="search-result-channel-avatar-name" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={channel.avatar}
                      alt={channel.name}
                      className="search-result-avatar"
                      onClick={() => navigate(`/channel/${video.channelId}`)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span
                      className="search-result-channel-name"
                      onClick={() => navigate(`/channel/${video.channelId}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {channel.name}
                    </span>
                  </div>

                  <p className="search-result-description line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            );
          })
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
            <HelpCircle size={48} className="text-muted" style={{ strokeWidth: 1.5 }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>No results matched your search</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '350px', textAlign: 'center' }}>
              Check your spelling or try search terms matching category names like Gaming, Tech, Music, or Education.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
