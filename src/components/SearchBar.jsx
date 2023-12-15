import { useState } from 'react';

export default function SearchBar({ onSearch, onGeolocate, recentSearches }) {
  const [query, setQuery] = useState('');
  const [showRecent, setShowRecent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setShowRecent(false);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowRecent(true)}
            onBlur={() => setTimeout(() => setShowRecent(false), 200)}
            placeholder="Search city..."
            className="search-input"
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
        <button type="button" className="btn btn-geo" onClick={onGeolocate} title="Use my location">
          📍
        </button>
      </form>

      {showRecent && recentSearches.length > 0 && (
        <div className="recent-searches">
          <span className="recent-label">Recent:</span>
          {recentSearches.map((city) => (
            <button
              key={city}
              className="recent-btn"
              onMouseDown={() => { onSearch(city); setShowRecent(false); }}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
