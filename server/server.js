const { createServer } = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const config = require('./src/config');
const setupSocketHandlers = require('./src/socket/socketHandler');

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.corsOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

setupSocketHandlers(io);

const PORT = config.port;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});