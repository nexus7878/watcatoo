import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  LogIn, 
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';

export interface AuthUser {
  name: string;
  email: string;
  isVip?: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: AuthUser) => void;
  onSuccess?: (user: AuthUser) => void;
  promptTitle?: string;
  promptMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSuccess,
  promptTitle,
  promptMessage,
}) => {
  const triggerSuccess = (user: AuthUser) => {
    if (onLoginSuccess) onLoginSuccess(user);
    if (onSuccess) onSuccess(user);
  };
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const displayName = name.trim() || email.split('@')[0] || 'WATCatoo Member';
      triggerSuccess({
        name: displayName,
        email: email.trim(),
        isVip: true,
      });
      onClose();
    }, 600);
  };

  const handleQuickDemoLogin = (role: 'viewer' | 'vip') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      triggerSuccess({
        name: role === 'vip' ? 'Manga Addict VIP' : 'Anime Fan',
        email: role === 'vip' ? 'vip@watcatoo.tv' : 'fan@watcatoo.tv',
        isVip: role === 'vip',
      });
      onClose();
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#101411] border border-[#262D28] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#39E66B]/15 blur-2xl pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#A0AAA2] hover:text-[#F5F7F5] bg-[#151A16] hover:bg-[#1A221D] rounded-full border border-[#262D28] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#151A16] border border-[#39E66B]/30 text-[#39E66B] mb-3 shadow-md shadow-[#39E66B]/10">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-black text-[#F5F7F5] tracking-tight">
            {promptTitle || (tab === 'signin' ? 'Sign In to WATCatoo' : 'Create Your Account')}
          </h2>
          <p className="mt-1.5 text-xs text-[#A0AAA2] max-w-xs mx-auto leading-relaxed">
            {promptMessage || 'Unlock high-definition streaming, uncut Tokyo simulpubs, and unrestricted manga reading.'}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex bg-[#080A09] p-1 rounded-xl border border-[#262D28] mb-6">
          <button
            type="button"
            onClick={() => setTab('signin')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              tab === 'signin'
                ? 'bg-[#151A16] text-[#39E66B] border border-[#39E66B]/30 shadow-xs'
                : 'text-[#A0AAA2] hover:text-[#F5F7F5]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              tab === 'signup'
                ? 'bg-[#151A16] text-[#39E66B] border border-[#39E66B]/30 shadow-xs'
                : 'text-[#A0AAA2] hover:text-[#F5F7F5]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-[#A0AAA2] mb-1">
                Display Name / Handle
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#A0AAA2] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. TanjiroKamado"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#080A09] border border-[#262D28] rounded-xl text-xs sm:text-sm text-[#F5F7F5] placeholder-[#A0AAA2]/60 focus:outline-none focus:border-[#39E66B] focus:ring-1 focus:ring-[#39E66B] transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#A0AAA2] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A0AAA2] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[#080A09] border border-[#262D28] rounded-xl text-xs sm:text-sm text-[#F5F7F5] placeholder-[#A0AAA2]/60 focus:outline-none focus:border-[#39E66B] focus:ring-1 focus:ring-[#39E66B] transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-[#A0AAA2]">
                Password
              </label>
              {tab === 'signin' && (
                <span className="text-[11px] text-[#39E66B] hover:underline cursor-pointer">
                  Forgot?
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A0AAA2] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-[#080A09] border border-[#262D28] rounded-xl text-xs sm:text-sm text-[#F5F7F5] placeholder-[#A0AAA2]/60 focus:outline-none focus:border-[#39E66B] focus:ring-1 focus:ring-[#39E66B] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AAA2] hover:text-[#F5F7F5]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#39E66B] hover:bg-[#20C45A] active:scale-[0.99] text-[#080A09] font-bold text-sm rounded-xl transition-all shadow-md shadow-[#39E66B]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>{tab === 'signin' ? 'Sign In & Continue' : 'Create Free VIP Account'}</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#262D28]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-mono">
            <span className="bg-[#101411] px-2 text-[#A0AAA2]">Instant Access</span>
          </div>
        </div>

        {/* 1-Click Fast Guest / VIP Sign In */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('vip')}
            disabled={isLoading}
            className="w-full py-2.5 px-3 bg-[#151A16] hover:bg-[#1A221D] border border-[#39E66B]/40 hover:border-[#39E66B] rounded-xl text-xs font-semibold text-[#39E66B] transition-all flex items-center justify-between shadow-xs group"
          >
            <div className="flex items-center gap-2">
              <KeyRound className="w-3.5 h-3.5 text-[#39E66B]" />
              <span>Instant VIP Demo Login</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#A0AAA2] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#39E66B]" />
            <span>Encrypted zero-ad viewer profile</span>
          </div>
        </div>

      </div>
    </div>
  );
};
