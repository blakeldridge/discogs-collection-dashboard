import { useState, useEffect } from 'react';
import './App.css';
import { GetCollection, GetCollectionValue, GetWantlist } from '../wailsjs/go/main/App';

function App() {
  const [collection, setCollection] = useState([]);
  const [collectionValue, setCollectionValue] = useState('Loading value...');

  const [wantlist, setWantlist] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  
  const [displaySelection, setDisplaySelection] = useState("collection");
  const [section, setSection] = useState("collection");

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [collectionItems, valueString, wantlistItems] = await Promise.all([GetCollection(), GetCollectionValue(), GetWantlist()]);
      setCollection(collectionItems || []);
      setCollectionValue(valueString);
      setWantlist(wantlistItems)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  return (
    <div id="App">
      {/* TOOLBAR */}
      <header className="toolbar">
        <div>
          <h1>Discogs Collection</h1>
          <span>{collection.length} Items</span>
        </div>

        {/* Section Selector */}
        <div className="section-tabs">
          <div className={`section-tab ${section === "dashboard"? 'selected' : ''}`} onClick={() => setSection("dashboard")}>
            <h3>Dashboard</h3>
          </div>
          <div className={`section-tab ${section === "collection"? 'selected' : ''}`} onClick={() => setSection("collection")}>
            <h3>Collection</h3>
          </div>
          <div className={`section-tab ${section === "browse"? 'selected' : ''}`} onClick={() => setSection("browse")}>
            <h3>Browse</h3>
          </div>
        </div>

        <div>
          <button onClick={fetchDashboardData}>Refresh</button>
        </div>
      </header>


      <main>
        {/* COLLECTION vs WANTLIST Tabs */}
        <div className="selection-tabs">
          <div className={`selection-tab ${displaySelection === "collection"? 'selected' : ''}`} onClick={() => setDisplaySelection("collection")}>
            <h3>Collection</h3>
          </div>
          <div className={`selection-tab ${displaySelection === "wantlist"? 'selected' : ''}`} onClick={() => setDisplaySelection("wantlist")}>
            <h3>Wantlist</h3>
          </div>
        </div>


        {/* GRID */}
        <div className="album-grid">
          {(displaySelection === "collection"? collection : wantlist).map((item) => {
            const info = item.basic_information || {};
            return (
              <div 
                key={`${item.id}`} 
                className="album-card"
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <img src={info.cover_image || info.thumb} alt={info.title} />
                </div>
                <div>
                  <h3>{info.title}</h3>
                  <p>{info.artists?.[0]?.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;