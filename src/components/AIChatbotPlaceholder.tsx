import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageCircle } from "lucide-react";

const AIChatbotPlaceholder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-accent text-base rounded-full shadow-lg hover:bg-accent/90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ask our AI assistant"
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-base/80 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 right-6 z-50 w-80 bg-surface border border-line rounded-xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-line">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">AI Assistant</h3>
                    <span className="text-xs text-muted">Coming Soon</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <MessageCircle className="w-8 h-8 text-accent" />
                  </motion.div>
                </div>

                <h4 className="font-medium text-foreground mb-2">
                  Our AI is learning
                </h4>
                <p className="text-sm text-muted mb-6">
                  Our AI assistant is currently being trained on your business. 
                  For now, fill out the form or reach out directly.
                </p>

                <a
                  href="mailto:info@projgrowth.com"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent hover:underline"
                >
                  Email us directly
                </a>
              </div>

              {/* Fake input */}
              <div className="p-4 border-t border-line">
                <div className="flex items-center gap-2 px-4 py-3 bg-base/50 rounded-lg border border-line/50">
                  <input
                    type="text"
                    placeholder="Ask a question..."
                    disabled
                    className="flex-1 bg-transparent text-sm text-muted placeholder:text-muted/50 focus:outline-none cursor-not-allowed"
                  />
                  <button
                    disabled
                    className="p-2 text-muted/50 cursor-not-allowed"
                  >
                    <Bot className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbotPlaceholder;
