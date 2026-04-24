import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout 
}: CartDrawerProps) {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = items.length > 0 ? 100 : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-md"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white dark:bg-dark-surface z-[70] shadow-2xl flex flex-col overflow-hidden transition-colors duration-300"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-dark-border flex items-center justify-between bg-gray-50/50 dark:bg-dark-card/50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-pioneer-red w-5 h-5 sm:w-6 sm:h-6" />
                <h2 className="text-lg sm:text-xl font-black uppercase italic tracking-tighter text-charcoal dark:text-white">YOUR ORDER</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white dark:hover:bg-dark-card rounded-full transition-colors border border-transparent hover:border-gray-200 dark:text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-12">
                  <div className="w-24 h-24 bg-gray-50 dark:bg-dark-card flex items-center justify-center rounded-3xl mb-6 rotate-3 border border-gray-100 dark:border-dark-border shadow-sm">
                    <ShoppingBag size={40} className="text-gray-200 dark:text-gray-700" />
                  </div>
                  <h3 className="font-black text-xl text-charcoal dark:text-white uppercase tracking-tighter mb-2">Cart is empty</h3>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Time to fill it with BBQ!</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="flex gap-4 p-4 border border-gray-100 dark:border-dark-border rounded-[1.5rem] bg-gray-50 dark:bg-dark-card group hover:border-pioneer-red transition-all"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale-[0.2] contrast-125"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-black text-charcoal dark:text-white leading-[1.1] uppercase italic tracking-tighter">{item.name}</h4>
                        <p className="text-pioneer-red font-black text-sm tracking-tight">Rs. {item.price}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-4 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border px-2 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-gray-400 hover:text-pioneer-red transition-colors"
                          >
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="font-black w-4 text-center text-sm dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-gray-400 hover:text-pioneer-red transition-colors"
                          >
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-gray-100 dark:border-transparent space-y-6 bg-charcoal dark:bg-black text-white">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <span>Delivery Fee</span>
                    <span>Rs. {deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between items-end pt-3 border-t border-gray-800">
                    <span className="text-lg font-black uppercase italic tracking-tighter">Grand Total</span>
                    <span className="text-3xl font-black text-yellow-400 tracking-tighter">Rs. {subtotal + deliveryCharge}</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const phoneNumber = "923182234310";
                    const itemList = items.map(item => `${item.quantity}x ${item.name} - Rs. ${item.price * item.quantity}`).join('%0A');
                    const message = `Assalam-o-Alaikum Pioneer Kabab House,%0A%0AI want to order:%0A%0A${itemList}%0A%0A*Total Bill: Rs. ${subtotal + deliveryCharge}*`;
                    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                  }}
                  className="w-full bg-pioneer-red hover:bg-red-700 text-white font-black py-5 rounded-2xl text-base uppercase tracking-widest transition-all scale-100 hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-red-900/40"
                >
                  Confirm Order via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
