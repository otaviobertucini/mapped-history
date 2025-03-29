export type PointOfInterest = {
  name: string;
  id: string;
};

type Neighborhood = {
  name: string;
  description: string;
  dateOfFounding: string;
  images?: string[];
  pointsOfInterest: PointOfInterest[];
};

type NeighborhoodInfo = {
  [key: string]: Neighborhood;
};

export const neighborhoodInfo: NeighborhoodInfo = {
  Boqueirão: {
    name: 'Boqueirão',
    description:
      'Boqueirão é um bairro tradicional de Curitiba, conhecido por sua forte presença comercial e residencial. O bairro possui uma infraestrutura completa, com escolas, hospitais, e uma variedade de lojas e serviços. É também famoso pelo Terminal do Boqueirão, um dos principais terminais de ônibus da cidade, que facilita o transporte público para os moradores.',
    dateOfFounding: '1900-01-01',
    pointsOfInterest: [
      { name: 'Terminal do Boqueirão', id: 'terminal_do_boqueirao' },
      { name: 'Parque Náutico', id: 'parque_nautico' },
      { name: 'Shopping Cidade', id: 'shopping_cidade' }
    ],
    images: [
      'https://i.pinimg.com/736x/51/cb/37/51cb37ea44e978e03958f5fec9334227.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC5EbtKKYD3zmNKJf1EThidFhsSajAxVoZUQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSla5WcG7IXgQFooy1LTBGbX7PFNrkaetgRBg&s',
    ],
  },
  'Água Verde': {
    name: 'Água Verde',
    description:
      'Água Verde é um bairro nobre de Curitiba, caracterizado por suas ruas arborizadas e uma grande quantidade de edifícios residenciais de alto padrão. O bairro oferece uma excelente qualidade de vida, com diversas opções de lazer, como o Clube Curitibano e o Estádio Joaquim Américo, além de uma ampla gama de serviços e comércios.',
    dateOfFounding: '1920-01-01',
    pointsOfInterest: [
      { name: 'Clube Curitibano', id: 'clube_curitibano' },
      { name: 'Estádio Joaquim Américo', id: 'estadio_joaquim_americo' },
      { name: 'Praça do Japão', id: 'praca_do_japao' }
    ],
  },
  Batel: {
    name: 'Batel',
    description:
      'Batel é um dos bairros mais sofisticados de Curitiba, conhecido por suas avenidas elegantes e uma vida noturna vibrante. O bairro abriga diversos bares, restaurantes e shoppings de luxo, como o Pátio Batel. É também um importante centro comercial e empresarial, com várias sedes de empresas e escritórios.',
    dateOfFounding: '1930-01-01',
    pointsOfInterest: [
      { name: 'Pátio Batel', id: 'patio_batel' },
      { name: 'Praça da Espanha', id: 'praca_da_espanha' },
      { name: 'Shopping Crystal', id: 'shopping_crystal' }
    ],
  },
  'Cidade Industrial de Curitiba': {
    name: 'Cidade Industrial de Curitiba (CIC)',
    description:
      'A Cidade Industrial de Curitiba, conhecida como CIC, é o maior bairro em área da cidade e um importante polo industrial. O bairro abriga diversas indústrias e empresas, além de contar com áreas residenciais e comerciais. A CIC é um dos bairros mais populosos de Curitiba e possui uma infraestrutura completa para atender seus moradores.',
    dateOfFounding: '1973-01-01',
    pointsOfInterest: [
      { name: 'Parque dos Tropeiros', id: 'parque_dos_tropeiros' },
      { name: 'Terminal CIC', id: 'terminal_cic' },
      { name: 'Shopping Total', id: 'shopping_total' }
    ],
  },
  'Sítio Cercado': {
    name: 'Sítio Cercado',
    description:
      'Sítio Cercado é um bairro residencial de Curitiba, conhecido por sua grande população e infraestrutura em crescimento. O bairro oferece uma variedade de serviços e comércios, além de escolas e unidades de saúde. É um bairro em constante desenvolvimento, com novas áreas residenciais e comerciais surgindo a cada ano.',
    dateOfFounding: '1980-01-01',
    pointsOfInterest: [
      { name: 'Terminal Sítio Cercado', id: 'terminal_sitio_cercado' },
      { name: 'Parque do Semeador', id: 'parque_do_semeador' },
      { name: 'Centro Cultural Sítio Cercado', id: 'centro_cultural_sitio_cercado' }
    ],
  },
  Cajuru: {
    name: 'Cajuru',
    description:
      'Cajuru é um bairro residencial e comercial de Curitiba, conhecido por sua diversidade cultural e infraestrutura completa. O bairro possui escolas, hospitais, e uma variedade de lojas e serviços. Cajuru também é famoso por suas áreas verdes e parques, que oferecem opções de lazer e recreação para os moradores.',
    dateOfFounding: '1940-01-01',
    pointsOfInterest: [
      { name: 'Parque dos Peladeiros', id: 'parque_dos_peladeiros' },
      { name: 'Terminal Vila Oficinas', id: 'terminal_vila_oficinas' },
      { name: 'Shopping Jardim das Américas', id: 'shopping_jardim_das_americas' }
    ],
  },
  Mercês: {
    name: 'Mercês',
    description:
      'Por outro lado, a execução dos pontos do programa estimula a padronização do sistema de formação de quadros que corresponde às necessidades. Acima de tudo, é fundamental ressaltar que a mobilidade dos capitais internacionais cumpre um papel essencial na formulação das posturas dos órgãos dirigentes com relação às suas atribuições. Do mesmo modo, a complexidade dos estudos efetuados oferece uma interessante oportunidade para verificação do impacto na agilidade decisória.\n No entanto, não podemos esquecer que a estrutura atual da organização pode nos levar a considerar a reestruturação das formas de ação. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que o novo modelo estrutural aqui preconizado causa impacto indireto na reavaliação da gestão inovadora da qual fazemos parte. A prática cotidiana prova que o entendimento das metas propostas apresenta tendências no sentido de aprovar a manutenção do investimento em reciclagem técnica. Ainda assim, existem dúvidas a respeito de como o início da atividade geral de formação de atitudes afeta positivamente a correta previsão das condições financeiras e administrativas exigidas.\n Percebemos, cada vez mais, que a contínua expansão de nossa atividade obstaculiza a apreciação da importância das condições inegavelmente apropriadas. O cuidado em identificar pontos críticos na consolidação das estruturas é uma das consequências do orçamento setorial. O incentivo ao avanço tecnológico, assim como o surgimento do comércio virtual acarreta um processo de reformulação e modernização dos métodos utilizados na avaliação de resultados.',
    dateOfFounding: '1940-01-01',
    pointsOfInterest: [
      { name: 'Casa do Otávio', id: 'casa_do_otavio' },
      { name: 'Paróquia Nossa Senhora das Mercês', id: 'paroquia_nossa_senhora_das_merces' },
      { name: 'Torre da Oi', id: 'torre_da_oi' }
    ],
  },
  Abranches: {
    name: 'Abranches',
    description:
      'Abranches é um bairro tranquilo e residencial de Curitiba, conhecido por suas áreas verdes e ambiente familiar. O bairro possui uma boa infraestrutura, com escolas, comércios e serviços. É um local ideal para quem busca qualidade de vida e contato com a natureza.',
    dateOfFounding: '1950-01-01',
    pointsOfInterest: [
      { name: 'Parque Tanguá', id: 'parque_tangua' },
      { name: 'Igreja de São José', id: 'igreja_sao_jose' },
      { name: 'Memorial Ucraniano', id: 'memorial_ucraniano' }
    ],
  },
  Atuba: {
    name: 'Atuba',
    description:
      'Atuba é um bairro residencial de Curitiba, localizado na divisa com o município de Colombo. O bairro é conhecido por suas áreas verdes e tranquilidade, oferecendo uma boa qualidade de vida para seus moradores. Atuba possui uma infraestrutura completa, com escolas, comércios e serviços.',
    dateOfFounding: '1960-01-01',
    pointsOfInterest: [
      { name: 'Parque Atuba', id: 'parque_atuba' },
      { name: 'Terminal Atuba', id: 'terminal_atuba' },
      { name: 'Igreja de São Pedro', id: 'igreja_sao_pedro' }
    ],
  },
  Bacacheri: {
    name: 'Bacacheri',
    description:
      'Bacacheri é um bairro residencial e comercial de Curitiba, conhecido por suas ruas arborizadas e ambiente tranquilo. O bairro possui uma boa infraestrutura, com escolas, hospitais, e uma variedade de lojas e serviços. Bacacheri também é famoso por seu aeroporto e pelo Parque Bacacheri, que oferece opções de lazer e recreação.',
    dateOfFounding: '1970-01-01',
    pointsOfInterest: [
      { name: 'Aeroporto do Bacacheri', id: 'aeroporto_bacacheri' },
      { name: 'Parque Bacacheri', id: 'parque_bacacheri' },
      { name: 'Museu Egípcio', id: 'museu_egipcio' }
    ],
  },
  'Bairro Alto': {
    name: 'Bairro Alto',
    description:
      'Bairro Alto é um bairro residencial de Curitiba, conhecido por sua tranquilidade e infraestrutura completa. O bairro possui escolas, hospitais, e uma variedade de lojas e serviços. Bairro Alto também é famoso por suas áreas verdes e parques, que oferecem opções de lazer e recreação para os moradores.',
    dateOfFounding: '1980-01-01',
    pointsOfInterest: [
      { name: 'Parque Barreirinha', id: 'parque_barreirinha' },
      { name: 'Terminal Bairro Alto', id: 'terminal_bairro_alto' },
      { name: 'Igreja de São João Batista', id: 'igreja_sao_joao_batista' }
    ],
  },
  Barreirinha: {
    name: 'Barreirinha',
    description:
      'Barreirinha é um bairro residencial de Curitiba, conhecido por suas áreas verdes e ambiente tranquilo. O bairro possui uma boa infraestrutura, com escolas, comércios e serviços. Barreirinha é um local ideal para quem busca qualidade de vida e contato com a natureza.',
    dateOfFounding: '1990-01-01',
    pointsOfInterest: [
      { name: 'Parque Barreirinha', id: 'parque_barreirinha' },
      { name: 'Terminal Barreirinha', id: 'terminal_barreirinha' },
      { name: 'Igreja de São Sebastião', id: 'igreja_sao_sebastiao' }
    ],
  },
  'Boa Vista': {
    name: 'Boa Vista',
    description:
      'Boa Vista é um bairro residencial e comercial de Curitiba, conhecido por sua infraestrutura completa e ambiente tranquilo. O bairro possui escolas, hospitais, e uma variedade de lojas e serviços. Boa Vista também é famoso por suas áreas verdes e parques, que oferecem opções de lazer e recreação para os moradores.',
    dateOfFounding: '2000-01-01',
    pointsOfInterest: [
      { name: 'Parque Bacacheri', id: 'parque_bacacheri' },
      { name: 'Terminal Boa Vista', id: 'terminal_boa_vista' },
      { name: 'Igreja de Nossa Senhora da Luz', id: 'igreja_nossa_senhora_da_luz' }
    ],
  },
  // Adicione mais bairros conforme necessário
};
