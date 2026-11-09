const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryName = "umang-sharma-portfolio";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages needs a static export; Vercel uses the native Next.js build.
  ...(isGitHubPages ? { output: "export" } : {}),
  trailingSlash: true,
  basePath: isGitHubPages ? `/${repositoryName}` : "",
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
