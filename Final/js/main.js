var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var bananaObject;
var orangeObject;
var mangoObject;
var dragonFruitObject;
var pineappleObject;

var fontLoader = new THREE.FontLoader();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var factMesh;
var font;

let loadedCount = 0;
const totalObjects = 5;

var dragControls;
let isDragging = false;

var draggableObjects = [];
var rotatingCubes = [];
var leafCubes = [];

//Add Click Detection
window.addEventListener('click', onClick, false);
window.addEventListener('dblclick', onDoubleClick, false);

//Banana Fact
function showBananaFact() {

  // remove previous fact if it exists
  if (factMesh) {
    scene.remove(factMesh);
    factMesh.geometry.dispose();
    factMesh.material.dispose();
    factMesh = null;
  }

  var geometry = new THREE.TextGeometry(
    "Bananas are berries, botanically speaking!",
    {
      font: font,
      size: 5,
      height: 0.5,
      curveSegments: 12
    }
  );

  

  var material = new THREE.MeshBasicMaterial({ color: 0xffd54f });
  factMesh = new THREE.Mesh(geometry, material);

  geometry.computeBoundingBox();

  var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;

  factMesh.position.set(-width / 2, 20, 0);

  scene.add(factMesh);

  // remove after 3 seconds
  setTimeout(() => {
    if (factMesh) {
      scene.remove(factMesh);
      factMesh = null;
    }
  }, 4000);
}

function showOrangeFact() {

  if (factMesh) {
    scene.remove(factMesh);
    factMesh.geometry.dispose();
    factMesh.material.dispose();
    factMesh = null;
  }

  var geometry = new THREE.TextGeometry(
    "Oranges are actually modified berries!",
    {
      font: font,
      size: 5,
      height: 0.5,
      curveSegments: 12
    }
  );

  var material = new THREE.MeshBasicMaterial({ color: 0xff8c00 });
  factMesh = new THREE.Mesh(geometry, material);

  geometry.computeBoundingBox();

  var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;

  factMesh.position.set(-width / 2, 20, 0);

  scene.add(factMesh);

  setTimeout(() => {
    if (factMesh) {
      scene.remove(factMesh);
      factMesh = null;
    }
  }, 4000);
}

function showMangoFact() {

  if (factMesh) {
    scene.remove(factMesh);
    factMesh.geometry.dispose();
    factMesh.material.dispose();
    factMesh = null;
  }

  var geometry = new THREE.TextGeometry(
    "Mangoes are distant relatives of poison ivy, cashew nuts, and pistachio!",
    {
      font: font,
      size: 5,
      height: 0.5,
      curveSegments: 12
    }
  );

  var material = new THREE.MeshBasicMaterial({ color: 0xffcc33 });
  factMesh = new THREE.Mesh(geometry, material);

  geometry.computeBoundingBox();

  var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;

  factMesh.position.set(-width / 2, 20, 0);

  scene.add(factMesh);

  setTimeout(() => {
    if (factMesh) {
      scene.remove(factMesh);
      factMesh = null;
    }
  }, 4000);
}

function showDragonFruitFact() {

  if (factMesh) {
    scene.remove(factMesh);
    factMesh.geometry.dispose();
    factMesh.material.dispose();
    factMesh = null;
  }

  var geometry = new THREE.TextGeometry(
    "Dragon fruit comes from a cactus!",
    {
      font: font,
      size: 5,
      height: 0.5,
      curveSegments: 12
    }
  );

  var material = new THREE.MeshBasicMaterial({ color: 0xe60073 });
  factMesh = new THREE.Mesh(geometry, material);

  geometry.computeBoundingBox();

  var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;

  factMesh.position.set(-width / 2, 20, 0);

  scene.add(factMesh);

  setTimeout(() => {
    if (factMesh) {
      scene.remove(factMesh);
      factMesh = null;
    }
  }, 4000);
}

function showPineappleFact() {

  if (factMesh) {
    scene.remove(factMesh);
    factMesh.geometry.dispose();
    factMesh.material.dispose();
    factMesh = null;
  }

  var geometry = new THREE.TextGeometry(
    "A pineapple is not a single fruit, but a group of berries that fuse together.",
    {
      font: font,
      size: 5,
      height: 0.5,
      curveSegments: 12
    }
  );

  var material = new THREE.MeshBasicMaterial({ color: 0xffd34d });
  factMesh = new THREE.Mesh(geometry, material);

  geometry.computeBoundingBox();

  var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;

  factMesh.position.set(-width / 2, 20, 0);

  scene.add(factMesh);

  setTimeout(() => {
    if (factMesh) {
      scene.remove(factMesh);
      factMesh = null;
    }
  }, 4000);
}

//Click Detection for Fruit Facts
function onClick(event) {

  if (isDragging) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  let objects = [];
  if (bananaObject) objects.push(bananaObject);
  if (orangeObject) objects.push(orangeObject);
  if (mangoObject) objects.push(mangoObject);
  if (dragonFruitObject) objects.push(dragonFruitObject);
  if (pineappleObject) objects.push(pineappleObject);


  let intersects = raycaster.intersectObjects(objects, true);

  if (intersects.length > 0) {

    let obj = intersects[0].object;

    // climb up until we hit the root object
    while (obj.parent && !obj.userData.type) {
      obj = obj.parent;
    }

    if (obj.userData.type === "banana") {
      showBananaFact();
    }

    if (obj.userData.type === "orange") {
      showOrangeFact();
    }

    if (obj.userData.type === "mango") {
      showMangoFact();
    }

    if (obj.userData.type === "dragonFruit") {
      showDragonFruitFact();
    }

    if (obj.userData.type === "pineapple") {
      showPineappleFact();
    }
  }
}

//Click Detection to "Cut" Fruit
function onDoubleClick(event) {

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  let objects = [
    bananaObject,
    orangeObject,
    mangoObject,
    dragonFruitObject,
    pineappleObject
  ]//.filter(Boolean);

  let intersects = raycaster.intersectObjects(objects, true);

  if (intersects.length > 0) {

    let obj = intersects[0].object;

    while (obj.parent && !obj.userData.type) {
      obj = obj.parent;
    }

    if (obj.userData.type) {
      replaceWithCubes(obj);
    }
  }
}

//Function to replace objects with cubes after being double-clicked
function replaceWithCubes(object) {

  let color = 0xffffff;

  // match fruit color
  switch (object.userData.type) {
    case "banana": color = 0xffd54f; break;
    case "orange": color = 0xff8c00; break;
    case "mango": color = 0xffcc33; break;
    case "dragonFruit": color = 0xe60073; break;
    case "pineapple": color = 0xffd34d; break;
  }

  // remove fruit
  scene.remove(object);

  // create 5 cubes
  for (let i = 0; i < 5; i++) {

    let geometry = new THREE.BoxGeometry(8, 8, 8);
    let material = new THREE.MeshPhongMaterial({ color });

    let cube = new THREE.Mesh(geometry, material);

    cube.position.copy(object.position);

    // slight random spread
    cube.position.x += (Math.random() - 0.5) * 30;
    cube.position.y += (Math.random() - 0.5) * 30;
    cube.position.z += (Math.random() - 0.5) * 30;

    cube.userData.rotSpeed = {
      x: Math.random() * 0.01,
      y: Math.random() * 0.01
    };

    scene.add(cube);

    rotatingCubes.push(cube);
  }
}

//Create "leaf" cubes
function createLeafCubes(count = 30) {

  for (let i = 0; i < count; i++) {

    let geometry = new THREE.BoxGeometry(3, 3, 3);

    let material = new THREE.MeshPhongMaterial({
      color: 0x2e7d32 // leaf green
    });

    let cube = new THREE.Mesh(geometry, material);

    // random position in space
    cube.position.set(
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 120,
      (Math.random() - 0.5) * 200
    );

    // random rotation speed
    cube.userData.rotSpeed = {
      x: Math.random() * 0.02,
      y: Math.random() * 0.02,
      z: Math.random() * 0.02
    };

    scene.add(cube);
    leafCubes.push(cube);
  }
}

//Moves Shadow HTML Text
function updateShadowWithCamera() {
  const shadow = document.getElementById('shadowText');

  if (!shadow) return;

  // use camera rotation to shift text
  let x = camera.rotation.y * 200;
  let y = camera.rotation.x * 200;

  shadow.style.transform = `translate(calc(-50% + ${x}px), ${y}px)`;
}

//Add Light
var light = new THREE.PointLight(0xffd27f, 0.7, 200);
light.position.set(50, 50, 50);
scene.add(light);

var ambientLight = new THREE.AmbientLight(0xffe5b4, 0.5);
scene.add(ambientLight);

var fillLight = new THREE.PointLight(0xffd27f, 0.4);
fillLight.position.set(-50, -30, 50);
scene.add(fillLight);

//Create 3D Text
fontLoader.load('Final/fonts/Helvetiker_Regular.typeface.json', function(f) {
  font = f;

  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // Text Line 1
  const textGeometry1 = new THREE.TextGeometry('Welcome to the Fruit Bowl', {
    font,
    size: 5,
    height: 1
  });

  const textMesh1 = new THREE.Mesh(textGeometry1, material);
  textGeometry1.computeBoundingBox();

  const width1 = textGeometry1.boundingBox.max.x - textGeometry1.boundingBox.min.x;
  textMesh1.position.set(-width1 / 2, 5, 0);

  // Text Line 2
  const textGeometry2 = new THREE.TextGeometry('Click Objects and Drag Mouse to Interact', {
    font,
    size: 3,
    height: 1
  });

  const textMesh2 = new THREE.Mesh(textGeometry2, material);
  textGeometry2.computeBoundingBox();

  const width2 = textGeometry2.boundingBox.max.x - textGeometry2.boundingBox.min.x;
  textMesh2.position.set(-width2 / 2, 0, 0);

  // Text Line 3
  const textGeometry3 = new THREE.TextGeometry('Double-Click Objects to Cut Fruit', {
    font,
    size: 3,
    height: 1
  });

  const textMesh3 = new THREE.Mesh(textGeometry3, material);
  textGeometry3.computeBoundingBox();

  const width3 = textGeometry3.boundingBox.max.x - textGeometry3.boundingBox.min.x;
  textMesh3.position.set(-width3 / 2, -5, 0);

  // add text
  scene.add(textMesh1);
  scene.add(textMesh2);
  scene.add(textMesh3);

  // Rounded Background Panel

  const panelWidth = Math.max(width1, width2, width3) + 20;
  const panelHeight = 22;

  const shape = new THREE.Shape();
  const r = 5;

  shape.moveTo(-panelWidth/2 + r, -panelHeight/2);
  shape.lineTo(panelWidth/2 - r, -panelHeight/2);
  shape.quadraticCurveTo(panelWidth/2, -panelHeight/2, panelWidth/2, -panelHeight/2 + r);
  shape.lineTo(panelWidth/2, panelHeight/2 - r);
  shape.quadraticCurveTo(panelWidth/2, panelHeight/2, panelWidth/2 - r, panelHeight/2);
  shape.lineTo(-panelWidth/2 + r, panelHeight/2);
  shape.quadraticCurveTo(-panelWidth/2, panelHeight/2, -panelWidth/2, panelHeight/2 - r);
  shape.lineTo(-panelWidth/2, -panelHeight/2 + r);
  shape.quadraticCurveTo(-panelWidth/2, -panelHeight/2, -panelWidth/2 + r, -panelHeight/2);

  const panelGeometry = new THREE.ShapeGeometry(shape);

  const panelMaterial = new THREE.MeshBasicMaterial({
    color: 0x003366,
    transparent: true,
    opacity: 0.75
  });

  const panel = new THREE.Mesh(panelGeometry, panelMaterial);

  // Behind Text
  panel.position.set(0, 3, -2);

  scene.add(panel);
});

//Animate the Shapes Then Render the Scene
function animate() {
  requestAnimationFrame(animate);

  if (!isDragging) controls.update();

  if (bananaObject) {
    bananaObject.rotation.x += 0.005;
    bananaObject.rotation.y += 0.005;
  }

  if (orangeObject) {
    orangeObject.rotation.x += 0.005;
    orangeObject.rotation.y += 0.005;
  }

  if (mangoObject) {
    mangoObject.rotation.x += 0.007;
    mangoObject.rotation.y += 0.007;
  }

  if (dragonFruitObject) {
    dragonFruitObject.rotation.x += 0.003;
    dragonFruitObject.rotation.y += 0.003;
  }

  if (pineappleObject) {
    pineappleObject.rotation.x += 0.004;
    pineappleObject.rotation.y += 0.004;
  }

  rotatingCubes.forEach(cube => {
    cube.rotation.x += cube.userData.rotSpeed.x;
    cube.rotation.y += cube.userData.rotSpeed.y;
  });

  leafCubes.forEach(cube => {
    cube.rotation.x += cube.userData.rotSpeed.x;
    cube.rotation.y += cube.userData.rotSpeed.y;
    cube.rotation.z += cube.userData.rotSpeed.z;
  });

  updateShadowWithCamera();

  //controls.update();
  renderer.render(scene, camera);
}


//Generate a Scene Object with a Background Color

function getScene() {
  var scene = new THREE.Scene();
  //scene.background = new THREE.Color(0xFFF9C4);
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
  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setClearColor(0x000000, 0); // transparent background

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
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

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
}

//Load Banana Model

function loadBanana() {
  loader = new THREE.OBJLoader();
  loader.load('Final/models/Banana.obj', function (object) {

    object.traverse(function(child) {
      if (child.isMesh) {
        child.userData.draggable = true;

        child.material = new THREE.MeshPhongMaterial({
          color: 0xF6D365
        });
      }
    });

    object.rotation.z = Math.PI;
    object.position.set(-80, 0, -50);

    object.userData.type = "banana";

    bananaObject = object;
    scene.add(object);
    onObjectLoaded();
  });
}

function loadOrange() {
  loader = new THREE.OBJLoader();
  loader.load('Final/models/Orange.obj', function (object) {

    object.traverse(function(child) {
      if (child.isMesh) {
        child.userData.draggable = true;

        child.material = new THREE.MeshPhongMaterial({
          color: 0xff8c00
        });
      }
    });

    object.rotation.z = Math.PI;
    object.position.set(80, 0, 0);
    object.scale.set(200, 200, 200);

    object.userData.type = "orange";

    orangeObject = object;
    scene.add(object);
    onObjectLoaded();
  });
}

function loadMango() {
  loader = new THREE.OBJLoader();
  loader.load('Final/models/Mango.obj', function (object) {

    object.traverse(function(child) {
      if (child.isMesh) {
        child.userData.draggable = true;

        child.material = new THREE.MeshPhongMaterial({
          color: 0xffcc33
        });
      }
    });

    object.rotation.z = Math.PI;
    object.position.set(35, -10, 0);
    object.scale.set(20, 20, 20);

    object.userData.type = "mango";

    mangoObject = object;
    scene.add(object);
    onObjectLoaded();
  });
}

function loadDragonFruit() {
  loader = new THREE.OBJLoader();
  loader.load('Final/models/Dragonfruit.obj', function (object) {

    object.traverse(function(child) {
      if (child.isMesh) {
        child.userData.draggable = true;

        child.material = new THREE.MeshPhongMaterial({
          color: 0xe60073
        });
      }
    });

    object.rotation.z = Math.PI;
    object.position.set(30, 40, -30);
    object.scale.set(10, 10, 10);

    object.userData.type = "dragonFruit";

    dragonFruitObject = object;
    scene.add(object);
    onObjectLoaded();
  });
}

function loadPineapple() {
  loader = new THREE.OBJLoader();
  loader.load('Final/models/pineapple.obj', function (object) {

    object.traverse(function(child) {
      if (child.isMesh) {
        child.userData.draggable = true;

        child.material = new THREE.MeshPhongMaterial({
          color: 0xffd34d
        });
      }
    });

    object.rotation.z = Math.PI;
    object.position.set(-40, 60, -50);
    object.scale.set(20, 20, 20);

    object.userData.type = "pineapple";

    pineappleObject = object;
    scene.add(object);
    onObjectLoaded();
  });
}

var scene = getScene();

//Load Leaf Cubes
createLeafCubes(40);

var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);

// Background Music
var listener = new THREE.AudioListener();
camera.add(listener);

var sound = new THREE.Audio(listener);
var audioLoader = new THREE.AudioLoader();

let musicStarted = false;

audioLoader.load('Final/music/Bloopin.mp3', function(buffer) {

  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);

  // TRY autoplay (may be blocked)
  sound.play().then(() => {
    musicStarted = true;
    button.innerHTML = "Pause Music";
  }).catch(() => {
    console.log("Autoplay blocked — waiting for user gesture");
  });

});

//Background Music Stop Button
var button = document.getElementById("musicBtn");

button.addEventListener("click", function () {

  // ensure audio context is active
  listener.context.resume();

  if (!sound.isPlaying) {
    sound.play();
    button.innerHTML = "Pause Music";
  } else {
    sound.pause();
    button.innerHTML = "Play Music";
  }
});

loadBanana();
loadOrange();
loadMango();
loadDragonFruit();
loadPineapple();
animate();

//Create Drag Controls
var dragControls; // GLOBAL

function setupDragControls() {

  draggableObjects = [];

  function addMeshes(obj) {
    obj.traverse(child => {
      if (child.isMesh) {
        draggableObjects.push(child);
      }
    });
  }

  addMeshes(bananaObject);
  addMeshes(orangeObject);
  addMeshes(mangoObject);
  addMeshes(dragonFruitObject);
  addMeshes(pineappleObject);

  console.log("FINAL DRAG TARGETS:", draggableObjects);

  dragControls = new THREE.DragControls(
    draggableObjects,
    camera,
    renderer.domElement
  );

  dragControls.addEventListener('dragstart', () => {
    isDragging = true;
    controls.enabled = false;
  });

  dragControls.addEventListener('dragend', () => {
    isDragging = false;
    controls.enabled = true;
  });
}

function onObjectLoaded() {
  loadedCount++;

  if (loadedCount === totalObjects) {
    setTimeout(() => {
      setupDragControls();
    }, 100);
  }
}

//De-Bugging
console.log("DragControls initialized", draggableObjects);
console.log(THREE.DragControls);
console.log(THREE.REVISION);

scene.traverse(obj => {
  if (obj.isMesh) console.log("Mesh:", obj.name);
});

dragControls.addEventListener('hoveron', e => {
  console.log("Hover:", e.object.name);
});