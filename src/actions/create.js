const { getDB, pruneExpired } = require("../db.js");
const { generateId } = require("../utils.js");

const EXPIRY_MINUTES = 6;

async function createLink(url) {
  await pruneExpired();
  const db = await getDB();
  const links = db.collection("links");

  let currentCount = await links.countDocuments({});
  let id = generateId(currentCount);
  while ((await links.findOne({ id })) !== null) {
    currentCount = await links.countDocuments({});
    id = generateId(currentCount);
  }

  await links.insertOne({ id, url, expires: Date.now() + EXPIRY_MINUTES * 60 * 1000 });

  return id;
}

module.exports = async (req, res) => {
  let url = (req.query.url || req.body.url).trim();
  if (/https?:\/[^/]/.test(url)) {
    url = url.replace(":/", "://");
  }
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }
  const id = await createLink(url);

  res.status(302);
  res.setHeader("location", `/${id}+`);
  res.send();
};
