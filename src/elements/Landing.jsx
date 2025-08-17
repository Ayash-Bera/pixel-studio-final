"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { InfinitePortfolio } from "../elements/infinite";
import portfolioData from "../data/landing.json";

function Landing() {
  const sectionRef = useRef(null);

  // Cursor position for lens light effect
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Track mouse position for lens effect
  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen text-white overflow-hidden"
    >
      {/* Lens light effect */}
      <motion.div
        className="pointer-events-none fixed w-32 h-32 rounded-full bg-white/10 blur-2xl z-10"
        animate={{ x: cursorPos.x - 64, y: cursorPos.y - 64 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-8 lg:px-20 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-20"
        >
          {/* Left Side - Main Content */}
          <div className="flex-1">
            <h1 className="mb-8 lg:mb-14">
              <span className="block text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] text-modera-yellow tracking-tighter">
                Pixel
              </span>
              <span className="block text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] text-modera-yellow tracking-tighter">
                Studios & Academy 
              </span>
            </h1>

            <div className="max-w-sm">
              <p className="text-white/90 text-pixel-base lg:text-pixel-xl leading-relaxed font-light">
                High-end
                <br />
                photography studio
                <br />
                specializing in
                <br />
                interior and outdoor 
                <br />
                shoots
              </p>
            </div>
          </div>

          {/* Right Side - Characteristics */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-80 pt-8 lg:pt-20"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-white/50 text-pixel-xl tracking-wider mb-4">
                  What We Offer 
                </h3>
                <ul className="space-y-3">
                  {[
                    "Framing perfection",
                    "Vision in focus",
                    "Silent storytelling",
                    "Crafted by light",
                    "Shadows and highlights",
                    "Depth of perception",
                  ].map((char, i) => (
                    <motion.li
                      key={i}
                      whileHover={{
                        y: -3,
                        scale: 1.02,
                        textShadow: [
                          "0px 0px 8px rgba(255,215,0,0.6)",
                          "0px 0px 16px rgba(255,215,0,0.4)",
                          "0px 0px 24px rgba(255,215,0,0.2)"
                        ].join(", "),
                      }}
                      transition={{ 
                        type: "tween", 
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                      className="text-white/80 text-xl cursor-pointer relative z-20 hover:text-white transition-all duration-200"
                    >
                      {char}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Portfolio Section with Infinite Scroll */}
      <section className="relative pb-20" ref={sectionRef}>
        {/* Minimal section label */}
        <div className="px-8 lg:px-20 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span className="text-white/40 text-xs tracking-wider uppercase">Our Work</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>
        </div>

        {/* Single row infinite scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <InfinitePortfolio 
            items={portfolioData.portfolioImages}
            direction="left"
            speed="slow"
            pauseOnHover={true}
          />
        </motion.div>

        {/* Minimal progress line */}
        <div className="px-8 lg:px-20 mt-12">
          <div className="relative h-px bg-white/5">
            <motion.div 
              className="absolute top-0 left-0 h-px bg-white/20"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>
      </section>
    </motion.main>
  );
}

export default Landing;