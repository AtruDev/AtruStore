export type Category = "Periféricos" | "Monitores" | "Áudio" | "Gadgets" | "Acessórios";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextData {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;
  cartCount: number;
  cartTotal: number;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  clearCart: () => void;
}