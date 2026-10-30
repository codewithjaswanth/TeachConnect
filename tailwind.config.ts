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
        background: "var(--background)",
        foreground: "var(--foreground)",
        paper: {
          50: "#FDFCF7",
          100: "#FAF9F5", // Core canvas
          200: "#F3EFE6", // Card surface
          300: "#EAE4D5", // Subtle border
          400: "#DDD4C1", // Active border
          500: "#B8A98F",
          DEFAULT: "#FAF9F5",
        },
        forest: {
          50: "#F4F6F1",
          100: "#E4E9DC",
          200: "#C7D4B8",
          300: "#9EB588",
          400: "#6F8C55",
          500: "#4C6537",
          600: "#3B4D2B",
          700: "#2D3A22", // Primary CTA & Accent
          800: "#222C1A",
          900: "#171E11",
          DEFAULT: "#2D3A22",
        },
        brass: {
          50: "#FAF7EE",
          100: "#F4ECCF",
          200: "#E9DAA2",
          300: "#D8C26E",
          400: "#B8934A",
          500: "#9C7A3C", // Scholastic Gold / Stars
          600: "#81632E",
          700: "#644C23",
          DEFAULT: "#9C7A3C",
        },
        ink: {
          900: "#1C1E18", // Primary text
          800: "#2D3126",
          700: "#3E4334",
          600: "#4D5244", // Secondary text (WCAG AA >= 5.5:1)
          500: "#686E5D", // Subtext (WCAG AA >= 4.5:1)
          400: "#8F9585",
          300: "#B8BCB0",
          DEFAULT: "#1C1E18",
        },
        terracotta: {
          50: "#FDF6F3",
          100: "#F8E9E3",
          500: "#C25E3E",
          600: "#A84A2C",
          700: "#8A381E",
          DEFAULT: "#C25E3E",
        },
        sage: {
          50: "#F3F7F2",
          100: "#E3ECE2",
          500: "#6E8C6D",
          600: "#557054",
          DEFAULT: "#557054",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Lora", "Georgia", "Cambria", "serif"],
        sans: [
          "var(--font-sans)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        "editorial-xs": "0 1px 2px rgba(28, 30, 24, 0.04)",
        "editorial-sm": "0 1px 3px rgba(28, 30, 24, 0.06), 0 1px 2px rgba(28, 30, 24, 0.04)",
        "editorial": "0 4px 16px -2px rgba(28, 30, 24, 0.08), 0 2px 6px -1px rgba(28, 30, 24, 0.04)",
        "editorial-lg": "0 12px 32px -4px rgba(28, 30, 24, 0.12), 0 4px 12px -2px rgba(28, 30, 24, 0.05)",
        "editorial-xl": "0 24px 48px -8px rgba(28, 30, 24, 0.16), 0 8px 16px -4px rgba(28, 30, 24, 0.06)",
        "glow-brass": "0 0 24px -4px rgba(156, 122, 60, 0.25)",
        "glow-forest": "0 0 24px -4px rgba(45, 58, 34, 0.2)",
      },
      borderRadius: {
        "editorial": "1.25rem",
        "editorial-lg": "1.75rem",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
        "bounce-tactile": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "float-subtle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(0.98)" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "orb-float-1": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(30px, -20px) scale(1.08)" },
        },
        "orb-float-2": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(-30px, 25px) scale(0.95)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.04)" },
        },
      },
      animation: {
        "float-subtle": "float-subtle 4s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.35s ease-out forwards",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "orb-float-1": "orb-float-1 8s ease-in-out infinite",
        "orb-float-2": "orb-float-2 10s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
