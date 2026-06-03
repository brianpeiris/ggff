import React from "react";

import { getDB, pruneExpired } from "../db.js";
import { renderApp } from "./shared.js";

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

export default async function(request, reply) {
  await pruneExpired();
  const id = request.url.match(/\/([^+]+)\+$/)[1];
  const db = await getDB();
  const link = await db.collection("links").findOne({ id });
  if (link) {
    reply.type("text/html").send(renderApp(<LinkInfo {...link} />));
  } else {
    reply.code(404).type("text/html").send(renderApp("404 - Link not found"));
  }
};
