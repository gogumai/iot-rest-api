var Koa = require('koa');
var compress = require('koa-compress');
var logger = require('koa-logger');

const indexRoutes = require('./src/routes');

const app = new Koa();

// Environment
var env = process.env.NODE_ENV || 'development';

// Port
const PORT = process.env.PORT || 1337;

// Logger
app.use(logger());

// Compress
app.use(compress());


app.use(indexRoutes.routes());

app.listen(PORT);
console.log(`listening on port ${PORT}`);
