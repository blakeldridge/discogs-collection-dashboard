import { useState, useEffect } from 'react';
import './Browse.css';

import { Search } from '../wailsjs/go/main/App';

const Browse = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const fetchSearchData = async () => {
        setIsLoading(true);
        try {
            const [results] = await Promise.all([Search(searchQuery)]);
            setResults(results)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const search = async () => {
        fetchSearchData();
    };

    return (
        <div>
            {/* Search Bar */}
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search albums, artists..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                <button onClick={() => search()}>Submit</button>
            </div>

            {isLoading ? (
                <div className="loader-container">
                    <div className="loading-ring"></div>
                </div>
            ) : (
                <div className="result-grid">
                    {results?.map((item) => {
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
                    })}
                </div>
            )}
        </div>
    );
}

export default Browse