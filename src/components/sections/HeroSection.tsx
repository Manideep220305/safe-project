import { motion } from 'framer-motion';
import { Shield, Zap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as number[] } },
};

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden noise-overlay gradient-hero"
      aria-label="Hero"
    >
      {/* Ambient glows */}
      <div className="absolute pointer-events-none" style={{
        width: 700, height: 700,
        left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        background: 'radial-gradient(circle, rgba(208,79,153,0.12) 0%, transparent 60%)',
        filter: 'blur(100px)',
      }} />
      <div className="absolute pointer-events-none" style={{
        width: 400, height: 400, right: '-5%', bottom: '-10%',
        background: 'radial-gradient(circle, rgba(138,207,209,0.1) 0%, transparent 65%)',
        filter: 'blur(80px)',
      }} />

      <div className="container-safe relative z-10 w-full pt-24 pb-16 md:pt-0">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 min-h-screen lg:min-h-0 lg:py-28">

          {/* ── Left: Copy ─────────────────────────── */}
          <motion.div
            className="flex-1 max-w-[580px]"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(208,79,153,0.18)', color: '#f3a0ca', border: '1px solid rgba(208,79,153,0.28)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#e670ab' }} />
                Now Available Across India
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold leading-tight mb-5"
              style={{
                fontSize: 'clamp(42px, 5.5vw, 80px)',
                letterSpacing: '-0.02em',
                color: '#ffffff',
                textShadow: '0 2px 40px rgba(18,36,46,0.5)',
              }}
            >
              Protection That Works
              <span className="block italic" style={{ color: '#e670ab' }}>
                Without Your Phone.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="font-sans text-base md:text-lg leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.60)', fontWeight: 300, maxWidth: 480 }}
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
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.80)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Learn More
              </a>
            </motion.div>

            {/* Feature bullets */}
            <motion.ul variants={fadeUp} className="flex flex-col gap-2.5">
              {[
                { icon: Zap,    text: 'SOS alerts sent in under 5 seconds' },
                { icon: MapPin, text: 'Real-time GPS tracking without a phone' },
                { icon: Shield, text: 'Up to 48 hours battery backup' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 font-sans text-sm" style={{ color: 'rgba(255,255,255,0.50)' }}>
                  <Icon size={14} strokeWidth={1.5} style={{ color: '#e670ab', flexShrink: 0 }} />
                  {text}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── Right: App UI Mockup ───────────────── */}
          <motion.div
            className="flex-1 flex justify-center w-full"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as number[], delay: 0.35 }}
          >
            <div className="relative" style={{ width: 'min(480px, 100%)' }}>

              {/* ── Main app card ── */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(28,46,56,0.95)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(208,79,153,0.28)',
                  boxShadow: '0 32px 80px rgba(18,36,46,0.7), 0 0 80px rgba(208,79,153,0.15)',
                  padding: '32px 28px',
                }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-sans text-[11px] uppercase tracking-widest" style={{ color: '#8acfd1' }}>SheSafe App</p>
                    <p className="font-display font-semibold text-white text-lg">Live Protection</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: 'rgba(45,155,111,0.15)', border: '1px solid rgba(45,155,111,0.3)' }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2D9B6F' }} />
                    <span className="font-sans text-[11px] font-medium" style={{ color: '#2D9B6F' }}>Active</span>
                  </div>
                </div>

                {/* SOS Button */}
                <div className="flex justify-center my-6">
                  <motion.div
                    animate={{ boxShadow: ['0 0 0 0 rgba(208,79,153,0.5)', '0 0 0 24px rgba(208,79,153,0)', '0 0 0 0 rgba(208,79,153,0)'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                    className="w-28 h-28 rounded-full flex items-center justify-center cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #d04f99 0%, #e670ab 100%)',
                      boxShadow: '0 8px 32px rgba(208,79,153,0.4)',
                    }}
                  >
                    <div className="text-center">
                      <p className="font-display font-bold text-white text-2xl leading-none">SOS</p>
                      <p className="font-sans text-white/70 text-[10px] mt-0.5">Hold 2s</p>
                    </div>
                  </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px w-full my-5" style={{ background: 'rgba(208,79,153,0.15)' }} />

                {/* GPS row */}
                <div className="flex items-center gap-3 mb-4 p-3 rounded-xl" style={{ background: 'rgba(138,207,209,0.07)', border: '1px solid rgba(138,207,209,0.15)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(138,207,209,0.15)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8acfd1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-medium text-white text-[13px]">GPS Tracking</p>
                    <p className="font-sans text-[11px] truncate" style={{ color: '#8acfd1' }}>Hyderabad, Telangana</p>
                  </div>
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#8acfd1' }}
                  />
                </div>

                {/* Emergency contacts */}
                <p className="font-sans text-[11px] uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>Emergency Contacts</p>
                {[
                  { name: 'Amma', initials: 'A', color: '#d04f99' },
                  { name: 'Priya (Sister)', initials: 'P', color: '#8acfd1' },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-3 mb-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-sans font-semibold text-white text-[12px]"
                      style={{ background: c.color + '33', border: `1px solid ${c.color}55` }}>
                      {c.initials}
                    </div>
                    <p className="font-sans text-[13px] text-white/75">{c.name}</p>
                    <div className="ml-auto w-2 h-2 rounded-full" style={{ background: '#2D9B6F' }} />
                  </div>
                ))}

                {/* Battery */}
                <div className="mt-5 flex items-center justify-between">
                  <p className="font-sans text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Device Battery</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 rounded-full overflow-hidden" style={{ width: 80, background: 'rgba(255,255,255,0.1)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ width: '74%', background: 'linear-gradient(90deg, #2D9B6F, #8acfd1)' }}
                      />
                    </div>
                    <span className="font-sans text-[11px] font-medium" style={{ color: '#8acfd1' }}>74%</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating: alert sent chip */}
              <motion.div
                animate={{ y: [3, -5, 3] }}
                transition={{ duration: 3.8, ease: 'easeInOut', repeat: Infinity, delay: 0.8 }}
                className="absolute -left-10 top-32 rounded-2xl px-4 py-2.5 flex items-center gap-2.5"
                style={{
                  background: 'rgba(18,36,46,0.92)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(208,79,153,0.3)',
                  boxShadow: '0 8px 24px rgba(18,36,46,0.5)',
                  minWidth: 170,
                }}
              >
                <div className="w-7 h-7 rounded-full gradient-rose flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                </div>
                <div>
                  <p className="font-sans font-semibold text-white text-[12px]">Alert Sent</p>
                  <p className="font-sans text-[10px]" style={{ color: '#f3a0ca' }}>2 contacts notified</p>
                </div>
              </motion.div>

              {/* Floating: response time chip */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4.2, ease: 'easeInOut', repeat: Infinity, delay: 1.2 }}
                className="absolute -right-8 bottom-24 rounded-2xl px-4 py-2.5 text-center"
                style={{
                  background: 'rgba(18,36,46,0.92)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(138,207,209,0.3)',
                  boxShadow: '0 8px 24px rgba(18,36,46,0.5)',
                  minWidth: 100,
                }}
              >
                <p className="font-display font-bold text-white" style={{ fontSize: 24 }}>&lt;5s</p>
                <p className="font-sans text-[11px]" style={{ color: '#8acfd1' }}>SOS Alert</p>
              </motion.div>

              {/* Decorative rings behind card */}
              <div className="absolute -z-10 rounded-full pointer-events-none" style={{ width: 320, height: 320, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: '1px solid rgba(208,79,153,0.08)' }} />
              <div className="absolute -z-10 rounded-full pointer-events-none" style={{ width: 420, height: 420, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: '1px solid rgba(208,79,153,0.04)' }} />

            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
      >
        <span className="font-sans text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>Scroll</span>
        <motion.div
          className="w-px h-8 origin-top"
          style={{ background: 'linear-gradient(to bottom, rgba(208,79,153,0.6), transparent)' }}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
