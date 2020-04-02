const React = require("react");

const { renderApp } = require("./shared.js");

function EnterForm() {
  return (
    <form action="/api/views/redirect" method="post">
      <input is="no-caps" type="text" required name="code" placeholder="enter a code" autoFocus autoComplete="off" />
      <button type="submit">go</button>
    </form>
  );
}

module.exports = (req, res) => {
  res.status(200).send(renderApp(<EnterForm />));
};
