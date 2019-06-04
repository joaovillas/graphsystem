import express = require("express");
import { Request, Response } from "express";
import { Graph } from "../models/Graph";
import { NodeScheme } from "../models/NodeScheme";
import { responseHelper, formatMatrix } from "../helpers";
import { GraphType } from "../interfaces/GraphInterface";

export const graphRouter = express.Router();

let graph = new Graph();

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

graphRouter.get("/node/:id/remove", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  graph.findNode(id);
  res.send(graph.removeNode(id));
});

graphRouter.get("/node/:id/degree", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send(
    graph.findNode(id)
      ? graph.getNodeDegree(id).toString()
      : responseHelper("id doesn`t exist", 400)
  );
});

graphRouter.get(
  "/node/:id/connection/:target",
  (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const target = Number(req.params.target);

    res.send(graph.testConnections(id, target));
  }
);

graphRouter.get("/node/:id/adjacents", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send(
    graph.findNode(id)
      ? graph.getAdjacents(id)
      : responseHelper("id doesn`t exist", 400)
  );
});

graphRouter.get("/node/:id/connect/:target", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const target = Number(req.params.target);

  res.send(graph.connectNodes(id, target));
});

graphRouter.get(
  "/node/:id/connect/:target/:weight",
  (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const target = Number(req.params.target);
    const weight = Number(req.params.weight);

    res.send(graph.connectNodes(id, target, weight));
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
  const matrix = graph.adjacentMatrix();
  console.table(formatMatrix(graph, matrix));
  res.send(matrix);
});

graphRouter.get("/loadFromFile", (_, res: Response) => {
  res.send(graph.loadFromFile());
});

graphRouter.get("/saveOnFile", (_, res) => {
  res.send(graph.saveOnFile());
});

graphRouter.get("/new", (_, res) => {
  graph = new Graph();
  res.send(`new ${GraphType.undirected} graph initialized`);
});

graphRouter.get("/new/:type", (req, res) => {
  if (GraphType[req.params.type]) {
    graph = new Graph(req.params.type);
    res.send(`new ${req.params.type} graph initialized`);
  } else {
    res.send("invalid graph type");
  }
});

graphRouter.get("/type", (_, res) => {
  res.send(graph.type);
});

graphRouter.get("/warshallMatrix", (_, res) => {
  const matrix = graph.warshallMatrix();
  console.table(formatMatrix(graph, matrix));
  res.send(matrix);
});

graphRouter.get("/floydMatrix", (_, res) => {
  const matrix = graph.floydMatrix();
  console.table(formatMatrix(graph, matrix));
  res.send(matrix);
});

graphRouter.get("/djikstra/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = graph.djikstra(id);
  console.table(result);
  res.send(result);
});

graphRouter.get("/bellmanFord/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = graph.bellmanFord(id);
  console.table(result);
  res.send(result);
});
