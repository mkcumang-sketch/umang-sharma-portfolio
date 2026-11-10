"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const pixels = [
  { x: "8%", y: "22%", delay: 0, size: 5 },
  { x: "19%", y: "68%", delay: 1.2, size: 3 },
  { x: "34%", y: "16%", delay: 2.1, size: 4 },
  { x: "71%", y: "26%", delay: 0.7, size: 4 },
  { x: "88%", y: "52%", delay: 1.8, size: 5 },
  { x: "62%", y: "82%", delay: 2.8, size: 3 },
  { x: "43%", y: "91%", delay: 1.5, size: 4 },
  { x: "95%", y: "12%", delay: 2.4, size: 3 },
];

export function MotionAtmosphere() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.25 });

  return (
    <>
      <motion.div className="global-scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <div className="motion-atmosphere" aria-hidden="true">
        <div className="atmosphere-orbit atmosphere-orbit-a" />
        <div className="atmosphere-orbit atmosphere-orbit-b" />
        {pixels.map((pixel, index) => (
          <motion.i
            key={index}
            className="atmosphere-pixel"
            style={{ left: pixel.x, top: pixel.y, width: pixel.size, height: pixel.size }}
            animate={reduceMotion ? undefined : { y: [0, -16, 0], opacity: [0.16, 0.7, 0.16], rotate: [0, 90, 180] }}
            transition={reduceMotion ? undefined : { duration: 7 + index * 0.8, delay: pixel.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </>
  );
}
