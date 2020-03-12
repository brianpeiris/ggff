const React = require("react");

const { renderApp } = require("./shared.js");
const { choose } = require("../utils.js");

const tips = [
  <>
    you can shorten a link in your address bar by prepending "ggff.io/" to it. for example, ggff.io/https://example.com
    or ggff.io/example.com
  </>,
  <>
    bookmark <a href="/enter">ggff.io/enter</a> to enter shortened codes more easily
  </>,
  <>
    use the <a href="javascript:void(location.href='https://ggff.io/'+location.href)">ggff</a> bookmarklet to
    automatically shorten your current tab
  </>
];
function CreateForm() {
  return (
    <>
      <form action="/api/actions/create" method="post">
        <input
          required
          pattern=" *[^ ]+ *"
          title="Enter a valid link"
          type="text"
          name="url"
          placeholder="enter a link"
          autoFocus
        />
        <button type="submit">shorten</button>
      </form>
      <p>ggff.io short links are easy to type, easy to remember, and last for 5 minutes</p>
      <p className="tip">tip: {choose(tips)}</p>
    </>
  );
}

module.exports = (req, res) => {
  res.status(200).send(renderApp(<CreateForm />));
};
