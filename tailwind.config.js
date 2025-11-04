/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				// Original shadcn colors (kept for compatibility)
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				
				// Cyber-Kathmandu Design Tokens
				pure: {
					black: '#000000',
				},
				'near-black': '#0a0a0a',
				'dark-surface': '#141414',
				'hover-surface': '#1e1e1e',
				
				matrix: {
					green: {
						primary: '#00FF41',
						hover: '#33FF66',
						muted: '#22c55e',
					},
				},
				
				nepali: {
					'lapis-blue': '#1A237E',
					'malachite-green': '#2E7D32',
					'warm-gold': '#FFD700',
					'dhaka-ochre': '#D4A574',
				},
				
				text: {
					primary: '#E4E4E7',
					secondary: '#A1A1AA',
					tertiary: '#71717A',
					matrix: '#00FF41',
				},
			},
			fontFamily: {
				'mono': ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'display': ['Space Grotesk', 'Inter', 'sans-serif'],
			},
			fontSize: {
				'hero': '3.5rem',
				'h1': '2.5rem',
				'h2': '1.75rem',
				'body-large': '1.125rem',
				'body': '1rem',
				'code': '0.875rem',
				'caption': '0.8125rem',
			},
			spacing: {
				'xs': '0.5rem',
				'sm': '1rem',
				'md': '1.5rem',
				'lg': '2rem',
				'xl': '3rem',
				'2xl': '4rem',
				'3xl': '6rem',
				'4xl': '8rem',
			},
			borderRadius: {
				'sharp': '0.25rem',
				'small': '0.5rem',
				'medium': '0.75rem',
				'large': '1rem',
			},
			boxShadow: {
				'matrix-glow': '0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3)',
				'card-base': '0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.5)',
				'card-hover': '0 0 0 1px rgba(0, 255, 65, 0.3), 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 255, 65, 0.15)',
				'focus-ring': '0 0 0 3px rgba(0, 255, 65, 0.5)',
				'photo-glow': '0 0 40px rgba(0, 255, 65, 0.6)',
			},
			animation: {
				'typing': 'typing 3.5s steps(40, end)',
				'blink-caret': 'blink-caret 0.75s step-end infinite',
				'matrix-rain': 'matrix-rain 2s linear infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
			},
			keyframes: {
				typing: {
					'from': { width: '0' },
					'to': { width: '100%' },
				},
				'blink-caret': {
					'from, to': { 'border-color': 'transparent' },
					'50%': { 'border-color': '#00FF41' },
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100vh)' },
					'100%': { transform: 'translateY(100vh)' },
				},
				'glow-pulse': {
					'0%, 100%': { 'box-shadow': '0 0 20px rgba(0, 255, 65, 0.5)' },
					'50%': { 'box-shadow': '0 0 30px rgba(0, 255, 65, 0.8)' },
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}