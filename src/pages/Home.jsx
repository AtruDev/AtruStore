import { useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export const Home = () => {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', ...new Set(products.map(p => p.category))];
  const filtered = filter === 'Todos' ? products : products.filter(p => p.category === filter);

  return (
    <main>
      <Hero />
      <section id="shop" className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold text-white">Loja</h2>
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)} 
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-primary text-slate-900' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  );
};