import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "../components/Hero";
import { ShopTheSetup } from "../components/ShopTheSetup";
import { ProductCard } from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { products } from "../data/products";
import { Category } from "../@types/store";
import { MagnifyingGlass, FadersHorizontal, CaretDown } from "@phosphor-icons/react";

export const Home = () => {
  const [filter, setFilter] = useState<Category | "Todos">("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("news");
  const [isLoading, setIsLoading] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptionsMap = {
    "news": "Recentes",
    "price-asc": "Menor Preço",
    "price-desc": "Maior Preço"
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["Todos", ...new Set(products.map((p) => p.category))];

  let filtered = [...products];

  if (filter !== "Todos") {
    filtered = filtered.filter((p) => p.category === filter);
  }

  if (searchQuery) {
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (sortOption === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10"
    >
      <Hero />
      <ShopTheSetup />
      <section id="shop" className="max-w-[1400px] mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Equipamentos</h2>
            <p className="text-slate-500 mt-2 font-mono text-sm uppercase tracking-widest">{filtered.length} itens encontrados</p>
          </div>
          
          <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full md:max-w-xl justify-end">
             {/* Search */}
             <div className="relative flex-1 group">
                <MagnifyingGlass weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar produtos..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white pl-12 pr-4 py-3.5 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus:border-primary transition-all placeholder:text-slate-400"
                />
             </div>
             {/* Custom Sort Dropdown */}
             <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center justify-between gap-3 bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3.5 w-full sm:w-56 focus-visible:ring-2 focus-visible:ring-primary outline-none transition-all hover:bg-slate-200 dark:hover:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <FadersHorizontal weight="bold" className="text-slate-500" size={18} />
                    <span className="text-slate-900 dark:text-white text-sm font-bold">
                      {sortOptionsMap[sortOption as keyof typeof sortOptionsMap]}
                    </span>
                  </div>
                  <CaretDown weight="bold" className={`text-slate-500 w-4 h-4 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 top-[calc(100%+8px)] w-full sm:w-56 p-2 bg-white dark:bg-[#1A2517] border border-slate-200 dark:border-white/10 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-[60]"
                    >
                      {Object.entries(sortOptionsMap).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSortOption(key);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm rounded-xl font-medium transition-colors ${
                            sortOption === key 
                              ? "bg-primary text-slate-950 font-bold" 
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
        
        {/* Categories (Masonry / Grid filtering approach) */}
        <div className="flex gap-2 flex-wrap mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as Category | "Todos")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                filter === cat 
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                  : "bg-transparent border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        )}
      </section>
    </motion.main>
  );
};