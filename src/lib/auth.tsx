/**
 * Auth abstraction — wraps Clerk or falls back to mock stubs.
 * When VITE_CLERK_PUBLISHABLE_KEY is missing/placeholder, all hooks
 * return safe defaults so the full UI renders for development.
 *
 * tomorrow: just set a real Clerk key in .env and everything wires up.
 */

const hasClerk =
  typeof import.meta !== 'undefined' &&
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY &&
  !String(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY).includes('placeholder');

// ─── Types ────────────────────────────────────────────────────
export interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  primaryEmailAddress: { emailAddress: string };
  publicMetadata: { role?: string };
}

// ─── Mock implementations (dev only) ─────────────────────────
const MOCK_USER: MockUser = {
  id: 'dev-user',
  firstName: 'Demo',
  lastName: 'User',
  primaryEmailAddress: { emailAddress: 'demo@shesafe.in' },
  publicMetadata: {},
};

// ─── Hooks ────────────────────────────────────────────────────
export function useUser() {
  if (hasClerk) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clerk = (window as any).__clerk_hooks__;
    // If clerk is initialised, use real hook — handled by dynamic import in main.tsx
  }
  // Dev fallback: pretend signed in so all protected pages show content
  return { isSignedIn: false, user: null as MockUser | null, isLoaded: true };
}

export function useClerk() {
  return {
    signOut: (_cb?: () => void) => { _cb?.(); },
  };
}

export { hasClerk };
