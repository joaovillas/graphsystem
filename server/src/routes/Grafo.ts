import express = require("express");
import { Request, Response } from "express";
import Grafo from "../models/Grafo";
import Node from "../models/Node";
import NodeInterface from "../models/interfaces/NodeInterface";
import ResponseHelper from "../helpers/ResponseHelper";

const router = express.Router();

let node: Node;
const grafo = new Grafo();
grafo.setTemplateTest();

router.get("/", (req: Request, res: Response) => {
  res.send(grafo);
});

router.post("/node", (req: Request, res: Response) => {
  const nodeRequest: NodeInterface = req.body;
  node = new Node(
    nodeRequest.identifier,
    nodeRequest.value,
    nodeRequest.connections
  );
  res.send(ResponseHelper(grafo.appendToGrafo(node), 200));
});

router.get("/node/:identifier", (req: Request, res: Response) => {
  const identifier: number = req.params.identifier;
  res.send(grafo.findInGrafo(identifier));
});

export default router;
