import { links } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="footer-mark" href="#hero">U<span>.</span></a>
      <div className="footer-company"><strong>TRUV TECH &amp; CONSULTANCY</strong><span>Your Vision. Our Expertise.</span></div>
      <div className="footer-socials"><a href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={`mailto:${links.email}`}>Email ↗</a></div>
      <div className="footer-legal"><span>BUILT WITH INTENT</span><span>© {new Date().getFullYear()} UMANG SHARMA</span></div>
    </footer>
  );
}