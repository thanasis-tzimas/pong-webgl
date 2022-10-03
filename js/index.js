// camera, scene and renderer setup
const cameraFOV = 75;
const cameraNear = 0.1;
const cameraFar = 1000;
const viewportWidth = 640;
const viewportHeight = 480;
const camera = new THREE.PerspectiveCamera(cameraFOV, 
    viewportWidth/viewportHeight,
    cameraNear, cameraFar);
camera.position.setZ(5);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer(camera, scene);
renderer.setSize(viewportWidth, viewportHeight);
document.body.appendChild(renderer.domElement);

// create the geometry of the paddles
// and the ball.
// finally add them to the scene
const paddleWidth = .5, paddleHeight = 2;
const player1 = 0, player2 = 1;
const paddles = [
    new THREE.Mesh(
        new THREE.PlaneGeometry(paddleWidth, paddleHeight),
        new THREE.MeshBasicMaterial({color: 0xffffff})
    ),
    new THREE.Mesh(
        new THREE.PlaneGeometry(paddleWidth, paddleHeight),
        new THREE.MeshBasicMaterial({color: 0xffffff})
    ),
];
paddles[player1].position.setX(-4.5);
paddles[player2].position.setX(4.5);
const ballWidth = .5, ballHeight = .5;
const ball = new THREE.Mesh(
    new THREE.PlaneGeometry(ballWidth, ballHeight),
    new THREE.MeshBasicMaterial({color: 0xffffff})
)
scene.add(ball);
for(var i = 0; i < 2; i++) scene.add(paddles[i]);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();