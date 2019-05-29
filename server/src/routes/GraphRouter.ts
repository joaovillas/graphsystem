import express = require("express");
import { Request, Response } from "express";
import { Graph } from "../models/Graph";
import { NodeScheme } from "../models/NodeScheme";
import { responseHelper } from "../helpers";

export const graphRouter = express.Router();

const graph = new Graph();

graphRouter.get("/", (_, res: Response) => {
  res.send(graph.getNodes());
});

graphRouter.post("/node", (req: Request, res: Response) => {
  const nodeRequest = req.body;
  const node = new NodeScheme(
    nodeRequest.id !== undefined ? nodeRequest.id : graph.getNodes().length,
    nodeRequest.connections,
    nodeRequest.weights
  );
  res.send(responseHelper(graph.addNode(node), 200));
});

graphRouter.get("/node/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send(graph.getNodeInfo(graph.findNode(id)));
});

graphRouter.get("/node/remove/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  graph.findNode(id);
  res.send(graph.removeNode(id));
});

graphRouter.get("/node/degree/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send(
    graph.findNode(id)
      ? graph.getNodeDegree(id).toString()
      : responseHelper("id doesn`t exist", 400)
  );
});

graphRouter.get("/node/connection/:id1&:id2", (req: Request, res: Response) => {
  const id1 = Number(req.params.id1);
  const id2 = Number(req.params.id2);

  res.send(graph.testConnections(id1, id2));
});

graphRouter.get("/node/adjacent/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send(
    graph.findNode(id)
      ? graph.getAdjacents(id)
      : responseHelper("id doesn`t exist", 400)
  );
});

graphRouter.get(
  "/node/connection/connect/:id&:connection",
  (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const connection = Number(req.params.connection);

    res.send(graph.connectNodes(id, connection));
  }
);

graphRouter.get(
  "/node/connection/connect/:id&:connection&:weight",
  (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const connection = Number(req.params.connection);
    const weight = Number(req.params.weight);

    res.send(graph.connectNodes(id, connection, weight));
  }
);

graphRouter.get("/isConnected", (_, res: Response) => {
  res.send(graph.isConnected());
});

graphRouter.get("/isEulerPath", (_, res: Response) => {
  res.send(graph.isEulerPathPossible());
});

graphRouter.get("/avarage", (_, res: Response) => {
  res.send(responseHelper(graph.getMinMaxAvgDegree(), 200));
});

graphRouter.get("/adjacentMatrix", (_, res: Response) => {
  console.table(graph.getAdjMatriz());
  res.send(graph.getAdjMatriz());
});

graphRouter.get("/loadFromFile", (_, res: Response) => {
  res.send(graph.loadFromFile());
});

graphRouter.get("/saveOnFile", (_, res) => {
  res.send(graph.saveOnFile());
});
