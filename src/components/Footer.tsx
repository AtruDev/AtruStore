import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 pt-16 pb-8 px-4 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-black font-display tracking-widest text-slate-900 dark:text-white">
              ATRUSTORE
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-sans transition-colors">
            Projeto de portfólio front-end focado na criação de uma interface de e-commerce premium com performance otimizada, design fluido e boa lógica de negócios.
          </p>
        </div>

        {/* Links Sociais (Reais) */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="text-slate-900 dark:text-white font-bold mb-4 font-display tracking-widest text-sm uppercase">Conecte-se comigo</h4>
          <div className="flex gap-4">
            <a 
              href="https://github.com/AtruDev" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800 transition-all hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              aria-label="GitHub"
            >
              <GithubLogo size={20} weight="fill" />
            </a>
            <a 
              href="https://www.linkedin.com/in/arthur-ribeiro-3186852b2" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={20} weight="fill" />
            </a>
            <a 
              href="mailto:atrubr@gmail.com" 
              className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 dark:hover:border-primary/50 hover:bg-white dark:hover:bg-slate-800 transition-all hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              aria-label="Email"
            >
              <EnvelopeSimple size={20} weight="fill" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-xs font-sans">
          &copy; {new Date().getFullYear()} Desenvolvido por <span className="text-slate-700 dark:text-slate-300 font-bold">Você</span>. Todos os direitos reservados.
        </p>
        <p className="text-slate-400 dark:text-slate-600 text-[10px] uppercase font-bold tracking-widest">
          React • Tailwind • Framer Motion
        </p>
      </div>
    </footer>
  );
};
