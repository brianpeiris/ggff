const cwd = process.cwd();
const { getDB } = require(cwd + "/db.js");
const { renderApp } = require("./shared.js");

module.exports = async (req, res) => {
  const id = req.url.substring(1);
  const db = await getDB();
  const { url } = (await db.collection("links").findOne({ id })) || {};
  if (url) {
    res.setHeader("Location", url);
    res.status(301).send("");
  } else {
    res.status(404).send(renderApp("404 - Link not found"));
  }
};
