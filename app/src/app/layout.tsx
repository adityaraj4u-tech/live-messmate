import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../styles/globals.css";
import { brand } from "@/lib/tokens";
import { AppShell } from "@/components/shell/AppShell";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Surplus campus food, reserved in seconds. Starting at GEC Banka.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AppShell>
          <div id="main-content">{children}</div>
        </AppShell>
      </body>
    </html>
  );
}
