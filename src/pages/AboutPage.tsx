import { motion } from 'framer-motion';
import { Shield, Trophy, Heart, Zap, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.25 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

export default function AboutPage() {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* ── Hero Banner ──────────────────────────────────── */}
      <section
        className="relative pt-36 pb-24 overflow-hidden noise-overlay gradient-hero"
        aria-labelledby="about-hero-heading"
      >
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(208,79,153,0.18) 0%, transparent 55%)',
        }} />
        <div className="container-safe relative z-10 text-center max-w-3xl mx-auto">
          <motion.span
            variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(208,79,153,0.18)', color: '#f3a0ca', border: '1px solid rgba(208,79,153,0.3)' }}
          >
            <Shield size={12} strokeWidth={2} /> Our Story
          </motion.span>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible"
            id="about-hero-heading"
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', lineHeight: 1.1 }}
          >
            Empowering Safety<br />
            <span style={{ color: '#e670ab' }}>with Innovation</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible"
            className="font-sans text-base md:text-xl leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
          >
            At SheSafe, our mission is to redefine personal safety through cutting-edge technology —
            making advanced safety solutions accessible and affordable for every woman, everywhere.
          </motion.p>
        </div>
      </section>

      {/* ── Vision Stats Strip ──────────────────────────── */}
      <section style={{ background: '#fff' }}>
        <div className="container-safe py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Women Protected', icon: Heart },
              { value: '15,000+', label: 'Ideas Competed Against', icon: Zap },
              { value: 'Top 10', label: 'Nationally at IIT Delhi', icon: Trophy },
              { value: '₹1 Lakh', label: 'Incubation Prize Won', icon: Star },
            ].map(({ value, label, icon: Icon }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ background: 'rgba(208,79,153,0.1)' }}>
                  <Icon size={22} style={{ color: 'var(--color-rose)' }} strokeWidth={1.5} />
                </div>
                <p className="font-display font-bold" style={{ fontSize: 28, color: 'var(--color-midnight)' }}>{value}</p>
                <p className="font-sans text-sm text-center" style={{ color: 'var(--color-slate-light)' }}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 1: About SheSafe ─────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-off-white)' }}>
        <div className="container-safe">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <span className="inline-block font-sans text-[11px] uppercase tracking-widest text-rose-500 font-medium mb-3">
                Who We Are
              </span>
              <h2 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--color-midnight)' }}>
                Safety is a Right,<br />Not a Luxury
              </h2>
              <p className="font-sans text-[15px] leading-relaxed mb-5" style={{ color: 'var(--color-slate)', fontWeight: 300 }}>
                We are committed to creating innovative, eco-friendly products that provide real-time
                protection and peace of mind. We believe safety is a right, not a luxury, and we're
                dedicated to making advanced safety solutions accessible and affordable for everyone.
              </p>
              <p className="font-sans text-[15px] leading-relaxed mb-8" style={{ color: 'var(--color-slate)', fontWeight: 300 }}>
                Join us in creating a safer world!
              </p>
              <div className="flex flex-wrap gap-2">
                {['#InnovationForSafety', '#SheSafe', '#ProtectBand', '#Women', '#WomenSafety'].map((tag) => (
                  <span key={tag} className="font-sans text-xs px-3 py-1 rounded-full"
                    style={{ background: 'rgba(208,79,153,0.1)', color: 'var(--color-rose)', border: '1px solid rgba(208,79,153,0.2)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Visual card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="rounded-3xl p-10 flex flex-col gap-5"
              style={{
                background: 'linear-gradient(135deg, #12242e 0%, #1c2e38 100%)',
                border: '1px solid rgba(208,79,153,0.2)',
                boxShadow: '0 32px 80px rgba(18,36,46,0.12)',
              }}
            >
              {[
                { icon: Shield, title: 'SOS in Under 5s', desc: 'Instant alerts without needing a phone.' },
                { icon: MapPin, title: 'Real-Time GPS', desc: 'Your locations shared with trusted contacts.' },
                { icon: Zap, title: '48hr Battery', desc: 'Continuous protection through the day and night.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(208,79,153,0.15)' }}>
                    <Icon size={18} style={{ color: '#e670ab' }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-white text-sm">{title}</p>
                    <p className="font-sans text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Achievement ───────────────────────── */}
      <section className="section-padding" style={{ background: '#fff' }}>
        <div className="container-safe">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="font-sans text-[11px] uppercase tracking-widest text-rose-500 font-medium block mb-3">
              Achievement
            </span>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4vw, 56px)', color: 'var(--color-midnight)', lineHeight: 1.1 }}>
              WE DID IT! 🏆<br />
              <span className="text-rose-500">WE WON IT!</span>
            </h2>
            <p className="font-sans text-base md:text-lg mt-5 max-w-2xl mx-auto" style={{ color: 'var(--color-slate)', fontWeight: 300 }}>
              SheSafe India is one of the <strong>National Champions of SBI CYI</strong> (College Youth Ideathon)
              — making it to the <strong>Top 10 of India's Largest College Entrepreneurship Competition</strong> at IIT Delhi.
            </p>
          </motion.div>

          {/* Photos grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl flex flex-col items-center justify-center gap-3"
              style={{
                height: 280,
                background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                border: '2px dashed #cbd5e1',
              }}
            >
              <span style={{ fontSize: 36 }}>📸</span>
              <p className="font-sans text-sm font-medium" style={{ color: '#64748b' }}>Award Ceremony Photo</p>
              <p className="font-sans text-xs" style={{ color: '#94a3b8' }}>Drop image as <code>public/about-award.png</code></p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="rounded-2xl flex flex-col items-center justify-center gap-3"
              style={{
                height: 280,
                background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                border: '2px dashed #cbd5e1',
              }}
            >
              <span style={{ fontSize: 36 }}>🎤</span>
              <p className="font-sans text-sm font-medium" style={{ color: '#64748b' }}>IIT Delhi Pitch Photo</p>
              <p className="font-sans text-xs" style={{ color: '#94a3b8' }}>Drop image as <code>public/about-pitch.png</code></p>
            </motion.div>
          </div>

          {/* Journey steps */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-10 text-center"
            style={{
              background: 'linear-gradient(135deg, #12242e 0%, #1c2e38 100%)',
              border: '1px solid rgba(208,79,153,0.2)',
            }}
          >
            <p className="font-sans text-[13px] uppercase tracking-widest mb-4" style={{ color: '#e670ab' }}>
              The Journey
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {['15,000+ ideas', 'Top 1,000', 'Top 100', 'Top 15', '🏆 Top 10 Winners'].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="font-sans font-medium text-sm px-4 py-2 rounded-full"
                    style={{ background: i === 4 ? 'linear-gradient(135deg, #d04f99, #e670ab)' : 'rgba(255,255,255,0.08)', color: '#fff' }}>
                    {step}
                  </span>
                  {i < 4 && <span style={{ color: 'rgba(255,255,255,0.3)' }}>→</span>}
                </div>
              ))}
            </div>
            <p className="font-sans text-base text-white/70">
              From a small village in <strong className="text-white">Erumaiyur, Tamil Nadu</strong>{' '}
              ✈️ to the stages of{' '}
              <strong className="text-white">Indian Institute of Technology, Delhi</strong>
            </p>
            <p className="font-sans text-sm mt-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Walked away with a ₹1 Lakh Incubation Prize, two medals, mentorship, and national recognition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Movement ──────────────────────────── */}
      <section className="section-padding gradient-hero noise-overlay relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 40% 60%, rgba(208,79,153,0.15) 0%, transparent 55%)',
        }} />
        <div className="container-safe relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-8"
              style={{ background: 'rgba(208,79,153,0.18)', color: '#f3a0ca', border: '1px solid rgba(208,79,153,0.3)' }}>
              <Heart size={12} strokeWidth={2} fill="#f3a0ca" /> More than a Startup
            </span>

            <h2 className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(32px, 4.5vw, 60px)', lineHeight: 1.1 }}>
              SheSafe is a <span style={{ color: '#e670ab' }}>Movement.</span>
            </h2>

            <p className="font-sans text-base md:text-lg leading-relaxed mb-4"
              style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
              A movement to <strong className="text-white">protect, empower</strong>, and make every woman and child
              feel safe — everywhere, every time!
            </p>

            <p className="font-sans text-base leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
              This isn't just a win — it's the beginning of a revolution in safety.
            </p>

            <div className="flex flex-col gap-2 font-display font-semibold text-white mb-12" style={{ fontSize: 20 }}>
              <p>Let's build a safer tomorrow.</p>
              <p>Let's wear confidence.</p>
              <p style={{ color: '#e670ab' }}>Let's choose SheSafe.</p>
            </div>

            <Link
              to="/products"
              className="gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider px-9 py-4 rounded-full shadow-rose hover:brightness-110 active:scale-95 transition-all duration-200 inline-block"
            >
              Shop SheSafe Now
            </Link>
          </motion.div>
        </div>
      </section>

    </motion.main>
  );
}
