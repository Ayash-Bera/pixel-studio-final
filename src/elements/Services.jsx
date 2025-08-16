import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import Footer from "./Footer";

// AuroraBackground Component
const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          "--aurora":
            "repeating-linear-gradient(100deg,#FFD700_10%,#FFE55B_15%,#FFF2A6_20%,#FFE55B_25%,#FFD700_30%)",
          "--dark-gradient":
            "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
          "--white-gradient":
            "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
        }}
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};

function Services() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      q: "How long does a photoshoot take?",
      a: "Typical photoshoots range from 2-6 hours depending on the scope and number of shots required. Complex projects may require multiple days.",
    },
    {
      q: "Do you offer shoots in other locations?",
      a: "Yes, we offer on-location shoots throughout Europe. Travel expenses are calculated separately based on distance and duration.",
    },
    {
      q: "How much time it takes to edit?",
      a: "Standard editing takes 5-10 business days. Rush delivery (2-3 days) is available with an additional fee. Complex retouching may require additional time.",
    },
    {
      q: "Can I rent the studio without a photographer?",
      a: "Yes, our fully-equipped studio is available for rent. Half-day and full-day rates include basic lighting equipment and backdrops.",
    },
    {
      q: "What type of files will I receive?",
      a: "You will receive high-resolution JPEGs and RAW files upon request. We also provide web-optimized versions for digital use.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ===================== Hero with Aurora Background ===================== */}
      <AuroraBackground className="dark bg-black" showRadialGradient={true}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-8"
        >
          <p className="text-white/60 text-sm tracking-wider mb-4">PREMIUM PHOTOGRAPHY</p>
          
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] text-modera-yellow mb-8">
            SERVICES
          </h1>
          
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-12">
            High-end photography solutions for brands that demand excellence.
            From concept to final delivery, we craft visual stories that captivate.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+919123809082"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-modera-yellow text-black font-bold text-sm tracking-wider hover:bg-white transition-colors"
            >
              CALL US
            </motion.a>
            
            <motion.a
              href="mailto:pixelphotoexhibition@gmail.com"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border border-modera-yellow text-modera-yellow font-bold text-sm tracking-wider hover:bg-modera-yellow hover:text-black transition-all"
            >
              EMAIL US
            </motion.a>
          </div>
        </motion.div>
      </AuroraBackground>

      {/* ===================== The Art of Photography Section ===================== */}
      <section className="px-8 lg:px-20 py-20 bg-zinc-900">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12"
        >
          <p className="text-white/60 text-sm mb-4">▶ SERVICES</p>
          <h2 className="text-[clamp(2rem,6vw,5rem)] font-bold leading-tight text-modera-yellow mb-8">
            THE
            <br />
            ART OF
            <br />
            PHOTOGRAPHY
            <br />
            THAT CAPTURES EVERY
            <br />
            DETAIL
          </h2>
          <p className="text-white/60 pixel-xl max-w-md">
            Our photography is a powerful tool that enhances a brand's visual
            identity, builds its reputation, and attracts attention. Whether you
            need images for catalogs, websites, social media, or advertising
            campaigns, we can craft visual content that sets your business apart
            from the competition.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {[
            {
              img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600",
              title: "Interior<br />Photography",
              text: "Interior photography is more than just capturing a space—it's about conveying atmosphere, the play of light and shadow, and the interaction of textures and materials. We focus on finding the balance of natural and artificial lighting to create depth and dimension.",
            },
            {
              img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
              title: "Furniture<br />Photography",
              text: "For furniture to look stylish, well-sized, and tactile in photos, it needs more than just good placement in a frame. We create shoots that highlight materials, textures, and forms, making products visually appealing to customers.",
            },
            {
              img: "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=600",
              title: "Lighting<br />Photography",
              text: "Lighting is a key element that transforms how a space is perceived. From warm accents to allow customers to see and feel the nature of light—its glow, diffusion, and warmth—we capture the warmth and coolness of different lighting tones.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="group"
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="relative h-64 overflow-hidden rounded-full bg-zinc-800 mb-4"
              >
                <img
                  src={card.img}
                  alt={card.title.replace(/<br \/>/g, " ")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
              <h3
                className="text-white text-lg font-medium mb-2"
                dangerouslySetInnerHTML={{ __html: card.title }}
              />
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {card.text}
              </p>
              <button className="text-white/80 text-sm border-b border-white/20 pb-1 hover:text-modera-yellow hover:border-modera-yellow transition-all">
                EXPLORE MORE
              </button>
            </motion.div>
          ))}
        </div>

        {/* Pricing note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-white/60 text-sm mb-2">▶ PRICING</p>
          <p className="text-white/80 text-sm">
            Pricing depends on the scope of work, the number of objects, and the
            type of photography. Contact us for an exact quote.
          </p>
        </motion.div>
      </section>

      {/* ===================== FAQ Section ===================== */}
      <section className="px-8 lg:px-20 py-20 bg-black">
        <div className="mb-12">
          <p className="text-white/60 text-sm mb-4">▶ FAQ</p>
          <h2 className="text-modera-yellow text-[clamp(2rem,5vw,4rem)] font-bold leading-tight">
            FREQUENTLY
            <br />
            ASKED
            <br />
            QUESTIONS
          </h2>
        </div>

        <div className="space-y-4 max-w-3xl">
          {faqs.map((faq, index) => {
            const open = expandedFaq === index;
            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  backgroundColor: open
                    ? "rgba(255,255,255,0.03)"
                    : "transparent",
                }}
                className="border-b border-white/10 pb-4"
              >
                <button
                  onClick={() => setExpandedFaq(open ? null : index)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-white/40 text-md">{index + 1}.</span>
                    <span className="text-white/80 text-md">{faq.q}</span>
                  </div>
                  <span className="text-white/40 group-hover:text-white transition-colors">
                    {open ? "−" : "+"}
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  {open && (
                    <p className="text-white/50 text-md mt-4 ml-12 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Services;