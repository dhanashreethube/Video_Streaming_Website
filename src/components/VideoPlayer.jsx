import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

const VideoPlayer = ({ videoUrl, poster }) => {
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCenterIcon, setShowCenterIcon] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    // Reset player state when video URL changes
    setIsPlaying(false);
    setCurrentTime(0);
    setProgress(0);
    setEnded(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  const togglePlay = () => {
    if (ended) {
      // Replay
      setEnded(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(err => console.log('Player autoplay error:', err));
        setIsPlaying(true);
      }
      setShowCenterIcon(true);
      setTimeout(() => setShowCenterIcon(false), 500);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      setCurrentTime(cur);
      if (duration > 0) {
        setProgress((cur / duration) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setEnded(true);
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newPercentage = clickX / width;
      const newTime = newPercentage * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(newPercentage * 100);
      if (ended) setEnded(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      const nextMuted = val === 0;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const toggleFullscreen = () => {
    if (playerContainerRef.current) {
      if (!document.fullscreenElement) {
        playerContainerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Format time (e.g. 02:30)
  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      ref={playerContainerRef}
      className="custom-player-container"
      onClick={togglePlay}
      style={{ cursor: 'pointer' }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        className="html5-video-element"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
        playsInline
      />

      {/* Action Center Icon popup */}
      {showCenterIcon && (
        <div className="player-hover-overlay" style={{ opacity: 1 }}>
          <div className="play-center-btn">
            {isPlaying ? <Play size={28} fill="currentColor" /> : <Pause size={28} fill="currentColor" />}
          </div>
        </div>
      )}

      {ended && (
        <div className="player-hover-overlay" style={{ opacity: 1 }}>
          <div className="play-center-btn" title="Replay">
            <RotateCcw size={28} />
          </div>
        </div>
      )}

      {/* Control Banner Overlay */}
      <div className="video-control-banner" onClick={(e) => e.stopPropagation()}>
        {/* Progress Bar scrubber */}
        <div className="player-progress-bar" onClick={handleProgressClick}>
          <div
            className="player-progress-filled"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="player-controls-row">
          <div className="player-controls-left">
            <button
              onClick={togglePlay}
              title={isPlaying ? 'Pause' : 'Play'}
              className="nav-icon-btn"
              style={{ color: '#fff' }}
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={toggleMute}
                title={isMuted ? 'Unmute' : 'Mute'}
                className="nav-icon-btn"
                style={{ color: '#fff' }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                style={{
                  width: '60px',
                  accentColor: 'var(--accent-color)',
                  height: '4px',
                  cursor: 'pointer'
                }}
                title="Volume"
              />
            </div>

            <span className="player-time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div>
            <button
              onClick={toggleFullscreen}
              title="Fullscreen"
              className="nav-icon-btn"
              style={{ color: '#fff' }}
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
