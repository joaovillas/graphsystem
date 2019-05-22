import NodeInterface from "./interfaces/NodeInterface";

export default class Node implements NodeInterface {
  identifier: number;
  connections: number[];

  constructor(identifier: number, connections: number[]) {
    this.identifier = identifier;
    this.connections = connections;
  }

}
