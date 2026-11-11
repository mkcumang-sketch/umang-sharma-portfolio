import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./immersive-portfolio.css";
import "./kinetic-depth.css";

export const metadata: Metadata = {
  title: "Umang Sharma | Platform Engineering, DevOps & Technical Product Builder",
  description: "Umang Sharma — platform engineering, DevOps, cloud deployment, containerization, database operations and secure SaaS delivery.",
  applicationName: "Umang Sharma — Portfolio",
  metadataBase: new URL("https://umang-sharma-portfolio.vercel.app"),
  openGraph: {
    title: "Umang Sharma | Platform Engineering, DevOps & Technical Product Builder",
    description: "Explore evidence-led platform engineering case studies, cloud deployment, Docker, GitHub Actions and multi-tenant systems by Umang Sharma.",
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
