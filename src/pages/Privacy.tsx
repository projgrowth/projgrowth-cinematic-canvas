/**
 * Privacy Policy Page
 * 
 * PLACEHOLDER CONTENT - Replace with your actual privacy policy before going live.
 * Consider consulting a legal professional for compliance with GDPR, CCPA, etc.
 */

import Layout from "@/components/Layout";

const Privacy = () => {
  return (
    <Layout
      seoTitle="Privacy Policy - ProjGrowth"
      seoDescription="Learn how ProjGrowth collects, uses, and protects your personal information."
      seoKeywords="privacy policy, data protection, personal information"
      canonicalUrl="/privacy"
    >
      <section className="container-site py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl lg:text-7xl text-text mb-6 animate-fade-in">
            Privacy Policy
          </h1>
          <p className="text-mute mb-12">Last updated: December 2024</p>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* PLACEHOLDER: Replace all content below with your actual privacy policy */}
            
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-text">1. Information We Collect</h2>
              <p className="text-mute leading-relaxed">
                We collect information you provide directly to us, such as when you fill out a contact form, 
                subscribe to our newsletter, or communicate with us. This may include your name, email address, 
                and any message content you provide.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-text">2. How We Use Your Information</h2>
              <p className="text-mute leading-relaxed">
                We use the information we collect to respond to your inquiries, provide our services, 
                send you marketing communications (with your consent), and improve our website and services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-text">3. Information Sharing</h2>
              <p className="text-mute leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as necessary to provide our services or as required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-text">4. Data Security</h2>
              <p className="text-mute leading-relaxed">
                We implement appropriate security measures to protect your personal information. 
                However, no method of transmission over the Internet is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-text">5. Cookies</h2>
              <p className="text-mute leading-relaxed">
                We may use cookies and similar tracking technologies to enhance your experience on our website. 
                You can control cookies through your browser settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-text">6. Your Rights</h2>
              <p className="text-mute leading-relaxed">
                You have the right to access, correct, or delete your personal information. 
                To exercise these rights, please contact us using the information below.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-text">7. Contact Us</h2>
              <p className="text-mute leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:hello@projgrowth.com" className="text-accent hover:underline">
                  hello@projgrowth.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
