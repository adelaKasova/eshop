import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0066cc',
                    hover: '#0052a3',
                },
                secondary: '#f4f4f4',
                price: {
                    DEFAULT: '#d32f2f',
                    original: '#666666',
                },
                stock: {
                    DEFAULT: '#398000',
                },
                text: {
                    DEFAULT: '#333333',
                    light: '#666666',
                },
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'sans-serif'],
            },
        },
    },
    plugins: [],
} satisfies Config;
