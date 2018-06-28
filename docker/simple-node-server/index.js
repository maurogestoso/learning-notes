const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from the server!");
});

server.listen(8000);

console.log("Server listening on port 8000");