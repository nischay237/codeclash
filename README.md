# ⚔️ CodeClash — 1v1 Real-Time Multiplayer Coding Battle Arena
> **An esports-grade competitive coding platform powered by the MERN stack, WebSockets, sandboxed execution, and FIDE Elo calibration.**

[![Node.js](https://img.shields.io/badge/Node.js-v24-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21-black.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8-white.svg)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## 🎯 What is CodeClash?
**CodeClash** turns standard coding practice into a high-octane 1v1 multiplayer competitive esports experience. Two developers are matched in real-time, given an algorithmic challenge, and battle head-to-head.
- **Live Opponent Telemetry Radar**: Watch your opponent’s typing progress and test-pass milestones in real-time.
- **Secured Node.js VM Sandbox**: User submissions run inside an isolated runtime with strict CPU timeouts and memory protection.
- **Official FIDE Chess Elo Rating System**: Dynamic K-factor matchmaking ensures competitive integrity ($R' = R + K \cdot (S - E)$).
- **Zero-Wait ClashBot AI Fallback**: Never wait in an empty queue — intelligent AI bots jump in after 7 seconds to keep the arena instantly playable.
- **Procedural Web Audio Engine**: Synthesized countdown beeps, pass/fail chimes, and victory fanfares generated via native Web Audio API without external audio asset dependencies.

---

## 🏗️ Architecture & High-Level System Design

```
                     ┌──────────────────────────────────────────────┐
                     │          CodeClash Client (React 18)         │
                     │  - Monaco-style Editor  - Opponent Radar     │
                     │  - Procedural Audio     - Confetti VFX       │
                     └──────────────────────┬───────────────────────┘
                                            │ Bi-directional WebSockets
                                            ▼
                     ┌──────────────────────────────────────────────┐
                     │          Node.js & Express Gateway           │
                     │  - Matchmaking Queue    - Room Manager       │
                     │  - REST API Routes      - Static Asset Serve │
                     └───────┬──────────────────────────────┬───────┘
                             │                              │
                             ▼                              ▼
      ┌───────────────────────────────────┐    ┌─────────────────────────┐
      │  Secured In-Memory VM Sandbox     │    │   Persistence Layer     │
      │  - Stripped Globals (fs, process) │    │   - MongoDB Atlas /     │
      │  - Hard 1,500ms CPU Timeout       │    │     Resilient Memory    │
      │  - Deep Output Assertion Engine   │    │     Fallback Store      │
      └───────────────────────────────────┘    └─────────────────────────┘
```

---

## 💼 Corporate Interview Cheat Sheet ("Bhaukaal" Topics)

When discussing CodeClash with senior tech leads and hiring managers, highlight these 5 architectural pillars:

### 1. Isolated Sandboxed Execution vs Security Jailbreaks
* **Challenge**: How do you execute untrusted user JavaScript code without allowing `while(true){}` infinite loops or malicious `process.exit()` calls to crash your backend?
* **Solution**: Implemented Node.js `node:vm` context isolation with stripped global scopes. Function execution is wrapped inside a secondary execution script (`vm.runInContext`) with strict hard CPU timeouts (`timeoutMs: 1500`), immediately killing runaway infinite loops with standard `ERR_SCRIPT_EXECUTION_TIMEOUT`.

### 2. Event-Driven Distributed Matchmaking & State Reconciliation
* **Challenge**: Handling concurrency, disconnections, and race conditions during 1v1 matchmaking.
* **Solution**: Built an in-memory queue manager with heartbeat listeners. Disconnections during battle trigger automated forfeit penalties, cleanly awarding the win to the remaining player and updating Elo points.

### 3. FIDE Chess Elo Rating Algorithm
* **Formula**:
  $$E_A = \frac{1}{1 + 10^{(R_B - R_A)/400}}$$
  $$R'_A = R_A + K \cdot (S_A - E_A)$$
* Calibrated with dynamic K-factors ($K=32$ for calibration matches, $K=20$ for established players) and tier rankings (Bronze, Silver, Gold, Platinum, Grandmaster).

### 4. Zero-Wait Bot Fallback System
* **Problem**: In new apps, users abandon if matchmaking queues exceed 10 seconds.
* **Solution**: Automatic timeout escalator that pairs single players with `ClashBot_Nova`, `ClashBot_Kage`, or `ClashBot_Zenith`, simulating human typing cadences and realistic test-case progressions.

### 5. Procedural Web Audio API Synthesis
* Instead of loading heavy MP3/WAV files that can fail or suffer network latency, all sound effects (countdown beeps, victory fanfares, test passes) are synthesized in real-time using browser native oscillator nodes and exponential gain ramps.

---

## 🚀 One-Click Cloud Deployment (Render / Railway)

### 1. Deploy on Render
1. Push this repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New > Blueprint**.
3. Connect your repository. Render automatically reads [`render.yaml`](./render.yaml).
4. Click **Apply**. Your app is live with a permanent URL!

### 2. Optional: Connect MongoDB Atlas
Add an environment variable on your hosting dashboard:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/codeclash
```
*(If unset, the application automatically runs in resilient in-memory fallback mode!)*

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm run install:all

# 2. Build the client bundle
npm run build

# 3. Start the full-stack server
npm start
# Open http://localhost:5000 in your browser!
```

---

## 📜 License
MIT License. Built for real-world competitive coding and high-impact technical portfolio showcases.