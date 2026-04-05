import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Handbag } from "@phosphor-icons/react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { Product } from "../@types/store";

// Configurações das "bolinhas/hotspots" e para qual produto a coordenada no mapa se refere.
const setupHotspots = [
  {
    id: "hotspot-monitor",
    productId: 3, // Monitor UltraWide 34'
    top: "55%", // Coordenada Y
    left: "50%", // Coordenada X
  },
  {
    id: "hotspot-keyboard",
    productId: 1, // Teclado Mecânico
    top: "89%",
    left: "50%",
  },
  {
    id: "hotspot-mouse",
    productId: 2, // Mouse Gamer Wireless
    top: "89%",
    left: "64%",
  },
];

const formatMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

// Isolate logic in a Memoized Component to avoid re-rendering entire layout (Performance Taste-Skill Rule)
const HotspotItem = memo(({ hotspot, product }: { hotspot: any, product: Product }) => {
  const { addToCart } = useCart();
  const [isActive, setIsActive] = useState(false);

  // Calcula dinamicamente se o card deve abrir pra esquerda ou direita evitando tela cortada 
  const isRightSide = parseInt(hotspot.left) > 50;

  return (
    <div 
      className="absolute z-30"
      style={{ top: hotspot.top, left: hotspot.left }}
    >
      <div 
         className="relative flex items-center justify-center cursor-pointer group/hotspot -translate-x-1/2 -translate-y-1/2"
         onClick={() => setIsActive(!isActive)}
         onMouseEnter={() => window.innerWidth >= 768 && setIsActive(true)}
         onMouseLeave={() => window.innerWidth >= 768 && setIsActive(false)}
      >
        {/* Pulse Effect Animate */}
        <motion.div 
           animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="absolute w-12 h-12 bg-white rounded-full pointer-events-none"
        />
        <div className="relative w-7 h-7 bg-white dark:bg-slate-100 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] border-2 border-primary transition-transform group-hover/hotspot:scale-110">
          <Plus size={14} weight="bold" className={`text-slate-950 transition-transform duration-300 ${isActive ? "rotate-45" : ""}`} />
        </div>

        {/* Card Popover (Visual Interativo) avoids clipping by opening outwards horizontally  */}
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`absolute top-10 md:top-1/2 md:-translate-y-1/2 ${isRightSide ? "right-1/2 mr-3 md:mr-6" : "left-1/2 ml-3 md:ml-6"} w-64 md:w-72 glass-panel p-4 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] pointer-events-auto`}
              onMouseEnter={() => window.innerWidth >= 768 && setIsActive(true)}
              onMouseLeave={() => window.innerWidth >= 768 && setIsActive(false)}
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsActive(false);
                }}
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-black dark:text-white rounded-full p-1 transition-colors"
                aria-label="Cerrar popover"
              >
                <X size={12} weight="bold" />
              </button>

              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-white shrink-0 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-slate-900 dark:text-white font-bold text-sm leading-tight truncate font-display">{product.name}</p>
                  <p className="text-slate-700 dark:text-white/80 font-mono text-xs mt-1">{formatMoney(product.price)}</p>
                </div>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                  setIsActive(false);
                }}
                className="mt-4 w-full bg-primary hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Handbag size={16} weight="bold" /> Adicionar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

export const ShopTheSetup = () => {
  return (
    <section className="relative w-full bg-[#F9FAFB] dark:bg-[#0A0D0A] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-16">
        
        {/* Header da Seção */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Shop the Look</h2>
          <p className="text-slate-500 mt-3 font-sans max-w-xl md:mx-0 mx-auto text-lg">
            Explore configurações de ambiente premium. Interaja com a imagem abaixo para descobrir o setup ideal para a sua rotina.
          </p>
        </div>

        {/* Container Fotográfico do Setup (Sem overflow-hidden global para evitar clipping nativo) */}
        <div className="relative w-full aspect-[4/5] md:aspect-[21/9] group">
          
          {/* Imagem Placeholder de Alta Qualidade (overflow isolado aqui) */}
          <div className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/50 dark:border-white/10 bg-slate-900">
             <div 
                className="absolute inset-0 w-full h-full bg-center bg-cover transition-transform duration-[20s] group-hover:scale-105 ease-out opacity-90"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=2600&auto=format&fit=crop')" }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Renderização Fluída dos Hotspots (Renderizados livremente por cima) */}
          {setupHotspots.map((hotspot) => {
            const product = products.find((p) => p.id === hotspot.productId);
            if (!product) return null;
            return <HotspotItem key={hotspot.id} hotspot={hotspot} product={product} />;
          })}
        </div>
      </div>
    </section>
  );
};
