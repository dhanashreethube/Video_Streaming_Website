import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Flame, Users, Library, ListMusic } from 'lucide-react';

const MobileMenu = () => {
  const mobileNavItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Trending', path: '/search?q=trending', icon: <Flame size={20} /> },
    { name: 'Subscriptions', path: '/library?tab=subscriptions', icon: <Users size={20} /> },
    { name: 'Playlists', path: '/playlists', icon: <ListMusic size={20} /> },
    { name: 'Library', path: '/library?tab=library', icon: <Library size={20} /> }
  ];

  return (
    <div className="mobile-menu">
      {mobileNavItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => `mobile-menu-item ${isActive ? 'active' : ''}`}
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default MobileMenu;
