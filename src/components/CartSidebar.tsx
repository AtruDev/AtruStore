import { X, Trash2, Minus, Plus } from "lucide-react";
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

  if (!isSidebarOpen) return null;

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSidebarOpen(false)}
      />

      <div className="relative w-full max-w-md bg-slate-900 h-full border-l border-slate-800 flex flex-col animate-slide-in shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white">Seu Carrinho</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-surface rounded-lg"
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
                className="flex gap-4 bg-surface/50 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-slate-700"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-white text-sm font-bold line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-primary font-bold">
                      {formatMoney(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-slate-900 rounded-lg border border-slate-700">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-slate-400 hover:text-white px-2"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white text-sm w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-slate-400 hover:text-white px-2"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 ml-auto p-2 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-6 border-t border-slate-800 mt-auto bg-slate-900">
          <div className="flex justify-between text-slate-400 mb-2 text-sm">
            <span>Subtotal</span>
            <span>{formatMoney(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-white font-bold text-xl mb-6">
            <span>Total</span>
            <span>{formatMoney(cartTotal)}</span>
          </div>
          <button
            disabled={cart.length === 0}
            className="w-full bg-primary hover:bg-emerald-600 disabled:bg-surface disabled:text-slate-500 disabled:cursor-not-allowed text-slate-900 font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};
