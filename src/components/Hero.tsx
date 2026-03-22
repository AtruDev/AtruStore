import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  const handleScrollToShop = () => {
    const shopSection = document.getElementById("shop");
    shopSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-24 px-4 overflow-hidden text-center bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200 via-slate-100 to-slate-100 dark:from-slate-800 dark:via-slate-950 dark:to-slate-950 opacity-80" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 dark:bg-primary/10 blur-3xl rounded-full pointer-events-none transform-gpu will-change-transform" />
      
      <div className="relative max-w-4xl mx-auto z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white leading-tight tracking-wide transition-colors"
        >
          SETUP <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-primary dark:to-emerald-400">PROFISSIONAL</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed font-sans transition-colors"
        >
          Performance e design tático para o seu workspace.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScrollToShop}
          className="bg-primary hover:bg-emerald-600 text-slate-900 px-8 py-3.5 rounded-full font-bold inline-flex items-center gap-2 transition-colors shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
        >
          Ver Produtos <ArrowRight size={18} />
        </motion.button>
      </div>
    </section>
  );
};
