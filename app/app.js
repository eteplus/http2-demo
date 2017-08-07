const fs = require('fs')
const serveStatic = require('koa-static')
const compress = require('koa-compress')
const logger = require('koa-logger')
const Koa = require('koa')
const resolve = require('path').resolve
const staticCache = require('koa-static-cache')

const app = new Koa()
const root = resolve(__dirname, '..')

app.use(logger())

app.use(compress())

// app.use(convert(staticCache(resolve(root, 'public'), {
//   maxAge: 365 * 24 * 60 * 60
// })))

app.use(serveStatic(resolve(root, 'public')))

const defaultPage = fs.readFileSync(resolve(process.cwd(), 'public/index.html'), { encoding: 'UTF-8' })

app.use(async (ctx, next) => {
  // Defer to later middleware
  await next()

  // Response is already handled
  if ((ctx.body && ctx.body !== null) || ctx.status !== 404) {
    return
  }
  ctx.body = defaultPage
})

module.exports = app