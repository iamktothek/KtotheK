// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('container').appendChild(renderer.domElement);

// Add orbit controls for interactivity
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

// Create a 3D text mesh for "ktothek"
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
    const textGeometry = new THREE.TextGeometry('ktothek', {
            font: font,
                    size: 0.5,
                            height: 0.1,
                                });
                                    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
                                        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                                            scene.add(textMesh);

                                                // Add lights
                                                    const ambientLight = new THREE.AmbientLight(0x404040);
                                                        scene.add(ambientLight);
                                                            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
                                                                directionalLight.position.set(1, 1, 1);
                                                                    scene.add(directionalLight);

                                                                        // Animation loop
                                                                            function animate() {
                                                                                    requestAnimationFrame(animate);
                                                                                            textMesh.rotation.y += 0.01;
                                                                                                    renderer.render(scene, camera);
                                                                                                        }
                                                                                                            animate();
                                                                                                            });

                                                                                                            // Handle window resize
                                                                                                            window.addEventListener('resize', () => {
                                                                                                                camera.aspect = window.innerWidth / window.innerHeight;
                                                                                                                    camera.updateProjectionMatrix();
                                                                                                                        renderer.setSize(window.innerWidth, window.innerHeight);
                                                                                                                        });
                                                                                                                        