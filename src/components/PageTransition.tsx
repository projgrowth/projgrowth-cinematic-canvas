import { motion } from "framer-motion";
import { ReactNode } from "react";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const transition = { duration: 0.2, ease: "easeInOut" as const };

const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div initial="initial" animate="animate" exit="exit" variants={variants} transition={transition}>
    {children}
  </motion.div>
);

export default PageTransition;