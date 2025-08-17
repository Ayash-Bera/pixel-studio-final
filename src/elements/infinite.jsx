import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export const InfinitePortfolio = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate items for infinite scroll effect
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "25s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "60s");
      }
    }
  };

  return (
    <div className="relative">
      {/* Infinite Scroll Container */}
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 overflow-hidden",
          "[mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
          className
        )}
        style={{
          "--animation-duration": "40s",
          "--animation-direction": "forwards"
        }}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-3 py-4 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item) => (
            <li
              key={item.id}
              className="relative shrink-0 group cursor-pointer"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative overflow-hidden bg-zinc-900"
                style={{
                  width: "200px",
                  height: "260px"
                }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Minimal gradient overlay - only on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Minimal content overlay - only title on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white text-sm font-medium">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs mt-1">
                    {item.category}
                  </p>
                </div>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>

      {/* CSS for infinite scroll animation */}
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }

        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite var(--animation-direction);
        }
      `}</style>
    </div>
  );
};