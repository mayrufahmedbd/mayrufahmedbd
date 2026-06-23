import mongoose, { Schema, Document } from 'mongoose';

export interface IVisitorStats extends Document {
  views: number;
}

const VisitorStatsSchema: Schema = new Schema(
  {
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.VisitorStats || mongoose.model<IVisitorStats>('VisitorStats', VisitorStatsSchema);
