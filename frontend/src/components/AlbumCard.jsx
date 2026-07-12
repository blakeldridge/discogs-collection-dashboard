import React from 'react';
import './AlbumCard.css';

const AlbumCard = ({ album, onClose }) => {
  if (!album) return null;

  const info = album.basic_information;

  // Extract formats safely
  const formatObj = info.formats?.[0] || {};
  const formatName = formatObj.name || 'Unknown Format';
  const formatQty = formatObj.qty ? `${formatObj.qty}x ` : '';
  const formatDesc = formatObj.descriptions ? `(${formatObj.descriptions.join(', ')})` : '';

  // Extract label details safely
  const labelObj = info.labels?.[0] || {};
  const labelName = labelObj.name || 'Self-Released';
  const catalogNo = labelObj.catno ? ` - ${labelObj.catno}` : '';

  // Join multiple artists if they exist
  const artistNames = info.artists?.map(a => a.name).join(', ') || 'Unknown Artist';

  // Get custom notes from the collection specific data if available
  const customNotes = album.notes?.find(n => n.field_id === 3)?.value || null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      {/* Prevents click inside the card from closing the modal */}
      <div className="album-detail-card" onClick={(e) => e.stopPropagation()}>
        
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {/* Left Side: Art Cover */}
        <div className="modal-left-panel">
          <img 
            src={info.cover_image || info.thumb} 
            alt={`${info.title} cover`} 
            className="modal-cover-image"
          />
        </div>

        {/* Right Side: Metadata Panel */}
        <div className="modal-right-panel">
          <div className="modal-header">
            <h1 className="modal-album-title">{info.title}</h1>
            <h2 className="modal-album-artist">{artistNames}</h2>
          </div>

          <div className="modal-scroll-content">
            {/* Meta Metadata Grid */}
            <div className="meta-info-grid">
              <div className="meta-item">
                <span className="meta-label">Released</span>
                <span className="meta-value">{info.year || 'Unknown Year'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Format / Pressing</span>
                <span className="meta-value">{formatQty}{formatName} {formatDesc}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Label</span>
                <span className="meta-value">{labelName}{catalogNo}</span>
              </div>
              {album.rating > 0 && (
                <div className="meta-item">
                  <span className="meta-label">Rating</span>
                  <span className="meta-value">⭐ {album.rating}/5</span>
                </div>
              )}
            </div>

            {/* Categorization Tags */}
            <div className="tags-section">
              <span className="section-subtitle">Genres</span>
              <div className="tags-container">
                {info.genres?.map(genre => (
                  <span key={genre} className="tag tag-genre">{genre}</span>
                ))}
              </div>
            </div>

            {info.styles && info.styles.length > 0 && (
              <div className="tags-section">
                <span className="section-subtitle">Styles</span>
                <div className="tags-container">
                  {info.styles.map(style => (
                    <span key={style} className="tag tag-style">{style}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Collection Notes */}
            {customNotes && (
              <div className="notes-section">
                <span className="section-subtitle">Collection Notes</span>
                <p className="collection-notes-text">"{customNotes}"</p>
              </div>
            )}
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default AlbumCard;