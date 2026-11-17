import { useState } from 'react';
import { Mail, Lock, ArrowRight, User, CheckCircle } from 'lucide-react';
import type { AppRoute } from '../types/routes';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onNavigate: (route: AppRoute) => void;
}

const DEMO_CREDENTIALS = [
  {
    label: 'Customer',
    email: 'customer@maisonlarder.com',
    password: 'password123',
  },
  {
    label: 'Admin',
    email: 'admin@maisonlarder.com',
    password: 'password123',
  },
];

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error ?? 'Unable to sign in. Please try again.');
      return;
    }
    setSuccess(`Welcome back, ${email}.`);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const result = register(name, email, password);
    if (!result.ok) {
      setError(result.error ?? 'Unable to create account. Please try again.');
      return;
    }
    setSuccess('Account created. You are now signed in.');
  };

  const inputClass =
    'w-full rounded-lg bg-[#FBF9F5] border-[1.5px] border-[#E5DFD7] px-3.5 py-2.5 text-[14px] text-[#1E1E1C] placeholder:text-[#63615C] focus:outline-none focus:border-[#9E3D24] transition-colors';

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#FBF9F5] px-5 sm:px-8 lg:px-12 pb-12">
      <div className="max-w-md w-full space-y-8">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#9E3D24] text-[#FBF9F5] mx-auto mb-3">
            <User className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="font-editorial text-3xl font-semibold text-[#1E1E1C] tracking-tight">
            Welcome to Maison Larder
          </h2>
          <p className="text-[15px] text-[#56423D] leading-relaxed">
            Sign in to your larder account to track orders, save delivery details, and reserve weekly provisions.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5DFD7] p-8 sm:p-10 shadow-[0_12px_32px_-4px_rgba(30,30,28,0.06)] space-y-6">
          {mode === 'signin' ? (
            <>
              <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="login-email"
                    className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#63615C] pointer-events-none" />
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value as string)}
                      placeholder="you@email.com"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-[12px] font-medium text-[#9E3D24] underline underline-offset-4 hover:text-[#7E260F] cursor-pointer"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#63615C] pointer-events-none" />
                    <input
                      id="login-password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value as string)}
                      placeholder="••••••••"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-[#E5DFD7] text-[#9E3D24] focus:ring-[#9E3D24] h-4 w-4"
                  />
                  <label htmlFor="remember" className="text-[13px] text-[#56423D]">
                    Remember me on this device
                  </label>
                </div>

                {error && (
                  <div role="alert" className="rounded-lg p-3 bg-[#FBECEA] border border-[#E2B8B0] text-[13px] font-medium text-[#BA1A1A]">
                    {error}
                  </div>
                )}
                {success && (
                  <div role="status" className="rounded-lg p-3 bg-[#EBF4EC] border border-[#B9DCC0] text-[13px] font-medium text-[#3D6B3A] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#4A5A3F]" aria-hidden="true" />
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full min-h-[48px] rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[15px] font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? null : <ArrowRight className="w-4 h-4" />}
                  Sign in to your larder
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#E5DFD7]"></span>
                </div>
                <span className="relative flex -mx-3 px-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-[#63615C] bg-[#FFFFFF]">
                  Or create a new account
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMode('signup')}
                className="w-full min-h-[44px] rounded-lg border-[1.5px] border-[#E5DFD7] bg-[#FBF9F5] text-[14px] font-medium text-[#1E1E1C] transition-colors hover:bg-[#F3EFEA] flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" aria-hidden="true" />
                Create an account
              </button>
            </>
          ) : (
            <>
              <form onSubmit={handleSignUp} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="signup-name"
                    className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]"
                  >
                    Full name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value as string)}
                    placeholder="Clara Lindqvist"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="signup-email"
                    className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#63615C] pointer-events-none" />
                    <input
                      id="signup-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value as string)}
                      placeholder="you@email.com"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="signup-password"
                    className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#56423D]"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#63615C] pointer-events-none" />
                    <input
                      id="signup-password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value as string)}
                      placeholder="••••••••"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                  <p className="text-[12px] text-[#63615C]">
                    Must be at least 6 characters.
                  </p>
                </div>

                {error && (
                  <div role="alert" className="rounded-lg p-3 bg-[#FBECEA] border border-[#E2B8B0] text-[13px] font-medium text-[#BA1A1A]">
                    {error}
                  </div>
                )}
                {success && (
                  <div role="status" className="rounded-lg p-3 bg-[#EBF4EC] border border-[#B9DCC0] text-[13px] font-medium text-[#3D6B3A] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#4A5A3F]" aria-hidden="true" />
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full min-h-[48px] rounded-lg bg-[#9E3D24] hover:bg-[#7E260F] text-[#FBF9F5] text-[15px] font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? null : <ArrowRight className="w-4 h-4" />}
                  Create account
                </button>
              </form>

              <p className="text-center text-[13px] text-[#63615C]">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="font-semibold text-[#9E3D24] underline underline-offset-4 hover:text-[#7E260F] cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </>
          )}

          {/* Demo credentials hint */}
          <details className="rounded-lg border border-[#E5DFD7] bg-[#F3EFEA]/50">
            <summary
              className="flex items-center justify-between cursor-pointer list-none p-3 text-[12px] font-semibold text-[#4A5A3F]"
            >
              Demo credentials
              <span className="text-[10px]">▾</span>
            </summary>
            <div className="p-3 space-y-2 border-t border-[#E5DFD7]">
              {DEMO_CREDENTIALS.map((c) => (
                <div key={c.label} className="text-[12px] text-[#1E1E1C] space-y-0.5">
                  <p className="font-semibold text-[#56423D] uppercase tracking-[0.03em]">
                    {c.label}
                  </p>
                  <p className="text-[#63615C]">{c.email}</p>
                  <p className="text-[#63615C]">password123</p>
                </div>
              ))}
            </div>
          </details>

          <p className="text-center text-[12px] text-[#63615C]">
            Return to{' '}
            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="font-semibold text-[#1E1E1C] hover:text-[#9E3D24] cursor-pointer"
            >
              the larder
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
