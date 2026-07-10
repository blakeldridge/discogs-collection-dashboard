import { useState, useEffect } from 'react';
import './Browse.css';

import { Search } from '../wailsjs/go/main/App';

const Browse = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const [filters, setFilters] = useState({
        artist : "",
        releaseTitle : "",
        format : "",
        year : ""
    });

    const fetchSearchData = async () => {

        const hasQuery = searchQuery.trim().length > 0;
        const hasFilters = Object.values(filters).some(val => val.trim().length > 0);
        if (!hasQuery && !hasFilters) return;

        setIsLoading(true);

        try {
            const payload = {
                query: searchQuery,
                artist: filters.artist,
                release_title: filters.releaseTitle,
                format: filters.format,
                year: filters.year
            };
            console.log(payload);

            const [results] = await Promise.all([Search(payload)]);
            setResults(results || []);
        } catch (error) {
            console.error(error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setSearchQuery("");
        setFilters({ artist: "", releaseTitle: "", format: "", year: "" });
        setResults([]);
        setHasSearched(false);
    };

    const search = async () => {
        setHasSearched(true);
        fetchSearchData();
    };

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchSearchData();
        }
    };

    return (
        <div>
            {/* Search Bar */}
            <div>
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search albums, artists..." 
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setHasSearched(false);
                        }}
                        className="search-input"
                    />

                    <button onClick={() => search()}>Submit</button>
                </div>

                {/* Filtering */}
                <div className="filters-grid">
                    <div className="filter-group">
                        <label>Artist</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Nirvana"
                            value={filters.artist}
                            onChange={(e) => handleFilterChange('artist', e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Release Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Nevermind"
                            value={filters.releaseTitle}
                            onChange={(e) => handleFilterChange('releaseTitle', e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Format</label>
                        <select 
                            value={filters.format} 
                            onChange={(e) => handleFilterChange('format', e.target.value)}
                        >
                            <option value="">All Formats</option>
                            <option value="Vinyl">Vinyl</option>
                            <option value="CD">CD</option>
                            <option value="Cassette">Cassette</option>
                            <option value="Box Set">Box Set</option>
                            <option value="DVD">DVD</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Year</label>
                        <input 
                            type="number" 
                            placeholder="e.g. 1991"
                            min="1900"
                            max="2026"
                            value={filters.year}
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="loader-container">
                    <div className="loading-ring"></div>
                </div>
            ) : (
                <div className="result-grid">
                    {results && results.length > 0 ? (
                        results.map((item) => {
                            return (
                                <div 
                                    key={`${item.id}`} 
                                    className="result-card"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div>
                                        <img src={item.thumb} alt={item.title} />
                                    </div>
                                    <div>
                                        <h3>{item.title}</h3>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-results">{hasSearched ? "No Results Found" : "Search for music to build your collection or wantlist"}</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Browse