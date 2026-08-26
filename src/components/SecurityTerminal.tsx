'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';

interface HistoryLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export default function SecurityTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryLine[]>([
    { text: 'MAYRUF_OS v1.0.4 (secure_kernel_x86_64)', type: 'success' },
    { text: 'Loading DevSecOps environment modules...', type: 'output' },
    { text: 'Systems operational. Connection encrypted.', type: 'success' },
    { text: 'Type "help" to display available terminal commands.', type: 'output' },
  ]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { text: `mayruf@security-core:~$ ${input}`, type: 'input' as const }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          text: 'Available Commands:\n  about    - Summary of who Mayruf is\n  skills   - Core technology & security stacks\n  contact  - Database linked contact details\n  clear    - Flush terminal console lines\n  matrix   - Trigger diagnostic overlay\n  mayruf    - about me in short',
          type: 'success',
        });
        break;
      case 'about':
        newHistory.push({
          text: 'Mayruf Ahmed is a Web Developer, Programmer, and Cybersecurity Enthusiast. He specializes in secure backend architectures, serverless Next.js structures, and network defense tools.',
          type: 'output',
        });
        break;
      case 'skills':
        newHistory.push({
          text: 'Skills Matrix:\n  - Frontend: React.js, Next.js, Tailwind CSS\n  - Backend: Node.js, Express.js, RESTful API Gateway\n  - Database: MongoDB, Atlas caching\n  - Cybersecurity: Linux systems, Network analysis, Ethical hacking',
          type: 'output',
        });
        break;
      case 'contact':
        newHistory.push({
          text: 'Contact Gateways:\n  - Email: mayrufahmedbd@gmail.com\n  - Phone: +880 1342 397160\n  - Address: Sylhet, Bangladesh\n  - Links: Navigate to /contact page for full submission form.',
          type: 'output',
        });
        break;
      case 'mayruf':
        newHistory.push({
          text: 'Hello! Welcome to my portfulio.This is mayruf From a Sylhet A developer & Ethikal Hacking Learner. I love to learn new thinks. type "Contact" for geting my number and g-mail',
          type: 'output',
        });
        break;
      case 'mayrufahmed':
        newHistory.push({
          text: 'Hello! Welcome to my portfulio.This is mayruf From a Sylhet A developer & Ethikal Hacking Learner. I love to learn new thinks. type "Contact" for geting my number and g-mail',
          type: 'output',
        });
        break;
      case 'mayrufahmedbd':
        newHistory.push({
          text: 'Hello! Welcome to my portfulio.This is mayruf From a Sylhet A developer & Ethikal Hacking Learner. I love to learn new thinks. type "Contact" for geting my number and g-mail',
          type: 'output',
        });
        break;
      case 'who':
        newHistory.push({
          text: 'This is Mayruf Ahmed a developer from Sylhet. I want to be a CyberSecurity expart in future',
          type: 'output',
        });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'matrix':
        newHistory.push({
          text: 'DECRYPTING SECURE CHANNELS...\n[████████████████████] 100%\nACCESS GRANTED. Diagnostic payload injected.\nWelcome to the shell, Operator.',
          type: 'success',
        });
        break;
      default:
        newHistory.push({
          text: `Command not found: "${cmd}". Type "help" for a list of valid commands.`,
          type: 'error',
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="w-full rounded-2xl bg-slate-950 border border-emerald-500/20 shadow-xl overflow-hidden font-mono text-xs relative select-none">
      {/* Scanline Overlay */}
      <div className="absolute inset-0 terminal-scanlines pointer-events-none z-10 opacity-30" />

      {/* Terminal Title Bar */}
      <div className="bg-slate-900 border-b border-emerald-500/10 px-4 py-2.5 flex items-center justify-between text-gray-400 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-emerald-500" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">devsec@security-core: ~</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 border border-green-500/40" />
        </div>
      </div>

      {/* Terminal Console Buffer */}
      <div ref={terminalContainerRef} className="p-4 h-64 overflow-y-auto flex flex-col gap-2 scrollbar-none scroll-smooth">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === 'input'
                ? 'text-emerald-400 font-bold'
                : line.type === 'error'
                ? 'text-red-400'
                : line.type === 'success'
                ? 'text-teal-400'
                : 'text-gray-300'
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Terminal Interactive Input */}
      <form onSubmit={handleCommand} className="border-t border-emerald-500/10 bg-slate-950/80 p-3 flex items-center gap-2 relative z-20">
        <span className="text-emerald-500 font-bold shrink-0">mayruf@security-core:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent text-emerald-400 focus:outline-none placeholder-emerald-800 font-mono caret-transparent w-full text-xs"
          placeholder="type a command..."
          autoComplete="off"
        />
        {/* custom blinking cursor */}
        <span className="w-1.5 h-3 bg-emerald-500 terminal-cursor shrink-0 -ml-12" style={{ transform: `translateX(${input.length * 7}px)` }} />
        <button type="submit" className="p-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 cursor-pointer">
          <ArrowRight size={12} />
        </button>
      </form>
    </div>
  );
}
