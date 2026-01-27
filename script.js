const figures = [
    // --- Figuras de Pensamento (Amarelo/Ouro) ---
    { id: "antítese", group: "Pensamento", definition: "Aproximação de ideias ou palavras com sentidos opostos.", example: "O riso e o choro são vizinhos." },
    { id: "paradoxo", group: "Pensamento", definition: "Ideia aparentemente absurda ou contraditória que, no contexto, revela uma verdade.", example: "Para conhecer o meu interior é preciso sair de mim." },
    { id: "prosopopeia", group: "Pensamento", definition: "Atribuição de qualidades humanas a seres inanimados ou irracionais. Também chamada de personificação.", example: "A lua pedia a cada estrela fria um brilho de aluguel." },
    { id: "hipérbole", group: "Pensamento", definition: "Exagero intencional para aumentar a expressividade.", example: "Vou morrer de rir!" },
    { id: "eufemismo", group: "Pensamento", definition: "Suavização de uma ideia ou expressão considerada desagradável ou chocante.", example: "Ele partiu dessa para melhor. (Morreu)" },
    { id: "ironia", group: "Pensamento", definition: "Dizer o contrário do que se pensa, geralmente com tom de sarcasmo.", example: "Que belo comportamento, entrando na sala sem cumprimentar ninguém..." },
    { id: "gradação", group: "Pensamento", definition: "Sequência de ideias que progridem de forma ascendente (clímax) ou descendente.", example: "Eu era pobre, era subalterno, era nada." },
    { id: "apóstrofe", group: "Pensamento", definition: "Interpelação enfática a alguém ou algo (real ou imaginário), interrompendo o discurso.", example: "Deus! Ó Deus! Onde estás que não respondes?" },

    // --- Figuras de Sintaxe (Azul) ---
    { id: "anáfora", group: "Sintaxe", definition: "Repetição intencional da mesma palavra ou expressão no início de orações ou versos.", example: "É pau, é pedra, é o fim do caminho." },
    { id: "polissíndeto", group: "Sintaxe", definition: "Repetição intencional de conectivos (conjunções).", example: "Chegou, e viu, e venceu, e foi embora." },
    { id: "assíndeto", group: "Sintaxe", definition: "Ausência de conectivos entre orações ou termos.", example: "Vim, vi, venci." },
    { id: "elipse", group: "Sintaxe", definition: "Omissão de um termo que fica subentendido pelo contexto.", example: "Na sala, apenas quatro ou cinco convidados. (Omissão de 'havia')" },
    { id: "zeugma", group: "Sintaxe", definition: "Tipo de elipse onde o termo omitido já foi mencionado anteriormente.", example: "Eu gosto de futebol; ele, de vôlei." },
    { id: "hipérbato", group: "Sintaxe", definition: "Inversão brusca da ordem direta dos termos da oração.", example: "Ouviram do Ipiranga as margens plácidas..." },
    { id: "anacoluto", group: "Sintaxe", definition: "Mudança repentina na construção da frase, deixando um termo solto no início.", example: "O rapaz, não sei o que aconteceu com ele." },
    { id: "pleonasmo", group: "Sintaxe", definition: "Redundância usada para reforçar a mensagem.", example: "Me sorri um sorriso pontual." },
    { id: "silepse", group: "Sintaxe", definition: "Concordância feita com a ideia (sentido) e não com a palavra escrita (gênero ou número).", example: "A gente fomos embora cedo." },

    // --- Figuras de Som (Rosa/Magenta) ---
    { id: "aliteração", group: "Som", definition: "Repetição sistemática de sons consonantais.", example: "O rato roeu a roupa do rei de Roma." },
    { id: "assonância", group: "Som", definition: "Repetição sistemática de sons vocálicos.", example: "Sou Ana, da cama, da cana, fulana, bacana." },
    { id: "paronomásia", group: "Som", definition: "Uso de palavras com sons parecidos (parônimos) mas sentidos diferentes.", example: "Quem casa quer casa." },
    { id: "onomatopeia", group: "Som", definition: "Palavra que imita um som natural ou ruído.", example: "O tiquetaque do relógio me deixava louco." },
    { id: "harmonia imitativa", group: "Som", definition: "Busca sugerir, através do ritmo e dos sons, o próprio objeto ou ação descrita (engloba aliteração/assonância).", example: "Boi bem bravo, bate baixo, bota baba, boi berrando..." },

    // --- Figuras de Palavra (Verde/Cian) ---
    { id: "metáfora", group: "Palavra", definition: "Comparação implícita, sem uso de conectivos comparativos.", example: "A vida é uma nuvem que voa." },
    { id: "comparação", group: "Palavra", definition: "Comparação explícita, usando conectivos (como, tal qual, etc).", example: "A vida é como uma nuvem." },
    { id: "metonímia", group: "Palavra", definition: "Substituição de um termo por outro com o qual tem relação de proximidade (parte pelo todo, autor pela obra, etc).", example: "Li Machado de Assis." },
    { id: "catacrese", group: "Palavra", definition: "Metáfora desgastada pelo uso, usada por falta de nome específico.", example: "Pé da mesa, dente de alho, barriga da perna." },
    { id: "sinestesia", group: "Palavra", definition: "Mistura de sensações de sentidos diferentes (visão, audição, tato, paladar, olfato).", example: "Um cheiro doce e verde." },
    { id: "perífrase", group: "Palavra", definition: "Substituição de um termo por uma expressão que o identifique ou caracterize (apelido).", example: "Cidade Maravilhosa (Rio de Janeiro)." },
    { id: "antonomásia", group: "Palavra", definition: "Substituição de um nome próprio por um atributo ou característica (tipo de perífrase para nomes).", example: "O Poeta dos Escravos (Castro Alves)." }
];

// Config urações de Cores (devem bater com CSS)
const colors = {
    "Pensamento": "#1800ad",
    "Sintaxe": "#8c52ff",
    "Som": "#f53ec5",
    "Palavra": "#FBB03B"
};

const galaxyContainer = document.getElementById('galaxy-container');
const detailOverlay = document.getElementById('detail-overlay');
const closeBtn = document.getElementById('close-btn');

// Elementos do Modal
const modalTitle = document.getElementById('detail-title');
const modalGroup = document.getElementById('detail-group');
const modalDefinition = document.getElementById('detail-definition');
const modalExample = document.getElementById('detail-example');
const modalExampleBox = document.querySelector('.detail-example-box');

// Estado
let activeGroup = 'all';

// Função para gerar coordenadas aleatórias com alguma margem
function getRandomPosition() {
    // Margem de 10% a 90% para evitar bordas extremas
    const x = 5 + Math.random() * 90; 
    const y = 10 + Math.random() * 80;
    return { x, y };
}

// Inicializar a Galáxia
function initGalaxy() {
    galaxyContainer.innerHTML = ''; // Limpar, se recarregar
    
    figures.forEach((fig, index) => {
        const star = document.createElement('div');
        star.classList.add('star');
        star.classList.add('pulsing');
        
        // Atribuir cor
        const color = colors[fig.group] || '#ffffff';
        star.style.setProperty('--color-star', color);
        
        // Posição
        const pos = getRandomPosition();
        star.style.left = `${pos.x}%`;
        star.style.top = `${pos.y}%`;
        
        // Tamanho variado
        const size = 6 + Math.random() * 8; // entre 6px e 14px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Delay de animação aleatório para pulsar orgânico
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        // Dados
        star.dataset.group = fig.group;
        star.dataset.name = fig.id;
        star.dataset.id = fig.id; // Para buscar depois
        
        // Evento de Clique
        star.addEventListener('click', () => openDetail(fig));
        
        galaxyContainer.appendChild(star);
    });
}

// Filtragem
function filterStars(group) {
    activeGroup = group;
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        if (group === 'all' || star.dataset.group === group) {
            star.classList.remove('faded');
        } else {
            star.classList.add('faded');
        }
    });

    // Atualizar botões
    document.querySelectorAll('.planet-btn').forEach(btn => {
        if (btn.dataset.group === group) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Abrir Detalhes
function openDetail(fig) {
    modalTitle.textContent = fig.id;
    modalGroup.textContent = fig.group;
    modalDefinition.textContent = fig.definition;
    modalExample.textContent = `"${fig.example}"`;
    
    // Estilizar o badge e o box com a cor do grupo
    const color = colors[fig.group];
    modalGroup.style.color = color;
    modalGroup.style.borderColor = color;
    modalExampleBox.style.borderLeftColor = color;
    
    // Mostrar modal
    detailOverlay.classList.remove('hidden');
}

// Fechar Detalhes
function closeDetail() {
    detailOverlay.classList.add('hidden');
}

// Event Listeners Globais
document.querySelectorAll('.planet-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Encontrar o botão correto (lidar com clique no ícone interno)
        const target = e.target.closest('.planet-btn');
        const group = target.dataset.group;
        filterStars(group);
    });
});

closeBtn.addEventListener('click', closeDetail);
detailOverlay.addEventListener('click', (e) => {
    if (e.target === detailOverlay) closeDetail();
});

// Start
initGalaxy();
filterStars('all'); // Set initial state
