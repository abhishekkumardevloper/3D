import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectionObjects } from './scene/sections';

gsap.registerPlugin(ScrollTrigger);

export let cameraCurve;
export const cameraState = {
    progress: 0,
    lookAtPos: new THREE.Vector3()
};

export function setupCameraAndScroll(camera) {
    const numSections = sectionObjects.length;
    const scrollPoints = [];
    
    // Initial hero framing (perfect 1:1 scaling)
    scrollPoints.push(new THREE.Vector3(0, 0, 600));

    // Dynamically generate transition and section points
    for (let i = 1; i < numSections; i++) {
        const secZ = sectionObjects[i].obj.position.z;
        const transZ = secZ + 500; // Halfway between previous and current section
        
        // Alternate offsets for dynamic camera movement
        const xOffset = i % 2 === 0 ? 25 : -25;
        const yOffset = i % 2 === 0 ? -10 : 15;
        
        scrollPoints.push(new THREE.Vector3(xOffset, yOffset, transZ)); // Transition
        scrollPoints.push(new THREE.Vector3(0, 0, secZ));               // Section
    }

    cameraCurve = new THREE.CatmullRomCurve3(scrollPoints);

    // Initial Load Animation
    gsap.fromTo(camera.position, 
        { z: 1200 },
        { z: 600, duration: 2.5, ease: "power3.out" }
    );

    // Setup ScrollTrigger for camera path
    ScrollTrigger.create({
        trigger: '#scroll-content',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5, // Smooth scrubbing
        onUpdate: (self) => {
            cameraState.progress = self.progress;
            
            // Animate section visibility based on progress
            const numSections = sectionObjects.length;
            sectionObjects.forEach((item, i) => {
                if (i === 0) return; // Hero handled separately
                
                // Calculate roughly when this section comes into view
                const sectionProgress = i / (numSections - 1);
                
                // Wider visibility window
                if (Math.abs(self.progress - sectionProgress) < 0.08) {
                    // Animate In
                    gsap.to(item.obj.element, { opacity: 1, duration: 0.6 });
                    gsap.to(item.obj.position, { 
                        y: item.obj.userData.baseY || 0, // Fallback to 0 if not set
                        duration: 0.6, 
                        ease: "power2.out" 
                    });
                } else if (Math.abs(self.progress - sectionProgress) > 0.10) {
                    // Animate Out
                    gsap.to(item.obj.element, { opacity: 0, duration: 0.4 });
                }
            });
            
            // Hero fade out
            if (self.progress > 0.05) {
                gsap.to(sectionObjects[0].obj.element, { opacity: 0, duration: 0.5 });
            } else {
                gsap.to(sectionObjects[0].obj.element, { opacity: 1, duration: 0.5 });
            }
        }
    });
}

// Called every frame
export function updateCamera(camera, mouseOffset) {
    if (!cameraCurve) return;

    // Get current position on curve based on scroll progress
    const targetPosition = cameraCurve.getPoint(cameraState.progress);
    
    // Look ahead on the curve
    const lookAtProgress = Math.min(1.0, cameraState.progress + 0.05);
    const lookAtTarget = cameraCurve.getPoint(lookAtProgress);
    
    // Lerp lookAt position for smoothness
    cameraState.lookAtPos.lerp(lookAtTarget, 0.05);

    // Lerp camera position towards target position on curve
    // Apply mouse parallax offset to the target position
    const finalPosition = targetPosition.clone();
    
    // Subtle X/Y offset based on mouse
    finalPosition.x += mouseOffset.x * 10;
    finalPosition.y += mouseOffset.y * 10;
    
    camera.position.lerp(finalPosition, 0.06);
    camera.lookAt(cameraState.lookAtPos);
}
