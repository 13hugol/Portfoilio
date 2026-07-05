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
				'2xl': '1320px',
			},
		},
		extend: {
			colors: {
				// shadcn compatibility — repointed to B&W editorial tokens
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

				// ── Hermès-editorial B&W tokens ──────────────────────────────
				ink:          '#0A0A0A', // page bg (near-black, soft on type)
				paper:        '#F4F1EC', // alt/inverted section (warm off-white)
				surface:      '#121212', // raised card
				'surface-2':  '#1A1A1A', // hover surface
				line:         '#262626', // hairline border
				'line-strong':'#3A3A3A', // stronger hairline
				text:         '#F5F5F5', // primary type
				muted:        '#A1A1A1', // secondary type
				faint:        '#6E6E6E', // tertiary / dim
				'pure-white': '#FFFFFF',
				'pure-black': '#000000',
			},
			fontFamily: {
				serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
				sans:    ['Inter', 'system-ui', 'sans-serif'],
				mono:    ['"JetBrains Mono"', 'Fira Code', 'monospace'],
				display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
			},
			fontSize: {
				'display-xl': ['clamp(3.5rem, 11vw, 10rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
				'display':    ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
				'h1':         ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'h2':         ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
				'h3':         ['1.375rem', { lineHeight: '1.2' }],
				'body-lg':    ['1.125rem', { lineHeight: '1.7' }],
				'body':       ['1rem', { lineHeight: '1.65' }],
				'caption':    ['0.8125rem', { lineHeight: '1.5' }],
				'micro':      ['0.6875rem', { lineHeight: '1.4' }],
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
				'sharp': '0',
				'small': '0.25rem',
				'medium': '0.5rem',
				'large': '0.875rem',
				'pill': '999px',
			},
			boxShadow: {
				'elevate':     '0 1px 0 0 rgba(255,255,255,0.04), 0 12px 32px rgba(0,0,0,0.6)',
				'elevate-lg':  '0 1px 0 0 rgba(255,255,255,0.06), 0 24px 64px rgba(0,0,0,0.75)',
				'card-hover':  '0 0 0 1px rgba(255,255,255,0.18), 0 24px 64px rgba(0,0,0,0.8)',
				'focus-ring':  '0 0 0 2px rgba(245,245,245,0.55)',
			},
			animation: {
				'fade-up':     'fade-up 0.7s cubic-bezier(0.2,0.8,0.2,1) both',
				'fade-in':     'fade-in 0.6s ease-out both',
				'marquee':     'marquee 36s linear infinite',
				'cursor-blink':'cursor-blink 1.05s step-end infinite',
			},
			keyframes: {
				'fade-up': {
					'0%':   { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in': {
					'0%':   { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'marquee': {
					'0%':   { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' },
				},
				'cursor-blink': {
					'0%, 100%': { opacity: '1' },
					'50%':      { opacity: '0' },
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
