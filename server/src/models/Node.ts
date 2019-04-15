import NodeInterface from "./interfaces/NodeInterface";

export default class Node implements NodeInterface{
  indentifier: number;
  value: any;
  connections: number[]; 

  constructor(identifier:number, value:any, connections: number[]) {
    this.indentifier = identifier;
    this.value = value;
    this.connections = connections;
  }

  getConnections(): number[] {
      return;
  }
}
