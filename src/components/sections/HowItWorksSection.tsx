import { motion } from 'framer-motion';
import { ShieldAlert, MapPin, ActivitySquare } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ShieldAlert,
    title: 'Press SOS',
    description: 'Hold the button on your pendant for 2 seconds to trigger an immediate SOS alert.',
  },
  {
    number: '02',
    icon: MapPin,
    title: 'GPS Activates',
    description: 'Your exact GPS location is captured and shared in real time — no phone required.',
  },
  {
    number: '03',
    icon: ActivitySquare,
    title: 'Contacts Alerted',
    description: 'Your trusted contacts and nearby authorities receive your location instantly.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="section-padding"
      style={{ background: 'var(--color-midnight)' }}
      aria-labelledby="hiw-heading"
    >
      <div className="container-safe">

        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="font-sans text-[11px] uppercase tracking-widest font-medium mb-3 block"
            style={{ color: 'var(--color-rose-light)' }}
          >
            Simple & Fast
          </span>
          <h2
            id="hiw-heading"
            className="font-display font-semibold text-white"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            How SheSafe Works
          </h2>
          <p
            className="font-sans text-base mt-3 max-w-md mx-auto"
            style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}
          >
            Three steps. Under five seconds. No smartphone needed.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Connecting dashed line (desktop only) */}
          <div
            className="hidden md:block absolute top-12 left-[22%] right-[22%] h-px pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(to right, rgba(217,95,127,0.35) 0px, rgba(217,95,127,0.35) 8px, transparent 8px, transparent 16px)',
            }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center px-4"
              >
                {/* Large decorative number */}
                <span
                  className="font-display font-bold select-none pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2"
                  style={{
                    fontSize: 100,
                    lineHeight: 1,
                    color: 'rgba(217,95,127,0.06)',
                    zIndex: 0,
                  }}
                >
                  {step.number}
                </span>

                {/* Icon circle */}
                <div
                  className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-rose"
                  style={{
                    background: 'rgba(217,95,127,0.1)',
                    border: '1.5px solid rgba(217,95,127,0.3)',
                  }}
                >
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    style={{ color: 'var(--color-rose-light)' }}
                  />
                </div>

                <h3
                  className="font-display font-semibold text-white mb-2 relative z-10"
                  style={{ fontSize: 22 }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-sans text-[14px] leading-relaxed relative z-10"
                  style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, maxWidth: 240 }}
                >
                  {step.description}
                </p>

                {/* Mobile connector arrow */}
                {i < steps.length - 1 && (
                  <div
                    className="md:hidden mt-6 w-px h-8 mx-auto"
                    style={{ background: 'linear-gradient(to bottom, rgba(217,95,127,0.4), transparent)' }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
