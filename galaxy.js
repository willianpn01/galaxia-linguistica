class GalaxiaLinguistica {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.raycaster = null;
        this.mouse = null;
        this.planets = {};
        this.planetMeshes = [];
        this.stars = [];
        this.starMeshes = [];
        this.moonLabels = [];
        this.selectedStar = null;
        this.selectedPlanet = null;
        this.isZoomedToPlanet = false;
        this.filtroAtivo = 'all';
        this.clock = new THREE.Clock();
        this.controls = null;
        this.useAssets = this.getUseAssetsMode();
        
        this.init();
        this.createStarfield();
        this.createPlanets();
        this.createStars();
        this.setupEventListeners();
        this.animate();
    }

    getUseAssetsMode() {
        try {
            if (window.location && window.location.protocol === 'file:') {
                return false;
            }
            const params = new URLSearchParams(window.location.search);
            const value = (params.get('assets') || '').toLowerCase();
            if (value === '0' || value === 'false') return false;
            if (value === '1' || value === 'true') return true;
            return true;
        } catch (e) {
            return false;
        }
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000000, 0.015);

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 35);

        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        
        document.getElementById('galaxy-canvas').appendChild(this.renderer.domElement);

        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Points.threshold = 0.5;
        this.mouse = new THREE.Vector2();

        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        directionalLight.position.set(10, 15, 20);
        this.scene.add(directionalLight);

        this.labelContainer = document.createElement('div');
        this.labelContainer.style.position = 'absolute';
        this.labelContainer.style.top = '0';
        this.labelContainer.style.left = '0';
        this.labelContainer.style.pointerEvents = 'none';
        this.labelContainer.style.width = '100%';
        this.labelContainer.style.height = '100%';
        document.getElementById('galaxy-canvas').appendChild(this.labelContainer);

        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    createStarfield() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            transparent: true,
            opacity: 0.8
        });

        const starsVertices = [];
        for (let i = 0; i < 3000; i++) {
            const x = (Math.random() - 0.5) * 200;
            const y = (Math.random() - 0.5) * 200;
            const z = (Math.random() - 0.5) * 200;
            starsVertices.push(x, y, z);
        }

        starsGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(starsVertices, 3)
        );

        const starField = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(starField);
    }

    createPlanets() {
        const textureLoader = this.useAssets ? new THREE.TextureLoader() : null;

        const textureMap = {
            'pensamento': './assets/planet_mind.png',
            'sintaxe': './assets/planet_syntax.png',
            'som': './assets/planet_sound.png',
            'palavra': './assets/planet_word.png'
        };

        Object.entries(planetasConfig).forEach(([tipo, config]) => {
            const geometry = new THREE.SphereGeometry(config.tamanho, 64, 64);

            const material = new THREE.MeshPhongMaterial({
                color: config.cor,
                emissive: config.cor,
                emissiveIntensity: 0.35,
                shininess: 80
            });

            if (this.useAssets && textureLoader && textureMap[tipo]) {
                material.color.set(0xffffff);
                material.emissive.set(0x000000);
                material.emissiveIntensity = 0;

                textureLoader.load(
                    textureMap[tipo],
                    (texture) => {
                        texture.encoding = THREE.sRGBEncoding;
                        texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
                        material.map = texture;
                        material.needsUpdate = true;
                    },
                    undefined,
                    () => {
                        console.error('Falha ao carregar textura do planeta:', textureMap[tipo]);
                    }
                );
            }

            const planet = new THREE.Mesh(geometry, material);
            planet.position.set(config.posicao.x, config.posicao.y, config.posicao.z);
            planet.userData = { tipo, config };

            const glowGeometry = new THREE.SphereGeometry(config.tamanho * 1.2, 32, 32);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: config.cor,
                transparent: true,
                opacity: 0.2,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            planet.add(glow);

            const light = new THREE.PointLight(config.cor, 1, 50);
            light.position.set(0, 0, 0);
            planet.add(light);

            this.scene.add(planet);
            this.planets[tipo] = planet;
            this.planetMeshes.push(planet);
        });
    }


    createStars() {
        figurasDeLinguagem.forEach((figura, index) => {
            const planetConfig = planetasConfig[figura.tipo];
            const angle = (index / figurasDeLinguagem.filter(f => f.tipo === figura.tipo).length) * Math.PI * 2;
            const orbitRadius = planetConfig.orbitaRaio;
            
            const x = planetConfig.posicao.x + Math.cos(angle) * orbitRadius;
            const y = planetConfig.posicao.y + (Math.random() - 0.5) * 2;
            const z = planetConfig.posicao.z + Math.sin(angle) * orbitRadius;

            const geometry = new THREE.SphereGeometry(0.3, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: figura.cor,
                transparent: true,
                opacity: 0.9
            });

            const star = new THREE.Mesh(geometry, material);
            star.position.set(x, y, z);
            star.userData = {
                figura,
                angle,
                orbitRadius,
                planetPos: planetConfig.posicao,
                speed: 0.1 + Math.random() * 0.1,
                originalScale: 1
            };

            const glowGeometry = new THREE.SphereGeometry(0.5, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: figura.cor,
                transparent: true,
                opacity: 0.3,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            star.add(glow);

            const pointLight = new THREE.PointLight(figura.cor, 0.5, 5);
            star.add(pointLight);

            this.scene.add(star);
            this.starMeshes.push(star);
        });
    }

    setupEventListeners() {
        window.addEventListener('mousemove', (event) => this.onMouseMove(event), false);
        window.addEventListener('click', (event) => this.onMouseClick(event), false);

        document.querySelectorAll('.planet-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tipo = e.currentTarget.dataset.tipo;
                this.filterByType(tipo);
                
                document.querySelectorAll('.planet-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        document.getElementById('close-btn').addEventListener('click', () => {
            this.closeInfoPanel();
        });

        document.getElementById('info-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'info-overlay') {
                this.closeInfoPanel();
            }
        });

        document.getElementById('back-btn').addEventListener('click', () => {
            this.zoomOut();
        });
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        if (this.isZoomedToPlanet) {
            const moonMeshes = this.moonLabels.filter(m => m instanceof THREE.Mesh);
            const intersects = this.raycaster.intersectObjects(moonMeshes);
            if (intersects.length > 0) {
                document.body.style.cursor = 'pointer';
                intersects[0].object.scale.setScalar(1.3);
            } else {
                moonMeshes.forEach(moon => moon.scale.setScalar(1));
            }
        } else {
            const starIntersects = this.raycaster.intersectObjects(this.starMeshes);
            const planetIntersects = this.raycaster.intersectObjects(this.planetMeshes);

            this.starMeshes.forEach(star => {
                if (star.userData.originalScale) {
                    star.scale.setScalar(star.userData.originalScale);
                }
            });

            if (starIntersects.length > 0) {
                const hoveredStar = starIntersects[0].object;
                hoveredStar.scale.setScalar(1.5);
                document.body.style.cursor = 'pointer';
            } else if (planetIntersects.length > 0) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
        }
    }

    onMouseClick(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        if (this.isZoomedToPlanet) {
            const moonMeshes = this.moonLabels.filter(m => m instanceof THREE.Mesh);
            const moonIntersects = this.raycaster.intersectObjects(moonMeshes);
            if (moonIntersects.length > 0) {
                const clickedMoon = moonIntersects[0].object;
                this.showInfoPanel(clickedMoon.userData.figura);
            }
        } else {
            const planetIntersects = this.raycaster.intersectObjects(this.planetMeshes);
            const starIntersects = this.raycaster.intersectObjects(this.starMeshes);

            if (planetIntersects.length > 0) {
                const clickedPlanet = planetIntersects[0].object;
                this.zoomToPlanet(clickedPlanet);
            } else if (starIntersects.length > 0) {
                const clickedStar = starIntersects[0].object;
                this.showInfoPanel(clickedStar.userData.figura);
            }
        }
    }

    showInfoPanel(figura) {
        document.getElementById('info-title').textContent = figura.nome;
        document.getElementById('info-tipo').textContent = planetasConfig[figura.tipo].nome;
        document.getElementById('info-tipo').style.color = figura.cor;
        document.getElementById('info-tipo').style.borderColor = figura.cor;
        document.getElementById('info-descricao').textContent = figura.descricao;
        document.getElementById('info-exemplo').textContent = `"${figura.exemplo}"`;
        document.querySelector('.info-exemplo-box').style.borderLeftColor = figura.cor;

        const overlay = document.getElementById('info-overlay');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('visible'), 10);
    }

    closeInfoPanel() {
        const overlay = document.getElementById('info-overlay');
        overlay.classList.remove('visible');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }

    zoomToPlanet(planet) {
        this.selectedPlanet = planet;
        this.isZoomedToPlanet = true;
        const tipo = planet.userData.tipo;

        this.starMeshes.forEach(star => {
            star.visible = false;
        });

        this.planetMeshes.forEach(p => {
            if (p !== planet) {
                p.visible = false;
            }
        });

        const targetPos = new THREE.Vector3(0, 0, 0);
        const cameraPos = new THREE.Vector3(0, 0, 15);

        gsap.to(planet.position, {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
            duration: 1.5,
            ease: "power2.inOut"
        });

        gsap.to(this.camera.position, {
            x: cameraPos.x,
            y: cameraPos.y,
            z: cameraPos.z,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
                this.camera.lookAt(targetPos);
            },
            onComplete: () => {
                this.createMoonLabels(tipo);
            }
        });

        const backBtn = document.getElementById('back-btn');
        backBtn.classList.remove('hidden');
        setTimeout(() => backBtn.classList.add('visible'), 10);
    }

    createMoonLabels(tipo) {
        this.clearMoonLabels();

        const figurasDoPlaneta = figurasDeLinguagem.filter(f => f.tipo === tipo);
        const planetPos = this.planets[tipo].position;
        const moonsPerRing = 10;
        const baseRadius = 4.5;
        const ringSpacing = 2.6;
        const frontZ = planetPos.z + 6;

        figurasDoPlaneta.forEach((figura, index) => {
            const ringIndex = Math.floor(index / moonsPerRing);
            const indexInRing = index % moonsPerRing;
            const itemsInThisRing = Math.min(moonsPerRing, figurasDoPlaneta.length - ringIndex * moonsPerRing);

            const angle = (indexInRing / itemsInThisRing) * Math.PI * 2;
            const radius = baseRadius + ringIndex * ringSpacing;

            const x = planetPos.x + Math.cos(angle) * radius;
            const y = planetPos.y + Math.sin(angle) * radius;
            const z = frontZ;

            const moonGeometry = new THREE.SphereGeometry(0.4, 16, 16);
            const moonMaterial = new THREE.MeshBasicMaterial({
                color: figura.cor,
                transparent: true,
                opacity: 0
            });

            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.position.set(x, y, z);
            moon.userData = {
                figura,
                planetPos,
                angle,
                radius,
                z,
                speed: 0.12
            };

            const glowGeometry = new THREE.SphereGeometry(0.6, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: figura.cor,
                transparent: true,
                opacity: 0,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            moon.add(glow);

            this.scene.add(moon);
            this.moonLabels.push(moon);

            gsap.to(moonMaterial, { opacity: 0.9, duration: 0.8, delay: 0.3 });
            gsap.to(glowMaterial, { opacity: 0.4, duration: 0.8, delay: 0.3 });

            this.createTextLabel(figura.nome, moon.position, figura.cor, moon);
        });
    }

    createTextLabel(text, position, color, moonMesh) {
        const labelDiv = document.createElement('div');
        labelDiv.className = 'moon-label';
        labelDiv.textContent = text;
        labelDiv.style.color = color;
        labelDiv.style.borderColor = color;
        labelDiv.style.opacity = '0';
        
        labelDiv.addEventListener('click', () => {
            this.showInfoPanel(moonMesh.userData.figura);
        });
        
        this.labelContainer.appendChild(labelDiv);
        
        labelDiv.userData = { position3D: position, moonMesh };
        this.moonLabels.push(labelDiv);

        gsap.to(labelDiv.style, { opacity: 1, duration: 0.8, delay: 0.5 });
    }

    clearMoonLabels() {
        this.moonLabels.forEach(label => {
            if (label instanceof HTMLElement) {
                label.remove();
            } else {
                this.scene.remove(label);
                if (label.geometry) label.geometry.dispose();
                if (label.material) {
                    if (label.material.map) label.material.map.dispose();
                    label.material.dispose();
                }
            }
        });
        this.moonLabels = [];
    }

    zoomOut() {
        const backBtn = document.getElementById('back-btn');
        backBtn.classList.remove('visible');
        setTimeout(() => backBtn.classList.add('hidden'), 300);

        this.clearMoonLabels();

        if (this.selectedPlanet) {
            const originalPos = this.selectedPlanet.userData.config.posicao;
            gsap.to(this.selectedPlanet.position, {
                x: originalPos.x,
                y: originalPos.y,
                z: originalPos.z,
                duration: 1.5,
                ease: "power2.inOut"
            });
        }

        this.starMeshes.forEach(star => {
            star.visible = true;
        });

        this.planetMeshes.forEach(planet => {
            planet.visible = true;
        });

        gsap.to(this.camera.position, {
            x: 0,
            y: 0,
            z: 35,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
                this.camera.lookAt(0, 0, 0);
            },
            onComplete: () => {
                this.isZoomedToPlanet = false;
                this.selectedPlanet = null;
            }
        });
    }

    filterByType(tipo) {
        if (tipo === 'all') {
            if (this.isZoomedToPlanet) {
                this.zoomOut();
            }
            this.applyFilter('all');
            return;
        }

        if (this.isZoomedToPlanet) {
            this.zoomOut();
            setTimeout(() => {
                const planet = this.planets[tipo];
                if (planet) this.zoomToPlanet(planet);
            }, 1600);
            return;
        }

        const planet = this.planets[tipo];
        if (planet) this.zoomToPlanet(planet);
    }

    applyFilter(tipo) {
        this.filtroAtivo = tipo;

        this.starMeshes.forEach(star => {
            const figura = star.userData.figura;
            
            if (tipo === 'all' || figura.tipo === tipo) {
                gsap.to(star.material, {
                    opacity: 0.9,
                    duration: 0.5
                });
                gsap.to(star.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.5
                });
                star.visible = true;
            } else {
                gsap.to(star.material, {
                    opacity: 0.1,
                    duration: 0.5
                });
                gsap.to(star.scale, {
                    x: 0.3,
                    y: 0.3,
                    z: 0.3,
                    duration: 0.5
                });
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime();

        Object.values(this.planets).forEach(planet => {
            planet.rotation.y += 0.005;
        });

        if (!this.isZoomedToPlanet) {
            this.starMeshes.forEach((star, index) => {
                const userData = star.userData;
                userData.angle += userData.speed * delta;

                const x = userData.planetPos.x + Math.cos(userData.angle) * userData.orbitRadius;
                const z = userData.planetPos.z + Math.sin(userData.angle) * userData.orbitRadius;
                
                star.position.x = x;
                star.position.z = z;

                const pulse = Math.sin(time * 2 + index) * 0.1 + 1;
                if (star.children[0]) {
                    star.children[0].scale.setScalar(pulse);
                }
            });

            this.camera.position.x += Math.sin(time * 0.1) * 0.01;
            this.camera.position.y += Math.cos(time * 0.15) * 0.01;
            this.camera.lookAt(0, 0, 0);
        } else {
            const moonMeshes = this.moonLabels.filter(m => m instanceof THREE.Mesh);
            moonMeshes.forEach(moon => {
                const u = moon.userData;
                u.angle -= u.speed * delta;
                moon.position.x = u.planetPos.x + Math.cos(u.angle) * u.radius;
                moon.position.y = u.planetPos.y + Math.sin(u.angle) * u.radius;
                moon.position.z = u.z;
                moon.rotation.y += 0.02;
                
                const pulse = Math.sin(time * 2) * 0.05 + 1;
                if (moon.children[0]) {
                    moon.children[0].scale.setScalar(pulse);
                }
            });

            this.moonLabels.forEach(label => {
                if (label instanceof HTMLElement && label.userData) {
                    const moonMesh = label.userData.moonMesh;
                    
                    const moonPos = moonMesh.position.clone();
                    moonPos.project(this.camera);

                    const x = (moonPos.x * 0.5 + 0.5) * window.innerWidth;
                    const y = (-(moonPos.y * 0.5) + 0.5) * window.innerHeight;
                    
                    label.style.transform = `translate(-50%, 0%) translate(${x}px, ${y + 35}px)`;
                    label.style.zIndex = 100;
                }
            });
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new GalaxiaLinguistica();
});
