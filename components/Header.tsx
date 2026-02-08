
import React from 'react';
import { ShoppingCart, Search, User, Menu, Heart } from 'lucide-react';
import { AppView, UserInfo } from '../types';

interface HeaderProps {
  cartCount: number;
  currentView: AppView;
  setView: (view: AppView) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  user: UserInfo | null;
  onGenderChange: (gender: 'All' | 'Men' | 'Women') => void;
  selectedGender: 'All' | 'Men' | 'Women';
}

export const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  setView, 
  searchQuery, 
  onSearchChange,
  user,
  onGenderChange,
  selectedGender
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    if (e.target.value.length > 0) {
      setView('home');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-yellow-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile Menu */}
        <button className="lg:hidden p-2 hover:bg-yellow-50 rounded-full transition-colors">
          <Menu className="w-6 h-6 text-yellow-600" />
        </button>

        {/* Logo */}
        <div 
          onClick={() => setView('home')} 
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-extrabold text-white text-xl shadow-lg group-hover:bg-yellow-500 transition-all transform group-hover:scale-105">
            SR
          </div>
          <span className="hidden sm:block font-bold text-xl tracking-tighter text-gray-800">
            PREMIUM <span className="text-yellow-500">STORE</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 font-bold text-sm uppercase tracking-widest text-gray-400">
          <button 
            onClick={() => onGenderChange('Men')} 
            className={`hover:text-yellow-600 transition-colors ${selectedGender === 'Men' ? 'text-yellow-500 border-b-2 border-yellow-400' : ''}`}
          >
            Men
          </button>
          <button 
            onClick={() => onGenderChange('Women')} 
            className={`hover:text-yellow-600 transition-colors ${selectedGender === 'Women' ? 'text-yellow-500 border-b-2 border-yellow-400' : ''}`}
          >
            Women
          </button>
          <button 
            onClick={() => onGenderChange('All')} 
            className={`hover:text-yellow-600 transition-colors ${selectedGender === 'All' ? 'text-yellow-500' : ''}`}
          >
            Collections
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center bg-yellow-50 rounded-full px-4 py-1.5 border border-yellow-100 focus-within:ring-2 focus-within:ring-yellow-400 transition-all">
            <Search className="w-4 h-4 text-yellow-600 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={handleSearch}
              className="bg-transparent border-none outline-none text-sm w-24 focus:w-40 transition-all"
            />
          </div>
          
          <button 
            onClick={() => user ? setView('profile') : setView('auth')}
            className="flex items-center space-x-2 p-2 hover:bg-yellow-50 rounded-full transition-colors relative"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${user ? 'bg-yellow-400 text-white border-white' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
              {user ? user.name.charAt(0) : <User className="w-5 h-5" />}
            </div>
            {user && <span className="hidden lg:block text-xs font-bold text-gray-700">{user.name.split(' ')[0]}</span>}
          </button>

          <button 
            onClick={() => setView('cart')}
            className="p-2 hover:bg-yellow-50 rounded-full transition-colors relative"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-yellow-400 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
