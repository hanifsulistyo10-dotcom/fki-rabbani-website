"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="
        fixed
        top-0
        left-0
        right-0
        z-[999]
        h-[4px]
        origin-left
        bg-gradient-to-r
        from-emerald-400
        via-emerald-500
        to-emerald-700
        shadow-lg
        shadow-emerald-500/30
      "
    />
  );
}