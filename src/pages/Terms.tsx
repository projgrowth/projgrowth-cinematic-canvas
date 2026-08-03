/**
 * Terms of Service Page
 *
 * Legal copy should be reviewed by counsel before any material change.
 */

import { Section } from "@/components/ui/section";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const Terms = () => {
  return (
    <Layout
      seoTitle="Terms of Service - ProjGrowth"
      seoDescription="Read our terms of service to understand your rights and responsibilities when using ProjGrowth services."
      seoKeywords="terms of service, terms and conditions, user agreement"
      canonicalUrl="/terms"
    >
      <Section>
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8">
            <PageHero
              chapter={{ number: 2, label: "Legal" }}
              title="Terms of Service"
              lede="The rights and responsibilities that apply when you use our site and services."
              status={<p className="eyebrow-mute">Last updated: December 2024</p>}
              className="mb-12"
            />

            <div className="space-y-0">
              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">1. Acceptance of Terms</h2>
                <p className="text-mute">
                  By accessing and using this website, you accept and agree to be bound by the terms and 
                  provisions of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">2. Services</h2>
                <p className="text-mute">
                  ProjGrowth provides digital design, development, and creative services. 
                  The specific deliverables, timelines, and pricing for any engagement will be outlined 
                  in a separate project agreement or statement of work.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">3. Intellectual Property</h2>
                <p className="text-mute">
                  All content on this website, including text, graphics, logos, and images, is the property 
                  of ProjGrowth and is protected by copyright laws. For client projects, intellectual property 
                  rights will be defined in the project agreement.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">4. User Conduct</h2>
                <p className="text-mute">
                  You agree not to use our website or services for any unlawful purpose or in any way that 
                  could damage, disable, or impair our services. You also agree not to attempt to gain 
                  unauthorized access to any part of our systems.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">5. Limitation of Liability</h2>
                <p className="text-mute">
                  ProjGrowth shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages arising out of your use of our website or services. Our total liability 
                  shall not exceed the amount paid for the specific service in question.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">6. Modifications</h2>
                <p className="text-mute">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately 
                  upon posting to this page. Your continued use of our services after any changes indicates 
                  your acceptance of the modified terms.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">7. Governing Law</h2>
                <p className="text-mute">
                  These terms shall be governed by and construed in accordance with the laws of the jurisdiction 
                  in which ProjGrowth operates, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="py-8 border-t border-line">
                <h2 className="text-text mb-4">8. Contact</h2>
                <p className="text-mute">
                  For any questions regarding these terms, please contact us at{" "}
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

export default Terms;
