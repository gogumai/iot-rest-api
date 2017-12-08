const Koa = require('koa');
const compress = require('koa-compress');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const devicesRoutes = require('./src/routes/devices');
const { routes: readingsRoutes } = require('./src/routes/readings');

const app = new Koa();

// Port
const PORT = process.env.PORT || 1337;

// Body parser
if (process.env.NODE_ENV !== 'test') app.use(bodyParser());

// Logger
app.use(logger());

// Compress
app.use(compress());

app.use(devicesRoutes);
app.use(readingsRoutes);


const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'test') console.log(`listening on port ${PORT}`); // eslint-disable-line no-console
});
module.exports = server;
