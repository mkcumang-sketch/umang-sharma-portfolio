import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./retro-experience.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Umang Sharma — AI Systems & Design Technologist",
  description: "Umang Sharma builds AI-assisted digital products, voice-agent workflows, operational systems and expressive web experiences. Founder of TRUV Tech & Consultancy.",
  applicationName: "UmangOS — Umang Sharma Portfolio",
  metadataBase: new URL(process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "https://mkcumang-sketch.github.io/umang-sharma-portfolio/"),
  openGraph: { title: "Umang Sharma — AI Systems & Design Technologist", description: "Turning prompts, code and pixels into autonomous digital systems.", type: "website" },
  twitter: { card: "summary_large_image", title: "Umang Sharma — AI Systems & Design Technologist", description: "Turning prompts, code and pixels into autonomous digital systems." },
};

export const viewport: Viewport = { themeColor: "#09090b", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="site-grain" aria-hidden="true"/><SiteHeader/>{children}<SiteFooter/></body></html>;
}
