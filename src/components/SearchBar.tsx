'use client';

import { useState, useEffect, useRef } from 'react';
import { GeoJSON } from './MapComponent';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  geoJsonData: GeoJSON;
  onSelectNeighborhood: (neighborhoodId: string, coordinates: [number, number]) => void;
}

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export default function SearchBar({ geoJsonData, onSelectNeighborhood }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ id: string; name: string; coordinates: [number, number] }>>(
    []
  );
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!geoJsonData || !geoJsonData.features) return;

    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const normalizedSearchTerm = normalizeText(searchTerm);

    const filteredSuggestions = geoJsonData.features
      .filter((feature) => feature.geometry.type === 'Polygon')
      .filter((feature) => {
        const normalizedName = normalizeText(feature.properties.name);
        return normalizedName.includes(normalizedSearchTerm);
      })
      .map((feature) => {
        const coordinates = feature.geometry.coordinates[0];
        let sumLng = 0,
          sumLat = 0;

        coordinates.forEach((coord) => {
          sumLng += coord[0];
          sumLat += coord[1];
        });

        const center: [number, number] = [sumLng / coordinates.length, sumLat / coordinates.length];

        return {
          id: feature.properties['@id'],
          name: feature.properties.name,
          coordinates: center,
        };
      });

    setSuggestions(filteredSuggestions);
  }, [searchTerm, geoJsonData]);

  const handleSearch = () => {
    if (searchTerm.trim() === '' || !suggestions.length) return;

    const normalizedSearchTerm = normalizeText(searchTerm);
    
    const match = suggestions.find((s) => normalizeText(s.name) === normalizedSearchTerm) || suggestions[0];
    if (match) {
      onSelectNeighborhood(match.id, match.coordinates);
      setIsSuggestionsOpen(false);
      setSearchTerm('');
    }
  };

  const handleSuggestionClick = (id: string, name: string, coordinates: [number, number]) => {
    setSearchTerm(name);
    onSelectNeighborhood(id, coordinates);
    setIsSuggestionsOpen(false);
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.container} ref={wrapperRef}>
      <div className={styles.searchBar}>
        <input
          type='text'
          placeholder='Buscar bairro...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSuggestionsOpen(true)}
          onKeyDown={handleKeyDown}
          className={styles.input}
          aria-label='Buscar bairros'
        />
        <button onClick={handleSearch} className={styles.button}>
          Ir
        </button>
      </div>

      {isSuggestionsOpen && suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.id, suggestion.name, suggestion.coordinates)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
