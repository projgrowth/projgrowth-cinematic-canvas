import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "ProjGrowth transformed our digital presence completely. Their strategic approach and attention to detail exceeded our expectations at every turn.",
    author: "Jennifer Martinez",
    role: "CEO",
    company: "GFG Solutions"
  },
  {
    quote: "Working with this team was seamless. They understood our vision from day one and brought it to life with precision and creativity we didn't know was possible.",
    author: "Michael Chen",
    role: "Founder",
    company: "Real Thread"
  },
  {
    quote: "The results speak for themselves. Our platform engagement increased by 60% after the redesign, and our brand finally feels like us.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "Diverse Wealth"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="container-site py-24 border-t border-line">
      <ScrollReveal variant="fade-up">
        <div className="mb-12">
          <h2 className="font-display text-3xl lg:text-4xl text-text mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-mute">
            Trusted by ambitious brands
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.2}>
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quote Icon */}
          <Quote className="w-12 h-12 text-accent/20 mb-8" />

          {/* Testimonial Content */}
          <div className="min-h-[200px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <p className="text-2xl md:text-3xl text-text leading-relaxed font-light">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-display text-lg">
                      {testimonials[currentIndex].author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-text font-medium">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-mute text-sm">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? "w-8 bg-accent" 
                      : "w-2 bg-line hover:bg-mute"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={goToPrev}
                className="p-2 border border-line rounded-md hover:border-accent hover:bg-accent/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-mute" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 border border-line rounded-md hover:border-accent hover:bg-accent/10 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-mute" />
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default TestimonialsCarousel;
