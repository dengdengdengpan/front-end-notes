const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2]

if (!port) {
  console.log('请指定端口号\n比如node server.js 8888')
  process.exit(1)
}

const server = http.createServer((request, response) => {
  const urlParsed = url.parse(request.url, true)
  const { pathname } = urlParsed

  response.statusCode = 200
  const filePath = pathname === '/' ? 'index.html' : pathname
  const index = filePath.lastIndexOf('.')
  const suffix = filePath.substring(index + 1)
  const fileTypeMap = {
    'html': 'text/html',
    'xml': 'text/xml',
    'css': 'text/css',
    'javascript': 'text/javascript',
    'json': 'application/json',
    'png': 'image/png'
  }
  const fileType = fileTypeMap[suffix] || 'text/plain'
  response.setHeader('Content-Type', `${fileType}`)
  let content
  try {
    content = suffix === 'png' ? fs.readFileSync(`./public/${filePath}`) : fs.readFileSync(`./public/${filePath}`).toString()
  } catch (error) {
    response.statusCode = 404
    content = '请求的资源不存在'
  }
  response.write(content)
  response.end()
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)