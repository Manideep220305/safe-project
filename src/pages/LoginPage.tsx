import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Shield } from 'lucide-react';
import { SignIn, SignUp } from '@clerk/react';
import { useNavigate } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as number[] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

// Clerk appearance — make the modal blend with the dark SheSafe palette
const clerkAppearance = {
  variables: {
    colorBackground:       'rgba(255,255,255,0.04)',
    colorInputBackground:  'rgba(255,255,255,0.06)',
    colorInputText:        '#fff',
    colorText:             'rgba(255,255,255,0.85)',
    colorTextSecondary:    'rgba(255,255,255,0.45)',
    colorPrimary:          '#D95F7F',
    colorDanger:           '#f87171',
    borderRadius:          '14px',
    fontFamily:            'var(--font-sans)',
  },
  elements: {
    card:                  'bg-transparent shadow-none border-0 p-0',
    headerTitle:           'hidden',
    headerSubtitle:        'hidden',
    socialButtonsBlockButton:
      'border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors',
    formButtonPrimary:
      'gradient-rose text-white font-sans text-[13px] font-medium uppercase tracking-wider rounded-full shadow-rose hover:brightness-110 transition-all duration-200',
    formFieldInput:
      'font-sans text-sm rounded-xl border border-white/10 bg-white/6 text-white placeholder:text-white/30 focus:border-rose-400/60 focus:outline-none',
    formFieldLabel:
      'font-sans text-[13px] text-white/60',
    footerActionLink:
      'text-rose-400 hover:text-rose-300',
    identityPreviewEditButtonIcon:
      'text-white/60',
    dividerLine:           'bg-white/10',
    dividerText:           'text-white/30',
    footer:                'hidden',  // hide "Secured by Clerk" footer
  },
};

export default function LoginPage() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const navigate = useNavigate();

  return (
    <motion.main
      variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="min-h-screen flex items-center justify-center gradient-hero noise-overlay relative"
    >
      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{
        width: 500, height: 500, right: 0, bottom: 0,
        background: 'radial-gradient(circle, rgba(217,95,127,0.12) 0%, transparent 65%)',
        filter: 'blur(80px)',
      }} />

      <div className="relative z-10 w-full max-w-md px-6 py-16 flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-full gradient-rose flex items-center justify-center shadow-rose">
            <Shield size={18} className="text-white" strokeWidth={1.5} />
          </div>
          <span className="font-display text-2xl font-semibold text-white">SheSafe</span>
        </div>

        {/* Tab toggle */}
        <div className="flex mb-8 rounded-full p-1" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
          {(['sign-in', 'sign-up'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="font-sans font-medium text-[13px] uppercase tracking-wider px-7 py-2.5 rounded-full transition-all duration-200"
              style={{
                background: mode === m ? 'var(--color-rose)' : 'transparent',
                color:      mode === m ? '#fff' : 'rgba(255,255,255,0.55)',
              }}
            >
              {m === 'sign-in' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Clerk components */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {mode === 'sign-in' ? (
              <motion.div key="signin"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <SignIn
                  appearance={clerkAppearance}
                  afterSignInUrl="/dashboard"
                  signUpUrl="/login"
                />
              </motion.div>
            ) : (
              <motion.div key="signup"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <SignUp
                  appearance={clerkAppearance}
                  afterSignUpUrl="/dashboard"
                  signInUrl="/login"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
}
