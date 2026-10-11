# Deploy MessMate to Vercel

## Option A — Vercel CLI (fastest)

```bash
# 1. Unzip / open the project
cd messmate/app   # or wherever you extracted MessMate-Vercel.zip

# 2. Install dependencies
npm install

# 3. Test locally
npm run dev
# open http://localhost:3000

# 4. Deploy
npx vercel login
npx vercel          # preview
npx vercel --prod   # production
```

## Option B — Vercel Dashboard

1. Push this folder to a GitHub repo (root = the `app` folder, or set Root Directory to `app`).
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo
4. Framework Preset: **Next.js**
5. Root Directory: `app` (if the repo contains parent folders)
6. Build Command: `next build` (default)
7. Install Command: `npm install` (default)
8. Deploy

## Option C — Drag & drop

1. Run `npm install && npm run build` locally
2. On Vercel → Add New Project → upload the project folder
3. Vercel detects Next.js automatically

## Requirements

- Node.js 18.18+ or 20+
- No environment variables required for the demo (sample data only)
- No database / auth backend yet

## After deploy

| URL path | What you get |
|----------|----------------|
| `/` | Full homepage |
| `/discover` | Food listings |
| `/food/lst-001` | Detail page |
| `/owner/login` | Mess owner login (demo) |

## Notes

- All data is illustrative sample data (GEC Banka menu).
- Backend, auth, payments, and real-time inventory are deferred.
- To add a real 3D thali: place `thali.glb` in `public/models/` and follow `public/models/README.md`.
