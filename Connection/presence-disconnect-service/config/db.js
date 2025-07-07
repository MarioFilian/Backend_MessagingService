const mongoose = require('mongoose');

async function connectMongo() {
  const host = process.env.MONGO_HOST || 'localhost';
  const port = process.env.MONGO_PORT || '27017';
  const dbName = process.env.MONGO_DB || 'presence-db';
  const user = process.env.MONGO_USER || '';
  const pass = process.env.MONGO_PASS || '';
  const authSource = process.env.MONGO_AUTH_DB || '';

  let authPart = '';
  if (user && pass) {
    authPart = `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@`;
  }

  const uri = `mongodb://${authPart}${host}:${port}/${dbName}${authSource ? `?authSource=${authSource}` : ''}`;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Connected to MongoDB`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

module.exports = connectMongo;  // <=== Exporta la función correctamente
