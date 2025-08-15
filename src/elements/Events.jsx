import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function EventsWorkshops() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [filter, setFilter] = useState('all');
  const modalRef = useRef(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveEvent(null);
      }
    };

    if (activeEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEvent]);

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setActiveEvent(null);
      }
    };

    if (activeEvent) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [activeEvent]);

  const upcomingEvents = [
    {
      id: 'interior-masterclass',
      type: 'MASTERCLASS',
      category: 'masterclass',
      title: 'INTERIOR PHOTOGRAPHY',
      subtitle: 'Light & Shadow Mastery',
      date: 'MAR 15, 2025',
      time: '10:00 - 18:00',
      price: '€750',
      spots: '8/12',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
      shortDesc: 'Master the art of capturing architectural spaces with natural and artificial lighting',
      instructor: 'Oliver Hart',
      level: 'Intermediate to Advanced',
      location: 'Modera Studio, Amsterdam',
      highlights: [
        'Advanced lighting techniques for interiors',
        'Working with mixed light sources',
        'Tethered shooting workflow',
        'Post-processing for architectural photography',
        'Client presentation techniques'
      ],
      includes: [
        'Lunch & refreshments',
        'Course materials',
        'Certificate of completion',
        'Access to studio equipment',
        '1-on-1 portfolio review'
      ]
    },
    {
      id: 'product-workshop',
      type: 'WORKSHOP',
      category: 'workshop',
      title: 'PRODUCT PHOTOGRAPHY',
      subtitle: 'Commercial Excellence',
      date: 'MAR 22, 2025',
      time: '09:00 - 17:00',
      price: '€650',
      spots: '10/15',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
      shortDesc: 'Learn professional product photography for e-commerce and advertising',
      instructor: 'Sarah Chen',
      level: 'All Levels',
      location: 'Pixel Studio, Amsterdam',
      highlights: [
        'Studio lighting setups',
        'Product styling techniques',
        'Macro photography details',
        'Reflective surface photography',
        'Composite imaging'
      ],
      includes: [
        'Professional equipment use',
        'Props and backgrounds',
        'Editing workshop',
        'Networking lunch',
        'Resource guide PDF'
      ]
    },
    {
      id: 'lighting-intensive',
      type: 'WORKSHOP',
      category: 'workshop',
      title: 'LIGHTING INTENSIVE',
      subtitle: 'Studio & Location',
      date: 'APR 5-6, 2025',
      time: '10:00 - 17:00',
      price: '€1,250',
      spots: '6/8',
      image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=600&h=400&fit=crop',
      shortDesc: 'Two-day intensive workshop on advanced lighting for commercial photography',
      instructor: 'Marcus Weber',
      level: 'Advanced',
      location: 'Modera Studio, Amsterdam',
      highlights: [
        'Complex multi-light setups',
        'Color theory in lighting',
        'Lighting for mood and atmosphere',
        'Location lighting challenges',
        'High-speed sync techniques'
      ],
      includes: [
        '2 days of training',
        'All meals included',
        'Equipment rental',
        'Digital workbook',
        'Follow-up online session'
      ]
    },
    {
      id: 'furniture-showcase',
      type: 'EXHIBITION',
      category: 'event',
      title: 'FURNITURE SHOWCASE',
      subtitle: 'Design Photography Exhibition',
      date: 'APR 12-26, 2025',
      time: 'Opening: 18:00',
      price: 'FREE',
      spots: 'Open',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
      shortDesc: 'Exhibition featuring contemporary furniture photography by studio artists',
      instructor: 'Various Artists',
      level: 'Public Event',
      location: 'Modera Gallery Space',
      highlights: [
        'Works by 12 photographers',
        'Live artist talks',
        'Opening night reception',
        'Guided tours available',
        'Print sales & auctions'
      ],
      includes: [
        'Free admission',
        'Exhibition catalog',
        'Artist meet & greet',
        'Wine reception (opening)',
        'Photography allowed'
      ]
    },
    {
      id: 'video-production',
      type: 'MASTERCLASS',
      category: 'masterclass',
      title: 'VIDEO PRODUCTION',
      subtitle: 'Cinematic Storytelling',
      date: 'APR 19, 2025',
      time: '09:00 - 18:00',
      price: '€850',
      spots: '5/10',
      image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=600&h=400&fit=crop',
      shortDesc: 'From concept to final cut - create compelling video content for brands',
      instructor: 'James Morrison',
      level: 'Intermediate',
      location: 'Modera Studio, Amsterdam',
      highlights: [
        'Storyboarding and pre-production',
        'Camera movement techniques',
        'Audio recording basics',
        'Color grading workflow',
        'Editing in Premiere/Resolve'
      ],
      includes: [
        'Camera equipment',
        'Editing stations',
        'Lunch & snacks',
        'Project files',
        '30-day support'
      ]
    },
    {
      id: 'creative-retreat',
      type: 'RETREAT',
      category: 'event',
      title: 'CREATIVE RETREAT',
      subtitle: 'Photography & Mindfulness',
      date: 'MAY 2-4, 2025',
      time: '3 Days',
      price: '€1,850',
      spots: '12/20',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop',
      shortDesc: 'Three-day creative retreat combining photography with artistic exploration',
      instructor: 'Multiple Instructors',
      level: 'All Levels',
      location: 'Dutch Countryside',
      highlights: [
        'Daily photography sessions',
        'Creative workshops',
        'Portfolio reviews',
        'Mindfulness practices',
        'Group exhibitions'
      ],
      includes: [
        'Accommodation (2 nights)',
        'All meals',
        'Transportation',
        'Workshop materials',
        'Printed portfolio book'
      ]
    }
  ];

  // Filter events
  const filteredEvents = filter === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.category === filter);

  const getStatusColor = (spots) => {
    if (spots === 'Open') return 'text-green-400';
    const [current, total] = spots.split('/').map(Number);
    const percentage = (current / total) * 100;
    if (percentage >= 80) return 'text-red-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <section className="min-h-screen px-8 lg:px-20 py-20 bg-black">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-white/60 text-xs tracking-wider mb-4">▶ UPCOMING</p>
        <h1 className="text-modera-yellow text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] mb-8">
          EVENTS &<br />
          WORKSHOPS
        </h1>
        <p className="text-white/60 text-sm max-w-2xl mb-8">
          Join our exclusive masterclasses and workshops designed for photographers and creatives 
          who want to elevate their craft. Learn from industry professionals in our state-of-the-art studio.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'all', label: 'ALL EVENTS' },
            { value: 'masterclass', label: 'MASTERCLASSES' },
            { value: 'workshop', label: 'WORKSHOPS' },
            { value: 'event', label: 'EXHIBITIONS' }
          ].map((filterOption) => (
            <button
              key={filterOption.value}
              onClick={() => setFilter(filterOption.value)}
              className={`px-4 py-2 text-xs font-medium transition-all ${
                filter === filterOption.value
                  ? 'bg-modera-yellow text-black'
                  : 'bg-zinc-900 text-white/60 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setActiveEvent(event)}
            className="group cursor-pointer"
          >
            <div className="bg-zinc-900 overflow-hidden hover:bg-zinc-800 transition-all duration-300">
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Event Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-modera-yellow text-black text-xs font-bold px-2 py-1">
                    {event.type}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/60 text-white text-sm font-bold px-3 py-1 backdrop-blur-sm">
                    {event.price}
                  </span>
                </div>

                {/* Date at bottom */}
                <div className="absolute bottom-4 left-4">
                  <p className="text-white/60 text-xs">{event.date}</p>
                  <p className="text-white text-xs">{event.time}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-white text-lg font-bold mb-1">
                  {event.title}
                </h3>
                <p className="text-modera-yellow text-sm mb-3">{event.subtitle}</p>
                
                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                  {event.shortDesc}
                </p>

                {/* Event Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-white/40 text-xs mb-1">INSTRUCTOR</p>
                    <p className="text-white text-sm">{event.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-xs mb-1">AVAILABILITY</p>
                    <p className={`text-sm font-medium ${getStatusColor(event.spots)}`}>
                      {event.spots === 'Open' ? 'OPEN' : `${event.spots} SPOTS`}
                    </p>
                  </div>
                </div>

                {/* Register CTA */}
                <button className="w-full mt-4 py-2 bg-white/10 text-white text-xs font-medium hover:bg-modera-yellow hover:text-black transition-all duration-300">
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Newsletter Signup
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 bg-zinc-900 p-8 lg:p-12"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-modera-yellow text-2xl font-bold mb-4">
            STAY UPDATED
          </h3>
          <p className="text-white/60 text-sm mb-6">
            Be the first to know about new workshops, exhibitions, and exclusive events
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-black text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-modera-yellow"
            />
            <button className="px-6 py-3 bg-modera-yellow text-black text-sm font-bold hover:bg-white transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </motion.div> */}

      {/* Expanded Event Modal */}
      <AnimatePresence>
        {activeEvent && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40"
            />
            
            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-zinc-900 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveEvent(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/60 hover:bg-black transition-colors"
                >
                  <span className="text-white text-xl">×</span>
                </button>

                {/* Modal Header Image */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={activeEvent.image} 
                    alt={activeEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="bg-modera-yellow text-black text-xs font-bold px-2 py-1">
                      {activeEvent.type}
                    </span>
                    <h2 className="text-white text-3xl font-bold mt-3">
                      {activeEvent.title}
                    </h2>
                    <p className="text-modera-yellow text-lg mt-1">{activeEvent.subtitle}</p>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Event Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-black p-4">
                      <p className="text-white/40 text-xs mb-1">DATE</p>
                      <p className="text-white text-sm font-medium">{activeEvent.date}</p>
                    </div>
                    <div className="bg-black p-4">
                      <p className="text-white/40 text-xs mb-1">TIME</p>
                      <p className="text-white text-sm font-medium">{activeEvent.time}</p>
                    </div>
                    <div className="bg-black p-4">
                      <p className="text-white/40 text-xs mb-1">PRICE</p>
                      <p className="text-modera-yellow text-lg font-bold">{activeEvent.price}</p>
                    </div>
                    <div className="bg-black p-4">
                      <p className="text-white/40 text-xs mb-1">SPOTS</p>
                      <p className={`text-sm font-medium ${getStatusColor(activeEvent.spots)}`}>
                        {activeEvent.spots}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <p className="text-white/80 text-sm leading-relaxed mb-4">
                      {activeEvent.shortDesc}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-white/40">Instructor:</span>
                        <span className="text-white ml-2">{activeEvent.instructor}</span>
                      </div>
                      <div>
                        <span className="text-white/40">Level:</span>
                        <span className="text-white ml-2">{activeEvent.level}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-white/40">Location:</span>
                        <span className="text-white ml-2">{activeEvent.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* What You'll Learn */}
                  <div className="mb-8">
                    <h3 className="text-modera-yellow text-sm font-bold mb-4">WHAT YOU'LL LEARN</h3>
                    <div className="space-y-2">
                      {activeEvent.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-modera-yellow mt-1">▶</span>
                          <span className="text-white/80 text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-8">
                    <h3 className="text-modera-yellow text-sm font-bold mb-4">WHAT'S INCLUDED</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {activeEvent.includes.map((item, i) => (
                        <div key={i} className="bg-black p-3">
                          <span className="text-white/60 text-xs">✓ {item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full py-4 bg-modera-yellow text-black font-bold hover:bg-white transition-colors">
                    REGISTER NOW - {activeEvent.price}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default EventsWorkshops;