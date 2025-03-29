'use client';

import { useState, useEffect, useRef } from 'react';
import { GeoJSON } from './MapComponent';
import styles from './UIComponents.module.css';

interface SearchBarProps {
  geoJsonData: GeoJSON;
  onSelectNeighborhood: (neighborhoodId: string, coordinates: [number, number]) => void;
  isVisible: boolean;
}

export default function SearchBar({ geoJsonData, onSelectNeighborhood, isVisible }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{id: string; name: string; center: [number, number]}>>([]); 
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!geoJsonData || !geoJsonData.features || searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = geoJsonData.features
      .filter(feature => feature.geometry.type === 'Polygon')
      .filter(feature => 
        feature.properties.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(feature => {
        const coordinates = feature.geometry.coordinates[0];
        const lng = coordinates.reduce((sum, point) => sum + point[0], 0) / coordinates.length;
        const lat = coordinates.reduce((sum, point) => sum + point[1], 0) / coordinates.length;
        
        return {
          id: feature.properties['@id'],
          name: feature.properties.name,
          center: [lng, lat] as [number, number]
        };
      })
      .slice(0, 5);

    setSuggestions(filteredSuggestions);
  }, [searchTerm, geoJsonData]);

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;
    
    const suggestion = suggestions.find(s => 
      s.name.toLowerCase() === searchTerm.toLowerCase()
    ) || suggestions[0];
    
    if (suggestion) {
      onSelectNeighborhood(suggestion.id, suggestion.center);
      setShowSuggestions(false);
      setSearchTerm('');
    }
  };

  const handleSuggestionClick = (id: string, name: string, center: [number, number]) => {
    setSearchTerm('');
    onSelectNeighborhood(id, center);
    setShowSuggestions(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`${styles.searchContainer} ${!isVisible ? styles.searchHidden : ''}`} ref={searchRef}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search neighborhoods..."
          className={styles.searchInput}
          aria-label="Search neighborhoods"
        />
        <button 
          onClick={handleSearch}
          className={styles.searchButton}
          aria-label="Go to neighborhood"
        >
          Go
        </button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.id, suggestion.name, suggestion.center)}
              className={styles.suggestionItem}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
