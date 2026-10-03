/* Локальный сервер для проверки сайта без установки чего-либо.
   Запуск:  node server.js   →  откройте http://localhost:5173
   Он умеет то же, что Vercel: адреса вида /design/logopotam открывают страницу DESIGN. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 5173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
};

function send(res, file, status = 200) {
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('404'); }
    res.writeHead(status, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url.includes('..')) { res.writeHead(400); return res.end(); }
  // /design/<slug> и /art/<slug> → страница раздела (как rewrites в vercel.json)
  const m = url.match(/^\/(design|art)\/[^/.]+\/?$/);
  if (m) return send(res, path.join(ROOT, m[1], 'index.html'));
  if (url === '/design' || url === '/art') { res.writeHead(301, { Location: url + '/' }); return res.end(); }
  let file = path.join(ROOT, url);
  if (url.endsWith('/')) file = path.join(file, 'index.html');
  fs.stat(file, (err, st) => {
    if (!err && st.isFile()) return send(res, file);
    send(res, path.join(ROOT, '404.html'), 404);
  });
}).listen(PORT, () => console.log(`KARMASH: http://localhost:${PORT}`));
