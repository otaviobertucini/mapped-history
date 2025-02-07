'use client';

import { useEffect, useState } from 'react';
import Map, { Source, Layer, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import osmtogeojson from 'osmtogeojson';

// ci trigger

export default function Home() {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);
  const [popupInfo, setPopupInfo] = useState<any>(null);

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
    const { features, lngLat } = event;
    const hoveredFeature = features && features[0];
    setHoveredFeature(hoveredFeature);
    if (hoveredFeature) {
      setPopupInfo({
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        name: hoveredFeature.properties.name,
      });
    } else {
      setPopupInfo(null);
    }
  };

  return (
    <div>
      <Map
        style={{ width: '100%', height: '80vh' }}
        mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        initialViewState={{
          longitude: -49.280516, 
          latitude: -25.427385,
          zoom: 12,
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
                'line-width': 2,
              }}
            />
            {hoveredFeature && (
              <Layer
                id='hovered-feature'
                type='fill'
                source='neighborhoods'
                filter={['==', 'id', hoveredFeature?.properties?.id]}
                paint={{
                  'fill-opacity': 0.5,
                }}
              />
            )}
          </Source>
        )}
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeButton={false}
            closeOnClick={false}
            anchor='top'
          >
            <div>{popupInfo.name}</div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
