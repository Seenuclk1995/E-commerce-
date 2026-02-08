
import React, { useState } from 'react';
import { UserInfo } from '../types';
import { Mail, Lock, User, MapPin, ArrowRight } from 'lucide-react';

interface AuthProps {
  onAuthComplete: (user: UserInfo) => void;
  onBack: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthComplete, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthComplete({
      ...formData,
      joinedDate: new Date().toLocaleDateString()
    });
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <div className="bg-white border-2 border-yellow-50 rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-yellow-400 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-black text-3xl mx-auto mb-4">SR</div>
          <h2 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-white/80 text-sm mt-1">Join the gold standard of shopping</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
              <input 
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                placeholder="Full Name"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
            <input 
              required
              type="email"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
              placeholder="Email Address"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {!isLogin && (
            <>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
                <input 
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  placeholder="Street Address"
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <input 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                placeholder="City"
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </>
          )}

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
            <input 
              required
              type="password"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
              placeholder="Password"
            />
          </div>

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg transition-all transform active:scale-95">
            <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="text-center mt-6">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-gray-500 hover:text-yellow-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
          
          <button 
            type="button"
            onClick={onBack}
            className="w-full text-xs text-gray-400 mt-4"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  );
};
