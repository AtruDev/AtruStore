import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const handleScrollToShop = () => {
    const shopSection = document.getElementById("shop");
    shopSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-32 pb-16 px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight tracking-wide">
          SETUP <span className="text-primary">PROFISSIONAL</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-lg leading-relaxed font-sans">
          Performance e design tático para o seu workspace.
        </p>
        <button
          onClick={handleScrollToShop}
          className="bg-primary hover:bg-emerald-600 text-slate-900 px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          Ver Produtos <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};
