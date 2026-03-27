import { motion } from 'framer-motion';
import { Shield, Zap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Animation variants ───────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const floatAnim = {
  y: [-6, 6, -6],
  transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden noise-overlay gradient-hero"
      aria-label="Hero"
    >
      {/* Rose ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          right: '5%', top: '50%', transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(217,95,127,0.18) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="container-safe relative z-10 w-full pt-24 pb-16 md:pt-0">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8 min-h-screen md:min-h-0 md:py-28">

          {/* ── Left: Text ───────────────────────────────────── */}
          <motion.div
            className="flex-1 max-w-[560px]"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(217,95,127,0.15)', color: 'var(--color-rose-light)', border: '1px solid rgba(217,95,127,0.25)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                Now Available Across India
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-white mb-5 leading-tight"
              style={{ fontSize: 'clamp(42px, 6vw, 82px)', letterSpacing: '-0.02em' }}
            >
              Protection That Works
              <span className="block" style={{ color: 'var(--color-rose-light)' }}>
                Without Your Phone
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="font-sans text-base md:text-lg leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300, maxWidth: 460 }}
            >
              SheSafe pendants send SOS alerts, track GPS location, and alert your trusted contacts — all without needing a smartphone nearby.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/products"
                className="gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider px-7 py-3.5 rounded-full shadow-rose hover:brightness-110 active:scale-95 transition-all duration-200"
              >
                Shop Now
              </Link>
              <a
                href="#how-it-works"
                className="font-sans text-[13px] font-medium uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Learn More
              </a>
            </motion.div>

            {/* Micro feature bullets */}
            <motion.ul variants={fadeUp} className="flex flex-col gap-2.5">
              {[
                { icon: Zap,    text: 'SOS alerts sent in under 5 seconds' },
                { icon: MapPin, text: 'Real-time GPS tracking without a phone' },
                { icon: Shield, text: 'Up to 48 hours battery backup' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 font-sans text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <Icon size={14} strokeWidth={1.5} style={{ color: 'var(--color-rose-light)', flexShrink: 0 }} />
                  {text}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── Right: Product Visual ─────────────────────────── */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <motion.div animate={floatAnim} className="relative">
              {/* Glassmorphism card */}
              <div
                className="relative rounded-2xl p-8 md:p-10"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(217,95,127,0.25)',
                  boxShadow: '0 0 60px rgba(217,95,127,0.2), 0 32px 64px rgba(15,25,35,0.4)',
                  width: 320,
                }}
              >
                {/* Rose glow behind pendant */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 60%, rgba(217,95,127,0.12) 0%, transparent 70%)',
                  }}
                />

                {/* SVG Pendant illustration */}
                <div className="flex justify-center mb-6">
                  <PendantIllustration />
                </div>

                {/* Label */}
                <div className="text-center">
                  <span
                    className="font-sans text-[11px] font-medium uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: 'rgba(217,95,127,0.15)', color: 'var(--color-rose-light)', border: '1px solid rgba(217,95,127,0.2)' }}
                  >
                    Standalone Safety Device
                  </span>
                  <p className="font-display text-white text-xl font-semibold mt-3">
                    Protect Pendant
                  </p>
                  <p className="font-sans text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Starting at ₹1,999
                  </p>
                </div>

                {/* Stats row */}
                <div className="flex justify-between mt-6 pt-5 border-t border-white/10">
                  {[['48hr', 'Battery'], ['&lt;5s', 'SOS Alert'], ['Pan-India', 'Coverage']].map(([val, label]) => (
                    <div key={label} className="text-center">
                      <p
                        className="font-display font-semibold text-white"
                        style={{ fontSize: 18 }}
                        dangerouslySetInnerHTML={{ __html: val }}
                      />
                      <p className="font-sans text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative corner dots */}
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full gradient-rose opacity-60" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full" style={{ background: 'rgba(217,95,127,0.4)' }} />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
      >
        <span className="font-sans text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>Scroll</span>
        <motion.div
          className="w-px h-8 origin-top"
          style={{ background: 'linear-gradient(to bottom, rgba(217,95,127,0.6), transparent)' }}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

// ─── SVG Pendant Illustration ──────────────────────────────────
function PendantIllustration() {
  return (
    <svg width="140" height="180" viewBox="0 0 140 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SheSafe pendant illustration">
      {/* Chain */}
      <path d="M70 0 Q80 10 70 20 Q60 30 70 40" stroke="rgba(242,164,184,0.4)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Pendant body */}
      <circle cx="70" cy="105" r="50" fill="rgba(15,25,35,0.9)" stroke="rgba(217,95,127,0.5)" strokeWidth="1.5"/>
      {/* Inner glow ring */}
      <circle cx="70" cy="105" r="42" fill="none" stroke="rgba(217,95,127,0.15)" strokeWidth="1"/>
      {/* Shield icon */}
      <path
        d="M70 82 L85 89 L85 102 Q85 114 70 120 Q55 114 55 102 L55 89 Z"
        fill="rgba(217,95,127,0.2)"
        stroke="rgba(217,95,127,0.8)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* SOS text */}
      <text x="70" y="109" textAnchor="middle" fill="rgba(242,164,184,0.9)" fontSize="9" fontFamily="DM Sans, sans-serif" fontWeight="600" letterSpacing="1">SOS</text>
      {/* Outer ring decoration */}
      <circle cx="70" cy="105" r="49" fill="none" stroke="rgba(217,95,127,0.1)" strokeWidth="0.5" strokeDasharray="4 4"/>
    </svg>
  );
}
