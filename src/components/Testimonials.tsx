import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Mohammad Shafi',
    text: 'Best Zinger in Karachi! Service bohat fast hai.',
    stars: 5
  },
  {
    name: 'Ahmed Raza',
    text: 'Deals ki price bohat munasib hai, khas tor par Deal 8.',
    stars: 5
  },
  {
    name: 'Sara Khan',
    text: 'Broast crispy aur fresh hota hai. Highly recommended!',
    stars: 5
  }
];

export default function Testimonials() {
  return (
    <section className="bg-white dark:bg-dark-surface py-16 sm:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter italic text-charcoal dark:text-gray-100">
            What Our Customers Say
          </h2>
          <div className="h-px flex-1 bg-gray-100 dark:bg-dark-border"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-off-white dark:bg-dark-card p-8 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={16} className="fill-orange-500 text-orange-500" />
                ))}
              </div>
              <p className="text-charcoal dark:text-gray-300 font-medium italic mb-6 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400 font-black text-sm uppercase">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <span className="font-black text-sm text-charcoal dark:text-gray-100 uppercase tracking-wider">
                  {review.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
