import React from "react";

import { getDB, pruneExpired } from "../db.js";
import { generateId } from "../utils.js";
import { renderApp } from "./shared.js";

export default async function(request, reply) {
  await pruneExpired();
  const db = await getDB();
  const currentCount = await db.collection("links").countDocuments({});
  const id = generateId(currentCount);
  return renderApp(
    <>
      there are {currentCount} links
      <br />
      codes look like &quot;{id}&quot;
    </>
  );
};
