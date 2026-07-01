import { Helmet } from "react-helmet-async";
import { Section } from "@/components/ui/section";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import SectionChapter from "@/components/SectionChapter";
import { SurfaceCard } from "@/components/ui/card-surface";
import { Check } from "lucide-react";
import RelatedCaseStudies from "@/components/RelatedCaseStudies";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ServiceBlock, ServiceContent } from "@/data/services";

const Chapter = ({ chapter, heading }: { chapter?: { number: number; label: string }; heading?: string }) => (
  <>
    {chapter && <SectionChapter number={chapter.number} label={chapter.label} />}
    {heading && <h2 className="font-display text-text mb-12">{heading}</h2>}
  </>
);

const Block = ({ block }: { block: ServiceBlock }) => {
  switch (block.kind) {
    case "benefits":
      return (
        <ScrollReveal variant="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 section border-t border-line">
            {block.items.map((item, idx) => (
              <SurfaceCard key={idx} variant="ghost" pad="md" className="text-center">
                <item.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-display text-text mb-2">{item.title}</h3>
                <p className="text-sm text-mute">{item.desc}</p>
              </SurfaceCard>
            ))}
          </div>
        </ScrollReveal>
      );
    case "capabilities":
      return (
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <Chapter chapter={block.chapter} heading={block.heading} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {block.items.map((item, idx) => {
                const Icon = item.icon;
                return block.numbered ? (
                  <SurfaceCard key={idx} pad="lg" interactive className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-sm" />
                    <span className="font-display text-accent-faint mb-4 block">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-text mb-3">{item.title}</h3>
                    <p className="text-mute">{item.description}</p>
                  </SurfaceCard>
                ) : (
                  <SurfaceCard key={idx} pad="lg" interactive>
                    {Icon && <Icon className="w-10 h-10 text-accent mb-4" />}
                    <h3 className="font-display text-text mb-3">{item.title}</h3>
                    <p className="text-mute">{item.description}</p>
                  </SurfaceCard>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      );
    case "checklist":
      return (
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <Chapter chapter={block.chapter} heading={block.heading} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {block.items.map((item, idx) => (
                <SurfaceCard key={idx} variant="ghost" pad="sm" className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-text">{item}</span>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </ScrollReveal>
      );
    case "processHorizontal":
      return (
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <Chapter chapter={block.chapter} heading={block.heading} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {block.steps.map((step, idx) => (
                <div key={idx} className="relative">
                  <span className="text-6xl font-display text-accent-faint absolute -top-4 -left-2">
                    {step.step}
                  </span>
                  <div className="pt-8">
                    <h3 className="font-display text-text mb-3">{step.title}</h3>
                    <p className="text-mute text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      );
    case "processVertical":
      return (
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <Chapter chapter={block.chapter} heading={block.heading} />
            <div className="space-y-8">
              {block.steps.map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <span className="text-3xl font-display text-accent-faint flex-shrink-0 w-12">{item.step}</span>
                  <div>
                    <h3 className="font-display text-text mb-2">{item.title}</h3>
                    <p className="text-mute">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      );
    case "approach":
      return (
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <Chapter chapter={block.chapter} heading={block.heading} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {block.items.map((item, idx) => (
                <SurfaceCard key={idx} pad="lg" className="text-center">
                  <h3 className="font-display text-accent mb-4">{item.title}</h3>
                  <p className="text-mute">{item.desc}</p>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </ScrollReveal>
      );
    case "faqs":
      return (
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <Chapter chapter={block.chapter} heading={block.heading ?? "Frequently Asked Questions"} />
            <Accordion type="single" collapsible className="space-y-4">
              {block.items.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="surface-card px-6">
                  <AccordionTrigger className="text-left text-text hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-mute">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>
      );
  }
};

const ServiceTemplate = ({ content }: { content: ServiceContent }) => {
  const faqBlock = content.blocks.find((b): b is Extract<ServiceBlock, { kind: "faqs" }> => b.kind === "faqs");
  const faqSchema = faqBlock && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqBlock.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <Layout
      seoTitle={content.seo.title}
      seoDescription={content.seo.description}
      seoKeywords={content.seo.keywords}
      canonicalUrl={content.seo.canonical}
    >
      {faqSchema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>
      )}

      <Section>
        <Breadcrumbs />

        <PageHero
          chapter={{ number: 1, label: "Overview" }}
          title={content.hero.title}
          lede={content.hero.lede}
          className="mb-16"
        />

        {content.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        <RelatedCaseStudies
          ids={content.related.ids}
          chapterNumber={content.related.chapterNumber}
          chapterLabel="Proof"
          heading={content.related.heading}
          eyebrow={content.related.eyebrow}
        />
      </Section>
    </Layout>
  );
};

export default ServiceTemplate;