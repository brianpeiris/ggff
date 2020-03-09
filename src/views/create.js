const React = require("react");
const ReactDOMServer = require("react-dom/server");

const fs = require("fs");
const cwd = process.cwd();
const appTemplate = fs.readFileSync(cwd + "/index.html", "utf8");

function CreateForm() {
  return (
    <form action="/api/actions/create" method="post">
      <input type="text" name="url" placeholder="Enter a URL" />
      <button type="submit">shorten</button>
    </form>
  );
}

module.exports = (req, res) => {
  const contents = <CreateForm />;

  const view = appTemplate.replace(
    "<!--CONTENTS-->",
    ReactDOMServer.renderToStaticMarkup(
      <main>
        <div>{contents}</div>
      </main>
    )
  );

  res.status(200).send(view);
};
