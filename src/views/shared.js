const React = require("react");
const ReactDOMServer = require("react-dom/server");

const fs = require("fs");
const cwd = process.cwd();
const appTemplate = fs.readFileSync(cwd + "/index.html", "utf8");

function renderApp(contents) {
  return appTemplate.replace(
    "<!--CONTENTS-->",
    ReactDOMServer.renderToStaticMarkup(
      <main>
        <div>{contents}</div>
      </main>
    )
  );
}

module.exports = {
  renderApp
};
