"use client";

import { useEffect } from "react";

export function ScrollMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(max-width: 760px)").matches) return;
    const scope = document.querySelector(".game-portfolio");
    if (!scope) return;
    let disposed = false;
    let lenis: { destroy: () => void } | undefined;
    let context: { revert: () => void } | undefined;

    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([gsapModule, triggerModule, lenisModule]) => {
      if (disposed) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const Lenis = lenisModule.default;
      lenis = new Lenis({ autoRaf: true, smoothWheel: true });
      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".game-reveal").forEach((element) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 24 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });
      }, scope);
      ScrollTrigger.refresh();
    }).catch(() => {
      // Native scrolling and visible content remain the fallback if motion chunks fail.
    });

    return () => {
      disposed = true;
      context?.revert();
      lenis?.destroy();
    };
  }, []);

  return null;
}
