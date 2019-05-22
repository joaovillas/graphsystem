import Node from "../Node";

export type GraphType = "undirected" | "directed" | "weighted";

export interface GrafoInterface {
  type: GraphType;
  nodes: Node[];
}
