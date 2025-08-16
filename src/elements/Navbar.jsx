import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "home", path: "/" },
    { name: "services", path: "/services" },
    { name: "gallery", path: "/gallery" },
    { name: "events", path: "/events" },
    // { name: "contact", path: "/contact" }, // add a route later if needed
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 
                    px-8 pt-9 md:pl-20 md:pr-[60px] md:pt-[35px]">
      <div className="flex justify-between items-center py-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: 0.8, letterSpacing: "0.2em" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link
            to="/"
            className="text-white font-mono text-pixel-xs hover:text-modera-yellow transition-colors"
          >
            Pixel Studios 
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 0.5, y: 0 }}
              whileHover={{
                y: -4,
                opacity: 0.9,
                textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
                transition: { duration: 0.1, ease: "easeOut" },
              }}
              onHoverEnd={(e) => {
                e.target.style.textShadow = "none";
              }}
              transition={{
                opacity: { duration: 0.05, delay: i * 0.05 },
                y: { duration: 0.25, ease: "easeOut" },
              }}
            >
              <Link
                to={item.path}
                className="text-white text-lg lowercase transition-all duration-150"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col items-center justify-center gap-1 relative w-6 h-6"
        >
          <motion.span
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 8 : 0,
            }}
            className="w-4 h-[2px] bg-white rounded"
          ></motion.span>
          <motion.span
            animate={{
              opacity: isMenuOpen ? 0 : 1,
            }}
            className="w-4 h-[2px] bg-white rounded"
          ></motion.span>
          <motion.span
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -8 : 0,
            }}
            className="w-4 h-[2px] bg-white rounded"
          ></motion.span>
        </button>
      </div>

      {/* Mobile Menu - Right-aligned and compact */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden absolute mt-1 right-5
                       bg-white/10 backdrop-blur-xl
                       rounded-2xl shadow-2xl border border-white/20
                       overflow-hidden"
            style={{
              zIndex: 35,
              width: "170px",
              marginRight: "0px",
            }}
          >
            <div className="p-4">
              <div className="flex flex-col gap-3">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ opacity: 1, x: 4, color: "#FFD700" }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className="text-white/70 text-sm lowercase transition-all duration-200 hover:text-modera-yellow block py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;