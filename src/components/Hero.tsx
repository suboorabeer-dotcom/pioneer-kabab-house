import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  const banners = [
    {
      title: "Today's Hot Seller",
      subtitle: "House of Taste Signature",
      price: "Rs. 500",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
      cta: "Order Now"
    }
  ];

  return (
    <section className="px-4 py-4 max-w-7xl mx-auto">
      <div className="bg-charcoal dark:bg-black rounded-[2rem] p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center min-h-[400px] transition-colors duration-300">
        {/* Content */}
        <div className="relative z-10 flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-pioneer-red text-white px-4 py-1 rounded-full text-[10px] font-black uppercase mb-6 inline-block tracking-[0.2em] shadow-lg shadow-pioneer-red/30">
              {banners[0].title}
            </span>
            <h2 className="text-white text-4xl sm:text-7xl font-black uppercase leading-[0.9] mb-4 sm:mb-6 tracking-tighter italic">
              <span className="block">Double</span>
              <span className="block text-pioneer-red">Tracker</span>
              <span className="block">Zinger</span>
            </h2>
            <p className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-sm font-medium mb-6 sm:mb-8 max-w-md mx-auto md:mx-0 tracking-tight leading-relaxed">
              Large double-decker crispy fried chicken burger with signature sauces. Delivered anywhere in 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <span className="text-white text-3xl sm:text-4xl font-black font-display tracking-tight">
                {banners[0].price}
              </span>
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-pioneer-red text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-black uppercase tracking-widest hover:bg-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-red-900/40 text-xs sm:text-sm"
              >
                {banners[0].cta}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Image / Graphic */}
        <div className="relative w-full md:w-1/2 h-64 md:h-full mt-12 md:mt-0 flex items-center justify-center">
          {/* Circular Accent */}
          <div className="absolute inset-0 bg-pioneer-red/10 rounded-full blur-3xl transform scale-150"></div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-0 w-64 h-64 sm:w-80 sm:h-80 bg-gray-800 dark:bg-zinc-900 rounded-full border-[12px] border-charcoal dark:border-zinc-800 overflow-hidden shadow-2xl rotate-3"
          >
            <img 
              src={banners[0].image} 
              alt="Double Tracker Zinger" 
              className="w-full h-full object-cover grayscale-[0.2] contrast-125"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pioneer-red/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-pioneer-red/10 rounded-full blur-xl"></div>
        </div>
      </div>
    </section>
  );
}
