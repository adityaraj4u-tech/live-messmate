/**
 * MessMate — Hero Thali
 *
 * Premium visual centerpiece for the homepage hero.
 *
 * Production path:
 * 1. Export a photorealistic Indian thali as compressed GLB (Draco/Meshopt).
 * 2. Place at /public/models/thali.glb
 * 3. Set USE_3D = true below and ensure @react-three/fiber + drei are installed.
 *
 * Until then, this component renders a refined CSS/SVG plate that matches
 * the art direction: warm studio light, soft contact shadow, slight elevation.
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Flip to true when /public/models/thali.glb is ready and R3F is installed */
const USE_3D = false;

export function HeroThali({ className }: { className?: string }) {
  if (USE_3D) {
    return (
      <div className={cn("relative w-full max-w-md aspect-square", className)}>
        {/*
          Example integration (install: npm i three @react-three/fiber @react-three/drei):

          import { Canvas } from "@react-three/fiber";
          import { useGLTF, PresentationControls, Environment, ContactShadows } from "@react-three/drei";

          function ThaliModel() {
            const { scene } = useGLTF("/models/thali.glb");
            return <primitive object={scene} scale={1.2} />;
          }

          <Canvas camera={{ position: [0, 1.2, 2.4], fov: 35 }}>
            <ambientLight intensity={0.4} />
            <spotLight position={[3, 5, 2]} intensity={1.2} castShadow />
            <PresentationControls snap global>
              <ThaliModel />
            </PresentationControls>
            <ContactShadows opacity={0.35} scale={8} blur={2.5} />
            <Environment preset="studio" />
          </Canvas>
        */}
        <PremiumPlateFallback />
      </div>
    );
  }

  return (
    <div className={cn("relative w-full max-w-md aspect-square", className)}>
      <PremiumPlateFallback />
    </div>
  );
}

/** Art-directed CSS plate — warm, elevated, non-cartoonish */
function PremiumPlateFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Soft ambient glow */}
      <div
        className="absolute inset-[12%] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, rgba(198,243,107,0.15), transparent 55%), radial-gradient(circle at 60% 65%, rgba(36,78,59,0.08), transparent 50%)",
        }}
      />

      {/* Contact shadow */}
      <div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[70%] h-[12%] rounded-[100%] bg-forest/15 blur-xl"
        aria-hidden
      />

      {/* Plate body */}
      <div
        className="relative w-[78%] h-[78%] rounded-full shadow-elevated"
        style={{
          background:
            "linear-gradient(145deg, #F8F7F2 0%, #EDE9DF 40%, #E4DFD3 100%)",
          boxShadow:
            "0 1px 2px rgba(23,55,40,0.06), 0 12px 40px rgba(23,55,40,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
        }}
      >
        {/* Inner rim */}
        <div
          className="absolute inset-[6%] rounded-full"
          style={{
            border: "1px solid rgba(36,78,59,0.08)",
            background:
              "radial-gradient(circle at 45% 40%, #FFFEFA 0%, #F5F2EA 70%)",
          }}
        >
          {/* Stylized food arrangement — respectful, abstract, premium */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Center rice mound */}
            <div
              className="absolute w-[28%] h-[28%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, #F5F0E0, #E8E0C8)",
                boxShadow: "inset 0 -2px 6px rgba(23,55,40,0.06)",
              }}
            />
            {/* Dal bowl — left */}
            <div
              className="absolute w-[18%] h-[18%] rounded-full -translate-x-[70%] translate-y-[10%]"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, #E8A54B, #C47A2A)",
                boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.1)",
              }}
            />
            {/* Sabzi — right */}
            <div
              className="absolute w-[16%] h-[16%] rounded-full translate-x-[75%] -translate-y-[5%]"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, #7BA05B, #4A7043)",
                boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.1)",
              }}
            />
            {/* Roti arc — top */}
            <div
              className="absolute w-[22%] h-[10%] rounded-full -translate-y-[85%]"
              style={{
                background:
                  "linear-gradient(180deg, #E8C478 0%, #D4A84B 100%)",
                boxShadow: "0 1px 3px rgba(23,55,40,0.1)",
              }}
            />
            {/* Pickle accent — bottom right */}
            <div
              className="absolute w-[10%] h-[10%] rounded-full translate-x-[55%] translate-y-[70%]"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, #C45C3E, #8B3A2B)",
              }}
            />
          </div>
        </div>

        {/* Specular highlight */}
        <div
          className="absolute top-[12%] left-[18%] w-[25%] h-[12%] rounded-full opacity-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.7), transparent)",
          }}
          aria-hidden
        />
      </div>

      {/* Caption for a11y / design clarity */}
      <span className="sr-only">
        Illustrative Indian thali plate — replace with photorealistic 3D asset
        in production
      </span>
    </div>
  );
}
