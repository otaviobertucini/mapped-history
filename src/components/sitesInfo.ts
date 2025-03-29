export type SiteType = 'Historical' | 'Natural' | 'Cultural' | 'Religious' | 'Architectural';
export type SiteStatus = 'Exists' | 'NotExists' | 'Unknown' | 'Inaccessible' | 'CanBeVisited';

export type SiteInfo = {
  id: string;  // Add unique ID to match with pointsOfInterest
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
    id: 'botanical_garden',  // Using snake_case format to match pointsOfInterest
    name: 'Botanical Garden',
    description:
      'A beautiful garden with a greenhouse. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    types: ['Historical', 'Natural', 'Cultural'],
    coordinates: [-49.245, -25.441],
    images: [],
  },
  {
    id: 'oscar_niemeyer_museum',
    name: 'Oscar Niemeyer Museum',
    description:
      'A museum dedicated to visual arts, architecture, and design. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    types: ['Historical', 'Cultural', 'Architectural'],
    coordinates: [-49.263, -25.416],
    images: [],
  },
  // {
  //   id: 'teste_teste',
  //   name: 'Teste Teste',
  //   description:
  //     'A museum dedicated to visual arts, architecture, and design. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //   types: ['Historical'],
  //   coordinates: [-49.263, -25.4162],
  //   images: [],
  // },
  {
    id: 'paroquia_nossa_senhora_das_merces',  // Matches the ID in neighborhoodInfo.ts
    name: 'Paróquia Nossa Senhora das Mercês',
    description: `Do alto, é possível observar\n que a estrutura mantém o desenho quadrilátero tradicional das igrejas \ncatólicas europeias, sendo que a igreja está localizada à esquerda da torre, e à sua direita está o jardim interno da instituição. \nAinda ao lado esquerdo da igreja, na pequena casa, funcionava o Grupo Escolar São Francisco de Assis. Nas demais edificações religiosas presentes na imagem, encontravam-se o salão paroquial e o Convento dos Freis Capuchinhos, responsáveis pela congregação. Lore ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lore ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Do alto, é possível observar que a estrutura mantém o desenho quadrilátero tradicional das igrejas católicas europeias, sendo que a igreja está localizada à esquerda da torre, e à sua direita está o jardim interno da instituição. Ainda ao lado esquerdo da igreja, na pequena casa, funcionava o Grupo Escolar São Francisco de Assis. Nas demais edificações religiosas presentes na imagem, encontravam-se o salão paroquial e o Convento dos Freis Capuchinhos, responsáveis pela congregação. Lore ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lore ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Do alto, é possível observar que a estrutura mantém o desenho quadrilátero tradicional das igrejas católicas europeias, sendo que a igreja está localizada à esquerda da torre, e à sua direita está o jardim interno da instituição. Ainda ao lado esquerdo da igreja, na pequena casa, funcionava o Grupo Escolar São Francisco de Assis. Nas demais edificações religiosas presentes na imagem, encontravam-se o salão paroquial e o Convento dos Freis Capuchinhos, responsáveis pela congregação. Lore ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lore ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. oioioioioioeiijasndjasjdnasjdsaijdisaduiasndjsandhabsdbas oie oie`,
    types: ['Historical', 'Religious', 'Architectural'],
    coordinates: [-49.2879372, -25.4162],
    images: [
      'https://i.pinimg.com/736x/51/cb/37/51cb37ea44e978e03958f5fec9334227.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC5EbtKKYD3zmNKJf1EThidFhsSajAxVoZUQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSla5WcG7IXgQFooy1LTBGbX7PFNrkaetgRBg&s',
    ],
    status: ['Exists', 'CanBeVisited'],
  },
  {
    id: 'terminal_do_boqueirao',
    name: 'Terminal do Boqueirão',
    description: 'Um dos principais terminais de ônibus da cidade de Curitiba, facilitando o transporte público para os moradores da região.',
    types: ['Architectural'],
    coordinates: [-49.2680, -25.5003],
    images: [],
    status: ['Exists', 'CanBeVisited'],
  },
  {
    id: 'parque_nautico',
    name: 'Parque Náutico',
    description: 'Localizado às margens do Rio Iguaçu, o Parque Náutico é um espaço de lazer com áreas para esportes aquáticos e caminhada.',
    types: ['Natural'],
    coordinates: [-49.2550, -25.5100],
    images: [],
    status: ['Exists', 'CanBeVisited'],
  },
  {
    id: 'torre_da_oi',
    name: 'Torre da Oi',
    description: 'Torre de telecomunicações localizada no bairro Mercês, sendo um ponto de referência na região.',
    types: ['Architectural'],
    coordinates: [-49.2944206, -25.4240048],
    images: [],
    status: ['Exists'],
  }
];
