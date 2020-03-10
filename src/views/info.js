const React = require("react");

const cwd = process.cwd();
const { getDB } = require(cwd + "/db.js");
const { renderApp } = require("./shared.js");

function LinkInfo({ id, url, expires }) {
  const minutesLeft = Math.floor((expires - Date.now()) / 1000 / 60);
  return (
    <>
    <a href={`/${id}`}>ggff.io/{id}</a> expires in {minutesLeft} minutes.<br />
      It points to <a href={url}>{url}</a>.
    </>
  );
}

module.exports = async function(req, res) {
  const id = req.url.match(/\/([^+]+)\+$/)[1];
  const db = await getDB();
  const link = await db.collection("links").findOne({ id });
  if (link) {
    res.status(200).send(renderApp(<LinkInfo {...link} />));
  } else {
    res.status(404).send(renderApp("404 - Link not found"));
  }
};
