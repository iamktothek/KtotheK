// Initialize particles.js
particlesJS('particles-js', {
    particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#ffffff" },
                            shape: { type: "circle" },
                                    opacity: { value: 0.5, random: true },
                                            size: { value: 3, random: true },
                                                    line_linked: { enable: false },
                                                            move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out" }
                                                                },
                                                                    interactivity: { detect_on: "canvas", events: { onhover: { enable: false }, onclick: { enable: false } } }
                                                                    });

                                                                    // Scroll effect for text
                                                                    window.addEventListener('scroll', () => {
                                                                        const scrollText = document.querySelector('.scroll-text');
                                                                            const scrollPosition = window.scrollY;
                                                                                scrollText.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                                                                                    scrollText.style.opacity = 1 - (scrollPosition / 500);
                                                                                    });
                                                                                    