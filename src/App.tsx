import { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { MenuItem, CartItem, OrderDetails } from './types';

type AppView = 'MENU' | 'CHECKOUT' | 'CONFIRMATION';

export default function App() {
  const [view, setView] = useState<AppView>('MENU');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pioneer-favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('pioneer-favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const [lastOrderId, setLastOrderId] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const cartCount = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.quantity, 0), 
    [cartItems]
  );

  const cartItemIds = useMemo(() => 
    new Set(cartItems.map(item => item.id)), 
    [cartItems]
  );

  const subtotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    [cartItems]
  );

  const deliveryCharge = cartItems.length > 0 ? 100 : 0;

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView('CHECKOUT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = (details: OrderDetails) => {
    console.log('Order Placed:', { items: cartItems, details });
    const orderId = Math.random().toString(36).substring(2, 9).toUpperCase();
    setLastOrderId(orderId);
    setCartItems([]);
    setView('CONFIRMATION');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'CHECKOUT') {
    return (
      <Checkout 
        onBack={() => setView('MENU')}
        onComplete={handlePlaceOrder}
        subtotal={subtotal}
        deliveryCharge={deliveryCharge}
      />
    );
  }

  if (view === 'CONFIRMATION') {
    return (
      <OrderConfirmation 
        orderId={lastOrderId}
        onHome={() => setView('MENU')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-off-white dark:bg-dark-surface transition-colors duration-300">
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
      
      <main className="min-h-screen">
        <Hero />
        <Menu 
          onAddToCart={handleAddToCart} 
          cartItemIds={cartItemIds} 
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </main>
      
      <Footer />
      <WhatsAppButton />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
