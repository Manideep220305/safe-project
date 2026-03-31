import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../../types';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProductsPreviewSection() {
  return (
    <section
      className="section-padding"
      style={{ background: 'var(--color-off-white)' }}
      aria-labelledby="products-preview-heading"
    >
      <div className="container-safe">

        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="font-sans text-[11px] uppercase tracking-widest font-medium mb-3 block"
            style={{ color: 'var(--color-rose)' }}
          >
            Our Wearables
          </span>
          <h2
            id="products-preview-heading"
            className="font-display font-semibold"
            style={{ fontSize: 'clamp(30px, 4vw, 50px)', color: 'var(--color-midnight)' }}
          >
            Built for Real Emergencies
          </h2>
          <p
            className="font-sans text-base mt-3 max-w-md mx-auto"
            style={{ color: 'var(--color-slate-light)', fontWeight: 300 }}
          >
            Choose the level of protection that fits your life.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PRODUCTS.map((product) => (
            <motion.article
              key={product.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 320, damping: 20 } }}
              className="relative flex flex-col rounded-2xl p-7 transition-shadow duration-300"
              style={{
                background: '#fff8f4',
                border: product.variant === 'advanced'
                  ? '1.5px solid rgba(208,79,153,0.45)'
                  : '1px solid rgba(208,79,153,0.15)',
                boxShadow: product.variant === 'advanced'
                  ? 'var(--shadow-rose)'
                  : 'var(--shadow-card)',
              }}
            >
              {/* Badge */}
              {product.badge && (
                <span
                  className="absolute -top-3 left-7 font-sans text-[11px] font-medium uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: 'var(--color-rose)', color: '#fff' }}
                >
                  {product.badge}
                </span>
              )}

              {/* Product Visual Placeholder */}
              <div
                className="w-full rounded-xl mb-6 flex items-center justify-center"
                style={{
                  height: 160,
                  background: product.variant === 'advanced'
                    ? 'linear-gradient(135deg, rgba(217,95,127,0.1), rgba(247,220,227,0.3))'
                    : 'linear-gradient(135deg, rgba(15,25,35,0.04), rgba(15,25,35,0.08))',
                }}
              >
                <ProductMiniIllustration variant={product.variant} />
              </div>

              {/* Name */}
              <h3
                className="font-display font-semibold mb-1"
                style={{ fontSize: 20, color: 'var(--color-midnight)' }}
              >
                {product.name}
              </h3>

              {/* Price */}
              <p
                className="font-display font-semibold mb-4"
                style={{ fontSize: 26, color: 'var(--color-rose)' }}
              >
                ₹{product.price.toLocaleString()}
              </p>

              {/* Feature pills */}
              <ul className="flex flex-col gap-2 mb-7 flex-1">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 font-sans text-sm" style={{ color: 'var(--color-slate)' }}>
                    <CheckCircle2 size={14} strokeWidth={1.5} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to={`/products/${product.id}`}
                className={
                  product.variant === 'advanced'
                    ? 'gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider px-5 py-3 rounded-full text-center hover:brightness-110 active:scale-95 transition-all duration-200 shadow-rose'
                    : 'font-sans text-[13px] font-medium uppercase tracking-wider px-5 py-3 rounded-full text-center transition-all duration-200'
                }
                style={
                  product.variant !== 'advanced'
                    ? { border: '1.5px solid var(--color-rose)', color: 'var(--color-rose)' }
                    : {}
                }
              >
                View Product
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* View All link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/products"
            className="font-sans text-sm font-medium underline underline-offset-4 transition-colors duration-200"
            style={{ color: 'var(--color-rose)' }}
          >
            View All Products →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Mini product illustration per variant ─────────────────────
function ProductMiniIllustration({ variant }: { variant: string }) {
  const accent = variant === 'premium' ? '#a855f7' : variant === 'advanced' ? '#D95F7F' : '#718096';
  return (
    <svg width="80" height="100" viewBox="0 0 80 100" fill="none" aria-hidden="true">
      <path d="M40 5 Q46 12 40 18 Q34 24 40 30" stroke={`${accent}66`} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="40" cy="62" r="30" fill={`${accent}12`} stroke={`${accent}55`} strokeWidth="1.5"/>
      <path d="M40 46 L52 51 L52 63 Q52 72 40 77 Q28 72 28 63 L28 51 Z" fill={`${accent}25`} stroke={`${accent}99`} strokeWidth="1.5" strokeLinejoin="round"/>
      <text x="40" y="67" textAnchor="middle" fill={`${accent}dd`} fontSize="8" fontFamily="DM Sans, sans-serif" fontWeight="600" letterSpacing="0.5">SOS</text>
    </svg>
  );
}
