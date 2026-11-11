import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./game-world.css";

export const metadata: Metadata = {
  title: "Umang Sharma | Vibe Coder & Technical Product Builder",
  description: "A cinematic 3D portfolio by Umang Sharma — practical digital products, business systems, product engineering and AI-assisted development.",
  applicationName: "Umang Sharma — Portfolio",
  metadataBase: new URL("https://umang-sharma-portfolio.vercel.app"),
  openGraph: {
    title: "Umang Sharma | Vibe Coder & Technical Product Builder",
    description: "Ideas into real systems. Explore products, engineering decisions and client work by Umang Sharma.",
    type: "website",
    url: "https://umang-sharma-portfolio.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umang Sharma | Vibe Coder & Technical Product Builder",
    description: "Ideas into real systems. Explore products, engineering decisions and client work.",
  },
};

export const viewport: Viewport = { themeColor: "#070708", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="site-grain" aria-hidden="true" />{children}</body></html>;
}
