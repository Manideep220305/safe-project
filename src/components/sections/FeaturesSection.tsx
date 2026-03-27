import { motion } from 'framer-motion';
import { ShieldAlert, MapPin, ActivitySquare, Radio, Mic, WifiOff } from 'lucide-react';
import { GlowingEffect } from '../ui/glowing-effect';

const features = [
  {
    icon: ShieldAlert,
    title: 'Instant SOS Alert',
    description: 'One press triggers alerts to your emergency contacts and nearby authorities within seconds.',
  },
  {
    icon: MapPin,
    title: 'Real-Time GPS',
    description: 'Your location is tracked and shared continuously — even in areas with poor network.',
  },
  {
    icon: ActivitySquare,
    title: 'Fall Detection',
    description: 'Built-in accelerometer detects sudden falls and automatically triggers an SOS.',
  },
  {
    icon: Radio,
    title: 'Live Monitoring',
    description: 'Trusted contacts can monitor your live location through the SheSafe dashboard.',
  },
  {
    icon: Mic,
    title: 'Audio Recording',
    description: 'Ambient microphone captures audio during an alert — critical for evidence.',
  },
  {
    icon: WifiOff,
    title: 'Phone-Free Operation',
    description: 'Operates entirely on its own SIM and battery. No smartphone pairing required.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function FeaturesSection() {
  return (
    <section
      className="section-padding"
      style={{ background: 'var(--color-midnight)' }}
      aria-labelledby="features-heading"
    >
      <div className="container-safe">

        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="font-sans text-[11px] uppercase tracking-widest font-medium mb-3 block"
            style={{ color: 'var(--color-rose-light)' }}
          >
            What's Inside
          </span>
          <h2
            id="features-heading"
            className="font-display font-semibold text-white"
            style={{ fontSize: 'clamp(30px, 4vw, 50px)' }}
          >
            Every Feature You Need
          </h2>
          <p
            className="font-sans text-base mt-3 max-w-md mx-auto"
            style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}
          >
            Packed into a pendant light enough to wear every day.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  borderColor: 'rgba(217,95,127,0.4)',
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="group rounded-[1.25rem] p-7 transition-colors duration-300 cursor-default relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <GlowingEffect 
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                  variant="rose-theme"
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(217,95,127,0.12)', border: '1px solid rgba(217,95,127,0.2)' }}
                  >
                    <Icon size={22} strokeWidth={1.5} style={{ color: 'var(--color-rose-light)' }} />
                  </motion.div>

                  <h3
                    className="font-sans font-semibold mb-2 text-white"
                    style={{ fontSize: 16 }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="font-sans text-[14px] leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
