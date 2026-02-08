
import React from 'react';
import { Trash2, ChevronRight, ShoppingCart as CartIcon, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const Cart: React.FC<CartProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemove, 
  onCheckout,
  onContinueShopping 
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
          <CartIcon className="w-12 h-12 text-yellow-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-xs text-center">Looks like you haven't added any luxury pieces to your collection yet.</p>
        <button 
          onClick={onContinueShopping}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center mb-8">
        <button onClick={onContinueShopping} className="mr-4 p-2 hover:bg-yellow-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-yellow-600" />
        </button>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Selection</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-2xl border border-yellow-50 shadow-sm transition-hover hover:shadow-md">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-32 object-cover rounded-lg mb-4 sm:mb-0"
              />
              <div className="sm:ml-6 flex-grow text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <p className="text-yellow-600 font-bold">${item.price}</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="flex items-center border border-yellow-100 rounded-lg p-1">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-yellow-50 rounded text-yellow-600 font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-gray-700">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-yellow-50 rounded text-yellow-600 font-bold"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-yellow-50 p-8 rounded-3xl h-fit border border-yellow-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${total}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (estimated)</span>
              <span className="font-semibold text-gray-900">${(total * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t border-yellow-200 pt-4 mt-4 flex justify-between">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-xl font-black text-yellow-600">${(total * 1.08).toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={onCheckout}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <span>Proceed to Checkout</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <p className="text-center text-xs text-yellow-600/60 mt-6">
            Secure payments handled by SR Premium Gateway
          </p>
        </div>
      </div>
    </div>
  );
};
