import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Decorative floating particles
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 3,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 3 + 2.5,
  delay: Math.random() * 2,
}));

export default function CTABannerSection() {
  return (
    <section
      className="relative overflow-hidden py-20 gradient-rose"
      aria-labelledby="cta-heading"
    >
      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: 'rgba(255,255,255,0.2)',
            '--duration': `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      <div className="container-safe relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="cta-heading"
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1.15 }}
          >
            Ready to Feel Safe?
          </h2>
          <p
            className="font-sans text-base md:text-lg mb-8 max-w-md mx-auto"
            style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 300 }}
          >
            Join 500+ women who've chosen SheSafe as their everyday safety companion.
          </p>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block"
          >
            <Link
              to="/products"
              className="font-sans font-medium text-[13px] uppercase tracking-wider px-9 py-4 rounded-full transition-all duration-200"
              style={{
                background: '#ffffff',
                color: 'var(--color-rose)',
              }}
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
