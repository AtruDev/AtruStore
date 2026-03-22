import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const CartSidebar = () => {
  const {
    cart,
    isSidebarOpen,
    setIsSidebarOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />

          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl p-6 transition-colors duration-300"
          >
            <div className="flex justify-between items-center mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Seu Carrinho</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1 hover:bg-slate-100 dark:hover:bg-surface rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center text-slate-500 mt-20">
                  <p>Seu carrinho está vazio.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-slate-50 dark:bg-surface/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-slate-700 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-slate-200 dark:bg-slate-700"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-slate-900 dark:text-white text-sm font-bold line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-primary font-bold">
                          {formatMoney(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-l-lg"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-slate-900 dark:text-white text-sm w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-r-lg"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 ml-auto p-2 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-auto bg-white dark:bg-slate-900 transition-colors">
              <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-2 text-sm">
                <span>Subtotal</span>
                <span>{formatMoney(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-900 dark:text-white font-bold text-xl mb-6">
                <span>Total</span>
                <span>{formatMoney(cartTotal)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setIsSidebarOpen(false)}
                className={`w-full block text-center font-bold py-4 rounded-xl transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                  cart.length === 0 
                  ? 'bg-slate-200 dark:bg-surface text-slate-400 dark:text-slate-500 pointer-events-none shadow-none' 
                  : 'bg-primary hover:bg-emerald-600 text-slate-900 active:scale-95 shadow-primary/20'
                }`}
              >
                Finalizar Compra
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
