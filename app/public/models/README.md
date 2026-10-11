# Hero 3D Thali Asset

Place the production thali model here:

```
public/models/thali.glb
```

## Specs (from design blueprint)

- Photorealistic Indian thali / plate
- Warm cinematic studio lighting in the bake (or rely on runtime lights)
- Soft contact shadows preferred
- Slight elevation — elegant, never cartoonish
- Camera-friendly 3/4 or elevated three-quarter view
- Compress with Draco or Meshopt
- Provide a static PNG/WebP fallback for reduced-motion and low-end devices

## Enable in code

1. `npm i three @react-three/fiber @react-three/drei`
2. Drop `thali.glb` in this folder
3. Set `USE_3D = true` in `src/components/HeroThali.tsx`

Until then, the premium CSS plate fallback is shown.
