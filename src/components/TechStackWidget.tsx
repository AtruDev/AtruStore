import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, X } from 'lucide-react';

export const TechStackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const techs = [
    { name: 'React 18', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { name: 'Vite', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    { name: 'Tailwind CSS', color: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
    { name: 'TypeScript', color: 'bg-blue-600/10 text-blue-500 border-blue-600/20' },
    { name: 'Framer Motion', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
    { name: 'Context API', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  ];

  return (
    <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-2xl p-5 w-72 mb-2 backdrop-blur-xl transition-colors duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-slate-900 dark:text-white font-bold font-display tracking-wider">
                Tech Stack 🚀
              </h4>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-sans leading-relaxed transition-colors">
              Este projeto de portfólio foi construído com as seguintes tecnologias:
            </p>
            
            <div className="flex flex-wrap gap-2">
              {techs.map((tech) => (
                 <span 
                   key={tech.name} 
                   className={`px-3 py-1 text-xs font-bold rounded-full border ${tech.color}`}
                 >
                   {tech.name}
                 </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-primary dark:hover:border-primary text-primary p-3.5 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-colors group flex items-center justify-center opacity-80 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        aria-label="Sobre o Projeto"
      >
        <Code size={24} className={isOpen ? "rotate-90 transition-transform" : "transition-transform"} />
      </motion.button>
    </div>
  );
};
