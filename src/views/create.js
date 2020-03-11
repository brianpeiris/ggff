const React = require("react");

const { renderApp } = require("./shared.js");

function CreateForm() {
  return (
    <>
    <form action="/api/actions/create" method="get">
      <input type="text" name="url" placeholder="enter a link" autoFocus />
      <button type="submit">shorten</button>
    </form>
    <p>
      ggff.io short links are easy to type, easy to remember, and last for 10 minutes
    </p>
    </>
  );
}

module.exports = (req, res) => {
  res.status(200).send(renderApp(<CreateForm />));
};
