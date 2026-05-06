import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import './style.css';
import { createStarField, createNebulas, updateParticles } from './scene/particles';
import { createDecorativeObjects, updateObjects, interactiveObjects, handleHover, handleHoverOut } from './scene/objects';
import { createSections } from './scene/sections';
import { setupCameraAndScroll, updateCamera } from './camera';

// Core setup
const canvasContainer = document.getElementById('canvas-container');
const cssContainer = document.getElementById('css3d-container');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#030014');
const cssScene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);

// WebGL Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
canvasContainer.appendChild(renderer.domElement);

// Post-processing Bloom
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.4, // strength
    0.3, // radius
    0.85 // threshold
);
// Disable bloom on mobile for performance
const isMobile = window.innerWidth < 768;
if (!isMobile) {
    composer.addPass(bloomPass);
}

// CSS3D Renderer
const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssContainer.appendChild(cssRenderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.3);
scene.add(ambientLight);

const purpleLight = new THREE.PointLight(0x7c3aed, 2, 500);
purpleLight.position.set(0, 0, -600); // near center of the curve
scene.add(purpleLight);

const cyanLight = new THREE.PointLight(0x06b6d4, 1.5, 300);
scene.add(cyanLight);

// Content
scene.add(createStarField(isMobile));
scene.add(createNebulas());
createDecorativeObjects(scene);
createSections(cssScene);

// Camera and Scroll
setupCameraAndScroll(camera);

// Mouse Interaction & Raycasting
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let hoveredObject = null;

window.addEventListener('mousemove', (event) => {
    // Normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const time = clock.getElapsedTime();
    
    // Animate point light orbiting
    cyanLight.position.x = Math.sin(time * 0.5) * 200;
    cyanLight.position.z = -600 + Math.cos(time * 0.5) * 200;
    
    updateParticles(time);
    updateObjects(time);
    updateCamera(camera, mouse);
    
    // Raycasting for hover effects
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects);
    
    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (hoveredObject !== object) {
            if (hoveredObject) handleHoverOut(hoveredObject);
            hoveredObject = object;
            handleHover(hoveredObject);
        }
    } else {
        if (hoveredObject) {
            handleHoverOut(hoveredObject);
            hoveredObject = null;
        }
    }

    // Render both scenes
    // Use composer for WebGL to include post-processing
    composer.render();
    cssRenderer.render(cssScene, camera);
}

animate();
