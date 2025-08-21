import { motion } from "framer-motion";

function Footer() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  const hoverFX = {
    whileHover: {
      scale: 1.02,
      y: -1,
      transition: { duration: 0.15, ease: "easeOut" },
    },
    whileTap: { scale: 0.98 },
  };

  return (
    <footer className="px-8 lg:px-20 py-12 bg-zinc-900 text-white border-t border-white/10">
      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Company Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <h3 className="text-white/50 text-pixel-sm tracking-wider mb-3 uppercase">
            Company
          </h3>
          <motion.h4
            {...hoverFX}
            className="text-xl poppins-medium text-gray-300 cursor-pointer hover:text-modera-yellow transition-colors"
          >
            <a href="/" className="hover:text-modera-yellow transition-colors">
              Pixel Photography Studio & Academy
            </a>
          </motion.h4>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <h3 className="text-white/50 text-pixel-sm tracking-wider mb-3 uppercase">
            Contact Us
          </h3>
          <div className="space-y-2">
            <motion.p
              {...hoverFX}
              className="poppins-light text-gray-300 cursor-pointer hover:text-modera-yellow transition-colors"
            >
              <a href="tel:+919123809082" className="hover:text-modera-yellow transition-colors">
                +91 9123809082
              </a>
            </motion.p>
            <motion.p
              {...hoverFX}
              className="poppins-light text-gray-300 cursor-pointer hover:text-modera-yellow transition-colors"
            >
              <a href="mailto:pixelphotoexhibition@gmail.com" className="hover:text-modera-yellow transition-colors">
                pixelphotoexhibition@gmail.com
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="pt-6 border-t border-white/10 text-center"
      >
        <motion.p
          {...hoverFX}
          className="text-gray-500 poppins-light text-sm cursor-pointer"
        >
          Made by{" "}
          <a 
            href="https://ayashbera.me/" 
            className="hover:text-modera-yellow transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ayash
          </a>{" "}
          and{" "}
          <a 
            href="https://www.rudranilchowdhury.dev/" 
            className="hover:text-modera-yellow transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rudranil
          </a>{" "}
          :D
        </motion.p>
      </motion.div>
    </footer>
  );
}

export default Footer;