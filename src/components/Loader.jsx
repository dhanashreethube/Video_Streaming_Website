import React from 'react';

export const Loader = ({ message = 'Loading StreamForge...' }) => {
  return (
    <div className="loader-spinner-container">
      <div className="loader-spinner"></div>
      <p className="loader-text">{message}</p>
    </div>
  );
};

export const VideoCardSkeleton = () => {
  return (
    <div className="video-card">
      <div className="video-thumbnail-wrapper skeleton" style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}></div>
      <div className="video-card-details">
        <div className="video-channel-avatar skeleton" style={{ width: '36px', height: '36px' }}></div>
        <div className="video-info-text" style={{ gap: '8px', flex: 1 }}>
          <div className="skeleton" style={{ height: '16px', width: '90%', borderRadius: '4px' }}></div>
          <div className="skeleton" style={{ height: '12px', width: '50%', borderRadius: '4px' }}></div>
          <div className="skeleton" style={{ height: '10px', width: '40%', borderRadius: '4px' }}></div>
        </div>
      </div>
    </div>
  );
};

export const VideoGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="video-grid">
      {Array.from({ length: count }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const FeaturedSkeleton = () => {
  return (
    <div className="featured-video skeleton" style={{ aspectRatio: '21/9', minHeight: '280px', width: '100%', border: 'none' }}></div>
  );
};

export const WatchSkeleton = () => {
  return (
    <div className="watch-page-container">
      <div className="watch-main-column">
        <div className="custom-player-container skeleton"></div>
        <div className="skeleton" style={{ height: '32px', width: '80%', borderRadius: '6px', marginTop: '12px' }}></div>
        <div className="skeleton" style={{ height: '50px', width: '100%', borderRadius: '12px' }}></div>
      </div>
      <div className="watch-sidebar-column">
        <div className="skeleton" style={{ height: '24px', width: '50%', borderRadius: '4px' }}></div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <div className="skeleton" style={{ width: '120px', aspectRatio: '16/9', borderRadius: '6px', flexShrink: 0 }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <div className="skeleton" style={{ height: '14px', width: '90%', borderRadius: '4px' }}></div>
              <div className="skeleton" style={{ height: '10px', width: '60%', borderRadius: '4px' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
