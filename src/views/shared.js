import React from "react";
import ReactDOMServer from "react-dom/server.js";
import fs from "node:fs";

const appTemplate = fs.readFileSync(import.meta.dirname + "/../../index.html", "utf8");

export function renderApp(contents) {
  return appTemplate.replace("<!--CONTENTS-->", ReactDOMServer.renderToStaticMarkup(<main>{contents}</main>));
}
