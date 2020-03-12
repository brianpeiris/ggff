const { getDB, pruneExpired } = require("../db.js");
const { renderApp } = require("./shared.js");

module.exports = async (req, res) => {
  await pruneExpired();
  const id = req.query.code || req.url.substring(1);
  const db = await getDB();
  const { url } = (await db.collection("links").findOne({ id })) || {};
  if (url) {
    res.setHeader("Location", new URL(url).href);
    res.status(301).send("");
  } else {
    res.status(404).send(renderApp("404 - link not found"));
  }
};
