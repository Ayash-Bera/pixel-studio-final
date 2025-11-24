"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { InfinitePortfolio } from "../elements/infinite";
import { GradientButton } from "../elements/GradientButton";
import { BeamsBackground } from "../elements/BeamsBackground";
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
    <BeamsBackground intensity="subtle">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen text-white overflow-hidden"
      >
        {/* Lens light effect */}
        <motion.div
          className="pointer-events-none fixed w-32 h-32 rounded-full bg-white/10 blur-2xl z-20"
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
          className="flex flex-col"
        >
          <h1 className="mb-8">
            <span className="block text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] text-modera-yellow tracking-tighter">
              Pixel
            </span>
            <span className="block text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] text-modera-yellow tracking-tighter">
              Photography
            </span>
            <span className="block text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] text-modera-yellow tracking-tighter">
              Studio & 
            </span>
            <span className="block text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] text-modera-yellow tracking-tighter">
              Academy
            </span>
          </h1>

          <div className="flex gap-4">
            <GradientButton asChild>
              <a href="https://wa.me/919123809082" target="_blank" rel="noopener noreferrer">Book a Call</a>
            </GradientButton>
            <GradientButton variant="variant" asChild>
              <Link to="/gallery">Peek into our gallery</Link>
            </GradientButton>
          </div>
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
    </BeamsBackground>
  );
}

export default Landing;