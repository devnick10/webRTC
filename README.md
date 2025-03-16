# WebRTC Video Streaming with WebSockets

This project implements a **WebRTC-based video streaming system** using **WebSockets** for signaling. The system consists of a **sender** (who streams video) and a **receiver** (who views the video). Communication is facilitated through a **Node.js WebSocket server**.

## 📌 Features
- **Real-time Video Streaming**: Uses WebRTC for peer-to-peer video transmission.
- **Signaling via WebSockets**: Handles offer/answer exchange and ICE candidates.
- **Dynamic Peer Connection Handling**: Ensures smooth ICE candidate and track management.
- **Supports Multiple Users**: Allows a sender to stream to multiple receivers.

## 🛠️ Technologies Used
- **Frontend**: React (TypeScript), WebRTC APIs
- **Backend**: Node.js, WebSockets (ws library)

## 🚀 Getting Started
### 1️⃣ Install Dependencies
```sh
npm install  # Install server dependencies
cd client && npm install  # Install client dependencies
```

### 2️⃣ Start the WebSocket Server
```sh
npm run server
```

### 3️⃣ Start the Frontend
```sh
cd client
npm start
```

---

## 📡 WebRTC Signaling Flow
### 🟢 **Sender (Sender.tsx)**
1. Opens a **WebSocket connection** to the signaling server.
2. Captures **media stream** using `navigator.mediaDevices.getUserMedia()`.
3. Creates a **WebRTC offer** and sends it to the signaling server.
4. Receives an **answer** from the receiver and sets it as the remote description.
5. Exchanges **ICE candidates** with the receiver.

### 🔵 **Receiver (Receiver.tsx)**
1. Opens a **WebSocket connection** to the signaling server.
2. Receives a **WebRTC offer** and responds with an **answer**.
3. Receives and processes **ICE candidates**.
4. Displays the received video stream.

### 🖥 **WebSocket Signaling Server (backend/src/index.ts)**
1. Manages sender and receiver connections.
2. Relays **offer/answer** messages between peers.
3. Handles **ICE candidate exchange**.

---
## 🎯 Future Enhancements
- Support **multiple senders and receivers**.
- Add **audio streaming**.
- Implement **screen sharing**.
- Improve **UI/UX**.

---


