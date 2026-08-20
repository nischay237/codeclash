import mongoose from 'mongoose';

export let isConnectedToDb = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codeclash';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    isConnectedToDb = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    isConnectedToDb = false;
    console.warn(`[Database Warning] MongoDB connection failed (${err.message}). Activating resilient In-Memory Fallback store.`);
  }
}
