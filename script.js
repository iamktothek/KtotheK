// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Space background: stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
const starsVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
                starsVertices.push(x, y, z);
                }
                starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
                const stars = new THREE.Points(starsGeometry, starsMaterial);
                scene.add(stars);

                // Nebula background
                const nebulaTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/space/nebula.jpg');
                scene.background = nebulaTexture;

                // Load font and create particle text
                const loader = new THREE.FontLoader();
                loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
                    const textGeometry = new THREE.TextGeometry('K to the K', {
                            font: font,
                                    size: 8,
                                            height: 1,
                                                });
                                                    textGeometry.center();

                                                        const particleCount = 5000;
                                                            const particles = new THREE.BufferGeometry();
                                                                const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.15 });
                                                                    const particlePositions = new Float32Array(particleCount * 3);
                                                                        const targetPositions = textGeometry.attributes.position.array;

                                                                            // Initialize random particle positions
                                                                                for (let i = 0; i < particleCount; i++) {
                                                                                        const i3 = i * 3;
                                                                                                particlePositions[i3] = (Math.random() - 0.5) * 50;
                                                                                                        particlePositions[i3 + 1] = (Math.random() - 0.5) * 50;
                                                                                                                particlePositions[i3 + 2] = (Math.random() - 0.5) * 50;
                                                                                                                    }
                                                                                                                        particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
                                                                                                                            const particleSystem = new THREE.Points(particles, particleMaterial);
                                                                                                                                scene.add(particleSystem);

                                                                                                                                    // Animate particles to form text
                                                                                                                                        let progress = 0;
                                                                                                                                            function animateParticles() {
                                                                                                                                                    progress += 0.01;
                                                                                                                                                            const particleArray = particleSystem.geometry.attributes.position.array;
                                                                                                                                                                    for (let i = 0; i < particleCount; i++) {
                                                                                                                                                                                const i3 = i * 3;
                                                                                                                                                                                            const targetIndex = Math.floor(Math.random() * (targetPositions.length / 3)) * 3;
                                                                                                                                                                                                        particleArray[i3] += (targetPositions[targetIndex] - particleArray[i3]) * 0.02;
                                                                                                                                                                                                                    particleArray[i3 + 1] += (targetPositions[targetIndex + 1] - particleArray[i3 + 1]) * 0.02;
                                                                                                                                                                                                                                particleArray[i3 + 2] += (targetPositions[targetIndex + 2] - particleArray[i3 + 2]) * 0.02;
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                particleSystem.geometry.attributes.position.needsUpdate = true;
                                                                                                                                                                                                                                                        if (progress < 1) requestAnimationFrame(animateParticles);
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                animateParticles();
                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                // Camera and render loop
                                                                                                                                                                                                                                                                camera.position.z = 50;
                                                                                                                                                                                                                                                                function animate() {
                                                                                                                                                                                                                                                                    requestAnimationFrame(animate);
                                                                                                                                                                                                                                                                        stars.rotation.y += 0.0002;
                                                                                                                                                                                                                                                                            renderer.render(scene, camera);
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                            animate();

                                                                                                                                                                                                                                                                            // Handle resize
                                                                                                                                                                                                                                                                            window.addEventListener('resize', () => {
                                                                                                                                                                                                                                                                                camera.aspect = window.innerWidth / window.innerHeight;
                                                                                                                                                                                                                                                                                    camera.updateProjectionMatrix();
                                                                                                                                                                                                                                                                                        renderer.setSize(window.innerWidth, window.innerHeight);
                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                        