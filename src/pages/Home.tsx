import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Hero } from "../components/Hero";
import { ProductCard } from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { products } from "../data/products";
import { Category } from "../@types/store";
import { Search, SlidersHorizontal } from "lucide-react";

export const Home = () => {

  const [filter, setFilter] = useState<Category | "Todos">("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("news");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5s mock fetch delay
    return () => clearTimeout(timer);
  }, []);

  const categories = ["Todos", ...new Set(products.map((p) => p.category))];

  let filtered = [...products];

  // Category Filter
  if (filter !== "Todos") {
    filtered = filtered.filter((p) => p.category === filter);
  }

  // Search Filter
  if (searchQuery) {
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // Sorting
  if (sortOption === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Hero />
      <section id="shop" className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white hidden md:block">Loja</h2>
          <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full md:max-w-2xl justify-end">
             {/* Search */}
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar produtos..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white pl-10 pr-4 py-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus:border-primary transition-colors"
                />
             </div>
             {/* Sort */}
             <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1 w-full sm:w-auto focus-within:ring-2 focus-within:ring-primary">
                <SlidersHorizontal className="text-slate-500 dark:text-slate-400" size={18} />
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent text-slate-900 dark:text-white outline-none w-full py-1.5 cursor-pointer text-sm"
                >
                  <option value="news">Recentes</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                </select>
             </div>
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as Category | "Todos")}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                filter === cat 
                  ? "bg-primary text-slate-900 shadow-[0_0_15px_rgba(172,200,162,0.4)]" 
                  : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="hidden"
            animate="show"
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