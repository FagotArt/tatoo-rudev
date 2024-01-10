import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import '@/lib/models/';
import path from 'path';
import fs from 'fs';

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

  server.use('/assets', (req, res) => {
    const filePath = path.join(__dirname, 'assets', req.path);
    // console log if the file exists or not
    if (fs.existsSync(filePath)) {
      console.log('File exists',filePath);
    } else {
      console.log('File does not exist',filePath);
    }
    return res.sendFile(filePath);
  
  });

  server.all('*', (req:any, res:any) => {
    handle(req, res)
  });

  connectToMongoDB().then(() => {
    server.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  });
});