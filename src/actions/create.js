const { getDB, pruneExpired } = require("../db.js");
const { generateId } = require("../utils.js");

async function createLink(url, res) {
  await pruneExpired();
  const db = await getDB();
  const links = db.collection("links");
  const currentCount = await links.countDocuments({});
  const id = generateId(currentCount);
  await links.insertOne({ id, url, expires: Date.now() + 2 * 60 * 1000 });
  res.status(302);
  res.setHeader("location", `/${id}+`);
  res.send();
}

module.exports = async (req, res) => {
  const { url } = req.query;
  await createLink(url, res);
};
