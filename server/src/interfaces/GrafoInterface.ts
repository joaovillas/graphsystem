import { Node } from "../models/Node";

export enum GraphType {
  undirected = "undirected",
  directed = "directed",
  weighted = "weighted"
};

export type ConnectionInfo = ({
  node: Node,
  weight: number,
} | number);

export type NodeInfo = {
  id: number;
  connections: ConnectionInfo[];
}

export interface GraphInterface {
  type: GraphType;
  nodes: Node[];
  getNodes: () => NodeInfo[];
}
