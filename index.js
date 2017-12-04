const Koa = require('koa');
const compress = require('koa-compress');
const logger = require('koa-logger');

const indexRoutes = require('./src/routes');

const app = new Koa();

// Port
const PORT = process.env.PORT || 1337;

// Logger
app.use(logger());

// Compress
app.use(compress());


app.use(indexRoutes.routes());

app.listen(PORT);
console.log(`listening on port ${PORT}`);
