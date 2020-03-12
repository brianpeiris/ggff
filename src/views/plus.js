const React = require("react");

const { getDB, pruneExpired } = require("../db.js");
const { renderApp } = require("./shared.js");

function LinkInfo({ id, url, expires }) {
  const minutesLeft = Math.floor((expires - Date.now()) / 1000 / 60);
  return (
    <>
      <a className="short-link" href={`/${id}`}>
        ggff.io/{id}
      </a>
      <br />
      expires in {minutesLeft} minute{minutesLeft === 1 ? "" : "s"}
      <br />
      it points to{" "}
      <a className="info-link" href={url}>
        {url}
      </a>
    </>
  );
}

module.exports = async function(req, res) {
  await pruneExpired();
  const id = req.url.match(/\/([^+]+)\+$/)[1];
  const db = await getDB();
  const link = await db.collection("links").findOne({ id });
  if (link) {
    res.status(200).send(renderApp(<LinkInfo {...link} />));
  } else {
    res.status(404).send(renderApp("404 - Link not found"));
  }
};
