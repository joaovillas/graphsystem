import { Node } from "./Node";

export class NodeScheme {
  static parseNodeScheme(nodes: Node[]): NodeScheme[] {
    return nodes.map(
      (n): NodeScheme => {
        return {
          id: n.id,
          connections: n.connections.map(c => c.neighbor.id),
          weights: n.connections.map(c => c.weight)
        };
      }
    );
  }

  id: number;
  connections: number[];
  weights?: number[];

  constructor(id: number, connections: number[] = [], weights?: number[]) {
    this.id = id;
    this.connections = connections;
    this.weights = weights;
  }
}
