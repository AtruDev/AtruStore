import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CheckCircle, ArrowLeft, CreditCard, Truck, WifiHigh, LockKey, SpinnerGap } from "@phosphor-icons/react";
import { toast } from "sonner";

// Custom Formatters
const formatCardNumber = (value: string) => {
  return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
};

const formatExpiry = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (v.length >= 3) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  }
  return v;
};

// Responsive Interactive 3D Card
const CreditCardVisual = ({ name, number, expiry, cvv, focusedField }: any) => {
  const isFlipped = focusedField === 'cvv';

  return (
    <div style={{ perspective: "1000px" }} className="w-full max-w-[320px] mx-auto mb-10 h-52">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden bg-gradient-to-tr from-slate-900 to-slate-800 border border-white/10"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Chip and Contactless */}
          <div className="flex justify-between items-center opacity-80">
            <div className="w-12 h-8 rounded-md bg-gradient-to-br from-yellow-100 to-yellow-600 opacity-80" />
            <WifiHigh size={28} className="text-white rotate-90" />
          </div>

          <div className="mt-4 opacity-90 text-white font-mono text-xl md:text-2xl tracking-widest shadow-sm">
            {number || "•••• •••• •••• ••••"}
          </div>

          <div className="flex justify-between items-end mt-4 text-white uppercase font-mono text-sm">
            <div className={`transition-opacity ${focusedField === 'name' ? 'opacity-100' : 'opacity-70'}`}>
              <p className="text-[10px] opacity-60">Titular do Cartão</p>
              <p className="tracking-widest truncate max-w-[180px]">{name || "NOME DO TITULAR"}</p>
            </div>
            <div className={`transition-opacity ${focusedField === 'expiry' ? 'opacity-100' : 'opacity-70'}`}>
              <p className="text-[10px] opacity-60 text-right">Validade</p>
              <p className="tracking-widest text-right">{expiry || "MM/AA"}</p>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Tarja Magnetica */}
          <div className="w-full h-10 bg-black mt-6 opacity-80" />
          
          <div className="px-6 mt-6">
            <p className="text-white text-[10px] text-right mb-1 opacity-60 uppercase font-mono tracking-wider">CVV  {"<<"}</p>
            <div className={`w-full h-10 bg-white/20 rounded-lg flex items-center justify-end px-3 transition-colors ${focusedField === 'cvv' ? 'border border-primary' : ''}`}>
              <span className="text-white font-mono tracking-widest text-lg">{cvv || "•••"}</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-6 text-white/30 flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider">
             <LockKey size={12} /> Seguro Criptografado
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Checkout = () => {
  const { cartTotal } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Card Tracking State
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
        toast.success("Pagamento aprovado com sucesso!");
      }, 2500);
    }
  };

  const handleCardChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    let val = e.target.value;
    if (field === "number") val = formatCardNumber(val);
    if (field === "expiry") val = formatExpiry(val);
    if (field === "cvv") val = val.replace(/\D/g, '').substring(0, 4);

    setCardData({ ...cardData, [field]: val });
  };

  if (step === 3) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pt-32 pb-12 max-w-2xl mx-auto px-4 text-center min-h-[80vh]"
      >
        <div className="bg-white dark:bg-surface p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col items-center glass-panel">
          <CheckCircle size={90} weight="fill" className="text-primary mb-6 animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">Pagamento Aprovado!</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 max-w-sm">
            Seu pedido premium foi processado via protocolo encriptografado e já está sendo preparado para o envio.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto bg-primary text-slate-900 font-bold px-12 py-4 rounded-xl hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
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
      className="pt-24 pb-12 max-w-5xl mx-auto px-4 min-h-[80vh]"
    >
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg p-1">
        <ArrowLeft size={20} /> Voltar com Segurança
      </button>

      {/* Progress Bar Premium */}
      <div className="flex gap-4 mb-8">
        <div className={`flex-1 h-1.5 rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
        <div className={`flex-1 h-1.5 rounded-full transition-colors duration-500 delay-100 ${step >= 2 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {/* Main Form Box */}
          <div className="bg-white dark:bg-surface p-6 sm:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl glass-panel relative overflow-hidden">
             
            {step === 1 ? (
              <motion.form key="step1" onSubmit={handleNext} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Truck size={20} weight="bold" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Endereço de Entrega</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required autoFocus type="text" placeholder="CEP" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 rounded-xl focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                  <input required type="text" placeholder="Cidade" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 rounded-xl focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                  <input required type="text" placeholder="Rua / Endereço Completo" className="sm:col-span-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 rounded-xl focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                  <input required type="text" placeholder="Número" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 rounded-xl focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                  <input type="text" placeholder="Bairro / Complemento" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 rounded-xl focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                
                <button type="submit" className="mt-8 w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl shadow-lg hover:bg-primary hover:text-slate-900 dark:hover:bg-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                  Ir para Pagamento Automático
                </button>
              </motion.form>
            ) : (
              <motion.form key="step2" onSubmit={handleNext} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <CreditCard size={20} weight="bold" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Pagar com Cartão</h2>
                </div>
                
                {/* Visual Interativo Refatorado */}
                <CreditCardVisual 
                   name={cardData.name} 
                   number={cardData.number} 
                   expiry={cardData.expiry} 
                   cvv={cardData.cvv} 
                   focusedField={focusedField} 
                />

                <div className="space-y-4">
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      required 
                      autoFocus
                      type="text" 
                      placeholder="Número do Cartão" 
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 pl-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono" 
                      maxLength={19}
                      value={cardData.number}
                      onChange={(e) => handleCardChange(e, 'number')}
                      onFocus={() => setFocusedField('number')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  
                  <input 
                    required 
                    type="text" 
                    placeholder="Nome Impresso no Cartão" 
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all uppercase" 
                    value={cardData.name}
                    onChange={(e) => handleCardChange(e, 'name')}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required 
                      type="text" 
                      placeholder="Validade (MM/AA)" 
                      className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-center" 
                      maxLength={5}
                      value={cardData.expiry}
                      onChange={(e) => handleCardChange(e, 'expiry')}
                      onFocus={() => setFocusedField('expiry')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <div className="relative">
                      <LockKey className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        required 
                        type="text" 
                        placeholder="CVV" 
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 pl-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-center tracking-widest" 
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => handleCardChange(e, 'cvv')}
                        onFocus={() => setFocusedField('cvv')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.button 
                    disabled={loading} 
                    type="submit" 
                    className={`mt-8 w-full font-bold py-4 rounded-xl flex justify-center items-center gap-2 shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-all overflow-hidden ${loading ? 'bg-emerald-600 text-white cursor-wait scale-[0.98]' : 'bg-primary text-slate-900 hover:bg-white hover:text-slate-900 active:scale-95'}`}
                  >
                    {loading ? (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1, rotate: 360 }} 
                        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
                      >
                        <SpinnerGap size={24} weight="bold" />
                      </motion.div>
                    ) : (
                       <>
                         <LockKey size={20} weight="bold" />
                         Processar Pagamento Criptografado
                       </>
                    )}
                  </motion.button>
                </AnimatePresence>
                
                <p className="flex items-center gap-2 justify-center text-[11px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
                  <LockKey weight="fill" /> Conexão SSL Segura (256-bit)
                </p>
              </motion.form>
            )}
          </div>
        </div>

        {/* Sidebar Direita - Resumo */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900/50 p-6 sm:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 sticky top-28 glass-panel shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-6">Sua Cesta</h3>
            <div className="flex justify-between text-slate-500 dark:text-slate-400 mb-4 font-mono text-sm">
              <span>Subtotal Itens</span>
              <span>{formatMoney(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-white/10 font-mono text-sm">
              <span>Custos Logísticos</span>
              <span className="text-primary font-bold uppercase">Prime (Grátis)</span>
            </div>
            <div className="flex justify-between text-slate-900 dark:text-white font-bold text-2xl mb-8 items-center">
              <span className="font-display">Total</span>
              <span className="text-primary">{formatMoney(cartTotal)}</span>
            </div>
            
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3">
              <CheckCircle size={20} weight="fill" className="text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium leading-relaxed">
                Você fechou a compra na janela _fast-track_. Garantimos faturamento e despacho de todo acervo da NF-e em até 24h úteis!
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};
