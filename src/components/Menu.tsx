import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Heart, Search, X } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menu';
import Testimonials from './Testimonials';

interface FoodCardProps {
  key?: string | number;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: Set<string>;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

function FoodCard({ item, onAddToCart, cartItemIds, isFavorite, onToggleFavorite }: FoodCardProps) {
  const isDeal = item.category === 'Value Deals';
  const hasVariations = item.variations && item.variations.length > 0;
  const [selectedSize, setSelectedSize] = useState(hasVariations ? item.variations?.[0].size : null);

  const currentVariation = hasVariations ? item.variations?.find(v => v.size === selectedSize) : null;
  const currentPrice = currentVariation ? currentVariation.price : item.price;

  const handleAddToCart = () => {
    if (hasVariations && currentVariation) {
      onAddToCart({
        ...item,
        id: `${item.id}-${currentVariation.size}`,
        name: `${item.name} (${currentVariation.size})`,
        price: currentVariation.price,
        selectedSize: currentVariation.size
      });
    } else {
      onAddToCart(item);
    }
  };

  const currentItemId = hasVariations && currentVariation ? `${item.id}-${currentVariation.size}` : item.id;
  const isCurrentItemInCart = cartItemIds.has(currentItemId);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col justify-between group p-0 overflow-hidden bg-white dark:bg-dark-card rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm transition-all duration-500 hover:shadow-2xl ${isDeal ? 'hover:border-orange-500/30' : 'hover:border-pioneer-red/20'}`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className={`relative overflow-hidden rounded-2xl ${isDeal ? 'bg-white' : 'bg-gray-100 dark:bg-dark-surface'} mb-4 h-48 flex items-center justify-center`}>
          <button 
            onClick={() => onToggleFavorite(item.id)}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:scale-110 group/fav"
          >
            <Heart 
              size={18} 
              className={`transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/fav:text-red-400'}`} 
            />
          </button>
          {item.link ? (
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className={`w-full h-full ${isDeal ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-110`}
                referrerPolicy="no-referrer"
              />
            </a>
          ) : (
            <div className="block w-full h-full overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className={`w-full h-full ${isDeal ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-110`}
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          {isDeal && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              Value Deal
            </div>
          )}
        </div>
        
          <div className="flex-grow">
            <h3 className={`font-black tracking-tight leading-tight mb-2 group-hover:text-orange-600 transition-colors uppercase italic ${isDeal ? 'text-base sm:text-lg text-charcoal dark:text-gray-100' : 'text-sm sm:text-base text-charcoal dark:text-gray-100'}`}>
              {item.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-4 line-clamp-3 leading-relaxed whitespace-pre-line font-medium italic">
              {item.description}
            </p>

            {hasVariations && (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.variations?.map((v) => (
                  <button
                    key={v.size}
                    onClick={() => setSelectedSize(v.size)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                      selectedSize === v.size
                        ? 'bg-pioneer-red text-white shadow-md'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-400 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {v.size.charAt(0)}: {v.price}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-50 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <span className={`font-black tracking-tighter ${isDeal ? 'text-xl sm:text-2xl text-orange-600' : 'text-lg sm:text-xl text-charcoal dark:text-gray-100'}`}>
                Rs. {currentPrice}
              </span>
            </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={isCurrentItemInCart}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
              isCurrentItemInCart 
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20 cursor-default' 
                : 'bg-charcoal dark:bg-pioneer-red text-white hover:bg-orange-600 dark:hover:bg-orange-700 shadow-xl shadow-charcoal/10 hover:shadow-orange-600/30'
            }`}
          >
            {isCurrentItemInCart ? <Check size={16} /> : <Plus size={16} />}
            <span>{isCurrentItemInCart ? 'Added to Cart' : 'Add to Cart'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: Set<string>;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Menu({ onAddToCart, cartItemIds, favorites, onToggleFavorite, searchQuery, setSearchQuery }: MenuProps) {
  const sections = [
    { id: 'favorites', title: 'Your Favorites', category: 'Favorites' },
    { id: 'value-deals', title: 'Value Deals', category: 'Value Deals' },
    { id: 'zinger-burgers', title: 'Zinger Burgers', category: 'Zinger Burgers' },
    { id: 'chicken-beef-burgers', title: 'Chicken & Beef Burgers', category: 'Chicken & Beef Burgers' },
    { id: 'bbq', title: 'Bar B Q (BBQ)', category: 'BBQ' },
    { id: 'karahi-chinese', title: 'Karahi & Chinese', category: 'Karahi & Chinese' },
    { id: 'rolls-gyros', title: 'Rolls & Gyros', category: 'Rolls & Gyros' },
    { id: 'pizza-pasta', title: 'Pizza & Pasta', category: 'Pizza & Pasta' },
    { id: 'sides', title: 'Sides', category: 'Sides' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
      {/* Search Bar Section */}
      <div className="max-w-2xl mx-auto mb-16 px-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-pioneer-red transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for deals, burgers, bbq..."
            className="w-full bg-white dark:bg-dark-card border-2 border-gray-100 dark:border-dark-border rounded-2xl py-4 pl-12 pr-12 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-pioneer-red dark:focus:border-pioneer-red transition-all shadow-sm focus:shadow-xl text-lg font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-pioneer-red transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-24">
        {sections.map((section) => {
          let items = section.category === 'Favorites' 
            ? MENU_ITEMS.filter(item => favorites.has(item.id))
            : MENU_ITEMS.filter(item => item.category === section.category);
            
          // Apply Search Filter
          if (searchQuery.trim()) {
            items = items.filter(item => 
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }

          if (items.length === 0) return null;

          return (
            <section key={section.id} id={section.id} className="scroll-mt-32">
              <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter italic text-charcoal dark:text-gray-100">
                  {section.title}
                </h2>
                <div className="h-px flex-1 bg-gray-100 dark:bg-dark-border"></div>
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
                      cartItemIds={cartItemIds}
                      isFavorite={favorites.has(item.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {section.id === 'value-deals' && (
                <div className="mt-24 -mx-6">
                  <Testimonials />
                </div>
              )}
            </section>
          );
        })}

        {/* No Results Message */}
        {searchQuery && sections.every(section => {
           let items = section.category === 'Favorites' 
           ? MENU_ITEMS.filter(item => favorites.has(item.id))
           : MENU_ITEMS.filter(item => item.category === section.category);
           return items.filter(item => 
             item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             item.description.toLowerCase().includes(searchQuery.toLowerCase())
           ).length === 0;
        }) && (
          <div className="text-center py-20 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-surface mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No matching deals found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">Try searching for something else like "Burger", "Karahi" or "Deal 10".</p>
          </div>
        )}
      </div>
    </div>
  );
}
