import {default as mongodb} from "mongodb";

const mongoUri = "mongodb://mongo:27017/ggff";
let client;
export async function getDB() {
  if (!client) {
    client = await mongodb.MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
  return client.db();
}

export async function pruneExpired() {
  const db = await getDB();
  await db.collection("links").deleteMany({
    expires: { $lt: Date.now() }
  });
}
