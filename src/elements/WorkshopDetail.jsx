import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon, CalendarIcon, UsersIcon, MapPinIcon } from "@heroicons/react/24/outline";
import workshopsData from "../data/workshops.json";
import SEOHead from "../components/SEOHead";
import { generatePageMeta } from "../utils/seo";
import { generateCourseSchema, generateBreadcrumbSchema, generateImageSchema } from "../utils/schema";
import { pageConfigs } from "../config/seoConfig";

const WorkshopDetail = () => {
  const { workshopId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [workshop, setWorkshop] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Handle URL-based image selection
  const selectImageWithUrl = (img, index) => {
    setSelectedImage(img);
    setSearchParams({ photo: index.toString() });
  };

  const closeImageWithUrl = () => {
    setSelectedImage(null);
    setSearchParams({});
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  // Find current workshop and navigation
  const currentIndex = workshopsData.findIndex(w => w.id === workshopId);
  const prevWorkshop = currentIndex > 0 ? workshopsData[currentIndex - 1] : null;
  const nextWorkshop = currentIndex < workshopsData.length - 1 ? workshopsData[currentIndex + 1] : null;

  useEffect(() => {
    const loadWorkshopData = async () => {
      try {
        setLoading(true);
        const workshopData = workshopsData.find(w => w.id === workshopId);
        
        if (!workshopData) {
          setError("Workshop not found");
          return;
        }

        setWorkshop(workshopData);

        // Dynamically import photos
        try {
          const photosModule = await import(`../data/workshop-photos/${workshopId}.json`);
          setPhotos(photosModule.default || []);
        } catch (photoError) {
          console.warn(`No photos found for workshop ${workshopId}`);
          setPhotos([]);
        }
      } catch (err) {
        setError("Failed to load workshop data");
      } finally {
        setLoading(false);
      }
    };

    loadWorkshopData();
  }, [workshopId]);

  // Check URL for photo param when photos are loaded
  useEffect(() => {
    if (photos.length === 0) return;
    const photoParam = searchParams.get("photo");
    if (photoParam !== null) {
      const photoIndex = parseInt(photoParam, 10);
      if (!isNaN(photoIndex) && photoIndex >= 0 && photoIndex < photos.length) {
        setSelectedImage(photos[photoIndex]);
      }
    }
  }, [photos]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') {
        closeImageWithUrl();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = photos.findIndex(p => p.src === selectedImage.src);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
        selectImageWithUrl(photos[prevIndex], prevIndex);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = photos.findIndex(p => p.src === selectedImage.src);
        const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
        selectImageWithUrl(photos[nextIndex], nextIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, photos]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get unique categories for filtering - simplified since we only have src
  const categories = ["all"];

  // Filter photos based on selected category - simplified
  const filteredPhotos = photos;

  // SEO Configuration
  const workshopMeta = workshop ? {
    title: `${workshop.name} - Pixel Studios Photography Workshop`,
    description: workshop.description,
    keywords: `${workshop.name}, photography workshop, ${workshop.location}, photography education`,
    url: `/workshops/${workshopId}`,
    image: photos[0]?.img || "https://pixelstudios.com/og-image.jpg",
  } : pageConfigs.workshops;

  const pageMeta = generatePageMeta(workshopMeta);

  const schemas = workshop ? [
    generateCourseSchema({
      title: workshop.name,
      description: workshop.description,
      level: "All Levels",
      topics: [workshop.name],
      price: "3999",
      currency: "INR",
      isOnline: false,
      schedule: {
        startDate: workshop.date,
        endDate: workshop.date,
      },
      instructor: "Professional Photography Team",
    }),
    ...photos.slice(0, 5).map((photo) =>
      generateImageSchema({
        url: photo.img,
        title: photo.title || workshop.name,
        description: `${workshop.name} workshop photo`,
        photographer: photo.photographer || "Pixel Studios",
        uploadDate: new Date().toISOString(),
      })
    ),
    generateBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Workshops", path: "/workshops" },
      { name: workshop.name, path: `/workshops/${workshopId}` },
    ]),
  ] : [];

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-modera-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading workshop...</p>
        </div>
      </div>
    );
  }

  if (error || !workshop) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Workshop Not Found</h1>
          <p className="text-white/60 mb-6">{error || "The requested workshop could not be found."}</p>
          <Link 
            to="/workshops"
            className="inline-flex items-center gap-2 px-6 py-3 bg-modera-yellow text-black font-medium hover:bg-modera-yellow/90 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Workshops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead meta={pageMeta} schema={schemas} />
      <div className="bg-black text-white min-h-screen">
      <section className="px-8 lg:px-20 pt-32 pb-20">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            to="/workshops"
            className="inline-flex items-center gap-2 text-white/60 hover:text-modera-yellow transition-colors text-pixel-sm"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Workshops
          </Link>
        </motion.div>

        {/* Workshop Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Workshop Info */}
            <div className="lg:col-span-2">
              <p className="text-white/60 text-pixel-sm tracking-wider mb-4">▶ WORKSHOP ARCHIVE</p>
              <h1 className="text-[clamp(2rem,6vw,4rem)] font-black leading-[0.9] text-modera-yellow mb-6">
                {workshop.name}
              </h1>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                {workshop.description}
              </p>

              {/* Workshop Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <CalendarIcon className="w-6 h-6 text-modera-yellow" />
                  <div>
                    <p className="text-white/50 text-pixel-sm">Date</p>
                    <p className="text-white font-bold text-lg">{formatDate(workshop.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 sm:col-span-2">
                  <MapPinIcon className="w-6 h-6 text-modera-yellow" />
                  <div>
                    <p className="text-white/50 text-pixel-sm">Location</p>
                    <p className="text-white font-bold text-lg">{workshop.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative">
              <div className="aspect-[4/5] bg-zinc-900 border border-zinc-800 overflow-hidden">
                <img
                  src={workshop.coverImage}
                  alt={workshop.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Photo Count Badge */}
                <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-2 border border-modera-yellow/30">
                  <span className="text-modera-yellow font-medium">{photos.length} Photos</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Workshop Navigation */}
        {(prevWorkshop || nextWorkshop) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-between items-center mb-12 py-6 border-t border-b border-zinc-800"
          >
            {prevWorkshop ? (
              <Link
                to={`/workshops/${prevWorkshop.id}`}
                className="flex items-center gap-3 text-white/60 hover:text-modera-yellow transition-colors group"
              >
                <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-pixel-xs">Previous</p>
                  <p className="font-medium">{prevWorkshop.name}</p>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {nextWorkshop && (
              <Link
                to={`/workshops/${nextWorkshop.id}`}
                className="flex items-center gap-3 text-white/60 hover:text-modera-yellow transition-colors group text-right"
              >
                <div>
                  <p className="text-pixel-xs">Next</p>
                  <p className="font-medium">{nextWorkshop.name}</p>
                </div>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </motion.div>
        )}

        {/* Photo Gallery */}
        {photos.length > 0 ? (
          <>
            {/* Photo Grid */}
            <MasonryGrid
              photos={filteredPhotos}
              loadedImages={loadedImages}
              setLoadedImages={setLoadedImages}
              setSelectedImage={selectImageWithUrl}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center py-20"
          >
            <div className="text-white/40 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl text-white/60 mb-2">No photos available</h3>
            <p className="text-white/40">
              Photos from this workshop haven't been uploaded yet.
            </p>
          </motion.div>
        )}
      </section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/99 flex items-center justify-center"
            onClick={closeImageWithUrl}
          >
            {/* Deep Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900/50 to-black opacity-95" />
            <div className="absolute inset-0 backdrop-blur-md" />
            
            {/* Subtle Vignette Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
            
            {/* Main Image Container */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[95vw] h-[95vh] flex items-center justify-center z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Image Display */}
              <div className="relative max-w-full max-h-full">
                {/* Image Glow Effect */}
                <div className="absolute inset-0 bg-modera-yellow/5 blur-xl scale-110 opacity-30" />
                
                <img
                  src={selectedImage.src}
                  alt="Workshop Photo"
                  className="relative max-w-full max-h-full object-contain drop-shadow-2xl brightness-105 contrast-105 saturate-110"
                  style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                />
                
                {/* Subtle Image Border Effect */}
                <div className="absolute inset-0 border border-modera-yellow/10 pointer-events-none shadow-2xl" />
                
                {/* Corner Decorations with Glow */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-modera-yellow drop-shadow-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-modera-yellow drop-shadow-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-modera-yellow drop-shadow-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-modera-yellow drop-shadow-lg" />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = photos.findIndex(p => p.src === selectedImage.src);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
                  selectImageWithUrl(photos[prevIndex], prevIndex);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/90 hover:bg-black/95 text-white p-4 rounded-full border border-modera-yellow/40 hover:border-modera-yellow/80 transition-all duration-300 backdrop-blur-lg shadow-2xl hover:shadow-modera-yellow/20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = photos.findIndex(p => p.src === selectedImage.src);
                  const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
                  selectImageWithUrl(photos[nextIndex], nextIndex);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/90 hover:bg-black/95 text-white p-4 rounded-full border border-modera-yellow/40 hover:border-modera-yellow/80 transition-all duration-300 backdrop-blur-lg shadow-2xl hover:shadow-modera-yellow/20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Share Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                className="absolute top-4 right-20 bg-black/90 hover:bg-black/95 text-white/80 hover:text-white p-3 rounded-full border border-modera-yellow/40 hover:border-modera-yellow/80 transition-all duration-300 backdrop-blur-lg shadow-2xl hover:shadow-modera-yellow/20"
                title="Copy link"
              >
                {copied ? (
                  <span className="text-pixel-xs text-modera-yellow">OK</span>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                  </svg>
                )}
              </button>

              {/* Enhanced Close Button */}
              <button
                onClick={closeImageWithUrl}
                className="absolute top-4 right-4 bg-black/90 hover:bg-black/95 text-white/80 hover:text-white p-3 rounded-full border border-modera-yellow/40 hover:border-modera-yellow/80 transition-all duration-300 backdrop-blur-lg group shadow-2xl hover:shadow-modera-yellow/20"
              >
                <XMarkIcon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/90 text-white px-6 py-3 rounded-full border border-modera-yellow/40 backdrop-blur-lg shadow-2xl">
                <span className="text-modera-yellow font-bold text-lg">
                  {photos.findIndex(p => p.src === selectedImage.src) + 1}
                </span>
                <span className="text-white/60 mx-3 text-lg">/</span>
                <span className="text-white/80 text-lg">{photos.length}</span>
              </div>

              {/* Zoom Controls */}
              <div className="absolute top-4 left-4 flex flex-col gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add zoom in functionality if needed
                  }}
                  className="bg-black/90 hover:bg-black/95 text-white p-3 rounded-full border border-modera-yellow/40 hover:border-modera-yellow/80 transition-all duration-300 backdrop-blur-lg shadow-2xl hover:shadow-modera-yellow/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add zoom out functionality if needed
                  }}
                  className="bg-black/90 hover:bg-black/95 text-white p-3 rounded-full border border-modera-yellow/40 hover:border-modera-yellow/80 transition-all duration-300 backdrop-blur-lg shadow-2xl hover:shadow-modera-yellow/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                  </button>
              </div>
            </motion.div>

            {/* Keyboard Navigation Hint */}
            <div className="absolute bottom-4 right-4 bg-black/90 text-white/60 text-sm px-4 py-2 rounded-full border border-modera-yellow/20 backdrop-blur-lg shadow-lg">
              <p>Use ← → keys or click arrows to navigate • ESC to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
};

// Masonry Grid Component for Workshop Photos
const MasonryGrid = ({ photos, loadedImages, setLoadedImages, setSelectedImage }) => {
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

  // Distribute photos across columns
  const distributePhotos = () => {
    const cols = Array.from({ length: columns }, () => []);
    const colHeights = new Array(columns).fill(0);

    photos.forEach((photo, idx) => {
      // Find shortest column
      const shortestCol = colHeights.indexOf(Math.min(...colHeights));
      cols[shortestCol].push({ ...photo, index: idx });
      
      // Estimate height based on loaded image data
      const imageData = loadedImages[photo.src];
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

  const photoColumns = distributePhotos();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {photoColumns.map((column, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-6">
          {column.map((photo, photoIdx) => (
            <PhotoCard
              key={photo.src}
              photo={photo}
              index={photo.index}
              delay={colIdx * 0.1 + photoIdx * 0.05}
              onLoad={(dimensions) => {
                setLoadedImages(prev => ({
                  ...prev,
                  [photo.src]: dimensions
                }));
              }}
              onClick={() => setSelectedImage(photo, photo.index)}
              isPortrait={loadedImages[photo.src]?.width < loadedImages[photo.src]?.height}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
};

// Individual Photo Card
const PhotoCard = ({ photo, index, delay, onLoad, onClick, isPortrait }) => {
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
      transition={{ duration: 0.6, delay }}
      className={`relative group overflow-hidden cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-modera-yellow/30 transition-all duration-300 ${
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
          src={photo.src}
          alt="Workshop Photo"
          loading="lazy"
          onLoad={handleImageLoad}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-all duration-700 
            ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            group-hover:scale-110 group-hover:brightness-75`}
        />
      )}

      {/* Camera corners */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-modera-yellow"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-modera-yellow"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-modera-yellow"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-modera-yellow"></div>
      </div>

      {/* Pixel Grid Overlay on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,215,0,0.1) 2px, rgba(255,215,0,0.1) 4px)',
           }} />
    </motion.div>
  );
};

export default WorkshopDetail;