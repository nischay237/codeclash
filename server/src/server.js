import http from 'node:http';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import { initializeBattleSockets } from './sockets/battleSocket.js';
import authRoutes from './routes/authRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Socket.io initialization with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: false // Allow dynamic scripts and styles in production
}));
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'CodeClash Battle Engine',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build if present (Unified Single-Port Deployment)
const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.json({
        message: 'CodeClash Server API is Live. Run Vite dev server for frontend development.',
        endpoints: ['/api/health', '/api/problems', '/api/leaderboard', '/api/auth/guest']
      });
    }
  });
});

// Initialize real-time battle sockets
initializeBattleSockets(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`===============================================`);
  console.log(`⚔️  CodeClash Battle Server running on port ${PORT}`);
  console.log(`🌐 Real-Time WebSockets Engine: ACTIVE`);
  console.log(`===============================================`);
  await connectDB();

  // ==============================================================
  // 24/7 PERMANENT KEEP-ALIVE (PREVENTS RENDER FREE TIER SLEEP)
  // ==============================================================
  const PING_INTERVAL_MS = 10 * 60 * 1000; // Ping every 10 mins (Render sleeps at 15 mins)
  const SERVER_URL = process.env.RENDER_EXTERNAL_URL || 'https://nischaysrivastava.com';

  const pingServer = () => {
    try {
      const pingUrl = `${SERVER_URL}/api/health`;
      const client = pingUrl.startsWith('https') ? https : http;
      client.get(pingUrl, (res) => {
        console.log(`[24/7 KeepAlive] Ping sent to ${pingUrl} - Status: ${res.statusCode} at ${new Date().toISOString()}`);
      }).on('error', (err) => {
        console.warn(`[24/7 KeepAlive] Ping notice: ${err.message}`);
      });
    } catch (e) {
      console.warn(`[24/7 KeepAlive] Error: ${e.message}`);
    }
  };

  // Initial warmup ping after 45 seconds, then recurring every 10 minutes
  setTimeout(pingServer, 45000);
  setInterval(pingServer, PING_INTERVAL_MS);
});
