const React = require("react");
const ReactDOMServer = require("react-dom/server");

const fs = require("fs");
const appTemplate = fs.readFileSync(__dirname + "/../../index.html", "utf8");

function renderApp(contents) {
  return appTemplate.replace(
    "<!--CONTENTS-->",
    ReactDOMServer.renderToStaticMarkup(
      <main>
        {contents}
      </main>
    )
  );
}

module.exports = {
  renderApp
};
