import Layout from "@/components/Layout";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <section className="container-site py-24">
        <div className="grid-12 gap-y-12">
          {/* Header */}
          <div className="col-span-12 lg:col-span-6">
            <h1 className="font-display text-5xl lg:text-7xl text-text mb-6">
              Let's Work
              <br />
              <span className="text-accent">Together</span>
            </h1>
            <p className="text-xl text-mute">
              Have a project in mind? We'd love to hear about it. 
              Drop us a line and let's start a conversation.
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="stack gap-8">
              <div className="p-8 bg-surface rounded-lg border border-line">
                <Mail className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-display text-xl text-text mb-2">Email Us</h3>
                <a 
                  href="mailto:hello@projgrowth.com" 
                  className="text-mute hover:text-accent transition-colors duration-sm ease-smooth"
                >
                  hello@projgrowth.com
                </a>
              </div>

              <div className="p-8 bg-surface rounded-lg border border-line">
                <MessageSquare className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-display text-xl text-text mb-2">Start a Chat</h3>
                <p className="text-mute">Available Mon-Fri, 9am-6pm EST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-20 py-16 border-t border-line">
          <form className="grid-12 gap-y-6">
            <div className="col-span-12 lg:col-span-6">
              <label className="block text-sm font-medium text-mute mb-2">
                Name
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 bg-surface border border-line rounded-md text-text placeholder:text-mute focus:outline-none focus:border-accent transition-colors duration-sm ease-smooth"
                placeholder="Your name"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <label className="block text-sm font-medium text-mute mb-2">
                Email
              </label>
              <input 
                type="email"
                className="w-full px-4 py-3 bg-surface border border-line rounded-md text-text placeholder:text-mute focus:outline-none focus:border-accent transition-colors duration-sm ease-smooth"
                placeholder="your@email.com"
              />
            </div>

            <div className="col-span-12">
              <label className="block text-sm font-medium text-mute mb-2">
                Project Details
              </label>
              <textarea 
                rows={6}
                className="w-full px-4 py-3 bg-surface border border-line rounded-md text-text placeholder:text-mute focus:outline-none focus:border-accent transition-colors duration-sm ease-smooth resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <div className="col-span-12">
              <button 
                type="submit"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-base rounded-md font-medium transition-all duration-sm ease-smooth hover:bg-accent/90 hover:gap-3"
              >
                Send Message
                <ArrowRight className="w-5 h-5 transition-transform duration-sm ease-smooth group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
