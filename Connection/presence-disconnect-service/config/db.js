const mongoose = require('mongoose');

module.exports = async function connectMongo() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/presence';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
