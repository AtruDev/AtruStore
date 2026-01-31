import { ArrowRight } from 'lucide-react';
export const Hero = () => (
  <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-slate-900 to-slate-800 text-center">
    <h1 className="text-5xl md:text-7xl font-bold mb-6">Setup <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">Profissional</span></h1>
    <p className="text-slate-400 max-w-2xl mx-auto mb-8">Performance e design para o seu workspace.</p>
    <button onClick={() => document.getElementById('shop').scrollIntoView()} className="bg-primary hover:bg-emerald-600 text-slate-900 px-8 py-3 rounded-full font-bold inline-flex items-center gap-2">Ver Produtos <ArrowRight size={18}/></button>
  </section>
);