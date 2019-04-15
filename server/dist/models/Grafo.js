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
        this.nodes.push(node);
        return "appended with success";
    }
    findInGrafo(identifier) {
        for (let i in this.nodes) {
            if (this.nodes[i].identifier === identifier) {
                return this.nodes[i];
            }
        }
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
