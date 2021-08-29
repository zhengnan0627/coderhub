const Koa = require('koa');
// const userRouter = require('../router/user.router')
// const authRouter = require('../router/auth.router')
const useRoutes = require('../router/index')
const bodyParser = require('koa-bodyparser')
const errorHandler = require('./error-handle')
const app = new Koa();

app.useRoutes = useRoutes

app.use(bodyParser())
app.useRoutes()
app.on('error',errorHandler)

module.exports = app