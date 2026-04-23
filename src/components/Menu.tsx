import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menu';

interface FoodCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  isInCart: boolean;
}

function FoodCard({ item, onAddToCart, isInCart }: FoodCardProps) {
  const isDeal = item.category === 'Value Deals';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col justify-between group p-0 overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-2xl ${isDeal ? 'hover:border-orange-500/30' : 'hover:border-pioneer-red/20'}`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className={`relative overflow-hidden rounded-2xl ${isDeal ? 'bg-white' : 'bg-gray-100'} mb-4 h-48 flex items-center justify-center`}>
          {item.link ? (
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <img 
                src={item.image} 
                alt={item.name} 
                className={`w-full h-full ${isDeal ? 'object-contain' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
                referrerPolicy="no-referrer"
              />
            </a>
          ) : (
            <img 
              src={item.image} 
              alt={item.name} 
              className={`w-full h-full ${isDeal ? 'object-contain' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
              referrerPolicy="no-referrer"
            />
          )}
          {isDeal && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              Value Deal
            </div>
          )}
        </div>
        
          <div className="flex-grow">
            <h3 className={`font-black tracking-tight leading-tight mb-2 group-hover:text-orange-600 transition-colors uppercase italic ${isDeal ? 'text-base sm:text-lg text-charcoal' : 'text-sm sm:text-base text-charcoal'}`}>
              {item.name}
            </h3>
            <p className="text-gray-500 text-[10px] sm:text-xs mb-4 line-clamp-3 leading-relaxed whitespace-pre-line font-medium italic">
              {item.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <span className={`font-black tracking-tighter ${isDeal ? 'text-xl sm:text-2xl text-orange-600' : 'text-lg sm:text-xl text-charcoal'}`}>
                Rs. {item.price}
              </span>
            </div>
          <button
            onClick={() => onAddToCart(item)}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${
              isInCart 
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20 cursor-default' 
                : 'bg-charcoal text-white hover:bg-orange-600 shadow-xl shadow-charcoal/10 hover:shadow-orange-600/30'
            }`}
          >
            {isInCart ? <Check size={16} /> : <Plus size={16} />}
            <span>{isInCart ? 'Added to Cart' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: Set<string>;
}

export default function Menu({ onAddToCart, cartItemIds }: MenuProps) {
  const sections = [
    { id: 'value-deals', title: 'Value Deals', category: 'Value Deals' },
    { id: 'zinger-burgers', title: 'Zinger Burgers', category: 'Zinger Burgers' },
    { id: 'chicken-beef-burgers', title: 'Chicken & Beef Burgers', category: 'Chicken & Beef Burgers' },
    { id: 'bbq', title: 'Bar B Q (BBQ)', category: 'BBQ' },
    { id: 'karahi-chinese', title: 'Karahi & Chinese', category: 'Karahi & Chinese' },
    { id: 'rolls-wraps', title: 'Rolls & Wraps', category: 'Rolls & Wraps' },
    { id: 'pizza-pasta', title: 'Pizza & Pasta', category: 'Pizza & Pasta' },
    { id: 'sides', title: 'Sides', category: 'Sides' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
      <div className="space-y-24">
        {sections.map((section) => {
          const items = MENU_ITEMS.filter(item => item.category === section.category);
          if (items.length === 0) return null;

          return (
            <section key={section.id} id={section.id} className="scroll-mt-32">
              <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter italic text-charcoal">
                  {section.title}
                </h2>
                <div className="h-px flex-1 bg-gray-100"></div>
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {items.length} Items
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <FoodCard 
                      key={item.id} 
                      item={item} 
                      onAddToCart={onAddToCart}
                      isInCart={cartItemIds.has(item.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
