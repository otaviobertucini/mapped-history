export type SiteInfo = {
  name: string;
  description: string;
  coordinates: [number, number];
  image?: string;
  type: 'Historical' | 'Natural' | 'Cultural';
};

export const sitesInfo: SiteInfo[] = [
  {
    name: 'Botanical Garden',
    description: 'A beautiful garden with a greenhouse.',
    type: 'Historical',
    coordinates: [-49.245, -25.441],
    image: 'url_to_image1',
  },
  {
    name: 'Oscar Niemeyer Museum',
    description: 'A museum dedicated to visual arts, architecture, and design.',
    type: 'Historical',
    coordinates: [-49.263, -25.416],
    image: 'url_to_image2',
  },
  // Add more sites as needed
];
