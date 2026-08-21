/**
 * Run this script once to seed the admin user into MongoDB.
 * It removes ALL existing admin users and inserts only one:
 *   username: mayrufahmedbd
 *   password: mayruf123#   (stored as plain text, no hashing)
 *
 * Usage (from project root):
 *   node --env-file=.env.local scripts/seedAdmin.mjs
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set. Make sure .env.local is loaded.');
  process.exit(1);
}

// Define schema inline (plain-text password, no hashing)
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅  Connected to MongoDB');

  // Remove ALL existing admin documents
  const deleted = await Admin.deleteMany({});
  console.log(`🗑️   Removed ${deleted.deletedCount} existing admin(s)`);

  // Insert the single admin with plain-text credentials
  await Admin.create({
    username: 'mayrufahmedbd',
    password: 'mayruf123#',
  });

  console.log('✅  Admin created:');
  console.log('    Username : mayrufahmedbd');
  console.log('    Password : mayruf123#');

  await mongoose.disconnect();
  console.log('✅  Done – disconnected from MongoDB');
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err);
  process.exit(1);
});
