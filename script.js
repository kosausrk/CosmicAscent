let map;
let spaceScene, spaceCamera, spaceRenderer, spaceShuttle;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 28.5729, lng: -80.6489 },
        zoom: 15,
        mapTypeId: 'satellite',
        tilt: 60,
        heading: 0
    });

    initSpaceView();
}

function initSpaceView() {
    spaceScene = new THREE.Scene();
    spaceCamera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight / 2), 0.1, 1000);
    spaceRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('space-canvas') });
    spaceCamera.position.z = 50;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    spaceScene.add(directionalLight);
    const ambientLight = new THREE.AmbientLight(0x404040);
    spaceScene.add(ambientLight);

    // Load the spaceship model (commented out)
    /*
    const loader = new THREE.GLTFLoader();
    loader.load('spaceshuttle.glb', function (gltf) {
        spaceShuttle = gltf.scene;
        spaceScene.add(spaceShuttle);
        spaceShuttle.scale.set(5, 5, 5);
        animate();
    });
    */

    // Add the cube
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    spaceShuttle = new THREE.Mesh(geometry, material);
    spaceScene.add(spaceShuttle);
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    if (spaceShuttle) {
        spaceShuttle.rotation.y += 0.01;
    }

    spaceRenderer.render(spaceScene, spaceCamera); // Uncommented this line
}