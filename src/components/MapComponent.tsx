'use client';

import { useState, useRef, useEffect } from 'react';
import Map, { Source, Layer, Marker, MapLayerMouseEvent, MapGeoJSONFeature, MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './globals.css';
import { neighborhoodInfo } from './neighborhoodInfo';
import { sitesInfo, SiteInfo } from './sitesInfo';
import InfoCard, { InfoCardContent } from './InfoCard';

interface HomeProps {
  geoJsonData: any;
}

export default function Home({ geoJsonData }: HomeProps) {
  const [popupInfo, setPopupInfo] = useState<InfoCardContent | null>(null);
  const [selectedSite, setSelectedSite] = useState<InfoCardContent | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<MapGeoJSONFeature | null>(null);
  const [hoveredSite, setHoveredSite] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [currentZoom, setCurrentZoom] = useState<number>(12);

  const ZOOM_THRESHOLD = 13;

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleZoomEnd = (event: any) => {
    setCurrentZoom(event.viewState.zoom);
  };

  const calculatePadding = () => {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    if (isMobile) {
      const topPadding = Math.min(screenHeight * 0.7, 500);
      const rightPadding = Math.min(screenWidth * 0.1, 100);

      return {
        top: topPadding,
        bottom: 0,
        left: 0,
        right: rightPadding,
      };
    }

    return undefined;
  };

  const centerMapOn = (coordinates: [number, number]) => {
    if (isMobile) {
      mapRef.current?.flyTo({
        center: coordinates,
        duration: 1000,
        zoom: Math.max(currentZoom, ZOOM_THRESHOLD + 1),
        padding: calculatePadding(),
        essential: true,
      });
    } else {
      mapRef.current?.flyTo({
        center: coordinates,
        duration: 1000,
        zoom: Math.max(currentZoom, ZOOM_THRESHOLD),
        essential: true,
      });
    }
  };

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
        name: neighborhoodName,
        description: info.description,
        dateOfFounding: info.dateOfFounding,
        images: info.images,
        pointsOfInterest: info.pointsOfInterest,
        type: 'NEIGHBORHOOD',
      });

      centerMapOn([lngLat.lng, lngLat.lat]);
    } else {
      setPopupInfo(null);
    }
  };

  const onMarkerClick = (event: any, site: SiteInfo) => {
    event.stopPropagation();
    setSelectedSite({ ...site, type: 'SITE' });
    setPopupInfo(null);
    setSelectedNeighborhood(null);
    centerMapOn(site.coordinates);
  };

  const closeInfoCard = () => {
    setPopupInfo(null);
    setSelectedSite(null);
    setSelectedNeighborhood(null);
  };

  return (
    <div className='relative' style={{ width: '100vw', height: '100vh' }}>
      <Map
        ref={mapRef}
        style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        initialViewState={{ longitude: -49.280516, latitude: -25.427385, zoom: 12 }}
        onClick={onNeighborhoodClick}
        interactiveLayerIds={['neighborhoods-layer']}
        onZoom={handleZoomEnd}
        dragRotate={false}
        pitchWithRotate={false}
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
                filter={['==', '@id', selectedNeighborhood?.properties['@id']]}
                paint={{
                  'fill-opacity': 0.5,
                }}
              />
            )}
          </Source>
        )}
        {sitesInfo.map((site) => (
          <Marker key={site.name} longitude={site.coordinates[0]} latitude={site.coordinates[1]}>
            <div onClick={(event) => onMarkerClick(event, site)} style={{ cursor: 'pointer', fontSize: '24px' }}>
              📍
            </div>
            {currentZoom >= ZOOM_THRESHOLD && (
              <div
                className={`custom-popup ${
                  hoveredSite === site.name || selectedSite?.name === site.name ? 'custom-popup-active' : ''
                }`}
                onMouseEnter={() => setHoveredSite(site.name)}
                onMouseLeave={() => setHoveredSite(null)}
                onClick={(event) => onMarkerClick(event, site)}
              >
                <div>{site.name}</div>
              </div>
            )}
          </Marker>
        ))}
      </Map>

      <InfoCard info={popupInfo || selectedSite} onClose={closeInfoCard} />
    </div>
  );
}
