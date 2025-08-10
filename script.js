// Matrix Background Animation
class MatrixBackground {
    constructor() {
        this.canvas = document.getElementById('matrix-bg');
        this.ctx = this.canvas.getContext('2d');
        this.characters = '01';
        this.fontSize = 16;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.draw();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / this.fontSize;
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px Fira Code, monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        setTimeout(() => this.draw(), 35);
    }
    
    resize() {
        this.init();
    }
}

// Terminal Cursor Follower
class TerminalCursor {
    constructor() {
        this.cursor = document.querySelector('.terminal-cursor');
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });
        
        // Hide cursor when hovering over links
        document.querySelectorAll('a, button, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.display = 'none';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.display = 'block';
            });
        });
    }
}

// Typing Animation
class TypingAnimation {
    constructor() {
        this.commandElement = document.getElementById('typing-command');
        this.outputElement = document.getElementById('terminal-output');
        this.commands = [
            'whoami',
            'cat /etc/motto',
            'ls -la ai_projects/',
            'python -c "import tensorflow as tf; print(tf.__version__)"',
            'nvidia-smi'
        ];
        this.responses = [
            'Bhugol Gautam - Computer Science Student & AI Researcher',
            '"Jack of all trades, master of none, but oftentimes better than master of one"',
            'TensorFlow  OpenCV  Scikit-Learn  Neural-Networks  Computer-Vision  ML-Models',
            '2.13.0\nGPU Available: Training neural networks...',
            'GPU 0: Neural Network Training Active\nMemory Usage: 85% | Temp: 72°C'
        ];
        this.currentCommand = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        setTimeout(() => this.type(), 1000);
    }
    
    type() {
        const command = this.commands[this.currentCommand];
        const response = this.responses[this.currentCommand];
        
        if (!this.isDeleting && this.currentChar <= command.length) {
            this.commandElement.textContent = command.substring(0, this.currentChar);
            this.currentChar++;
            setTimeout(() => this.type(), 100);
        } else if (!this.isDeleting && !this.isPaused) {
            this.isPaused = true;
            this.showResponse(response);
            setTimeout(() => {
                this.isDeleting = true;
                this.isPaused = false;
                this.type();
            }, 2000);
        } else if (this.isDeleting && this.currentChar >= 0) {
            this.commandElement.textContent = command.substring(0, this.currentChar);
            this.currentChar--;
            setTimeout(() => this.type(), 50);
        } else {
            this.isDeleting = false;
            this.currentChar = 0;
            this.currentCommand = (this.currentCommand + 1) % this.commands.length;
            this.outputElement.innerHTML = '';
            setTimeout(() => this.type(), 500);
        }
    }
    
    showResponse(response) {
        this.outputElement.innerHTML = `<div class="response">${response}</div>`;
    }
}

// Smooth Scrolling Navigation
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skill-item')) {
                        const progress = entry.target.querySelector('.skill-progress');
                        const level = entry.target.getAttribute('data-level');
                        setTimeout(() => {
                            progress.style.width = level + '%';
                        }, 200);
                    }
                }
            });
        }, options);
        
        // Observe all sections and skill items
        document.querySelectorAll('.section, .skill-item, .project-card, .certificate-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// Glitch Effect
class GlitchEffect {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('.nav-logo, .section-title').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.add('glitch');
                el.setAttribute('data-text', el.textContent);
            });
            
            el.addEventListener('mouseleave', () => {
                el.classList.remove('glitch');
            });
        });
    }
}

// Project Filter (if needed in future)
class ProjectFilter {
    constructor() {
        this.init();
    }
    
    init() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-card');
        
        if (filterButtons.length === 0) return;
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                projects.forEach(project => {
                    if (filter === 'all' || project.getAttribute('data-tech').toLowerCase().includes(filter)) {
                        project.style.display = 'block';
                        project.classList.add('fade-in-up');
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.isOpen = false;
        this.init();
    }
    
    init() {
        if (!this.navToggle) return;
        
        this.navToggle.addEventListener('click', () => {
            this.toggle();
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.toggle();
                }
            });
        });
    }
    
    toggle() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.navMenu.style.display = 'flex';
            this.navMenu.style.flexDirection = 'column';
            this.navMenu.style.position = 'absolute';
            this.navMenu.style.top = '100%';
            this.navMenu.style.left = '0';
            this.navMenu.style.right = '0';
            this.navMenu.style.background = 'rgba(0, 0, 0, 0.95)';
            this.navMenu.style.padding = '2rem';
            this.navMenu.style.backdropFilter = 'blur(10px)';
        } else {
            this.navMenu.style.display = '';
            this.navMenu.style.flexDirection = '';
            this.navMenu.style.position = '';
            this.navMenu.style.top = '';
            this.navMenu.style.left = '';
            this.navMenu.style.right = '';
            this.navMenu.style.background = '';
            this.navMenu.style.padding = '';
            this.navMenu.style.backdropFilter = '';
        }
    }
}

// Theme Switcher (Future Enhancement)
class ThemeManager {
    constructor() {
        this.currentTheme = 'matrix';
        this.themes = {
            matrix: {
                primary: '#00ff41',
                secondary: '#00d4aa',
                accent: '#ff6b6b'
            },
            cyber: {
                primary: '#ff0080',
                secondary: '#00ffff',
                accent: '#ffff00'
            },
            hacker: {
                primary: '#00ff00',
                secondary: '#ffffff',
                accent: '#ff0000'
            }
        };
    }
    
    switchTheme(themeName) {
        if (!this.themes[themeName]) return;
        
        const theme = this.themes[themeName];
        const root = document.documentElement;
        
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--accent-color', theme.accent);
        
        this.currentTheme = themeName;
    }
}

// Particle System (Advanced Effect)
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }
    
    init() {
        this.canvas.id = 'particles';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';
        
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#00ff41';
            this.ctx.fill();
            
            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 255, 65, ${1 - distance / 100})`;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Certificate Image Modal
class CertificateModal {
    constructor() {
        this.modal = null;
        this.init();
    }
    
    init() {
        // Create modal element
        this.modal = document.createElement('div');
        this.modal.className = 'cert-image-modal';
        this.modal.innerHTML = `
            <div class="cert-modal-content">
                <div class="cert-modal-close">
                    <i class="fas fa-times"></i>
                </div>
                <img src="" alt="Certificate" />
            </div>
        `;
        document.body.appendChild(this.modal);
        
        // Add event listeners
        this.bindEvents();
    }
    
    bindEvents() {
        // Add click listeners to all certificate previews
        document.querySelectorAll('.certificate-preview').forEach(preview => {
            preview.addEventListener('click', (e) => {
                const img = preview.querySelector('.cert-image');
                if (img) {
                    this.openModal(img.src, img.alt);
                }
            });
        });
        
        // Close modal events
        const closeBtn = this.modal.querySelector('.cert-modal-close');
        closeBtn.addEventListener('click', () => this.closeModal());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(imageSrc, imageAlt) {
        const img = this.modal.querySelector('img');
        img.src = imageSrc;
        img.alt = imageAlt;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear image source after animation
        setTimeout(() => {
            const img = this.modal.querySelector('img');
            img.src = '';
            img.alt = '';
        }, 300);
    }
}

// Image error handling
class CertificateImageHandler {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('.cert-image').forEach(img => {
            img.addEventListener('error', (e) => {
                this.handleImageError(e.target);
            });
            
            img.addEventListener('load', (e) => {
                this.handleImageLoad(e.target);
            });
        });
    }
    
    handleImageError(img) {
        const preview = img.closest('.certificate-preview');
        if (preview) {
            preview.innerHTML = `
                <div class="cert-image-placeholder">
                    <i class="fas fa-image"></i>
                    <div class="placeholder-text">
                        Certificate image will be displayed here
                    </div>
                </div>
            `;
            
            // Remove click functionality for placeholder
            preview.style.cursor = 'default';
            preview.onclick = null;
        }
    }
    
    handleImageLoad(img) {
        // Add a subtle animation when image loads
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            img.style.opacity = '1';
        }, 100);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new MatrixBackground();
    new TerminalCursor();
    new TypingAnimation();
    new SmoothScroll();
    new ScrollAnimations();
    new GlitchEffect();
    new ProjectFilter();
    new MobileNav();
    new ThemeManager();
    
    // Initialize certificate functionality
    new CertificateModal();
    new CertificateImageHandler();
    
    // Add particle system on larger screens
    if (window.innerWidth > 768) {
        new ParticleSystem();
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const matrix = new MatrixBackground();
        matrix.resize();
    });
    
    // Add some easter eggs
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Console easter egg
    console.log(`
    ╔══════════════════════════════════════╗
    ║                                      ║
    ║    Welcome to Bhugol's Portfolio!    ║
    ║                                      ║
    ║    Interested in the code?           ║
    ║    Check out the GitHub repo!        ║
    ║                                      ║
    ║    Try the Konami Code: ↑↑↓↓←→←→BA   ║
    ║                                      ║
    ╚══════════════════════════════════════╝
    `);
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
