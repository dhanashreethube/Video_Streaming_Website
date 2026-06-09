import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStreamForge } from '../context/StreamForgeContext';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { searchQuery, setSearchQuery, suggestions } = useStreamForge();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);

  // Sync state search query with url query parameter initially or on navigation
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams, setSearchQuery]);

  // Click outside suggestions dropdown handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (text) => {
    setSearchQuery(text);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(text)}`);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="nav-center" ref={dropdownRef}>
      <form onSubmit={handleSearchSubmit} className="search-bar-form">
        <input
          type="text"
          placeholder="Search videos, categories, tags..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="search-input"
        />
        
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-search-btn"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
        
        <button type="submit" className="search-btn" aria-label="Search">
          <Search size={18} />
        </button>
      </form>

      {/* Auto-suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className="suggestion-item"
              onClick={() => handleSuggestionClick(item)}
            >
              <Search size={14} className="text-muted" />
              <span className="suggestion-text">{item}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
