const fs = require("fs");
const { MongoClient } = require("mongodb");
const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const cwd = process.cwd();
const { generateId } = require(cwd + "/utils.js");
const appTemplate = fs.readFileSync(cwd + "/index.html", "utf8");

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/ggff";

let db;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

function CreateForm() {
  return (
    <form action="/create" method="post">
      <input type="text" name="url" placeholder="Enter a URL" />
      <button type="submit">shorten</button>
    </form>
  );
}

function LinkInfo({ id, url, expires }) {
  const minutesLeft = Math.floor((expires - Date.now()) / 1000 / 60);
  return (
    <>
      <a href={`/${id}`}>{id}</a> expires in {minutesLeft} minutes.<br />
      It points to <a href={url}>{url}</a>.
    </>
  );
}

function renderApp(contents, res) {
  res.send(
    appTemplate.replace(
      "<!--CONTENTS-->",
      ReactDOMServer.renderToStaticMarkup(
        <main>
          <div>{contents}</div>
        </main>
      )
    )
  );
}

async function pruneExpired() {
  const start = Date.now();
  const { deletedCount } = await db.collection("links").deleteMany({
    expires: { $lt: Date.now() }
  });
}

async function createLink(url, res) {
  await pruneExpired();
  const links = db.collection("links");
  const currentCount = await links.countDocuments({});
  const id = generateId(currentCount);
  await links.insertOne({ id, url, expires: Date.now() + 11 * 60 * 1000 });
  res.redirect(`/${id}+`);
}

app.get("/", async (req, res) => {
  renderApp(<CreateForm />, res);
});

app.post("/create", async (req, res) => {
  const { url } = req.body;
  await(createLink(url, res));
});

app.get("/:id([^+]+)\\+", async (req, res) => {
  await pruneExpired();
  const { id } = req.params;
  const link = await db.collection("links").findOne({ id });
  if (link) {
    renderApp(<LinkInfo {...link} />, res);
  } else {
    renderApp("404 - Link not found", res);
  }
});

app.get("/:id", async (req, res) => {
  const { url } = (await db.collection("links").findOne({ id: req.params.id })) || {};
  if (url) {
    res.redirect(301, url);
  } else {
    renderApp("404 - Link not found", res);
  }
});

app.get("/*", async (req, res) => {
  await createLink(req.path.substring(1), res);
});

MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connected successfully to mongo");
  db = client.db();
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});
