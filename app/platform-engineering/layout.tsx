import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Engineering & DevOps | Umang Sharma",
  description: "Evidence-led platform engineering and DevOps portfolio by Umang Sharma: Docker, CI/CD, GitHub Actions, cloud deployment, application security and eight technical case studies.",
  openGraph: {
    title: "Platform Engineering & DevOps | Umang Sharma",
    description: "Explore repository-backed platform engineering case studies, delivery workflows and technical experience.",
    type: "website",
    url: "https://umang-sharma-portfolio.vercel.app/platform-engineering",
  },
};

export default function PlatformEngineeringLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
