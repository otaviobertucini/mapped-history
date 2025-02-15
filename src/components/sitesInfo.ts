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
    description:
      'A beautiful garden with a greenhouse. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: 'Historical',
    coordinates: [-49.245, -25.441],
    image: 'url_to_image1',
  },
  {
    name: 'Oscar Niemeyer Museum',
    description:
      'A museum dedicated to visual arts, architecture, and design. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: 'Historical',
    coordinates: [-49.263, -25.416],
    image: 'url_to_image2',
  },
  {
    name: 'Teste Teste',
    description:
      'A museum dedicated to visual arts, architecture, and design. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: 'Historical',
    coordinates: [-49.263, -25.4162],
    image: 'url_to_image2',
  },
  // Add more sites as needed
];
