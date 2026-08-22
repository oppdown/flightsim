import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flight Lab · Takeoff & Landing Trainer",
  description: "A public, deterministic flight simulator for practicing takeoff, turns, approach, and landing.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
