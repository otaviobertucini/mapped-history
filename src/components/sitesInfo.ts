export type SiteType = 'Historical' | 'Natural' | 'Cultural' | 'Religious' | 'Architectural';
export type SiteStatus = 'Exists' | 'NotExists' | 'Unknown' | 'Inaccessible' | 'CanBeVisited';

export type SiteInfo = {
  name: string;
  description: string;
  coordinates: [number, number];
  images: string[];
  types: SiteType[];
  address?: string;
  status?: SiteStatus[];
};

export const sitesInfo: SiteInfo[] = [
  {
    name: 'Botanical Garden',
    description:
      'A beautiful garden with a greenhouse. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    types: ['Historical', 'Natural', 'Cultural'],
    coordinates: [-49.245, -25.441],
    images: ['url_to_image1', 'url_to_image2', 'url_to_image3'],
  },
  {
    name: 'Oscar Niemeyer Museum',
    description:
      'A museum dedicated to visual arts, architecture, and design. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    types: ['Historical', 'Cultural', 'Architectural'],
    coordinates: [-49.263, -25.416],
    images: ['url_to_image4', 'url_to_image5'],
  },
  {
    name: 'Teste Teste',
    description:
      'A museum dedicated to visual arts, architecture, and design. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    types: ['Historical'],
    coordinates: [-49.263, -25.4162],
    images: ['url_to_image6'],
  },
  {
    name: 'Paróquia Nossa Senhora das Mercês',
    description: `Do alto, é possível observar que a estrutura mantém o desenho quadrilátero tradicional das igrejas católicas europeias, sendo que a igreja está localizada à esquerda da torre, e à sua direita está o jardim interno da instituição. Ainda ao lado esquerdo da igreja, na pequena casa, funcionava o Grupo Escolar São Francisco de Assis. Nas demais edificações religiosas presentes na imagem, encontravam-se o salão paroquial e o Convento dos Freis Capuchinhos, responsáveis pela congregação. Lore ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lore ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    types: ['Historical', 'Religious', 'Architectural'],
    coordinates: [-49.2879372, -25.4162],
    images: ['https://i.pinimg.com/736x/51/cb/37/51cb37ea44e978e03958f5fec9334227.jpg'],
    status: ['Exists', 'CanBeVisited'],
  },
];
