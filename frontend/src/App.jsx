import { useState, useEffect } from 'react';
import './App.css';
import { GetCollection, GetCollectionValue } from '../wailsjs/go/main/App';

function App() {
  const [collection, setCollection] = useState([]);
  const [collectionValue, setCollectionValue] = useState('Loading value...');
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to pull fresh data from the Go backend
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Run both Go calls in parallel to speed things up
      const [items, valueString] = await Promise.all([
        GetCollection(),
        GetCollectionValue()
      ]);
      
      setCollection(items || []);
      setCollectionValue(valueString);
    } catch (error) {
      console.error('Failed fetching data from Go backend:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch automatically on initial application load
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div id="App" className="dashboard-container">
      {/* TOOLBAR */}
      <header className="dashboard-toolbar">
        <div className="toolbar-left">
          <h1>Discogs Collection</h1>
          <span className="collection-counter">
            {collection.length} {collection.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>
        
        <div className="toolbar-right">
          <div className="value-badge" title="Estimated Value (Min | Med | Max)">
            {collectionValue}
          </div>
          <button 
            className={`refresh-btn ${isLoading ? 'spinning' : ''}`} 
            onClick={fetchDashboardData}
            disabled={isLoading}
          >
            {isLoading ? '🔄 Refreshing...' : '🔄 Refresh'}
          </button>
        </div>
      </header>

      {/* INFINITE SCROLLABLE GRID */}
      <main className="dashboard-content">
        {isLoading && collection.length === 0 ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Syncing your vinyl collection...</p>
          </div>
        ) : collection.length === 0 ? (
          <div className="empty-container">
            <p>No items found in your collection folder.</p>
          </div>
        ) : (
          <div className="album-grid">
            {collection.map((item) => {
              const info = item.basic_information;
              const artistName = info.artists?.[0]?.name || 'Unknown Artist';
              
              return (
                <div key={`${item.id}-${item.instance_id}`} className="album-card">
                  <div className="cover-wrapper">
                    <img 
                      src={info.cover_image || info.thumb || 'https://via.placeholder.com/150?text=No+Cover'} 
                      alt={info.title}
                      loading="lazy" 
                    />
                    {info.year > 0 && <span className="year-tag">{info.year}</span>}
                  </div>
                  <div className="album-details">
                    <h3 className="album-title" title={info.title}>{info.title}</h3>
                    <p className="album-artist" title={artistName}>{artistName}</p>
                    {info.labels?.[0] && (
                      <p className="album-label" title={info.labels[0].name}>
                        {info.labels[0].name} {info.labels[0].catno ? `(${info.labels[0].catno})` : ''}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;