import { useState, useEffect } from 'react';
import './App.css';
import { GetCollection, GetCollectionValue, GetWantlist } from '../wailsjs/go/main/App';
import Collection from './Collection'
import Browse from './Browse'

function App() {
  const [collection, setCollection] = useState([]);
  const [wantlist, setWantlist] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [section, setSection] = useState("collection");

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [collectionItems, wantlistItems] = await Promise.all([GetCollection(), GetWantlist()]);
      setCollection(collectionItems || []);
      setWantlist(wantlistItems);
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

      <main className="body-container">
        {{
          "collection": <Collection collection={collection} wantlist={wantlist} />,
          "browse": <Browse />
        }[section] || <Collection />} 
      </main>
    </div>
  );
}

export default App;