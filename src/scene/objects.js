import * as THREE from 'three';
import gsap from 'gsap';

export const floatingObjects = [];
export const interactiveObjects = []; // For raycasting

export function createDecorativeObjects(scene) {
    const group = new THREE.Group();
    
    // Abstract geometries to scatter
    const geometries = [
        new THREE.IcosahedronGeometry(20, 0),
        new THREE.TorusKnotGeometry(10, 3, 100, 16),
        new THREE.OctahedronGeometry(15, 0),
        new THREE.TetrahedronGeometry(18, 0),
        new THREE.TorusGeometry(15, 4, 16, 100),
        new THREE.DodecahedronGeometry(16, 0)
    ];

    const materials = [
        new THREE.MeshStandardMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.5 }),
        new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.8, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x7c3aed, emissiveIntensity: 1, metalness: 0.5, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x06b6d4, emissiveIntensity: 1, metalness: 0.5, roughness: 0.2 })
    ];

    // Distribute objects along the Z axis from 100 to -8500
    for (let z = 100; z >= -8500; z -= 300) {
        // 1 or 2 objects per z-level
        const numObjects = Math.random() > 0.5 ? 2 : 1;
        
        for (let i = 0; i < numObjects; i++) {
            const geo = geometries[Math.floor(Math.random() * geometries.length)];
            const mat = materials[Math.floor(Math.random() * materials.length)];
            
            const mesh = new THREE.Mesh(geo, mat);
            
            // Random position spread far on X and Y, tight on Z
            const x = (Math.random() - 0.5) * 400;
            const y = (Math.random() - 0.5) * 300;
            
            // Keep center clear for the CSS3D UI
            if (Math.abs(x) < 80 && Math.abs(y) < 80) continue; 
            
            mesh.position.set(x, y, z + (Math.random() - 0.5) * 100);
            
            // Random scale
            const scale = Math.random() * 0.8 + 0.4;
            mesh.scale.set(scale, scale, scale);
            
            // Animation data
            mesh.userData = { 
                baseY: mesh.position.y, 
                speed: Math.random() * 1.5 + 0.5, 
                amp: Math.random() * 5 + 2,
                rotSpeedX: (Math.random() - 0.5) * 0.02,
                rotSpeedY: (Math.random() - 0.5) * 0.02
            };
            
            group.add(mesh);
            floatingObjects.push(mesh);
            
            // Only make non-wireframe objects interactive for performance and visual clarity
            if (!mat.wireframe) {
                interactiveObjects.push(mesh);
            }
        }
    }
    
    scene.add(group);
}

export function updateObjects(time) {
    floatingObjects.forEach((obj) => {
        // Continuous rotation
        obj.rotation.x += obj.userData.rotSpeedX;
        obj.rotation.y += obj.userData.rotSpeedY;
        
        // Gentle Y bobbing
        if (obj.userData.baseY !== undefined) {
            obj.position.y = obj.userData.baseY + Math.sin(time * obj.userData.speed) * obj.userData.amp;
        }
    });
}

// Hover effect for 3D objects via Raycaster
export function handleHover(intersectedObject) {
    if (!intersectedObject) return;
    
    // GSAP scale up and glow
    gsap.to(intersectedObject.scale, {
        x: intersectedObject.scale.x * 1.3,
        y: intersectedObject.scale.y * 1.3,
        z: intersectedObject.scale.z * 1.3,
        duration: 0.3,
        ease: "power2.out"
    });
    
    if (intersectedObject.material.emissive) {
        // Save original intensity if not saved yet
        if (intersectedObject.userData.origEmissive === undefined) {
            intersectedObject.userData.origEmissive = intersectedObject.material.emissiveIntensity;
        }
        gsap.to(intersectedObject.material, {
            emissiveIntensity: intersectedObject.userData.origEmissive * 3,
            duration: 0.3
        });
    }
}

export function handleHoverOut(object) {
    if (!object) return;
    
    // Revert scale (assuming base scale is roughly original, but we should store base scale properly)
    // To make it robust, we can use the original scale from geometry.
    // For simplicity, we just divide by 1.3 since we multiplied by 1.3.
    gsap.to(object.scale, {
        x: object.scale.x / 1.3,
        y: object.scale.y / 1.3,
        z: object.scale.z / 1.3,
        duration: 0.5,
        ease: "power2.out"
    });
    
    if (object.material.emissive && object.userData.origEmissive !== undefined) {
        gsap.to(object.material, {
            emissiveIntensity: object.userData.origEmissive,
            duration: 0.5
        });
    }
}
