const { MongoClient } = require("mongodb");
const cwd = process.cwd();
const { generateId } = require(cwd + "/utils.js");

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/ggff";

async function getDB() {
  const client = await MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  return client.db();
}

async function pruneExpired() {
  const db = await getDB();
  const { deletedCount } = await db.collection("links").deleteMany({
    expires: { $lt: Date.now() }
  });
}

async function createLink(url, res) {
  await pruneExpired();
  const db = await getDB();
  const links = db.collection("links");
  const currentCount = await links.countDocuments({});
  const id = generateId(currentCount);
  await links.insertOne({ id, url, expires: Date.now() + 11 * 60 * 1000 });
  res.status(302);
  res.setHeader('location', `/${id}+`);
  res.send();
}

module.exports = async (req, res) => {
  const { url } = req.body;
  await(createLink(url, res));
}
