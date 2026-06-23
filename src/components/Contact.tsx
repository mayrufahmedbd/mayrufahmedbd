'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Facebook, Twitter, Mail, MapPin, CheckCircle, AlertCircle, Phone } from 'lucide-react';
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

export default function Contact({ aboutData }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

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
        setFormData({ name: '', email: '', message: '' });

        // Trigger confetti for a premium feel
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#818cf8', '#60a5fa'],
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

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-500/5 rounded-full glow-blur -z-10" />

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
              <h3 className="text-2xl font-bold tracking-tight">Let's Connect</h3>
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

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-6 border-t border-card-border/60">
                <a
                  href={aboutData?.githubUrl || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-card-border hover:border-primary-main hover:text-primary-main bg-card-bg hover:scale-105 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={aboutData?.linkedinUrl || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-card-border hover:border-primary-main hover:text-primary-main bg-card-bg hover:scale-105 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={aboutData?.facebookUrl || 'https://facebook.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-card-border hover:border-primary-main hover:text-primary-main bg-card-bg hover:scale-105 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={aboutData?.twitterUrl || 'https://twitter.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-card-border hover:border-primary-main hover:text-primary-main bg-card-bg hover:scale-105 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl shadow-md border border-card-border/80">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono font-bold uppercase tracking-wider text-text-base">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    disabled={status === 'submitting' || status === 'success'}
                    className="px-4 py-3 rounded-xl border border-card-border bg-input-bg text-text-base focus:border-primary-main focus:outline-none transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono font-bold uppercase tracking-wider text-text-base">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    disabled={status === 'submitting' || status === 'success'}
                    className="px-4 py-3 rounded-xl border border-card-border bg-input-bg text-text-base focus:border-primary-main focus:outline-none transition-colors duration-200"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-mono font-bold uppercase tracking-wider text-text-base">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Write your thoughts..."
                    disabled={status === 'submitting' || status === 'success'}
                    className="px-4 py-3 rounded-xl border border-card-border bg-input-bg text-text-base focus:border-primary-main focus:outline-none transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Submit button / Status displays */}
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-semibold"
                  >
                    <CheckCircle size={18} />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-semibold"
                  >
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                  </motion.div>
                ) : null}

                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className={`flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer ${
                    (status === 'submitting' || status === 'success') && 'opacity-60 cursor-not-allowed'
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
