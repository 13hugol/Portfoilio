// Bhugol Gautam Portfolio - Interactive JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        delay: 100,
        once: true,
        mirror: false
    });
});

// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        this.initializeTheme();
        this.attachEventListeners();
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
            this.setDarkTheme();
        } else {
            this.setLightTheme();
        }
    }

    attachEventListeners() {
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
            if (!localStorage.getItem('theme')) {
                e.matches ? this.setDarkTheme() : this.setLightTheme();
            }
        });
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        isDark ? this.setLightTheme() : this.setDarkTheme();
    }

    setDarkTheme() {
        document.documentElement.classList.add('dark');
        if (this.themeIcon) {
            this.themeIcon.className = 'fas fa-sun';
        }
        localStorage.setItem('theme', 'dark');
    }

    setLightTheme() {
        document.documentElement.classList.remove('dark');
        if (this.themeIcon) {
            this.themeIcon.className = 'fas fa-moon';
        }
        localStorage.setItem('theme', 'light');
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = document.querySelectorAll('a[href^="#"]');
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Mobile menu toggle
        this.mobileMenuToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Smooth scrolling for all anchor links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                this.closeMobileMenu();
            }
        });

        // Handle scroll for header styling
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('hidden');
        this.mobileMenuToggle.classList.toggle('active');
        
        // Improved hamburger animation using CSS classes
        const isOpen = !this.mobileMenu.classList.contains('hidden');
        
        // Add visual feedback
        if (isOpen) {
            this.mobileMenu.style.animation = 'slideDown 0.3s ease-out';
        } else {
            this.mobileMenu.style.animation = 'slideUp 0.3s ease-out';
        }
    }

    closeMobileMenu() {
        if (this.mobileMenu && !this.mobileMenu.classList.contains('hidden')) {
            this.mobileMenu.classList.add('hidden');
            this.mobileMenuToggle?.classList.remove('active');
        }
    }

    handleNavClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            this.scrollToSection(href.substring(1));
            this.closeMobileMenu();
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offset = 80; // Account for fixed header
            const sectionTop = section.offsetTop - offset;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header?.classList.add('backdrop-blur-lg', 'bg-white/90', 'dark:bg-secondary/90');
        } else {
            header?.classList.remove('backdrop-blur-lg', 'bg-white/90', 'dark:bg-secondary/90');
        }
    }
}

// Skills Animation Manager
class SkillsManager {
    constructor() {
        this.skillItems = document.querySelectorAll('.skill-item');
        this.systemStats = document.querySelector('.system-stats');
        this.observeSkills();
        this.observeSystemStats();
    }

    observeSkills() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkill(entry.target);
                }
            });
        }, { threshold: 0.3 });

        this.skillItems.forEach(item => observer.observe(item));
    }

    observeSystemStats() {
        if (this.systemStats) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateSystemStats();
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(this.systemStats);
        }
    }

    animateSystemStats() {
        const systemSkillBars = document.querySelectorAll('.system-skill-bar');
        
        systemSkillBars.forEach((bar, index) => {
            const targetWidth = parseInt(bar.dataset.width);
            
            setTimeout(() => {
                bar.style.width = `${targetWidth}%`;
            }, index * 200 + 500); // Stagger animations
        });
    }

    animateSkill(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        const percentage = skillItem.querySelector('.skill-percentage');
        
        if (!progressBar || !percentage) return;
        
        const targetLevel = parseInt(progressBar.dataset.level);
        
        if (isNaN(targetLevel)) return;

        // Animate progress bar
        setTimeout(() => {
            progressBar.style.width = `${targetLevel}%`;
        }, 100);

        // Animate percentage counter
        this.animateCounter(percentage, 0, targetLevel, 1000);

        // Add entrance animation
        skillItem.classList.add('animate');
    }

    animateCounter(element, start, end, duration) {
        const range = end - start;
        const minTimer = 50;
        const stepTime = Math.abs(Math.floor(duration / range));
        const timer = Math.max(stepTime, minTimer);
        
        let current = start;
        const increment = range > 0 ? 1 : -1;
        
        const counter = setInterval(() => {
            current += increment;
            element.textContent = `${current}%`;
            
            if (current === end) {
                clearInterval(counter);
            }
        }, timer);
    }
}

// Modal Manager
class ModalManager {
    constructor() {
        this.modal = document.getElementById('modal');
        this.modalBody = document.getElementById('modal-body');
        this.attachEventListeners();
        this.setupModalData();
    }

    attachEventListeners() {
        // Close modal when clicking outside
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    setupModalData() {
        this.certificateData = {
            'opencv-cert': {
                title: 'OpenCV Certification',
                type: 'Computer Vision',
                content: `
                    <div class="certificate-details">
                        <div class="certificate-header">
                            <span class="certificate-badge">🏆 CERTIFIED</span>
                            <span class="certificate-date">2024</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4">OpenCV Computer Vision Certification</h3>
                        <div class="certificate-description">
                            <p>Comprehensive certification in computer vision using OpenCV library. Covered advanced topics including:</p>
                            <ul class="list-disc list-inside mt-3 space-y-1">
                                <li>Image Processing and Enhancement</li>
                                <li>Object Detection and Recognition</li>
                                <li>Feature Extraction and Matching</li>
                                <li>Video Processing and Analysis</li>
                                <li>Machine Learning for Computer Vision</li>
                            </ul>
                        </div>
                        <div class="certificate-skills mt-4">
                            <h4 class="font-semibold mb-2">Skills Acquired:</h4>
                            <div class="flex flex-wrap gap-2">
                                <span class="skill-tag">OpenCV</span>
                                <span class="skill-tag">Python</span>
                                <span class="skill-tag">Image Processing</span>
                                <span class="skill-tag">Object Detection</span>
                                <span class="skill-tag">Computer Vision</span>
                            </div>
                        </div>
                    </div>
                `
            },
            'it-help-cert': {
                title: 'IT Help Team Event Certificate',
                type: 'Technical Support',
                content: `
                    <div class="certificate-details">
                        <div class="certificate-header">
                            <span class="certificate-badge">🛠️ TECHNICAL SUPPORT</span>
                            <span class="certificate-date">2024</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4">IT Help Team Event Certificate</h3>
                        <div class="certificate-description">
                            <p>Successfully participated in IT support event as Technical Support Specialist. Responsibilities included:</p>
                            <ul class="list-disc list-inside mt-3 space-y-1">
                                <li>Hardware and Software Troubleshooting</li>
                                <li>Network Configuration and Maintenance</li>
                                <li>System Administration Tasks</li>
                                <li>User Support and Training</li>
                                <li>Documentation and Knowledge Base Management</li>
                            </ul>
                        </div>
                        <div class="certificate-skills mt-4">
                            <h4 class="font-semibold mb-2">Skills Demonstrated:</h4>
                            <div class="flex flex-wrap gap-2">
                                <span class="skill-tag">IT Support</span>
                                <span class="skill-tag">System Administration</span>
                                <span class="skill-tag">Network Troubleshooting</span>
                                <span class="skill-tag">Hardware Maintenance</span>
                                <span class="skill-tag">Customer Service</span>
                            </div>
                        </div>
                    </div>
                `
            },
            'unity-cert': {
                title: 'Unity Game Development Certificate',
                type: 'Game Development',
                content: `
                    <div class="certificate-details">
                        <div class="certificate-header">
                            <span class="certificate-badge">🎮 GAME DEVELOPER</span>
                            <span class="certificate-date">2024</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Unity Game Development Certificate</h3>
                        <div class="certificate-description">
                            <p>Completed comprehensive Unity 3D game development certification. Mastered essential game development concepts:</p>
                            <ul class="list-disc list-inside mt-3 space-y-1">
                                <li>Unity 3D Engine and Editor</li>
                                <li>C# Programming for Games</li>
                                <li>Game Physics and Mechanics</li>
                                <li>Interactive System Design</li>
                                <li>Game Optimization and Performance</li>
                                <li>Cross-platform Deployment</li>
                            </ul>
                        </div>
                        <div class="certificate-skills mt-4">
                            <h4 class="font-semibold mb-2">Technologies Mastered:</h4>
                            <div class="flex flex-wrap gap-2">
                                <span class="skill-tag">Unity 3D</span>
                                <span class="skill-tag">C#</span>
                                <span class="skill-tag">Game Design</span>
                                <span class="skill-tag">Interactive Systems</span>
                                <span class="skill-tag">Game Physics</span>
                            </div>
                        </div>
                    </div>
                `
            }
        };
    }

    openModal(certificateId) {
        const data = this.certificateData[certificateId];
        if (data && this.modalBody) {
            this.modalBody.innerHTML = data.content;
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        this.modal?.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Clear modal content after animation
        setTimeout(() => {
            if (this.modalBody) {
                this.modalBody.innerHTML = '';
            }
        }, 300);
    }
}

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.submitForm(data);
            
            this.showToast('Message sent successfully! Thank you for reaching out.', 'success');
            this.form.reset();
        } catch (error) {
            this.showToast('Failed to send message. Please try again.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    }

    validateForm(data) {
        const { name, email, message } = data;
        
        if (!name.trim()) {
            this.showToast('Please enter your name.', 'error');
            return false;
        }
        
        if (!this.isValidEmail(email)) {
            this.showToast('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!message.trim()) {
            this.showToast('Please enter your message.', 'error');
            return false;
        }
        
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async submitForm(data) {
        // Replace this with your actual form submission endpoint
        // Example: Formspree, Netlify Forms, or custom API
        
        // Simulated API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.2 ? resolve(data) : reject(new Error('Network error'));
            }, 1500);
        });
        
        // Example with Formspree:
        /*
        const response = await fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit form');
        }
        
        return response.json();
        */
    }

    showToast(message, type = 'success') {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());

        // Create new toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80;
        const sectionTop = section.offsetTop - offset;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

function downloadCV() {
    // Create a placeholder CV download
    // Replace this with your actual CV file path
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual CV URL
    link.download = 'Bhugol_Gautam_CV.pdf';
    
    // Show toast since no actual file is available
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = 'CV download feature will be available soon!';
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
    
    // For actual implementation:
    // link.click();
}

function openModal(modalId) {
    window.modalManager?.openModal(modalId);
}

function closeModal() {
    window.modalManager?.closeModal();
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.logPerformance();
    }

    logPerformance() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`🚀 Portfolio loaded in ${loadTime.toFixed(2)}ms`);
            
            // Log other performance metrics
            if ('connection' in navigator) {
                console.log(`📶 Connection: ${navigator.connection.effectiveType}`);
            }
        });
    }
}

// Loading Screen Manager
class LoadingScreenManager {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.init();
    }
    
    init() {
        // Auto-hide loading screen after animations complete
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 3000);
    }
    
    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('fade-out');
            
            // Remove from DOM after transition
            setTimeout(() => {
                this.loadingScreen.remove();
            }, 800);
        }
    }
}

// Cyberpunk Enhancement Manager
class CyberpunkEnhancer {
    constructor() {
        this.initializeParticleSystem();
        this.initializeTypewriterEffects();
        this.enhanceTerminalButtons();
        this.initializeMatrixBackground();
    }

    showWelcomeMessage() {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.innerHTML = `
            <div class="font-mono text-accent-cyan">
                <div class="mb-2">> Initializing portfolio...</div>
                <div class="mb-2">> Loading user profile...</div>
                <div class="mb-2">> Connecting to neural network...</div>
                <div class="text-accent-lime font-bold">>>> ACCESS GRANTED <<<</div>
                <div class="text-xs mt-4 text-gray-400">Welcome to Bhugol Gautam's Digital Space</div>
            </div>
        `;
        document.body.appendChild(welcomeMsg);
        
        setTimeout(() => {
            welcomeMsg.classList.add('fade-out');
            setTimeout(() => welcomeMsg.remove(), 500);
        }, 3000);
    }

    initializeParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < 20; i++) {
            this.createParticle(particleContainer);
        }
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createParticle(particleContainer);
            }
        }, 2000);
    }
    
    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (5 + Math.random() * 10) + 's';
        particle.style.opacity = 0.3 + Math.random() * 0.7;
        
        const colors = ['#00f6ff', '#a3ff12', '#9d4edd'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    initializeTypewriterEffects() {
        const typingElements = document.querySelectorAll('.typing-text');
        typingElements.forEach((element, index) => {
            const text = element.getAttribute('data-text') || element.textContent;
            element.textContent = '';
            setTimeout(() => {
                this.typeWriter(element, text, 100);
            }, index * 500);
        });
    }
    
    typeWriter(element, text, speed = 100) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    enhanceTerminalButtons() {
        const terminalBtns = document.querySelectorAll('.terminal-btn');
        terminalBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.playTypingSound();
            });
            
            btn.addEventListener('click', (e) => {
                this.createRippleEffect(e.target, e);
            });
        });
    }
    
    createRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    playTypingSound() {
        // Subtle audio feedback simulation (visual only)
        document.body.style.animation = 'subtle-flash 0.1s ease-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 100);
    }

    initializeMatrixBackground() {
        // Subtle matrix effect for hero section
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            this.createMatrixRain(heroSection);
        }
    }
    
    createMatrixRain(container) {
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-bg';
        container.appendChild(matrixContainer);
        
        setInterval(() => {
            if (Math.random() > 0.95) {
                this.dropMatrixChar(matrixContainer);
            }
        }, 100);
    }
    
    dropMatrixChar(container) {
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (2 + Math.random() * 5) + 's';
        
        container.appendChild(char);
        
        setTimeout(() => {
            char.remove();
        }, 7000);
    }
}

// Enhanced Theme Manager for Cyberpunk
class EnhancedThemeManager extends ThemeManager {
    constructor() {
        super();
        this.initializeCyberpunkElements();
    }
    
    initializeCyberpunkElements() {
        // Add subtle glow to certain elements
        this.addGlowEffects();
        // Initialize section title animations
        this.initializeSectionTitles();
    }
    
    addGlowEffects() {
        const glowElements = document.querySelectorAll('.project-card, .certificate-card, .skill-item');
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.3s ease';
                element.style.filter = 'drop-shadow(0 0 10px rgba(0, 246, 255, 0.3))';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.filter = '';
            });
        });
    }
    
    initializeSectionTitles() {
        const sectionTitles = document.querySelectorAll('h2[data-aos]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('terminal-typing');
                }
            });
        }, { threshold: 0.5 });
        
        sectionTitles.forEach(title => {
            observer.observe(title);
        });
    }
}

// Konami Code Easter Egg
class KonamiCode {
    constructor() {
        this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.userInput = [];
        this.listen();
    }
    
    listen() {
        document.addEventListener('keydown', (e) => {
            this.userInput.push(e.code);
            if (this.userInput.length > this.sequence.length) {
                this.userInput.shift();
            }
            if (this.userInput.join(',') === this.sequence.join(',')) {
                this.activate();
            }
        });
    }
    
    activate() {
        document.body.classList.add('konami-activated');
        const message = document.createElement('div');
        message.className = 'welcome-message';
        message.innerHTML = `
            <div class="font-mono text-center">
                <div class="text-2xl mb-4">🎮 KONAMI CODE ACTIVATED! 🎮</div>
                <div class="text-accent-lime">You found the secret! 🚀</div>
                <div class="text-sm mt-2">Thanks for exploring!</div>
            </div>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.classList.remove('konami-activated');
            message.classList.add('fade-out');
            setTimeout(() => message.remove(), 500);
        }, 5000);
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen first
    window.loadingScreenManager = new LoadingScreenManager();
    
    // Initialize enhanced managers
    window.themeManager = new EnhancedThemeManager();
    window.navigationManager = new NavigationManager();
    window.skillsManager = new SkillsManager();
    window.modalManager = new ModalManager();
    window.contactFormManager = new ContactFormManager();
    window.performanceMonitor = new PerformanceMonitor();
    window.cyberpunkEnhancer = new CyberpunkEnhancer();
    window.konamiCode = new KonamiCode();
    
    // Debug skill bars
    setTimeout(() => {
        console.log('🔍 Debugging skill bars:');
        const skillItems = document.querySelectorAll('.skill-item');
        console.log(`Found ${skillItems.length} skill items:`, skillItems);
        
        const systemStats = document.querySelector('.system-stats');
        console.log('System stats found:', systemStats);
        
        const systemSkillBars = document.querySelectorAll('.system-skill-bar');
        console.log(`Found ${systemSkillBars.length} system skill bars:`, systemSkillBars);
        
        // Manually trigger animations for testing
        if (skillItems.length === 0) {
            console.warn('❌ No skill items found! Check HTML structure.');
        }
        
        // Fallback animation trigger
        setTimeout(() => {
            console.log('⚡ Triggering fallback animations...');
            // Animate system stats immediately
            systemSkillBars.forEach((bar, index) => {
                const targetWidth = parseInt(bar.dataset.width);
                if (targetWidth) {
                    setTimeout(() => {
                        bar.style.width = `${targetWidth}%`;
                        console.log(`Animated system bar ${index} to ${targetWidth}%`);
                    }, index * 200);
                }
            });
            
            // Animate main skill bars
            skillItems.forEach((item, index) => {
                const progressBar = item.querySelector('.skill-progress');
                const percentage = item.querySelector('.skill-percentage');
                if (progressBar && percentage) {
                    const targetLevel = parseInt(progressBar.dataset.level);
                    if (targetLevel) {
                        setTimeout(() => {
                            progressBar.style.width = `${targetLevel}%`;
                            percentage.textContent = `${targetLevel}%`;
                            console.log(`Animated skill bar ${index} to ${targetLevel}%`);
                        }, index * 300);
                    }
                }
            });
        }, 3000);
    }, 1000);
    
    // Console styling
    console.log('%c🎯 Bhugol Gautam Portfolio Initialized', 'color: #00f6ff; font-size: 16px; font-weight: bold;');
    console.log('%c🎨 Theme: Cyberpunk Mode', 'color: #a3ff12; font-size: 14px;');
    console.log('%c📱 Device:', window.innerWidth < 768 ? 'Mobile' : 'Desktop', 'color: #9d4edd; font-size: 14px;');
    console.log('%c🔮 Try the Konami Code! ⬆⬆⬇⬇⬅➡⬅➡BA', 'color: #ff6b6b; font-size: 12px; font-style: italic;');
});
