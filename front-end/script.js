// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 🎨 Cybersecurity Colors
const sphereColor = 0x217eaa;
const particleColor = 0x7d9cb7;
const bgParticleColor = 0x8ca4ac;
const backgroundColor = 0x0a0f14;

scene.background = new THREE.Color(backgroundColor);

// 📍 Lower Sphere Position (Under Search Box)
const sphereGeometry = new THREE.SphereGeometry(1.5, 24, 24);
const sphereMaterial = new THREE.MeshBasicMaterial({ 
    color: sphereColor, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.7 
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = -0.8;
scene.add(sphere);

// Cybersecurity Glowing Particles
const particleCount = 4000;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.55;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y - 0.8;
    positions[i * 3 + 2] = z;
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({
    color: particleColor,
    size: 0.02,
    transparent: true,
    opacity: 0.7
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// ✨ Background Dots (Cyber Theme)
const bgParticleCount = 2000;
const bgPositions = new Float32Array(bgParticleCount * 3);

for (let i = 0; i < bgParticleCount; i++) {
    bgPositions[i * 3] = (Math.random() - 0.5) * 10;
    bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const bgParticleGeometry = new THREE.BufferGeometry();
bgParticleGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));

const bgParticleMaterial = new THREE.PointsMaterial({
    color: bgParticleColor,
    size: 0.01,
    transparent: true,
    opacity: 0.5
});

const bgParticles = new THREE.Points(bgParticleGeometry, bgParticleMaterial);
scene.add(bgParticles);

// Glitch Effect (Cyber Feel)
function glitchEffect() {
    particleMaterial.opacity = 0.5 + Math.random() * 0.4;
    sphereMaterial.opacity = 0.6 + Math.random() * 0.3;
    setTimeout(glitchEffect, 500 + Math.random() * 500);
}
glitchEffect();

camera.position.z = 4;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.0015;
    particles.rotation.y += 0.001;
    bgParticles.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
