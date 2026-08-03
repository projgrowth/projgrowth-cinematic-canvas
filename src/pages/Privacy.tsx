/**
 * Privacy Policy Page
 *
 * Legal copy should be reviewed by counsel before any material change.
 */

import { Section } from "@/components/ui/section";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const Privacy = () => {
  return (
    <Layout
      seoTitle="Privacy Policy - ProjGrowth"
      seoDescription="Learn how ProjGrowth collects, uses, and protects your personal information."
      seoKeywords="privacy policy, data protection, personal information"
      canonicalUrl="/privacy"
    >
      <Section>
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8">
            <PageHero
              chapter={{ number: 1, label: "Legal" }}
              title="Privacy Policy"
              lede="How we collect, use, and protect the information you share with us."
              status={<p className="eyebrow-mute">Last updated: December 2024</p>}
              className="mb-12"
            />

            <div className="space-y-0">
              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">1. Information We Collect</h2>
                <p className="text-mute">
                  We collect information you provide directly to us, such as when you fill out a contact form, 
                  subscribe to our newsletter, or communicate with us. This may include your name, email address, 
                  and any message content you provide.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">2. How We Use Your Information</h2>
                <p className="text-mute">
                  We use the information we collect to respond to your inquiries, provide our services, 
                  send you marketing communications (with your consent), and improve our website and services.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">3. Information Sharing</h2>
                <p className="text-mute">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as necessary to provide our services or as required by law.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">4. Data Security</h2>
                <p className="text-mute">
                  We implement appropriate security measures to protect your personal information. 
                  However, no method of transmission over the Internet is 100% secure, and we cannot 
                  guarantee absolute security.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">5. Cookies</h2>
                <p className="text-mute">
                  We may use cookies and similar tracking technologies to enhance your experience on our website. 
                  You can control cookies through your browser settings.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">6. Your Rights</h2>
                <p className="text-mute">
                  You have the right to access, correct, or delete your personal information. 
                  To exercise these rights, please contact us using the information below.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">7. Contact Us</h2>
                <p className="text-mute">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:info@projgrowth.com" className="text-accent hover:underline">
                    info@projgrowth.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Privacy;
