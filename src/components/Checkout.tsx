import { useState } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Phone, MapPin, CreditCard } from 'lucide-react';
import { OrderDetails } from '../types';

interface CheckoutProps {
  onBack: () => void;
  onComplete: (details: OrderDetails) => void;
  subtotal: number;
  deliveryCharge: number;
}

export default function Checkout({ onBack, onComplete, subtotal, deliveryCharge }: CheckoutProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      ...formData,
      deliveryCharge,
      total: subtotal + deliveryCharge
    });
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col antialiased">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 sticky top-0 z-10">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-black uppercase italic tracking-tighter text-charcoal">CHECKOUT</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full p-4 flex-grow py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-200 space-y-6">
            <h2 className="text-lg font-black text-charcoal uppercase italic tracking-tighter border-b border-gray-100 pb-4 flex items-center gap-2">
               <User size={20} className="text-pioneer-red" /> Billing Details
            </h2>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
              <input
                required
                type="text"
                placeholder="Enter your name"
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-pioneer-red/5 focus:border-pioneer-red transition-all font-bold placeholder:text-gray-300"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp Number</label>
              <input
                required
                type="tel"
                placeholder="03xx-xxxxxxx"
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-pioneer-red/5 focus:border-pioneer-red transition-all font-bold placeholder:text-gray-300"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-200 space-y-6">
            <h2 className="text-lg font-black text-charcoal uppercase italic tracking-tighter border-b border-gray-100 pb-4 flex items-center gap-2">
               <MapPin size={20} className="text-pioneer-red" /> Delivery Spot
            </h2>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Street Address</label>
              <textarea
                required
                rows={3}
                placeholder="Gulberg / F.B Area Street & House No"
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-pioneer-red/5 focus:border-pioneer-red transition-all font-bold placeholder:text-gray-300 resize-none"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-200 space-y-6">
            <h2 className="text-lg font-black text-charcoal uppercase italic tracking-tighter border-b border-gray-100 pb-4 flex items-center gap-2">
               <CreditCard size={20} className="text-pioneer-red" /> Payment
            </h2>
            <div className="flex items-center gap-4 p-5 border-2 border-pioneer-red bg-red-50/50 rounded-2xl">
              <div className="w-6 h-6 rounded-full border-4 border-pioneer-red bg-white ring-4 ring-pioneer-red/10"></div>
              <div>
                <p className="font-black text-charcoal uppercase italic tracking-tighter">Cash on Delivery</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Pay safely at your door</p>
              </div>
            </div>
          </div>

          {/* Checkout Info */}
          <div className="bg-charcoal p-8 rounded-[2rem] text-white shadow-2xl shadow-gray-900/40">
             <div className="space-y-4 mb-8">
               <div className="flex justify-between text-gray-500 text-xs font-black uppercase tracking-widest">
                 <span>Subtotal</span>
                 <span>Rs. {subtotal}</span>
               </div>
               <div className="flex justify-between text-gray-500 text-xs font-black uppercase tracking-widest">
                 <span>Delivery Charge</span>
                 <span>Rs. {deliveryCharge}</span>
               </div>
               <div className="flex justify-between items-end pt-4 border-t border-gray-800">
                 <span className="text-xl font-black uppercase italic tracking-tighter leading-none">Grand Amount</span>
                 <span className="text-4xl font-black text-yellow-400 leading-none tracking-tighter">Rs. {subtotal + deliveryCharge}</span>
               </div>
             </div>
             
             <button
               type="submit"
               className="w-full bg-pioneer-red hover:bg-red-700 text-white font-black py-5 rounded-2xl text-lg uppercase tracking-widest transition-all transform active:scale-95 shadow-2xl shadow-red-900/40"
             >
               Confirm & Place Order
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
