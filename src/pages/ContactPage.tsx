import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to POST /api/contact
    setSent(true);
  };

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit"
      style={{ background: 'var(--color-off-white)', minHeight: '100vh', paddingTop: 100 }}
    >
      {/* Hero */}
      <section className="gradient-hero py-16 text-center">
        <div className="container-safe">
          <h1 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Get in Touch
          </h1>
          <p className="font-sans text-base" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
            Questions, orders, support — we're here.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: 'var(--color-off-white)' }}>
        <div className="container-safe grid grid-cols-1 md:grid-cols-2 gap-14">

          {/* Info */}
          <div>
            <h2 className="font-display font-semibold mb-8" style={{ fontSize: 28, color: 'var(--color-midnight)' }}>
              SheSafe India
            </h2>
            {[
              { Icon: MapPin, label: 'Address', value: 'Chennai, Tamil Nadu, India' },
              { Icon: Phone,  label: 'Phone',   value: '+91 98765 43210' },
              { Icon: Mail,   label: 'Email',   value: 'hello@theshesafe.in' },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(217,95,127,0.1)', border: '1px solid rgba(217,95,127,0.2)' }}>
                  <Icon size={18} strokeWidth={1.5} style={{ color: 'var(--color-rose)' }} />
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-slate-light)' }}>{label}</p>
                  <p className="font-sans text-sm" style={{ color: 'var(--color-midnight)' }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div className="w-16 h-16 rounded-full gradient-rose flex items-center justify-center mb-5 shadow-rose">
                  <Send size={24} className="text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-2xl mb-2" style={{ color: 'var(--color-midnight)' }}>Message Sent!</h3>
                <p className="font-sans text-sm" style={{ color: 'var(--color-slate-light)', fontWeight: 300 }}>
                  We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {[
                  { id: 'name',    label: 'Your Name',    type: 'text',  placeholder: 'Priya Sharma' },
                  { id: 'email',   label: 'Email Address', type: 'email', placeholder: 'priya@example.com' },
                  { id: 'subject', label: 'Subject',       type: 'text',  placeholder: 'Order inquiry' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block font-sans text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-slate)' }}>
                      {label}
                    </label>
                    <input
                      id={id} type={type} placeholder={placeholder} required
                      value={form[id as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                      className="w-full font-sans text-sm py-3 px-4 rounded-xl transition-all duration-200"
                      style={{
                        border: '1.5px solid var(--color-border)',
                        background: '#fff',
                        color: 'var(--color-midnight)',
                        outline: 'none',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--color-rose)'; e.target.style.boxShadow = '0 0 0 3px rgba(217,95,127,0.12)'; }}
                      onBlur={(e)  => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block font-sans text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-slate)' }}>
                    Message
                  </label>
                  <textarea
                    id="message" rows={5} placeholder="Tell us how we can help..." required
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full font-sans text-sm py-3 px-4 rounded-xl resize-none transition-all duration-200"
                    style={{ border: '1.5px solid var(--color-border)', background: '#fff', color: 'var(--color-midnight)', outline: 'none' }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-rose)'; e.target.style.boxShadow = '0 0 0 3px rgba(217,95,127,0.12)'; }}
                    onBlur={(e)  => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <motion.button
                  type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider py-3.5 rounded-full shadow-rose hover:brightness-110 transition-all duration-200"
                >
                  <Send size={15} strokeWidth={1.5} /> Send Message
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
