'use client';

import { useEffect, useState } from 'react';
import Map, { Source, Layer, Marker, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import osmtogeojson from 'osmtogeojson';
import './globals.css';
import { neighborhoodInfo } from './neighborhoodInfo';
import { sitesInfo, SiteInfo } from './sitesInfo';
import InfoCard from './InfoCard';

export default function Home() {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [selectedSite, setSelectedSite] = useState<SiteInfo | null>(null);

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

  const onNeighborhoodClick = (event: MapLayerMouseEvent) => {
    const { features } = event;
    const clickedFeature = features && features[0];
    if (clickedFeature) {
      const neighborhoodName = clickedFeature.properties.name;
      const info = neighborhoodInfo[neighborhoodName] || {};
      setPopupInfo({
        name: neighborhoodName,
        description: info.description,
        dateOfFounding: info.dateOfFounding,
        image: info.image,
        pointsOfInterest: info.pointsOfInterest,
      });
      setSelectedSite(null);
    }
  };

  const onMarkerClick = (site: SiteInfo) => {
    setSelectedSite(site);
    setPopupInfo(null);
  };

  const closeInfoCard = () => {
    setPopupInfo(null);
    setSelectedSite(null);
  };

  return (
    <div className='relative' style={{ width: '100vw', height: '100vh' }}>
      <Map
        style={{ width: '100%', height: '100%' }}
        mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        initialViewState={{ longitude: -49.280516, latitude: -25.427385, zoom: 12 }}
        onClick={onNeighborhoodClick}
        interactiveLayerIds={['neighborhoods-layer']}
      >
        {geoJsonData && (
          <Source id='neighborhoods' type='geojson' data={geoJsonData}>
            <Layer id='neighborhoods-layer' type='fill' paint={{ 'fill-color': '#0080ff', 'fill-opacity': 0.5 }} />
            <Layer id='neighborhoods-borders' type='line' paint={{ 'line-color': '#000000', 'line-width': 2 }} />
          </Source>
        )}
        {sitesInfo.map((site) => (
          <Marker key={site.name} longitude={site.coordinates[0]} latitude={site.coordinates[1]}>
            <div onClick={() => onMarkerClick(site)} style={{ cursor: 'pointer', fontSize: '24px' }}>📍</div>
          </Marker>
        ))}
      </Map>

      <InfoCard info={popupInfo || selectedSite} onClose={closeInfoCard} />
    </div>
  );
}
