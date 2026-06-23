import mongoose, { Schema, Document } from 'mongoose';

export interface ITimelineItem extends Document {
  period: 'Beginning' | 'Current' | 'Future Goal';
  title: string;
  description: string;
  order: number;
}

const TimelineItemSchema: Schema = new Schema(
  {
    period: { type: String, enum: ['Beginning', 'Current', 'Future Goal'], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.TimelineItem || mongoose.model<ITimelineItem>('TimelineItem', TimelineItemSchema);
