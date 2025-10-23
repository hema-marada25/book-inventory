const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

function getMongoURI() {
  const env = process.env.NODE_ENV || 'dev';

  const configMap = {
    dev: process.env.DEV_MONGO_URI,
    uat: process.env.UAT_MONGO_URI,
    prod: process.env.PROD_MONGO_URI,
  };
  const uri = configMap[env];
  if (!uri) {
    console.error(`No MongoDB URI found for environment: ${env}`);
    process.exit(1);
  }
  return uri;
}
async function initializeDatabaseConnection() {
  if (isConnected) {
    console.log('MongoDB already connected.');
    return mongoose.connection;
  }
  const mongoURI = getMongoURI();
  try {
    const conn = await mongoose.connect(mongoURI);
    isConnected = true;
    console.log(`MongoDB connected successfully! [${process.env.NODE_ENV || 'dev'}]`);
      } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected!');
  });
  return mongoose.connection;
}
async function closeDatabaseConnection() {
  if (isConnected) {
    await mongoose.connection.close();
    isConnected = false;
    console.log('MongoDB connection closed.');
  }
}

module.exports = {
  initializeDatabaseConnection,
  closeDatabaseConnection,
};
