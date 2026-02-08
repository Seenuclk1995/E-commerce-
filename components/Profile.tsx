
import React from 'react';
import { UserInfo } from '../types';
import { Package, MapPin, Mail, Calendar, Settings, LogOut } from 'lucide-react';

interface ProfileProps {
  user: UserInfo;
  onLogout: () => void;
  onBack: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onLogout, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-yellow-400 p-8 rounded-[2rem] text-white text-center shadow-xl">
            <div className="w-24 h-24 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center font-black text-4xl mx-auto mb-4 border-4 border-white/50">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-white/70 text-sm">Platinum Member</p>
          </div>
          
          <nav className="bg-white border border-yellow-50 rounded-2xl overflow-hidden shadow-sm">
            <button className="w-full flex items-center space-x-3 px-6 py-4 bg-yellow-50 text-yellow-700 font-bold border-l-4 border-yellow-400">
              <Package className="w-5 h-5" /> <span>My Orders</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-6 py-4 hover:bg-yellow-50 transition-colors text-gray-600 font-medium">
              <Settings className="w-5 h-5" /> <span>Account Settings</span>
            </button>
            <button 
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-6 py-4 text-red-500 hover:bg-red-50 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" /> <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-yellow-50 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-yellow-100 rounded-xl"><Mail className="w-5 h-5 text-yellow-600" /></div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Email</p>
                  <p className="font-semibold text-gray-800">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-yellow-100 rounded-xl"><MapPin className="w-5 h-5 text-yellow-600" /></div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Address</p>
                  <p className="font-semibold text-gray-800">{user.address}, {user.city}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-yellow-100 rounded-xl"><Calendar className="w-5 h-5 text-yellow-600" /></div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Member Since</p>
                  <p className="font-semibold text-gray-800">{user.joinedDate || 'March 2025'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-8 rounded-[2rem] border border-yellow-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Recent Activity</h3>
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white/50 rounded-2xl">
              <Package className="w-12 h-12 text-yellow-300 mb-4" />
              <p className="text-gray-500 font-medium">No orders in the last 30 days</p>
              <button 
                onClick={onBack}
                className="mt-4 text-yellow-600 font-bold hover:underline"
              >
                Go Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
