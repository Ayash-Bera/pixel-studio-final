import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WorkshopCard from "./WorkshopCard";
import workshopsData from "../data/workshops.json";
import SEOHead from "../components/SEOHead";
import { generatePageMeta } from "../utils/seo";
import { generateCourseSchema, generateBreadcrumbSchema } from "../utils/schema";
import { pageConfigs } from "../config/seoConfig";
import { EtherealShadow } from "./EtherealShadow";

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [sortBy, setSortBy] = useState("date-desc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setWorkshops(workshopsData);
    setFilteredWorkshops(workshopsData);
  }, []);

  useEffect(() => {
    let filtered = [...workshops];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(workshop =>
        workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workshop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workshop.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "date-desc":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "date-asc":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "participants":
        filtered.sort((a, b) => b.participants - a.participants);
        break;
      default:
        break;
    }

    setFilteredWorkshops(filtered);
  }, [workshops, sortBy, searchTerm]);

  // SEO Configuration
  const pageMeta = generatePageMeta(pageConfigs.workshops);

  // Generate course schemas for featured workshops
  const courseSchemas = workshops.slice(0, 5).map((workshop) =>
    generateCourseSchema({
      title: workshop.name,
      description: workshop.description,
      level: "All Levels",
      topics: [workshop.name],
      price: workshop.maxParticipants ? "3999" : undefined,
      currency: "INR",
      isOnline: false,
      schedule: {
        startDate: workshop.date,
        endDate: workshop.date,
      },
      instructor: "Professional Photography Team",
    })
  );

  const schemas = [
    ...courseSchemas,
    generateBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Workshops", path: "/workshops" },
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
          <p className="text-white/60 text-pixel-sm tracking-wider mb-4">▶ EDUCATION</p>
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] text-modera-yellow mb-8">
            PREVIOUS WORKSHOPS
          </h1>
          <p className="text-white/60 text-pixel-sm max-w-2xl mb-8">
            Explore our comprehensive collection of photography workshops. Each folder contains 
            participant work, techniques learned, and creative explorations from our sessions.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-modera-yellow mb-2">
                {workshops.length}
              </div>
              <div className="text-pixel-sm text-white/60">Workshops Displayed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-modera-yellow mb-2">
                {workshops.reduce((sum, w) => sum + w.photoCount, 0)}
              </div>
              <div className="text-pixel-sm text-white/60">Photos Presented</div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search workshops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 px-6 py-4 text-white placeholder-white/40 focus:border-modera-yellow focus:outline-none transition-colors text-lg"
              />
            </div>

            
          </div>

          {/* Results Info */}
          <div className="mt-6">
            <p className="text-white/50 text-pixel-sm">
              Showing {filteredWorkshops.length} of {workshops.length} workshops
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        </motion.div>

        {/* Workshop Grid */}
        {filteredWorkshops.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16"
          >
            {filteredWorkshops.map((workshop, index) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center py-20"
          >
            <div className="text-white/40 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl text-white/60 mb-2">No workshops found</h3>
            <p className="text-white/40">
              Try adjusting your search terms or filters
            </p>
          </motion.div>
        )}

        {/* Camera Effect Overlay */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            <div className="absolute w-12 h-px bg-white/5 -left-6 top-0"></div>
            <div className="absolute h-12 w-px bg-white/5 left-0 -top-6"></div>
          </div>
        </div>
      </section>
    </div>
    </EtherealShadow>
    </>
  );
};

export default Workshops;