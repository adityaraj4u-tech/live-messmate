import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#244E3B",
          deep: "#173728",
        },
        ivory: "#F8F7F2",
        sage: "#D9E9D7",
        lime: "#C6F36B",
        charcoal: "#252A26",
        muted: "#777D75",
        border: {
          DEFAULT: "#E8E6DF",
          subtle: "rgba(36, 78, 59, 0.10)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-manrope)",
          "Manrope",
          "Geist",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["2.5rem", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "700" }],
        heading: ["2rem", { lineHeight: "1.25", fontWeight: "600" }],
        "heading-sm": ["1.75rem", { lineHeight: "1.25", fontWeight: "600" }],
        body: ["1.125rem", { lineHeight: "1.6" }],
        "body-sm": ["1rem", { lineHeight: "1.6" }],
        label: ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        caption: ["0.8125rem", { lineHeight: "1.4" }],
        price: ["1.375rem", { lineHeight: "1.3", fontWeight: "600" }],
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(23, 55, 40, 0.04), 0 4px 12px rgba(23, 55, 40, 0.06)",
        "card-hover": "0 2px 4px rgba(23, 55, 40, 0.06), 0 8px 24px rgba(23, 55, 40, 0.10)",
        nav: "0 4px 20px rgba(23, 55, 40, 0.08)",
        elevated: "0 8px 32px rgba(23, 55, 40, 0.12)",
      },
      maxWidth: {
        container: "1200px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
        hero: "600ms",
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
    },
  },
  plugins: [],
};

export default config;
