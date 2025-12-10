/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'vinyl': {
                    'dark': '#0a0a0f',
                    'darker': '#050508',
                    'light': '#1a1a24',
                    'accent': '#2a2a3a',
                },
                'neon': {
                    'orange': '#ff6b35',
                    'pink': '#ff006e',
                    'blue': '#8338ec',
                    'cyan': '#3a86ff',
                    'yellow': '#ffbe0b',
                },
                'album': {
                    'beige': '#e8dcc4',
                    'paper': '#f5f1e8',
                }
            },
            fontFamily: {
                'display': ['Bebas Neue', 'Arial Black', 'sans-serif'],
                'mono': ['Space Mono', 'Courier New', 'monospace'],
                'body': ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)' },
                    '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(255, 107, 53, 0.8)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}
