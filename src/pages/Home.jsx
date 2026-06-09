import React, { useState, useEffect, useRef } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import FeaturedVideo from '../components/FeaturedVideo';
import VideoGrid from '../components/VideoGrid';
import { Loader } from '../components/Loader';
import { VIDEOS } from '../data/mockData';
import { Flame, Compass } from 'lucide-react';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const loadMoreRef = useRef(null);

  // Filter videos based on category
  const filteredVideos = activeCategory === 'All'
    ? VIDEOS
    : VIDEOS.filter(v => v.category === activeCategory);

  // Reset pagination on category change
  useEffect(() => {
    setDisplayedVideos(filteredVideos.slice(0, 6));
    setPageNum(1);
    setHasMore(filteredVideos.length > 6);
  }, [activeCategory]);

  // Handle infinite scroll simulation
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 150
      ) {
        if (!loadingMore && hasMore) {
          triggerLoadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore, filteredVideos, pageNum]);

  const triggerLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const nextBatchIndex = pageNum * 6;
      const nextBatch = filteredVideos.slice(nextBatchIndex, nextBatchIndex + 6);
      
      // If we run out of unique videos, duplicate some to simulate a endless feed
      let finalBatch = [...nextBatch];
      if (finalBatch.length === 0) {
        // Grab some from the beginning to keep the scroll endless
        finalBatch = filteredVideos.slice(0, 4).map(v => ({
          ...v,
          id: `${v.id}-dup-${Date.now()}` // guarantee unique key
        }));
      }

      setDisplayedVideos(prev => [...prev, ...finalBatch]);
      setPageNum(prev => prev + 1);
      setLoadingMore(false);
      
      // Limit infinite scroll simulation after 4 pages
      if (pageNum >= 4) {
        setHasMore(false);
      }
    }, 1000);
  };

  // Find first featured video
  const featuredVideo = VIDEOS.find(v => v.isFeatured);
  
  // Find trending videos
  const trendingVideos = VIDEOS.filter(v => v.isTrending && v.id !== featuredVideo?.id);

  // Exclude featured and trending from "Recommended" on initial load to avoid duplication
  const recommendedBase = activeCategory === 'All'
    ? displayedVideos.filter(v => v.id !== featuredVideo?.id && !v.isTrending)
    : displayedVideos;

  return (
    <div className="home-page-container page-transition">
      <CategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {activeCategory === 'All' && pageNum === 1 && (
        <>
          <FeaturedVideo video={featuredVideo} />
          
          <h2 className="home-section-header">
            <Flame size={20} className="trending-fire-icon" fill="currentColor" />
            <span>Trending Streamers</span>
          </h2>
          <VideoGrid videos={trendingVideos} />

          <h2 className="home-section-header" style={{ marginTop: '36px' }}>
            <Compass size={20} className="trending-fire-icon" />
            <span>Recommended for You</span>
          </h2>
        </>
      )}

      {activeCategory !== 'All' && (
        <h2 className="home-section-header">
          <span>{activeCategory} Streams</span>
        </h2>
      )}

      <VideoGrid videos={activeCategory === 'All' && pageNum === 1 ? recommendedBase : displayedVideos} />

      {loadingMore && (
        <div style={{ marginTop: '24px' }}>
          <Loader message="Fetching next streams..." />
        </div>
      )}
      
      {!hasMore && (
        <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          You've forged through all active live streams!
        </div>
      )}
    </div>
  );
};

export default Home;
