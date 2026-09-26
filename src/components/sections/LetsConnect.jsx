import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Mail, Send, Copy, Check, ExternalLink, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LetsConnect({ onShowToast }) {
  const { profile, connect } = portfolioData;
  const intents = connect?.intents || ['Full-Time Role', 'Contract / Freelance', 'System Consulting', 'Quick Chat'];
  const [formData, setFormData] = useState({ name: '', email: '', intent: intents[0] || 'Full-Time Role', message: '' });
  const [copied, setCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('idle'); // 'idle' | 'success' | 'client_ready'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    confetti({ particleCount: 55, spread: 60, origin: { y: 0.8 } });
    if (onShowToast) onShowToast("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCopyMessage = () => {
    const formatted = `From: ${formData.name} <${formData.email}>\nTopic: ${formData.intent}\n\nMessage:\n${formData.message}`;
    navigator.clipboard.writeText(formatted);
    setMsgCopied(true);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    if (onShowToast) onShowToast("Message content copied to clipboard!");
    setTimeout(() => setMsgCopied(false), 2200);
  };

  const subject = encodeURIComponent(`Portfolio Inquiry: ${formData.intent || 'Collaboration'} from ${formData.name || 'Visitor'}`);
  const body = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nTopic / Intent: ${formData.intent}\n\nMessage:\n${formData.message}`
  );
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${subject}&body=${body}`;
  const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      if (onShowToast) onShowToast("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Attempt direct asynchronous delivery to Armaan's email
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          intent: formData.intent,
          message: formData.message,
          _subject: `Portfolio Inquiry: ${formData.intent} from ${formData.name}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setDeliveryStatus('success');
      } else {
        setDeliveryStatus('client_ready');
      }
    } catch {
      // If blocked by adblocker/CORS/offline, fallback to client-ready state
      setDeliveryStatus('client_ready');
    } finally {
      setIsSubmitting(false);
      setIsSent(true);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      if (onShowToast) onShowToast(`Message ready for ${profile.email}`);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', intent: intents[0] || 'Full-Time Role', message: '' });
    setIsSent(false);
    setDeliveryStatus('idle');
  };

  return (
    <section id="lets-connect" className="pt-12">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] pb-3 mb-6 flex items-center justify-between">
        <h2 className="font-serif-title text-2xl sm:text-3xl font-normal text-white">
          {connect?.title || "Let's Connect"}
        </h2>
        <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="hidden sm:inline">{connect?.subheading || "Open to Opportunities"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col Info & Quick Connect */}
        <div className="lg:col-span-5 rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] p-5 sm:p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Direct Channels</h3>
            <p className="text-xs text-[#888888] leading-relaxed mt-1">
              {connect?.directChannelsDescription || "Have an opening, system architecture challenge, or collaboration idea? Reach out directly via email or drop a message."}
            </p>
          </div>

          {/* Email Card */}
          <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#666666] font-mono-code">
              <span>PRIMARY EMAIL</span>
              <span className="text-emerald-400 font-semibold">Fast Response</span>
            </div>
            <div className="text-sm font-bold font-mono-code text-white truncate">
              {profile.email}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleCopyEmail}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-[#2a2a2a] bg-[#181818] px-3 py-2 text-xs font-medium text-[#cccccc] hover:text-white hover:border-[#444444] transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#888888]" />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-black hover:bg-[#eaeaea] transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open Gmail</span>
              </a>
            </div>
          </div>

          {/* Location & Timezone info */}
          <div className="rounded-xl border border-[#1a1a1a] bg-[#09090b] p-4 text-xs font-mono-code text-[#777777] space-y-2">
            <div className="flex items-center justify-between">
              <span>LOCATION:</span>
              <span className="text-white">{profile.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>TIMEZONE:</span>
              <span className="text-white">{profile.timezoneLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>AVAILABILITY:</span>
              <span className="text-emerald-400 font-semibold">{profile.availability || "Immediate / 2026"}</span>
            </div>
          </div>
        </div>

        {/* Right Col Interactive Message Form */}
        <div className="lg:col-span-7 rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] p-5 sm:p-6">
          {isSent ? (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-4 animate-in fade-in duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/70 border border-emerald-700/60 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">
                  {deliveryStatus === 'success' ? 'Message Dispatched!' : 'Message Formatted & Ready!'}
                </h4>
                <p className="text-xs text-[#888888] max-w-sm mx-auto leading-relaxed mt-1">
                  {deliveryStatus === 'success'
                    ? `Your inquiry has been delivered directly to ${profile.email}. You can also open or copy your message below:`
                    : `Your message has been pre-formatted for ${profile.email}. Choose your preferred way to send or copy:`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-md space-y-2.5 pt-2">
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-black hover:bg-[#eaeaea] transition-all shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Gmail Web</span>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={mailtoUrl}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-[#262626] bg-[#141414] px-3 py-2 text-xs font-medium text-[#cccccc] hover:text-white hover:border-[#444444] transition-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Default Mail App</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-[#262626] bg-[#141414] px-3 py-2 text-xs font-medium text-[#cccccc] hover:text-white hover:border-[#444444] transition-all cursor-pointer"
                  >
                    {msgCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#888888]" />}
                    <span>{msgCopied ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-1.5 text-[11px] font-mono-code text-[#666666] hover:text-[#aaaaaa] pt-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Send another message</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono-code uppercase text-[#777777]">
                  I'm reaching out about
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {intents.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFormData({ ...formData, intent: item })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                        formData.intent === item
                          ? 'bg-white text-black font-semibold border border-white'
                          : 'bg-[#121212] text-[#888888] border border-[#222222] hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="user-name" className="text-[11px] font-mono-code uppercase text-[#777777]">
                    Your Name
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-[#222222] bg-[#111111] px-3.5 py-2.5 text-xs text-white placeholder-[#555555] outline-none focus:border-[#555555] transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="user-email" className="text-[11px] font-mono-code uppercase text-[#777777]">
                    Your Email
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    required
                    placeholder="ada@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-[#222222] bg-[#111111] px-3.5 py-2.5 text-xs text-white placeholder-[#555555] outline-none focus:border-[#555555] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="user-msg" className="text-[11px] font-mono-code uppercase text-[#777777]">
                  Message
                </label>
                <textarea
                  id="user-msg"
                  required
                  rows={4}
                  placeholder="Tell me about your project, timeline, or idea..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-[#222222] bg-[#111111] px-3.5 py-2.5 text-xs text-white placeholder-[#555555] outline-none focus:border-[#555555] transition-colors resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-black hover:bg-[#eaeaea] transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="font-mono-code animate-pulse">Sending message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
