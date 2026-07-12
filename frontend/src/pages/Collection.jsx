import { useState } from 'react';
import AlbumCard from '../components/AlbumCard';
import './Collection.css';

const Collection = ({collection, wantlist}) => {

    const [displaySelection, setDisplaySelection] = useState("collection");

    const [albumSelected, setAlbumSelected] = useState(null);


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
                    onClick={() => setAlbumSelected(item)}
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

            {albumSelected && (
                <AlbumCard album={albumSelected} onClose={() => setAlbumSelected(null)} />
            )}
        </div>
    );
}

export default Collection