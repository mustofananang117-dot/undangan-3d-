let scene, camera, renderer, particles;

function init3DStage() {
    const canvas = document.getElementById('webgl-canvas');
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Membuat Hujan Partikel Cahaya
    const geometry = new THREE.BufferGeometry();
    const count = WEDDING_CONFIG.theme.particleCount || 1000;
    const positions = new Float32Array(count * 3);

    for(let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: 0.03,
        color: new THREE.Color(WEDDING_CONFIG.theme.primaryColor),
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 5;

    animate3D();
}

function animate3D() {
    requestAnimationFrame(animate3D);
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;
    renderer.render(scene, camera);
}

// Efek Paralaks Kamera saat di-Scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    camera.position.z = 5 - (scrollY * 0.002);
    camera.rotation.z = scrollY * 0.0003;
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('DOMContentLoaded', init3DStage);


