import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Search, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../types';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return PRODUCTS;
    }

    return PRODUCTS.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.features.join(' '),
        product.badge ?? '',
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedTerm);
    });
  }, [searchTerm]);

  const comparisonRows = [
    { feature: 'Price', values: { basic: '₹1,999', advanced: '₹2,799', premium: '₹3,499' } },
    { feature: 'SOS Alert', values: { basic: '✓', advanced: '✓', premium: '✓' } },
    { feature: 'GPS Tracking', values: { basic: '—', advanced: '✓', premium: '✓' } },
    { feature: 'Works without phone', values: { basic: '—', advanced: '✓', premium: '✓' } },
    { feature: 'Fall Detection', values: { basic: '—', advanced: '—', premium: '✓' } },
    { feature: 'Microphone Recording', values: { basic: '—', advanced: '—', premium: '✓' } },
    { feature: 'Battery Life', values: { basic: '24 hours', advanced: '36 hours', premium: '48 hours' } },
    { feature: 'Warranty', values: { basic: '1 Year', advanced: '1 Year', premium: '1 Year' } },
  ];

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
        <div className="container-safe py-4 flex flex-wrap items-center gap-4">
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

          <div className="relative ml-auto w-full sm:w-[320px]">
            <Search
              size={16}
              strokeWidth={1.8}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--color-slate-light)' }}
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              className="w-full rounded-full py-2.5 pl-11 pr-4 font-sans text-sm transition-all duration-200"
              style={{
                border: '1px solid var(--color-border)',
                background: 'rgba(255, 255, 255, 0.55)',
                color: 'var(--color-midnight)',
                backdropFilter: 'blur(6px)',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-rose)';
                e.target.style.boxShadow = '0 0 0 3px rgba(208,79,153,0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
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
            {filteredProducts.map((product) => (
              <motion.article
                key={product.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 320, damping: 20 } }}
                className="relative flex flex-col rounded-[28px] p-8 overflow-hidden group"
                style={{
                  background: product.variant === 'advanced' 
                    ? 'linear-gradient(135deg, #12242e 0%, #1c2e38 100%)' 
                    : '#ffffff',
                  border: product.variant === 'advanced'
                    ? '1px solid rgba(208,79,153,0.3)'
                    : '1px solid var(--color-border)',
                  boxShadow: product.variant === 'advanced'
                    ? '0 32px 80px rgba(18,36,46,0.15)'
                    : 'var(--shadow-card)',
                }}
              >
                {/* Subtle dark mode noise for premium cards */}
                {product.variant === 'advanced' && (
                  <div className="absolute inset-0 noise-overlay pointer-events-none" />
                )}

                {product.badge && (
                  <span
                    className="absolute top-6 right-6 font-sans text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-full z-10"
                    style={product.variant === 'advanced'
                      ? { background: 'var(--color-rose)', color: '#fff', boxShadow: '0 4px 12px rgba(208,79,153,0.3)' }
                      : { background: 'var(--color-rose-muted)', color: 'var(--color-rose)' }
                    }
                  >
                    {product.badge}
                  </span>
                )}

                <div
                  className="w-full rounded-2xl mb-7 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    height: 200,
                    background: product.variant === 'advanced'
                      ? 'linear-gradient(135deg, rgba(208,79,153,0.1), rgba(208,79,153,0.02))'
                      : 'linear-gradient(135deg, rgba(15,25,35,0.02), rgba(15,25,35,0.06))',
                    border: product.variant === 'advanced' ? '1px solid rgba(255,255,255,0.05)' : 'none'
                  }}
                >
                  <PendantSVG variant={product.variant} />
                </div>

                <div className="relative z-10 flex flex-col flex-1">
                  <h2 className="font-display font-semibold mb-2" style={{ 
                    fontSize: 22, 
                    color: product.variant === 'advanced' ? '#ffffff' : 'var(--color-midnight)' 
                  }}>
                    {product.name}
                  </h2>

                  <p className="font-sans text-[14px] mb-4 leading-relaxed line-clamp-2 min-h-[42px]" style={{ 
                    color: product.variant === 'advanced' ? 'rgba(255,255,255,0.6)' : 'var(--color-slate-light)', 
                    fontWeight: 300 
                  }}>
                    {product.description}
                  </p>

                  <p className="font-display font-semibold mb-6" style={{ 
                    fontSize: 28, 
                    color: product.variant === 'advanced' ? 'var(--color-rose-light)' : 'var(--color-rose)' 
                  }}>
                    ₹{product.price.toLocaleString()}
                  </p>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 font-sans text-[13px]" style={{ 
                        color: product.variant === 'advanced' ? 'rgba(255,255,255,0.8)' : 'var(--color-slate)' 
                      }}>
                        <CheckCircle2 size={16} strokeWidth={2} style={{ 
                          color: product.variant === 'advanced' ? 'var(--color-rose-light)' : 'var(--color-rose)', 
                          flexShrink: 0 
                        }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/products/${product.id}`}
                    className={
                      product.variant === 'advanced'
                        ? 'gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider px-5 py-4 rounded-full text-center hover:brightness-110 active:scale-95 transition-all duration-200 shadow-rose w-full'
                        : 'font-sans text-[13px] font-medium uppercase tracking-wider px-5 py-4 rounded-full text-center transition-all duration-200 w-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
                    }
                  >
                    View Details
                  </Link>
                </div>
              </motion.article>
            ))}

            {filteredProducts.length === 0 && (
              <div
                className="md:col-span-3 rounded-3xl p-8 text-center"
                style={{
                  border: '1px solid var(--color-border)',
                  background: 'rgba(255, 255, 255, 0.6)',
                  color: 'var(--color-slate)',
                }}
              >
                No products matched your search.
              </div>
            )}
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
            transition={{ duration: 0.6 }}
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
                    {filteredProducts.map((p) => (
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
                  {comparisonRows.map((row, rowIdx) => (
                    <tr
                      key={row.feature}
                      style={{
                        borderBottom: '1px solid var(--color-border)',
                        background: rowIdx % 2 === 0 ? '#fff' : 'rgba(250,248,246,0.5)',
                      }}
                    >
                      <td className="p-4 pl-5 font-medium" style={{ color: 'var(--color-slate)' }}>{row.feature}</td>
                      {filteredProducts.map((product) => {
                        const val = row.values[product.id as 'basic' | 'advanced' | 'premium'] ?? '—';

                        return (
                        <td
                          key={`${row.feature}-${product.id}`}
                          className="p-4 text-center"
                          style={{
                            color: val === '✓' ? 'var(--color-success)' : val === '—' ? 'var(--color-border)' : 'var(--color-midnight)',
                          }}
                        >
                          {val}
                        </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <p className="font-sans text-center mt-5" style={{ color: 'var(--color-slate-light)' }}>
                Clear the search to compare all products.
              </p>
            )}
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
