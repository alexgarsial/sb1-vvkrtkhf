function errorHandler(err, req, res, next) {
  console.error(err.stack);
  
  res.status(500).json({
    error: 'Une erreur est survenue sur le serveur',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}

module.exports = errorHandler;