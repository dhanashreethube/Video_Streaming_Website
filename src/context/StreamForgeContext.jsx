import React, { createContext, useContext, useState, useEffect } from 'react';
import { VIDEOS } from '../data/mockData';

const StreamForgeContext = createContext(null);

export const useStreamForge = () => {
  const context = useContext(StreamForgeContext);
  if (!context) {
    throw new Error('useStreamForge must be used within a StreamForgeProvider');
  }
  return context;
};

export const StreamForgeProvider = ({ children }) => {
  // --- Theme ---
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sf-theme') || 'dark';
  });

  // --- Sidebar Collapse ---
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // --- Liked / Disliked Videos ---
  const [likedVideos, setLikedVideos] = useState(() => {
    const saved = localStorage.getItem('sf-liked');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [dislikedVideos, setDislikedVideos] = useState(() => {
    const saved = localStorage.getItem('sf-disliked');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Subscriptions ---
  const [subscribedChannels, setSubscribedChannels] = useState(() => {
    const saved = localStorage.getItem('sf-subscribed');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Watch Later ---
  const [watchLater, setWatchLater] = useState(() => {
    const saved = localStorage.getItem('sf-watchlater');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Watch History ---
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('sf-history');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Playlists ---
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem('sf-playlists');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 'pl-favorites',
        name: 'My Favorites',
        description: 'Vids that stand out!',
        videos: [],
        createdAt: new Date().toLocaleDateString()
      }
    ];
  });

  // --- Search Suggestions ---
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Sync to Local Storage
  useEffect(() => {
    localStorage.setItem('sf-theme', theme);
    document.body.className = theme === 'light' ? 'light-theme' : '';
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sf-liked', JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    localStorage.setItem('sf-disliked', JSON.stringify(dislikedVideos));
  }, [dislikedVideos]);

  useEffect(() => {
    localStorage.setItem('sf-subscribed', JSON.stringify(subscribedChannels));
  }, [subscribedChannels]);

  useEffect(() => {
    localStorage.setItem('sf-watchlater', JSON.stringify(watchLater));
  }, [watchLater]);

  useEffect(() => {
    localStorage.setItem('sf-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('sf-playlists', JSON.stringify(playlists));
  }, [playlists]);

  // Generate Search Suggestions dynamically based on available video titles
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = VIDEOS.filter(
      v => v.title.toLowerCase().includes(query) || v.category.toLowerCase().includes(query)
    )
      .map(v => v.title)
      .slice(0, 5);
    setSuggestions(filtered);
  }, [searchQuery]);

  // --- Action Functions ---

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLikeVideo = (videoId) => {
    setLikedVideos(prev => {
      const isLiked = prev.includes(videoId);
      if (isLiked) {
        return prev.filter(id => id !== videoId);
      } else {
        // Remove from dislike if it was disliked
        setDislikedVideos(d => d.filter(id => id !== videoId));
        return [...prev, videoId];
      }
    });
  };

  const toggleDislikeVideo = (videoId) => {
    setDislikedVideos(prev => {
      const isDisliked = prev.includes(videoId);
      if (isDisliked) {
        return prev.filter(id => id !== videoId);
      } else {
        // Remove from like if it was liked
        setLikedVideos(l => l.filter(id => id !== videoId));
        return [...prev, videoId];
      }
    });
  };

  const toggleSubscribeChannel = (channelId) => {
    setSubscribedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const toggleWatchLater = (videoId) => {
    setWatchLater(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const addToHistory = (videoId) => {
    setHistory(prev => {
      // Remove it first to bubble it to the top/front of history
      const filtered = prev.filter(id => id !== videoId);
      return [videoId, ...filtered].slice(0, 50); // limit history to 50 items
    });
  };

  const removeFromHistory = (videoId) => {
    setHistory(prev => prev.filter(id => id !== videoId));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // --- Playlist Operations ---

  const createPlaylist = (name, description = '') => {
    const newPlaylist = {
      id: `pl-${Date.now()}`,
      name,
      description,
      videos: [],
      createdAt: new Date().toLocaleDateString()
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(prev => prev.filter(pl => pl.id !== playlistId));
  };

  const addVideoToPlaylist = (playlistId, videoId) => {
    setPlaylists(prev =>
      prev.map(pl => {
        if (pl.id === playlistId) {
          if (pl.videos.includes(videoId)) return pl; // Avoid duplicates
          return { ...pl, videos: [...pl.videos, videoId] };
        }
        return pl;
      })
    );
  };

  const removeVideoFromPlaylist = (playlistId, videoId) => {
    setPlaylists(prev =>
      prev.map(pl => {
        if (pl.id === playlistId) {
          return { ...pl, videos: pl.videos.filter(id => id !== videoId) };
        }
        return pl;
      })
    );
  };

  return (
    <StreamForgeContext.Provider
      value={{
        theme,
        toggleTheme,
        sidebarOpen,
        setSidebarOpen,
        likedVideos,
        toggleLikeVideo,
        dislikedVideos,
        toggleDislikeVideo,
        subscribedChannels,
        toggleSubscribeChannel,
        watchLater,
        toggleWatchLater,
        history,
        addToHistory,
        removeFromHistory,
        clearHistory,
        playlists,
        createPlaylist,
        deletePlaylist,
        addVideoToPlaylist,
        removeVideoFromPlaylist,
        searchQuery,
        setSearchQuery,
        suggestions
      }}
    >
      {children}
    </StreamForgeContext.Provider>
  );
};
