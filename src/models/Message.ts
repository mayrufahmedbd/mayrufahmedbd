import mongoose, { Schema, Document } from 'mongoose';

export type ContactTopic = 'programming' | 'cybersecurity' | 'general' | 'web-design' | 'other';

export interface IMessage extends Document {
  name: string;
  phone: string;
  email: string;
  topic: ContactTopic;
  message: string;
  read: boolean;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    name:    { type: String, required: true, trim: true },
    phone:   { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true },
    topic:   {
      type: String,
      required: true,
      enum: ['programming', 'cybersecurity', 'general', 'web-design', 'other'],
      default: 'general',
    },
    message: { type: String, required: true },
    read:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
