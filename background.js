// Configuração da Cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// Inserir o canvas antes de tudo no body
document.body.insertBefore(renderer.domElement, document.body.firstChild);

// Estilização do Canvas para ficar no fundo
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
renderer.domElement.style.zIndex = '-1';
renderer.domElement.style.background = 'radial-gradient(circle at center, #1b2735 0%, #090a0f 100%)'; // Fallback / Blend

// Criação das Estrelas
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 5000;
const posArray = new Float32Array(starsCount * 3); // x, y, z
const colorArray = new Float32Array(starsCount * 3); // r, g, b

// Cores base para as estrelas (azuladas, brancas, roxas)
const starColors = [
    new THREE.Color('#ffffff'), // Branco
    new THREE.Color('#ADD8E6'), // Azul claro
    new THREE.Color('#E6E6FA'), // Lavanda
    new THREE.Color('#FFD700')  // Dourado (raro)
];

for (let i = 0; i < starsCount * 3; i += 3) {
    // Espalhar estrelas em um volume grande
    posArray[i] = (Math.random() - 0.5) * 50;   // x
    posArray[i + 1] = (Math.random() - 0.5) * 50; // y
    posArray[i + 2] = (Math.random() - 0.5) * 50; // z

    // Cor aleatória
    const color = starColors[Math.floor(Math.random() * starColors.length)];
    colorArray[i] = color.r;
    colorArray[i + 1] = color.g;
    colorArray[i + 2] = color.b;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

// Material das Estrelas
const starsMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,     // Usar as cores definidas no geometry
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true   // Estrelas ficam menores longe
});

const starMesh = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starMesh);

camera.position.z = 5;

// Interatividade com Mouse
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animação
function animate() {
    requestAnimationFrame(animate);

    // Rotação suave constante
    starMesh.rotation.y += 0.0005;
    starMesh.rotation.x += 0.0002;

    // Movimento com mouse (Parallax suave)
    // Lerp (Linear Interpolation) para suavizar
    starMesh.rotation.y += 0.05 * (mouseX - starMesh.rotation.y * 0.1) * 0.05;
    starMesh.rotation.x += 0.05 * (mouseY - starMesh.rotation.x * 0.1) * 0.05;

    renderer.render(scene, camera);
}

// Responsividade
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
