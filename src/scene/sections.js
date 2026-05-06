import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export const sectionObjects = [];

export function createSections(cssScene) {
    const pathname = window.location.pathname;
    const isMobile = window.innerWidth < 768;
    let sectionsData = [];

    if (pathname.includes('/services.html')) {
        sectionsData = [
            { id: 'page-services-hero', z: 0 },
            { id: 'page-services-design', z: -1000 },
            { id: 'page-services-photography', z: -2000 },
            { id: 'page-services-art', z: -3000 }
        ];
    } else if (pathname.includes('/design.html')) {
        sectionsData = [
            { id: 'page-design-hero', z: 0 },
            { id: 'page-design-details', z: -1000 },
            { id: 'page-design-portfolio', z: -2000 }
        ];
    } else if (pathname.includes('/photography.html')) {
        sectionsData = [
            { id: 'page-photo-hero', z: 0 },
            { id: 'page-photo-details', z: -1000 },
            { id: 'page-photo-portfolio', z: -2000 }
        ];
    } else if (pathname.includes('/art.html')) {
        sectionsData = [
            { id: 'page-art-hero', z: 0 },
            { id: 'page-art-details', z: -1000 },
            { id: 'page-art-portfolio', z: -2000 }
        ];
    } else {
        // default / index.html
        sectionsData = [
            { id: 'hero', z: 0 },
            { id: 'services', z: -1000 },
            { id: 'portfolio', z: -2000 },
            { id: 'process', z: -3000 },
            { id: 'impact', z: -4000 },
            { id: 'trustedby', z: -5000 },
            { id: 'testimonials', z: -6000 },
            { id: 'careers', z: -7000 },
            { id: 'contact', z: -8000 }
        ];
    }

    sectionsData.forEach((sec, i) => {
        let content = '';
        let width = '1000px';

        switch(sec.id) {
            case 'hero':
                content = `
                    <div class="hero-content">
                        <span class="tagline">The Best Solution in Your Budget</span>
                        <h1 class="hero-title">Premium creative agency delivering <span class="text-gradient">exceptional solutions</span>.</h1>
                        <p class="hero-subtitle">Elevate your brand and captivate your audience with our design, photography, and art solutions.</p>
                        <button class="btn-primary-large interactive">Start Your Campaign</button>
                    </div>
                `;
                break;
            case 'services':
                width = '1200px';
                content = `
                    <h2 class="section-heading">Creative Pillars</h2>
                    <p class="section-subheading">Three main service pillars that define our creative universe.</p>
                    <div class="services-grid">
                        <div class="service-card interactive">
                            <div class="service-icon">✦</div>
                            <h3>Design</h3>
                            <p>Campaign planning, digital marketing, graphic design, and video editing to skyrocket your brand.</p>
                            <a href="/design.html" class="explore-btn" style="display:inline-block; margin-top:20px; text-decoration:none;">Explore Design ➔</a>
                        </div>
                        <div class="service-card interactive">
                            <div class="service-icon">◓</div>
                            <h3>Photography & Video</h3>
                            <p>Wedding & event coverage, product & commercial shoots, portrait & fashion sessions, YouTube content.</p>
                            <a href="/photography.html" class="explore-btn" style="display:inline-block; margin-top:20px; text-decoration:none;">Explore Media ➔</a>
                        </div>
                        <div class="service-card interactive">
                            <div class="service-icon">✧</div>
                            <h3>Art</h3>
                            <p>Digital & traditional painting, wall murals & installations, sketching & custom handmade artwork.</p>
                            <a href="/art.html" class="explore-btn" style="display:inline-block; margin-top:20px; text-decoration:none;">Explore Art ➔</a>
                        </div>
                    </div>
                `;
                break;
            case 'portfolio':
                width = '1200px';
                content = `
                    <h2 class="section-heading">Signature Projects</h2>
                    <p class="section-subheading">A dramatic showcase of our finest creative works floating in space.</p>
                    <div class="portfolio-grid">
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_brand_evolution_1777983882976.png')"></div>
                            <div class="portfolio-overlay">
                                <span class="portfolio-cat">Design</span>
                                <div class="portfolio-title">Brand Evolution</div>
                            </div>
                        </div>
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_cinematic_wedding_1777983898369.png')"></div>
                            <div class="portfolio-overlay">
                                <span class="portfolio-cat">Photography</span>
                                <div class="portfolio-title">Cinematic Wedding</div>
                            </div>
                        </div>
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_abstract_mural_1777983915428.png')"></div>
                            <div class="portfolio-overlay">
                                <span class="portfolio-cat">Art</span>
                                <div class="portfolio-title">Abstract Mural</div>
                            </div>
                        </div>
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_product_launch_1777983930544.png')"></div>
                            <div class="portfolio-overlay">
                                <span class="portfolio-cat">Video</span>
                                <div class="portfolio-title">Product Launch</div>
                            </div>
                        </div>
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_corporate_event_1777983947136.png')"></div>
                            <div class="portfolio-overlay">
                                <span class="portfolio-cat">Design</span>
                                <div class="portfolio-title">Corporate Event</div>
                            </div>
                        </div>
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_digital_portrait_1777983962263.png')"></div>
                            <div class="portfolio-overlay">
                                <span class="portfolio-cat">Art</span>
                                <div class="portfolio-title">Digital Portrait</div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'process':
                width = '1000px';
                content = `
                    <h2 class="section-heading">Our Workflow</h2>
                    <div class="process-container">
                        <!-- Connector Line -->
                        <div class="process-connector"></div>
                        
                        <div class="process-node interactive">
                            <div class="node-circle">1</div>
                            <h3 style="margin-bottom: 10px;">Discover</h3>
                            <p style="color: var(--text-secondary); font-size: 14px;">Understanding your brand vision and goals.</p>
                        </div>
                        <div class="process-node interactive">
                            <div class="node-circle">2</div>
                            <h3 style="margin-bottom: 10px;">Create</h3>
                            <p style="color: var(--text-secondary); font-size: 14px;">Designing concepts and immersive experiences.</p>
                        </div>
                        <div class="process-node interactive">
                            <div class="node-circle">3</div>
                            <h3 style="margin-bottom: 10px;">Refine</h3>
                            <p style="color: var(--text-secondary); font-size: 14px;">Polishing every detail for perfection.</p>
                        </div>
                        <div class="process-node interactive">
                            <div class="node-circle">4</div>
                            <h3 style="margin-bottom: 10px;">Deliver</h3>
                            <p style="color: var(--text-secondary); font-size: 14px;">Launching your project to the universe.</p>
                        </div>
                    </div>
                `;
                break;
            case 'impact':
                width = '1000px';
                content = `
                    <div class="glass-panel stat-container">
                        <div class="stat-item interactive">
                            <div class="stat-num">150+</div>
                            <div class="stat-label">Brands Served</div>
                        </div>
                        <div class="stat-item interactive">
                            <div class="stat-num">500+</div>
                            <div class="stat-label">Projects Delivered</div>
                        </div>
                        <div class="stat-item interactive">
                            <div class="stat-num">12+</div>
                            <div class="stat-label">Years Excellence</div>
                        </div>
                        <div class="stat-item interactive">
                            <div class="stat-num">45+</div>
                            <div class="stat-label">Team Members</div>
                        </div>
                    </div>
                `;
                break;
            case 'trustedby':
                width = '1000px';
                content = `
                    <h2 class="section-heading" style="font-size: 32px;">Trusted By Visionaries</h2>
                    <div style="display: flex; justify-content: center; gap: 60px; margin-top: 40px; opacity: 0.7;">
                        <div style="font-family: 'Outfit'; font-size: 32px; font-weight: 900; letter-spacing: 2px;">VORTEX</div>
                        <div style="font-family: 'Outfit'; font-size: 32px; font-weight: 900; letter-spacing: 2px;">NEXUS.CO</div>
                        <div style="font-family: 'Outfit'; font-size: 32px; font-weight: 900; letter-spacing: 2px;">AURA</div>
                        <div style="font-family: 'Outfit'; font-size: 32px; font-weight: 900; letter-spacing: 2px;">QUANTUM</div>
                    </div>
                `;
                break;
            case 'testimonials':
                width = '1200px';
                content = `
                    <h2 class="section-heading">Client Voices</h2>
                    <div style="display: flex; gap: 30px; justify-content: center;">
                        <div class="glass-panel interactive" style="flex: 1;">
                            <p style="font-size: 18px; font-style: italic; margin-bottom: 20px;">"Sumirayan Design completely transformed our digital presence. Their 3D aesthetic is unmatched."</p>
                            <div style="color: var(--accent-cyan); font-weight: 600;">Sarah Jenkins</div>
                            <div style="font-size: 14px; color: var(--text-secondary);">CMO, Vortex</div>
                        </div>
                        <div class="glass-panel interactive" style="flex: 1;">
                            <p style="font-size: 18px; font-style: italic; margin-bottom: 20px;">"The best solution in our budget. They delivered a cinematic wedding video that left us speechless."</p>
                            <div style="color: var(--accent-cyan); font-weight: 600;">David & Emma</div>
                            <div style="font-size: 14px; color: var(--text-secondary);">Clients</div>
                        </div>
                    </div>
                `;
                break;
            case 'careers':
                width = '1000px';
                content = `
                    <h2 class="section-heading">Join The Universe</h2>
                    <p class="section-subheading">We are always looking for visionary creators.</p>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <div class="glass-panel interactive" style="display: flex; justify-content: space-between; align-items: center; padding: 30px 40px;">
                            <div>
                                <h3 style="font-size: 24px; margin-bottom: 5px;">Senior Video Editor</h3>
                                <p style="color: var(--text-secondary); font-size: 14px;">Remote • Full Time</p>
                            </div>
                            <button class="btn-primary-small">Apply Now</button>
                        </div>
                        <div class="glass-panel interactive" style="display: flex; justify-content: space-between; align-items: center; padding: 30px 40px;">
                            <div>
                                <h3 style="font-size: 24px; margin-bottom: 5px;">Graphic Designer</h3>
                                <p style="color: var(--text-secondary); font-size: 14px;">Hybrid • Full Time</p>
                            </div>
                            <button class="btn-primary-small">Apply Now</button>
                        </div>
                    </div>
                `;
                break;
            case 'contact':
                width = '800px';
                content = `
                    <div class="glass-panel">
                        <h2 class="section-heading" style="text-align: left; margin-bottom: 10px;">Start Your Campaign</h2>
                        <p style="color: var(--text-secondary); margin-bottom: 30px;">Ready to bring your vision to life? Tell us about your project and we'll get back to you within 24 hours.</p>
                        <form class="contact-form interactive" onsubmit="event.preventDefault();">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="John Doe">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="john@example.com">
                            </div>
                            <div class="form-group">
                                <label>Project Type</label>
                                <select>
                                    <option>Design</option>
                                    <option>Photography</option>
                                    <option>Video</option>
                                    <option>Art / Mural</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Budget Range</label>
                                <select>
                                    <option>$1,000 - $5,000</option>
                                    <option>$5,000 - $10,000</option>
                                    <option>$10,000+</option>
                                </select>
                            </div>
                            <div class="form-group full">
                                <label>Message</label>
                                <textarea placeholder="Tell us about your universe..."></textarea>
                            </div>
                            <div class="form-group full" style="margin-top: 10px;">
                                <button type="submit" class="btn-primary-large" style="width: 100%;">Send Transmission</button>
                            </div>
                        </form>
                    </div>
                `;
                break;

            // NEW PAGES CONTENT
            case 'page-services-hero':
                width = '1000px';
                content = `
                    <div class="hero-content">
                        <span class="tagline">Explore Our Offerings</span>
                        <h1 class="hero-title">Creative <span class="text-gradient">Services</span></h1>
                        <p class="hero-subtitle">Comprehensive solutions in Design, Photography, and Art to elevate your brand.</p>
                    </div>
                `;
                break;
            case 'page-services-design':
                width = '1000px';
                content = `
                    <div class="glass-panel interactive" style="padding: 60px; display: flex; align-items: center; gap: 40px;">
                        <div style="flex: 1;">
                            <div class="service-icon" style="font-size: 60px; margin-bottom: 20px;">✦</div>
                            <h2 class="section-heading" style="text-align: left;">Design Solutions</h2>
                            <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 18px;">From brand identity to complete digital marketing campaigns, our design team ensures your vision is communicated effectively.</p>
                            <a href="/design.html" class="btn-primary-small" style="text-decoration:none; display:inline-block;">Explore Design Services</a>
                        </div>
                    </div>
                `;
                break;
            case 'page-services-photography':
                width = '1000px';
                content = `
                    <div class="glass-panel interactive" style="padding: 60px; display: flex; align-items: center; gap: 40px; flex-direction: row-reverse;">
                        <div style="flex: 1;">
                            <div class="service-icon" style="font-size: 60px; margin-bottom: 20px;">◓</div>
                            <h2 class="section-heading" style="text-align: left;">Photography & Video</h2>
                            <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 18px;">Capture the moment with cinematic quality. We cover weddings, commercial shoots, events, and YouTube content.</p>
                            <a href="/photography.html" class="btn-primary-small" style="text-decoration:none; display:inline-block;">Explore Media Services</a>
                        </div>
                    </div>
                `;
                break;
            case 'page-services-art':
                width = '1000px';
                content = `
                    <div class="glass-panel interactive" style="padding: 60px; display: flex; align-items: center; gap: 40px;">
                        <div style="flex: 1;">
                            <div class="service-icon" style="font-size: 60px; margin-bottom: 20px;">✧</div>
                            <h2 class="section-heading" style="text-align: left;">Traditional & Digital Art</h2>
                            <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 18px;">Bring your spaces to life with custom wall murals, canvas paintings, sketches, and digital illustration.</p>
                            <a href="/art.html" class="btn-primary-small" style="text-decoration:none; display:inline-block;">Explore Art Services</a>
                        </div>
                    </div>
                `;
                break;
                
            // DESIGN PAGE
            case 'page-design-hero':
                width = '1000px';
                content = `
                    <div class="hero-content">
                        <span class="tagline">Visual Storytelling</span>
                        <h1 class="hero-title">Strategic <span class="text-gradient">Design</span></h1>
                        <p class="hero-subtitle">Creating brand identities, marketing campaigns, and UI/UX that resonate and convert.</p>
                    </div>
                `;
                break;
            case 'page-design-details':
                width = '1200px';
                content = `
                    <h2 class="section-heading">Our Design Expertise</h2>
                    <div class="services-grid">
                        <div class="service-card interactive">
                            <h3>Brand Identity</h3>
                            <p>Logos, color palettes, typography, and brand guidelines that set you apart.</p>
                        </div>
                        <div class="service-card interactive">
                            <h3>Digital Marketing</h3>
                            <p>Social media graphics, ad creatives, and promotional materials designed to engage.</p>
                        </div>
                        <div class="service-card interactive">
                            <h3>UI/UX Design</h3>
                            <p>Intuitive user interfaces and seamless experiences for web and mobile apps.</p>
                        </div>
                    </div>
                `;
                break;
            case 'page-design-portfolio':
                width = '1200px';
                content = `
                    <h2 class="section-heading">Design Showcase</h2>
                    <div class="portfolio-grid" style="grid-template-columns: repeat(2, 1fr);">
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_brand_evolution_1777983882976.png')"></div>
                            <div class="portfolio-overlay"><div class="portfolio-title">Brand Evolution</div></div>
                        </div>
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_corporate_event_1777983947136.png')"></div>
                            <div class="portfolio-overlay"><div class="portfolio-title">Corporate Campaign</div></div>
                        </div>
                    </div>
                `;
                break;

            // PHOTOGRAPHY PAGE
            case 'page-photo-hero':
                width = '1000px';
                content = `
                    <div class="hero-content">
                        <span class="tagline">Cinematic Reality</span>
                        <h1 class="hero-title">Photography & <span class="text-gradient">Video</span></h1>
                        <p class="hero-subtitle">We don't just take pictures; we capture moments, emotions, and tell your unique story.</p>
                    </div>
                `;
                break;
            case 'page-photo-details':
                width = '1200px';
                content = `
                    <h2 class="section-heading">Lens & Motion</h2>
                    <div class="services-grid">
                        <div class="service-card interactive">
                            <h3>Weddings & Events</h3>
                            <p>Cinematic coverage of your special day, preserving memories in stunning 4K.</p>
                        </div>
                        <div class="service-card interactive">
                            <h3>Commercial Shoots</h3>
                            <p>High-end product photography and commercial video production to elevate your brand.</p>
                        </div>
                        <div class="service-card interactive">
                            <h3>Portrait & Fashion</h3>
                            <p>Professional headshots, fashion editorials, and creative portrait sessions.</p>
                        </div>
                    </div>
                `;
                break;
            case 'page-photo-portfolio':
                width = '1200px';
                content = `
                    <h2 class="section-heading">Featured Frames</h2>
                    <div class="portfolio-grid" style="grid-template-columns: repeat(2, 1fr);">
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_cinematic_wedding_1777983898369.png')"></div>
                            <div class="portfolio-overlay"><div class="portfolio-title">Cinematic Wedding</div></div>
                        </div>
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_product_launch_1777983930544.png')"></div>
                            <div class="portfolio-overlay"><div class="portfolio-title">Product Launch Video</div></div>
                        </div>
                    </div>
                `;
                break;

            // ART PAGE
            case 'page-art-hero':
                width = '1000px';
                content = `
                    <div class="hero-content">
                        <span class="tagline">Imagination Unleashed</span>
                        <h1 class="hero-title">Custom <span class="text-gradient">Artworks</span></h1>
                        <p class="hero-subtitle">From large-scale wall murals to intimate digital paintings, we create art that speaks.</p>
                    </div>
                `;
                break;
            case 'page-art-details':
                width = '1200px';
                content = `
                    <h2 class="section-heading">Artistic Mediums</h2>
                    <div class="services-grid">
                        <div class="service-card interactive">
                            <h3>Wall Murals</h3>
                            <p>Transform your office, cafe, or home with custom large-scale painted murals.</p>
                        </div>
                        <div class="service-card interactive">
                            <h3>Digital Painting</h3>
                            <p>High-resolution digital illustrations, concept art, and custom character designs.</p>
                        </div>
                        <div class="service-card interactive">
                            <h3>Traditional Art</h3>
                            <p>Handmade sketches, canvas paintings, and bespoke mixed-media artwork.</p>
                        </div>
                    </div>
                `;
                break;
            case 'page-art-portfolio':
                width = '1200px';
                content = `
                    <h2 class="section-heading">Art Gallery</h2>
                    <div class="portfolio-grid" style="grid-template-columns: repeat(2, 1fr);">
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_abstract_mural_1777983915428.png')"></div>
                            <div class="portfolio-overlay"><div class="portfolio-title">Abstract Mural</div></div>
                        </div>
                        <div class="portfolio-card interactive">
                            <div class="portfolio-img" style="background-image: url('/assets/portfolio_digital_portrait_1777983962263.png')"></div>
                            <div class="portfolio-overlay"><div class="portfolio-title">Digital Portrait</div></div>
                        </div>
                    </div>
                `;
                break;
        }

        const div = document.createElement('div');
        div.style.width = isMobile ? '350px' : width;
        div.innerHTML = content;

        const obj = new CSS3DObject(div);
        
        // Add subtle variations in x and y to make it feel like floating in a vast space
        const xOffset = i === 0 ? 0 : (Math.random() - 0.5) * 200;
        const yOffset = i === 0 ? 0 : (Math.random() - 0.5) * 100;
        
        obj.position.set(xOffset, yOffset, sec.z);
        
        // Slight random rotation for the non-hero sections
        if (i > 0) {
            obj.rotation.y = (Math.random() - 0.5) * 0.1;
            obj.rotation.x = (Math.random() - 0.5) * 0.05;
        }

        cssScene.add(obj);
        sectionObjects.push({ obj, id: sec.id });
        
        // Hide initially
        if (i > 0) {
            div.style.opacity = '0';
            obj.position.y -= 100;
        }
    });
}
