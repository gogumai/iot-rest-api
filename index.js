const Koa = require('koa');
const compress = require('koa-compress');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

// const indexRoutes = require('./src/routes');
const devicesRoutes = require('./src/routes/devices');
const readingsRoutes = require('./src/routes/readings');

const app = new Koa();

// Port
const PORT = process.env.PORT || 1337;

// Body parser
app.use(bodyParser());

// Logger
app.use(logger());

// Compress
app.use(compress());

app.use(devicesRoutes.routes());
// app.use(readingsRoutes.routes());

app.listen(PORT);
console.log(`listening on port ${PORT}`); // eslint-disable-line no-console
