import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { caseStudies, hasPlateImage } from "@/data/caseStudies";

type Outcome = {
  text: string;
  slug?: string;
  tag?: string;
};

const outcomes: Outcome[] = [
  {
    text: "Rebuilt a wealth advisory firm's brand and website end-to-end.",
    slug: "smart-financial",
    tag: "Smart Financial · Wealth",
  },
  {
    text: "Shipped an AI-assisted plan-review tool for a compliance firm.",
    slug: "florida-private",
    tag: "Florida Private Providers · Compliance",
  },
  {
    text: "Built a cinematic content engine that turns one shoot day into a month of output.",
    slug: "gfg-solutions",
    tag: "GFG Solutions · Tax Strategy",
  },
  {
    text: "Launched a modern, trust-forward website for a Florida law practice.",
    slug: "fritzler-law",
    tag: "Fritzler Law · Legal",
  },
];

function thumbFor(slug?: string) {
  if (!slug) return null;
  const study = caseStudies.find((item) => item.id === slug);
  if (!study) return null;
  if (hasPlateImage(study)) return { src: study.image, cover: true };
  if (study.logo) return { src: study.logo, cover: false };
  return null;
}

const ResultsStrip = () => {
  return (
    <section className="relative border-y border-line bg-surface/40">
      <div className="container-site section">
        <ScrollReveal variant="fade-up">
          <div className="grid-12 section-intro-grid mb-12 md:mb-16">
            <div className="col-span-12 lg:col-span-4">
              <p className="eyebrow mb-4">Outcomes</p>
              <h2 className="font-display text-text">
                Outcomes,<br />not deliverables.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6 flex items-end">
              <p className="lede">
                A short list of what we actually shipped — and what it unlocked for the people who hired us.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-line">
          {outcomes.map((o, idx) => {
            const thumb = thumbFor(o.slug);
            const Inner = (
              <div className="group relative -mx-4 flex items-center justify-between gap-6 px-4 py-7 transition-colors duration-sm hover:bg-surface/60 md:-mx-6 md:px-6 md:py-9">
                <span className="absolute bottom-2 left-0 top-2 w-0 rounded-r bg-[rgb(241,240,238)] transition-[width] duration-sm group-hover:w-0.5" />
                <div className="flex min-w-0 items-start gap-4 md:gap-5">
                  {thumb && (
                    <img
                      src={thumb.src}
                      alt=""
                      width={40}
                      height={40}
                      className={`mt-1 h-10 w-10 shrink-0 rounded-[4px] border border-white/10 ${
                        thumb.cover ? "object-cover" : "bg-[rgb(18,18,20)] object-contain p-1"
                      }`}
                    />
                  )}
                  <div className="min-w-0">
                    <p className="outcome-line text-[rgb(241,240,238)]">{o.text}</p>
                    {o.tag && (
                      <p className="eyebrow mt-2 block">{o.tag}</p>
                    )}
                  </div>
                </div>
                {o.slug && (
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-[rgba(241,240,238,0.45)] transition-transform duration-sm group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgb(241,240,238)] md:h-6 md:w-6" />
                )}
              </div>
            );
            return (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.06}>
                {o.slug ? (
                  <Link to={`/work/${o.slug}`} className="block">
                    {Inner}
                  </Link>
                ) : (
                  Inner
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResultsStrip;
