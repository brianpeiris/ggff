import React from "react";

import { renderApp } from "./shared.js";

function EnterForm() {
  return (
    <form action="/api/redirect" method="post">
      <input is="no-caps" type="text" required name="code" placeholder="enter a code" autoFocus autoComplete="off" />
      <button type="submit">go</button>
    </form>
  );
}

export default () => {
  return renderApp(<EnterForm />);
};
