import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../types';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProductsPage() {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Hero Banner */}
      <section
        className="pt-32 pb-16 gradient-hero noise-overlay relative"
        aria-labelledby="products-hero-heading"
      >
        <div className="container-safe relative z-10 text-center">
          <h1
            id="products-hero-heading"
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Our Wearables
          </h1>
          <p
            className="font-sans text-base md:text-lg max-w-md mx-auto"
            style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}
          >
            Built for real emergencies. Worn every day.
          </p>
        </div>
      </section>

      {/* Filter Bar (UI only) */}
      <section style={{ background: 'var(--color-off-white)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container-safe py-4 flex items-center gap-4">
          <SlidersHorizontal size={16} strokeWidth={1.5} style={{ color: 'var(--color-slate-light)' }} />
          <span className="font-sans text-sm" style={{ color: 'var(--color-slate-light)' }}>Sort by:</span>
          {['Featured', 'Price: Low to High', 'Price: High to Low'].map((opt) => (
            <button
              key={opt}
              className="font-sans text-sm px-4 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: opt === 'Featured' ? 'var(--color-rose)' : 'transparent',
                color: opt === 'Featured' ? '#fff' : 'var(--color-slate)',
                border: '1px solid',
                borderColor: opt === 'Featured' ? 'var(--color-rose)' : 'var(--color-border)',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding" style={{ background: 'var(--color-off-white)' }}>
        <div className="container-safe">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {PRODUCTS.map((product) => (
              <motion.article
                key={product.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 320, damping: 20 } }}
                className="relative flex flex-col rounded-2xl bg-white p-7"
                style={{
                  border: product.variant === 'advanced'
                    ? '1.5px solid rgba(217,95,127,0.4)'
                    : '1px solid var(--color-border)',
                  boxShadow: product.variant === 'advanced'
                    ? 'var(--shadow-rose)'
                    : 'var(--shadow-card)',
                }}
              >
                {product.badge && (
                  <span
                    className="absolute -top-3 left-7 font-sans text-[11px] font-medium uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: 'var(--color-rose)', color: '#fff' }}
                  >
                    {product.badge}
                  </span>
                )}

                <div
                  className="w-full rounded-xl mb-5 flex items-center justify-center"
                  style={{
                    height: 180,
                    background: product.variant === 'advanced'
                      ? 'linear-gradient(135deg, rgba(217,95,127,0.1), rgba(247,220,227,0.3))'
                      : 'linear-gradient(135deg, rgba(15,25,35,0.04), rgba(15,25,35,0.08))',
                  }}
                >
                  <PendantSVG variant={product.variant} />
                </div>

                <h2 className="font-display font-semibold mb-1" style={{ fontSize: 20, color: 'var(--color-midnight)' }}>
                  {product.name}
                </h2>

                <p className="font-sans text-[14px] mb-3 leading-relaxed" style={{ color: 'var(--color-slate-light)', fontWeight: 300 }}>
                  {product.description}
                </p>

                <p className="font-display font-semibold mb-4" style={{ fontSize: 26, color: 'var(--color-rose)' }}>
                  ₹{product.price.toLocaleString()}
                </p>

                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-sans text-sm" style={{ color: 'var(--color-slate)' }}>
                      <CheckCircle2 size={14} strokeWidth={1.5} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/products/${product.id}`}
                  className={
                    product.variant === 'advanced'
                      ? 'gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider px-5 py-3 rounded-full text-center hover:brightness-110 active:scale-95 transition-all duration-200 shadow-rose'
                      : 'font-sans text-[13px] font-medium uppercase tracking-wider px-5 py-3 rounded-full text-center transition-all duration-200'
                  }
                  style={product.variant !== 'advanced' ? { border: '1.5px solid var(--color-rose)', color: 'var(--color-rose)' } : {}}
                >
                  View Details
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Compare Table */}
      <section className="section-padding" style={{ background: '#fff' }}>
        <div className="container-safe">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="font-display font-semibold text-center mb-10"
              style={{ fontSize: 'clamp(26px, 3vw, 40px)', color: 'var(--color-midnight)' }}
            >
              Compare Products
            </h2>
            <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--color-border)' }}>
              <table className="w-full font-sans text-sm">
                <thead>
                  <tr style={{ background: 'var(--color-off-white)', borderBottom: '1px solid var(--color-border)' }}>
                    <th className="text-left p-5 font-medium" style={{ color: 'var(--color-slate)' }}>Feature</th>
                    {PRODUCTS.map((p) => (
                      <th key={p.id} className="p-5 font-semibold text-center" style={{ color: 'var(--color-midnight)' }}>
                        {p.name.replace('Protect Pendant ', '')}
                        {p.badge && (
                          <span className="block text-[10px] font-medium mt-0.5" style={{ color: 'var(--color-rose)' }}>
                            {p.badge}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Price', '₹1,999', '₹2,799', '₹3,499'],
                    ['SOS Alert', '✓', '✓', '✓'],
                    ['GPS Tracking', '—', '✓', '✓'],
                    ['Works without phone', '—', '✓', '✓'],
                    ['Fall Detection', '—', '—', '✓'],
                    ['Microphone Recording', '—', '—', '✓'],
                    ['Battery Life', '24 hours', '36 hours', '48 hours'],
                    ['Warranty', '1 Year', '1 Year', '1 Year'],
                  ].map(([feature, ...vals], rowIdx) => (
                    <tr
                      key={feature}
                      style={{
                        borderBottom: '1px solid var(--color-border)',
                        background: rowIdx % 2 === 0 ? '#fff' : 'rgba(250,248,246,0.5)',
                      }}
                    >
                      <td className="p-4 pl-5 font-medium" style={{ color: 'var(--color-slate)' }}>{feature}</td>
                      {vals.map((val, i) => (
                        <td
                          key={i}
                          className="p-4 text-center"
                          style={{
                            color: val === '✓' ? 'var(--color-success)' : val === '—' ? 'var(--color-border)' : 'var(--color-midnight)',
                          }}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}

function PendantSVG({ variant }: { variant: string }) {
  const accent = variant === 'premium' ? '#a855f7' : variant === 'advanced' ? '#D95F7F' : '#718096';
  return (
    <svg width="90" height="110" viewBox="0 0 80 100" fill="none" aria-hidden="true">
      <path d="M40 5 Q46 12 40 18 Q34 24 40 30" stroke={`${accent}66`} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="40" cy="62" r="30" fill={`${accent}12`} stroke={`${accent}55`} strokeWidth="1.5"/>
      <path d="M40 46 L52 51 L52 63 Q52 72 40 77 Q28 72 28 63 L28 51 Z" fill={`${accent}25`} stroke={`${accent}99`} strokeWidth="1.5" strokeLinejoin="round"/>
      <text x="40" y="67" textAnchor="middle" fill={`${accent}dd`} fontSize="8" fontFamily="DM Sans, sans-serif" fontWeight="600" letterSpacing="0.5">SOS</text>
    </svg>
  );
}
