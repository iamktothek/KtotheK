// Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add geometric cubes
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const cubes = [];
for (let i = 0; i < 20; i++) {
    const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
                (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20,
                                (Math.random() - 0.5) * 20
                                    );
                                        scene.add(cube);
                                            cubes.push(cube);
                                            }
                                            camera.position.z = 30;

                                            // Animation loop
                                            function animate() {
                                                requestAnimationFrame(animate);
                                                    cubes.forEach(cube => {
                                                            cube.rotation.x += 0.01;
                                                                    cube.rotation.y += 0.01;
                                                                        });
                                                                            renderer.render(scene, camera);
                                                                            }
                                                                            animate();

                                                                            // Camera zoom on scroll
                                                                            window.addEventListener('scroll', () => {
                                                                                const scrollY = window.scrollY;
                                                                                    camera.position.z = 30 - scrollY * 0.1;
                                                                                    });

                                                                                    // Handle resize
                                                                                    window.addEventListener('resize', () => {
                                                                                        camera.aspect = window.innerWidth / window.innerHeight;
                                                                                            camera.updateProjectionMatrix();
                                                                                                renderer.setSize(window.innerWidth, window.innerHeight);
                                                                                                });
                                                                                                