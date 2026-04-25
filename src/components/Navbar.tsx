import { ShoppingCart, Phone, Moon, Sun, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ cartCount, onCartClick, isDarkMode, onToggleTheme }: NavbarProps) {
  const [activeCategory, setActiveCategory] = useState<string>('value-deals');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      // Open from 9 PM (21) to 4 AM (4)
      const open = (hours >= 21 || hours < 4);
      setIsOpen(open);
    };

    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 'favorites', label: 'Favorites' },
    { id: 'value-deals', label: 'Deals' },
    { id: 'zinger-burgers', label: 'Burgers' },
    { id: 'bbq', label: 'BBQ' },
    { id: 'rolls-wraps', label: 'Rolls' },
    { id: 'pizza-pasta', label: 'Pizza & Pasta' },
    { id: 'karahi-chinese', label: 'Karahi & Chinese' },
    { id: 'sides', label: 'Sides' },
  ];

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-150px 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    }, options);

    categories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Navbar + Category bar offset
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-dark-surface transition-colors duration-300">
      {/* Top Header */}
      <nav className="border-b border-gray-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-pioneer-red text-white p-2 font-black rounded-xl text-xl tracking-tighter w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg shadow-pioneer-red/20">
              PK
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-charcoal leading-none">
                Pioneer Kabab House
              </h1>
              <p className="text-[7px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-pioneer-red mt-1">House of Taste</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden lg:flex items-center gap-3 border-r border-gray-200 pr-6 dark:border-dark-border">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isOpen ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'}`}>
                <Clock size={12} />
                <span>{isOpen ? 'Open Now' : 'Closed'}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order Delivery</span>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-pioneer-red" />
                  <span className="text-sm font-black text-charcoal tracking-tight dark:text-gray-100">0318-2234310</span>
                </div>
              </div>
            </div>

            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-card dark:text-gray-400 dark:hover:bg-dark-border transition-all"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={onCartClick}
              className="group relative bg-charcoal dark:bg-pioneer-red text-white px-4 py-2 sm:px-6 sm:py-3 rounded-2xl flex items-center gap-3 hover:bg-pioneer-red dark:hover:bg-red-700 transition-all duration-300 shadow-xl shadow-charcoal/10 hover:shadow-pioneer-red/30 transform active:scale-95"
            >
              <ShoppingCart size={20} />
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-60">Your Cart</span>
                <span className="font-black text-xs uppercase">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</span>
              </div>
              <span className="sm:hidden font-black text-xs">{cartCount}</span>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white dark:border-black flex items-center justify-center text-[8px] font-black">
                      {cartCount}
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Category Tabs Section */}
      <div className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border-b border-gray-100 dark:border-dark-border shadow-sm overflow-hidden py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`relative flex-shrink-0 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${
                    isActive 
                      ? 'bg-pioneer-red text-white shadow-lg shadow-pioneer-red/40 scale-105' 
                      : 'bg-neutral-800 text-white hover:bg-neutral-700 shadow-md'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-pioneer-red -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
