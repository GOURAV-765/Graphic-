/**
 * Alex Morgan Portfolio - Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. CUSTOM CURSOR
    // ==========================================================================
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, input, textarea, select, .carousel-dot');

    if (cursor && cursorDot && window.innerWidth >= 1024) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });
    } else {
        // Hide custom cursors on mobile screens
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }

    // ==========================================================================
    // 2. THEME SWITCHER
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fa-solid fa-moon';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.replace('dark-theme', 'light-theme');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================================================
    // 3. STICKY HEADER & ACTIVE NAVIGATION LINKS
    // ==========================================================================
    const header = document.getElementById('mainHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for highlighting nav links based on scrolling
    const navObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Triggers when section is centered
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // ==========================================================================
    // 4. MOBILE HAMBURGER MENU
    // ==========================================================================
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = menuToggleBtn.querySelector('i');

    menuToggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuIcon.className = 'fa-solid fa-bars';
        });
    });

    // ==========================================================================
    // 5. PORTFOLIO FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from other buttons, add to current
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ==========================================================================
    // 6. DETAILED PORTFOLIO LIGHTBOX MODAL
    // ==========================================================================
    const projectData = {
        1: {
            category: "Branding & Logo",
            title: "Vesper Branding Identity",
            image: "assets/branding.png",
            desc: "Vesper Labs required a complete visual overhaul that represented their clean, high-tech engineering background while retaining a warm, approachable human side. We designed a minimalist brand mark representing interconnected nodes, customized typography, a dual-gradient color system, and mockups for packaging and letterheads.",
            client: "Vesper Labs",
            date: "October 2025",
            tools: "Adobe Illustrator, Photoshop, InDesign"
        },
        2: {
            category: "3D Illustration",
            title: "Cybernetic Dimensions",
            image: "assets/render_3d.png",
            desc: "A personal creative research project exploring the combination of refractive glass surfaces, neon emitters, and floating metallic forms. The render showcases high-end materials, custom chromatic aberrations, and ambient occlusion, designed to highlight visual aesthetics in futuristic marketing layouts.",
            client: "Personal Research",
            date: "January 2026",
            tools: "Blender, Octane Render, Photoshop"
        },
        3: {
            category: "Print & Layout",
            title: "Typographic Echoes Poster",
            image: "assets/poster_art.png",
            desc: "Designed for the Zurich Design Fest, this Swiss-style typographic poster represents the physical vibration of sound in printed typography. Using high-contrast geometry, bold grids, overlapping typography, and a textured grain layer, the poster bridges digital layout and physical screenprint processes.",
            client: "Zurich Design Fest",
            date: "August 2025",
            tools: "Adobe Illustrator, InDesign"
        },
        4: {
            category: "Mobile App UI/UX",
            title: "Zenith Crypto Dashboard",
            image: "assets/ui_ux.png",
            desc: "Zenith is a premium Web3 analytics and portfolio tracker. The project involved creating a high-fidelity mobile dashboard prototype focusing on accessibility and visual hierarchy. Features glassmorphic cards, custom charts, dark-first styling, and micro-interactions designed to make crypto trading feel premium and simple.",
            client: "Zenith Inc.",
            date: "March 2026",
            tools: "Figma, After Effects"
        },
        5: {
            category: "Branding & Stationary",
            title: "Aero Logistics Brand Kit",
            image: "assets/branding.png", // Reusing same high quality branding asset
            desc: "Aero is a drone-delivery shipping startup. The branding kit focuses on speed, security, and aerodynamics. We designed a customized slanted logo, modern bold icons, color palettes depicting high sky-blue and warning orange, and a full corporate stationery suite ready for production.",
            client: "Aero Flight Systems",
            date: "November 2025",
            tools: "Adobe Illustrator, Photoshop"
        },
        6: {
            category: "3D Design",
            title: "Neon Geometry Stage Art",
            image: "assets/render_3d.png", // Reusing 3D render asset
            desc: "Created as background visual content and stage projection graphics for a leading electro-music festival. Designed floating neon shapes, reactive light patterns, and animated loops that synched with bass frequencies, resulting in a mesmerizing live performance environment.",
            client: "ElectroMusic Festival",
            date: "December 2025",
            tools: "Blender, After Effects"
        }
    };

    const projectModal = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalImg = document.getElementById('modalProjectImg');
    const modalCat = document.getElementById('modalProjectCat');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalDesc = document.getElementById('modalProjectDesc');
    const modalClient = document.getElementById('modalProjectClient');
    const modalDate = document.getElementById('modalProjectDate');
    const modalTools = document.getElementById('modalProjectTools');
    const modalContactBtn = document.getElementById('modalContactBtn');

    portfolioCards.forEach(card => {
        card.querySelector('.card-img-wrapper').addEventListener('click', () => {
            const projectId = card.getAttribute('data-id');
            const data = projectData[projectId];

            if (data) {
                modalImg.src = data.image;
                modalImg.alt = data.title;
                modalCat.innerText = data.category;
                modalTitle.innerText = data.title;
                modalDesc.innerText = data.desc;
                modalClient.innerText = data.client;
                modalDate.innerText = data.date;
                modalTools.innerText = data.tools;

                // Open modal
                projectModal.classList.add('open');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            }
        });
    });

    const closeModal = () => {
        projectModal.classList.remove('open');
        document.body.style.overflow = 'auto'; // Re-enable scroll
    };

    modalCloseBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside content card
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });

    // Close modal and scroll when modal CTA button is clicked
    modalContactBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('open')) {
            closeModal();
        }
    });

    // ==========================================================================
    // 7. CLIENT TESTIMONIALS CAROUSEL
    // ==========================================================================
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    const totalSlides = carouselDots.length;
    let carouselInterval;

    const showSlide = (index) => {
        currentSlide = index;
        carouselTrack.style.transform = `translateX(-${currentSlide * 33.333}%)`;
        
        carouselDots.forEach(dot => dot.classList.remove('active'));
        carouselDots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        let next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    };

    const startAutoPlay = () => {
        carouselInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoPlay = () => {
        clearInterval(carouselInterval);
    };

    carouselDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showSlide(index);
            // Reset autoplay timer
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Hover listeners to pause autoplay
    const carouselContainer = document.querySelector('.testimonials-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();

    // ==========================================================================
    // 8. CONTACT FORM VALIDATION & INTERACTIVE RESPONSE
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const successAlert = document.getElementById('formSuccessAlert');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');

        // Reset errors
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('invalid'));

        // Name verification
        if (!nameField.value.trim()) {
            nameField.parentElement.classList.add('invalid');
            isValid = false;
        }

        // Email regex verification
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailField.value.trim() || !emailRegex.test(emailField.value)) {
            emailField.parentElement.classList.add('invalid');
            isValid = false;
        }

        // Message verification
        if (!messageField.value.trim()) {
            messageField.parentElement.classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            // Disable submit button during animation
            const submitBtn = document.getElementById('formSubmitBtn');
            submitBtn.disabled = true;
            submitBtn.querySelector('span').innerText = 'Sending...';

            setTimeout(() => {
                // Show visual success overlay
                successAlert.style.display = 'flex';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.querySelector('span').innerText = 'Send Message';

                // Automatically hide success notification after 5s
                setTimeout(() => {
                    successAlert.style.display = 'none';
                }, 5000);
            }, 1000); // Simulate API latency
        }
    });

    // Clear validation error highlights as user types
    const inputs = [document.getElementById('name'), document.getElementById('email'), document.getElementById('message')];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.parentElement.classList.remove('invalid');
            }
        });
    });

    // ==========================================================================
    // 9. SCROLL REVEAL TRIGGERS (Intersection Observer)
    // ==========================================================================
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Reveal slightly before entering view
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it is the about section, trigger skill bar anims
                if (entry.target.classList.contains('about-info-col')) {
                    animateSkills();
                }
                
                // Stop observing once animated
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    scrollElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Helper function to animate skill bars on reveal
    const animateSkills = () => {
        const skillFills = document.querySelectorAll('.skill-bar-fill');
        skillFills.forEach(fill => {
            // Width is defined in style attribute inside html
            const targetWidth = fill.style.width;
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 100);
        });
    };
});
