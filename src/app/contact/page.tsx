import React from 'react';
import dbConnect from '@/lib/dbConnect';
import AboutModel from '@/models/About';
import Contact from '@/components/Contact';

export const revalidate = 0;

async function getAboutData() {
  await dbConnect();
  const about = await AboutModel.findOne();
  return JSON.parse(JSON.stringify(about));
}

export default async function ContactPage() {
  const about = await getAboutData();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Contact aboutData={about} />
    </div>
  );
}
