import dbConnect from './dbConnect';
import About from '../models/About';
import TimelineItem from '../models/TimelineItem';
import Skill from '../models/Skill';
import Project from '../models/Project';
import Blog from '../models/Blog';
import GalleryImage from '../models/GalleryImage';
import CurrentActivity from '../models/CurrentActivity';
import VisitorStats from '../models/VisitorStats';

declare global {
  // eslint-disable-next-line no-var
  var seedingPromise: Promise<void> | null | undefined;
}

export async function seedDatabase() {
  if (global.seedingPromise) {
    return global.seedingPromise;
  }

  const seed = async () => {
    await dbConnect();

    // 1. Seed About Me
    try {
      const aboutCount = await About.countDocuments();
      if (aboutCount === 0) {
        await About.create({
          name: 'Mayruf Ahmed',
          title: 'Web Developer | Programmer | Cybersecurity Enthusiast',
          typingAnimations: [
            'Full Stack Developer',
            'Web Developer',
            'Ethical Hacking Learner',
            'Cybersecurity Enthusiast',
            'Problem Solver',
          ],
          whoIAm:
            'My name is Mayruf Ahmed. I am passionate about programming, web development, and cybersecurity. I enjoy learning new technologies and building modern applications.',
          whatIDo: [
            'Web Development',
            'Programming',
            'Learning Cybersecurity',
            'Exploring Ethical Hacking',
            'Problem Solving',
          ],
          whatIWantToDo: [
            'Full Stack Development',
            'Cybersecurity',
            'Ethical Hacking',
            'Software Engineering',
          ],
          resumeUrl: '',
          profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
          email: 'mayrufahmed@example.com',
          phone: '+880 1234 567890',
          address: 'Dhaka, Bangladesh',
          githubUrl: 'https://github.com',
          linkedinUrl: 'https://linkedin.com',
          facebookUrl: 'https://facebook.com',
          twitterUrl: 'https://twitter.com',
        });
        console.log('Seeded About collection');
      }
    } catch (err: any) {
      if (err.code !== 11000) console.error('Failed to seed About:', err);
    }

    // 2. Seed Timeline
    try {
      const timelineCount = await TimelineItem.countDocuments();
      if (timelineCount === 0) {
        await TimelineItem.create([
          {
            period: '2023',
            title: 'The Spark',
            description: 'Started learning programming and web technologies, exploring basic HTML, CSS, and general computing concepts.',
            order: 1,
          },
          {
            period: '2024',
            title: 'Full-Stack Foundations',
            description: 'Dived deep into JavaScript, Node.js, Express, and MongoDB. Built several web applications and API servers.',
            order: 2,
          },
          {
            period: '2025',
            title: 'Advanced Web & Cyber Focus',
            description: 'Began exploring Next.js, React, TypeScript, and foundational Cybersecurity protocols, CTFs, and ethical hacking labs.',
            order: 3,
          },
          {
            period: '2026',
            title: 'Professional Expansion',
            description: 'Currently building secure, premium SaaS projects and hardening web architectures using advanced cybersecurity practices.',
            order: 4,
          },
        ]);
        console.log('Seeded Timeline collection');
      }
    } catch (err: any) {
      if (err.code !== 11000) console.error('Failed to seed Timeline:', err);
    }

    // 3. Seed Skills
    try {
      const skillCount = await Skill.countDocuments();
      if (skillCount === 0) {
        await Skill.create([
          // Programming
          { name: 'JavaScript', category: 'Programming', level: 90 },
          { name: 'TypeScript', category: 'Programming', level: 80 },
          { name: 'HTML', category: 'Programming', level: 95 },
          { name: 'CSS', category: 'Programming', level: 90 },
          // Frontend
          { name: 'React', category: 'Frontend', level: 85 },
          { name: 'Next.js', category: 'Frontend', level: 80 },
          { name: 'Tailwind CSS', category: 'Frontend', level: 90 },
          // Backend
          { name: 'Node.js', category: 'Backend', level: 80 },
          { name: 'Express.js', category: 'Backend', level: 80 },
          // Database
          { name: 'MongoDB', category: 'Database', level: 85 },
          { name: 'MongoDB Atlas', category: 'Database', level: 80 },
          // Tools
          { name: 'VS Code', category: 'Tools', level: 90 },
          { name: 'Git', category: 'Tools', level: 85 },
          { name: 'GitHub', category: 'Tools', level: 85 },
          // Cybersecurity
          { name: 'Linux', category: 'Cybersecurity', level: 75 },
          { name: 'Networking Basics', category: 'Cybersecurity', level: 70 },
          { name: 'Ethical Hacking Fundamentals', category: 'Cybersecurity', level: 65 },
        ]);
        console.log('Seeded Skills collection');
      }
    } catch (err: any) {
      if (err.code !== 11000) console.error('Failed to seed Skills:', err);
    }

    // 4. Seed Current Activities
    try {
      const activityCount = await CurrentActivity.countDocuments();
      if (activityCount === 0) {
        await CurrentActivity.create({
          learning: ['Next.js', 'MongoDB', 'Backend Development', 'Cybersecurity Fundamentals'],
          goals: ['Become a Full Stack Developer and Cybersecurity Specialist.'],
        });
        console.log('Seeded CurrentActivity collection');
      }
    } catch (err: any) {
      if (err.code !== 11000) console.error('Failed to seed CurrentActivity:', err);
    }

    // 5. Seed Visitor Stats
    try {
      const statsCount = await VisitorStats.countDocuments();
      if (statsCount === 0) {
        await VisitorStats.create({ views: 1 });
        console.log('Seeded VisitorStats collection');
      }
    } catch (err: any) {
      if (err.code !== 11000) console.error('Failed to seed VisitorStats:', err);
    }

    // 6. Seed Projects
    try {
      const projectCount = await Project.countDocuments();
      if (projectCount === 0) {
        await Project.create([
          {
            title: 'Secure API Gatekeeper',
            description: 'A Node.js backend proxy implementing rate limiting, JWT verification, and basic security headers like Helmet to prevent common web attacks.',
            imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
            tech: ['Node.js', 'Express', 'JWT', 'Helmet.js'],
            githubUrl: 'https://github.com',
            liveUrl: '',
            order: 1,
          },
          {
            title: 'Secure Blog CMS',
            description: 'A Next.js based blogging environment where markdown guides are written, stored in MongoDB, and delivered with edge performance.',
            imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600',
            tech: ['Next.js', 'React', 'MongoDB', 'Tailwind CSS'],
            githubUrl: 'https://github.com',
            liveUrl: '',
            order: 2,
          },
          {
            title: 'Port Scanner & Vuln Analyzer',
            description: 'A multi-threaded network utility written in Python that scans server ports, identifies active services, and flags CVE vulnerabilities.',
            imageUrl: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&q=80&w=600',
            tech: ['Python', 'Socket API', 'Vuln DB', 'Threading'],
            githubUrl: 'https://github.com',
            liveUrl: '',
            order: 3,
          },
          {
            title: 'Enigma Encrypted Vault',
            description: 'A secure, offline-first React app utilizing AES-GCM 256-bit encryption in the browser to store passwords and credentials securely.',
            imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=600',
            tech: ['React', 'Web Crypto API', 'Tailwind CSS', 'IndexedDB'],
            githubUrl: 'https://github.com',
            liveUrl: '',
            order: 4,
          },
        ]);
        console.log('Seeded Projects collection');
      }
    } catch (err: any) {
      if (err.code !== 11000) console.error('Failed to seed Projects:', err);
    }

    // 7. Seed Blogs
    try {
      const blogCount = await Blog.countDocuments();
      if (blogCount === 0) {
        await Blog.create([
          {
            title: 'Starting My Journey in Web Development & Cybersecurity',
            slug: 'starting-journey-webdev-cybersecurity',
            content: `Web development and cybersecurity are two sides of the same coin. As a web developer, you build systems. As a cybersecurity enthusiast, you learn how to secure those systems from potential exploits.

### Why Both?
Having a strong foundation in frontend technologies (HTML, CSS, JavaScript) and backend environments (Node.js, Express, MongoDB) allows you to understand how data flows. Adding Linux, Networking, and Ethical Hacking fundamentals to the mix ensures that you build applications that are secure by design.

### My Learning Path
1. **Frontend**: Learn React and Next.js for server-rendered, fast UI layouts.
2. **Backend**: Node.js and Express.js to write flexible API routes.
3. **Database**: MongoDB for document storage.
4. **Security**: Understanding network ports, packets, OWASP Top 10 vulnerabilities, and basic penetration testing.

Stay tuned as I document my projects, write-ups, and labs here!`,
            tags: ['Web Development', 'Cybersecurity', 'Programming Journey'],
            coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
            views: 45,
            published: true,
          },
          {
            title: 'Understanding MongoDB Atlas and Mongoose in Next.js 15',
            slug: 'understanding-mongodb-atlas-mongoose-nextjs',
            content: `MongoDB Atlas provides an excellent cloud-hosted database. Using Mongoose, we can define schemas to model our application data in Next.js Serverless Route Handlers.

### Connecting in Serverless
Unlike traditional servers that stay constantly connected to the database, Next.js API routes are serverless. They spin up and spin down dynamically. If you initialize database connections on every request, you will quickly hit connection limits.

To fix this, we cache the connection globally:

\`\`\`typescript
// Global caching pattern
let cached = global.mongooseGlobal;
if (!cached) {
  cached = global.mongooseGlobal = { conn: null, promise: null };
}
\`\`\`

This ensures that hot reloads in development and serverless invocations reuse existing connections.`,
            tags: ['MongoDB', 'JavaScript', 'Web Development'],
            coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800',
            views: 32,
            published: true,
          },
          {
            title: 'Top Web Security Best Practices for Next.js Developers',
            slug: 'nextjs-web-security-best-practices',
            content: `Building applications with Next.js is fast and efficient, but developers must ensure they maintain secure configurations. Here is a breakdown of essential web security practices for modern Next.js apps.

### 1. HTTP Security Headers
Always configure secure headers inside your config file. You can enforce:
- **Content Security Policy (CSP)**: Prevent XSS attacks by restricting sources.
- **X-Frame-Options**: Prevent clickjacking by restricting embedding in frames.
- **Strict-Transport-Security (HSTS)**: Enforce HTTPS.

### 2. Environment Variables Sanitization
Never expose private keys (like DB passwords or private APIs) in public client code. Only prefix with \`NEXT_PUBLIC_\` if they are safe to show in browser logs.

### 3. Rate Limiting and Payload Limits
Always restrict API routes. Serverless functions can be easily spammed, causing spikes in database operations or cloud costs. Use rate-limiting middleware to stay secure.`,
            tags: ['Cybersecurity', 'Next.js', 'Web Security'],
            coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
            views: 89,
            published: true,
          },
        ]);
        console.log('Seeded Blogs collection');
      }
    } catch (err: any) {
      if (err.code !== 11000) console.error('Failed to seed Blogs:', err);
    }

    // 8. Seed Gallery Images
    try {
      const galleryCount = await GalleryImage.countDocuments();
      if (galleryCount === 0) {
        await GalleryImage.create([
          {
            title: 'Mayruf Ahmed - Headshot',
            category: 'Profile',
            imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=500',
            order: 1,
          },
          {
            title: 'Football Field under the Lights',
            category: 'Football',
            imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=500',
            order: 2,
          },
          {
            title: 'Modern Tech Banner Design',
            category: 'Banner Designs',
            imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500',
            order: 3,
          },
          {
            title: 'Working late night on code labs',
            category: 'Memories',
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=500',
            order: 4,
          },
        ]);
        console.log('Seeded Gallery collection');
      }
    } catch (err: any) {
      if (err.code !== 11000) console.error('Failed to seed Gallery:', err);
    }
  };

  global.seedingPromise = seed();

  try {
    await global.seedingPromise;
  } finally {
    global.seedingPromise = null;
  }
}
export default seedDatabase;
