# 🚀 Bhugol Gautam - AI Developer & Game Creator Portfolio

```
██████╗  ██████╗ 
██╔══██╗██╔════╝ 
██████╔╝██║  ███╗
██╔══██╗██║   ██║
██████╔╝╚██████╔╝
╚═════╝  ╚═════╝ 
```

A modern, responsive portfolio website showcasing AI development expertise, game creation skills, and academic journey at Coventry University. Built with HTML, CSS (Tailwind), and vanilla JavaScript for optimal performance and accessibility.

## 🎯 **Features**

### ✨ **Modern Design**
- **Tailwind CSS Framework** - Utility-first styling for consistent design
- **Dark/Light Theme Toggle** - Automatic system preference detection
- **Responsive Layout** - Mobile-first design principles
- **Smooth Animations** - AOS (Animate on Scroll) library integration
- **Interactive Elements** - Hover effects, tilt animations, and microinteractions

### 🔧 **Technical Excellence**
- **Semantic HTML5** - Accessible markup structure
- **SEO Optimized** - Meta tags, structured data, and social media cards
- **Performance Focused** - Vanilla JavaScript, lazy loading, and optimized assets
- **Cross-browser Compatible** - Works on all modern browsers
- **Keyboard Navigation** - Full accessibility compliance

### 📱 **Interactive Components**
- **Animated Progress Bars** - Skills visualization with percentage counters
- **Project Cards** - Hover tilt effects and smooth transitions
- **Certificate Modals** - Detailed achievement information
- **Contact Form** - Client-side validation with toast notifications
- **Mobile Navigation** - Hamburger menu with smooth animations

## 🛠️ **Technology Stack**

- **Frontend**: HTML5, CSS3, Tailwind CSS
- **JavaScript**: Vanilla ES6+ with modern APIs
- **Animations**: AOS (Animate on Scroll)
- **Icons**: Font Awesome 6
- **Fonts**: Inter, JetBrains Mono (Google Fonts)
- **Tools**: IntersectionObserver, LocalStorage, FormData API

## 🚀 **Quick Start**

### **Option 1: Python Server (Recommended)**
```bash
# Navigate to project directory
cd bhugol-hacker-portfolio

# Start Python development server
python -m http.server 8000

# Open browser to http://localhost:8000
```

### **Option 2: Node.js Server**
```bash
# Install http-server globally
npm install -g http-server

# Start server in project directory
http-server -p 8000

# Access at http://localhost:8000
```

### **Option 3: VS Code Live Server**
1. Install the **Live Server** extension
2. Right-click on `index.html`
3. Select **"Open with Live Server"**

## 📂 **Project Structure**

```
bhugol-hacker-portfolio/
├── index.html              # Main HTML structure
├── styles.css              # Custom CSS (Tailwind + custom styles)
├── script.js               # Interactive JavaScript functionality
├── README.md               # Project documentation
└── assets/                 # (Create as needed)
    ├── cv/                # CV/Resume files
    ├── certificates/       # Certificate PDFs
    └── images/            # Profile and project images
```

## 🎨 **Customization Guide**

### **1. Personal Information**

#### Update Basic Details
```html
<!-- Hero Section Philosophy Quote -->
<blockquote class="text-xl md:text-2xl text-gray-300 mb-8 font-light italic">
    "Your philosophy quote here"
</blockquote>

<!-- University & Status -->
<p class="text-lg">🎓 <span class="text-accent-cyan">Your University</span></p>
<p>🚀 Your Interests • Your Specializations • Your Focus Areas</p>
```

#### Update Social Media Links
Replace URLs in both hero and contact sections:
```html
<a href="https://github.com/yourusername" target="_blank">
<a href="https://linkedin.com/in/yourprofile" target="_blank">
<a href="https://facebook.com/yourpage" target="_blank">
<a href="https://instagram.com/yourusername" target="_blank">
```

### **2. Skills & Progress Bars**

#### Modify Skill Levels
```html
<!-- Update data-level attribute and percentages -->
<div class="skill-progress" data-level="85" style="width: 0%"></div>
<span class="skill-percentage" data-level="85">0%</span>
```

#### Available Skills Structure
- **Programming Languages**: Python, C#, JavaScript
- **Frameworks & Technology**: Unity, Web Development, Android System
- **Specialization Areas**: Game Development (80%), Backend Systems (75%), System Modification (70%)
- **Future Goals**: Machine Learning (25%), Computer Vision (20%), Neural Networks (30%)

### **3. Project Information**

#### Add/Update Projects
```html
<div class="project-card" data-aos="fade-up">
    <div class="h-48 bg-gradient-to-br from-your-color-1 to-your-color-2">
        <i class="fas fa-your-icon text-6xl text-white"></i>
    </div>
    <div class="p-6">
        <h3>Your Project Name</h3>
        <p>Your project description...</p>
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-3 py-1 bg-tag-color rounded-full">Tag 1</span>
            <span class="px-3 py-1 bg-tag-color rounded-full">Tag 2</span>
        </div>
        <a href="your-github-link" target="_blank">
            View on GitHub
        </a>
    </div>
</div>
```

### **4. Certificate Modal Content**

Update certificate data in `script.js`:
```javascript
this.certificateData = {
    'your-cert-id': {
        title: 'Your Certificate Name',
        type: 'Certificate Type',
        content: `
            <div class="certificate-details">
                <!-- Your certificate HTML content -->
            </div>
        `
    }
};
```

### **5. Color Customization**

#### Tailwind Config Colors
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': '#your-primary-color',
                'secondary': '#your-secondary-color',
                'accent-cyan': '#your-cyan-color',
                'accent-lime': '#your-lime-color',
                'dark-card': '#your-dark-card-color'
            }
        }
    }
}
```

#### Custom CSS Variables
```css
:root {
    --primary: #1e293b;
    --secondary: #0f172a;
    --accent-cyan: #06b6d4;
    --accent-lime: #84cc16;
    --dark-card: #334155;
}
```

### **6. Add Your CV**

1. Create `assets/cv/` directory
2. Add your CV file: `Bhugol_Gautam_CV.pdf`
3. Update download function in `script.js`:

```javascript
function downloadCV() {
    const link = document.createElement('a');
    link.href = '/assets/cv/Bhugol_Gautam_CV.pdf';
    link.download = 'Bhugol_Gautam_CV.pdf';
    link.click();
    link.remove();
}
```

### **7. Contact Form Integration**

#### For Formspree Integration:
```javascript
async submitForm(data) {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
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
}
```

#### For Netlify Forms:
Add `data-netlify="true"` to the form element and deploy to Netlify.

## 🌐 **Deployment**

### **Static Hosting Services**

#### **Netlify (Recommended)**
1. Drag project folder to [Netlify Deploy](https://app.netlify.com/drop)
2. Automatic HTTPS and CDN
3. Form handling available
4. Custom domain support

#### **Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow deployment prompts
```

#### **GitHub Pages**
1. Create GitHub repository
2. Push portfolio files to main branch
3. Enable Pages in repository settings
4. Site available at `https://username.github.io/repository`

#### **Cloudflare Pages**
1. Connect GitHub repository
2. Build settings: None (static site)
3. Deploy with global CDN

### **Traditional Web Hosting**
Upload all files to your hosting provider's public directory (`public_html`, `www`, etc.).

## 🎛️ **Configuration Options**

### **AOS Animation Settings**
```javascript
AOS.init({
    duration: 800,        // Animation duration
    delay: 100,          // Global delay
    once: true,          // Animate only once
    mirror: false        // Don't reverse animations
});
```

### **Skill Animation Timing**
```javascript
// In SkillsManager class
animateCounter(element, start, end, duration = 1000)
```

### **Theme Persistence**
Theme preference is automatically saved to `localStorage` and respects system dark/light mode preference.

## 📊 **Performance Features**

- **Intersection Observer** - Efficient scroll-triggered animations
- **Debounced Scroll Handlers** - Smooth performance during scrolling
- **CSS-only Animations** - Hardware-accelerated transforms
- **Minimal JavaScript** - No heavy frameworks or libraries
- **Optimized Assets** - Compressed images and efficient loading

## 🔧 **Browser Support**

### **Fully Supported**
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### **Partially Supported**
- Internet Explorer 11 (basic functionality)
- Older mobile browsers (graceful degradation)

## ♿ **Accessibility Features**

- **Semantic HTML** - Proper heading structure and landmarks
- **Keyboard Navigation** - Full site navigation without mouse
- **Screen Reader Support** - ARIA labels and descriptive text
- **High Contrast** - Support for high contrast mode
- **Reduced Motion** - Respects `prefers-reduced-motion` setting
- **Focus Indicators** - Visible focus states for all interactive elements

## 🎯 **SEO Optimization**

### **Meta Tags**
- Complete Open Graph tags for social media
- Twitter Cards for rich previews
- Structured Data (JSON-LD) for search engines

### **Performance**
- Minimal external dependencies
- Optimized images and assets
- Fast loading times
- Mobile-first responsive design

## 📝 **Content Guidelines**

### **Philosophy Quote**
Current: *"Jack of all trades, master of none, but oftentimes better than master of one."*

### **Status Message**
Current: *"Online, exploring AI frontiers"*

### **Learning Path Blurb**
Current: *"Building the foundation for AI development"*

### **Project Descriptions**
- **Bahun-D-Run**: Game inspired by Twake Productions video; built for school; C#
- **Exhibitio Khwopa**: Exhibition/event management system; Python
- **NewHoly**: Modern web application with interactive UX; JavaScript
- **MagiskOnWSA**: System mod integrating Magisk + Google Apps into WSA; Android

## 🚨 **Important Notes**

- **Professional Use**: This portfolio is designed for academic and professional purposes
- **Responsive Design**: Optimized for all device sizes
- **Modern Browsers**: Uses modern JavaScript features (ES6+)
- **Accessibility First**: Designed with web accessibility in mind
- **Performance Optimized**: Lightweight and fast-loading

## 🤝 **Contributing**

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Test thoroughly across browsers
4. Submit a pull request with clear description

## 📞 **Support & Contact**

If you encounter issues or have questions:

1. Check browser console for errors
2. Verify all files are properly uploaded
3. Test with different browsers and devices
4. Ensure CDN resources are loading correctly

## 📄 **License**

This project is open source and available under the **MIT License**. You are free to:
- Use for personal or educational purposes
- Modify and adapt to your needs
- Create your own version

**Attribution appreciated but not required.**

---

```
 ⚡ BUILT WITH MODERN WEB TECHNOLOGIES
 🎓 DESIGNED FOR ACADEMIC & PROFESSIONAL USE
 🚀 OPTIMIZED FOR PERFORMANCE & ACCESSIBILITY
```

**Created with 💙 for aspiring AI developers and creative technologists worldwide.**
