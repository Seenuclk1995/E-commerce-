
import React, { useState } from 'react';
import { CreditCard, Mail, MapPin, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { UserInfo } from '../types';

interface CheckoutProps {
  total: number;
  onComplete: (userInfo: UserInfo) => void;
  onBack: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ total, onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserInfo>({
    name: '',
    email: '',
    address: '',
    city: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    onComplete(formData);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-yellow-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-yellow-600" />
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className={`flex items-center ${step >= 1 ? 'text-yellow-600' : 'text-gray-300'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 1 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>1</div>
          <span className="ml-2 font-bold hidden sm:block">Billing</span>
        </div>
        <div className={`h-1 w-16 mx-4 rounded ${step >= 2 ? 'bg-yellow-400' : 'bg-gray-200'}`} />
        <div className={`flex items-center ${step >= 2 ? 'text-yellow-600' : 'text-gray-300'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 2 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>2</div>
          <span className="ml-2 font-bold hidden sm:block">Payment</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-yellow-100 shadow-xl">
        {step === 1 ? (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2 text-yellow-500" /> Full Name
                </label>
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-yellow-500" /> Email Address
                </label>
                <input 
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-yellow-500" /> Shipping Address
                </label>
                <input 
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  placeholder="123 Luxury Lane"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">City</label>
                <input 
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  placeholder="New York"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-[0.98]"
            >
              Continue to Payment
            </button>
          </form>
        ) : (
          <form onSubmit={handlePayment} className="space-y-6">
            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200 mb-6 flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Payable</span>
              <span className="text-2xl font-black text-yellow-600">${total.toFixed(2)}</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-yellow-500" /> Card Number
                </label>
                <div className="relative">
                  <input 
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                    placeholder="0000 0000 0000 0000"
                  />
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Expiry (MM/YY)</label>
                  <input required placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">CVV</label>
                  <input required placeholder="123" type="password" maxLength={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-4 rounded-2xl font-bold transition-all"
              >
                Go Back
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-[2] bg-yellow-400 hover:bg-yellow-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>Pay Now</span>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Simple User Icon helper (not imported from lucide to avoid duplicate in snippet but defined for completeness if needed)
const User = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
