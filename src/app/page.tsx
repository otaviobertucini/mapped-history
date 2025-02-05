'use client'; // Ensure it runs on the client-side

import { useEffect, useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import osmtogeojson from 'osmtogeojson';

export default function Home() {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);
  console.log(`🚀 ~ Home ~ hoveredFeature:`, hoveredFeature?.properties?.name);

  useEffect(() => {
    const query = `
        [out:json];
        area["name"="Curitiba"]->.searchArea;
        (
          relation["boundary"="administrative"]["admin_level"="10"](area.searchArea);
        );
        out geom;
      `;
    fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => setGeoJsonData(osmtogeojson(data)));
  }, []);

  const onHover = (event: any) => {
    const { features } = event;
    const hoveredFeature = features && features[0];
    setHoveredFeature(hoveredFeature);
  };

  return (
    <div>
      <Map
        style={{ width: '100%', height: '80vh' }}
        mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        initialViewState={{
          longitude: -49.271,
          latitude: -25.429,
          zoom: 10,
        }}
        onMouseMove={onHover}
        onClick={onHover}
        interactiveLayerIds={['neighborhoods-layer']}
      >
        {geoJsonData && (
          <Source id='neighborhoods' type='geojson' data={geoJsonData}>
            <Layer
              id='neighborhoods-layer'
              type='fill'
              paint={{
                'fill-color': '#0080ff',
                'fill-opacity': 0.5,
              }}
            />
            <Layer
              id='neighborhoods-borders'
              type='line'
              paint={{
                'line-color': '#000000',
                'line-width': 2, // Adjust the thickness here
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
}
