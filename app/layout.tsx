import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Umang Sharma — Technical Product Builder",
  description: "Umang Sharma builds practical digital products, AI-assisted workflows, automation systems and business tools. Founder of TRUV Tech & Consultancy.",
  applicationName: "Umang Sharma Portfolio",
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://mkcumang-sketch.github.io/umang-sharma-portfolio/"),
  openGraph: {
    title: "Umang Sharma — Technical Product Builder",
    description: "Building useful digital products with AI-assisted execution and modern architecture.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umang Sharma — Technical Product Builder",
    description: "Building useful digital products with AI-assisted execution and modern architecture.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-grain" aria-hidden="true" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}