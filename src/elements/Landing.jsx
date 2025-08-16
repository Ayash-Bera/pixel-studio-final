"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Landing() {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Cursor position for lens light effect
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Track scroll progress for horizontal portfolio movement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const portfolioItems = [
    {
      id: 0,
      title: "Radiator Springs",
      subtitle: "",
      image: "https://i.postimg.cc/Y9z0WvQ4/515684610-24493830260252728-150192007205577030-n.jpg",
      isHero: true
    },
    {
      id: 1,
      title: "",
      subtitle: "",
      image:
        "https://i.postimg.cc/nVTMVQHg/515945222-24493398630295891-7031307855115242279-n.jpg",
    },
    {
      id: 2,
      title: "",
      subtitle: "",
      image:
        "https://i.postimg.cc/YScCD63G/516538892-24495623216740099-8279684442823796011-n.jpg",
    },
    {
      id: 3,
      title: "",
      subtitle: "",
      image:
        "https://i.postimg.cc/KzxvxmCm/516553107-24497322469903507-8220903516388245163-n.jpg",
    },
    {
      id: 4,
      title: "",
      subtitle: "",
      image:
        "https://i.postimg.cc/k5xX021j/516517673-24494899506812470-2145086150192969692-n.jpg",
    },
    {
      id: 5,
      title: "",
      subtitle: "",
      image:
        "https://i.postimg.cc/9MjxFQdg/489204984-4901677233390922-636068589649480862-n.jpg",
    },
    {
      id: 6,
      title: "",
      subtitle: "",
      image:
        "https://i.postimg.cc/Z5272cCS/82266990-3166954976863165-2842124415477481472-n.jpg",
    },
    {
      id: 7,
      title: "",
      subtitle: "",
      image:
        "https://i.postimg.cc/FzrD3Cnj/508145322-4988886021336709-8173439536105893980-n.jpg",
    },
    {
      id: 8,
      title: "",
      subtitle: "",
      image:
        "https://i.postimg.cc/k5xX021j/516517673-24494899506812470-2145086150192969692-n.jpg",
    },
  ];

  // Horizontal scroll buttons
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      if (direction === "left") {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  // Track active portfolio index based on scroll
  useEffect(() => {
    const handleScrollUpdate = () => {
      if (scrollRef.current) {
        const scrollPercentage =
          (scrollRef.current.scrollLeft /
            (scrollRef.current.scrollWidth - scrollRef.current.clientWidth)) *
          100;
        setActiveIndex(
          Math.floor((scrollPercentage / 100) * portfolioItems.length)
        );
      }
    };
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScrollUpdate);
      return () =>
        scrollElement.removeEventListener("scroll", handleScrollUpdate);
    }
  }, [portfolioItems.length]);

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

      {/* Portfolio Section */}
      <section className="relative pb-32" ref={sectionRef}>
        <div className="px-8 lg:px-20 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-500 text-xs font-mono tracking-wider">
            </span>
          </div>
        </div>

        <div className="relative">
          {/* Horizontal scroll */}
          <motion.div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-8 lg:px-20 scroll-smooth pb-4 will-change-transform"
            style={{
              x: trackX,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 group cursor-pointer relative"
              >
                <div className={`relative overflow-hidden bg-zinc-900 rounded-lg shadow-xl ${
                  item.isHero 
                    ? "w-48 h-64 lg:w-56 lg:h-72" 
                    : "w-40 h-52 lg:w-48 lg:h-60"
                }`}>
                  {/* Professional overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10"></div>
                  
                  <img
                    src={item.image}
                    alt={item.isHero ? "Modera Studio" : `Portfolio ${item.id}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Enhanced overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  
                  {/* Professional corner accents */}
                  <div className={`absolute top-2 left-2 border-l border-t ${
                    item.isHero ? "w-6 h-6 border-modera-yellow" : "w-4 h-4 border-white/30"
                  }`}></div>
                  <div className={`absolute top-2 right-2 border-r border-t ${
                    item.isHero ? "w-6 h-6 border-modera-yellow" : "w-4 h-4 border-white/30"
                  }`}></div>
                  <div className={`absolute bottom-2 left-2 border-l border-b ${
                    item.isHero ? "w-6 h-6 border-modera-yellow" : "w-4 h-4 border-white/30"
                  }`}></div>
                  <div className={`absolute bottom-2 right-2 border-r border-b ${
                    item.isHero ? "w-6 h-6 border-modera-yellow" : "w-4 h-4 border-white/30"
                  }`}></div>
                  
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className={`text-white font-medium leading-tight ${
                        item.isHero ? "text-lg" : "text-sm"
                      }`}>
                        {item.title}
                        {item.subtitle && (
                          <span className={`block text-white/80 mt-1 ${
                            item.isHero ? "text-sm" : "text-xs"
                          }`}>{item.subtitle}</span>
                        )}
                      </p>
                      {item.isHero && (
                        <p className="text-modera-yellow pixel-4xl mt-1">
                          Pixel Studios
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* Hover enhancement */}
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    item.isHero 
                      ? "bg-modera-yellow/0 group-hover:bg-modera-yellow/15" 
                      : "bg-modera-yellow/0 group-hover:bg-modera-yellow/10"
                  }`}></div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scale/Timeline Bar */}
          <div className="px-8 lg:px-20 mt-8">
            <div className="relative">
              <div className="flex items-center gap-8 mb-3">
                <span className="text-white/40 text-[10px] font-mono">45</span>
                <span className="text-white/40 text-[10px] font-mono ml-12">
                  23
                </span>
                <span className="text-white/40 text-[10px] font-mono ml-auto mr-32">
                  47
                </span>
                <span className="text-white/40 text-[10px] font-mono">16</span>
              </div>

              <div className="relative h-8">
                <div className="absolute top-0 left-0 right-0 h-px bg-white/20"></div>
                <div className="absolute top-0 left-0 right-0 flex justify-between">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        i % 10 === 0
                          ? "w-px h-4 bg-white/40"
                          : i % 5 === 0
                          ? "w-px h-2 bg-white/20"
                          : "w-px h-1 bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                <div
                  className="absolute top-0 h-4 w-px bg-red-500 transition-all duration-300"
                  style={{
                    left: `${(activeIndex / portfolioItems.length) * 100}%`,
                  }}
                />
              </div>

              <div className="mt-2 text-right">
                <span className="text-white/30 text-[10px] font-mono">
                  {Math.round((activeIndex / portfolioItems.length) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 lg:left-12">
            <motion.button
              whileHover={{
                y: -3,
                scale: 1.1,
                boxShadow: "0px 0px 12px rgba(255,215,0,0.4)",
              }}
              transition={{ type: "tween", duration: 0.15 }}
              onClick={() => handleScroll("left")}
              className="text-white/40 hover:text-modera-yellow transition-colors text-2xl bg-black/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center"
            >
              ←
            </motion.button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-12">
            <motion.button
              whileHover={{
                y: -3,
                scale: 1.1,
                boxShadow: "0px 0px 12px rgba(255,215,0,0.4)",
              }}
              transition={{ type: "tween", duration: 0.15 }}
              onClick={() => handleScroll("right")}
              className="text-white/40 hover:text-modera-yellow transition-colors text-2xl bg-black/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center"
            >
              →
            </motion.button>
          </div>
        </div>
      </section>
    </motion.main>
  );
}

export default Landing;