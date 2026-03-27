import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, Shield } from 'lucide-react';
import { useAuth, UserButton } from '@clerk/react';
import { useCartStore } from '../../stores/cartStore';
import { cn } from '../../lib/utils';

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About',    to: '/#about' },
  { label: 'Contact',  to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const navigate                  = useNavigate();
  const location                  = useLocation();
  const totalItems                = useCartStore((s) => s.totalItems());
  const { isSignedIn, isLoaded }  = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'glass-dark shadow-sm' : 'bg-transparent'
        )}
      >
        <nav className="container-safe flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="SheSafe Home">
            <div className="w-8 h-8 rounded-full gradient-rose flex items-center justify-center shadow-rose">
              <Shield size={16} className="text-white" strokeWidth={1.5} />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight text-white">
              SheSafe
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="font-sans text-sm text-white/80 hover:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-rose-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-full text-white/80 hover:text-white transition-colors"
              aria-label={`Cart (${totalItems} items)`}
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full gradient-rose text-white text-[10px] font-semibold flex items-center justify-center leading-none"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </motion.span>
              )}
            </button>

            {/* Auth — show after Clerk loads to avoid flash */}
            {isLoaded && (
              isSignedIn ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2 rounded-full text-white/80 hover:text-white transition-colors"
                    aria-label="Dashboard"
                  >
                    <User size={20} strokeWidth={1.5} />
                  </button>
                  {/* UserButton: Clerk's built-in avatar with profile + sign-out menu */}
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8 ring-2 ring-rose-400/50',
                      },
                    }}
                  />
                </div>
              ) : (
                <Link
                  to="/login"
                  className="gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider px-5 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all duration-200 shadow-rose"
                >
                  Sign In
                </Link>
              )
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 md:hidden flex flex-col"
              style={{ background: 'var(--color-midnight)' }}
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
                <span className="font-display text-lg text-white font-semibold">SheSafe</span>
                <button onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 px-6 py-8 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <Link
                      to={link.to}
                      className="block py-3 text-white/80 hover:text-white font-sans text-base transition-colors border-b border-white/5"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-6 pb-10 flex flex-col gap-3">
                <button
                  onClick={() => navigate('/cart')}
                  className="flex items-center gap-2 text-white/70 hover:text-white font-sans text-sm py-2"
                >
                  <ShoppingCart size={18} strokeWidth={1.5} />
                  Cart {totalItems > 0 && <span style={{ color: 'var(--color-rose)' }}>({totalItems})</span>}
                </button>

                {isLoaded && (
                  isSignedIn ? (
                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="font-sans text-sm text-white/70 hover:text-white"
                      >
                        My Dashboard
                      </button>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="gradient-rose text-white font-sans text-sm font-medium uppercase tracking-wider px-5 py-3 rounded-full text-center mt-2"
                    >
                      Sign In
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
