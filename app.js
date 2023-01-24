import {
	Scene,
	WebGLRenderer,
	PerspectiveCamera,
	Mesh,
	HemisphereLight,
	AmbientLight,
	Color,
	Plane,
	Vector3,
	PlaneGeometry,
	MeshBasicMaterial,
	DoubleSide,
	PointLight,
} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

const renderer = new WebGLRenderer();
renderer.xr.enabled = true;
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const scene = new Scene();
scene.background = new Color(0xf7f5eb);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.screenSpacePanning = true;

camera.position.z = 5;

const aLight = new AmbientLight(0xf7f5eb);
scene.add(aLight);
const hLight = new HemisphereLight(0xf7f5eb, 0x000000, 1);
scene.add(hLight);
const light = new PointLight(0xffdca9, 1, 100);
light.position.set(2, 2, 0);
scene.add(light);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const stats = new Stats();
document.body.appendChild(stats.dom);

const button = ARButton.createButton(renderer);
document.body.appendChild(button);

const loader = new GLTFLoader().setPath('/model/');
loader.load(
	'model.glb',
	function (gltf) {
		const modelScene = gltf.scene;
		modelScene.scale.set(1, 1, 1);
		scene.add(modelScene);
	},
	function (xhr) {
		console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
	},
	function (error) {
		console.log(error);
		console.log('An error happened ' + error);
	},
);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	controls.update();
	stats.update();
}

window.addEventListener('resize', onWindowResize);
animate();
