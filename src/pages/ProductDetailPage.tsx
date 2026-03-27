import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, CheckCircle2, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../types';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

export default function ProductDetailPage() {
  const { id }         = useParams<{ id: string }>();
  const navigate       = useNavigate();
  const addToCart      = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isWishlisted   = useWishlistStore((s) => s.isWishlisted);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit"
        className="min-h-screen flex items-center justify-center pt-24"
        style={{ background: 'var(--color-off-white)' }}
      >
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold mb-4" style={{ color: 'var(--color-midnight)' }}>
            Product not found
          </h1>
          <button onClick={() => navigate('/products')} className="font-sans text-sm" style={{ color: 'var(--color-rose)' }}>
            ← Back to products
          </button>
        </div>
      </motion.main>
    );
  }

  const handleAddToCart = () => {
    addToCart({ productId: product.id, name: product.name, price: product.price, image: product.image });
    navigate('/cart');
  };

  const handleWishlist = () => {
    toggleWishlist({ productId: product.id, name: product.name, price: product.price, image: product.image });
  };

  const wishlisted = isWishlisted(product.id);
  const accent = product.variant === 'premium' ? '#a855f7' : product.variant === 'advanced' ? '#D95F7F' : '#718096';

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit"
      style={{ background: 'var(--color-off-white)', minHeight: '100vh', paddingTop: 100 }}
    >
      <div className="container-safe py-12">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 font-sans text-sm mb-10 transition-colors duration-200"
          style={{ color: 'var(--color-slate-light)' }}
        >
          <ArrowLeft size={15} strokeWidth={1.5} /> Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Product Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl flex items-center justify-center sticky top-28"
            style={{
              background: product.variant === 'advanced'
                ? 'linear-gradient(135deg, rgba(217,95,127,0.08), rgba(247,220,227,0.2))'
                : 'rgba(15,25,35,0.05)',
              height: 400,
              border: '1px solid var(--color-border)',
            }}
          >
            <svg width="160" height="210" viewBox="0 0 140 180" fill="none" aria-hidden="true">
              <path d="M70 0 Q80 10 70 20 Q60 30 70 40" stroke={`${accent}66`} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <circle cx="70" cy="115" r="58" fill={`${accent}10`} stroke={`${accent}44`} strokeWidth="1.5"/>
              <circle cx="70" cy="115" r="48" fill="none" stroke={`${accent}18`} strokeWidth="1"/>
              <path d="M70 90 L88 98 L88 115 Q88 128 70 136 Q52 128 52 115 L52 98 Z" fill={`${accent}22`} stroke={`${accent}88`} strokeWidth="1.5" strokeLinejoin="round"/>
              <text x="70" y="120" textAnchor="middle" fill={`${accent}cc`} fontSize="11" fontFamily="DM Sans, sans-serif" fontWeight="600" letterSpacing="1">SOS</text>
            </svg>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {product.badge && (
              <span className="inline-block font-sans text-[11px] font-medium uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: 'var(--color-rose)', color: '#fff' }}>
                {product.badge}
              </span>
            )}

            <h1 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--color-midnight)' }}>
              {product.name}
            </h1>

            <p className="font-display font-semibold mb-6" style={{ fontSize: 34, color: 'var(--color-rose)' }}>
              ₹{product.price.toLocaleString()}
            </p>

            <p className="font-sans text-[15px] leading-relaxed mb-8" style={{ color: 'var(--color-slate)', fontWeight: 300 }}>
              {product.description}
            </p>

            <div className="mb-8">
              <h3 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--color-slate-light)' }}>
                Key Features
              </h3>
              <ul className="flex flex-col gap-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-sans text-sm" style={{ color: 'var(--color-slate)' }}>
                    <CheckCircle2 size={16} strokeWidth={1.5} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="flex items-center gap-2 gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider px-8 py-3.5 rounded-full shadow-rose hover:brightness-110 transition-all duration-200"
              >
                <ShoppingCart size={16} strokeWidth={1.5} />
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleWishlist}
                className="flex items-center gap-2 font-sans text-[13px] font-medium uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200"
                style={{
                  border: '1.5px solid',
                  borderColor: wishlisted ? 'var(--color-rose)' : 'var(--color-border)',
                  color: wishlisted ? 'var(--color-rose)' : 'var(--color-slate)',
                }}
              >
                <Heart size={16} strokeWidth={1.5} fill={wishlisted ? 'var(--color-rose)' : 'none'} />
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </motion.button>
            </div>

            <p className="font-sans text-[13px] mt-6" style={{ color: 'var(--color-slate-light)', fontWeight: 300 }}>
              🛡️ Free shipping across India · 1-Year Warranty · 7-Day Returns
            </p>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
