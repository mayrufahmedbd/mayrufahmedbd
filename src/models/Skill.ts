import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Cybersecurity';
  level: number; // 0 to 100
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Programming', 'Frontend', 'Backend', 'Database', 'Tools', 'Cybersecurity'],
      required: true,
    },
    level: { type: Number, required: true, min: 0, max: 100 },
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
