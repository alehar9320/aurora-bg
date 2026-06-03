import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const port = parseInt(process.env.PORT, 10) || 4000

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.map': 'application/json',
  '.json': 'application/json',
}

http.createServer((req, res) => {
  const urlPath = req.url === '/' ? '/examples/standalone.html' : req.url
  const filePath = path.join(root, urlPath)

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Not found')
      return
    }
    const ext = path.extname(filePath)
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    res.end(data)
  })
}).listen(port, () => {
  console.log(`Aurora BG demo at http://localhost:${port}`)
  console.log(`Canvas dev at http://localhost:${port}/examples/canvas.html`)
})
