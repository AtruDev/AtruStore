import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Product, CartItem, CartContextData } from '../@types/store';


const CartContext = createContext<CartContextData | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('@AtruStore:cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('@AtruStore:cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    toast.success(`${product.name} adicionado!`, {
      description: "Seu carrinho foi atualizado.",
      action: {
        label: 'Ver Carrinho',
        onClick: () => setIsSidebarOpen(true),
      },
    });
  };

  const removeFromCart = (id: number) => 
    setCart(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id: number, amount: number) => {
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
      cart, addToCart, removeFromCart, updateQuantity, 
      cartCount, cartTotal, isSidebarOpen, setIsSidebarOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};