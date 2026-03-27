import { AnimatedTestimonials, type Testimonial } from '../ui/animated-testimonials';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Neha Sharma',
    role: 'Marketing Director',
    company: 'Mumbai',
    content: "As a working professional who travels late, SheSafe gives me complete peace of mind. The one-press SOS is blazingly fast and the GPS tracking is incredibly accurate without needing my phone.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 2,
    name: 'Kavita Desai',
    role: 'Parent',
    company: 'Pune',
    content: "I bought this for my daughter when she started college in a new city. Knowing it doesn't rely on bluetooth or her phone's battery has been a huge relief. Best investment for our family.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 3,
    name: 'Aarohi Patel',
    role: 'Software Engineer',
    company: 'Bangalore',
    content: "The design is elegant and discreet, not looking like a clunky safety device. But functionally, it's a powerhouse. I had to use it once, and my emergency contacts received my location within seconds.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 4,
    name: 'Riya Kapoor',
    role: 'Freelance Designer',
    company: 'Delhi',
    content: "Living alone, having something I can literally just press in my pocket without drawing attention is vital. The fall detection is also a huge bonus that makes me feel safe during my morning runs.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150',
  },
];

export default function TestimonialsSection() {
  return (
    <div style={{ background: 'var(--color-off-white)' }}>
      <AnimatedTestimonials 
        testimonials={testimonials} 
        title="Women Who Trust SheSafe"
        subtitle="Don't just take our word for it. Read real stories from women relying on SheSafe every single day for their safety and peace of mind."
      />
    </div>
  );
}
