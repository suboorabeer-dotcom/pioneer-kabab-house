import { motion } from 'motion/react';
import { CheckCircle, Phone, ArrowLeft, Heart } from 'lucide-react';

interface OrderConfirmationProps {
  orderId: string;
  onHome: () => void;
}

export default function OrderConfirmation({ orderId, onHome }: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-off-white flex flex-col items-center justify-center p-6 text-center antialiased">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-white border border-gray-200 p-12 rounded-[3rem] shadow-2xl shadow-gray-200/50 max-w-md w-full"
      >
        <div className="bg-green-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-green-100 rotate-12">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        
        <h1 className="text-4xl font-black text-charcoal uppercase italic tracking-tighter mb-4 leading-none">
          ORDER <span className="text-pioneer-red">CONFIRMED!</span>
        </h1>
        
        <div className="py-6 border-y border-gray-100 my-8 space-y-2">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</p>
          <p className="text-3xl font-black text-charcoal tracking-tighter">#{orderId}</p>
        </div>

        <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-8 leading-relaxed">
          Our rider will arrive within <span className="text-charcoal">35-45 minutes</span>. Stay hungry!
        </p>
        
        <div className="space-y-4">
          <a 
            href="tel:+923162334310" 
            className="flex items-center justify-center gap-3 w-full bg-charcoal text-white font-black py-4 rounded-2xl hover:bg-black transition-all uppercase tracking-widest text-sm shadow-xl shadow-gray-900/20"
          >
            <Phone size={18} /> CALL FOR STATUS
          </a>
          
          <button 
            onClick={onHome}
            className="flex items-center justify-center gap-2 w-full text-gray-400 font-black uppercase tracking-widest text-[10px] hover:text-pioneer-red transition-colors"
          >
            <ArrowLeft size={14} /> BACK TO MENU
          </button>
        </div>
      </motion.div>

      <div className="mt-12 flex items-center justify-center gap-2 text-gray-300 text-[10px] font-black uppercase tracking-[0.2em]">
        KARACHI <Heart size={10} className="fill-pioneer-red text-pioneer-red" /> QUALITY
      </div>
    </div>
  );
}
