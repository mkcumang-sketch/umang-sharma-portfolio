"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { PointerEvent } from "react";

export function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 20, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 20, mass: 0.5 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);

  const movePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-gridline" aria-hidden="true" />
      <div className="hero-copy">
        <motion.div className="availability" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="availability-dot" />
          AVAILABLE FOR AMBITIOUS BUILDS &amp; PRODUCT SPRINTS
        </motion.div>
        <motion.p className="hero-index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>INDEPENDENT BUILDER <span>—</span> TRUV TECH &amp; CONSULTANCY</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
          Ideas deserve to become <em>real systems</em><span className="hero-period">.</span>
        </motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }}>
          I’m Umang Sharma. I turn product ideas and operational problems into useful digital experiences, AI workflows and business systems—with clarity from first sketch to implementation.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.34 }}>
          <a className="button-primary" href="#work">Explore selected work <span>↘</span></a>
          <a className="text-link" href="#contact">Start a conversation <span>↗</span></a>
        </motion.div>
        <div className="hero-meta"><span>AI-ASSISTED EXECUTION</span><i /><span>PRODUCT THINKING</span><i /><span>BUSINESS SYSTEMS</span></div>
      </div>

      <div className="hero-visual-wrap" ref={visualRef} onPointerMove={movePointer} onPointerLeave={resetPointer} aria-label="Interactive abstract product system illustration">
        <div className="visual-caption top-caption"><span>OBJECT / 01</span><span>FORM / FUNCTION</span></div>
        <motion.div className="hero-orbit-object" style={reduceMotion ? undefined : { rotateX, rotateY }}>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <div className="orbit-core"><div className="core-inner">U<span>.</span></div></div>
          <span className="orbit-node node-a" /><span className="orbit-node node-b" /><span className="orbit-node node-c" />
        </motion.div>
        <div className="visual-caption bottom-caption"><span>IDEA → SYSTEM → PRODUCT</span><span>A SYSTEM IN MOTION</span></div>
        <div className="visual-coordinate">INDIA / REMOTE</div>
      </div>
      <div className="hero-bottomline"><span>SCROLL TO EXPLORE</span><span className="bottom-line" /><span>01 / 05</span></div>
    </section>
  );
}