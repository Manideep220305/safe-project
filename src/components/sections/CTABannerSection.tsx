import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

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
      className="pb-32 pt-16 lg:pb-48"
      style={{ background: '#fff8f4' }}
      aria-labelledby="cta-heading"
    >
      <div className="container-safe">
        <div
          className="relative overflow-hidden py-24 px-6 rounded-[2.5rem] lg:rounded-[4rem] text-center"
          style={{
            background: 'var(--color-midnight)',
            border: '1px solid rgba(208,79,153,0.15)',
            boxShadow: '0 20px 60px rgba(18,36,46,0.15)'
          }}
        >
          {/* Big inner glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(208,79,153,0.12) 0%, transparent 60%)' }} />
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
                background: 'rgba(208,79,153,0.25)', // soft pink particles
                '--duration': `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              } as React.CSSProperties}
            />
          ))}

          <div className="relative z-10 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-8" style={{ background: 'rgba(208,79,153,0.15)' }}>
                <ShieldAlert size={32} style={{ color: '#e670ab' }} strokeWidth={1.5} />
              </div>
              <h2
                id="cta-heading"
                className="font-display font-bold mb-6"
                style={{ fontSize: 'clamp(40px, 6vw, 76px)', lineHeight: 1.1, color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
              >
                Ready to Feel Safe?
              </h2>
              <p
                className="font-sans text-base md:text-xl mb-12 max-w-lg mx-auto leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}
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
                  className="gradient-rose font-sans font-medium text-[13px] uppercase tracking-wider px-9 py-4 rounded-full transition-all duration-200 shadow-rose inline-flex items-center"
                  style={{ color: '#ffffff' }}
                >
                  Shop Now
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
