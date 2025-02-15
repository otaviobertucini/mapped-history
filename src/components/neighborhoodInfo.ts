type Neighborhood = {
    name: string;
    description: string;
    dateOfFounding: string;
    image?: string | null;
    pointsOfInterest: string[];
  };
  
  type NeighborhoodInfo = {
    [key: string]: Neighborhood;
  };
  
  export const neighborhoodInfo: NeighborhoodInfo = {
    Boqueirão: {
      name: 'Boqueirão',
      description: 'Boqueirão é um bairro tradicional de Curitiba, conhecido por sua forte presença comercial e residencial. O bairro possui uma infraestrutura completa, com escolas, hospitais, e uma variedade de lojas e serviços. É também famoso pelo Terminal do Boqueirão, um dos principais terminais de ônibus da cidade, que facilita o transporte público para os moradores.',
      dateOfFounding: '1900-01-01',
      pointsOfInterest: ['Terminal do Boqueirão', 'Parque Náutico', 'Shopping Cidade'],
    },
    "Água Verde": {
      name: 'Água Verde',
      description: 'Água Verde é um bairro nobre de Curitiba, caracterizado por suas ruas arborizadas e uma grande quantidade de edifícios residenciais de alto padrão. O bairro oferece uma excelente qualidade de vida, com diversas opções de lazer, como o Clube Curitibano e o Estádio Joaquim Américo, além de uma ampla gama de serviços e comércios.',
      dateOfFounding: '1920-01-01',
      pointsOfInterest: ['Clube Curitibano', 'Estádio Joaquim Américo', 'Praça do Japão'],
    },
    Batel: {
      name: 'Batel',
      description: 'Batel é um dos bairros mais sofisticados de Curitiba, conhecido por suas avenidas elegantes e uma vida noturna vibrante. O bairro abriga diversos bares, restaurantes e shoppings de luxo, como o Pátio Batel. É também um importante centro comercial e empresarial, com várias sedes de empresas e escritórios.',
      dateOfFounding: '1930-01-01',
      pointsOfInterest: ['Pátio Batel', 'Praça da Espanha', 'Shopping Crystal'],
    },
    "Cidade Industrial de Curitiba": {
      name: 'Cidade Industrial de Curitiba (CIC)',
      description: 'A Cidade Industrial de Curitiba, conhecida como CIC, é o maior bairro em área da cidade e um importante polo industrial. O bairro abriga diversas indústrias e empresas, além de contar com áreas residenciais e comerciais. A CIC é um dos bairros mais populosos de Curitiba e possui uma infraestrutura completa para atender seus moradores.',
      dateOfFounding: '1973-01-01',
      pointsOfInterest: ['Parque dos Tropeiros', 'Terminal CIC', 'Shopping Total'],
    },
    "Sítio Cercado": {
      name: 'Sítio Cercado',
      description: 'Sítio Cercado é um bairro residencial de Curitiba, conhecido por sua grande população e infraestrutura em crescimento. O bairro oferece uma variedade de serviços e comércios, além de escolas e unidades de saúde. É um bairro em constante desenvolvimento, com novas áreas residenciais e comerciais surgindo a cada ano.',
      dateOfFounding: '1980-01-01',
      pointsOfInterest: ['Terminal Sítio Cercado', 'Parque do Semeador', 'Centro Cultural Sítio Cercado'],
    },
    Cajuru: {
      name: 'Cajuru',
      description: 'Cajuru é um bairro residencial e comercial de Curitiba, conhecido por sua diversidade cultural e infraestrutura completa. O bairro possui escolas, hospitais, e uma variedade de lojas e serviços. Cajuru também é famoso por suas áreas verdes e parques, que oferecem opções de lazer e recreação para os moradores.',
      dateOfFounding: '1940-01-01',
      pointsOfInterest: ['Parque dos Peladeiros', 'Terminal Vila Oficinas', 'Shopping Jardim das Américas'],
    },
    Abranches: {
      name: 'Abranches',
      description: 'Abranches é um bairro tranquilo e residencial de Curitiba, conhecido por suas áreas verdes e ambiente familiar. O bairro possui uma boa infraestrutura, com escolas, comércios e serviços. É um local ideal para quem busca qualidade de vida e contato com a natureza.',
      dateOfFounding: '1950-01-01',
      pointsOfInterest: ['Parque Tanguá', 'Igreja de São José', 'Memorial Ucraniano'],
    },
    Atuba: {
      name: 'Atuba',
      description: 'Atuba é um bairro residencial de Curitiba, localizado na divisa com o município de Colombo. O bairro é conhecido por suas áreas verdes e tranquilidade, oferecendo uma boa qualidade de vida para seus moradores. Atuba possui uma infraestrutura completa, com escolas, comércios e serviços.',
      dateOfFounding: '1960-01-01',
      pointsOfInterest: ['Parque Atuba', 'Terminal Atuba', 'Igreja de São Pedro'],
    },
    Bacacheri: {
      name: 'Bacacheri',
      description: 'Bacacheri é um bairro residencial e comercial de Curitiba, conhecido por suas ruas arborizadas e ambiente tranquilo. O bairro possui uma boa infraestrutura, com escolas, hospitais, e uma variedade de lojas e serviços. Bacacheri também é famoso por seu aeroporto e pelo Parque Bacacheri, que oferece opções de lazer e recreação.',
      dateOfFounding: '1970-01-01',
      pointsOfInterest: ['Aeroporto do Bacacheri', 'Parque Bacacheri', 'Museu Egípcio'],
    },
    "Bairro Alto": {
      name: 'Bairro Alto',
      description: 'Bairro Alto é um bairro residencial de Curitiba, conhecido por sua tranquilidade e infraestrutura completa. O bairro possui escolas, hospitais, e uma variedade de lojas e serviços. Bairro Alto também é famoso por suas áreas verdes e parques, que oferecem opções de lazer e recreação para os moradores.',
      dateOfFounding: '1980-01-01',
      pointsOfInterest: ['Parque Barreirinha', 'Terminal Bairro Alto', 'Igreja de São João Batista'],
    },
    Barreirinha: {
      name: 'Barreirinha',
      description: 'Barreirinha é um bairro residencial de Curitiba, conhecido por suas áreas verdes e ambiente tranquilo. O bairro possui uma boa infraestrutura, com escolas, comércios e serviços. Barreirinha é um local ideal para quem busca qualidade de vida e contato com a natureza.',
      dateOfFounding: '1990-01-01',
      pointsOfInterest: ['Parque Barreirinha', 'Terminal Barreirinha', 'Igreja de São Sebastião'],
    },
    "Boa Vista": {
      name: 'Boa Vista',
      description: 'Boa Vista é um bairro residencial e comercial de Curitiba, conhecido por sua infraestrutura completa e ambiente tranquilo. O bairro possui escolas, hospitais, e uma variedade de lojas e serviços. Boa Vista também é famoso por suas áreas verdes e parques, que oferecem opções de lazer e recreação para os moradores.',
      dateOfFounding: '2000-01-01',
      pointsOfInterest: ['Parque Bacacheri', 'Terminal Boa Vista', 'Igreja de Nossa Senhora da Luz'],
    },
    // Adicione mais bairros conforme necessário
  };