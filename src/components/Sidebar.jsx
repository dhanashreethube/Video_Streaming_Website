import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Flame,
  Users,
  Library as LibIcon,
  History,
  ThumbsUp,
  Clock,
  ListMusic,
  Tv
} from 'lucide-react';
import { useStreamForge } from '../context/StreamForgeContext';
import { CHANNELS } from '../data/mockData';

const Sidebar = () => {
  const { sidebarOpen, subscribedChannels, playlists } = useStreamForge();

  const mainNavItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Trending', path: '/search?q=trending', icon: <Flame size={18} /> },
    { name: 'Subscriptions', path: '/library?tab=subscriptions', icon: <Users size={18} /> }
  ];

  const libraryNavItems = [
    { name: 'Library', path: '/library?tab=library', icon: <LibIcon size={18} /> },
    { name: 'History', path: '/library?tab=history', icon: <History size={18} /> },
    { name: 'Liked Videos', path: '/library?tab=liked', icon: <ThumbsUp size={18} /> },
    { name: 'Watch Later', path: '/library?tab=watchlater', icon: <Clock size={18} /> }
  ];

  // Map subscribed channel IDs to full channel details
  const subscribedDetails = CHANNELS.filter(ch => subscribedChannels.includes(ch.id));

  return (
    <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-section">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            title={item.name}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-section">
        <span className="sidebar-section-title">Library</span>
        {libraryNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            title={item.name}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-section">
        <span className="sidebar-section-title">Playlists</span>
        <NavLink
          to="/playlists"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          title="All Playlists"
        >
          <ListMusic size={18} />
          <span>All Playlists</span>
        </NavLink>
        {sidebarOpen &&
          playlists.slice(0, 3).map((pl) => (
            <NavLink
              key={pl.id}
              to={`/playlists/${pl.id}`}
              className="sidebar-link"
              style={{ paddingLeft: '20px' }}
              title={pl.name}
            >
              <ListMusic size={14} className="text-muted" />
              <span className="text-truncate">{pl.name}</span>
            </NavLink>
          ))}
      </div>

      <div className="sidebar-divider"></div>

      {/* Dynamic Subscriptions Section */}
      <div className="sidebar-section">
        <span className="sidebar-section-title">Subscriptions</span>
        {subscribedDetails.length > 0 ? (
          subscribedDetails.map((channel) => (
            <NavLink
              key={channel.id}
              to={`/channel/${channel.id}`}
              className="sidebar-link"
              title={channel.name}
            >
              {sidebarOpen ? (
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="sidebar-sub-avatar"
                />
              ) : (
                <Tv size={18} />
              )}
              <span>{channel.name}</span>
            </NavLink>
          ))
        ) : (
          sidebarOpen && (
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                padding: '0 12px',
                lineHeight: '1.4'
              }}
            >
              Subscribe to channels to see them here!
            </span>
          )
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
