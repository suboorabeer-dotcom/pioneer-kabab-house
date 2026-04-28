import { motion, AnimatePresence } from 'motion/react';
import { X, Package, Clock, MapPin, ChevronRight } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderDetails[];
}

export default function OrderHistoryDrawer({ isOpen, onClose, orders }: OrderHistoryDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-dark-surface z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 dark:border-dark-border flex items-center justify-between bg-white dark:bg-dark-surface sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pioneer-red/10 rounded-xl">
                  <Package className="text-pioneer-red" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase italic tracking-tighter text-charcoal dark:text-white">Order History</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your past cravings</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {orders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-dark-border rounded-full flex items-center justify-center">
                    <Clock size={40} className="text-gray-300" />
                  </div>
                  <div>
                    <p className="font-black text-charcoal dark:text-white uppercase italic tracking-tighter">No orders yet</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time to place your first one!</p>
                  </div>
                </div>
              ) : (
                orders.map((order) => (
                  <div 
                    key={order.id}
                    className="p-5 rounded-3xl border border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-dark-card space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-black text-pioneer-red uppercase tracking-widest mb-1">Order #{order.id}</p>
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 
                        order.status === 'Preparing' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'Out for Delivery' ? 'bg-orange-100 text-orange-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                       {order.items.map((item, idx) => (
                         <div key={idx} className="flex justify-between items-center text-xs">
                           <span className="font-bold text-charcoal dark:text-white">
                             {item.quantity}x {item.name}
                             {item.selectedSize && <span className="text-[10px] text-gray-400 ml-1">({item.selectedSize})</span>}
                           </span>
                           <span className="font-black text-gray-400 italic">Rs. {item.price * item.quantity}</span>
                         </div>
                       ))}
                    </div>

                    <div className="pt-3 border-t border-dashed border-gray-200 dark:border-dark-border flex justify-between items-center">
                       <div className="flex items-center gap-2 text-gray-400">
                         <MapPin size={12} />
                         <span className="text-[9px] font-bold uppercase tracking-widest truncate max-w-[150px]">{order.address}</span>
                       </div>
                       <p className="font-black text-charcoal dark:text-white italic tracking-tighter uppercase leading-none">
                         Total <span className="text-lg text-pioneer-red ml-1">Rs. {order.total}</span>
                       </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
