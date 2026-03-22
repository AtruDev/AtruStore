import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";

export const Wishlist = () => {
  const { wishlistIds } = useWishlist();
  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pt-24 pb-12 max-w-7xl mx-auto px-4 min-h-[80vh]"
    >
      <h1 className="text-3xl font-bold text-white mb-8">Lista de Desejos</h1>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center text-slate-400 py-20 bg-slate-800/20 rounded-2xl border border-slate-800">
          <p className="text-lg">Você ainda não tem produtos salvos.</p>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block font-bold">
            Explorar Loja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </motion.main>
  );
};
