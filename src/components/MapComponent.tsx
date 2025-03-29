'use client';

import { useState, useRef, useEffect } from 'react';
import Map, { Source, Layer, Marker, MapLayerMouseEvent, MapRef } from 'react-map-gl/maplibre';
import { neighborhoodInfo } from './neighborhoodInfo';
import { sitesInfo, SiteInfo } from './sitesInfo';
import InfoCard, { InfoCardContent } from './InfoCard';
import SearchBar from './SearchBar';
import 'maplibre-gl/dist/maplibre-gl.css';
import './globals.css';
import styles from './UIComponents.module.css';

export type Coordinate = [number, number];

export type Polygon = {
  type: 'Polygon';
  coordinates: Coordinate[][];
};

export interface NeighborhoodProperties {
  '@id': string;
  admin_level?: string;
  boundary?: string;
  name: string;
  type?: string;
  source?: string;
}

export interface NeighborhoodFeature {
  type: 'Feature';
  properties: NeighborhoodProperties;
  geometry: Polygon;
  id: string;
}

export interface GeoJSON {
  type: 'FeatureCollection';
  generator?: string;
  copyright?: string;
  timestamp?: string;
  features: NeighborhoodFeature[];
}

interface HomeProps {
  geoJsonData: GeoJSON;
}

export default function Home({ geoJsonData }: HomeProps) {
  const [popupInfo, setPopupInfo] = useState<InfoCardContent | null>(null);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState<string | null>(null);
  const [hoveredSite, setHoveredSite] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [currentZoom, setCurrentZoom] = useState<number>(12);

  const POPUP_ZOOM_THRESHOLD = 13;

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
        zoom: Math.max(currentZoom, POPUP_ZOOM_THRESHOLD + 1),
        padding: calculatePadding(),
        essential: true,
      });
    } else {
      mapRef.current?.flyTo({
        center: coordinates,
        duration: 1000,
        zoom: Math.max(currentZoom, POPUP_ZOOM_THRESHOLD),
        essential: true,
      });
    }
  };

  const onNeighborhoodClick = (event: MapLayerMouseEvent) => {
    if (selectedSiteId) {
      setSelectedSiteId(null);
    }

    const { features, lngLat } = event;
    const clickedFeature = features && features[0];

    if (clickedFeature) {
      const neighborhoodName = clickedFeature.properties.name;
      const info = neighborhoodInfo[neighborhoodName] || {};
      setSelectedNeighborhoodId(clickedFeature.properties['@id']);
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
    setSelectedSiteId(site.id);
    setPopupInfo({
      name: site.name,
      description: site.description,
      images: site.images,
      type: 'SITE',
    });
    setSelectedNeighborhoodId(null);
    centerMapOn(site.coordinates);
  };

  const handleSearchSelection = (neighborhoodId: string, coordinates: [number, number]) => {
    const selectedFeature = geoJsonData.features.find((feature) => feature.properties['@id'] === neighborhoodId);

    if (selectedFeature) {
      const neighborhoodName = selectedFeature.properties.name;
      const info = neighborhoodInfo[neighborhoodName] || {};

      setSelectedNeighborhoodId(neighborhoodId);
      setSelectedSiteId(null);
      setPopupInfo({
        name: neighborhoodName,
        description: info.description,
        dateOfFounding: info.dateOfFounding,
        images: info.images,
        pointsOfInterest: info.pointsOfInterest,
        type: 'NEIGHBORHOOD',
      });

      centerMapOn(coordinates);
    }
  };

  const closeInfoCard = () => {
    setPopupInfo(null);
    setSelectedSiteId(null);
    setSelectedNeighborhoodId(null);
  };

  const handlePoiSiteSelect = (siteId: string) => {
    const site = sitesInfo.find(site => site.id === siteId);
    
    if (site) {

      setPopupInfo({
        name: site.name,
        description: site.description,
        images: site.images,
        type: 'SITE'
      })
      
      setSelectedNeighborhoodId(null);
      setSelectedSiteId(site.id);
      
      centerMapOn(site.coordinates);
    }
  };

  return (
    <div className='relative' style={{ width: '100vw', height: '100vh' }}>
      <SearchBar
        geoJsonData={geoJsonData}
        onSelectNeighborhood={handleSearchSelection}
        isVisible={true}
      />

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
        onLoad={() => {
          if (mapRef.current) {
            const map = mapRef.current.getMap();
            map.keyboard.disableRotation();
            map.touchZoomRotate.disableRotation();
          }
        }}
      >
        {geoJsonData && (
          <Source id='neighborhoods' type='geojson' data={geoJsonData}>
            <Layer id='neighborhoods-layer' type='fill' paint={{ 'fill-color': '#0080ff', 'fill-opacity': 0.5 }} />
            <Layer id='neighborhoods-borders' type='line' paint={{ 'line-color': '#000000', 'line-width': 2 }} />
            {selectedNeighborhoodId && (
              <Layer
                id='hovered-feature'
                type='fill'
                source='neighborhoods'
                filter={['==', '@id', selectedNeighborhoodId]}
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
            anchor='bottom'
          >
            <div className={styles.markerContainer}>
              <div onClick={(event) => onMarkerClick(event, site)} className={styles.pinIcon}>
                📍
              </div>
              {currentZoom >= POPUP_ZOOM_THRESHOLD && (
                <div
                  className={`${styles.mapPopup} ${
                    hoveredSite === site.name || selectedSiteId === site.id ? styles.mapPopupActive : ''
                  }`}
                  onMouseEnter={() => setHoveredSite(site.name)}
                  onMouseLeave={() => setHoveredSite(null)}
                  onClick={(event) => onMarkerClick(event, site)}
                >
                  <div>{site.name}</div>
                </div>
              )}
            </div>
          </Marker>
        ))}
      </Map>

      <InfoCard 
        info={popupInfo} 
        onClose={closeInfoCard}
        onSiteSelect={handlePoiSiteSelect}
      />
    </div>
  );
}
