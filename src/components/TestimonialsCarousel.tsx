/**
 * PLACEHOLDER CONTENT - REPLACE WITH REAL DATA
 * 
 * To update this section with real testimonials:
 * 1. Replace the testimonial quotes, author names, roles, and companies below
 * 2. Consider adding author photos for enhanced credibility
 * 3. Ensure you have permission to use client testimonials
 * 
 * Tip: Ask satisfied clients for written testimonials after successful projects
 */

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // TODO: Replace with real client testimonials
  const testimonials: Testimonial[] = [
    {
      quote: "ProjGrowth transformed our digital presence. The attention to detail and strategic thinking exceeded our expectations.", // PLACEHOLDER: Replace with real quote
      author: "Jennifer Martinez", // PLACEHOLDER: Replace with real name
      role: "CEO", // PLACEHOLDER: Replace with real role
      company: "TechFlow" // PLACEHOLDER: Replace with real company
    },
    {
      quote: "Working with this team was seamless. They understood our vision and brought it to life with precision and creativity.", // PLACEHOLDER
      author: "Michael Chen", // PLACEHOLDER
      role: "Founder", // PLACEHOLDER
      company: "Urban Nest" // PLACEHOLDER
    },
    {
      quote: "The results speak for themselves. Our platform engagement increased by 60% after the redesign.", // PLACEHOLDER
      author: "Sarah Johnson", // PLACEHOLDER
      role: "Product Director", // PLACEHOLDER
      company: "FitCore" // PLACEHOLDER
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="py-16 border-t border-line">
      <h2 className="font-display text-3xl text-text mb-12">Client Testimonials</h2>
      <div className="relative max-w-4xl mx-auto">
        <div className="p-12 bg-surface rounded-lg border border-line">
          <Quote className="w-12 h-12 text-accent mb-6 opacity-50" />
          
          <div className="min-h-[180px]">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ${
                  idx === currentIndex
                    ? 'opacity-100 relative'
                    : 'opacity-0 absolute inset-0'
                }`}
              >
                <blockquote className="text-2xl text-text leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-display text-lg text-accent">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-mute">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-sm ${
                  idx === currentIndex
                    ? 'w-8 bg-accent'
                    : 'w-4 bg-line hover:bg-accent/50'
                }`}
                aria-label={`View testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
