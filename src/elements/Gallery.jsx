import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import images from "../data/images"; // Your provided JSON array

// Enable smooth scroll globally (can also be in global.css)
document.documentElement.style.scrollBehavior = "smooth";

const Gallery = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="px-8 lg:px-20 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-white/60 text-xs tracking-wider mb-4">▶ VISUAL PORTFOLIO</p>
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] text-modera-yellow mb-8">
            GALLERY
          </h1>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            A curated collection of our finest work showcasing the artistry of interior, 
            furniture, and lighting photography
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((img, idx) => (
            <LazyImageCard key={idx} img={img} index={idx} />
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <p className="text-modera-yellow text-2xl font-bold">{images.length}+</p>
              <p className="text-white/40 text-xs uppercase">Projects</p>
            </div>
            <div>
              <p className="text-modera-yellow text-2xl font-bold">12</p>
              <p className="text-white/40 text-xs uppercase">Years</p>
            </div>
            <div>
              <p className="text-modera-yellow text-2xl font-bold">305+</p>
              <p className="text-white/40 text-xs uppercase">Clients</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// Lazy loading + fade-in + desktop-only parallax scroll effect
const LazyImageCard = ({ img, index }) => {
  const [loaded, setLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { scrollY } = useScroll();

  // Check screen size on mount + resize
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Only apply parallax for desktop
    const y = useTransform(scrollY, [0, 500], [0, index % 2 === 0 ? -10 : 10]);
    useEffect(() => {
      const checkSize = () => {
        setIsDesktop(window.innerWidth >= 1024);
      }
      checkSize();
      window.addEventListener("resize", checkSize);
      return () => window.removeEventListener("resize", checkSize);
    })

  return (
    <motion.div
      style={isDesktop ? { y } : {}}
      className="relative group overflow-hidden rounded-lg"
    >
      {/* Image */}
      <img
        src={img.src}
        alt={img.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-72 object-cover transition-all duration-500 ease-in-out 
          ${loaded ? "opacity-100" : "opacity-0"} 
          group-hover:blur-sm group-hover:brightness-50`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <h3 className="text-white text-lg font-bold">{img.title}</h3>
        <p className="text-white/80 text-sm mt-1">{img.photographer}</p>
        <p className="text-white/60 text-xs mt-2">High Resolution Available</p>
      </div>
    </motion.div>
  );
};

export default Gallery;
