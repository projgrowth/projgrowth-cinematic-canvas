import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Section } from "@/components/ui/section";
import PageHero from "@/components/PageHero";

const quickLinks = [
  { path: "/work", label: "Work" },
  { path: "/services", label: "Services" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const NotFound = () => {
  return (
    <Layout noindex hideBreadcrumbs>
      <Section size="hero" glow>
        <PageHero
          chapter={{ number: 404, label: "Not Found" }}
          title="This page doesn't exist"
          lede="The link may be outdated or the page has moved. Here's the way back."
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/" className="btn-solid">
              Back to home
            </Link>
            <Link to="/work" className="btn-outline-cta">
              View our work
            </Link>
          </div>
        </PageHero>
      </Section>

      <Section size="sm">
        <hr className="rule mb-8" />
        <p className="eyebrow-mute mb-4">Quick links</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {quickLinks.map((link) => (
            <Link key={link.path} to={link.path} className="link-underline text-mute">
              {link.label}
            </Link>
          ))}
        </div>
      </Section>
    </Layout>
  );
};

export default NotFound;
