import fs from 'fs';
import path from 'path';
import MapComponent from '../components/MapComponent';
import './global.css';

// const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

export default function Home() {
  const filePath = path.join(process.cwd(), 'public/geodata/curitiba.geojson');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const geoJsonData = JSON.parse(fileContents);

  return <MapComponent geoJsonData={geoJsonData} />;
}
