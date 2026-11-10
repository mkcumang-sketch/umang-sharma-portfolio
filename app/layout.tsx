import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./retro-experience.css";
import "./game-world.css";
import "./game-world-refresh.css";

export const metadata: Metadata = {
  title: "Umang Sharma | AI, Design & Operations",
  description: "Explore Umang Sharma's 3D portfolio: practical digital products, CRM and business systems, CA and hospital automation, AI workflows and design. Founder of TRUV TECH & CONSULTANCY.",
  applicationName: "Umang Sharma — Portfolio",
  metadataBase: new URL("https://umang-sharma-portfolio.vercel.app"),
  openGraph: {
    title: "Umang Sharma | AI, Design & Operations",
    description: "Digital products, useful automation and thoughtful experiences by Umang Sharma, founder of TRUV TECH & CONSULTANCY.",
    type: "website",
    url: "https://umang-sharma-portfolio.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umang Sharma | AI, Design & Operations",
    description: "Digital products, useful automation and thoughtful experiences.",
  },
};

export const viewport: Viewport = { themeColor: "#10130f", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="site-grain" aria-hidden="true"/>{children}</body></html>;
}
