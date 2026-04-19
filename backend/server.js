// Load environment variables from .env file
require('dotenv').config({ path: './.env' });

const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');
const path = require('path');

// Import all route files
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize Express application
const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __dirnameResolved = path.resolve();

// Frontend build
app.use(express.static(path.join(__dirnameResolved, "frontend", "dist")));

app.get(/^(?!\/api).*/, (_, res) => {
    res.sendFile(
        path.join(__dirnameResolved, "frontend", "dist", "index.html")
    );
});

// ==================== ROUTES ====================
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);

// ==================== HEALTH CHECK ====================
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'PropHub Server is healthy and running',
    timestamp: new Date().toISOString(),
  });
});

// ==================== 404 HANDLER ====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'The requested API endpoint does not exist',
    path: req.originalUrl,
  });
});

// ==================== ERROR HANDLER ====================
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ==================== START SERVER ====================
const startServer = async () => {
  try {
    await connectDatabase();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`
========================================
🚀 Server Started Successfully
========================================
📍 http://localhost:${PORT}/api
========================================
      `);
    });
  } catch (error) {
    console.error('CRITICAL ERROR:', error.message);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;