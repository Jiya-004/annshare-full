const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Enable CORS for all origins
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'ANNShare Food Rescue & Redistribution API is running',
    version: '1.0.0',
  });
});

// API Routes
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/listings', require('./routes/listingRoutes'));
app.use('/api/donations', require('./routes/listingRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/complaints', require('./routes/feedbackRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/category-extra', require('./routes/categoryExtraRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/reports', require('./routes/statsRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/seed', require('./routes/seedRoutes'));

// 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Endpoint not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`ANNShare API Server running on port ${PORT}`));