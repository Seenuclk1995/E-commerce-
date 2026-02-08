
import React from 'react';
import { Star, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow }) => {
  return (
    <div className="group bg-white rounded-2xl border border-yellow-50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all transform hover:rotate-90"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center mb-1">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
          <span className="text-xs font-medium text-gray-500 ml-1">{product.rating}</span>
        </div>
        <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-black text-gray-900">${product.price}</span>
          <button 
            onClick={() => onBuyNow(product)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
