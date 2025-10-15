import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FolderIcon, CalendarIcon, UsersIcon, CameraIcon } from "@heroicons/react/24/outline";

const WorkshopCard = ({ workshop, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -12, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group"
    >
      <Link to={`/workshops/${workshop.id}`}>
        <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-modera-yellow/50 transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-modera-yellow/10">
          {/* Cover Image */}
          <div className="relative h-64 bg-zinc-800 overflow-hidden">
            <img
              src={workshop.coverImage}
              alt={workshop.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded 
                  ? 'opacity-100 scale-100 group-hover:scale-110' 
                  : 'opacity-0 scale-105'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/60 group-hover:via-black/20 transition-all duration-500" />
            
            {/* Photo Count Badge */}
            <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm px-3 py-2 text-pixel-sm text-modera-yellow border border-modera-yellow/50 shadow-lg">
              <div className="flex items-center gap-2">
                <CameraIcon className="w-4 h-4" />
                <span className="font-bold">{workshop.photoCount}</span>
              </div>
            </div>

            {/* Enhanced Camera Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-white/30"></div>
              <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-white/30"></div>
              <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-white/30"></div>
              <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-white/30"></div>
              
              {/* Center crosshair */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute w-6 h-px bg-white/20 -left-3 top-0"></div>
                  <div className="absolute h-6 w-px bg-white/20 left-0 -top-3"></div>
                </div>
              </div>
            </div>


          </div>

          {/* Content */}
          <div className="p-8">
            {/* Workshop Title */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-modera-yellow transition-colors duration-300">
                {workshop.name}
              </h3>
            </div>
            
            <div className="mb-6">
              <p className="text-white/70 text-base line-clamp-2 leading-relaxed">
                {workshop.description}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 text-pixel-sm">
              <div className="flex items-center gap-3 text-white/60 group-hover:text-white/80 transition-colors">
                <CalendarIcon className="w-5 h-5 text-modera-yellow/80" />
                <span className="font-medium">{formatDate(workshop.date)}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 group-hover:text-white/80 transition-colors col-span-2">
                <span className="w-5 h-5 flex items-center justify-center text-modera-yellow/80 text-lg">📍</span>
                <span className="font-medium">{workshop.location}</span>
              </div>
            </div>

            {/* Animated Bottom Border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-modera-yellow to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            
            {/* Side Accent Lines */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-modera-yellow/50 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-modera-yellow/50 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out delay-75" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default WorkshopCard;