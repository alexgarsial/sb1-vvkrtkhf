const config = {
  port: process.env.PORT || 3000,
  corsOrigins: [
    'https://light-box.be',
    'http://light-box.be'
  ]
};

module.exports = config;