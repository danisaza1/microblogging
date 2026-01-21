// middleware/errorHandlers.js

// Middleware for handling 404 Not Found errors
export const notFoundHandler = (req, res, next) => {
  console.log(`❌ Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Ruta no encontrada',
    method: req.method,
    path: req.originalUrl,
    // You could dynamically list available routes or provide a link to API docs here
  });
};

// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error no manejado:', err); // Log the full error for debugging

  // Set a default status code and message
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal en el servidor.';

  // Send the error response
  res.status(statusCode).json({
    error: 'Error interno del servidor',
    message: message,
  });
};