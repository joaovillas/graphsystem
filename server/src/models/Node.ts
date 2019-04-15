import NodeInterface from "./interfaces/NodeInterface";

export default class Node implements NodeInterface {
  identifier: number;
  value: string;
  connections: number[];

  constructor(identifier: number, value: string, connections: number[]) {
    this.identifier = identifier;
    this.value = value;
    this.connections = connections;
  }

  getConnections(): number[] {
    return;
  }
}
