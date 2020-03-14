const React = require("react");

const { renderApp } = require("./shared.js");

function EnterForm() {
  return (
    <form action="/api/views/redirect" method="post">
      <input required type="text" name="code" placeholder="enter a code" autoFocus />
      <button type="submit">go</button>
    </form>
  );
}

module.exports = (req, res) => {
  res.status(200).send(renderApp(<EnterForm />));
};
