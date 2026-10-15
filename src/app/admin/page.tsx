'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'checking' | 'authenticating' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/check', { cache: 'no-store' });
        const json = await res.json();
        if (json.authenticated && isMounted) {
          router.replace('/admin/dashboard');
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkSession();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) return;

    setStatus('authenticating');
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        window.location.href = '/admin/dashboard';
      } else {
        setStatus('error');
        setErrorMessage(json.message || 'Invalid credentials.');
      }
    } catch (err: unknown) {
      console.error(err);
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
    }
  };

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-[#030712] text-[#f9fafb] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <RefreshCw className="animate-spin text-blue-500" size={32} />
          <p className="text-sm font-mono text-gray-400">Verifying session security...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-[#f9fafb] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Neon Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full glow-blur pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full glow-blur pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel p-8 rounded-3xl border border-gray-800 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2.5 shadow-lg border border-gray-100">
            <Image 
              src="/black-logo.png" 
              alt="Logo" 
              width={36} 
              height={36} 
              className="w-9 h-9 object-contain" 
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mt-2">Admin Security Gate</h1>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Authorized Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Username</label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter username"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-800 bg-gray-900/60 text-white focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-800 bg-gray-900/60 text-white focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-semibold">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'authenticating'}
            className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'authenticating' ? 'Signing In...' : 'Verify & Enter'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-gray-500 hover:text-blue-400 transition-colors font-medium">
            ← Back to Public Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
