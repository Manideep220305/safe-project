import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const navigate = useNavigate();
  const subtotal = totalPrice();
  const shipping = subtotal > 0 ? (subtotal >= 2500 ? 0 : 99) : 0;
  const total = subtotal + shipping;

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit"
      style={{ background: 'var(--color-off-white)', minHeight: '100vh', paddingTop: 100 }}
    >
      <div className="container-safe py-12">
        <h1 className="font-display font-semibold mb-10" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--color-midnight)' }}>
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag size={48} strokeWidth={1} style={{ color: 'var(--color-border)', marginBottom: 16 }} />
            <p className="font-sans text-lg mb-2" style={{ color: 'var(--color-slate-light)' }}>Your cart is empty</p>
            <Link to="/products" className="font-sans text-sm mt-4 underline underline-offset-4" style={{ color: 'var(--color-rose)' }}>
              Browse Products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-5 bg-white rounded-2xl p-5"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <div className="w-20 h-20 rounded-xl flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(217,95,127,0.1), rgba(247,220,227,0.3))' }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-medium text-sm" style={{ color: 'var(--color-midnight)' }}>{item.name}</p>
                    <p className="font-display font-semibold mt-0.5" style={{ color: 'var(--color-rose)', fontSize: 18 }}>
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ border: '1px solid var(--color-border)' }}>
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus size={14} strokeWidth={1.5} style={{ color: 'var(--color-slate)' }} />
                    </button>
                    <span className="font-sans text-sm w-5 text-center" style={{ color: 'var(--color-midnight)' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus size={14} strokeWidth={1.5} style={{ color: 'var(--color-slate)' }} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.productId)} aria-label="Remove item" style={{ color: 'var(--color-slate-light)' }}>
                    <Trash2 size={16} strokeWidth={1.5} />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white rounded-2xl p-7 sticky top-28" style={{ border: '1px solid var(--color-border)' }}>
                <h2 className="font-display font-semibold mb-6" style={{ fontSize: 22, color: 'var(--color-midnight)' }}>Order Summary</h2>
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex justify-between font-sans text-sm" style={{ color: 'var(--color-slate)' }}>
                    <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm" style={{ color: 'var(--color-slate)' }}>
                    <span>Shipping</span>
                    <span style={{ color: shipping === 0 ? 'var(--color-success)' : 'var(--color-slate)' }}>
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-sans font-medium pt-4" style={{ color: 'var(--color-midnight)', borderTop: '1px solid var(--color-border)', fontSize: 16 }}>
                    <span>Total</span><span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
                {shipping > 0 && (
                  <p className="font-sans text-[12px] mb-5" style={{ color: 'var(--color-slate-light)' }}>
                    Add ₹{(2500 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/checkout')}
                  className="w-full gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider py-3.5 rounded-full shadow-rose hover:brightness-110 transition-all duration-200"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.main>
  );
}
