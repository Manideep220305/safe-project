import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
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

  if (placed) return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--color-off-white)', paddingTop: 100 }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center px-6">
        <div className="w-20 h-20 rounded-full gradient-rose flex items-center justify-center mx-auto mb-6 shadow-rose">
          <span className="text-3xl text-white">✓</span>
        </div>
        <h1 className="font-display font-semibold text-3xl mb-3" style={{ color: 'var(--color-midnight)' }}>Order Placed!</h1>
        <p className="font-sans text-base mb-8" style={{ color: 'var(--color-slate-light)', fontWeight: 300 }}>
          Your SheSafe pendant is on its way. Stay safe! 💜
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider px-8 py-3.5 rounded-full shadow-rose"
        >
          View Orders
        </button>
      </motion.div>
    </div>
  );

  const field = (id: keyof FormState, label: string, placeholder: string) => (
    <div key={id}>
      <label htmlFor={id} className="block font-sans text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-slate)' }}>
        {label}
      </label>
      <input
        id={id} required placeholder={placeholder}
        value={form[id]}
        onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
        className="w-full font-sans text-sm py-3 px-4 rounded-xl"
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
        <h1 className="font-display font-semibold mb-10" style={{ fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--color-midnight)' }}>
          Checkout
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-5">
            <h2 className="font-sans font-semibold text-base" style={{ color: 'var(--color-midnight)' }}>Delivery Address</h2>
            {field('name',    'Full Name',   'Priya Sharma')}
            {field('phone',   'Phone',       '+91 98765 43210')}
            {field('address', 'Address',     '123 Street, Locality')}
            <div className="grid grid-cols-2 gap-5">
              {field('city',  'City',   'Chennai')}
              {field('state', 'State',  'Tamil Nadu')}
            </div>
            {field('pincode', 'Pincode', '600001')}
            <motion.button
              type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="mt-2 gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider py-3.5 rounded-full shadow-rose"
            >
              Place Order
            </motion.button>
          </form>

          <div>
            <div className="bg-white rounded-2xl p-7 sticky top-28" style={{ border: '1px solid var(--color-border)' }}>
              <h2 className="font-display font-semibold mb-5" style={{ fontSize: 20, color: 'var(--color-midnight)' }}>Summary</h2>
              <ul className="flex flex-col gap-2 mb-5 pb-5" style={{ borderBottom: '1px solid var(--color-border)' }}>
                {items.length === 0
                  ? <li className="font-sans text-sm" style={{ color: 'var(--color-slate-light)' }}>No items in cart</li>
                  : items.map((item) => (
                    <li key={item.productId} className="flex justify-between font-sans text-sm" style={{ color: 'var(--color-slate)' }}>
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </li>
                  ))
                }
              </ul>
              <div className="flex justify-between font-sans text-sm mb-2" style={{ color: 'var(--color-slate)' }}>
                <span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-sans font-medium pt-3" style={{ color: 'var(--color-midnight)', borderTop: '1px solid var(--color-border)', fontSize: 16 }}>
                <span>Total</span><span>₹{total.toLocaleString()}</span>
              </div>
              <p className="font-sans text-[12px] mt-4" style={{ color: 'var(--color-slate-light)' }}>
                💳 Razorpay payment integration in Phase 2
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
