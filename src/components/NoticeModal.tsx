import React, { useState } from 'react';
import { X, CheckCircle2, Mail, ArrowRight } from 'lucide-react';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  isSignIn?: boolean;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  isSignIn = false,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#101411] border border-[#262D28] rounded-xl shadow-2xl p-6 sm:p-7 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-[#A0AAA2] hover:text-[#F5F7F5] hover:bg-[#151A16] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#39E66B]" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#39E66B]">
            {isSignIn ? 'Phase 1 Early Access' : 'WATCatoo Information'}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#F5F7F5] mb-3">
          {title}
        </h3>

        <div className="text-sm text-[#A0AAA2] leading-relaxed mb-5">
          {content}
        </div>

        {isSignIn && (
          <div className="mt-4 pt-4 border-t border-[#262D28]">
            {submitted ? (
              <div className="p-3 bg-[#151A16] border border-[#39E66B]/40 rounded-lg flex items-center space-x-3 text-xs text-[#F5F7F5]">
                <CheckCircle2 className="w-5 h-5 text-[#39E66B] flex-shrink-0" />
                <span>You’re on the early access waitlist! We’ll notify you when VIP accounts open.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <label htmlFor="early-access-email" className="block text-xs font-medium text-[#F5F7F5]">
                  Join the Early VIP Viewer Waitlist:
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#A0AAA2] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="early-access-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-9 pr-3 py-2 bg-[#151A16] border border-[#262D28] rounded-md text-xs text-[#F5F7F5] placeholder-[#A0AAA2] focus:outline-none focus:border-[#39E66B]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#39E66B] hover:bg-[#20C45A] text-[#080A09] font-bold text-xs rounded-md transition-colors flex items-center gap-1"
                  >
                    <span>Notify Me</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#F5F7F5] bg-[#151A16] hover:bg-[#1f2620] border border-[#262D28] rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
