const { MongoClient } = require("mongodb");

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/ggff";

let client;

async function getDB() {
  if (!client) {
    client = await MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
  return client.db();
}

async function pruneExpired() {
  const db = await getDB();
  await db.collection("links").deleteMany({
    expires: { $lt: Date.now() }
  });
}

module.exports = {
  getDB,
  pruneExpired
};
