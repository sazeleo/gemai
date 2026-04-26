import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// ── Single shared renderer (one WebGL context, blit to each canvas via 2D) ──
const offscreen = document.createElement('canvas');
const renderer = new THREE.WebGLRenderer({ canvas: offscreen, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Build env map once from the shared renderer
const pmrem = new THREE.PMREMGenerator(renderer);
const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
pmrem.dispose();

// ── Gem Material factory ────────────────────────────────────────────
function gemMaterial({ color, transmission = 0.92, roughness = 0.03, ior = 2.42 }) {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0,
    roughness,
    transmission,
    thickness: 1.8,
    ior,
    reflectivity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    envMapIntensity: 3.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
}

// ── Gem A: Round Brilliant (Diamond) ────────────────────────────────
function buildDiamond() {
  const group = new THREE.Group();
  const mat = gemMaterial({ color: 0xd0eaff, transmission: 0.95, ior: 2.42, roughness: 0.02 });

  const crown    = new THREE.Mesh(new THREE.ConeGeometry(1, 0.55, 8, 1, false), mat);
  crown.position.y = 0.31;

  const girdle   = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.06, 32), mat);

  const pavilion = new THREE.Mesh(new THREE.ConeGeometry(1, 1.1, 8, 1, false), mat);
  pavilion.rotation.x = Math.PI;
  pavilion.position.y = -0.58;

  const table    = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.01, 8), mat);
  table.position.y = 0.59;

  group.add(crown, girdle, pavilion, table);

  const facetMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.06, side: THREE.DoubleSide });
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const facet = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.45), facetMat);
    facet.rotation.y = angle;
    facet.rotation.x = Math.PI / 4;
    facet.position.set(Math.cos(angle) * 0.4, 0.15, Math.sin(angle) * 0.4);
    group.add(facet);
  }
  return group;
}

// ── Gem B: Raw Crystal Cluster (Sapphire) ───────────────────────────
function buildCrystal() {
  const group = new THREE.Group();
  const mat  = gemMaterial({ color: 0x1a4fa0, transmission: 0.88, ior: 1.77, roughness: 0.04 });
  const mat2 = gemMaterial({ color: 0x2260c0, transmission: 0.85, ior: 1.77, roughness: 0.06 });

  const bodyGeo = new THREE.OctahedronGeometry(0.9, 0);
  bodyGeo.scale(0.85, 1.4, 0.85);
  const body = new THREE.Mesh(bodyGeo, mat);

  const s1Geo = new THREE.OctahedronGeometry(0.45, 0);
  s1Geo.scale(0.7, 1.2, 0.7);
  const shard1 = new THREE.Mesh(s1Geo, mat2);
  shard1.position.set(0.85, 0.2, 0.1);
  shard1.rotation.z = 0.3;

  const s2Geo = new THREE.OctahedronGeometry(0.3, 0);
  s2Geo.scale(0.6, 1.0, 0.6);
  const shard2 = new THREE.Mesh(s2Geo, mat2);
  shard2.position.set(-0.7, -0.1, 0.2);
  shard2.rotation.z = -0.4;

  group.add(body, shard1, shard2);
  return group;
}

// ── Gem C: Emerald Cut (Ruby) ────────────────────────────────────────
function buildEmeraldCut() {
  const group = new THREE.Group();
  const mat = gemMaterial({ color: 0xaa1515, transmission: 0.86, ior: 1.76, roughness: 0.03 });

  const w = 0.85, h = 1.15, c = 0.22;
  const shape = new THREE.Shape();
  shape.moveTo(-w + c, -h); shape.lineTo(w - c, -h); shape.lineTo(w, -h + c);
  shape.lineTo(w, h - c);   shape.lineTo(w - c, h);  shape.lineTo(-w + c, h);
  shape.lineTo(-w, h - c);  shape.lineTo(-w, -h + c);shape.lineTo(-w + c, -h);

  const bodyGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.09, bevelSegments: 3 });
  bodyGeo.center();
  const body = new THREE.Mesh(bodyGeo, mat);
  body.rotation.x = -Math.PI / 2;

  const stepMat = new THREE.MeshPhysicalMaterial({ color: 0xff2222, transparent: true, opacity: 0.08, side: THREE.DoubleSide });
  for (let i = 1; i <= 2; i++) {
    const s = 1 - i * 0.18;
    const ss = new THREE.Shape();
    const sw = w*s, sh = h*s, sc = c*s;
    ss.moveTo(-sw+sc,-sh); ss.lineTo(sw-sc,-sh); ss.lineTo(sw,-sh+sc);
    ss.lineTo(sw,sh-sc);   ss.lineTo(sw-sc,sh);  ss.lineTo(-sw+sc,sh);
    ss.lineTo(-sw,sh-sc);  ss.lineTo(-sw,-sh+sc); ss.lineTo(-sw+sc,-sh);
    const step = new THREE.Mesh(new THREE.ShapeGeometry(ss), stepMat);
    step.position.y = i * 0.1;
    body.add(step);
  }
  group.add(body);
  return group;
}

// ── Build a scene with lights + gem ─────────────────────────────────
function makeScene(gemBuilder, bgColor) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(bgColor);
  scene.environment = envMap;

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const key  = new THREE.DirectionalLight(0xfff8e8, 2.5); key.position.set(4, 8, 5);
  const rim  = new THREE.DirectionalLight(0xc9a84c, 1.2); rim.position.set(-5, 2, -4);
  const fill = new THREE.DirectionalLight(0x4488cc, 0.6); fill.position.set(0, -5, 3);
  scene.add(key, rim, fill);

  scene.add(gemBuilder());

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshStandardMaterial({ color: 0x111118, metalness: 0.5, roughness: 0.8, transparent: true, opacity: 0.6 })
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1.6;
  scene.add(plane);

  return scene;
}

// ── View registry ────────────────────────────────────────────────────
const views = [];

function addView(canvas, gemBuilder, { autoRotate = true, bgColor = 0x0e0e14 } = {}) {
  if (!canvas) return;
  const W = canvas.clientWidth  || canvas.offsetWidth  || 400;
  const H = canvas.clientHeight || canvas.offsetHeight || 300;

  const scene  = makeScene(gemBuilder, bgColor);
  const camera = new THREE.PerspectiveCamera(40, W / H, 0.01, 100);
  camera.position.set(0, 0.5, 5);

  // OrbitControls listens to the REAL canvas DOM element for pointer events
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping   = true;
  controls.dampingFactor   = 0.06;
  controls.autoRotate      = autoRotate;
  controls.autoRotateSpeed = 1.2;
  controls.minDistance     = 2.5;
  controls.maxDistance     = 9;
  controls.enablePan       = false;

  // 2D context to blit rendered frames onto the real canvas
  const ctx2d = canvas.getContext('2d');

  views.push({ canvas, ctx2d, scene, camera, controls });
}

// ── Single animation loop — renders each view in sequence ────────────
function animate() {
  requestAnimationFrame(animate);

  for (const { canvas, ctx2d, scene, camera, controls } of views) {
    const W = canvas.clientWidth  || canvas.offsetWidth;
    const H = canvas.clientHeight || canvas.offsetHeight;
    if (!W || !H) continue;

    // setPixelRatio already set on renderer; setSize(W,H) makes offscreen W*dpr x H*dpr
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    controls.update();
    renderer.render(scene, camera);

    // Blit: offscreen.width/height already account for dpr
    canvas.width  = offscreen.width;
    canvas.height = offscreen.height;
    ctx2d.drawImage(offscreen, 0, 0);
  }
}

// ── Register all canvases ─────────────────────────────────────────────
addView(document.getElementById('hero-canvas'),   buildDiamond,    { autoRotate: true, bgColor: 0x0d0d12 });
addView(document.getElementById('gem-canvas-1'),  buildDiamond,    { bgColor: 0x0e0e14 });
addView(document.getElementById('gem-canvas-2'),  buildCrystal,    { bgColor: 0x0a0d14 });
addView(document.getElementById('gem-canvas-3'),  buildEmeraldCut, { bgColor: 0x140a0a });

animate();
