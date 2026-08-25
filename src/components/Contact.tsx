'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send, Github, Linkedin, Facebook, Twitter,
  Mail, MapPin, CheckCircle, AlertCircle, Phone,
  Code2, ShieldCheck, Info, Palette, HelpCircle,
  ChevronDown,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactProps {
  aboutData?: {
    email?: string;
    phone?: string;
    address?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    facebookUrl?: string;
    twitterUrl?: string;
  };
}

type Topic = 'programming' | 'cybersecurity' | 'general' | 'web-design' | 'other';

const TOPICS: { value: Topic; label: string; icon: React.ReactNode; color: string }[] = [
  {
    value: 'programming',
    label: 'Programming / Development',
    icon: <Code2 size={15} />,
    color: 'text-blue-400',
  },
  {
    value: 'cybersecurity',
    label: 'Cybersecurity',
    icon: <ShieldCheck size={15} />,
    color: 'text-emerald-400',
  },
  {
    value: 'web-design',
    label: 'Web Design',
    icon: <Palette size={15} />,
    color: 'text-purple-400',
  },
  {
    value: 'general',
    label: 'General Information',
    icon: <Info size={15} />,
    color: 'text-yellow-400',
  },
  {
    value: 'other',
    label: 'Other',
    icon: <HelpCircle size={15} />,
    color: 'text-text-muted',
  },
];

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-card-border bg-input-bg text-text-base placeholder:text-text-muted/50 focus:border-primary-main focus:outline-none focus:ring-2 focus:ring-primary-main/10 transition-all duration-200';

export default function Contact({ aboutData }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: '' as Topic | '',
    message: '',
  });

  const [topicOpen, setTopicOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectTopic = (value: Topic) => {
    setFormData((prev) => ({ ...prev, topic: value }));
    setTopicOpen(false);
  };

  const selectedTopic = TOPICS.find((t) => t.value === formData.topic);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.topic || !formData.message) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', topic: '', message: '' });

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#818cf8', '#60a5fa', '#a78bfa'],
        });
      } else {
        setStatus('error');
        setErrorMessage(json.message || 'Something went wrong.');
      }
    } catch (err: unknown) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Could not send message. Please try again later.');
    }
  };

  const isDisabled = status === 'submitting' || status === 'success';

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-500/5 rounded-full glow-blur -z-10" />
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-blue-500/5 rounded-full glow-blur -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
            Inquiry
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md mx-auto">
            Have a question, a project proposal, or just want to connect? Send me a message below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left panel: Info & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="glass-panel p-8 rounded-3xl flex flex-col gap-6 shadow-md border border-card-border/80">
              <h3 className="text-2xl font-bold tracking-tight">Let&apos;s Connect</h3>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                I am always open to discussing new web architectures, cyber threats, code reviews, or football. Feel free to shoot a message!
              </p>

              {/* Info Items */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-4 text-text-muted">
                  <div className="p-3 bg-primary-main/10 text-primary-main rounded-xl border border-primary-main/20">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-base">Email</span>
                    <a href={`mailto:${aboutData?.email || 'mayrufahmed@example.com'}`} className="text-sm hover:text-primary-main transition-colors">
                      {aboutData?.email || 'mayrufahmed@example.com'}
                    </a>
                  </div>
                </div>

                {(aboutData?.phone || !aboutData) && (
                  <div className="flex items-center gap-4 text-text-muted">
                    <div className="p-3 bg-primary-main/10 text-primary-main rounded-xl border border-primary-main/20">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-base">Phone</span>
                      <a href={`tel:${aboutData?.phone || '+880 1234 567890'}`} className="text-sm hover:text-primary-main transition-colors">
                        {aboutData?.phone || '+880 1234 567890'}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 text-text-muted">
                  <div className="p-3 bg-primary-main/10 text-primary-main rounded-xl border border-primary-main/20">
                    <MapPin size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-base">Location</span>
                    <span className="text-sm">{aboutData?.address || 'Dhaka, Bangladesh'}</span>
                  </div>
                </div>
              </div>

              {/* Topic quick-ref chips */}
              <div className="flex flex-col gap-2 pt-4 border-t border-card-border/60">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">I can help with</span>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <span
                      key={t.value}
                      className={`flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full border border-card-border bg-card-bg ${t.color}`}
                    >
                      {t.icon}
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-4 border-t border-card-border/60">
                <a href={aboutData?.githubUrl || 'https://github.com'} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-card-border hover:border-primary-main hover:text-primary-main bg-card-bg hover:scale-105 transition-all duration-300" aria-label="GitHub">
                  <Github size={18} />
                </a>
                <a href={aboutData?.linkedinUrl || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-card-border hover:border-primary-main hover:text-primary-main bg-card-bg hover:scale-105 transition-all duration-300" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href={aboutData?.facebookUrl || 'https://facebook.com'} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-card-border hover:border-primary-main hover:text-primary-main bg-card-bg hover:scale-105 transition-all duration-300" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href={aboutData?.twitterUrl || 'https://twitter.com'} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-card-border hover:border-primary-main hover:text-primary-main bg-card-bg hover:scale-105 transition-all duration-300" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl shadow-md border border-card-border/80">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Name + Phone — side by side on md+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-mono font-bold uppercase tracking-wider text-text-base">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter Your Name"
                      disabled={isDisabled}
                      className={inputClass}
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-xs font-mono font-bold uppercase tracking-wider text-text-base">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter Your Phone Number"
                      disabled={isDisabled}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono font-bold uppercase tracking-wider text-text-base">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter Your Email"
                    disabled={isDisabled}
                    className={inputClass}
                  />
                </div>

                {/* Topic Selector */}
                <div className="flex flex-col gap-2 relative">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-text-base">
                    Reason for Contact <span className="text-red-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => !isDisabled && setTopicOpen((o) => !o)}
                    disabled={isDisabled}
                    className={`${inputClass} flex items-center justify-between text-left ${
                      !formData.topic ? 'text-text-muted/50' : ''
                    } ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className={`flex items-center gap-2 ${selectedTopic?.color}`}>
                      {selectedTopic ? (
                        <>
                          {selectedTopic.icon}
                          {selectedTopic.label}
                        </>
                      ) : (
                        'Select a topic...'
                      )}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-text-muted transition-transform duration-200 ${topicOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {topicOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-full mt-1 left-0 right-0 z-50 glass-panel border border-card-border rounded-2xl overflow-hidden shadow-xl"
                    >
                      {TOPICS.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => selectTopic(t.value)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-primary-main/10 transition-colors duration-150 ${
                            formData.topic === t.value ? 'bg-primary-main/10' : ''
                          } ${t.color}`}
                        >
                          {t.icon}
                          <span className="text-text-base">{t.label}</span>
                          {formData.topic === t.value && (
                            <span className="ml-auto text-primary-main text-xs font-mono">✓</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-mono font-bold uppercase tracking-wider text-text-base">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Write your thoughts or questions here..."
                    disabled={isDisabled}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-semibold"
                  >
                    <CheckCircle size={18} />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-semibold"
                  >
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isDisabled}
                  className={`flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer ${
                    isDisabled && 'opacity-60 cursor-not-allowed'
                  }`}
                >
                  <Send size={16} />
                  <span>{status === 'submitting' ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
