const React = require("react");

const { getDB, pruneExpired } = require("../db.js");
const { generateId } = require("../utils.js");
const { renderApp } = require("./shared.js");

module.exports = async function(req, res) {
  await pruneExpired();
  const db = await getDB();
  const currentCount = await db.collection("links").countDocuments({});
  const id = generateId(currentCount);
  res.status(200).send(
    renderApp(
      <>
        there are {currentCount} links
        <br />
        codes look like &quot;{id}&quot;
      </>
    )
  );
};
