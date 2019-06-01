import { Node } from "../models/Node";

export enum GraphType {
  undirected = "undirected",
  directed = "directed",
  weighted = "weighted"
}

export type ConnectionInfo =
  | {
      node: number;
      weight: number;
    }
  | number;

export interface NodeInfo {
  id: number;
  connections: ConnectionInfo[];
}

export interface GraphInterface {
  type: GraphType;
  getNodes: () => NodeInfo[];
}
