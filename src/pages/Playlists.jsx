import React, { useState } from 'react';
import { Plus, X, ListMusic } from 'lucide-react';
import { useStreamForge } from '../context/StreamForgeContext';
import PlaylistCard from '../components/PlaylistCard';

const Playlists = () => {
  const { playlists, createPlaylist } = useStreamForge();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    createPlaylist(name.trim(), description.trim());
    setName('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="page-transition text-left">
      <div className="playlists-page-header">
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }} className="flex-center">
          <ListMusic size={24} style={{ marginRight: '8px' }} />
          <span>Your Playlists</span>
        </h1>
        
        <button
          onClick={() => setShowModal(true)}
          className="glow-btn flex-center"
          style={{ gap: '8px' }}
        >
          <Plus size={18} />
          <span>Create Playlist</span>
        </button>
      </div>

      {playlists.length > 0 ? (
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <div
          className="flex-center"
          style={{
            flexDirection: 'column',
            gap: '16px',
            minHeight: '300px',
            border: '1px dashed var(--border-color)',
            borderRadius: '16px',
            backgroundColor: 'var(--surface-color)',
            padding: '24px'
          }}
        >
          <ListMusic size={48} className="text-muted" style={{ strokeWidth: 1.5 }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>No Playlists Found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '300px', textAlign: 'center' }}>
            Create custom lists to categorize and organize your favorite streams.
          </p>
          <button onClick={() => setShowModal(true)} className="glow-btn flex-center" style={{ gap: '8px' }}>
            <Plus size={16} /> Create Playlist
          </button>
        </div>
      )}

      {/* Create Playlist Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">New Playlist</h2>
              <button onClick={() => setShowModal(false)} className="modal-close-btn" aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-form-group">
                <label className="modal-label">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter playlist name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="modal-input"
                />
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Description (Optional)</label>
                <textarea
                  placeholder="Enter description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="modal-textarea"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="modal-cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="glow-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlists;
