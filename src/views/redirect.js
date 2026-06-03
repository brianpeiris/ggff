import { getDB, pruneExpired } from "../db.js";
import { renderApp } from "./shared.js";

export default async (request, reply) => {
  await pruneExpired();
  const id = (request.query && request.query.code) || (request.body && request.body.code) || request.url.substring(1);
  const db = await getDB();
  const { url } = (await db.collection("links").findOne({ id })) || {};
  if (url) {
    reply.redirect(new URL(url).href, 302);
  } else {
    reply.code(404).type("text/html").send(renderApp("404 - link not found"));
  }
};
