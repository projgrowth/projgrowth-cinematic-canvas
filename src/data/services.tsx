import type { ReactNode } from "react";
import { PenTool, Video, Camera, Share2, Palette, Target, BookOpen, Eye, Monitor, Smartphone, Zap, Shield, type LucideIcon } from "lucide-react";

export type FAQ = { question: string; answer: string };

export type ServiceBlock =
  | {
      kind: "benefits";
      chapter: { number: number; label: string };
      heading?: string;
      items: { icon: LucideIcon; title: string; desc: string }[];
    }
  | {
      kind: "capabilities";
      chapter: { number: number; label: string };
      heading: string;
      items: { icon?: LucideIcon; title: string; description: string }[];
      /** Digital-marketing variant with gradient + numeral */
      numbered?: boolean;
    }
  | {
      kind: "checklist";
      chapter: { number: number; label: string };
      heading: string;
      items: string[];
    }
  | {
      kind: "processHorizontal";
      chapter: { number: number; label: string };
      heading: string;
      steps: { step: string; title: string; description: string }[];
    }
  | {
      kind: "processVertical";
      chapter: { number: number; label: string };
      heading: string;
      steps: { step: string; title: string; desc: string }[];
    }
  | {
      kind: "approach";
      chapter: { number: number; label: string };
      heading: string;
      items: { title: string; desc: string }[];
    }
  | {
      kind: "faqs";
      heading?: string;
      chapter?: { number: number; label: string };
      items: FAQ[];
    };

export type ServiceContent = {
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
  };
  hero: {
    title: ReactNode;
    lede: string;
  };
  blocks: ServiceBlock[];
  related: {
    ids: string[];
    chapterNumber: number;
    heading: string;
    eyebrow: string;
  };
};

export const services: Record<string, ServiceContent> = {
  "web-design": {
    seo: {
      title: "Web Design Orlando | Custom Websites | ProjGrowth",
      description:
        "Professional web design services in Orlando. We create custom, mobile-responsive websites that look stunning and convert visitors into customers. Free consultation available.",
      keywords:
        "web design Orlando, custom website Orlando, responsive web design, Orlando web developer, website design Central Florida",
      canonical: "/services/web-design",
    },
    hero: {
      title: <>Web Design Services in Orlando</>,
      lede:
        "We create stunning, high-performance websites that help Orlando businesses stand out, engage visitors, and drive conversions. From small business sites to complex web applications, we deliver digital experiences that work.",
    },
    blocks: [
      {
        kind: "benefits",
        chapter: { number: 2, label: "Highlights" },
        items: [
          { icon: Monitor, title: "Custom Design", desc: "Unique to your brand" },
          { icon: Smartphone, title: "Mobile-First", desc: "Perfect on every device" },
          { icon: Zap, title: "Lightning Fast", desc: "Optimized performance" },
          { icon: Shield, title: "Secure & Reliable", desc: "Built to last" },
        ],
      },
      {
        kind: "processHorizontal",
        chapter: { number: 3, label: "Process" },
        heading: "Our Web Design Process",
        steps: [
          { step: "01", title: "Discovery", description: "We dive deep into your business goals, target audience, and competitive landscape to create a strategic foundation." },
          { step: "02", title: "Design", description: "Our designers craft beautiful, user-centered interfaces that align with your brand and convert visitors." },
          { step: "03", title: "Development", description: "We build your site using modern technologies ensuring fast load times, security, and scalability." },
          { step: "04", title: "Launch", description: "After thorough testing, we launch your site and provide training so you can manage content with confidence." },
        ],
      },
      {
        kind: "checklist",
        chapter: { number: 4, label: "Capabilities" },
        heading: "What's Included",
        items: [
          "Custom responsive design",
          "Mobile-first approach",
          "SEO-optimized structure",
          "Fast loading speeds",
          "CMS integration",
          "Security best practices",
          "Accessibility compliance",
          "Analytics setup",
          "Performance optimization",
          "Cross-browser compatibility",
        ],
      },
      {
        kind: "faqs",
        chapter: { number: 5, label: "Questions" },
        heading: "Frequently Asked Questions",
        items: [
          { question: "How much does web design cost in Orlando?", answer: "Web design costs vary based on project scope. Basic websites start around $3,000-$5,000, while custom websites with advanced functionality range from $8,000-$25,000+. Contact us for a personalized quote based on your specific needs." },
          { question: "How long does it take to build a website?", answer: "Most websites take 4-8 weeks from kickoff to launch. Simple sites may be faster, while complex projects with custom functionality can take 10-12 weeks. We'll provide a detailed timeline during our initial consultation." },
          { question: "Do you work with businesses outside Orlando?", answer: "Yes! While we're based in Orlando and love working with Central Florida businesses, we serve clients throughout Florida and nationwide. Our process works seamlessly for remote collaboration." },
          { question: "Will my website work on mobile devices?", answer: "Absolutely. Every website we build is fully responsive and optimized for all devices—phones, tablets, laptops, and desktops. We use a mobile-first approach to ensure the best experience for all users." },
          { question: "Can I update the website myself after launch?", answer: "Yes! We build sites with user-friendly content management systems (CMS) and provide training so you can easily update text, images, and add new pages without technical knowledge." },
        ],
      },
    ],
    related: {
      ids: ["custom-dinks", "fritzler-law"],
      chapterNumber: 6,
      heading: "Web Work, Recently Shipped",
      eyebrow: "A few sites we've designed and built.",
    },
  },
  branding: {
    seo: {
      title: "Branding Agency Orlando | Brand Identity Design | ProjGrowth",
      description:
        "Orlando branding agency creating powerful brand identities. Logo design, brand strategy, visual identity systems that make your business memorable. Schedule a discovery call.",
      keywords:
        "branding agency Orlando, logo design Orlando, brand identity Orlando, brand strategy Florida, visual identity design",
      canonical: "/services/branding",
    },
    hero: {
      title: <>Orlando Branding &amp; Identity Design</>,
      lede:
        "Your brand is more than a logo—it's the complete experience people have with your business. We create strategic brand identities that differentiate Orlando businesses and build lasting connections with customers.",
    },
    blocks: [
      {
        kind: "capabilities",
        chapter: { number: 2, label: "Capabilities" },
        heading: "Our Branding Services",
        items: [
          { icon: Target, title: "Brand Strategy", description: "Define your brand positioning, values, voice, and messaging framework that guides all communications." },
          { icon: Palette, title: "Logo Design", description: "Create a distinctive, memorable logo that captures your brand essence and works across all applications." },
          { icon: Eye, title: "Visual Identity", description: "Develop a complete visual system including colors, typography, imagery style, and design elements." },
          { icon: BookOpen, title: "Brand Guidelines", description: "Document your brand standards in a comprehensive guide ensuring consistent application." },
        ],
      },
      {
        kind: "checklist",
        chapter: { number: 3, label: "Deliverables" },
        heading: "What You'll Receive",
        items: [
          "Brand strategy document",
          "Primary & secondary logos",
          "Color palette (digital & print)",
          "Typography system",
          "Business card design",
          "Social media templates",
          "Email signature",
          "Letterhead & stationery",
          "Brand guidelines PDF",
          "Asset files (all formats)",
        ],
      },
      {
        kind: "processVertical",
        chapter: { number: 4, label: "Process" },
        heading: "Our Branding Process",
        steps: [
          { step: "01", title: "Discovery & Research", desc: "We immerse ourselves in your business, audience, competitors, and market to uncover insights that inform strategy." },
          { step: "02", title: "Strategy Development", desc: "Define your brand positioning, personality, values, and messaging framework that guides all creative decisions." },
          { step: "03", title: "Creative Exploration", desc: "Our designers develop multiple visual directions, exploring concepts that bring your brand strategy to life." },
          { step: "04", title: "Refinement", desc: "Based on your feedback, we refine the chosen direction, perfecting every detail of your brand identity." },
          { step: "05", title: "Delivery", desc: "Receive your complete brand package with all files, guidelines, and templates ready for implementation." },
        ],
      },
      {
        kind: "faqs",
        heading: "Frequently Asked Questions",
        items: [
          { question: "How long does a branding project take?", answer: "A complete brand identity project typically takes 6-10 weeks. This includes discovery, strategy development, design exploration, refinements, and final deliverables. Rush timelines are available for an additional fee." },
          { question: "What's included in brand guidelines?", answer: "Our brand guidelines document covers logo usage rules, color specifications (RGB, CMYK, HEX), typography hierarchy, spacing requirements, do's and don'ts, imagery style, and application examples. It's everything your team needs to maintain brand consistency." },
          { question: "Can you rebrand an existing business?", answer: "Absolutely! We work with businesses on both new brand creation and rebrands. For rebrands, we'll assess what's working, what needs evolution, and develop a strategy that honors your history while positioning you for future growth." },
          { question: "Do you offer logo design only?", answer: "While we can create standalone logos, we recommend a strategic approach that includes at minimum a brand strategy session. This ensures your logo is meaningful, differentiated, and built on solid positioning rather than just aesthetics." },
        ],
      },
    ],
    related: {
      ids: ["smart-financial", "fritzler-law"],
      chapterNumber: 6,
      heading: "Brand Work, Recently Shipped",
      eyebrow: "A few identities we've built and refined.",
    },
  },
  "content-creation": {
    seo: {
      title: "Content Creation Orlando | Content Marketing | ProjGrowth",
      description:
        "Orlando content creation agency delivering strategic content that connects with your audience. Video production, copywriting, social media content, photography services.",
      keywords:
        "content creation Orlando, video production Orlando, copywriting services Florida, social media content, photography Orlando",
      canonical: "/services/content-creation",
    },
    hero: {
      title: <>Content Creation Services in Orlando</>,
      lede:
        "Great content tells your story, builds trust, and drives action. We create compelling content—from words to video to imagery—that helps Orlando businesses connect with their audience and achieve their goals.",
    },
    blocks: [
      {
        kind: "capabilities",
        chapter: { number: 2, label: "Capabilities" },
        heading: "Content Services We Offer",
        items: [
          { icon: PenTool, title: "Copywriting", description: "Compelling website copy, blog posts, email campaigns, and marketing materials that connect with your audience." },
          { icon: Video, title: "Video Production", description: "From concept to final cut—promotional videos, social content, testimonials, and brand films." },
          { icon: Camera, title: "Photography", description: "Professional product photography, headshots, lifestyle images, and event coverage for your brand." },
          { icon: Share2, title: "Social Media Content", description: "Scroll-stopping graphics, reels, stories, and content calendars that grow your following." },
        ],
      },
      {
        kind: "checklist",
        chapter: { number: 3, label: "Deliverables" },
        heading: "What We Create",
        items: [
          "Website copywriting",
          "Blog post creation",
          "Email marketing content",
          "Social media graphics",
          "Video scripts",
          "Promotional videos",
          "Product photography",
          "Brand lifestyle imagery",
          "Content calendars",
          "SEO-optimized articles",
        ],
      },
      {
        kind: "processVertical",
        chapter: { number: 4, label: "Process" },
        heading: "Our Content Creation Process",
        steps: [
          { step: "01", title: "Strategy & Planning", desc: "We define goals, identify your audience, and create a content strategy that supports your business objectives." },
          { step: "02", title: "Creative Development", desc: "Our team develops concepts, scripts, and outlines. You'll approve the direction before we move to production." },
          { step: "03", title: "Production", desc: "Whether it's writing, filming, or photography—we execute with attention to detail and brand consistency." },
          { step: "04", title: "Review & Refinement", desc: "You review drafts and provide feedback. We refine until it's exactly right." },
          { step: "05", title: "Delivery & Distribution", desc: "Receive final assets optimized for all platforms, plus guidance on best practices for publishing." },
        ],
      },
      {
        kind: "faqs",
        heading: "Frequently Asked Questions",
        items: [
          { question: "How do you ensure content matches our brand voice?", answer: "We start every project with a brand immersion session to understand your voice, tone, and messaging. We'll review existing materials, interview key stakeholders, and create a style guide if needed. All content is reviewed and refined based on your feedback before finalization." },
          { question: "Do you offer ongoing content services?", answer: "Yes! Many clients work with us on monthly retainers for consistent content creation—blog posts, social media management, video series, and more. We'll create a content calendar and maintain a steady flow of quality content." },
          { question: "What video equipment and style do you use?", answer: "We use professional cinema cameras and lighting equipment. Our style ranges from polished corporate to authentic documentary—we'll match the approach to your brand and goals. All videos are delivered in formats optimized for your intended platforms." },
          { question: "Can you help with content strategy, not just creation?", answer: "Absolutely. We often start with content strategy—identifying your audience, mapping the customer journey, and developing a content plan that supports your business goals. Great content starts with great strategy." },
        ],
      },
    ],
    related: {
      ids: ["gfg-solutions", "real-thread"],
      chapterNumber: 6,
      heading: "Content Work, Recently Shipped",
      eyebrow: "A few content systems we've built and produced.",
    },
  },
  "digital-marketing": {
    seo: {
      title: "Digital Marketing Orlando | Marketing Strategy | ProjGrowth",
      description:
        "Full-service digital marketing agency in Orlando. SEO, social media marketing, email campaigns, and paid advertising strategies that deliver measurable ROI.",
      keywords:
        "digital marketing Orlando, SEO Orlando, social media marketing Florida, email marketing, PPC advertising Orlando",
      canonical: "/services/digital-marketing",
    },
    hero: {
      title: <>Digital Marketing Services in Orlando</>,
      lede:
        "Drive growth with data-driven digital marketing strategies. We help Orlando businesses reach their ideal customers, generate leads, and increase revenue through SEO, paid advertising, social media, and email marketing.",
    },
    blocks: [
      {
        kind: "capabilities",
        chapter: { number: 2, label: "Capabilities" },
        heading: "Our Digital Marketing Services",
        numbered: true,
        items: [
          { title: "SEO Services", description: "Improve your search rankings and drive organic traffic with technical SEO, content optimization, and link building." },
          { title: "Social Media Marketing", description: "Build your community and engage audiences across platforms with strategic content and community management." },
          { title: "Email Marketing", description: "Nurture leads and drive conversions with targeted email campaigns, automations, and newsletter strategies." },
          { title: "Paid Advertising", description: "Reach your ideal customers through Google Ads, Meta Ads, and other paid channels with data-driven campaigns." },
        ],
      },
      {
        kind: "approach",
        chapter: { number: 3, label: "Approach" },
        heading: "Our Approach",
        items: [
          { title: "Data-Driven", desc: "Every decision backed by analytics. We track, measure, and optimize based on real performance data." },
          { title: "Results-Focused", desc: "We're obsessed with ROI. Our strategies are designed to deliver measurable business outcomes." },
          { title: "Transparent", desc: "Clear reporting, honest communication, and full visibility into what's working and what's not." },
        ],
      },
      {
        kind: "checklist",
        chapter: { number: 4, label: "Deliverables" },
        heading: "What's Included",
        items: [
          "Marketing strategy & roadmap",
          "SEO audit & optimization",
          "Google Ads management",
          "Social media advertising",
          "Email campaign creation",
          "Marketing automation setup",
          "Analytics & reporting",
          "Conversion rate optimization",
          "Competitor analysis",
          "Monthly performance reviews",
        ],
      },
      {
        kind: "faqs",
        heading: "Frequently Asked Questions",
        items: [
          { question: "How long until I see results from digital marketing?", answer: "Results timelines vary by channel. Paid advertising can show results within days-weeks. SEO typically takes 3-6 months to see significant organic traffic gains. Email marketing results depend on list size and engagement. We set realistic expectations and track progress monthly." },
          { question: "What's your approach to measuring ROI?", answer: "We establish clear KPIs at project start—traffic, leads, conversions, revenue. We implement proper tracking, create dashboards for real-time visibility, and provide monthly reports showing performance against goals and ROI calculations." },
          { question: "Do you offer marketing retainer packages?", answer: "Yes! Most clients work with us on monthly retainers that include strategy, execution, and optimization across channels. Packages are customized based on your goals, budget, and needed services. We can also do project-based work for specific campaigns." },
          { question: "Can you work with our existing marketing team?", answer: "Absolutely. We often collaborate with in-house teams, filling gaps in expertise or capacity. We can handle specific channels, provide strategic guidance, or take over full execution—whatever configuration works best for your organization." },
        ],
      },
    ],
    related: {
      ids: ["gfg-solutions", "diverse-wealth"],
      chapterNumber: 6,
      heading: "Marketing Work, Recently Shipped",
      eyebrow: "A few growth engines we've built and run.",
    },
  },
};
