let container;
let camera;
let scene;
let renderer;
let house;

function init() {
  container = document.querySelector(".scene");

  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const nearLimit = 0.1;
  const farLimit = 500;

  camera = new THREE.PerspectiveCamera(fov, aspect, nearLimit, farLimit);
  camera.position.set(0, 2.5, 20);

  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  let loader = new THREE.GLTFLoader();
  loader.load("./Assets/Models/house/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    rotateHouse();
  });
}

function rotateHouse() {
  requestAnimationFrame(rotateHouse);
  house.rotation.z -= 0.005;
  renderer.render(scene, camera);
}

init();
