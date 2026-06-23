import mongoose, { Schema, Document } from 'mongoose';

export interface ICurrentActivity extends Document {
  learning: string[];
  goals: string[];
}

const CurrentActivitySchema: Schema = new Schema(
  {
    learning: [{ type: String, required: true }],
    goals: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.models.CurrentActivity || mongoose.model<ICurrentActivity>('CurrentActivity', CurrentActivitySchema);
