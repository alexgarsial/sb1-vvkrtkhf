const { createServer } = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const config = require('./config');
const setupSocketHandlers = require('./socket/socketHandler');
const logger = require('./utils/logger');

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
  logger.info(`Server running on port ${PORT}`);
});