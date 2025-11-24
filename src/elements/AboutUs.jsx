import { useState } from "react";
import { motion } from "framer-motion";
import SEOHead from "../components/SEOHead";
import { generatePageMeta } from "../utils/seo";
import { generateLocalBusinessSchema, generateOrganizationSchema, generateBreadcrumbSchema } from "../utils/schema";
import { pageConfigs } from "../config/seoConfig";

function AboutUs() {
  const [activeSection, setActiveSection] = useState("studio");

  // SEO Configuration
  const pageMeta = generatePageMeta(pageConfigs.about);

  const businessAddress = {
    street: "Pixel Studios Address",
    city: "City Name",
    region: "State",
    postal: "123456",
    country: "India",
    phone: "+91 9123809082",
    hours: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "18:00",
      },
    ],
  };

  const schemas = [
    generateLocalBusinessSchema(businessAddress),
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  const hoverFX = {
    whileHover: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <>
      <SEOHead meta={pageMeta} schema={schemas} />
      <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="px-8 lg:px-20 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-white/60 text-pixel-sm tracking-wider mb-4">▶ DISCOVER</p>
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] text-modera-yellow mb-8">
            ABOUT
            <br />
            US
          </h1>
          <p className="text-white/60 poppins-light text-sm md:text-base">
            The story behind Pixel Photography Studio & Academy and the vision that drives our creative journey
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="flex bg-zinc-900 p-1 rounded-none">
            {[
              { id: "studio", label: "The Studio" },
              { id: "founders", label: "Meet the Founders" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-8 py-3 text-pixel-xs font-medium transition-all ${
                  activeSection === tab.id
                    ? 'bg-modera-yellow text-black'
                    : 'text-white/60 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Sections */}
        {activeSection === "studio" && (
          <motion.div
            key="studio"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Studio Opening */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="grid lg:grid-cols-2 gap-12 mb-20"
            >
              <div>
                <motion.div
                  {...hoverFX}
                  className="relative h-80 bg-zinc-900 mb-6 overflow-hidden"
                >
                  <img 
                    src="https://i.postimg.cc/FzrD3Cnj/508145322-4988886021336709-8173439536105893980-n.jpg"
                    alt="Pixel Studios Interior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-modera-yellow text-black px-3 py-1 text-pixel-xs font-bold">
                    SINCE 2021
                  </div>
                </motion.div>
              </div>
              
              <div className="flex flex-col justify-center">
                <h2 className="text-modera-yellow text-[clamp(2rem,4vw,3rem)] font-bold mb-6 leading-tight">
                  OUR BEGINNING
                </h2>
                <div className="space-y-4 text-white/80 leading-relaxed poppins-light">
                  <p className="text-sm md:text-base">
                    Pixel Photography Studio opened its doors on <span className="text-modera-yellow poppins-medium">September 19, 2021</span>. 
                    Our space is well equipped with state-of-the-art lighting, backdrops, and equipment, 
                    providing the perfect environment for capturing stunning visuals.
                  </p>
                  <p className="text-sm md:text-base">
                    From fashion and beauty to product and portraiture, we cater to diverse photographic needs. 
                    Beyond technical capabilities, we often cultivate unique atmospheres that contribute to 
                    the overall creative process.
                  </p>
                  <p className="text-sm md:text-base">
                    With a focus on client satisfaction and industry trends, we try and blend technical 
                    expertise with artistic vision to deliver exceptional results.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Our Growth */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="grid lg:grid-cols-2 gap-12 mb-20"
            >
              <div className="lg:order-2">
                <motion.div
                  {...hoverFX}
                  className="relative h-80 bg-zinc-900 mb-6 overflow-hidden"
                >
                  <img 
                    src="https://i.postimg.cc/vmvnf8RN/20200214135426-BERA8353.jpg"
                    alt="Our Growth"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-pixel-xs font-bold">
                    3+ YEARS
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:order-1 flex flex-col justify-center">
                <h2 className="text-modera-yellow text-[clamp(2rem,4vw,3rem)] font-bold mb-6 leading-tight">
                  OUR GROWTH
                </h2>
                <div className="space-y-4 text-white/80 leading-relaxed poppins-light">
                  <p className="text-sm md:text-base">
                    Over the past 3 years, our high-quality equipment, skilled photographers and 
                    post-production excellence have collectively facilitated in building a strong 
                    reputation in the job market.
                  </p>
                  <p className="text-sm md:text-base">
                    By providing <span className="text-modera-yellow poppins-medium">Virtual Photography Consultations</span>, 
                    <span className="text-modera-yellow poppins-medium"> Personalized Services</span> and 
                    <span className="text-modera-yellow poppins-medium"> Prompt Delivery</span> we have been able to attract 
                    a substantial number of loyal clients to whom we shall be forever obliged.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-modera-yellow text-[clamp(2rem,4vw,3rem)] font-bold mb-8 leading-tight">
                OUR VISION
              </h2>
              <div className="space-y-6 text-white/80 leading-relaxed poppins-light">
                <p className="text-base md:text-lg poppins-regular">
                  Our vision is to be more than just a photography studio, we aspire to be a 
                  <span className="text-modera-yellow poppins-medium"> curator of life's precious moments</span>.
                </p>
                <p className="text-sm md:text-base">
                  Through our lens, we aim to capture the essence of human connection, emotion, 
                  and beauty, creating timeless images that resonate deeply with our clients. 
                  We strive to create an exceptional client experience, building lasting relationships 
                  through stunning imagery and personalized service.
                </p>
                <p className="text-modera-yellow poppins-medium text-sm md:text-base">
                  By pushing the boundaries of photography, we aim to inspire and evoke emotions 
                  with every image, leaving an enduring legacy.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeSection === "founders" && (
          <motion.div
            key="founders"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Co-Founders Header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-center mb-16"
            >
              <h2 className="text-modera-yellow text-[clamp(2rem,4vw,3rem)] font-bold mb-4 leading-tight">
                MEET OUR CO-FOUNDERS
              </h2>
              <p className="text-white/60 text-sm md:text-base poppins-light">
                The visionaries behind Pixel Photography Studio & Academy
              </p>
            </motion.div>

            {/* Arindam Bera - Co-Founder */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="grid lg:grid-cols-2 gap-12 mb-20"
            >
              <div>
                <motion.div
                  {...hoverFX}
                  className="relative h-96 bg-zinc-900 mb-6 overflow-hidden"
                >
                  <img 
                    src="https://i.postimg.cc/1zCjhN7W/bapuji.jpg"
                    alt="Arindam Bera"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 p-3">
                    <h3 className="text-modera-yellow text-pixel-base font-bold">ARINDAM BERA</h3>
                    <p className="text-white/60 text-pixel-xs">Co-Founder</p>
                    <p className="text-white/60 text-pixel-xs mt-1">
                      EFIP, AFIAP, APLAAPA, Hon.PESGSPC, GPA.PESGSPC, F.NOBEL/GOLD
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex flex-col justify-center">
                <h3 className="text-modera-yellow text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-6 leading-tight">
                  THE ARTIST'S JOURNEY
                </h3>
                <div className="space-y-4 text-white/80 leading-relaxed poppins-light">
                  <p className="text-sm md:text-base">
                    From a tender age, I harbored an unwavering passion for artistic expression. 
                    Drawing became my first language of creativity, igniting a lifelong pursuit 
                    of visual storytelling that would define my journey as an artist.
                  </p>
                  <p className="text-sm md:text-base">
                    This innate artistic foundation naturally evolved into a profound fascination 
                    with photography—the art of capturing fleeting moments and preserving them 
                    for eternity. While the medium transformed, my commitment to artistic excellence 
                    remained unwavering and steadfast.
                  </p>
                  <p className="text-sm md:text-base">
                    Though canvas and brushes have given way to cameras and lenses, 
                    <span className="text-modera-yellow poppins-medium"> the painter's soul within me continues to flourish</span>, 
                    constantly seeking new ways to evoke profound emotions and craft compelling 
                    narratives through every carefully composed frame.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Lopamudra Bera - Co-Founder */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="grid lg:grid-cols-2 gap-12 mb-20"
            >
              <div className="lg:order-2">
                <motion.div
                  {...hoverFX}
                  className="relative h-96 bg-zinc-900 mb-6 overflow-hidden"
                >
                  <img 
                    src="https://i.postimg.cc/dtbNJYBY/mother.jpg"
                    alt="Lopamudra Bera"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 p-3">
                    <h3 className="text-modera-yellow text-pixel-base font-bold">LOPAMUDRA BERA</h3>
                    <p className="text-white/60 text-pixel-xs">Co-Founder</p>
                    <p className="text-white/60 text-pixel-xs mt-1">
                      AFIAP, AFIP (2025)
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:order-1 flex flex-col justify-center">
                <h3 className="text-modera-yellow text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-6 leading-tight">
                  THE MULTIMEDIA PROFESSIONAL
                </h3>
                <div className="space-y-4 text-white/80 leading-relaxed poppins-light">
                  <p className="text-sm md:text-base">
                    My professional journey began as a multimedia specialist, where I cultivated 
                    an extensive expertise spanning over <span className="text-modera-yellow poppins-medium"> 
                    two decades of experience</span> in advanced photo editing, precision retouching, 
                    and sophisticated post-processing techniques.
                  </p>
                  <p className="text-sm md:text-base">
                    Transitioning into the dynamic field of photography three years ago, I have 
                    successfully orchestrated numerous indoor and outdoor photography workshops, 
                    passionately sharing technical knowledge while inspiring the next generation 
                    of aspiring photographers to discover their unique creative voices.
                  </p>
                  <p className="text-sm md:text-base">
                    My specialized expertise in salon photography editing has earned recognition 
                    through prestigious distinctions, including <span className="text-modera-yellow poppins-medium"> 
                    AFIAP and AFIP honors in 2025</span>, validating years of dedicated craftsmanship 
                    and artistic excellence.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Photography Philosophy */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="grid lg:grid-cols-2 gap-12 mb-20"
            >
              <div>
                <motion.div
                  {...hoverFX}
                  className="relative h-80 bg-zinc-900 mb-6 overflow-hidden"
                >
                  <img 
                    src="https://i.postimg.cc/vH9tDsmp/THE-TIME.jpg"
                    alt="Photography Philosophy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              
              <div className="flex flex-col justify-center">
                <h3 className="text-modera-yellow text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-6 leading-tight">
                  PHOTOGRAPHY AS ART
                </h3>
                <div className="space-y-4 text-white/80 leading-relaxed poppins-light">
                  <p className="text-sm md:text-base">
                    Photography for us is an endless exploration, a pursuit of capturing 
                    fleeting moments and translating them into tangible art.
                  </p>
                  <p className="text-sm md:text-base">
                    A camera is more than a device; it's a portal into realms of imagination 
                    and expression. We see the world as painters see a canvas, each scene a 
                    potential masterpiece waiting to be captured.
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="text-modera-yellow poppins-medium">With every click, we are etching moments into eternity</span>, 
                    transforming fleeting emotions into tangible art.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Shared Vision */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={4}
              className="text-center max-w-4xl mx-auto"
            >
              <h3 className="text-modera-yellow text-[clamp(2rem,4vw,3rem)] font-bold mb-8 leading-tight">
                OUR SHARED VISION
              </h3>
              <div className="space-y-6 text-white/80 leading-relaxed poppins-light">
                <p className="text-base md:text-lg poppins-regular">
                  Together, we are filled with anticipation for what the future holds. 
                  We envision a world where photography is not just an art form but a 
                  <span className="text-modera-yellow poppins-medium"> powerful tool for social change</span>.
                </p>
                <p className="text-sm md:text-base">
                  Our vision for Pixel Photography Studio extends beyond its physical walls. 
                  We are committed to harnessing the power of modern technology and fostering 
                  a culture of experimentation and learning.
                </p>
                <p className="text-modera-yellow poppins-medium text-sm md:text-base">
                  By staying at the forefront of industry advancements, we aim to push the 
                  boundaries of photographic expression and elevate the studio to new heights.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Contact CTA */}
    </div>
    </>
  );
}

export default AboutUs;