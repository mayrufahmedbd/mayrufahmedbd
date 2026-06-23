import React from 'react';
import dbConnect from '@/lib/dbConnect';
import AboutModel from '@/models/About';
import TimelineItemModel from '@/models/TimelineItem';
import SkillModel from '@/models/Skill';
import CurrentActivityModel from '@/models/CurrentActivity';
import { seedDatabase } from '@/lib/seed';

import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Skills from '@/components/Skills';
import Interests from '@/components/Interests';
import Activities from '@/components/Activities';

export const revalidate = 0;

async function getAboutPageData() {
  await dbConnect();
  
  let about = await AboutModel.findOne();
  if (!about) {
    await seedDatabase();
    about = await AboutModel.findOne();
  }

  const timeline = await TimelineItemModel.find().sort({ order: 1 });
  const skills = await SkillModel.find().sort({ level: -1 });
  const activities = await CurrentActivityModel.findOne();

  return {
    about: JSON.parse(JSON.stringify(about)),
    timeline: JSON.parse(JSON.stringify(timeline)),
    skills: JSON.parse(JSON.stringify(skills)),
    activities: activities ? JSON.parse(JSON.stringify(activities)) : null,
  };
}

export default async function AboutPage() {
  const { about, timeline, skills, activities } = await getAboutPageData();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
          Profile
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          About My Journey
        </h1>
        <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md mx-auto">
          A deep dive into my background, developer skillset, and career goals.
        </p>
      </div>

      {/* Main Biography Section */}
      <About data={about} />

      {/* Journey Timeline */}
      <div className="mt-16 border-t border-card-border/50 pt-16">
        <Timeline data={timeline} />
      </div>

      {/* Professional Skills */}
      <div className="mt-16 border-t border-card-border/50 pt-16">
        <Skills data={skills} />
      </div>

      {/* Personal Passions & Activities */}
      <div className="mt-16 border-t border-card-border/50 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Interests />
        </div>
        <div className="lg:col-span-4">
          <Activities data={activities} />
        </div>
      </div>
    </div>
  );
}
