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

    const raw = input.trim();
    const cmd = raw.toLowerCase();

    if (!cmd) return;

    const newHistory: HistoryLine[] = [
      ...history,
      { text: `mayruf@security-core:~$ ${raw}`, type: 'input' },
    ];

    const print = (
      text: string,
      type: HistoryLine['type'] = 'output'
    ) => {
      newHistory.push({ text, type });
    };

    const command = cmd.split(/\s+/)[0];
    const args = raw.slice(command.length).trim();

    const commands: Record<string, () => void> = {
      help: () => {
        print(
          `MAYRUF_OS COMMAND DIRECTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFILE
  about        About Mayruf Ahmed
  who          Who am I?
  whoami       Operator information
  mayruf       Personal introduction
  journey      Developer journey
  goals        Future ambitions
  quote        Random motivation
  contact      Contact information

DEVELOPMENT
  skills       Skills matrix
  stack        Technology stack
  tools        Developer tools
  projects     Featured projects
  webdev       Web development notes
  github       GitHub profile

CYBERSECURITY
  security     Security learning roadmap
  linux        Linux command reference
  network      Networking concepts
  osint        OSINT introduction
  scan         Simulated system diagnostics
  matrix       Diagnostic sequence
  hack         Fictional hacking simulation
  sudo         Privilege simulation

UTILITIES
  date         Current browser date/time
  echo <text>  Print a message
  calc <expr>  Calculate arithmetic
  history      Show previous commands
  banner       Display welcome banner
  secret       Reveal a hidden message
  clear        Clear the terminal

Try: projects, matrix, secret, calc 57 * 2`,
          'success'
        );
      },

      about: () => {
        print(
          'Mayruf Ahmed is a developer from Sylhet, Bangladesh, interested in web development, programming, and cybersecurity. He enjoys building practical applications and learning how systems work.'
        );
      },

      who: () => {
        print(
          'I am Mayruf Ahmed, a developer from Sylhet, Bangladesh. My goal is to become a skilled cybersecurity professional while continuing to build useful web applications.',
          'success'
        );
      },

      whoami: () => {
        print(
          `OPERATOR PROFILE
Name       : Mayruf Ahmed
Location   : Sylhet, Bangladesh
Role       : Web Developer & Learner
Interests  : Programming, Linux, Cybersecurity
Mission    : LEARN // BUILD // SECURE`,
          'success'
        );
      },

      mayruf: () => {
        print(
          'Hello! Welcome to my portfolio. I am Mayruf from Sylhet, Bangladesh. I love learning new things, building projects, and exploring ethical hacking. Type "contact" to find my contact details.'
        );
      },

      mayrufahmed: () => commands.mayruf(),
      mayrufahmedbd: () => commands.mayruf(),

      journey: () => {
        print(
          `MY DEVELOPER JOURNEY
[01] Learn programming fundamentals
[02] Build interfaces with React and Next.js
[03] Develop APIs with Node.js and Express
[04] Work with MongoDB databases
[05] Explore Linux and computer networking
[06] Learn ethical hacking and secure coding
[07] Build real-world projects

STATUS: Always learning. Always improving.`,
          'success'
        );
      },

      goals: () => {
        print(
          `FUTURE OBJECTIVES
[IN PROGRESS] Improve programming fundamentals
[IN PROGRESS] Build production-ready applications
[IN PROGRESS] Learn Linux and network security
[PLANNED] Study penetration testing in authorized labs
[PLANNED] Master secure software development

MISSION: Turn curiosity into real skills.`
        );
      },

      quote: () => {
        const quotes = [
          'The best way to predict the future is to build it.',
          'Every expert was once a beginner who kept going.',
          'Learn the rules. Understand the systems. Secure them.',
          'A bug is not the end. It is another problem to solve.',
          'Stay curious. Keep experimenting. Never stop learning.',
          'Great developers are built through consistent practice.',
        ];

        print(
          quotes[Math.floor(Math.random() * quotes.length)],
          'success'
        );
      },

      skills: () => {
        print(
          `SKILLS MATRIX
Frontend     : React.js, Next.js, Tailwind CSS
Backend      : Node.js, Express.js, REST APIs
Database     : MongoDB, MongoDB Atlas
Deployment   : Git, GitHub, Vercel
Programming  : JavaScript, TypeScript, Python basics
Security     : Linux, networking, ethical hacking fundamentals

STATUS: Continuously learning and improving.`,
          'success'
        );
      },

      stack: () => {
        print(
          `TECHNOLOGY STACK
UI           -> React / Next.js
Runtime      -> Node.js
API          -> Express.js / REST
Database     -> MongoDB
Versioning   -> Git / GitHub
Deployment   -> Vercel

Focus: Modern, maintainable, secure applications.`
        );
      },

      tools: () => {
        print(
          `DEVELOPER TOOLCHAIN
VS Code        - Code editor
Git            - Version control
GitHub         - Source code hosting
MongoDB        - Document database
MongoDB Atlas  - Cloud database
Linux          - Operating system learning
Browser DevTools - Debugging and inspection
Terminal       - Commands and automation`
        );
      },

      projects: () => {
        print(
          `FEATURED PROJECTS

01. MAYRUF PORTFOLIO
    Personal developer profile with an interactive terminal.

02. GACHBARI NET
    ISP website and customer-service management concepts.

03. CUSTOMER SUPPORT SYSTEM
    Ticket-management application for customer issues.

04. CASH MANAGER
    Personal money and transaction tracking application.

05. SPORTS ZONE
    Club website concept using a modern web stack.

TECH: React, Next.js, Node.js, Express, MongoDB.
Use "github" to explore the source-code profile.`
        );
      },

      github: () => {
        print(
          `GITHUB PROFILE
Username: mayrufahmedbd
URL: https://github.com/mayrufahmedbd

Explore repositories, review source code, and follow future projects.`,
          'success'
        );
      },

      webdev: () => {
        print(
          `WEB DEVELOPMENT KNOWLEDGE
Frontend  : Responsive and accessible user interfaces
Backend   : Business logic and API requests
Database  : Persistent application data
Security  : Validation, authentication, authorization
Deployment: Environment configuration and monitoring

A good application is useful, reliable, and maintainable.`
        );
      },

      security: () => {
        print(
          `CYBERSECURITY LEARNING MODULE
01. TCP/IP, DNS, HTTP and HTTPS
02. Linux commands and file permissions
03. Web security fundamentals
04. Authentication and access control
05. Secure coding and dependency management
06. Defensive monitoring and incident response
07. Ethical penetration testing in authorized labs

RULE: Test only systems you own or have permission to assess.`,
          'success'
        );
      },

      linux: () => {
        print(
          `LINUX QUICK REFERENCE
pwd         - Show current directory
ls          - List files
cd          - Change directory
mkdir       - Create a directory
cat         - Display file contents
grep        - Search text
chmod       - Change file permissions
ps          - View running processes
ip addr     - Inspect network interfaces
man <cmd>   - Read command documentation

Practice safely in your own Linux environment.`
        );
      },

      network: () => {
        print(
          `NETWORKING KNOWLEDGE BASE
IP Address : Identifies a network interface
DNS        : Resolves domain names to IP addresses
TCP        : Reliable, connection-oriented transport
UDP        : Connectionless transport
HTTP       : Protocol for web communication
HTTPS      : HTTP protected by TLS
Firewall   : Filters traffic using configured rules
VPN        : Creates an encrypted network tunnel

Encryption, authentication, and authorization are different concepts.`
        );
      },

      osint: () => {
        print(
          `OSINT LEARNING MODULE
OSINT = Open-Source Intelligence.

Research areas:
- Public websites and official records
- Domain and DNS information
- Public technical documentation
- Verification of sources and claims
- Lawfully available image metadata

Respect privacy, applicable laws, and platform rules.`
        );
      },

      contact: () => {
        print(
          `CONTACT GATEWAYS
Email    : mayrufahmedbd@gmail.com
Phone    : +880 1342 397160
Location : Sylhet, Bangladesh
Website  : Open the /contact page for the contact form.

Please update these details if they change.`
        );
      },

      date: () => {
        print(`Browser date/time: ${new Date().toLocaleString()}`);
      },

      banner: () => {
        print(
          `M   M   A   Y   Y  RRRR  U   U  FFFFF
MM MM  A A   Y Y   R   R U   U  F
M M M AAAAA   Y    RRRR  U   U  FFFF
M   M A   A   Y    R  R  U   U  F
M   M A   A   Y    R   R  UUU   F

WELCOME TO MAYRUF_OS
LEARN // BUILD // SECURE`,
          'success'
        );
      },

      matrix: () => {
        print(
          `RUNNING DIAGNOSTIC SIMULATION...
[####################] 100%
Terminal interface : ONLINE
Command processor  : ONLINE
History renderer   : READY
Scroll effect      : READY

ACCESS GRANTED.
Welcome to the shell, Operator.`,
          'success'
        );
      },

      hack: () => {
        print(
          `SIMULATED CYBERSECURITY SEQUENCE
> Initializing virtual environment...
> Loading diagnostic modules...
> Checking interface status...
> Verifying simulated access controls...
> Simulation complete.

No external systems were accessed. This is a visual demo.`,
          'success'
        );
      },

      scan: () => {
        print(
          `LOCAL INTERFACE DIAGNOSTICS
[OK] Terminal component mounted
[OK] React state initialized
[OK] Input handler available
[OK] History renderer ready
[OK] Scroll effect configured

This demo does not scan your computer or network.`,
          'success'
        );
      },

      sudo: () => {
        print(
          'Administrator privileges are not available in this portfolio terminal. This is a browser-based simulation, not a real operating-system shell.',
          'error'
        );
      },

      secret: () => {
        print(
          `SECRET MESSAGE UNLOCKED

Every line of code is a step forward.
Every bug you fix makes you a better developer.
Every challenge is an opportunity to learn.

ACHIEVEMENT UNLOCKED: CURIOUS MIND`,
          'success'
        );
      },

      history: () => {
        const previous = history
          .filter((line) => line.type === 'input')
          .map((line) => line.text);

        print(
          previous.length
            ? previous.join('\n')
            : 'No previous commands in this session.'
        );
      },
    };

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (command === 'echo') {
      print(args);
    } else if (command === 'calc') {
      const match = args.match(
        /^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/
      );

      if (!match) {
        print('Usage: calc 12 + 8', 'error');
      } else {
        const a = Number(match[1]);
        const operator = match[2];
        const b = Number(match[3]);

        if (operator === '/' && b === 0) {
          print('Error: division by zero.', 'error');
        } else {
          const result =
            operator === '+' ? a + b :
            operator === '-' ? a - b :
            operator === '*' ? a * b :
            a / b;

          print(`Result: ${result}`, 'success');
        }
      }
    } else if (commands[cmd]) {
      commands[cmd]();
    } else {
      print(
        `Command not found: "${raw}". Type "help" for available commands.`,
        'error'
      );
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
          <span className="text-[10px] uppercase tracking-wider font-semibold">
            devsec@security-core: ~
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 border border-green-500/40" />
        </div>
      </div>

      {/* Terminal Console Buffer */}
      <div
        ref={terminalContainerRef}
        className="p-4 h-64 overflow-y-auto flex flex-col gap-2 scrollbar-none scroll-smooth"
      >
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
      <form
        onSubmit={handleCommand}
        className="border-t border-emerald-500/10 bg-slate-950/80 p-3 flex items-center gap-2 relative z-20"
      >
        <span className="text-emerald-500 font-bold shrink-0">
          mayruf@security-core:~$
        </span>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent text-emerald-400 focus:outline-none placeholder-emerald-800 font-mono caret-emerald-400 w-full text-xs"
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
        />

        <button
          type="submit"
          className="p-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 cursor-pointer"
        >
          <ArrowRight size={12} />
        </button>
      </form>
    </div>
  );
}