import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current) {
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
          {[...items, ...items].map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              className="relative shrink-0 group cursor-pointer"
              onClick={() => setSelectedImage(item)}
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
            items={items}
            setSelectedImage={setSelectedImage}
          />
        )}
      </AnimatePresence>

      {/* CSS for infinite scroll animation */}
      <style>{`
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

// Lightbox Component
const Lightbox = ({ image, onClose, items, setSelectedImage }) => {
  const currentIndex = items.findIndex(img => img.id === image.id);

  const goToPrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    setSelectedImage(items[prevIndex]);
  };

  const goToNext = () => {
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(items[nextIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Lightbox Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 pointer-events-none"
      >
        <div className="relative w-full h-full max-w-[98vw] max-h-[98vh] pointer-events-auto flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 w-10 h-10 flex items-center justify-center
                       bg-black/60 hover:bg-black transition-colors"
          >
            <span className="text-white text-2xl">×</span>
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10
                       bg-black/60 hover:bg-modera-yellow hover:text-black
                       text-white transition-all flex items-center justify-center"
          >
            ←
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10
                       bg-black/60 hover:bg-modera-yellow hover:text-black
                       text-white transition-all flex items-center justify-center"
          >
            →
          </button>

          {/* Image */}
          <img
            src={image.image}
            alt={image.title}
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-white text-pixel-xl font-bold mb-2">{image.title}</h2>
            <p className="text-modera-yellow text-pixel-base">{image.photographer}</p>
            <p className="text-white/60 text-pixel-xs mt-2">
              {currentIndex + 1} / {items.length}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};