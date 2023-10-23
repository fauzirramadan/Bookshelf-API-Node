const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = new Hapi.Server({
    host: 'localhost',
    port: 9000,
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
