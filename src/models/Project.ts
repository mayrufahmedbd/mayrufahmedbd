import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  order: number;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tech: [{ type: String, required: true }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
