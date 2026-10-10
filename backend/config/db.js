const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Auto-seed initial collections if database is empty
    try {
      const { runAutoSeed } = require('../controllers/seedController');
      await runAutoSeed();
      console.log('Database auto-seed check complete.');
    } catch (seedErr) {
      console.error('Auto-seed check notice:', seedErr.message);
    }
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
  }
};

module.exports = connectDB;