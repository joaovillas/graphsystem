"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(identifier, value, connections) {
        this.identifier = identifier;
        this.value = value;
        this.connections = connections;
    }
    getConnections() {
        return;
    }
}
exports.default = Node;
