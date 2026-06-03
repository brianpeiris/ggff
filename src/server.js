import Fastify from 'fastify'
import FastifyStatic from "@fastify/static";
import FastifyFormbody from "@fastify/formbody";

import createAction from "./actions/create.js";
import create from "./views/create.js";
import enter from "./views/enter.js";
import info from "./views/info.js";
import plus from "./views/plus.js";
import redirect from "./views/redirect.js";

const fastify = Fastify({
  logger: true
})

fastify.register(FastifyStatic, {
  root: import.meta.dirname + "/../public",
  wildcard: false,
});

fastify.register(FastifyFormbody)

fastify.get('/enter', async (request, reply) => {
  reply.type("text/html").send(enter());
})

fastify.get('/info', async (request, reply) => {
  reply.type("text/html").send(await info());
})

fastify.post('/api/create', async (request, reply) => {
  await createAction(request, reply);
})

fastify.post('/api/redirect', async (request, reply) => {
  await redirect(request, reply);
})

fastify.get('/', async (request, reply) => {
  reply.type("text/html").send(create());
})

fastify.get('/*', async (request, reply) => {
  const url = request.url.substring(1);
  if (/^https?:\//.test(url) || /[^/]+\.[^/]+/.test(url)) {
    await createAction(request, reply);
  } else if (url.endsWith("+")) {
    await plus(request, reply);
  } else {
    await redirect(request, reply);
  }
});

const start = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
