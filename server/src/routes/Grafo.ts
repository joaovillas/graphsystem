import express = require("express");
import { Request, Response } from "express";
import Grafo from "../models/Grafo";
import Node from "../models/Node";
import NodeInterface from "../models/interfaces/NodeInterface";
import ResponseHelper from "../helpers/ResponseHelper";

const router = express.Router();

let node: Node;



const grafo = new Grafo();





router.get("/", (_, res: Response) => {
  res.send(grafo);
});

router.post("/node", (req: Request, res: Response) => {
  const nodeRequest: NodeInterface = req.body;
  node = new Node(
    nodeRequest.identifier,
    nodeRequest.connections
  );
  res.send(ResponseHelper(grafo.appendToGrafo(node), 200));
});

router.get("/node/:identifier", (req: Request, res: Response) => {
  const identifier = Number(req.params.identifier);
  res.send(
    grafo.findInGrafo(identifier)
      ? grafo.findInGrafo(identifier)
      : ResponseHelper("Identifier doesn`t exist", 400)
  );
});

router.get("/node/remove/:identifier", (req: Request, res: Response) => {
  const identifier = Number(req.params.identifier);
  grafo.findInGrafo(identifier);
  res.send(
    grafo.findInGrafo(identifier)
      ? (grafo.nodes = grafo.removeFromGrafo(identifier))
      : ResponseHelper("Identifier doesn`t exist", 400)
  );
});

router.get("/node/degree/:identifier", (req: Request, res: Response) => {
  const identifier = Number(req.params.identifier);
  res.send(
    grafo.findInGrafo(identifier)
      ? grafo.getDegreeFromNode(identifier).toString()
      : ResponseHelper("Identifier doesn`t exist", 400)
  );
});

router.get(
  "/node/connection/:identifier1&:identifier2",
  (req: Request, res: Response) => {
    const identifier1 = Number(req.params.identifier1);
    const identifier2 = Number(req.params.identifier2);

    res.send(grafo.testConnections(identifier1, identifier2));
  }
);

router.get("/node/adjacent/:identifier", (req: Request, res: Response) => {
  const identifier = Number(req.params.identifier);
  res.send(
    grafo.findInGrafo(identifier)
      ? grafo.getAdjacents(identifier)
      : ResponseHelper("Identifier doesn`t exist", 400)
  );
});

router.get(
  "/node/connection/insert/:identifier&:connection",
  (req: Request, res: Response) => {
    const identifier = Number(req.params.identifier);
    const connection = Number(req.params.connection);

    res.send(grafo.appendConnectionToNode(identifier, connection));
  }
);

router.get("/isConnected/", (_, res: Response) => {
  res.send(grafo.isConnected());
});

router.get("/isEulerPath/", (_, res: Response) => {
  res.send(grafo.isEulerPathPossible());
});

router.get("/avarage", (_, res: Response) => {
  res.send(ResponseHelper(grafo.getMinMaxAvgDegree(), 200));
});

router.get("/adjacentMatrix", (_, res: Response) => {
  console.table(grafo.getMatrizAdj());
  res.send(grafo.getMatrizAdj());
});

router.get("/loadFromFile", (_, res: Response) => {
  grafo.loadFromFile();
  res.send(grafo.getGrafo());
});

router.get("/saveOnFile", (_, res) => {
  res.send(grafo.saveOnFile());
});


export default router;
