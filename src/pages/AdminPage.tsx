import { motion } from 'framer-motion';
import { useState } from 'react';
import { Package, Users, LayoutDashboard } from 'lucide-react';
import { PRODUCTS } from '../types';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

const TABS = ['Products', 'Orders', 'Customers'] as const;
type Tab = typeof TABS[number];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('Products');

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit"
      style={{ background: 'var(--color-off-white)', minHeight: '100vh', paddingTop: 100 }}
    >
      <div className="container-safe py-12">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard size={22} strokeWidth={1.5} style={{ color: 'var(--color-rose)' }} />
          <h1 className="font-display font-semibold" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--color-midnight)' }}>
            Admin Panel
          </h1>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="font-sans text-sm px-5 py-2 rounded-full transition-all duration-200"
              style={{
                background: tab === t ? 'var(--color-rose)' : '#fff',
                color: tab === t ? '#fff' : 'var(--color-slate)',
                border: '1px solid',
                borderColor: tab === t ? 'var(--color-rose)' : 'var(--color-border)',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Products' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-sans font-semibold" style={{ fontSize: 16, color: 'var(--color-midnight)' }}>All Products</h2>
              <button className="font-sans text-[13px] font-medium px-5 py-2 rounded-full gradient-rose text-white shadow-rose">
                + Add Product
              </button>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
              <table className="w-full font-sans text-sm">
                <thead>
                  <tr style={{ background: 'var(--color-off-white)', borderBottom: '1px solid var(--color-border)' }}>
                    {['Name', 'Variant', 'Price', 'Actions'].map((h) => (
                      <th key={h} className="text-left p-4 font-medium" style={{ color: 'var(--color-slate)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="p-4" style={{ color: 'var(--color-midnight)' }}>{p.name}</td>
                      <td className="p-4 capitalize" style={{ color: 'var(--color-slate)' }}>{p.variant}</td>
                      <td className="p-4" style={{ color: 'var(--color-rose)' }}>₹{p.price.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="font-sans text-[12px] px-3 py-1 rounded-full" style={{ border: '1px solid var(--color-border)', color: 'var(--color-slate)' }}>Edit</button>
                          <button className="font-sans text-[12px] px-3 py-1 rounded-full" style={{ border: '1px solid var(--color-error)', color: 'var(--color-error)' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'Orders' && (
          <div className="flex flex-col items-center py-16 text-center">
            <Package size={40} strokeWidth={1} style={{ color: 'var(--color-border)', marginBottom: 12 }} />
            <p className="font-sans text-sm" style={{ color: 'var(--color-slate-light)' }}>Orders will appear here once connected to the backend API.</p>
          </div>
        )}

        {tab === 'Customers' && (
          <div className="flex flex-col items-center py-16 text-center">
            <Users size={40} strokeWidth={1} style={{ color: 'var(--color-border)', marginBottom: 12 }} />
            <p className="font-sans text-sm" style={{ color: 'var(--color-slate-light)' }}>Customer data will appear here once connected to the backend API.</p>
          </div>
        )}
      </div>
    </motion.main>
  );
}
