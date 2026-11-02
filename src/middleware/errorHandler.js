// 404 - route illa
function notFound(req, res) {
  res.status(404).json({ message: 'Route not found' });
}

// Ella unexpected errors um inga dhaan varum (Express 5 async errors kooda)
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
}

module.exports = { notFound, errorHandler };
