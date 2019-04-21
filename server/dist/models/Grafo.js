"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
class Grafo {
    constructor() {
        this.nodes = new Array();
    }
    getGrafo() {
        return this.nodes;
    }
    appendToGrafo(node) {
        const nodeFounded = this.nodes.filter((nodeExistent) => {
            if (nodeExistent.identifier === node.identifier) {
                return nodeExistent;
            }
        });
        if (nodeFounded.length < 1) {
            this.nodes.push(node);
            this.updateConnections();
            return "appended with success";
        }
        else {
            return "This node already exist!";
        }
    }
    updateConnections() {
        this.nodes.forEach(externalNode => {
            const connections = [];
            this.nodes.forEach(internalNode => {
                if (internalNode.connections.includes(externalNode.identifier)) {
                    connections.push(internalNode.identifier);
                }
            });
            connections.concat(externalNode.connections);
            const connectionsAux = [...new Set(connections)];
            externalNode.connections = connectionsAux;
        });
    }
    updateDeletedConnections(identifier) {
        const newGrafo = this.nodes.filter(node => {
            if (node.identifier !== identifier) {
                node.connections = node.connections.filter(conn => {
                    if (conn !== identifier) {
                        return conn;
                    }
                });
                return node;
            }
        });
        return newGrafo;
    }
    findInGrafo(identifier) {
        const filteredNode = this.nodes.filter((node) => {
            if (node.identifier === identifier) {
                return node;
            }
        });
        return filteredNode[0] ? filteredNode[0] : null;
    }
    getDegreeFromNode(identifier) {
        const foundedNode = this.findInGrafo(identifier);
        return foundedNode.connections.length;
    }
    removeFromGrafo(identifier) {
        const newGrafo = this.nodes.filter((node) => {
            if (identifier !== node.identifier) {
                return node;
            }
        });
        return newGrafo;
    }
    setTemplateTest() {
        const nodess = [
            {
                identifier: 1,
                value: "asdasdshadsaj",
                connections: []
            },
            {
                identifier: 2,
                value: "asdasdshadsaj",
                connections: [1]
            },
            {
                identifier: 3,
                value: "asdasdshadsaj",
                connections: [2]
            },
            {
                identifier: 4,
                value: "asdasdshadsaj",
                connections: [2, 3]
            }
        ];
        nodess.forEach(node => {
            this.appendToGrafo(new Node_1.default(node.identifier, node.value, node.connections));
        });
    }
}
exports.default = Grafo;
