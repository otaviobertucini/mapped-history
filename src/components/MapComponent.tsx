'use client';

import { useState, useRef, useEffect } from 'react';
import Map, { Source, Layer, Marker, MapLayerMouseEvent, MapGeoJSONFeature, MapRef } from 'react-map-gl/maplibre';
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
    console.log(`🚀 ~ calculatePadding ~ screenHeight:`, screenHeight)
    const screenWidth = window.innerWidth;
    console.log(`🚀 ~ calculatePadding ~ screenWidth:`, screenWidth)
    
    if (isMobile) {
      // On mobile, adjust padding based on screen height
      const topPadding = Math.min(screenHeight * 0.7, 500); // 40% of screen height, max 500px
      const rightPadding = Math.min(screenWidth * 0.1, 100); // 10% of screen width, max 100px
      
      return {
        top: topPadding,
        bottom: 0,
        left: 0,
        right: rightPadding
      };
    }
    
    return undefined; // No padding on desktop
  };

  const centerMapOn = (coordinates: [number, number]) => {
    if (isMobile) {
      mapRef.current?.flyTo({
        center: coordinates,
        duration: 1000,
        zoom: Math.max(currentZoom, ZOOM_THRESHOLD + 1),
        padding: calculatePadding(),
        essential: true
      });
    } else {
      mapRef.current?.flyTo({
        center: coordinates,
        duration: 1000,
        zoom: Math.max(currentZoom, ZOOM_THRESHOLD),
        essential: true
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
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        name: neighborhoodName,
        description: info.description,
        dateOfFounding: info.dateOfFounding,
        image: info.image,
        pointsOfInterest: info.pointsOfInterest,
      });

      centerMapOn([lngLat.lng, lngLat.lat]);
    } else {
      setPopupInfo(null);
    }
  };

  const onMarkerClick = (event: any, site: SiteInfo) => {
    event.stopPropagation();
    setSelectedSite(site);
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
          <Marker
            key={site.name}
            longitude={site.coordinates[0]}
            latitude={site.coordinates[1]}
          >
            <div onClick={(event) => onMarkerClick(event, site)} style={{ cursor: 'pointer', fontSize: '24px' }}>
              📍
            </div>
            {(currentZoom >= ZOOM_THRESHOLD) && (
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
