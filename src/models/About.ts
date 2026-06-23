import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  name: string;
  title: string;
  typingAnimations: string[];
  whoIAm: string;
  whatIDo: string[];
  whatIWantToDo: string[];
  resumeUrl: string;
  profileImage: string;
  email: string;
  phone: string;
  address: string;
  githubUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  twitterUrl: string;
}

const AboutSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    typingAnimations: [{ type: String, required: true }],
    whoIAm: { type: String, required: true },
    whatIDo: [{ type: String, required: true }],
    whatIWantToDo: [{ type: String, required: true }],
    resumeUrl: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    facebookUrl: { type: String, default: '' },
    twitterUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);
