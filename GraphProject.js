'use strict'
var fs = require('fs');
let file = fs.readFileSync('./graph.json', 'utf-8');

const graph = JSON.parse(file);

function quemDaPraQuem(array) {
    return array.forEach(e =>
        e.connections ?
            console.log(e.alias, ":", e.connections.map(i => graph.vertices.find(v => v.id === i).alias))
        : ""
        );
}

quemDaPraQuem(graph.vertices);
