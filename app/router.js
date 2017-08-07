const app = require('./app')
const router = require('koa-router')()
const resolve = require('path').resolve
const fs = require('fs')
const zlib = require('zlib')

const root = resolve(__dirname, '..')
const gzip = zlib.createGzip()

router.get('/push', (ctx, next) => {
  const zepto = fs.readFileSync(resolve(root, 'public/js/zepto.js'), { encoding: 'UTF-8' })
  const underscore = fs.readFileSync(resolve(root, 'public/js/underscore.js'), { encoding: 'UTF-8' })
  const backbone = fs.readFileSync(resolve(root, 'public/js/backbone.js'), { encoding: 'UTF-8' })
  const html = fs.readFileSync(resolve(root, 'public/push.html'), { encoding: 'UTF-8' })

  const options = {
    request: {
      accept: '*/*',
    }, response: {
      'content-type': 'application/javascript',
      'content-encoding': 'gzip',
      'vary': 'Accept-Encoding'
    }
  }
  ctx.res.push('/zepto.js', options, function(err, stream) {
    if (err) return;
    zlib.gzip(zepto, function (err, buf) {
      stream.end(buf)
    })
  })
  ctx.res.push('/underscore.js', options, function(err, stream) {
    if (err) return;
    zlib.gzip(underscore, function (err, buf) {
      stream.end(buf)
    })
  })
  ctx.res.push('/backbone.js', options, function(err, stream) {
    if (err) return;
    zlib.gzip(underscore, function (err, buf) {
      stream.end(buf)
    })
  })
  ctx.body = html
})

module.exports = router
