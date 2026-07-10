import { useState } from 'react';
import './Collection.css';

const Collection = ({collection, wantlist}) => {

    const [displaySelection, setDisplaySelection] = useState("collection");


    return (
        <div className="collection-container">
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
        </div>
    );
}

export default Collection