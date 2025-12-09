// Simple MongoDB connection test
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'safetrip';

  if (!uri) {
    console.error('❌ MONGODB_URI not found in environment variables');
    return;
  }

  console.log('🔍 Testing MongoDB Atlas connection...');
  console.log('📍 URI:', uri.replace(/:([^:@]{4})[^:@]*@/, ':****@'));
  console.log('🗄️ Database:', dbName);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');

    const db = client.db(dbName);
    const collections = await db.collections();
    console.log('📋 Collections found:', collections.map(c => c.collectionName));

    // Check touristspots collection
    const touristSpotsCollection = db.collection('touristspots');
    const count = await touristSpotsCollection.countDocuments();
    console.log('🏖️ Tourist spots count:', count);

    if (count > 0) {
      const sample = await touristSpotsCollection.findOne();
      console.log('📄 Sample document:', JSON.stringify(sample, null, 2));
    }

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  } finally {
    await client.close();
  }
}

testConnection();
