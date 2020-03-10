const cwd = process.cwd();
const { getDB, pruneExpired } = require(cwd + "/db.js");
const { generateId } = require(cwd + "/utils.js");

async function createLink(url, res) {
  await pruneExpired();
  const db = await getDB();
  const links = db.collection("links");
  const currentCount = await links.countDocuments({});
  const id = generateId(currentCount);
  await links.insertOne({ id, url, expires: Date.now() + 11 * 60 * 1000 });
  res.status(302);
  res.setHeader("location", `/${id}+`);
  res.send();
}

module.exports = async (req, res) => {
  const { url } = req.query;
  await createLink(url, res);
};
