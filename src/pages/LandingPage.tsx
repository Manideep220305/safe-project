import { motion } from 'framer-motion';
import HeroSection           from '../components/sections/HeroSection';
import HowItWorksSection     from '../components/sections/HowItWorksSection';
import TrustBarSection       from '../components/sections/TrustBarSection';
import ProductsPreviewSection from '../components/sections/ProductsPreviewSection';
import FeaturesSection       from '../components/sections/FeaturesSection';
import TestimonialsSection   from '../components/sections/TestimonialsSection';
import CTABannerSection      from '../components/sections/CTABannerSection';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

export default function LandingPage() {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />
      <TrustBarSection />
      <HowItWorksSection />
      <ProductsPreviewSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTABannerSection />
    </motion.main>
  );
}
