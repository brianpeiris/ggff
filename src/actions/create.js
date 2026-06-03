import { getDB, pruneExpired } from "../db.js";
import { generateId } from "../utils.js";

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

export default async (request, reply) => {
  let url = (request.body && request.body.url) || request.url.substring(1);
  if (/https?:\/[^/]/.test(url)) {
    url = url.replace(":/", "://");
  }
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }
  const id = await createLink(url);

  reply.redirect(`/${id}+`);
};
