# MessMate

**Good Food Deserves a Second Chance.**

A premium campus surplus-food platform. Students and locals reserve leftover mess meals — no account required. Built first for **GEC Banka**, designed to expand to more colleges.

---

## Features

**Customers (no login)**
- Browse surplus listings with meal filters
- View dish details, price, portions, and pickup windows
- Reserve with name + phone only
- Look up an existing reservation

**Mess owners**
- Simple login screen (UI only)
- Dashboard with live-style stats
- Create listings in under a minute (3-step form)
- Manage listings and mark reservations collected

**Homepage**
- Cinematic hero, trust strip, how it works
- Live food preview, mission, owner pitch, food safety, final CTA

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 19 + Tailwind CSS |
| Font | Manrope (`next/font`) |
| Utilities | clsx, tailwind-merge |

No backend, database, or auth yet — sample data only.

---

## Quick start

```bash
# Install
npm install

# Develop
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Production build
npm run build
npm start
```

---

## Project structure

```
src/
├── app/                 # App Router pages
│   ├── page.tsx         # Homepage
│   ├── discover/        # Food grid
│   ├── food/[id]/       # Detail
│   ├── reserve/[id]/    # Reservation form
│   ├── confirmation/    # Success
│   ├── lookup/          # Find reservation
│   └── owner/           # Mess owner area
├── components/
│   ├── ui/              # Primitives (Button, Card, Badge…)
│   ├── shell/           # Nav, Footer, AppShell
│   └── *.tsx            # FoodCard, forms, stats…
├── screens/             # Full page compositions
├── sections/            # Homepage sections
├── lib/                 # Tokens, sample data, utils
├── types/               # Shared TypeScript types
└── styles/              # Global CSS + design tokens
```

---

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `/discover` | Browse & filter food |
| `/food/[id]` | Dish detail |
| `/reserve/[id]` | Reserve a portion |
| `/confirmation` | Reservation confirmed |
| `/lookup` | Find a reservation |
| `/owner/login` | Owner sign-in |
| `/owner` | Owner dashboard |
| `/owner/create` | Create listing |
| `/owner/listings` | Manage listings |
| `/owner/reservations` | Pickup list |

---

## Deploy to Vercel

**CLI**
```bash
npx vercel login
npx vercel --prod
```

**Dashboard**
1. Push this folder to GitHub  
2. Import at [vercel.com/new](https://vercel.com/new)  
3. Framework: **Next.js** → Deploy  

No environment variables required for the demo.

---

## Design system

| Token | Value | Use |
|-------|-------|-----|
| Forest Green | `#244E3B` | Brand, headlines |
| Deep Green | `#173728` | Footer, dark CTAs |
| Warm Ivory | `#F8F7F2` | Backgrounds, cards |
| Soft Sage | `#D9E9D7` | Subtle surfaces |
| Fresh Lime | `#C6F36B` | Primary CTAs only |
| Charcoal | `#252A26` | Body text |

Typography: **Manrope**. Spacing base: 4px. Cards use soft layered shadows — never harsh drop shadows.

---

## Sample data

All listings use authentic **GEC Banka** mess menu items (e.g. Chole Bhature, Veg/Chicken Biryani) and are labeled illustrative. Meal windows:

| Meal | Pickup |
|------|--------|
| Breakfast | 9:00 – 10:00 AM |
| Lunch | 1:00 – 2:00 PM |
| Dinner | 9:00 – 10:00 PM |

---

## Scope

This is a **frontend-only** demo.

Deferred for later:
- Authentication & multi-college backend  
- Real-time inventory  
- Payments  
- SMS / WhatsApp notifications  
- Platform admin  

The UI is structured so those can be added without a visual redesign.

---

## License

Private — for GEC Banka / MessMate project use.
