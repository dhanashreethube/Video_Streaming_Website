import React from 'react';
import { Menu, Bell, Video, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStreamForge } from '../context/StreamForgeContext';
import SearchBar from './SearchBar';
import ThemeSwitcher from './ThemeSwitcher';
import { MOCK_USER } from '../data/mockData';

const Navbar = () => {
  const { setSidebarOpen } = useStreamForge();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button
          onClick={() => setSidebarOpen(prev => !prev)}
          className="menu-toggle-btn"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className="logo-container">
          <Hammer size={22} className="logo-icon" />
          <span className="logo-forge">
            Stream<span className="logo-stream">Forge</span>
          </span>
        </Link>
      </div>

      <SearchBar />

      <div className="nav-right">
        <ThemeSwitcher />
        
        <button className="nav-icon-btn" title="Create Video" aria-label="Upload Video">
          <Video size={20} />
        </button>
        
        <button className="nav-icon-btn" title="Notifications" aria-label="Notifications">
          <Bell size={20} />
        </button>
        
        <Link to="/library" title="Your Library" aria-label="View Profile">
          <img
            src={MOCK_USER.avatar}
            alt={MOCK_USER.name}
            className="user-profile-avatar"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
