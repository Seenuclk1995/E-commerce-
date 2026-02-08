
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Success } from './components/Success';
import { Auth } from './components/Auth';
import { Profile } from './components/Profile';
import { PRODUCTS } from './constants';
import { Product, CartItem, AppView, UserInfo, Category, Gender } from './types';
import { getShoppingAdvice } from './services/geminiService';
import { Sparkles, X, SearchX } from 'lucide-react';

const CATEGORIES: Category[] = ['Clothes', 'Watches', 'Shoes', 'Phones', 'Tablets', 'Rings', 'Hoodies'];

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [showAi, setShowAi] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'All' | 'Men' | 'Women'>('All');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Filter products based on search, category, and gender
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesGender = selectedGender === 'All' || product.gender === selectedGender || product.gender === 'Unisex';
    
    return matchesSearch && matchesCategory && matchesGender;
  });

  useEffect(() => {
    const fetchAdvice = async () => {
      if (cartCount > 0) {
        const advice = await getShoppingAdvice(cartTotal, cartCount);
        setAiAdvice(advice);
        setShowAi(true);
      } else {
        setShowAi(false);
      }
    };
    fetchAdvice();
  }, [cartCount, cartTotal]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const renderContent = () => {
    switch (view) {
      case 'auth':
        return <Auth onAuthComplete={(u) => { setUser(u); setView('home'); }} onBack={() => setView('home')} />;
      case 'profile':
        return user ? (
          <Profile user={user} onLogout={() => { setUser(null); setView('home'); }} onBack={() => setView('home')} />
        ) : <Auth onAuthComplete={(u) => { setUser(u); setView('home'); }} onBack={() => setView('home')} />;
      case 'home':
        return (
          <main className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            {searchQuery === '' && activeCategory === 'All' && (
              <div className="relative bg-yellow-400 rounded-[3rem] p-12 mb-16 overflow-hidden flex flex-col lg:flex-row items-center justify-between text-white shadow-2xl">
                <div className="relative z-10 max-w-xl text-center lg:text-left">
                  <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
                    The Gold <br /> Standard.
                  </h1>
                  <p className="text-lg text-white/90 mb-10 font-medium">
                    Curated luxury for {selectedGender === 'All' ? 'everyone' : selectedGender.toLowerCase()}. 
                    Experience the finest in fashion and tech.
                  </p>
                  <div className="flex space-x-4 justify-center lg:justify-start">
                    <button className="bg-white text-yellow-500 px-8 py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition-all">Shop Now</button>
                  </div>
                </div>
                <div className="hidden lg:block relative z-10 transform rotate-6 hover:rotate-0 transition-all duration-700">
                  <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600" className="w-80 rounded-3xl shadow-2xl" alt="Featured" />
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="flex overflow-x-auto py-4 mb-8 no-scrollbar gap-3">
              <button 
                onClick={() => setActiveCategory('All')}
                className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${activeCategory === 'All' ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-500 hover:bg-yellow-50'}`}
              >
                All Collections
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-500 hover:bg-yellow-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={addToCart} onBuyNow={(p) => { addToCart(p); setView('cart'); }} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <SearchX className="w-16 h-16 text-yellow-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">No items found</h3>
                <p className="text-gray-400">Try adjusting your filters or search query.</p>
              </div>
            )}

            {showAi && (
              <div className="fixed bottom-8 right-8 z-50 animate-bounce-slow">
                <div className="bg-white p-6 rounded-[2rem] shadow-2xl border-2 border-yellow-100 max-w-xs relative">
                   <button onClick={() => setShowAi(false)} className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1 rounded-full"><X className="w-4 h-4" /></button>
                   <p className="text-sm italic text-gray-600 font-medium">"{aiAdvice}"</p>
                   <div className="mt-2 text-[10px] font-black text-yellow-500 uppercase tracking-widest flex items-center">
                     <Sparkles className="w-3 h-3 mr-1" /> SR Personal Stylist
                   </div>
                </div>
              </div>
            )}
          </main>
        );
      case 'cart':
        return <Cart items={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onCheckout={() => setView('checkout')} onContinueShopping={() => setView('home')} />;
      case 'checkout':
        return <Checkout total={cartTotal * 1.08} onComplete={(u) => { setUser(u); setView('success'); setCart([]); }} onBack={() => setView('cart')} />;
      case 'success':
        return user ? <Success userInfo={user} onDone={() => setView('home')} /> : null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartCount={cartCount} 
        currentView={view} 
        setView={setView} 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        user={user}
        selectedGender={selectedGender}
        onGenderChange={(g) => { setSelectedGender(g); setView('home'); }}
      />
      {renderContent()}
    </div>
  );
};

export default App;
