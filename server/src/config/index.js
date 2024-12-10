const config = {
  port: process.env.PORT || 3000,
  corsOrigins: [
    'https://light-box.be',
    'http://light-box.be',
    'https://api.light-box.be',
    'http://api.light-box.be'
  ],
  env: process.env.NODE_ENV || 'development'
};

module.exports = config;