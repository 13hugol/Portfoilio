// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeHeader();
    initializeNavigation();
    initializeTheme();
    initializeAnimations();
    initializeSkillBars();
    initializeCertificates();
    initializeParticles();
    initializeMatrixRain();
    initializeEasterEggs();
    initializeToasts();
    initializeCustomCursor();
    initializePhysicsEffects();
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after animation
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3500);
}

// Header Scroll Effect
function initializeHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Navigation
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Theme Switching
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Skill Bars Animation
function initializeSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe hero skill bars
    document.querySelectorAll('.status-panel .skill-bar').forEach(bar => {
        observer.observe(bar);
    });
    
    // Observe skills section bars
    document.querySelectorAll('.skills .skill-item').forEach(item => {
        observer.observe(item);
    });
}

function animateSkillBars(container) {
    const skillFills = container.querySelectorAll('.skill-fill, .skill-progress');
    const skillPercents = container.querySelectorAll('.skill-percent, .skill-level');
    
    skillFills.forEach((fill, index) => {
        const targetWidth = fill.getAttribute('data-width');
        const percent = skillPercents[index];
        const targetPercent = percent.getAttribute('data-percent') || percent.getAttribute('data-level');
        
        // Ensure skill bar starts at 0% width
        fill.style.width = '0%';
        
        // Force a reflow to ensure the 0% width is applied
        fill.offsetHeight;
        
        // Animate progress bar
        setTimeout(() => {
            fill.style.width = targetWidth + '%';
        }, index * 200);
        
        // Animate counter
        if (percent) {
            animateCounter(percent, 0, targetPercent, 2000 + (index * 200));
        }
    });
}

function animateCounter(element, start, end, duration) {
    const increment = end / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + '%';
    }, 16);
}

// Certificates Modal
function initializeCertificates() {
    const modal = document.getElementById('cert-modal');
    const closeModal = document.querySelector('.close-modal');
    const certImage = document.getElementById('cert-image');
    const certTitle = document.getElementById('cert-title');
    const certDescription = document.getElementById('cert-description');
    
    // Certificate data
    const certificates = {
        'opencv-cert': {
            title: 'OpenCV Certification',
            description: 'Completed comprehensive training in Computer Vision using OpenCV library. Gained expertise in image processing, feature detection, and computer vision algorithms.',
            image: 'opencv-cert.jpg'
        },
        'it-help-cert': {
            title: 'IT Help Team Event Certificate',
            description: 'Recognition for providing technical support and assistance during university IT help events. Demonstrated strong problem-solving and communication skills.',
            image: 'it-help-cert.jpg'
        },
        'unity-cert': {
            title: 'Unity Game Development Certificate',
            description: 'Certified in Unity game development, covering game mechanics, physics, scripting, and deployment across multiple platforms.',
            image: 'unity-cert.jpg'
        }
    };
    
    // Close modal events
    closeModal.addEventListener('click', () => {
        closeModal.style.display = 'none';
        modal.classList.remove('show');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
    
    // Global function for opening modals
    window.openCertModal = function(certId) {
        const cert = certificates[certId];
        if (cert) {
            certTitle.textContent = cert.title;
            certDescription.textContent = cert.description;
            certImage.src = cert.image;
            certImage.alt = cert.title;
            modal.classList.add('show');
        }
    };
}

// Particles System
function initializeParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background-color: var(--text-primary);
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
    `;
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);
    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = 3000 + Math.random() * 2000;
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    const endX = startX + (Math.random() - 0.5) * 20;
    const endY = startY + (Math.random() - 0.5) * 20;
    
    particle.animate([
        { 
            left: startX + '%', 
            top: startY + '%', 
            opacity: 0.3 
        },
        { 
            left: endX + '%', 
            top: endY + '%', 
            opacity: 0 
        }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = () => {
        // Reset particle
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        animateParticle(particle);
    };
}

// Matrix Rain Effect
function initializeMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    if (!matrixContainer) return;
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columnCount = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columnCount; i++) {
        createMatrixColumn(matrixContainer, characters, i);
    }
}

function createMatrixColumn(container, characters, columnIndex) {
    const column = document.createElement('div');
    column.style.cssText = `
        position: absolute;
        left: ${columnIndex * 20}px;
        top: 0;
        width: 20px;
        height: 100%;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        color: var(--text-primary);
        opacity: 0.1;
        overflow: hidden;
        pointer-events: none;
    `;
    
    container.appendChild(column);
    
    // Animate matrix characters
    setInterval(() => {
        if (Math.random() < 0.05) {
            const char = document.createElement('div');
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.cssText = `
                animation: matrix-fall 3s linear forwards;
                opacity: 0.3;
            `;
            column.appendChild(char);
            
            setTimeout(() => {
                if (char.parentNode) {
                    char.parentNode.removeChild(char);
                }
            }, 3000);
        }
    }, 100);
}

// Add CSS for matrix animation
const matrixStyle = document.createElement('style');
matrixStyle.textContent = `
    @keyframes matrix-fall {
        0% {
            transform: translateY(-100vh);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(matrixStyle);

// Easter Eggs
function initializeEasterEggs() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateSecretMode();
            konamiCode = [];
        }
    });
}

function activateSecretMode() {
    showToast('🎮 Secret mode activated! Welcome to the Matrix!', 'success');
    
    // Add special effects
    document.body.style.filter = 'hue-rotate(180deg)';
    
    setTimeout(() => {
        document.body.style.filter = '';
        showToast('Matrix mode deactivated. Reality restored.', 'success');
    }, 5000);
}

// Animation Utilities
function initializeAnimations() {
    // Typewriter effect for loading screen
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(element => {
        typeWriter(element);
    });
    
    // Button ripple effects
    document.addEventListener('click', (e) => {
        if (e.target.matches('.terminal-btn, .cta-button')) {
            createRipple(e);
        }
    });
}

function typeWriter(element) {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i > text.length) {
            clearInterval(timer);
        }
    }, 100);
}

function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Toast Notifications
function initializeToasts() {
    // Toast container already exists in HTML
}

function showToast(message, type = 'success', duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Utility Functions

// Scroll to section
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
};

// Download CV function
window.downloadCV = function() {
    const link = document.createElement('a');
    link.href = 'cv.pdf';
    link.download = 'Bhugol_Gautam_CV.pdf';
    
    // Check if file exists
    fetch('cv.pdf')
        .then(response => {
            if (response.ok) {
                link.click();
                showToast('CV download started!', 'success');
            } else {
                showToast('CV file not found. Please contact me directly.', 'error');
            }
        })
        .catch(() => {
            showToast('CV file not found. Please contact me directly.', 'error');
        });
};

// Smooth scroll for all internal links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Performance optimization
window.addEventListener('load', () => {
    // Remove unused CSS after load
    const unusedStyles = document.querySelectorAll('style[data-temp]');
    unusedStyles.forEach(style => style.remove());
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Skip to main content
    if (e.ctrlKey && e.key === 'Enter') {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView();
        }
    }
    
    // Close modals with Escape
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            openModal.classList.remove('show');
        }
    }
});

// Contact form handling (if needed)
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        console.log('Contact form data:', data);
        
        showToast('Message sent successfully!', 'success');
        contactForm.reset();
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Don't show error toasts to users, just log them
});

// Service worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Custom Cursor Implementation
function initializeCustomCursor() {
    // Check if device supports hover (desktop)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    const cursor = document.getElementById('custom-cursor');
    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorRing = cursor.querySelector('.cursor-ring');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trails = [];
    
    // Mouse movement handler
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create cursor trail
        if (Math.random() > 0.8) {
            createCursorTrail(mouseX, mouseY);
        }
    });
    
    // Hover effects for interactive elements
    const hoverElements = document.querySelectorAll(
        'a, button, .terminal-btn, .certificate-card, .project-card, .nav-link, .theme-toggle'
    );
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            triggerPhysicsEffect(element, 'physics-shake');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
        
        element.addEventListener('click', () => {
            cursor.classList.add('click');
            triggerPhysicsEffect(element, 'physics-bounce');
            setTimeout(() => cursor.classList.remove('click'), 200);
        });
    });
    
    // Terminal-specific cursor style
    const terminalElements = document.querySelectorAll('.terminal-window, .terminal-body, .terminal-line');
    terminalElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('terminal');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('terminal');
        });
    });
    
    // Smooth cursor follow animation
    function animateCursor() {
        // Smooth interpolation
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Create cursor trail effect
    function createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);
        
        // Remove trail after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 500);
    }
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// Physics Effects System
function initializePhysicsEffects() {
    // Add physics effects to various elements on interaction
    const interactiveElements = document.querySelectorAll(
        '.about-card, .skill-category, .project-card, .certificate-card, .contact-item, .social-link'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (Math.random() > 0.7) {
                triggerPhysicsEffect(element, getRandomPhysicsEffect());
            }
        });
        
        element.addEventListener('click', () => {
            triggerPhysicsEffect(element, 'physics-bounce');
        });
    });
    
    // Note: Skill bars have their own clean animation system, no physics needed
    
    // Add glitch effect to terminal elements occasionally
    const terminalElements = document.querySelectorAll('.terminal-title, .prompt, .command');
    terminalElements.forEach(element => {
        if (Math.random() > 0.8) {
            element.setAttribute('data-text', element.textContent);
            element.classList.add('glitch-effect');
        }
    });
    
    // Shake elements when Konami code is activated
    document.addEventListener('keydown', (e) => {
        if (e.code === 'KeyA' && e.altKey) {
            const allCards = document.querySelectorAll('.about-card, .skill-category, .project-card, .certificate-card');
            allCards.forEach((card, index) => {
                setTimeout(() => {
                    triggerPhysicsEffect(card, 'physics-shake');
                }, index * 100);
            });
        }
    });
    
    // Add physics to buttons on click
    const buttons = document.querySelectorAll('.terminal-btn, .cta-button, .theme-toggle');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            triggerPhysicsEffect(button, 'physics-bounce');
            
            // Create mini explosion effect
            createExplosionEffect(e.clientX, e.clientY);
        });
    });
}

// Trigger physics effect on element
function triggerPhysicsEffect(element, effectClass) {
    element.classList.remove('physics-shake', 'physics-bounce', 'physics-wobble');
    
    requestAnimationFrame(() => {
        element.classList.add(effectClass);
        
        // Remove effect after animation completes
        setTimeout(() => {
            element.classList.remove(effectClass);
        }, 800);
    });
}

// Get random physics effect
function getRandomPhysicsEffect() {
    const effects = ['physics-shake', 'physics-bounce', 'physics-wobble'];
    return effects[Math.floor(Math.random() * effects.length)];
}

// Create explosion effect for button clicks
function createExplosionEffect(x, y) {
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: var(--text-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(particle);
        
        // Random direction and distance
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 50;
        const endX = x + Math.cos(angle) * velocity;
        const endY = y + Math.sin(angle) * velocity;
        
        particle.animate([
            {
                left: x + 'px',
                top: y + 'px',
                opacity: 1,
                transform: 'scale(1)'
            },
            {
                left: endX + 'px',
                top: endY + 'px',
                opacity: 0,
                transform: 'scale(0.1)'
            }
        ], {
            duration: 500 + Math.random() * 300,
            easing: 'ease-out'
        }).onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }
}

// Add screen shake effect for dramatic moments
function triggerScreenShake(intensity = 10, duration = 500) {
    const body = document.body;
    let startTime = null;
    
    function shake(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        if (elapsed < duration) {
            const progress = elapsed / duration;
            const currentIntensity = intensity * (1 - progress);
            
            const x = (Math.random() - 0.5) * currentIntensity;
            const y = (Math.random() - 0.5) * currentIntensity;
            
            body.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(shake);
        } else {
            body.style.transform = '';
        }
    }
    
    requestAnimationFrame(shake);
}

// Enhanced secret mode activation with more effects
function activateSecretMode() {
    showToast('🎮 Secret mode activated! Welcome to the Matrix!', 'success');
    
    // Add special effects
    document.body.style.filter = 'hue-rotate(180deg)';
    triggerScreenShake(15, 1000);
    
    // Add random physics effects to all cards
    const allCards = document.querySelectorAll('.about-card, .skill-category, .project-card, .certificate-card');
    allCards.forEach((card, index) => {
        setTimeout(() => {
            triggerPhysicsEffect(card, getRandomPhysicsEffect());
        }, index * 200);
    });
    
    setTimeout(() => {
        document.body.style.filter = '';
        showToast('Matrix mode deactivated. Reality restored.', 'success');
    }, 5000);
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        scrollToSection,
        downloadCV,
        triggerPhysicsEffect,
        triggerScreenShake
    };
}
