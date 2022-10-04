// setup
const cameraFOV = 75;
const cameraNear = 0.1;
const cameraFar = 1000;
const viewportWidth = 640;
const viewportHeight = 480;
var camera = new THREE.PerspectiveCamera(cameraFOV, 
    viewportWidth/viewportHeight,
    cameraNear, cameraFar);
camera.position.setZ(5);
var clock = new THREE.Clock();
var keyboard = new KeyboardState();
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer(camera, scene);
renderer.setSize(viewportWidth, viewportHeight);
document.body.appendChild(renderer.domElement);

// create the geometry of the paddles
// and the ball.
// finally add them to the scene
const paddleWidth = .25, paddleHeight = 1.5;
const player1 = 0, player2 = 1;
var paddles = [
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
const ballWidth = .25, ballHeight = .25;
var ballDx = .05, ballDy = .05;
var ball = new THREE.Mesh(
    new THREE.PlaneGeometry(ballWidth, ballHeight),
    new THREE.MeshBasicMaterial({color: 0xffffff})
)
scene.add(ball);
for(var i = 0; i < 2; i++) scene.add(paddles[i]);
var scores = [0, 0];

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

function update() {
    var delta = clock.getDelta();
    var moveDistance = 10 * delta;
    if(keyboard.pressed('W'))
        paddles[player1].translateY(moveDistance);
    if(keyboard.pressed('S'))
        paddles[player1].translateY(-moveDistance);
    if(keyboard.pressed('O'))
        paddles[player2].translateY(moveDistance);
    if(keyboard.pressed('L'))
        paddles[player2].translateY(-moveDistance);
    
    keyboard.update();
    update_ball();
}

function update_ball() {
    ball.position.x += ballDx;
    ball.position.y -= ballDy;

    // check if ball intersects with the
    // top or the bottom of the viewport
    if(ball.position.y < -3.7 || ball.position.y > 3.7)
        ballDy = -ballDy;
    // check if ball intersects with
    // the goals
    if(ball.position.x > 5)   {scores[player1] += 1; reset_ball();}
    if(ball.position.x < -5)  {scores[player2] += 1; reset_ball();}

    // check collision with paddles
    for(var i = 0; i < 2; i++) {
        var c = check_collision(i);
        if(c == 1) {
            if(ballDx < 0) ballDx -= .01;
            else ballDx += .01;
            ballDx = -ballDx;
        }
    }
}

function check_collision(index) {
    var left_a, left_b;
    var right_a, right_b;
    var top_a, top_b;
    var bottom_a, bottom_b;

    left_a = ball.position.x;
    right_a = ball.position.x + ballWidth;
    top_a = ball.position.y;
    bottom_a = ball.position.y + ballHeight;

    left_b = paddles[index].position.x;
    right_b = paddles[index].position.x + paddleWidth;
    top_b = paddles[index].position.y;
    bottom_b = paddles[index].position.y + paddleHeight;

    if(left_a > right_b) return 0;
    if(right_a < left_b) return 0;
    if(top_a > bottom_b) return 0;
    if(bottom_a < top_b) return 0;
    return 1;
}

function reset_ball() {
    ball.position.setX(0);
    ball.position.setY(0);
    ballDx = .05;
    ballDy = .05;
}

function render() {
    renderer.render(scene, camera);
}

animate();