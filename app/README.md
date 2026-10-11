# MessMate — Next.js App

**Good Food Deserves a Second Chance.**

Full five-layer frontend mapped into Next.js App Router.

## Run

```bash
cd messmate/app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

| Layer | Location |
|-------|----------|
| 1 Foundation | `src/lib/tokens.ts`, `src/styles/globals.css`, `tailwind.config.ts` |
| 2 Primitives | `src/components/ui/` |
| 3 Components | `src/components/` (FoodCard, ReservationForm, …) |
| 4 Screens | `src/screens/` + App Router routes |
| 5 App Shell | `src/components/shell/`, `src/sections/` |

## Routes

| Path | Description |
|------|-------------|
| `/` | Full homepage (Hero → Final CTA) |
| `/discover` | Food grid + filters |
| `/food/[id]` | Detail |
| `/reserve/[id]` | Reservation form |
| `/confirmation` | Success |
| `/lookup` | Find reservation |
| `/owner/login` | Owner sign-in |
| `/owner` | Dashboard |
| `/owner/create` | Create listing |
| `/owner/listings` | Manage listings |
| `/owner/reservations` | Pickup view |

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS (locked MessMate tokens)
- Manrope via `next/font`
