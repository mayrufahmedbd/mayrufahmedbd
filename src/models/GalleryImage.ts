import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryImage extends Document {
  title: string;
  category: 'Profile' | 'Football' | 'Banner Designs' | 'Memories';
  imageUrl: string;
  order: number;
}

const GalleryImageSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['Profile', 'Football', 'Banner Designs', 'Memories'],
      required: true,
    },
    imageUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
