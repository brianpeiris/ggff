const React = require("react");

const { getDB, pruneExpired } = require("../db.js");
const { generateId } = require("../utils.js");
const { renderApp } = require("./shared.js");

function Info() {
  const minutesLeft = Math.floor((expires - Date.now()) / 1000 / 60);
  return (
    <>
      <a href={`/${id}`}>ggff.io/{id}</a> expires in {minutesLeft} minute{minutesLeft === 1 ? "" : "s"}.
      <br />
      It points to{" "}
      <a className="info-link" href={url}>
        {url}
      </a>
      .
    </>
  );
}

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
        codes look like "{id}"
      </>
    )
  );
};
