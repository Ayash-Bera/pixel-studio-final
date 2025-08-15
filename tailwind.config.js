/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "modera-yellow": "#FFD700",
        "modera-dark": "#0A0A0A",
        "modera-gray": "#808080",
        "pixel-green": "#00FF00",
        "pixel-blue": "#0080FF",
        "pixel-red": "#FF0040",
        "pixel-purple": "#8000FF",
        "pixel-cyan": "#00FFFF",
        "pixel-pink": "#FF0080",
      },
      fontFamily: {
        pixel: ["VT323", "monospace"],
        display: ["VT323", "monospace"],
        mono: ["VT323", "monospace"],
        sans: ["VT323", "monospace"],
        serif: ["VT323", "monospace"],
      },
      fontSize: {
        "pixel-xs": ["20px", "20px"],
        "pixel-sm": ["24px", "24px"],
        "pixel-base": ["28px", "28px"],
        "pixel-lg": ["30px", "30px"],
        "pixel-xl": ["32px", "32px"],
        "pixel-2xl": ["40px", "40px"],
        "pixel-3xl": ["48px", "48px"],
        "pixel-4xl": ["64px", "64px"],
        "pixel-5xl": ["80px", "80px"],
        "pixel-6xl": ["96px", "96px"],
      },
      animation: {
        timer: "timer 1s linear infinite",
        blink: "blink 1.5s ease-in-out infinite",
        "pixel-pulse": "pixel-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scan-line 2s linear infinite",
        glitch: "glitch 0.3s infinite",
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        timer: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "pixel-pulse": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
            filter: "brightness(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)",
            filter: "brightness(1.2)",
          },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%": {
            transform: "translate(0)",
            filter: "hue-rotate(0deg)",
          },
          "20%": {
            transform: "translate(-2px, 2px)",
            filter: "hue-rotate(90deg)",
          },
          "40%": {
            transform: "translate(-2px, -2px)",
            filter: "hue-rotate(180deg)",
          },
          "60%": {
            transform: "translate(2px, 2px)",
            filter: "hue-rotate(270deg)",
          },
          "80%": {
            transform: "translate(2px, -2px)",
            filter: "hue-rotate(360deg)",
          },
          "100%": {
            transform: "translate(0)",
            filter: "hue-rotate(0deg)",
          },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      boxShadow: {
        pixel: "0 0 0 2px #000, 0 0 0 4px #fff",
        "pixel-glow": "0 0 0 2px #000, 0 0 0 4px #00ff00, 0 0 20px #00ff00",
        "pixel-inset": "inset 0 0 0 2px #000, inset 0 0 0 4px #fff",
      },
    },
  },
  plugins: [],
};
