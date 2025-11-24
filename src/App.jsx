import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "./elements/Navbar";
import Landing from "./elements/Landing";
import Services from "./elements/Services";
import Events from "./elements/Events";
import Footer from "./elements/Footer";
import Gallery from "./elements/Gallery";
import AboutUs from "./elements/AboutUs";
import Workshops from "./elements/Workshops";
import WorkshopDetail from "./elements/WorkshopDetail";
import "./App.css";

function App() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    frames: 0,
  });

  // Real-time clock logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const milliseconds = now.getMilliseconds();
      // Convert milliseconds to frame-like value (0-29)
      const frames = Math.floor((milliseconds / 1000) * 30);
      
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        frames: frames,
      });
    };

    // Update immediately
    updateTime();

    // Update every 33ms for smooth frame animation
    const interval = setInterval(updateTime, 33);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (h, m, s, f) =>
    `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
      s
    ).padStart(2, "0")}:${String(f).padStart(2, "0")}`;

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Landing />}
            />
            <Route path="/services" element={<Services />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/workshops/:workshopId" element={<WorkshopDetail />} />
          </Routes>
        </div>

        {/* Viewfinder Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
            <div className="font-mono text-white/70 text-sm tracking-wider">
              {formatTime(time.hours, time.minutes, time.seconds, time.frames)}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="font-mono text-white/70 text-sm tracking-wider">
                REC
              </span>
            </div>
          </div>
          <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-white/20"></div>
          <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-white/20"></div>
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-white/20"></div>
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-white/20"></div>
          
          {/* Center crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute w-8 h-px bg-white/10 -left-4 top-0"></div>
              <div className="absolute h-8 w-px bg-white/10 left-0 -top-4"></div>
            </div>
          </div>
        </div>

        {/* Film Grain */}
        <div
          className="fixed inset-0 pointer-events-none z-40 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        ></div>
        </div>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;