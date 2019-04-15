"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Grafo_1 = __importDefault(require("../models/Grafo"));
const Node_1 = __importDefault(require("../models/Node"));
const ResponseHelper_1 = __importDefault(require("../helpers/ResponseHelper"));
const router = express.Router();
let node;
const grafo = new Grafo_1.default();
grafo.setTemplateTest();
router.get("/", (req, res) => {
    res.send(grafo);
});
router.post("/node", (req, res) => {
    const nodeRequest = req.body;
    node = new Node_1.default(nodeRequest.identifier, nodeRequest.value, nodeRequest.connections);
    res.send(ResponseHelper_1.default(grafo.appendToGrafo(node), 200));
});
router.get("/node/:identifier", (req, res) => {
    const identifier = req.params.identifier;
    res.send(grafo.findInGrafo(identifier));
});
exports.default = router;
