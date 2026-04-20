const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');

    // if (!process.env.MONGO_URI) {
    //   throw new Error("MONGO_URI is not defined in .env file");
    // }

    const connection = await mongoose.connect("mongodb+srv://prashantpanchal058_db_user:pWKSsslkwtew2XVL@cluster0.vzkusa2.mongodb.net/rental-app?appName=Cluster0");

    console.log(`✅ MongoDB connected: ${connection.connection.host}`);
    return connection;

  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDatabase;