
import React from 'react';
import { CheckCircle2, Mail, ExternalLink, Printer, ShoppingBag } from 'lucide-react';
import { UserInfo } from '../types';

interface SuccessProps {
  userInfo: UserInfo;
  onDone: () => void;
}

export const Success: React.FC<SuccessProps> = ({ userInfo, onDone }) => {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center">
      <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mb-8 shadow-2xl animate-bounce">
        <CheckCircle2 className="w-14 h-14 text-white" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">Payment Successful!</h1>
      <p className="text-gray-500 text-center mb-12 max-w-md">
        Thank you for choosing SR Premium. Your style journey continues with us.
      </p>

      {/* Email Confirmation Card */}
      <div className="bg-white border-2 border-yellow-100 p-8 rounded-3xl shadow-xl w-full max-w-md mb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-50 rounded-full" />
        
        <div className="flex items-center mb-6">
          <div className="p-3 bg-yellow-400 rounded-2xl mr-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Email Confirmation Sent</h3>
            <p className="text-xs text-yellow-600">Order ID: #SR-{Math.floor(Math.random() * 1000000)}</p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <p className="text-gray-600">
            A confirmation email has been sent to <span className="font-bold text-gray-900">{userInfo.email}</span>.
          </p>
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
            <h4 className="font-bold text-yellow-800 text-xs uppercase tracking-widest mb-2">Delivery Details</h4>
            <p className="text-gray-800 font-medium">{userInfo.name}</p>
            <p className="text-gray-600">{userInfo.address}, {userInfo.city}</p>
          </div>
        </div>

        <button className="w-full mt-6 py-3 border-2 border-yellow-400 text-yellow-600 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-yellow-400 hover:text-white transition-all">
          <ExternalLink className="w-4 h-4" />
          <span>View Online Receipt</span>
        </button>
      </div>

      <div className="flex space-x-4">
        <button 
          onClick={() => window.print()}
          className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors text-gray-600"
        >
          <Printer className="w-6 h-6" />
        </button>
        <button 
          onClick={onDone}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-10 py-4 rounded-2xl font-bold flex items-center space-x-3 shadow-lg transform hover:-translate-y-1 transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Shop More</span>
        </button>
      </div>
    </div>
  );
};
