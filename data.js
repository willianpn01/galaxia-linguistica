const figurasDeLinguagem = [
    {
        id: 'antitese',
        nome: 'Antítese',
        tipo: 'pensamento',
        descricao: 'Figura pela qual se opõem, numa mesma frase, duas palavras ou dois pensamentos de sentido contrário.',
        exemplo: 'O riso e o choro são vizinhos.',
        cor: '#FFD700'
    },
    {
        id: 'paradoxo',
        nome: 'Paradoxo',
        tipo: 'pensamento',
        descricao: 'Une ideias ou termos contraditórios para expressar uma verdade mais profunda ou complexa',
        exemplo: 'Para conhecer o meu interior é preciso sair de mim.',
        cor: '#FFD700'
    },
    {
        id: 'prosopopeia',
        nome: 'Prosopopeia',
        tipo: 'pensamento',
        descricao: 'Atribuição de qualidades humanas a seres inanimados ou irracionais. Também chamada de personificação.',
        exemplo: 'A lua pedia a cada estrela fria um brilho de aluguel.',
        cor: '#FFD700'
    },
    {
        id: 'hiperbole',
        nome: 'Hipérbole',
        tipo: 'pensamento',
        descricao: 'Exagero intencional para aumentar a expressividade.',
        exemplo: 'Vou morrer de rir!',
        cor: '#FFD700'
    },
    {
        id: 'eufemismo',
        nome: 'Eufemismo',
        tipo: 'pensamento',
        descricao: 'Suavização de uma ideia ou expressão considerada desagradável ou chocante.',
        exemplo: 'Ele partiu dessa para melhor. (Morreu)',
        cor: '#FFD700'
    },
    {
        id: 'ironia',
        nome: 'Ironia',
        tipo: 'pensamento',
        descricao: 'Dizer o contrário do que se pensa, geralmente com tom de sarcasmo.',
        exemplo: 'Que belo comportamento, entrando na sala sem cumprimentar ninguém...',
        cor: '#FFD700'
    },
    {
        id: 'gradacao',
        nome: 'Gradação',
        tipo: 'pensamento',
        descricao: 'Sequência de ideias que progridem de forma ascendente (clímax) ou descendente.',
        exemplo: 'Eu era pobre, era subalterno, era nada.',
        cor: '#FFD700'
    },
    {
        id: 'apostrofe',
        nome: 'Apóstrofe',
        tipo: 'pensamento',
        descricao: 'Consiste em uma invocação ou interpelação direta a alguém (real ou imaginário) ou algo, interrompendo o discurso para chamar a atenção.',
        exemplo: 'Deus! Ó Deus! Onde estás que não respondes?',
        cor: '#FFD700'
    },
    {
        id: 'anafora',
        nome: 'Anáfora',
        tipo: 'sintaxe',
        descricao: 'Repetição intencional da mesma palavra ou expressão no início de orações ou versos.',
        exemplo: 'É pau, é pedra, é o fim do caminho.',
        cor: '#4169E1'
    },
    {
        id: 'polissindeto',
        nome: 'Polissíndeto',
        tipo: 'sintaxe',
        descricao: 'Repetição intencional de conectivos (conjunções).',
        exemplo: 'Chegou, e viu, e venceu, e foi embora.',
        cor: '#4169E1'
    },
    {
        id: 'assindeto',
        nome: 'Assíndeto',
        tipo: 'sintaxe',
        descricao: 'Ausência de conectivos entre orações ou termos.',
        exemplo: 'Vim, vi, venci.',
        cor: '#4169E1'
    },
    {
        id: 'elipse',
        nome: 'Elipse',
        tipo: 'sintaxe',
        descricao: 'Omissão de um termo que fica subentendido pelo contexto.',
        exemplo: 'Na sala, apenas quatro ou cinco convidados. (Omissão de "havia")',
        cor: '#4169E1'
    },
    {
        id: 'zeugma',
        nome: 'Zeugma',
        tipo: 'sintaxe',
        descricao: 'Tipo de elipse onde o termo omitido já foi mencionado anteriormente.',
        exemplo: 'Eu gosto de futebol; ele, de vôlei.',
        cor: '#4169E1'
    },
    {
        id: 'hiperbato',
        nome: 'Hipérbato',
        tipo: 'sintaxe',
        descricao: 'Inversão brusca da ordem direta dos termos da oração.',
        exemplo: 'Ouviram do Ipiranga as margens plácidas...',
        cor: '#4169E1'
    },
    {
        id: 'anacoluto',
        nome: 'Anacoluto',
        tipo: 'sintaxe',
        descricao: 'Mudança repentina na construção da frase, deixando um termo solto no início.',
        exemplo: 'O rapaz, não sei o que aconteceu com ele.',
        cor: '#4169E1'
    },
    {
        id: 'pleonasmo',
        nome: 'Pleonasmo',
        tipo: 'sintaxe',
        descricao: 'Redundância usada para reforçar a mensagem.',
        exemplo: 'Me sorri um sorriso pontual.',
        cor: '#4169E1'
    },
    {
        id: 'silepse',
        nome: 'Silepse',
        tipo: 'sintaxe',
        descricao: 'Concordância feita com a ideia (sentido) e não com a palavra escrita (gênero ou número).',
        exemplo: 'A gente fomos embora cedo.',
        cor: '#4169E1'
    },
    {
        id: 'aliteracao',
        nome: 'Aliteração',
        tipo: 'som',
        descricao: 'Repetição sistemática de sons consonantais.',
        exemplo: 'O rato roeu a roupa do rei de Roma.',
        cor: '#FF00FF'
    },
    {
        id: 'assonancia',
        nome: 'Assonância',
        tipo: 'som',
        descricao: 'Repetição sistemática de sons vocálicos.',
        exemplo: 'Sou Ana, da cama, da cana, fulana, bacana.',
        cor: '#FF00FF'
    },
    {
        id: 'paronomasia',
        nome: 'Paronomásia',
        tipo: 'som',
        descricao: 'Uso de palavras com sons parecidos (parônimos) mas sentidos diferentes.',
        exemplo: 'Quem casa quer casa.',
        cor: '#FF00FF'
    },
    {
        id: 'onomatopeia',
        nome: 'Onomatopeia',
        tipo: 'som',
        descricao: 'Palavra que imita um som natural ou ruído.',
        exemplo: 'O tiquetaque do relógio me deixava louco.',
        cor: '#FF00FF'
    },
    {
        id: 'harmonia_imitativa',
        nome: 'Harmonia Imitativa',
        tipo: 'som',
        descricao: 'Busca sugerir, através do ritmo e dos sons, o próprio objeto ou ação descrita (engloba aliteração/assonância).',
        exemplo: 'Boi bem bravo, bate baixo, bota baba, boi berrando...',
        cor: '#FF00FF'
    },
    {
        id: 'metafora',
        nome: 'Metáfora',
        tipo: 'palavra',
        descricao: 'Comparação implícita, sem uso de conectivos comparativos.',
        exemplo: 'A vida é uma nuvem que voa.',
        cor: '#00CED1'
    },
    {
        id: 'comparacao',
        nome: 'Comparação',
        tipo: 'palavra',
        descricao: 'Comparação explícita, usando conectivos (como, tal qual, etc).',
        exemplo: 'A vida é como uma nuvem.',
        cor: '#00CED1'
    },
    {
        id: 'metonimia',
        nome: 'Metonímia',
        tipo: 'palavra',
        descricao: 'Substituição de um termo por outro com o qual tem relação de proximidade (parte pelo todo, autor pela obra, etc).',
        exemplo: 'Li Machado de Assis.',
        cor: '#00CED1'
    },
    {
        id: 'catacrese',
        nome: 'Catacrese',
        tipo: 'palavra',
        descricao: 'Metáfora desgastada pelo uso, usada por falta de nome específico.',
        exemplo: 'Pé da mesa, dente de alho, barriga da perna.',
        cor: '#00CED1'
    },
    {
        id: 'sinestesia',
        nome: 'Sinestesia',
        tipo: 'palavra',
        descricao: 'Mistura de sensações de sentidos diferentes (visão, audição, tato, paladar, olfato).',
        exemplo: 'Um cheiro doce e verde.',
        cor: '#00CED1'
    },
    {
        id: 'perифrase',
        nome: 'Perífrase',
        tipo: 'palavra',
        descricao: 'Substituição de um termo por uma expressão que o identifique ou caracterize (apelido).',
        exemplo: 'Cidade Maravilhosa (Rio de Janeiro).',
        cor: '#00CED1'
    },
    {
        id: 'antonomasia',
        nome: 'Antonomásia',
        tipo: 'palavra',
        descricao: 'Substituição de um nome próprio por um atributo ou característica (tipo de perífrase para nomes).',
        exemplo: 'O Poeta dos Escravos (Castro Alves).',
        cor: '#00CED1'
    }
];

const planetasConfig = {
    pensamento: {
        nome: 'Pensamento',
        cor: '#1800ad',
        posicao: { x: -15, y: 5, z: -10 },
        tamanho: 2.5,
        orbitaRaio: 8
    },
    sintaxe: {
        nome: 'Sintaxe',
        cor: '#8c52ff',
        posicao: { x: 15, y: -3, z: -8 },
        tamanho: 2.5,
        orbitaRaio: 8
    },
    som: {
        nome: 'Som',
        cor: '#f53ec5',
        posicao: { x: -12, y: -8, z: 5 },
        tamanho: 2.5,
        orbitaRaio: 8
    },
    palavra: {
        nome: 'Palavra',
        cor: '#FBB03B',
        posicao: { x: 12, y: 6, z: 8 },
        tamanho: 2.5,
        orbitaRaio: 8
    }
};
