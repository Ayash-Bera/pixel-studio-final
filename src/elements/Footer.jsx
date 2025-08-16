import { motion } from "framer-motion";

function Footer() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  const hoverFX = {
    whileHover: {
      scale: 1.05,
      y: -2,
      opacity: 1,
      transition: { duration: 0.15, ease: "easeOut" },
    },
    whileTap: { scale: 0.98 },
  };

  return (
    <footer className="px-8 min-w-screen lg:px-20 py-20 bg-zinc-900 text-white">
      {/* Top Section */}
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        {[
          {
            title: "Company",
            content: (
              <motion.p
                {...hoverFX}
                className="text-2xl font-medium uppercase tracking-wide text-gray-300 cursor-pointer"
              >
                Pixel Photography Studio & Academy 
              </motion.p>
            ),
          },
          {
            title: "Contact us:",
            content: (
              <motion.p
                {...hoverFX}
                className="text-pixel-base text-pixel-base  text-gray-300 cursor-pointer"
              >
                +91 9123809082 <br/>
                <br/>
                pixelphotoexhibition@gmail.com
              </motion.p>
            ),
          },
          {
            title: "About",
            content: (
              <>
                {[
                  "Pixel Studios blends photography, videography, and creative direction to craft visual stories across interiors, furniture, lighting, and design.",
                  "This site mirrors the studio's identity—focused on mood, precision, and refined aesthetics.",
                  "Smooth interactions and editorial layouts let the work speak for itself.",
                ].map((text, idx) => (
                  <motion.p
                    key={idx}
                    {...hoverFX}
                    className="text-gray-400 text-pixel-sm leading-5 mt-3 cursor-pointer first:mt-0"
                  >
                    {text}
                  </motion.p>
                ))}
              </>
            ),
          },
        ].map((section, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
          >
            <motion.h3
              {...hoverFX}
              className="text-gray-500 text-pixel-base tracking-wider mb-3 uppercase cursor-pointer"
            >
              {section.title}
            </motion.h3>
            {section.content}
          </motion.div>
        ))}
      </div>

    

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 pt-8 border-t border-white/10 w-screen flex items-center"
      >
        <motion.p
          {...hoverFX}
          className="text-gray-500 text-pixel-sm text-center items-center cursor-pointer"
        >
        Made by <a className="hover:text-yellow-400" href="https://ayashbera.me/">Ayash</a> and <a className="hover:text-yellow-400" href="https://www.rudranilchowdhury.dev/">Rudranil</a> :D
        </motion.p>
      </motion.div>
    </footer>
  );
}

export default Footer;