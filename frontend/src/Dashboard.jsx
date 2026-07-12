import React from 'react';
import './Dashboard.css';

const mockDashboardData = {
  topGenres: [
    { name: 'Rock', count: 412, color: '#ff5722' },
    { name: 'Electronic', count: 305, color: '#9c27b0' },
    { name: 'Jazz', count: 210, color: '#ffeb3b' },
    { name: 'Hip Hop', count: 180, color: '#00bcd4' },
    { name: 'Other', count: 138, color: '#607d8b' }
  ]
};

const Dashboard = ({ stats }) => {
  const data = mockDashboardData;

  return (
    <div className="dashboard-container">

      <section className="hero-stats-section">
        <div className="stat-card main-hero">
          <span className="stat-label">Total Collection</span>
          <h1 className="stat-value">{stats.totalAlbums.toLocaleString()}</h1>
          <div className="stat-subtext-grid">
            {Object.entries(stats.formatBreakdown).map(([format, count]) => (
              <span key={format}><strong>{count}</strong> {format}</span>
            ))}
          </div>
        </div>
        
        <div className="stat-card wantlist-hero">
          <span className="stat-label">Items In Wantlist</span>
          <h2>{stats.totalWantlist}</h2>
          <span className="stat-subtext">Actively tracking market value</span>
        </div>
      </section>

      <section className="valuation-section">
        <h3 className="section-title">Estimated Market Value</h3>
        <div className="valuation-grid">
          <div className="val-card min">
            <span className="val-tier">Minimum Value</span>
            <span className="val-amount">{stats.collectionValue.minimum}</span>
          </div>
          <div className="val-card median highlight">
            <span className="val-tier">Median Market Value</span>
            <span className="val-amount">{stats.collectionValue.median}</span>
          </div>
          <div className="val-card max">
            <span className="val-tier">Maximum Value</span>
            <span className="val-amount">{stats.collectionValue.maximum}</span>
          </div>
        </div>
      </section>
      <section className="analytics-section">
        
        <div className="analytics-card">
          <h3 className="card-title">Top Genres</h3>
          <div className="genre-list">
            {stats.topGenres.map(genre => {
              const percentage = Math.round((genre.count / stats.totalAlbums) * 100);
              return (
                <div key={genre.name} className="genre-row">
                  <div className="genre-info">
                    <span className="genre-name">{genre.name}</span>
                    <span className="genre-count">{genre.count} albums ({percentage}%)</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${percentage}%`, backgroundColor: '#9c27b0' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="analytics-card">
          <h3 className="card-title">Format Share</h3>
          <div className="format-share-container">
            <div className="segmented-bar">
              {Object.entries(stats.formatBreakdown).map(([format, count]) => (
                <div 
                  key={format} 
                  className={`segment segment-${format}`} 
                  style={{ width: `${Math.round(100 * count / stats.totalAlbums)}%` }}
                  title={`${format}: ${Math.round(100 * count / stats.totalAlbums)}%`}
                />
              ))}
            </div>
            <div className="format-legend">
              {Object.entries(stats.formatBreakdown).map(([format, count]) => (
                <div key={format} className="legend-item">
                  <span className={`legend-dot dot-${format}`} />
                  <span className="legend-label">{format} ({Math.round(100 * count / stats.totalAlbums)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
      
    </div>
  );
}

export default Dashboard;