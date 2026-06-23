import React from 'react';
import dbConnect from '@/lib/dbConnect';
import GalleryImageModel from '@/models/GalleryImage';
import GallerySection from '@/components/GallerySection';

export const revalidate = 0;

async function getGallery() {
  await dbConnect();
  const gallery = await GalleryImageModel.find().sort({ order: 1, createdAt: -1 });
  return JSON.parse(JSON.stringify(gallery));
}

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <GallerySection data={gallery} />
    </div>
  );
}
