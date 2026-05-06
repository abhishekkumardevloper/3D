import * as THREE from 'three';
import nebulaVert from '../shaders/nebula.vert?raw';
import nebulaFrag from '../shaders/nebula.frag?raw';

let starField;
const nebulaMaterials = [];

export function createStarField(isMobile) {
    const particleCount = isMobile ? 1000 : 3000;
    
    // Using InstancedMesh for particles as requested
    const geometry = new THREE.OctahedronGeometry(0.5, 0);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    
    starField = new THREE.InstancedMesh(geometry, material, particleCount);
    
    const dummy = new THREE.Object3D();
    
    for (let i = 0; i < particleCount; i++) {
        // Randomize positions in a 1000x1000x1000 cube
        dummy.position.x = (Math.random() - 0.5) * 1000;
        dummy.position.y = (Math.random() - 0.5) * 1000;
        dummy.position.z = (Math.random() - 0.5) * 1000;
        
        // Random scale
        const scale = Math.random() * 0.5 + 0.1;
        dummy.scale.set(scale, scale, scale);
        
        dummy.updateMatrix();
        starField.setMatrixAt(i, dummy.matrix);
    }
    
    // Frustum culling is enabled by default, but instanced meshes might have bounding box issues
    // if not computed, so we compute a sphere that covers the 1000x1000x1000 cube
    starField.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 800);
    
    return starField;
}

export function createNebulas() {
    const nebulas = new THREE.Group();
    
    const geometry = new THREE.PlaneGeometry(300, 300, 32, 32);
    
    // Nebula 1 - Purple dominant
    const material1 = new THREE.ShaderMaterial({
        vertexShader: nebulaVert,
        fragmentShader: nebulaFrag,
        uniforms: {
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color('#7c3aed') }, // Purple
            uColor2: { value: new THREE.Color('#030014') }  // Deep dark
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
    });
    
    const nebula1 = new THREE.Mesh(geometry, material1);
    nebula1.position.set(-150, 50, -200);
    nebulaMaterials.push(material1);
    nebulas.add(nebula1);
    
    // Nebula 2 - Cyan dominant
    const material2 = new THREE.ShaderMaterial({
        vertexShader: nebulaVert,
        fragmentShader: nebulaFrag,
        uniforms: {
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color('#06b6d4') }, // Cyan
            uColor2: { value: new THREE.Color('#030014') }
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
    });
    
    const nebula2 = new THREE.Mesh(geometry, material2);
    nebula2.position.set(150, -50, -400);
    nebulaMaterials.push(material2);
    nebulas.add(nebula2);
    
    return nebulas;
}

export function updateParticles(time) {
    // Slow drift using InstancedMesh matrix updates is expensive
    // Instead we slowly rotate the entire starfield
    if (starField) {
        starField.rotation.y = time * 0.02;
        starField.rotation.x = time * 0.01;
    }
    
    // Update Nebula Shader time
    nebulaMaterials.forEach(mat => {
        mat.uniforms.uTime.value = time;
    });
}
