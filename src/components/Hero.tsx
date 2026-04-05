import { CaretRight, ShieldCheck, Lightning, TreeStructure } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export const Hero = () => {
  const handleScrollToShop = () => {
    const shopSection = document.getElementById("shop");
    shopSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] pt-32 pb-24 px-4 overflow-hidden flex items-center bg-[#F9FAFB] dark:bg-[#121910] transition-colors duration-300">
      
      {/* Noise overlay and Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-80" />
      <div className="noise-overlay" />
      
      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Typography */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-6xl md:text-[5.5rem] font-bold mb-6 text-slate-900 dark:text-white leading-[1.05] tracking-tighter">
                O SEU SETUP
                <br />
                <span className="text-primary italic opacity-90 inline-block -ml-2">PROFISSIONAL.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-600 dark:text-slate-400 max-w-lg mb-10 text-lg leading-relaxed font-sans"
            >
              Performance, ergonomia e design tático desenvolvidos para transformar e elevar o seu workspace a um novo padrão.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScrollToShop}
                className="bg-primary text-slate-950 px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(172,200,162,0.3)] hover:shadow-[0_0_30px_rgba(172,200,162,0.5)]"
              >
                Ver Equipamentos <CaretRight weight="bold" size={18} />
              </motion.button>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-widest ml-4 hidden sm:block">
                Coleção 2026
              </span>
            </motion.div>
          </div>

          {/* Right Side: Asymmetric Abstract Visuals (Bento Style) */}
          <div className="md:col-span-5 h-[500px] w-full relative hidden md:block">
             <motion.div 
               initial={{ opacity: 0, x: 40 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
               className="absolute top-10 right-0 w-full h-[320px] rounded-[2.5rem] bg-surface dark:bg-[#1A2517] overflow-hidden border border-slate-200/50 dark:border-white/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
             >
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
               <div className="p-8 h-full flex flex-col justify-between relative z-10 glass-panel border-none shadow-none">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Lightning size={24} weight="duotone" className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-2xl mb-1">Engenharia Premium</h3>
                    <p className="text-slate-300 text-sm">Materiais selecionados para durabilidade extrema.</p>
                  </div>
               </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
               className="absolute bottom-10 left-[-40px] w-[260px] p-6 rounded-[2rem] bg-white dark:bg-black/40 border border-slate-200/80 dark:border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] backdrop-blur-md"
             >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                    <ShieldCheck size={20} weight="fill" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Qualidade</p>
                    <p className="font-bold text-slate-900 dark:text-white leading-none">Garantia Atru</p>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                     className="h-full bg-primary rounded-full" 
                   />
                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
