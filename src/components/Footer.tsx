import { MapPin, Phone, Instagram, Facebook, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-pioneer-red text-white p-2 font-black rounded-lg text-xl tracking-tighter w-10 h-10 flex items-center justify-center shadow-lg shadow-pioneer-red/20">
                PK
              </div>
              <div>
                <h1 className="text-xl font-black uppercase tracking-tight text-charcoal leading-none">
                  Pioneer Kabab House
                </h1>
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-pioneer-red mt-0.5">House of Taste</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-sm font-medium">
              Karachi's finest charcoal BBQ and crispy zingers. Serving tradition with a modern bento twist.
            </p>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h4 className="font-black uppercase text-xs tracking-widest text-gray-400">Location</h4>
            <p className="text-sm font-bold text-charcoal flex items-start gap-2">
              <MapPin size={16} className="text-pioneer-red shrink-0" />
              Near Mukka Chowk, Ayesha Manzil, F.B. Area, Karachi
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-black uppercase text-xs tracking-widest text-gray-400">Ordering</h4>
            <div className="flex flex-col gap-2">
              <a href="tel:+923182234310" className="text-sm font-bold text-pioneer-red border-b border-pioneer-red w-fit">
                CALL: +92 318 2234310
              </a>
              <a href="https://wa.me/923182234310" className="text-sm font-bold text-green-600 border-b border-green-600 w-fit">
                WHATSAPP ORDER
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-pioneer-red rounded-full animate-pulse"></div>
              <span>Orders delivered in 25 to 30 Minutes</span>
            </div>
            <p>© 2024 Pioneer Kabab House Karachi</p>
        </div>
      </div>
      
      {/* Floating Button for Mobile */}
      <a 
        href="https://wa.me/923182234310"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 active:scale-95 group"
      >
        <MessageSquare size={24} />
        <span className="absolute right-full mr-3 bg-charcoal text-white px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          Order on WhatsApp
        </span>
      </a>
    </footer>
  );
}
