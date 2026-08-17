'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  LayoutDashboard,
  User,
  CheckSquare,
  FolderCode,
  BookOpen,
  Calendar,
  Image as ImageIcon,
  Activity,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Check,
  Upload,
  Eye,
  RefreshCw,
  Edit2
} from 'lucide-react';
import Image from 'next/image';

type Tab =
  | 'analytics'
  | 'about'
  | 'skills'
  | 'projects'
  | 'blogs'
  | 'timeline'
  | 'gallery'
  | 'activities'
  | 'messages';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('analytics');
  const [loading, setLoading] = useState(true);

  // Stats State
  const [stats, setStats] = useState({
    views: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalProjects: 0,
    totalBlogs: 0,
    totalBlogViews: 0,
  });

  // DB Data States
  const [aboutData, setAboutData] = useState({
    name: '',
    title: '',
    typingAnimations: [] as string[],
    whoIAm: '',
    whatIDo: [] as string[],
    whatIWantToDo: [] as string[],
    resumeUrl: '',
    profileImage: '',
    email: '',
    phone: '',
    address: '',
    githubUrl: '',
    linkedinUrl: '',
    facebookUrl: '',
    twitterUrl: '',
  });

  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [timelineItems, setTimelineItems] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [activities, setActivities] = useState({ learning: [] as string[], goals: [] as string[] });
  const [messages, setMessages] = useState<any[]>([]);

  // Form input states
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Programming', level: 80 });
  const [newTimeline, setNewTimeline] = useState({ period: 'Beginning', title: '', description: '', order: 1 });
  
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    imageUrl: '',
    tech: '',
    githubUrl: '',
    liveUrl: '',
    order: 0,
  });
  
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    tags: '',
    coverImage: '',
    published: true,
  });

  const [newGallery, setNewGallery] = useState({
    title: '',
    category: 'Profile',
    imageUrl: '',
  });

  const [uploadLoading, setUploadLoading] = useState(false);

  // Authenticate session and fetch all records
  useEffect(() => {
    const initDashboard = async () => {
      try {
        const authRes = await fetch('/api/auth/check', { cache: 'no-store' });
        const authJson = await authRes.json();
        if (!authJson.authenticated) {
          router.replace('/admin');
          return;
        }

        // Fetch dashboard records without redirecting on record fetch errors
        try {
          await refreshAllData();
        } catch (dataErr) {
          console.error('Failed to load dashboard data:', dataErr);
        } finally {
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        router.replace('/admin');
      }
    };
    initDashboard();
  }, []);

  const refreshAllData = async () => {
    try {
      const [
        statsRes,
        aboutRes,
        skillsRes,
        projectsRes,
        blogsRes,
        timelineRes,
        galleryRes,
        activitiesRes,
        messagesRes,
      ] = await Promise.all([
        fetch('/api/analytics'),
        fetch('/api/about'),
        fetch('/api/skills'),
        fetch('/api/projects'),
        fetch('/api/blogs?all=true'),
        fetch('/api/timeline'),
        fetch('/api/gallery'),
        fetch('/api/activities'),
        fetch('/api/messages'),
      ]);

      const [
        statsJson,
        aboutJson,
        skillsJson,
        projectsJson,
        blogsJson,
        timelineJson,
        galleryJson,
        activitiesJson,
        messagesJson,
      ] = await Promise.all([
        statsRes.json(),
        aboutRes.json(),
        skillsRes.json(),
        projectsRes.json(),
        blogsRes.json(),
        timelineRes.json(),
        galleryRes.json(),
        activitiesRes.json(),
        messagesRes.json(),
      ]);

      if (statsJson.success) setStats(statsJson.data);
      if (aboutJson.success) setAboutData(aboutJson.data);
      if (skillsJson.success) setSkills(skillsJson.data);
      if (projectsJson.success) setProjects(projectsJson.data);
      if (blogsJson.success) setBlogs(blogsJson.data);
      if (timelineJson.success) setTimelineItems(timelineJson.data);
      if (galleryJson.success) setGalleryImages(galleryJson.data);
      if (activitiesJson.success) setActivities(activitiesJson.data);
      if (messagesJson.success) setMessages(messagesJson.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  // Image upload directly to Cloudinary via serverless route
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, onSuccess: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'mayrufahmedbd');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(data.url);
        alert('Image uploaded successfully to Cloudinary!');
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed due to network error');
    } finally {
      setUploadLoading(false);
    }
  };

  // ABOUT Actions
  const handleUpdateAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutData),
      });
      const json = await res.json();
      if (json.success) {
        alert('About info updated successfully!');
        refreshAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // SKILLS Actions
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      });
      const json = await res.json();
      if (json.success) {
        setNewSkill({ name: '', category: 'Programming', level: 80 });
        refreshAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // TIMELINE Actions
  const handleAddTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTimeline),
      });
      const json = await res.json();
      if (json.success) {
        setNewTimeline({ period: 'Beginning', title: '', description: '', order: 1 });
        refreshAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTimeline = async (id: string) => {
    if (!confirm('Are you sure you want to delete this journey milestone?')) return;
    try {
      await fetch(`/api/timeline/${id}`, { method: 'DELETE' });
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // PROJECTS Actions
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      const json = await res.json();
      if (json.success) {
        setNewProject({ title: '', description: '', imageUrl: '', tech: '', githubUrl: '', liveUrl: '', order: 0 });
        refreshAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // BLOG Actions
  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });
      const json = await res.json();
      if (json.success) {
        setNewBlog({ title: '', content: '', tags: '', coverImage: '', published: true });
        refreshAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // GALLERY Actions
  const handleAddGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGallery),
      });
      const json = await res.json();
      if (json.success) {
        setNewGallery({ title: '', category: 'Profile', imageUrl: '' });
        refreshAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGalleryImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery media?')) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // ACTIVITIES Actions
  const handleUpdateActivities = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/activities', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activities),
      });
      const json = await res.json();
      if (json.success) {
        alert('Activities saved successfully!');
        refreshAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // MESSAGES Actions
  const handleMarkMessageRead = async (id: string) => {
    try {
      await fetch(`/api/messages/${id}`, { method: 'PUT' });
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inbox message?')) return;
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] text-[#f9fafb] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <RefreshCw className="animate-spin text-blue-500" size={32} />
          <p className="text-sm font-mono text-gray-400">Loading secure admin database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-[#f9fafb] flex flex-col md:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#090d16] border-r border-gray-900 p-6 flex flex-col justify-between shrink-0">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-blue-500" size={24} />
            <span className="font-bold tracking-wider font-mono">DASHBOARD</span>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: 'analytics', label: 'Analytics', icon: <LayoutDashboard size={18} /> },
              { id: 'about', label: 'Profile Metadata', icon: <User size={18} /> },
              { id: 'skills', label: 'Skills Manager', icon: <CheckSquare size={18} /> },
              { id: 'projects', label: 'Projects CRUD', icon: <FolderCode size={18} /> },
              { id: 'blogs', label: 'Blogs CRUD', icon: <BookOpen size={18} /> },
              { id: 'timeline', label: 'Timeline milestones', icon: <Calendar size={18} /> },
              { id: 'gallery', label: 'Gallery Cloudinary', icon: <ImageIcon size={18} /> },
              { id: 'activities', label: 'Current focus', icon: <Activity size={18} /> },
              {
                id: 'messages',
                label: `Inbox Messages (${stats.unreadMessages})`,
                icon: <Mail size={18} />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-colors cursor-pointer mt-8"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* DASHBOARD WORKSPACE */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto max-h-screen">
        {uploadLoading && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="glass-panel p-6 rounded-2xl flex flex-col items-center gap-3">
              <RefreshCw className="animate-spin text-blue-500" size={32} />
              <p className="text-sm font-mono">Uploading image asset to Cloudinary...</p>
            </div>
          </div>
        )}

        {/* 1. ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-extrabold">Analytics Overview</h1>
              <p className="text-gray-400 text-sm mt-1">Live metrics from your portfolio.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Total Site Views', count: stats.views, desc: 'Aggregated landing page hits' },
                { title: 'Total Inquiries', count: stats.totalMessages, desc: 'Contact forms received' },
                { title: 'Unread Messages', count: stats.unreadMessages, desc: 'Inquiries waiting for review' },
                { title: 'Total Projects', count: stats.totalProjects, desc: 'Active builds in MongoDB' },
                { title: 'Total Blog Posts', count: stats.totalBlogs, desc: 'Published articles' },
                { title: 'Total Blog Views', count: stats.totalBlogViews, desc: 'Total reading views' },
              ].map((stat, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl border border-gray-800 shadow-md">
                  <span className="text-xs uppercase font-mono tracking-widest text-gray-500">{stat.title}</span>
                  <p className="text-4xl font-extrabold mt-2 font-mono text-blue-500">{stat.count}</p>
                  <p className="text-xs text-gray-400 mt-2">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-extrabold">Profile Metadata</h1>
              <p className="text-gray-400 text-sm mt-1">Manage landing bio information.</p>
            </div>

            <form onSubmit={handleUpdateAbout} className="glass-panel p-8 rounded-3xl border border-gray-800 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Full Name</label>
                  <input
                    type="text"
                    value={aboutData.name}
                    onChange={(e) => setAboutData({ ...aboutData, name: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Heading Titles</label>
                  <input
                    type="text"
                    value={aboutData.title}
                    onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-gray-400">Typing Animations (comma separated)</label>
                <input
                  type="text"
                  value={aboutData.typingAnimations.join(', ')}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      typingAnimations: e.target.value.split(',').map((t) => t.trim()),
                    })
                  }
                  className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-gray-400">Who I Am Biography</label>
                <textarea
                  rows={4}
                  value={aboutData.whoIAm}
                  onChange={(e) => setAboutData({ ...aboutData, whoIAm: e.target.value })}
                  className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">What I Do (comma separated)</label>
                  <textarea
                    rows={3}
                    value={aboutData.whatIDo.join(', ')}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        whatIDo: e.target.value.split(',').map((t) => t.trim()),
                      })
                    }
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">What I Want To Do (comma separated)</label>
                  <textarea
                    rows={3}
                    value={aboutData.whatIWantToDo.join(', ')}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        whatIWantToDo: e.target.value.split(',').map((t) => t.trim()),
                      })
                    }
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-900 pt-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Profile Image URL</label>
                  <input
                    type="text"
                    value={aboutData.profileImage}
                    onChange={(e) => setAboutData({ ...aboutData, profileImage: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none mb-2"
                  />
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-xs px-4 py-2.5 rounded-lg border border-gray-850 flex items-center gap-2">
                      <Upload size={14} /> Upload image to Cloudinary
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, (url) => setAboutData({ ...aboutData, profileImage: url }))}
                      />
                    </label>
                    {aboutData.profileImage && (
                      <span className="text-[10px] text-green-500 font-mono">Image is ready!</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Resume PDF URL</label>
                  <input
                    type="text"
                    value={aboutData.resumeUrl}
                    onChange={(e) => setAboutData({ ...aboutData, resumeUrl: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none mb-2"
                  />
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-xs px-4 py-2.5 rounded-lg border border-gray-850 flex items-center gap-2">
                      <Upload size={14} /> Upload PDF to Cloudinary
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, (url) => setAboutData({ ...aboutData, resumeUrl: url }))}
                      />
                    </label>
                    {aboutData.resumeUrl && (
                      <span className="text-[10px] text-green-500 font-mono">Resume is ready!</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact & Socials Section */}
              <div className="border-t border-gray-900 pt-6 flex flex-col gap-6">
                <h3 className="text-sm font-mono uppercase tracking-wider text-blue-500 font-bold">Contact & Socials</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-gray-400">Email Address</label>
                    <input
                      type="email"
                      value={aboutData.email || ''}
                      onChange={(e) => setAboutData({ ...aboutData, email: e.target.value })}
                      placeholder="e.g. mayruf@gmail.com"
                      className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-gray-400">Phone Number</label>
                    <input
                      type="text"
                      value={aboutData.phone || ''}
                      onChange={(e) => setAboutData({ ...aboutData, phone: e.target.value })}
                      placeholder="e.g. +880 1700 000000"
                      className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-gray-400">Address Location</label>
                    <input
                      type="text"
                      value={aboutData.address || ''}
                      onChange={(e) => setAboutData({ ...aboutData, address: e.target.value })}
                      placeholder="e.g. Dhaka, Bangladesh"
                      className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-gray-400">GitHub URL</label>
                    <input
                      type="url"
                      value={aboutData.githubUrl || ''}
                      onChange={(e) => setAboutData({ ...aboutData, githubUrl: e.target.value })}
                      placeholder="https://github.com/username"
                      className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-gray-400">LinkedIn URL</label>
                    <input
                      type="url"
                      value={aboutData.linkedinUrl || ''}
                      onChange={(e) => setAboutData({ ...aboutData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-gray-400">Facebook URL</label>
                    <input
                      type="url"
                      value={aboutData.facebookUrl || ''}
                      onChange={(e) => setAboutData({ ...aboutData, facebookUrl: e.target.value })}
                      placeholder="https://facebook.com/username"
                      className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-gray-400">Twitter URL</label>
                    <input
                      type="url"
                      value={aboutData.twitterUrl || ''}
                      onChange={(e) => setAboutData({ ...aboutData, twitterUrl: e.target.value })}
                      placeholder="https://twitter.com/username"
                      className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-fit px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold cursor-pointer shadow-md mt-4"
              >
                Save Profile Data
              </button>
            </form>
          </div>
        )}

        {/* 3. SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-extrabold">Skills Manager</h1>
              <p className="text-gray-400 text-sm mt-1">Add, update, and remove competence nodes.</p>
            </div>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="glass-panel p-6 rounded-3xl border border-gray-800 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-gray-400">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TypeScript"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-gray-400">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  {['Programming', 'Frontend', 'Backend', 'Database', 'Tools', 'Cybersecurity'].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-gray-400">Level (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                  className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Skill
              </button>
            </form>

            {/* Skills List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill._id} className="glass-panel p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{skill.name}</span>
                    <span className="text-[10px] uppercase font-mono text-gray-400 mt-1">
                      {skill.category} • {skill.level}%
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(skill._id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-extrabold">Projects CRUD</h1>
              <p className="text-gray-400 text-sm mt-1">Manage project portfolios and uploads.</p>
            </div>

            {/* Add Project Form */}
            <form onSubmit={handleAddProject} className="glass-panel p-8 rounded-3xl border border-gray-800 flex flex-col gap-6">
              <h3 className="text-lg font-bold mb-2">Add New Project</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Next.js, Tailwind, MongoDB"
                    required
                    value={newProject.tech}
                    onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-gray-400">Description</label>
                <textarea
                  rows={3}
                  required
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">GitHub Link</label>
                  <input
                    type="text"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Live Demo Link</label>
                  <input
                    type="text"
                    value={newProject.liveUrl}
                    onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Sort Order</label>
                  <input
                    type="number"
                    value={newProject.order}
                    onChange={(e) => setNewProject({ ...newProject, order: Number(e.target.value) })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-gray-400">Project Image URL</label>
                <input
                  type="text"
                  required
                  value={newProject.imageUrl}
                  onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                  className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none mb-2"
                />
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-xs px-4 py-2.5 rounded-lg border border-gray-850 flex items-center gap-2">
                    <Upload size={14} /> Upload image to Cloudinary
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, (url) => setNewProject({ ...newProject, imageUrl: url }))}
                    />
                  </label>
                  {newProject.imageUrl && (
                    <span className="text-[10px] text-green-500 font-mono">Image loaded!</span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-fit px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold cursor-pointer flex items-center gap-2"
              >
                <Plus size={16} /> Create Project
              </button>
            </form>

            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="glass-panel p-6 rounded-2xl border border-gray-800 flex gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                    <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-base leading-tight">{project.title}</h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{project.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1 text-xs font-semibold mt-3 cursor-pointer w-fit"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. BLOGS TAB */}
        {activeTab === 'blogs' && (
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-extrabold">Blogs CRUD</h1>
              <p className="text-gray-400 text-sm mt-1">Publish, edit, and manage articles.</p>
            </div>

            {/* Write Blog Form */}
            <form onSubmit={handleAddBlog} className="glass-panel p-8 rounded-3xl border border-gray-800 flex flex-col gap-6">
              <h3 className="text-lg font-bold mb-2">Write New Article</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Article Title</label>
                  <input
                    type="text"
                    required
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="JavaScript, React, Security"
                    required
                    value={newBlog.tags}
                    onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-gray-400">Content (Markdown supported)</label>
                <textarea
                  rows={8}
                  required
                  placeholder="## Heading 2\nWrite markdown here..."
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  className="p-3 bg-gray-950 border border-gray-850 rounded-xl focus:border-blue-500 focus:outline-none font-mono text-sm leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-gray-400">Cover Image URL</label>
                <input
                  type="text"
                  value={newBlog.coverImage}
                  onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.value })}
                  className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none mb-2"
                />
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-xs px-4 py-2.5 rounded-lg border border-gray-850 flex items-center gap-2">
                    <Upload size={14} /> Upload cover to Cloudinary
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, (url) => setNewBlog({ ...newBlog, coverImage: url }))}
                    />
                  </label>
                  {newBlog.coverImage && (
                    <span className="text-[10px] text-green-500 font-mono">Image loaded!</span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-fit px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold cursor-pointer flex items-center gap-2"
              >
                <Plus size={16} /> Publish Post
              </button>
            </form>

            {/* Blogs List */}
            <div className="grid grid-cols-1 gap-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="glass-panel p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold text-base">{blog.title}</span>
                    <span className="text-xs text-gray-400 mt-1 font-mono">
                      Views: {blog.views} • Published on:{' '}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="p-2 text-red-400 hover:text-red-350 hover:bg-red-500/10 rounded-lg cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. TIMELINE TAB */}
        {activeTab === 'timeline' && (
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-extrabold">Timeline milestones</h1>
              <p className="text-gray-400 text-sm mt-1">Configure your timeline milestones.</p>
            </div>

            {/* Add Timeline Item */}
            <form onSubmit={handleAddTimeline} className="glass-panel p-6 rounded-3xl border border-gray-800 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Milestone Stage</label>
                  <select
                    value={newTimeline.period}
                    onChange={(e) => setNewTimeline({ ...newTimeline, period: e.target.value as any })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Beginning">Beginning</option>
                    <option value="Current">Current</option>
                    <option value="Future Goal">Future Goal</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Milestone Title</label>
                  <input
                    type="text"
                    required
                    value={newTimeline.title}
                    onChange={(e) => setNewTimeline({ ...newTimeline, title: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="flex flex-col gap-2 md:col-span-3">
                  <label className="text-xs font-mono uppercase text-gray-400">Description</label>
                  <input
                    type="text"
                    required
                    value={newTimeline.description}
                    onChange={(e) => setNewTimeline({ ...newTimeline, description: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-850 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Order</label>
                  <input
                    type="number"
                    required
                    value={newTimeline.order}
                    onChange={(e) => setNewTimeline({ ...newTimeline, order: Number(e.target.value) })}
                    className="p-3 bg-gray-950 border border-gray-850 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-fit px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold cursor-pointer flex items-center gap-2 mt-2"
              >
                <Plus size={16} /> Add Milestone
              </button>
            </form>

            {/* Milestones List */}
            <div className="flex flex-col gap-4">
              {timelineItems.map((item) => (
                <div key={item._id} className="glass-panel p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-blue-500">{item.period}</span>
                    <h5 className="font-bold text-sm mt-1">{item.title}</h5>
                    <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTimeline(item._id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-extrabold">Gallery Manager</h1>
              <p className="text-gray-400 text-sm mt-1">Upload and catalog photography assets.</p>
            </div>

            {/* Upload Gallery Image Form */}
            <form onSubmit={handleAddGalleryImage} className="glass-panel p-6 rounded-3xl border border-gray-800 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Media Title</label>
                  <input
                    type="text"
                    required
                    value={newGallery.title}
                    onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Category</label>
                  <select
                    value={newGallery.category}
                    onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value as any })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Profile">Profile</option>
                    <option value="Football">Football</option>
                    <option value="Banner Designs">Banner Designs</option>
                    <option value="Memories">Memories</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-gray-400">Image Asset URL</label>
                  <input
                    type="text"
                    required
                    value={newGallery.imageUrl}
                    onChange={(e) => setNewGallery({ ...newGallery, imageUrl: e.target.value })}
                    className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-xs px-4 py-2.5 rounded-lg border border-gray-850 flex items-center gap-2">
                  <Upload size={14} /> Upload image to Cloudinary
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, (url) => setNewGallery({ ...newGallery, imageUrl: url }))}
                  />
                </label>
                {newGallery.imageUrl && (
                  <span className="text-[10px] text-green-500 font-mono">Image URL set successfully!</span>
                )}
              </div>

              <button
                type="submit"
                className="w-fit px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold cursor-pointer flex items-center gap-2 mt-2"
              >
                <Plus size={16} /> Add to Gallery
              </button>
            </form>

            {/* Images Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {galleryImages.map((image) => (
                <div key={image._id} className="glass-panel rounded-2xl overflow-hidden relative group aspect-square border border-gray-900">
                  <Image src={image.imageUrl} alt={image.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                    <span className="text-[9px] uppercase font-mono text-blue-400">{image.category}</span>
                    <h6 className="font-bold text-xs truncate leading-tight mt-1 text-white">{image.title}</h6>
                    <button
                      onClick={() => handleDeleteGalleryImage(image._id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-2 rounded-lg mt-2 cursor-pointer w-fit"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. ACTIVITIES TAB */}
        {activeTab === 'activities' && (
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-extrabold">Current Activities</h1>
              <p className="text-gray-400 text-sm mt-1">Configure active targets and goals.</p>
            </div>

            <form onSubmit={handleUpdateActivities} className="glass-panel p-8 rounded-3xl border border-gray-800 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-gray-400">Currently Learning (comma separated)</label>
                <textarea
                  rows={4}
                  value={activities.learning.join(', ')}
                  onChange={(e) =>
                    setActivities({
                      ...activities,
                      learning: e.target.value.split(',').map((l) => l.trim()),
                    })
                  }
                  className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-gray-400">Current Goals (comma separated)</label>
                <textarea
                  rows={4}
                  value={activities.goals.join(', ')}
                  onChange={(e) =>
                    setActivities({
                      ...activities,
                      goals: e.target.value.split(',').map((g) => g.trim()),
                    })
                  }
                  className="p-3 bg-gray-950 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-fit px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold cursor-pointer"
              >
                Save Focus Data
              </button>
            </form>
          </div>
        )}

        {/* 9. MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-extrabold">Inbox Messages</h1>
              <p className="text-gray-400 text-sm mt-1">View incoming contact requests.</p>
            </div>

            <div className="flex flex-col gap-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div
                    key={message._id}
                    className={`glass-panel p-6 rounded-2xl border transition-colors duration-250 flex flex-col gap-3 relative ${
                      message.read ? 'border-gray-900 bg-gray-950/20' : 'border-blue-500/30 bg-blue-500/5'
                    }`}
                  >
                    {!message.read && (
                      <span className="absolute top-4 right-4 text-[9px] uppercase font-mono tracking-widest bg-blue-600 text-white px-2 py-0.5 rounded">
                        New
                      </span>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-900/60 pb-3">
                      <div>
                        <h4 className="font-bold text-base">{message.name}</h4>
                        <span className="text-xs text-gray-400 font-mono">{message.email}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {message.message}
                    </p>

                    <div className="flex items-center gap-3 mt-4 border-t border-gray-900/40 pt-4">
                      {!message.read && (
                        <button
                          onClick={() => handleMarkMessageRead(message._id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 cursor-pointer"
                        >
                          <Check size={14} />
                          <span>Mark Read</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(message._id)}
                        className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 cursor-pointer ml-auto"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-gray-400 font-mono text-sm">
                  Inbox is currently empty.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
