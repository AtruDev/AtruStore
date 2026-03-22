import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CheckCircle2, ArrowLeft, CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";

export const Checkout = () => {
  const { cartTotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
        toast.success("Pagamento aprovado com sucesso!");
      }, 2000);
    }
  };

  if (step === 3) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pt-32 pb-12 max-w-2xl mx-auto px-4 text-center min-h-[80vh]"
      >
        <div className="bg-surface p-12 rounded-3xl border border-white/10 shadow-xl flex flex-col items-center">
          <CheckCircle2 size={80} className="text-primary mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold text-white mb-4">Compra Confirmada!</h1>
          <p className="text-slate-400 text-lg mb-8">
            Seu pedido foi processado e já está sendo preparado para envio.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-emerald-600 transition-colors"
          >
            Voltar para a Loja
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="pt-24 pb-12 max-w-4xl mx-auto px-4 min-h-[80vh]"
    >
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="flex gap-4 mb-8">
        <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-slate-800'}`} />
        <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-slate-800'}`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <form onSubmit={handleNext} className="bg-surface p-8 rounded-3xl border border-white/5 shadow-lg">
            {step === 1 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="text-primary" />
                  <h2 className="text-2xl font-bold text-white">Endereço de Entrega</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="CEP" className="col-span-2 sm:col-span-1 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-primary outline-none" />
                  <input required type="text" placeholder="Cidade" className="col-span-2 sm:col-span-1 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-primary outline-none" />
                  <input required type="text" placeholder="Endereço Completo" className="col-span-2 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-primary outline-none" />
                </div>
                <button type="submit" className="mt-8 w-full bg-primary text-slate-900 font-bold py-4 rounded-xl hover:bg-emerald-600 transition-colors">
                  Ir para Pagamento
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-primary" />
                  <h2 className="text-2xl font-bold text-white">Pagamento</h2>
                </div>
                <div className="space-y-4">
                  <input required type="text" placeholder="Número do Cartão" className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-primary outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="Vencimento (MM/AA)" className="bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-primary outline-none" />
                    <input required type="text" placeholder="CVV" className="bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-primary outline-none" />
                  </div>
                  <input required type="text" placeholder="Nome no Cartão" className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-primary outline-none" />
                </div>
                <button disabled={loading} type="submit" className="mt-8 w-full bg-primary text-slate-900 font-bold py-4 rounded-xl hover:bg-emerald-600 transition-colors flex justify-center items-center">
                  {loading ? <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /> : "Finalizar Pedido"}
                </button>
              </motion.div>
            )}
          </form>
        </div>

        <div>
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 sticky top-28">
            <h3 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h3>
            <div className="flex justify-between text-slate-400 mb-4">
              <span>Subtotal</span>
              <span>{formatMoney(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400 mb-6 pb-6 border-b border-slate-800">
              <span>Frete</span>
              <span className="text-primary font-bold">Grátis</span>
            </div>
            <div className="flex justify-between text-white font-bold text-2xl mb-8">
              <span>Total</span>
              <span>{formatMoney(cartTotal)}</span>
            </div>
            <p className="text-sm text-slate-500 text-center">
              Comprando agora, você garante o envio em até 24h úteis.
            </p>
          </div>
        </div>
      </div>
    </motion.main>
  );
};
