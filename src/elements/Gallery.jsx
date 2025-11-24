import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import images from "../data/gallery.json";
import SEOHead from "../components/SEOHead";
import { generatePageMeta } from "../utils/seo";
import { generateImageSchema, generateBreadcrumbSchema } from "../utils/schema";
import { pageConfigs } from "../config/seoConfig";
import { EtherealShadow } from "./EtherealShadow";

const Gallery = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");

  // Get unique photographers for filter
  const photographers = ["all", ...new Set(images.map(img => img.photographer))];

  // Filter images based on selected photographer
  const filteredImages = filter === "all"
    ? images
    : images.filter(img => img.photographer === filter);

  // SEO Configuration
  const pageMeta = generatePageMeta(pageConfigs.gallery);

  // Generate image schemas for featured images (first 10)
  const imageSchemas = images.slice(0, 10).map((img) =>
    generateImageSchema({
      url: img.img,
      title: img.title || "Professional Photography",
      description: `${img.title || "Professional photograph"} by ${img.photographer} - Pixel Studios`,
      photographer: img.photographer,
      uploadDate: new Date().toISOString(),
    })
  );

  const schemas = [
    ...imageSchemas,
    generateBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ]),
  ];

  return (
    <>
      <SEOHead meta={pageMeta} schema={schemas} />
      <EtherealShadow>
      <div className="text-white min-h-screen">
      <section className="px-8 lg:px-20 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-white/60 text-pixel-sm tracking-wider mb-4">▶ COLLECTION</p>
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] text-modera-yellow mb-8">
            GALLERY
          </h1>
          <p className="text-white/60 text-pixel-sm max-w-2xl mb-8">
            A curated collection of our finest work showcasing our artistry through light and shadow
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {photographers.map((photographer) => (
              <button
                key={photographer}
                onClick={() => setFilter(photographer)}
                className={`px-4 py-2 text-pixel-xs font-medium transition-all ${
                  filter === photographer
                    ? 'bg-modera-yellow text-black'
                    : 'bg-zinc-900 text-white/60 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {photographer.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <MasonryGrid 
          images={filteredImages}
          loadedImages={loadedImages}
          setLoadedImages={setLoadedImages}
          setSelectedImage={setSelectedImage}
        />

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <Lightbox 
              image={selectedImage} 
              onClose={() => setSelectedImage(null)}
              images={filteredImages}
              setSelectedImage={setSelectedImage}
            />
          )}
        </AnimatePresence>
      </section>
    </div>
    </EtherealShadow>
    </>
  );
};

// Masonry Grid Component
const MasonryGrid = ({ images, loadedImages, setLoadedImages, setSelectedImage }) => {
  const [columns, setColumns] = useState(3);

  // Responsive columns
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Distribute images across columns
  const distributeImages = () => {
    const cols = Array.from({ length: columns }, () => []);
    const colHeights = new Array(columns).fill(0);

    images.forEach((img, idx) => {
      // Find shortest column
      const shortestCol = colHeights.indexOf(Math.min(...colHeights));
      cols[shortestCol].push({ ...img, index: idx });
      
      // Estimate height based on orientation
      const imageData = loadedImages[img.src];
      if (imageData) {
        const aspectRatio = imageData.width / imageData.height;
        const estimatedHeight = aspectRatio < 1 ? 400 : 250; // Portrait vs landscape
        colHeights[shortestCol] += estimatedHeight;
      } else {
        colHeights[shortestCol] += 300; // Default estimate
      }
    });

    return cols;
  };

  const imageColumns = distributeImages();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {imageColumns.map((column, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4">
          {column.map((img, imgIdx) => (
            <ImageCard
              key={img.src}
              img={img}
              index={img.index}
              delay={colIdx * 0.1 + imgIdx * 0.05}
              onLoad={(dimensions) => {
                setLoadedImages(prev => ({
                  ...prev,
                  [img.src]: dimensions
                }));
              }}
              onClick={() => setSelectedImage(img)}
              isPortrait={loadedImages[img.src]?.width < loadedImages[img.src]?.height}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Individual Image Card
const ImageCard = ({ img, index, delay, onLoad, onClick, isPortrait }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  const handleImageLoad = () => {
    setLoaded(true);
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      onLoad({ width: naturalWidth, height: naturalHeight });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative group overflow-hidden cursor-pointer bg-zinc-900 ${
        isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'
      }`}
      onClick={onClick}
    >
      {/* Loading Skeleton */}
      {!loaded && !imageError && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900" />
        </div>
      )}

      {/* Error State */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
          <span className="text-white/30 text-pixel-xs">FAILED TO LOAD</span>
        </div>
      )}

      {/* Image */}
      {!imageError && (
        <img
          ref={imgRef}
          src={img.src}
          alt={img.title}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-all duration-700 
            ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            group-hover:scale-110 group-hover:brightness-75`}
        />
      )}

      {/* Pixel Border Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/0 group-hover:border-modera-yellow transition-all duration-300" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/0 group-hover:border-modera-yellow transition-all duration-300" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/0 group-hover:border-modera-yellow transition-all duration-300" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/0 group-hover:border-modera-yellow transition-all duration-300" />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-black/0 
                      opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <motion.h3 
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white text-pixel-base font-bold mb-1"
          >
            {img.title}
          </motion.h3>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-modera-yellow text-pixel-xs"
          >
            {img.photographer}
          </motion.p>
        </div>
      </div>

      {/* Pixel Grid Overlay on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,215,0,0.1) 2px, rgba(255,215,0,0.1) 4px)',
           }} />
    </motion.div>
  );
};

// Lightbox Component
const Lightbox = ({ image, onClose, images, setSelectedImage }) => {
  const currentIndex = images.findIndex(img => img.src === image.src);

  const goToPrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setSelectedImage(images[prevIndex]);
  };

  const goToNext = () => {
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(images[nextIndex]);
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="relative max-w-7xl max-h-[90vh] pointer-events-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center 
                       bg-black/60 hover:bg-black transition-colors"
          >
            <span className="text-white text-2xl">×</span>
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 
                       bg-black/60 hover:bg-modera-yellow hover:text-black 
                       text-white transition-all flex items-center justify-center"
          >
            ←
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 
                       bg-black/60 hover:bg-modera-yellow hover:text-black 
                       text-white transition-all flex items-center justify-center"
          >
            →
          </button>

          {/* Image */}
          <img
            src={image.src}
            alt={image.title}
            className="max-w-full max-h-[85vh] object-contain"
          />

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-white text-pixel-xl font-bold mb-2">{image.title}</h2>
            <p className="text-modera-yellow text-pixel-base">{image.photographer}</p>
            <p className="text-white/60 text-pixel-xs mt-2">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Gallery;