import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

type FormState = {
  name: string; phone: string; address: string;
  city: string; state: string; pincode: string;
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({ name: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [placed, setPlaced] = useState(false);

  const subtotal = totalPrice();
  const shipping = subtotal >= 2500 ? 0 : 99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setPlaced(true);
  };

  const field = (id: keyof FormState, label: string, placeholder: string) => (
    <div key={id}>
      <label htmlFor={id} className="block font-sans text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-slate)' }}>
        {label}
      </label>
      <input
        id={id} required placeholder={placeholder}
        value={form[id]}
        onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
        className="w-full font-sans text-sm py-3 px-4 rounded-xl transition-all duration-200"
        style={{ border: '1.5px solid var(--color-border)', background: '#fff', color: 'var(--color-midnight)', outline: 'none' }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--color-rose)'; e.target.style.boxShadow = '0 0 0 3px rgba(217,95,127,0.12)'; }}
        onBlur={(e)  => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none'; }}
      />
    </div>
  );

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit"
      style={{ background: 'var(--color-off-white)', minHeight: '100vh', paddingTop: 100 }}
    >
      <div className="container-safe py-12">
        {placed ? (
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-center px-6 py-20 max-w-lg mx-auto bg-white rounded-3xl shadow-card">
            <div className="w-20 h-20 rounded-full gradient-rose flex items-center justify-center mx-auto mb-6 shadow-rose-lg">
              <span className="text-3xl text-white">✓</span>
            </div>
            <h1 className="font-display font-bold text-3xl mb-3" style={{ color: 'var(--color-midnight)' }}>Order Placed!</h1>
            <p className="font-sans text-[15px] mb-10 leading-relaxed" style={{ color: 'var(--color-slate)', fontWeight: 300 }}>
              Your SheSafe pendant is formally secured and on its way. Stay safe! 💜
            </p>
            <button
              onClick={() => navigate('/')}
              className="gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider px-9 py-4 rounded-full shadow-rose hover:brightness-110 transition-all duration-200"
            >
              Back to Home
            </button>
          </motion.div>
        ) : (
          <>
            <h1 className="font-display font-bold mb-10" style={{ fontSize: 'clamp(32px, 4vw, 44px)', color: 'var(--color-midnight)' }}>
              Secure Checkout
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Form Section */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 bg-white p-8 rounded-3xl shadow-sm border border-pink-100/50">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-display font-semibold text-2xl" style={{ color: 'var(--color-midnight)' }}>Delivery Details</h2>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded-full">Step 1 of 2</span>
                </div>
                
                {field('name',    'Full Name',   'Priya Sharma')}
                {field('phone',   'Phone Number', '+91 98765 43210')}
                {field('address', 'Street Address', '123 Safe Street, Smart City')}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {field('city',  'City',   'Hyderabad')}
                  {field('state', 'State',  'Telangana')}
                </div>
                {field('pincode', 'Pincode / ZIP', '500001')}
                
                <div className="mt-4 pt-6 border-t border-pink-100/50">
                  <motion.button
                    type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    disabled={items.length === 0}
                    className="w-full gradient-rose text-white font-sans text-sm font-medium uppercase tracking-wider py-4 rounded-xl shadow-rose hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm & Place Order
                  </motion.button>
                  <p className="font-sans text-[12px] text-center mt-4" style={{ color: 'var(--color-slate-light)' }}>
                    🔒 256-bit encrypted checkout. Your data is safe.
                  </p>
                </div>
              </form>

              {/* Order Summary Section - Dark Premium Card */}
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="rounded-3xl p-8 sticky top-28 flex flex-col noise-overlay" style={{ 
                  background: 'linear-gradient(135deg, #12242e 0%, #1c2e38 100%)',
                  boxShadow: '0 32px 80px rgba(18,36,46,0.15)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <h2 className="font-display font-semibold mb-6 text-white" style={{ fontSize: 24 }}>Order Summary</h2>
                  
                  <ul className="flex flex-col gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {items.length === 0 ? (
                      <li className="font-sans text-sm text-white/50 py-4 text-center">Your cart is empty.</li>
                    ) : items.map((item) => (
                      <li key={item.productId} className="flex justify-between items-center font-sans">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                            <span className="text-[10px] uppercase text-white/40 tracking-wider">Qty {item.quantity}</span>
                          </div>
                          <span className="text-[14px] text-white/90 font-medium">{item.name}</span>
                        </div>
                        <span className="text-[14px] text-white font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-3 font-sans text-[14px] text-white/70 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? 'text-emerald-400' : ''}>
                        {shipping === 0 ? 'Free Delivery' : `₹${shipping}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between font-display items-end pt-5 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div>
                      <span className="block text-sm text-white/50 font-sans mb-1 tracking-wide">Total to pay</span>
                      <span className="text-[12px] font-sans text-rose-400">Includes all taxes</span>
                    </div>
                    <span className="text-3xl font-bold text-white">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
            </div>
          </>
        )}
      </div>
    </motion.main>
  );
}
