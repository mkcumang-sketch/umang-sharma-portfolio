import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./retro-experience.css";
import "./game-world.css";

export const metadata: Metadata = {
  title: "Umang Sharma — AI Systems & Design Technologist",
  description: "Umang Sharma builds AI-powered products, business systems, automation workflows and immersive digital experiences. Founder of TRUV TECH & CONSULTANCY.",
  applicationName: "UmangOS — Umang Sharma Portfolio",
  metadataBase: new URL("https://umang-sharma-portfolio.vercel.app"),
  openGraph: { title: "Umang Sharma — AI Systems & Design Technologist", description: "Turning prompts, code and pixels into autonomous digital systems.", type: "website", url: "https://umang-sharma-portfolio.vercel.app" },
  twitter: { card: "summary_large_image", title: "Umang Sharma — AI Systems & Design Technologist", description: "Turning prompts, code and pixels into autonomous digital systems." },
};

export const viewport: Viewport = { themeColor: "#09090b", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="site-grain" aria-hidden="true"/>{children}</body></html>;
}
