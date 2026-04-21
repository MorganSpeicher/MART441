var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var cube, cube2;
var modelObject;
var fontLoader = new THREE.FontLoader();

//Add Light
var light = new THREE.PointLight(0xffffff, 1);
light.position.set(50, 50, 50);
scene.add(light);

//Create 3D Text
fontLoader.load('HW15/fonts/Helvetiker_Regular.typeface.json', function(font) {

  var textGeometry = new THREE.TextGeometry('nana', {
    font: font,
    size: 5,
    height: 1,
    curveSegments: 12
  });

  var textMaterial = new THREE.MeshBasicMaterial({ color: 0x66ccff });

  var textMesh = new THREE.Mesh(textGeometry, textMaterial);

  // Center Text in the Scene
  textGeometry.computeBoundingBox();
  var centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);

  textMesh.position.set(centerOffset, 0, 0);

  scene.add(textMesh);
});

// Create the First Box
function createBox() {
  // create a box
  var geometry = new THREE.BoxGeometry();
  var material = new THREE.MeshBasicMaterial({
    color: 0xFFD700
  });

  cube = new THREE.Mesh(geometry, material);
  cube.position.set(20, 0, 0);
  scene.add(cube);
  cube.scale.x = 15; // SCALE
  cube.scale.y = 15; // SCALE
  cube.scale.z = 15; // SCALE


  animate();
}

// Create the Second box and add it as a Child of the First Box
function createBox2() {
  var geometry = new THREE.ConeGeometry(1, 2, 64);
  var material = new THREE.MeshBasicMaterial({
    color: 0xFF8C00
  });

  cube2 = new THREE.Mesh(geometry, material);

  cube2.position.set(2, 0, 0);
  cube2.scale.set(0.5, 0.5, 0.5);

  cube.add(cube2);
}

//Animate the Shapes Then Render the Scene
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  if (cube2) {
    cube2.rotation.x += 0.05;
    cube2.rotation.y += 0.05;
  }

  if (modelObject) {
    modelObject.rotation.x += 0.02;
    modelObject.rotation.y += 0.02;
  }

  controls.update();
  renderer.render(scene, camera);
}


//Generate a Scene Object with a Background Color

function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFF9C4);
  return scene;
}

//Generate Camera in the Scene

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 0, 100);
  return camera;
}

/**
 * Generate the light to be used in the scene. Light args:
 * @param {obj} scene: the current scene object
 **/

function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(20, 50, 20);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);
  return light;
}


//Generate the Renderer to be Used in the Scene

function getRenderer() {
  // Create the canvas with a renderer
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  // Add support for retina displays
  renderer.setPixelRatio(window.devicePixelRatio);
  // Specify the size of the canvas
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Add the canvas to the DOM
  document.body.appendChild(renderer.domElement);
  return renderer;
}

/**
 * Generate the controls to be used in the scene
 * @param {obj} camera: the three.js camera for the scene
 * @param {obj} renderer: the three.js renderer for the scene
 **/

function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
}

//Load Banana Model

function loadModel() {
  loader = new THREE.OBJLoader();
  loader.load('HW15/models/Banana.obj', function (object) {
    object.rotation.z = Math.PI;
    object.position.set(-80, 0, -50);
    modelObject = object;
    scene.add(object);
  });
}


var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);

createBox();
createBox2();

loadModel();
animate();