import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ScrollText = ({ children, align = "left", subtitle }: { children: React.ReactNode, align?: "left" | "right" | "center", subtitle?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.2 0.9", "0.6 0.5"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(10px)", "blur(0px)"]);

  const alignmentClass = 
    align === "center" ? "justify-center text-center mx-auto" : 
    align === "right" ? "justify-end text-right ml-auto" : 
    "justify-start text-left mr-auto";

  return (
    <div ref={ref} className="min-h-[80vh] flex flex-col justify-center px-4 md:px-12 relative w-full">
      <motion.div 
        style={{ opacity, y, filter: blur }} 
        className={`max-w-6xl flex flex-col ${alignmentClass}`}
      >
        {subtitle && (
          <p className="text-primary font-mono tracking-[0.3em] uppercase text-xs md:text-sm mb-6 ml-1">
            {subtitle}
          </p>
        )}
        <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-display font-black leading-[1.05] tracking-tighter text-slate-900 dark:text-white mix-blend-difference z-10 transition-colors">
          {children}
        </h2>
      </motion.div>
    </div>
  );
};

export const Manifesto = () => {
  return (
    <main className="bg-slate-50 dark:bg-[#0A0D0A] transition-colors duration-500 overflow-hidden pt-32 pb-40 relative">
      
      {/* Background Graphic Noise Elements */}
      <div className="absolute top-0 left-0 w-full h-full noise-overlay opacity-50 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/5 dark:bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Título de Entrada Bruto */}
      <div className="min-h-[60vh] flex items-center justify-center px-4 relative">
         <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center"
         >
            <p className="text-slate-400 dark:text-slate-500 font-mono tracking-[0.5em] uppercase text-sm mb-8">Nossa Filosofia</p>
            <h1 className="text-7xl md:text-[10rem] font-display font-black tracking-tighter leading-none text-slate-900 dark:text-white mix-blend-difference cursor-default">
              O SETUP<br/><span className="text-transparent border-text">PERFEITO.</span>
            </h1>
         </motion.div>
         
         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.5, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-slate-400"
         >
            <p className="font-mono text-xs tracking-widest uppercase">Role para Descobrir</p>
            <div className="w-[1px] h-16 bg-gradient-to-b from-slate-400 to-transparent" />
         </motion.div>
      </div>

      {/* Editoriais com Scroll-Telling */}
      <div className="relative z-10 mt-20">
        <ScrollText align="left" subtitle="A Base da Criação">
          A CADEIRA EM QUE VOCÊ SENTA DITA A LÓGICA DO SEU CÓDIGO.
        </ScrollText>

        <ScrollText align="right" subtitle="O Som e o Foco">
          NÃO VENDEMOS FONES. VENDEMOS A CAPACIDADE DE DESAPARECER POR OITO HORAS E CONSTRUIR O FUTURO.
        </ScrollText>

        <div className="relative py-32 w-full flex justify-center">
           <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 1.2 }}
              className="w-full max-w-7xl mx-4 aspect-video rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border-2 border-white/5 shadow-2xl relative"
           >
              <img src="https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=2600&auto=format&fit=crop" alt="Abstract Code Desk" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/40" />
           </motion.div>
        </div>

        <ScrollText align="center" subtitle="Estética é Função">
          TELAS MAIS RÁPIDAS EXIGEM MENTES MAIS AFIADAS.<br/><span className="text-primary italic">ELEVE O SEU PADRÃO.</span>
        </ScrollText>
      </div>

      <style>{`
        .border-text {
          -webkit-text-stroke: 2px currentColor;
          color: transparent;
        }
      `}</style>
    </main>
  );
};
