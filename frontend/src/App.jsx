import { useState, useEffect } from 'react';
import './App.css';
import { GetCollection, GetCollectionValue, GetWantlist } from '../wailsjs/go/main/App';
import Collection from './pages/Collection'
import Browse from './pages/Browse'
import Dashboard from './pages/Dashboard'

function App() {
  const [collection, setCollection] = useState([]);
  const [wantlist, setWantlist] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [section, setSection] = useState("collection");
  const [collectionValue, setCollectionValue] = useState({
    minimum: 0,
    median: 0,
    maximum: 0,
  });



  const [collectionStats, setCollectionStats] = useState({
    totalAlbums : 0,
    totalWantlist : 0,
    formatBreakdown : {
      vinyls : 0,
      cds : 0,
      cassettes : 0
    },
    topGenres : [],
    collectionValue: {
      minimum: 0,
      median: 0,
      maximum: 0
    }
  });

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [collectionItems, wantlistItems, marketValue] = await Promise.all([
        GetCollection(), 
        GetWantlist(), 
        GetCollectionValue().catch(err => {
          console.error("Valuation failed:", err);
          return { minimum: "€0.00", median: "€0.00", maximum: "€0.00" };
        })
      ]);

      setCollection(collectionItems);
      setWantlist(wantlistItems);
      setCollectionValue(marketValue);
      
      populateStats();

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  function populateStats() {
    const items = collection;
    let vinyls = 0;
    let cds = 0;
    let cassettes = 0;

    const genreCounts = {};

    items.forEach(item => {
      const fmt = (item.basic_information.formats[0].name || '');
      if (fmt.includes('Vinyl')) vinyls++;
      else if (fmt.includes('CD')) cds++;
      else if (fmt.includes('cassette')) cassettes++;

      const genres = item.basic_information.genres || [];
      genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    const sortedGenres = Object.entries(genreCounts).map(([name, count]) => (
      {name, count})).sort((a, b) => (b.count - a.count));

    const top5 = sortedGenres.slice(0, 5);
    const remaining = sortedGenres.slice(5);

    if (remaining.length > 0) {
      const otherCount = remaining.reduce((sum, item) => sum + item.count, 0);
      top5.push({ name: 'Other', count: otherCount });
    }

    setCollectionStats({
      totalAlbums: collection.length,
      totalWantlist: wantlist.length,
      formatBreakdown: {
        vinyls: vinyls,
        cds: cds,
        cassettes: cassettes
      },
      topGenres : top5,
      collectionValue : {
        minimum: collectionValue.minimum || "€0.00",
        median: collectionValue.median || "€0.00",
        maximum: collectionValue.maximum || "€0.00"
      }
    });
  }

  useEffect(() => { fetchDashboardData(); }, []);
  useEffect(() => { populateStats()}, [section, collection]);

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
          "dashboard": <Dashboard stats={collectionStats} />,
          "collection": <Collection collection={collection} wantlist={wantlist} />,
          "browse": <Browse />
        }[section] || <Collection />} 
      </main>
    </div>
  );
}

export default App;