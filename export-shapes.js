import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';

// 1) Crea la escena y añade tus formas
const scene = new THREE.Scene();

// Esfera
const mat1 = new THREE.MeshStandardMaterial({ color: 0x2196F3 });
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), mat1);
sphere.position.set(0, 0.5, 0);
scene.add(sphere);

// Anillo
const mat2 = new THREE.MeshStandardMaterial({ color: 0xFFC107 });
const ringGeom = new THREE.RingGeometry(0.55, 0.6, 64);
const ring = new THREE.Mesh(ringGeom, mat2);
ring.rotation.x = -Math.PI/2;
ring.position.y = 0.5;
scene.add(ring);

// Cuatro cubos
const colors = [0x4CAF50, 0xE91E63, 0xFF5722, 0x9C27B0];
const positions = [
  [0.8, 0.1, 0],
  [-0.8, 0.1, 0],
  [0, 0.1, 0.8],
  [0, 0.1, -0.8]
];
for (let i = 0; i < 4; i++) {
  const mat = new THREE.MeshStandardMaterial({ color: colors[i] });
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.2,0.2), mat);
  box.position.set(...positions[i]);
  scene.add(box);
}

// Cilindro
const cylMat = new THREE.MeshStandardMaterial({ color: 0x8BC34A });
const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,0.3,32), cylMat);
cyl.position.set(0.3,0.15,-0.3);
scene.add(cyl);

// Luces
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.6));
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(1,1,0);
scene.add(dir);

// 2) Exporta a GLB
const exporter = new GLTFExporter();
exporter.parse(
  scene,
  (gltf) => {
    const data = Buffer.from(gltf instanceof ArrayBuffer ? gltf : JSON.stringify(gltf));
    fs.writeFileSync('mundito.glb', data);
    console.log('mundito.glb generado 🎉');
  },
  { binary: true }
);
