import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return <div className="text-white text-center py-20">Produto não encontrado.</div>;        
    }

    return (
        <div className="pt-24 pb-12 max-w-7xl mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft size={20}/> Voltar para a Loja
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-slate-800 rounded-2xl overflow-hidden h-[400px] md:h-[500px]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" /> 
                </div>

                <div className="flex flex-col justify-center">
                    <span className="text-primary font-bold uppercase tracking-wider mb-2">{product.category}</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Experimente a performance de ponta do {product.name}.
                        Ideal para quem busca qualidade, durabilidade e performance no Setup.
                    </p>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-4xl font-bold text-white">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                        </span>
                        <span className="text-sm text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                            Em até 12x sem juros
                        </span>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={() => addToCart(product)}
                            className="flex-1 bg-primary hover:bg-emerald-600 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
                        >
                            <ShoppingBag /> Adicionar ao Carrinho
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        {['Envio Imediato', 'Garantia de 1 Ano', 'Nota Fiscal', 'Suporte 24/7'].map(item => (
                            <div key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                                <Check size={16} className="text-primary" /> {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};