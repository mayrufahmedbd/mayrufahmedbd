import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  coverImage: string;
  views: number;
  published: boolean;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    coverImage: { type: String, default: '' },
    views: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
