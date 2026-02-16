import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import fritzlerPreview from "@/assets/screenshots/fritzler-law-preview.jpg";

/**
 * 3D Browser Mockup Spotlight for featured case study.
 * CSS 3D perspective tilt with auto-scrolling screenshot.
 */
const BrowserMockup3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Auto-scroll the screenshot
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let direction = 1;
    const interval = setInterval(() => {
      if (isHovering) return; // pause on hover
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (el.scrollTop >= maxScroll - 1) direction = -1;
      if (el.scrollTop <= 0) direction = 1;
      el.scrollTop += direction * 0.5;
    }, 16);

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div className="py-16 md:py-24">
      <div className="grid-12 gap-y-10 items-center">
        {/* Text Side */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <span className="text-xs uppercase tracking-widest text-accent font-medium">
            Featured Project
          </span>
          <h2 className="font-display text-3xl lg:text-4xl text-text">
            Fritzler Law
          </h2>
          <p className="text-lg text-mute leading-relaxed">
            A complete website refresh for a Florida-based law practice — transforming 
            an outdated site into a modern, credibility-first digital presence that 
            shortened the client decision cycle.
          </p>
          <div className="flex items-center gap-8 pt-2">
            <div>
              <span className="font-display text-2xl text-accent">+156%</span>
              <p className="text-xs text-mute mt-1">Inquiries</p>
            </div>
            <div className="h-8 w-px bg-line" />
            <div>
              <span className="font-display text-2xl text-accent">−42%</span>
              <p className="text-xs text-mute mt-1">Bounce Rate</p>
            </div>
          </div>
          <Link
            to="/work"
            onClick={() => {
              // Could deep-link to the case study
            }}
            className="group inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-200 font-medium pt-2"
          >
            View Case Study
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3D Mockup Side */}
        <div className="col-span-12 lg:col-span-7 flex justify-center lg:justify-end">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-[600px]"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Browser Chrome */}
              <div className="rounded-xl overflow-hidden border border-line/60 bg-surface shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
                {/* Title Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(var(--surface))] border-b border-line/40">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[hsl(0_60%_50%/0.7)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[hsl(45_60%_50%/0.7)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[hsl(120_40%_45%/0.7)]" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-base/60 rounded-md px-3 py-1 text-[10px] text-mute text-center truncate">
                      fritzlerlaw.com
                    </div>
                  </div>
                </div>

                {/* Screenshot viewport */}
                <div
                  ref={scrollRef}
                  className="h-[340px] md:h-[400px] overflow-hidden"
                  style={{ scrollBehavior: "auto" }}
                >
                  <img
                    src={fritzlerPreview}
                    alt="Fritzler Law website redesign preview"
                    className="w-full h-auto block"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Reflection / glow beneath */}
              <div
                className="absolute -bottom-8 left-[10%] right-[10%] h-16 pointer-events-none"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(ellipse at center, hsl(155 42% 49% / 0.08), transparent 70%)",
                  filter: "blur(12px)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserMockup3D;
