import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStreamForge } from './context/StreamForgeContext';

// Core UI Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileMenu from './components/MobileMenu';
import Footer from './components/Footer';

// Page Views
import Home from './pages/Home';
import Watch from './pages/Watch';
import SearchResults from './pages/SearchResults';
import ChannelDetail from './pages/ChannelDetail';
import Library from './pages/Library';
import Playlists from './pages/Playlists';
import PlaylistDetail from './pages/PlaylistDetail';

function App() {
  const { sidebarOpen } = useStreamForge();

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <Navbar />

      <div className="main-layout">
        {/* Collapsible Left Sidebar */}
        <Sidebar />

        {/* Scalable Main Content Wrapper */}
        <main className={`content-wrapper ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
          <div className="page-transition">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch/:videoId" element={<Watch />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/channel/:channelId" element={<ChannelDetail />} />
              <Route path="/library" element={<Library />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/playlists/:playlistId" element={<PlaylistDetail />} />
              
              {/* Fallback Catch-all Route */}
              <Route
                path="*"
                element={
                  <div style={{ textAlign: 'center', padding: '100px 24px' }}>
                    <h2>Page Not Found</h2>
                    <p style={{ margin: '16px 0', color: 'var(--text-muted)' }}>
                      We forged too deep. Let's head back to civilization.
                    </p>
                    <a href="/" className="glow-btn">
                      Forge Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </div>
          
          {/* Main layout Footer */}
          <Footer />
        </main>
      </div>

      {/* Touch-Screen Bottom Menu */}
      <MobileMenu />
    </div>
  );
}

export default App;
