import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. LEITURA INTELIGENTE (LAZY INITIALIZATION)
  // Em vez de começar com useState([]), passamos uma função.
  // O React executa isso apenas UMA vez quando o site carrega.
  const [cart, setCart] = useState(() => {
    // Tenta buscar os dados salvos no navegador
    const savedCart = localStorage.getItem('@AtruStore:cart');
    
    // Se achou, converte de Texto para JSON. Se não achou, retorna array vazio.
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return [];
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 2. ESCRITA AUTOMÁTICA (SIDE EFFECT)
  // O useEffect vigia a variável 'cart'.
  // Toda vez que 'cart' muda, ele executa essa função de salvar.
  useEffect(() => {
    // O LocalStorage só aceita texto, por isso usamos JSON.stringify
    localStorage.setItem('@AtruStore:cart', JSON.stringify(cart));
  }, [cart]);

  // --- DAQUI PRA BAIXO NADA MUDOU ---
  
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsSidebarOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + amount) };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      cartCount, 
      cartTotal, 
      isSidebarOpen, 
      setIsSidebarOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);