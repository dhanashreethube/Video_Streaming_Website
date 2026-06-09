import React from 'react';
import VideoCard from './VideoCard';
import { HelpCircle } from 'lucide-react';

const VideoGrid = ({ videos = [] }) => {
  if (videos.length === 0) {
    return (
      <div
        className="flex-center"
        style={{
          flexDirection: 'column',
          gap: '16px',
          minHeight: '300px',
          padding: '24px',
          border: '1px dashed var(--border-color)',
          borderRadius: '16px',
          backgroundColor: 'var(--surface-color)',
          marginTop: '16px'
        }}
      >
        <HelpCircle size={48} className="text-muted" style={{ strokeWidth: 1.5 }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>No Forge Streams Available</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '300px', textAlign: 'center' }}>
          We couldn't find any videos matching this category or query. Let's explore other topics!
        </p>
      </div>
    );
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
