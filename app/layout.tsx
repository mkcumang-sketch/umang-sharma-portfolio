import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./immersive-portfolio.css";
import "./kinetic-depth.css";
import "../components/world/immersive-world.css";

export const metadata: Metadata = {
  title: "Umang Sharma | Immersive Portfolio — Systems Builder & AI Solutions Architect",
  description: "Explore Umang Sharma’s interactive portfolio: real products, systems building, AI-assisted engineering, DevOps and platform engineering.",
  applicationName: "Umang Sharma — Portfolio",
  metadataBase: new URL("https://umang-sharma-portfolio.vercel.app"),
  openGraph: {
    title: "Umang Sharma | Immersive Portfolio — Systems Builder & AI Solutions Architect",
    description: "A cinematic, interactive portfolio exploring real products, technical systems, DevOps and platform engineering by Umang Sharma.",
    type: "website",
    url: "https://umang-sharma-portfolio.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umang Sharma | Immersive Portfolio — Systems Builder & AI Solutions Architect",
    description: "Vibe Coder, Systems Builder, AI Solutions Architect and Founder at TRUV Tech & Consultancy."
  },
};

export const viewport: Viewport = { themeColor: "#08090b", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="site-grain" aria-hidden="true" />{children}</body></html>;
}
