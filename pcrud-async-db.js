'use strict';
let http = require('http');
let url = require('url');
let level = require('level');
 
const dbFile = 'counter-db';
const db = level(dbFile);
 
async function isFound(name) {
    try {
        let v = await db.get(name);
        console.log(v);
        return true;
    } catch (err) {
        return false;
    }
}
 
async function createCounter(name, response) {
    await db.put(name, 0);
    response.write("<h1> counter " + name + " created </h1>");
    response.end();
}
 
function errorCounter(name, response) {
    response.write("<h1> error: counter " + name + " not found. </h1>");
    response.end();
}
 
async function readCounter(name, response) {
    let value = await db.get(name);
    response.write("<h1> counter [" + name + "] = " + value + " </h1>");
}
 
async function updateCounter(name, response) {
    let value = 0;
    value = await db.get(name);
    value = parseInt(value) + 1;
    await db.put(name, value);
    response.write("<h1> counter " + name + " updated </h1>");
}
async function deleteCounter(name, response) {
    await db.del(name);
    response.write("<h1> counter " + name + " deleted </h1>");
}
 
const headerText = { "Content-Type": "application/json",
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Headers": "*"
                   };

let server = http.createServer();
server.on('request', async (request, response) => {
    response.writeHead(200, headerText);
    let options = url.parse(request.url, true).query;
    response.write(JSON.stringify(options));
    if (request.url.startsWith("/create")) {
        await createCounter(options.name, response);
        return;
    }
    let found = await isFound(options.name);
    if (!found) {
        errorCounter(options.name, response);
        return;
    }
    if (request.url.startsWith("/read")) {
        await readCounter(options.name, response);
    }
    else if (request.url.startsWith("/update")) {
        await updateCounter(options.name, response);
    }
    else if (request.url.startsWith("/delete")) {
        await deleteCounter(options.name, response);
    }
    else {
        response.write("no command found.");
    }
    response.end();
});
server.listen(8080);
 
