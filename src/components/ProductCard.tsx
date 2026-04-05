import { Plus, Heart } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../@types/store';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative group flex flex-col will-change-transform outline-none"
    >
      {/* Image Container (The only elevated part) */}
      <div className="relative rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-black/20 aspect-[4/5] mb-6 flex items-center justify-center">
        
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/80 dark:bg-black/60 backdrop-blur-xl rounded-full text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-900 transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 active:scale-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          <Heart size={20} weight={isWishlisted ? "fill" : "regular"} className={isWishlisted ? "text-red-500" : ""} />
        </button>

        <Link to={`/product/${product.id}`} className="absolute inset-0 z-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none" aria-label={`View ${product.name}`} />
        
        <motion.img 
          src={product.image} 
          alt={product.name}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:opacity-100" 
        />
      </div>
      
      {/* Detached Labels (Gallery Style) */}
      <div className="flex flex-col px-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] mb-2 block">
              {product.category}
            </span>
            
            <Link to={`/product/${product.id}`} className="inline-block focus-visible:ring-2 focus-visible:ring-primary outline-none rounded-md">
               <h3 className="font-display text-slate-900 dark:text-white text-xl md:text-2xl hover:text-primary transition-colors tracking-wide leading-tight">
                 {product.name}
               </h3>
            </Link>
          </div>
          
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="shrink-0 w-12 h-12 flex items-center justify-center bg-transparent border border-slate-200 dark:border-white/10 hover:border-primary hover:bg-primary text-slate-600 dark:text-slate-300 hover:text-slate-950 rounded-full transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            aria-label="Adicionar ao carrinho"
          >
            <Plus size={20} weight="bold" />
          </button>
        </div>
        
        <span className="text-slate-900 dark:text-slate-300 font-medium font-mono text-lg mt-3">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
        </span>
      </div>
    </motion.div>
  );
};