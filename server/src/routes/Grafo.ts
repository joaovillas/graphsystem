import express = require("express");
import { Request, Response } from "express";
import { Graph } from "../models/Graph";
import { NodeScheme } from "../models/NodeScheme";
import { responseHelper } from "../helpers";

const router = express.Router();

let node: Node;



const grafo = new Graph();





router.get("/", (_, res: Response) => {
  res.send(grafo);
});

router.post("/node", (req: Request, res: Response) => {
  const nodeRequest = req.body;
  const node = new NodeScheme(
    nodeRequest.id,
    nodeRequest.connections,
    nodeRequest.weights,
  );
  res.send(responseHelper(grafo.addNode(node), 200));
});

router.get("/node/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send(
    grafo.findNode(id)
      ? grafo.findNode(id)
      : responseHelper("id doesn`t exist", 400)
  );
});

router.get("/node/remove/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  grafo.findNode(id);
  res.send(
    grafo.findNode(id)
      ? (grafo.nodes = grafo.removeNode(id))
      : responseHelper("id doesn`t exist", 400)
  );
});

router.get("/node/degree/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send(
    grafo.findNode(id)
      ? grafo.getDegreeFromNode(id).toString()
      : responseHelper("id doesn`t exist", 400)
  );
});

router.get(
  "/node/connection/:id1&:id2",
  (req: Request, res: Response) => {
    const id1 = Number(req.params.id1);
    const id2 = Number(req.params.id2);

    res.send(grafo.testConnections(id1, id2));
  }
);

router.get("/node/adjacent/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send(
    grafo.findNode(id)
      ? grafo.getAdjacents(id)
      : responseHelper("id doesn`t exist", 400)
  );
});

router.get(
  "/node/connection/connect/:id&:connection",
  (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const connection = Number(req.params.connection);

    res.send(grafo.connectNodes(id, connection));
  }
);

router.get(
  "/node/connection/connect/:id&:connection&:weight",
  (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const connection = Number(req.params.connection);
    const weight = Number(req.params.weight);

    res.send(grafo.connectNodes(id, connection, weight));
  }
);


router.get("/isConnected/", (_, res: Response) => {
  res.send(grafo.isConnected());
});

router.get("/isEulerPath/", (_, res: Response) => {
  res.send(grafo.isEulerPathPossible());
});

router.get("/avarage", (_, res: Response) => {
  res.send(responseHelper(grafo.getMinMaxAvgDegree(), 200));
});

router.get("/adjacentMatrix", (_, res: Response) => {
  console.table(grafo.getMatrizAdj());
  res.send(grafo.getMatrizAdj());
});

router.get("/loadFromFile", (_, res: Response) => {
  grafo.loadFromFile();
  res.send(grafo.nodes);
});

router.get("/saveOnFile", (_, res) => {
  res.send(grafo.saveOnFile());
});


export default router;
