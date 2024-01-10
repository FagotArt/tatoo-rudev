import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import '@/lib/models/';

dotenv.config(); 

const PORT = process.env.PORT || 3000;      
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
const connectToMongoDB = async () => {
  try {
    if (!process.env.DATABASE) {
      throw new Error('Missing env var DATABASE');
    }
    await mongoose.connect(process.env.DATABASE);
    console.log('Connected to MongoDB');
  } catch (error : any) {
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1);
  }
};

app.prepare().then(() => {
  const server = express();

  server.all('*', (req:any, res:any) => {
    handle(req, res)
  });

  connectToMongoDB().then(() => {
    server.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  });
});