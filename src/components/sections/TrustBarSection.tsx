import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const stats = [
  { value: 500, suffix: '+',  label: 'Early Users' },
  { value: 4.8, suffix: '★', label: 'Avg Rating (Beta)', decimal: true },
  { value: 28,  suffix: '+',  label: 'States Covered' },
  { value: 1,   suffix: '-Year', label: 'Warranty' },
];

function AnimatedNumber({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const ref        = useRef<HTMLSpanElement>(null);
  const inView     = useInView(ref, { once: true, margin: '-80px' });
  const motionVal  = useMotionValue(0);
  const spring     = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      setDisplay(decimal ? v.toFixed(1) : Math.round(v).toString());
    });
    return unsub;
  }, [spring, decimal]);

  return (
    <span ref={ref} className="font-display font-bold text-white tabular-nums" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
      {display}{suffix}
    </span>
  );
}

export default function TrustBarSection() {
  return (
    <section
      className="py-14"
      style={{ background: 'rgba(15,25,35,0.97)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      aria-label="Trust statistics"
    >
      <div className="container-safe">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                padding: '0 24px',
              }}
            >
              <AnimatedNumber target={stat.value} suffix={stat.suffix} decimal={stat.decimal} />
              <p
                className="font-sans text-[13px] mt-1.5"
                style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
