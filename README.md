# JSON-DB-Server-Client

Serving static client side files to heroku
```javascript
// Heroku mod start
    if (request.url.endsWith("/index.html")) {
        fs.readFile('static/pcrud-interactive.html', null, function (error, data) {
            if (error) {
                response.writeHead(404);
                response.write('Whoops! File not found!');
            } else {
                response.writeHead(200, {
                    "Content-Type": "text/html"});
                response.write(data);
            }
            response.end();
        });
        return;
    } 
    else if (request.url.endsWith("/pcrud-xhr.js")) {
        fs.readFile('static/pcrud-xhr.js', null, function (error, data) {
            if (error) {
                response.writeHead(404);
                response.write('Whoops! File not found!');
            } else {
                response.writeHead(200, {
                    "Content-Type": "text/javascript"});
                response.write(data);
            }
            response.end();
        });
        return;
    }
    // Heroku mod ends
```
