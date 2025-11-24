import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from "../components/SEOHead";
import { generatePageMeta } from "../utils/seo";
import { generateEventSchema, generateBreadcrumbSchema } from "../utils/schema";
import { pageConfigs } from "../config/seoConfig";

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
    id: 'art-of-portrait-oct-25',
    type: 'PHOTOGRAPHY WORKSHOP',
    category: 'workshop',
    title: 'ART OF PORTRAIT',
    subtitle: 'Conceptual & Portrait Photography Workshop',
    date: 'OCT 25, 2025 (SATURDAY)',
    time: 'Single Day Workshop',
    price: '₹3,999',
    spots: 'Limited Seats',
    image: 'https://i.postimg.cc/YSxLdqWr/AFGHANI-GIRL.jpg',
    shortDesc: 'Master the art of portrait photography with conceptual elements using professional models and makeup artistry',
    instructor: 'Arindam Bera',
    level: 'All Levels',
    location: 'Pixel Photography Studio',
    contact: 'Call or WhatsApp: 9123809082',
    highlights: [
      'Two professional models',
      'Professional makeup artist ABHINANDA',
      'Five exclusive portrait looks',
      'Conceptual photography techniques',
      'Portrait lighting mastery',
      'Creative composition guidance'
    ],
    includes: [
      'Professional model sessions',
      'Makeup artistry by ABHINANDA',
      'Studio lighting setup',
      'Expert guidance and mentoring',
      'Conceptual photography techniques',
      'Portfolio development tips'
    ]
    },
    {
    id: 'lightingmagic-nov-16',
    type: 'PHOTOGRAPHY WORKSHOP',
    category: 'workshop',
    title: 'LIGHTINGMAGIC',
    subtitle: 'Figure Study & Still-Life Photography Workshop',
    date: 'NOV 16, 2025 (SUNDAY)',
    time: 'Single Day Workshop',
    price: '₹3,999',
    spots: 'Limited Seats',
    image: 'https://i.postimg.cc/2SYcXrRg/1000581877.jpg',
    shortDesc: 'Master advanced lighting techniques for figure study and still-life photography with eight unique sequences',
    instructor: 'Arindam Bera',
    level: 'All Levels',
    location: 'Pixel Photography Studio',
    contact: 'Call or WhatsApp: 9123809082',
    highlights: [
      'Eight sequence photography sessions',
      'Advanced lighting techniques',
      'Figure study photography',
      'Still-life composition mastery',
      'Creative lighting setups',
      'Professional studio experience'
    ],
    includes: [
      'Eight photography sequences',
      'Professional studio lighting',
      'Expert guidance and mentoring',
      'Lunch and tea included',
      'Advanced lighting techniques',
      'Creative composition training'
    ]
    },
    {
    id: 'lightingmagic-nov-29',
    type: 'PHOTOGRAPHY WORKSHOP',
    category: 'workshop',
    title: 'LIGHTINGMAGIC',
    subtitle: 'Figure Study & Conceptual Fineart Photography Workshop',
    date: 'NOV 29, 2025 (SATURDAY)',
    time: 'Single Day Workshop',
    price: '₹3,999',
    spots: 'Limited Seats',
    image: 'https://i.postimg.cc/Njn1z2MC/dd.jpg',
    shortDesc: 'Advanced workshop focusing on figure study and conceptual fine art photography with two professional models',
    instructor: 'Arindam Bera',
    level: 'All Levels',
    location: 'Pixel Photography Studio',
    contact: 'Call or WhatsApp: 9123809082',
    highlights: [
      'Two professional models',
      'Six exclusive photography looks',
      'Conceptual fine art techniques',
      'Advanced figure study methods',
      'Creative lighting mastery',
      'Professional studio environment'
    ],
    includes: [
      'Two professional model sessions',
      'Six exclusive photography setups',
      'Expert guidance and mentoring',
      'Lunch and tea included',
      'Advanced lighting techniques',
      'Fine art photography methods'
    ]
    },
    {
    id: 'art-of-portrait-dec-6',
    type: 'PHOTOGRAPHY WORKSHOP',
    category: 'workshop',
    title: 'ART OF PORTRAIT',
    subtitle: 'Conceptual & Portrait Photography Workshop',
    date: 'DEC 6, 2025',
    time: 'Single Day Workshop',
    price: '₹3,999',
    spots: 'Limited Seats',
    image: 'https://i.postimg.cc/26r3cCQr/port.jpg',
    shortDesc: 'Master conceptual portrait photography with two professional models and expert makeup artistry',
    instructor: 'Arindam Bera',
    level: 'All Levels',
    location: 'Pixel Photography Studio',
    contact: 'Call or WhatsApp: 9123809082',
    highlights: [
      'Two professional models',
      'Professional makeup artist ABHINANDA',
      'Five exclusive portrait looks',
      'Conceptual photography techniques',
      'Creative portrait lighting',
      'Advanced composition methods'
    ],
    includes: [
      'Professional model sessions',
      'Makeup artistry by ABHINANDA',
      'Studio lighting setup',
      'Expert guidance and mentoring',
      'Conceptual photography techniques',
      'Portfolio development guidance'
    ]
    },
    {
    id: 'lightingmagic-dec-20',
    type: 'PHOTOGRAPHY WORKSHOP',
    category: 'workshop',
    title: 'LIGHTINGMAGIC',
    subtitle: 'Figure Study & Fineart Photography Workshop',
    date: 'DEC 20, 2025 (SATURDAY)',
    time: 'Single Day Workshop',
    price: '₹3,999',
    spots: 'Limited Seats',
    image: 'https://i.postimg.cc/5NC1CZzX/6452ddda-a57b-4fab-afe6-2d6df962400e.jpg',
    shortDesc: 'Advanced figure study and fine art photography workshop with two professional models and makeup artist',
    instructor: 'Arindam Bera',
    level: 'All Levels',
    location: 'Pixel Photography Studio',
    contact: 'Call or WhatsApp: 9123809082',
    highlights: [
      'Two professional models',
      'Professional makeup artist',
      'Five exclusive photography looks',
      'Advanced figure study techniques',
      'Fine art photography methods',
      'Creative lighting mastery'
    ],
    includes: [
      'Two professional model sessions',
      'Professional makeup artistry',
      'Expert guidance and mentoring',
      'Lunch and tea included',
      'Advanced lighting techniques',
      'Fine art photography training'
    ]
    },
    {
    id: 'desert-calling-rajasthan',
    type: 'PHOTOGRAPHY WORKSHOP',
    category: 'workshop',
    title: 'DESERT CALLING',
    subtitle: 'Rajasthan Photography Workshop',
    date: 'OCT 31 - NOV 5, 2025',
    time: '6 Days / 5 Nights',
    price: '₹36,000',
    spots: '2 Spots Left',
    image: 'https://i.postimg.cc/bJFwtg8s/istockphoto-1224021113-612x612.jpg', 
    shortDesc: 'Six fun-filled days in Rajasthan with camel fair, desert photography, and desert camp stay',
    instructor: 'Arindam Bera, Lopamudra Bera',
    level: 'All Levels',
    location: 'Pushkar - Jodhpur - Jaisalmer',
    highlights: [
      'Camel fair photography experience',
      'Desert landscape and camp photography',
      'Street photography in historic cities',
      'Travel and landscape photography techniques',
      'World in Focus photography workshop',
      'Professional desert camping experience'
    ],
    includes: [
      '5 nights accommodation (twin sharing)',
      'Transportation (Kolkata to Kolkata)',
      'Desert camp stay experience',
      'All photography workshop sessions',
      'Professional guidance and mentoring',
      'Access to camel fair events'
    ]
    },
    {
    id: 'purulia-calling-tusu-festival',
    type: 'PHOTOGRAPHY TOUR',
    category: 'tour',
    title: 'PURULIA CALLING',
    subtitle: 'Tusu Festival Photography Tour',
    date: 'JAN 13-15, 2026',
    time: '3 Days / 2 Nights',
    price: '₹15,000',
    spots: 'Limited Seats',
    image: 'https://i.postimg.cc/VvyBZtmW/here.jpg', // Keep black as requested - you can update this later
    shortDesc: 'Three fun-filled days at Purulia with Tusu festival - outdoor, street and travel photography',
    instructor: 'Arindam Bera,Lopamudra Bera',
    level: 'All Levels',
    location: 'Purulia (Barabhum to Barabhum)',
    highlights: [
      'Tusu festival photography experience',
      'Traditional folk culture documentation',
      'Street photography in rural settings',
      'Travel and landscape photography',
      'World in Focus photography workshop',
      'Cultural immersion experience'
    ],
    includes: [
      '2 nights accommodation',
      'Transportation (Barabhum to Barabhum)',
      'Festival access and guidance',
      'Professional photography mentoring',
      'Cultural photography techniques',
      'Local guide assistance'
    ]
  },
    {
    id: 'mangalajodi-birding-tour',
    type: 'PHOTOGRAPHY TOUR',
    category: 'tour',
    title: 'MANGALAJODI BIRDING',
    subtitle: 'Photography Tour',
    date: 'FEB 6-8, 2026',
    time: '3 Days / 3 Nights',
    price: '₹15,000',
    spots: 'Limited Seats',
    image: 'https://i.postimg.cc/pTCVdgtz/516759676-24494555006846920-1523019678246178138-n.jpg', // Keep black as requested - you can update this later
    shortDesc: 'Professional birding photography tour to Mangalajodi with 6 safaris over 3 days',
    instructor: 'Arindam Bera,Lopamudra Bera',
    level: 'All Levels',
    location: 'Mangalajodi (Khurda Rd to Khurda Rd)',
    highlights: [
      '6 safari sessions across 3 days',
      'Expert guidance on bird photography',
      'Capture diverse wetland bird species',
      'Professional photography techniques',
      'Small group for personalized attention'
    ],
    includes: [
      '3 nights accommodation',
      '6 safari sessions',
      'Transportation (Khurda Rd to Khurda Rd)',
      'Professional mentor guidance',
      'Photography tips and techniques'
    ]
  },
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

  // SEO Configuration
  const pageMeta = generatePageMeta(pageConfigs.events);

  // Generate event schemas
  const eventSchemas = upcomingEvents.slice(0, 5).map((event) =>
    generateEventSchema({
      title: event.title,
      description: event.shortDesc,
      startDate: event.date,
      endDate: event.date,
      isOnline: false,
      location: {
        name: event.location,
        address: "Pixel Studios",
      },
      image: event.image,
      url: `https://pixelstudios.com/events#${event.id}`,
      price: event.price.replace('₹', ''),
      currency: 'INR',
      registrationStart: new Date().toISOString(),
    })
  );

  const schemas = [
    ...eventSchemas,
    generateBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Events", path: "/events" },
    ]),
  ];

  return (
    <>
      <SEOHead meta={pageMeta} schema={schemas} />
      <section className="min-h-screen px-8 lg:px-20 py-20 bg-black">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-white/60 text-pixel-sm tracking-wider mb-4">▶ UPCOMING</p>
        <h1 className="text-modera-yellow text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] mb-8">
          EVENTS &<br />
          WORKSHOPS
        </h1>
        <p className="text-white/60 text-base max-w-2xl mb-8 poppins-light leading-relaxed">
          Join our exclusive masterclasses and workshops designed for photographers and creatives 
          who want to elevate their craft. Learn from industry professionals in our state-of-the-art studio.
        </p>

        {/* Filter Buttons
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
              className={`px-4 py-2 text-pixel-xs font-medium transition-all ${
                filter === filterOption.value
                  ? 'bg-modera-yellow text-black'
                  : 'bg-zinc-900 text-white/60 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div> */}
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
                  <span className="bg-modera-yellow text-black text-pixel-xs font-bold px-2 py-1">
                    {event.type}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/60 text-white text-pixel-sm font-bold px-3 py-1 backdrop-blur-sm">
                    {event.price}
                  </span>
                </div>

                {/* Date at bottom */}
                <div className="absolute bottom-4 left-4">
                  <p className="text-white/60 text-pixel-sm">{event.date}</p>
                  <p className="text-white text-pixel-sm">{event.time}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-white text-pixel-xl font-bold mb-1">
                  {event.title}
                </h3>
                <p className="text-modera-yellow text-sm mb-3">{event.subtitle}</p>
                
                <p className="text-white/60 text-pixel-xs mb-4 line-clamp-2 poppins-light leading-relaxed">
                  {event.shortDesc}
                </p>

                {/* Event Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-white/40 text-pixel-xs mb-1">INSTRUCTOR</p>
                    <p className="text-white text-pixel-base">{event.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-pixel-xs mb-1">AVAILABILITY</p>
                    <p className={`text-pixel-sm font-medium ${getStatusColor(event.spots)}`}>
                      {event.spots === 'Open' ? 'OPEN' : `${event.spots} `}
                    </p>
                  </div>
                </div>

                {/* Register CTA */}
                <a 
                  href="https://wa.me/919123809082"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-4 py-2 bg-white/10 text-white text-pixel-xs font-medium hover:bg-modera-yellow hover:text-black transition-all duration-300 text-center block"
                >
                  REGISTER NOW
                </a>
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
                  <span className="text-white text-pixel-xl">×</span>
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
                    <span className="bg-modera-yellow text-black text-pixel-xs font-bold px-2 py-1">
                      {activeEvent.type}
                    </span>
                    <h2 className="text-white text-3xl font-bold mt-3">
                      {activeEvent.title}
                    </h2>
                    <p className="text-modera-yellow text-pixel-sm mt-1">{activeEvent.subtitle}</p>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Event Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-black p-4">
                      <p className="text-white/40 text-pixel-xs mb-1">DATE</p>
                      <p className="text-white text-pixel-sm font-medium">{activeEvent.date}</p>
                    </div>
                    <div className="bg-black p-4">
                      <p className="text-white/40 text-pixel-xs mb-1">TIME</p>
                      <p className="text-white text-pixel-sm font-medium">{activeEvent.time}</p>
                    </div>
                    <div className="bg-black p-4">
                      <p className="text-white/40 text-pixel-xs mb-1">PRICE</p>
                      <p className="text-modera-yellow text-pixel-base font-bold">{activeEvent.price}</p>
                    </div>
                    <div className="bg-black p-4">
                      <p className="text-white/40 text-pixel-xs mb-1">SPOTS</p>
                      <p className={`text-pixel-sm font-medium ${getStatusColor(activeEvent.spots)}`}>
                        {activeEvent.spots}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <p className="text-white/80 text-pixel-xs leading-relaxed mb-4 poppins-light">
                      {activeEvent.shortDesc}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-pixel-xs poppins-regular">
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
                    <h3 className="text-modera-yellow text-pixel-sm font-bold mb-4">WHAT WE OFFER</h3>
                    <div className="space-y-2">
                      {activeEvent.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-modera-yellow mt-1">▶</span>
                          <span className="text-white/80 text-pixel-xs poppins-light">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-8">
                    <h3 className="text-modera-yellow text-pixel-sm font-bold mb-4">WHAT'S INCLUDED</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {activeEvent.includes.map((item, i) => (
                        <div key={i} className="bg-black p-3">
                          <span className="text-white/60 text-pixel-xs poppins-light">✓ {item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  {/* Register CTA */}
                  <a 
                    href="https://wa.me/919123809082"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-4 py-2 bg-white/10 text-white text-pixel-xs font-medium hover:bg-modera-yellow hover:text-black transition-all duration-300 text-center block"
                  >
                    REGISTER NOW
                  </a>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
    </>
  );
}

export default EventsWorkshops;