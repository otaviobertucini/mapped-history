'use client';

import { useState } from 'react';
import Map, { Source, Layer, Marker, MapLayerMouseEvent, MapGeoJSONFeature } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './globals.css';
import { neighborhoodInfo } from './neighborhoodInfo';
import { sitesInfo, SiteInfo } from './sitesInfo';
import InfoCard from './InfoCard';

interface HomeProps {
  geoJsonData: any;
}

export default function Home({ geoJsonData }: HomeProps) {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [selectedSite, setSelectedSite] = useState<SiteInfo | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<MapGeoJSONFeature | null>(null);
  console.log(`🚀 ~ Home ~ selectedNeighborhood:`, selectedNeighborhood?.properties["@id"])

  const onNeighborhoodClick = (event: MapLayerMouseEvent) => {
    if (selectedSite) {
      setSelectedSite(null);
    }

    const { features, lngLat } = event;
    const clickedFeature = features && features[0];

    if (clickedFeature) {
      const neighborhoodName = clickedFeature.properties.name;
      const info = neighborhoodInfo[neighborhoodName] || {};
      setSelectedNeighborhood(clickedFeature);
      setPopupInfo({
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        name: neighborhoodName,
        description: info.description,
        dateOfFounding: info.dateOfFounding,
        image: info.image,
        pointsOfInterest: info.pointsOfInterest,
      });
    } else {
      setPopupInfo(null);
    }
  };

  const onMarkerClick = (event: any, site: SiteInfo) => {
    event.stopPropagation();
    setSelectedSite(site);
    setPopupInfo(null);
    setSelectedNeighborhood(null);
  };

  const closeInfoCard = () => {
    setPopupInfo(null);
    setSelectedSite(null);
  };

  return (
    <div className='relative' style={{ width: '100vw', height: '100vh' }}>
      <Map
        style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        initialViewState={{ longitude: -49.280516, latitude: -25.427385, zoom: 12 }}
        onClick={onNeighborhoodClick}
        interactiveLayerIds={['neighborhoods-layer']}
      >
        {geoJsonData && (
          <Source id='neighborhoods' type='geojson' data={geoJsonData}>
            <Layer id='neighborhoods-layer' type='fill' paint={{ 'fill-color': '#0080ff', 'fill-opacity': 0.5 }} />
            <Layer id='neighborhoods-borders' type='line' paint={{ 'line-color': '#000000', 'line-width': 2 }} />
            {selectedNeighborhood && (
              <Layer
                id='hovered-feature'
                type='fill'
                source='neighborhoods'
                filter={['==', '@id', selectedNeighborhood?.properties["@id"]]}
                paint={{
                  'fill-opacity': 0.5,
                }}
              />
            )}
          </Source>
        )}
        {sitesInfo.map((site) => (
          <Marker key={site.name} longitude={site.coordinates[0]} latitude={site.coordinates[1]}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div onClick={(event) => onMarkerClick(event, site)} style={{ cursor: 'pointer', fontSize: '24px' }}>
                📍
              </div>
              <div className='custom-popup'>
                <div>{site.name}</div>
              </div>
            </div>
          </Marker>
        ))}
      </Map>

      <InfoCard info={popupInfo || selectedSite} onClose={closeInfoCard} />
    </div>
  );
}