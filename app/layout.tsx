import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./immersive-portfolio.css";
import "./kinetic-depth.css";

export const metadata: Metadata = {
  title: "Umang Sharma | Creative Technologist & Technical Product Builder",
  description: "An immersive portfolio by Umang Sharma — product engineering, business systems, automation and visual digital experiences.",
  applicationName: "Umang Sharma — Portfolio",
  metadataBase: new URL("https://umang-sharma-portfolio.vercel.app"),
  openGraph: {
    title: "Umang Sharma | Creative Technologist & Technical Product Builder",
    description: "Ideas shaped into experiences. Explore verified products, systems and client work by Umang Sharma.",
    type: "website",
    url: "https://umang-sharma-portfolio.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umang Sharma | Creative Technologist & Technical Product Builder",
    description: "Product engineering, business systems and visual digital experiences.",
  },
};

export const viewport: Viewport = { themeColor: "#08090b", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="site-grain" aria-hidden="true" />{children}</body></html>;
}
