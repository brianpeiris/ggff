const React = require("react");

const { renderApp } = require("./shared.js");

function CreateForm() {
  return (
    <form action="/api/actions/create" method="get">
      <input type="text" name="url" placeholder="Enter a URL" autoFocus />
      <button type="submit">shorten</button>
    </form>
  );
}

module.exports = (req, res) => {
  res.status(200).send(renderApp(<CreateForm />));
};
