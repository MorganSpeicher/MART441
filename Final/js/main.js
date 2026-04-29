var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var bananaObject;
var orangeObject;
var mangoObject;
var dragonFruitObject;
var fontLoader = new THREE.FontLoader();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var factMesh;
var font;

//Add Click Detection
window.addEventListener('click', onClick, false);

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

function onClick(event) {

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  let objects = [];
  if (bananaObject) objects.push(bananaObject);
  if (orangeObject) objects.push(orangeObject);
  if (mangoObject) objects.push(mangoObject);
  if (dragonFruitObject) objects.push(dragonFruitObject);


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
  }
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

  var textGeometry = new THREE.TextGeometry('Welcome to the Fruit Bowl', {
    font: font,
    size: 5,
    height: 1,
    curveSegments: 12
  });

  var textGeometry1 = new THREE.TextGeometry('Click Objects and Drag Mouse to Interact', {
    font: font,
    size: 3,
    height: 1,
    curveSegments: 12
  });

  var textMaterial = new THREE.MeshBasicMaterial({ color: 0x66ccff });

  var textMesh = new THREE.Mesh(textGeometry, textMaterial);
  var textMesh1 = new THREE.Mesh(textGeometry1, textMaterial);

  textGeometry.computeBoundingBox();
  textGeometry1.computeBoundingBox();

  var width1 = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
  var width2 = textGeometry1.boundingBox.max.x - textGeometry1.boundingBox.min.x;

  // center each line around x = 0
  textMesh.position.set(-width1 / 2, 5, 0);
  textMesh1.position.set(-width2 / 2, 0, 0);

  scene.add(textMesh);
  scene.add(textMesh1);
});

//Animate the Shapes Then Render the Scene
function animate() {
  requestAnimationFrame(animate);

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

function loadBanana() {
  loader = new THREE.OBJLoader();
  loader.load('Final/models/Banana.obj', function (object) {

    object.traverse(function(child) {
      if (child.isMesh) {
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
  });
}

function loadOrange() {
  loader = new THREE.OBJLoader();
  loader.load('Final/models/Orange.obj', function (object) {

    object.traverse(function(child) {
      if (child.isMesh) {
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
  });
}

function loadMango() {
  loader = new THREE.OBJLoader();
  loader.load('Final/models/Mango.obj', function (object) {

    object.traverse(function(child) {
      if (child.isMesh) {
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
  });
}

function loadDragonFruit() {
  loader = new THREE.OBJLoader();
  loader.load('Final/models/Dragonfruit.obj', function (object) {

    object.traverse(function(child) {
      if (child.isMesh) {
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
  });
}

var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);

// Background Music
var listener = new THREE.AudioListener();
camera.add(listener);

var sound = new THREE.Audio(listener);
var audioLoader = new THREE.AudioLoader();

audioLoader.load('Final/music/Bloopin.mp3', function(buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);

  // try to start (may be blocked)
  sound.play();
});

function startAudioOnGesture() {
  // resumes WebAudio context
  camera.children[0].context.resume();

  if (!sound.isPlaying) {
    sound.play();
  }

  window.removeEventListener('click', startAudioOnGesture);
  window.removeEventListener('keydown', startAudioOnGesture);
}

//Background Music Stop Button
var button = document.getElementById("musicBtn");

button.addEventListener("click", function () {
  if (sound.isPlaying) {
    sound.pause();
    button.textContent = "Play Music";
  } else {
    sound.play();
    button.textContent = "Pause Music";
  }
});

window.addEventListener('click', startAudioOnGesture);
window.addEventListener('keydown', startAudioOnGesture);

loadBanana();
loadOrange();
loadMango();
loadDragonFruit();
animate();