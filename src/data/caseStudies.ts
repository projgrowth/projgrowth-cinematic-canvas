export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  categories: string[];
  subtitle: string;
  whatTheyDo: string;
  theirIssues: string[];
  howWeHelped: string[];
  whyItMatters: string;
  image: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "gfg-solutions",
    title: "GFG Solutions",
    category: "Content Systems",
    categories: ["Content Systems", "Web & Product", "Brand & Messaging"],
    subtitle: "A complete tax-education content ecosystem",
    whatTheyDo: "A strategy and tax-planning firm serving growth-stage business owners.",
    theirIssues: [
      "Tax concepts were complex and difficult to explain",
      "Content cadence wasn't consistent or structured",
      "No unified system for topics, filming, and distribution",
      "Educational assets lacked a cohesive visual language"
    ],
    howWeHelped: [
      "Built a cinematic short-form content engine",
      "Designed clean visual frameworks for tax education",
      "Created funnels, lead magnets, and downloadables",
      "Developed a Notion dashboard that runs the entire content workflow",
      "Prototyped a self-guided tax strategy product"
    ],
    whyItMatters: "Clearer communication, stronger authority, and a reusable system that compounds every month.",
    image: "/case-gfg.jpg"
  },
  {
    id: "smart-financial",
    title: "Smart Financial Planning",
    category: "Brand & Messaging",
    categories: ["Brand & Messaging", "Content Systems", "Web & Product"],
    subtitle: "A clarity-first brand and content system",
    whatTheyDo: "A modern, planning-focused wealth advisory firm.",
    theirIssues: [
      "Brand voice didn't match their sophistication",
      "Content lacked cohesion and clear direction",
      "Seminars needed stronger visual support",
      "Website no longer reflected their value"
    ],
    howWeHelped: [
      "Rebuilt their messaging and positioning framework",
      "Built a monthly structured filming system",
      "Created a signature 3D reel-cover visual identity",
      "Designed seminar + workshop content assets",
      "Rebuilt website with a clean, trust-forward aesthetic"
    ],
    whyItMatters: "High-clarity messaging + consistent visuals = lower friction and stronger conversion paths.",
    image: "/case-smartfinancial.jpg"
  },
  {
    id: "real-thread",
    title: "Real Thread",
    category: "Cinematic Production",
    categories: ["Cinematic Production", "Content Systems"],
    subtitle: "Manufacturing turned into modern storytelling",
    whatTheyDo: "A B-Corp apparel manufacturer with a focus on premium custom printing.",
    theirIssues: [
      "Needed more dynamic ways to showcase production quality",
      "Existing visuals didn't communicate craftsmanship",
      "Social content lacked narrative continuity"
    ],
    howWeHelped: [
      "Built a monthly on-site cinematic filming pipeline",
      "Developed a cohesive story language around process and craft",
      "Created repeatable, high-output production workflows",
      "Delivered product and process-focused reels"
    ],
    whyItMatters: "Authentic storytelling builds loyalty, trust, and long-term brand equity.",
    image: "/case-realthread.jpg"
  },
  {
    id: "victoria-jewelers",
    title: "Victoria Jewelers",
    category: "Cinematic Production",
    categories: ["Cinematic Production"],
    subtitle: "Premium product cinematics for boutique retail",
    whatTheyDo: "A legacy luxury jeweler offering designer and custom pieces.",
    theirIssues: [
      "Product visuals felt static and commercial",
      "Luxury experience wasn't translating digitally",
      "Needed higher-end storytelling"
    ],
    howWeHelped: [
      "Produced premium product cinematics",
      "Captured in-store and event visuals",
      "Created consistent, detail-focused luxury storytelling"
    ],
    whyItMatters: "Luxury is sold through detail. Stronger visuals directly raise perceived value.",
    image: "/case-victoria.jpg"
  },
  {
    id: "diverse-wealth",
    title: "Diverse Wealth",
    category: "Content Systems",
    categories: ["Content Systems"],
    subtitle: "Consistent advisor-focused content engine",
    whatTheyDo: "A planning-forward wealth firm serving professionals and pre-retirees.",
    theirIssues: [
      "Advisors weren't visible or differentiated",
      "Social presence felt inconsistent",
      "No structured workflow for recurring content"
    ],
    howWeHelped: [
      "Monthly filming cadence",
      "Advisor-driven educational reels",
      "Team-centric visual approach",
      "Built a clean, repeatable publishing system"
    ],
    whyItMatters: "Consistent visibility builds trust before the first meeting.",
    image: "/case-diversewealth.jpg"
  },
  {
    id: "windermere-team",
    title: "Windermere Team",
    category: "Content Systems",
    categories: ["Content Systems"],
    subtitle: "Humanized advisor stories at scale",
    whatTheyDo: "A large advisor team with strong culture and active clientele.",
    theirIssues: [
      "Needed a modern way to highlight individual advisors",
      "Content creation lacked structure",
      "Digital presence wasn't cohesive"
    ],
    howWeHelped: [
      "Recurring cinematic filming",
      "Advisor profile mini-stories",
      "Replicable monthly production workflow"
    ],
    whyItMatters: "Human connection accelerates prospect trust and drives inbound.",
    image: "/case-windermere.jpg"
  },
  {
    id: "custom-dinks",
    title: "Custom Dinks",
    category: "Web & Product",
    categories: ["Web & Product"],
    subtitle: "A fully interactive paddle customization platform",
    whatTheyDo: "A customizable pickleball paddle brand.",
    theirIssues: [
      "Needed a premium digital experience",
      "Customization was difficult to express visually",
      "No 3D product infrastructure"
    ],
    howWeHelped: [
      "Built Shopify website",
      "Integrated 3D Angle3D configurator",
      "Designed product visuals and brand assets",
      "Structured a smooth customization flow"
    ],
    whyItMatters: "Interactive customization increases engagement and purchase intent.",
    image: "/case-customdinks.jpg"
  },
  {
    id: "florida-private",
    title: "Florida Private Providers",
    category: "AI & Tools",
    categories: ["AI & Tools", "Web & Product"],
    subtitle: "A modern approach to plan review",
    whatTheyDo: "A construction and compliance firm reviewing building plans.",
    theirIssues: [
      "Manual review was slow and repetitive",
      "Needed county-specific code logic in a usable system",
      "Clients needed a digital upload and tracking workflow"
    ],
    howWeHelped: [
      "Designed an AI-assisted plan review tool",
      "Built a county-by-county code engine",
      "Structured a client portal framework",
      "Designed modern, minimal UI layouts"
    ],
    whyItMatters: "Faster reviews, fewer errors, and a foundation for a scalable internal tool.",
    image: "/case-floridaprivate.jpg"
  },
  {
    id: "fritzler-law",
    title: "Fritzler Law",
    category: "Web & Product",
    categories: ["Web & Product", "Brand & Messaging"],
    subtitle: "A modern, credibility-first legal website",
    whatTheyDo: "A Florida-based law practice specializing in estate planning, probate, and business law.",
    theirIssues: [
      "Website felt outdated and didn't reflect expertise",
      "Service pages were unclear and hard to navigate",
      "No strong digital trust signals",
      "Consultation pathways weren't intuitive"
    ],
    howWeHelped: [
      "Built a modern, clean, trust-forward website",
      "Simplified navigation and service pathways",
      "Designed premium legal visuals",
      "Implemented a clear inquiry structure"
    ],
    whyItMatters: "Professional services rely on trust. A modern, authoritative site shortens the decision cycle.",
    image: "/case-fritzler.jpg"
  }
];

export const categories = ["All", "Content Systems", "Web & Product", "Brand & Messaging", "Cinematic Production", "AI & Tools"];
