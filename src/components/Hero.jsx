import { ArrowRight } from 'lucide-react';
export const Hero = () => (
  <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-slate-900 to-slate-800 text-center">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Setup <span className="text-primary">Profissional</span></h1>
    <h1>Zezao gay</h1>
    <p className="text-slate-400 max-w-2xl mx-auto mb-8">Performance e design para o seu workspace.</p>
    <button onClick={() => document.getElementById('shop').scrollIntoView()} className="bg-primary hover:bg-emerald-600 text-slate-900 px-8 py-3 rounded-full font-bold inline-flex items-center gap-2">Ver Produtos <ArrowRight size={18}/></button>
  </section>
);