import React from 'react';
import dbConnect from '@/lib/dbConnect';
import ProjectModel from '@/models/Project';
import ProjectsClientList from '@/components/ProjectsClientList';

export const revalidate = 0;

async function getProjects() {
  await dbConnect();
  const projects = await ProjectModel.find().sort({ order: 1, createdAt: -1 });
  return JSON.parse(JSON.stringify(projects));
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
          Portfolio
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md mx-auto">
          A showcase of application development, backend systems, and security scripts.
        </p>
      </div>

      <ProjectsClientList initialProjects={projects} />
    </div>
  );
}
