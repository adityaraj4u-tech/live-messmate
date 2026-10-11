/**
 * MessMate — Design Tokens (Layer 1)
 * Single source of truth for the locked brand identity.
 */

export const colors = {
  forestGreen: "#244E3B",
  deepGreen: "#173728",
  warmIvory: "#F8F7F2",
  softSage: "#D9E9D7",
  freshLime: "#C6F36B",
  charcoal: "#252A26",
  mutedGray: "#777D75",
  border: "#E8E6DF",
  borderSubtle: "rgba(36, 78, 59, 0.10)",
} as const;

export const semanticColors = {
  background: colors.warmIvory,
  surface: colors.warmIvory,
  surfaceSubtle: colors.softSage,
  primary: colors.forestGreen,
  primaryDeep: colors.deepGreen,
  accent: colors.freshLime,
  text: colors.charcoal,
  textMuted: colors.mutedGray,
  border: colors.border,
} as const;

export const typography = {
  fontFamily: {
    sans: '"Manrope", "Geist", "Inter", system-ui, -apple-system, sans-serif',
  },
  size: {
    display: "3.5rem",
    displaySm: "2.5rem",
    heading: "2rem",
    headingSm: "1.75rem",
    body: "1.125rem",
    bodySm: "1rem",
    label: "0.875rem",
    caption: "0.8125rem",
    price: "1.375rem",
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
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
} as const;

export const radius = {
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
} as const;

export const shadows = {
  card: "0 1px 2px rgba(23, 55, 40, 0.04), 0 4px 12px rgba(23, 55, 40, 0.06)",
  cardHover: "0 2px 4px rgba(23, 55, 40, 0.06), 0 8px 24px rgba(23, 55, 40, 0.10)",
  nav: "0 4px 20px rgba(23, 55, 40, 0.08)",
  elevated: "0 8px 32px rgba(23, 55, 40, 0.12)",
} as const;

export const motion = {
  ease: {
    out: "cubic-bezier(0.16, 1, 0.3, 1)",
    inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  },
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
    hero: 600,
  },
} as const;

export const layout = {
  containerMax: "1200px",
  navHeight: "64px",
  touchTarget: "44px",
} as const;

/** Fixed meal windows for GEC Banka */
export const mealWindows = {
  breakfast: { label: "Breakfast", start: "09:00", end: "10:00" },
  lunch: { label: "Lunch", start: "13:00", end: "14:00" },
  dinner: { label: "Dinner", start: "21:00", end: "22:00" },
} as const;

export type MealType = keyof typeof mealWindows;

export const brand = {
  name: "MessMate",
  tagline: "Good Food Deserves a Second Chance.",
  campus: "GEC Banka",
  mission: "A little less waste. A little more community.",
} as const;
