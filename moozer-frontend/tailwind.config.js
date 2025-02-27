import theme from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'index.html',
		'node_modules/daisyui/dist/**/*.js',
		'node_modules/react-daisyui/dist/**/*.js',
	],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		extend: {
			animation: {
				'meteor-effect': 'meteor 20s linear infinite',
			},
			keyframes: {
				meteor: {
					'0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
					'70%': { opacity: '1' },
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: '0',
					},
				},
			},
			container: {
				center: true,
				padding: {
					DEFAULT: '2rem',
					md: '3rem',
					lg: '4rem',
					xl: '6rem',
					'2xl': '8rem',
				},
			},
			fontFamily: {
				body: ['Figtree', 'sans-serif'],
			},
			colors: {
				'my-gradient': 'linear-gradient(102deg, rgba(3, 5, 29, 0.85) 2.11%, rgba(255, 0, 0, 0.85) 100%)',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				// primary: {
				// 	DEFAULT: 'hsl(var(--primary))',
				// 	foreground: 'hsl(var(--primary-foreground))',
				// },
				// secondary: {
				// 	DEFAULT: 'hsl(var(--secondary))',
				// 	foreground: 'hsl(var(--secondary-foreground))',
				// },
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				// accent: {
				// 	DEFAULT: 'hsl(var(--accent))',
				// 	foreground: 'hsl(var(--accent-foreground))',
				// },
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes').light,
					primary: '#FC766A',
					'primary-content': '#ffffff',
					secondary: '#494949',
					neutral: '#03131a',
					info: '#00e1ff',
					success: '#90ca27',
					warning: '#ff8800',
					error: '#ff7f7f',
					'--rounded-box': '0.25rem',
					'--rounded-btn': '0.25rem',
				},
				dark: {
					...require('daisyui/src/theming/themes').dark,
					primary: '#FC766A',
					'primary-content': '#ffffff',
					secondary: '#494949',
					neutral: '#03131a',
					'neutral-content': '#e1e6eb',
					info: '#00e1ff',
					success: '#90ca27',
					warning: '#ff8800',
					error: '#ff7f7f',
					'base-100': '#14181c',
					'base-200': '#1e2328',
					'base-300': '#28323c',
					'base-content': '#dcebfa',
					'--rounded-box': '0.25rem',
					'--rounded-btn': '0.25rem',
				},
				caramellatte: {
					'base-100': 'oklch(98% 0.016 73.684)',
					'base-200': 'oklch(95% 0.038 75.164)',
					'base-300': 'oklch(90% 0.076 70.697)',
					'base-content': 'oklch(40% 0.123 38.172)',
					primary: 'oklch(0% 0 0)',
					'primary-content': 'oklch(100% 0 0)',
					secondary: 'oklch(22.45% 0.075 37.85)',
					'secondary-content': 'oklch(90% 0.076 70.697)',
					accent: 'oklch(46.44% 0.111 37.85)',
					'accent-content': 'oklch(90% 0.076 70.697)',
					neutral: 'oklch(55% 0.195 38.402)',
					'neutral-content': 'oklch(98% 0.016 73.684)',
					info: 'oklch(42% 0.199 265.638)',
					'info-content': 'oklch(90% 0.076 70.697)',
					success: 'oklch(43% 0.095 166.913)',
					'success-content': 'oklch(90% 0.076 70.697)',
					warning: 'oklch(82% 0.189 84.429)',
					'warning-content': 'oklch(41% 0.112 45.904)',
					error: 'oklch(70% 0.191 22.216)',
					'error-content': 'oklch(39% 0.141 25.723)',
					'radius-selector': '2rem',
					'radius-field': '0.5rem',
					'radius-box': '1rem',
					'size-selector': '0.25rem',
					'size-field': '0.25rem',
					border: '2px',
					depth: '1',
					noise: '1',
				},
			},
		],
	},
	plugins: [require('daisyui'), require('tailwindcss-animate')],
};
