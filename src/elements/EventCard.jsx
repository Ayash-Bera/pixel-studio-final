import { motion } from "framer-motion";

function EventCard({ event, position, delay = 0 }) {
  const hoverFX = {
    whileHover: {
      scale: 1.05,
      y: -2,
      opacity: 1,
      boxShadow: "0px 4px 20px rgba(255, 215, 0, 0.3)",
      transition: { duration: 0.15, ease: "easeOut" },
    },
    whileTap: { scale: 0.98 },
  };

  // Get category-based styling
  const getCategoryStyle = (category) => {
    const styles = {
      interior: "border-l-4 border-blue-400",
      product: "border-l-4 border-green-400", 
      lighting: "border-l-4 border-purple-400",
      showcase: "border-l-4 border-orange-400",
      exhibition: "border-l-4 border-red-400",
      default: "border-l-4 border-modera-yellow"
    };
    return styles[category] || styles.default;
  };

  // Format duration display
  const formatDuration = (duration) => {
    if (duration.minutes) {
      return `${duration.hours}h ${duration.minutes}m`;
    }
    return `${duration.hours}h`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      viewport={{ once: true }}
      {...hoverFX}
      className={`absolute bg-white text-black p-4 shadow-lg cursor-pointer min-w-[200px] ${getCategoryStyle(event.category)}`}
      style={position}
    >
      {/* Event Title */}
      <p className="text-[10px] opacity-100 mb-1 font-medium">
        {event.title}
      </p>
      
      {/* Event Details */}
      <p className="text-[9px] opacity-75 leading-4 mb-3">
        {event.details.join(" • ")}
      </p>
      
      {/* Duration Display */}
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold">
          {event.duration.hours}
        </span>
        <span className="text-[10px] opacity-75 uppercase">
          Hours
        </span>
        {event.duration.minutes && (
          <>
            <span className="text-2xl font-bold ml-2">
              {event.duration.minutes}
            </span>
            <span className="text-[10px] opacity-75 uppercase">
              Min
            </span>
          </>
        )}
      </div>

      {/* Event Type Badge */}
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-[8px] px-2 py-1 rounded uppercase tracking-wider ${
          event.type === 'workshop' 
            ? 'bg-gray-100 text-gray-700' 
            : 'bg-black text-white'
        }`}>
          {event.type}
        </span>
        
        {/* Weeks indicator */}
        <span className="text-[8px] opacity-60">
          {event.weeksFromNow === 1 ? 'Next week' : `In ${event.weeksFromNow} weeks`}
        </span>
      </div>
    </motion.div>
  );
}

export default EventCard;