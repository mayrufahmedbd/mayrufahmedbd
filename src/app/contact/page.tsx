import React from 'react';
import type { Metadata } from 'next';
import dbConnect from '@/lib/dbConnect';
import AboutModel from '@/models/About';
import Contact from '@/components/Contact';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Contact Mayruf Ahmed – Hire a Web Designer & Developer in Sylhet',
  description:
    'Get in touch with Mayruf Ahmed, a professional web designer and developer from Sylhet, Bangladesh. Available for freelance web design, development projects, and collaborations.',
  keywords: [
    'contact Mayruf Ahmed',
    'hire Mayruf Ahmed',
    'hire web designer Sylhet',
    'hire web developer Bangladesh',
    'freelance web designer Sylhet',
    'freelance web developer Bangladesh',
    'Mayruf Ahmed contact',
    'web design services Sylhet',
  ],
  alternates: {
    canonical: 'https://www.mayrufahmedbd.com/contact',
  },
  openGraph: {
    title: 'Contact Mayruf Ahmed – Hire a Web Designer in Sylhet',
    description:
      'Reach out to Mayruf Ahmed for web design, development, or collaboration. Based in Sylhet, Bangladesh.',
    url: 'https://www.mayrufahmedbd.com/contact',
    type: 'website',
  },
};


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
