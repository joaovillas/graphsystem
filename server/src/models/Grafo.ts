import GrafoInterface from './interfaces/GrafoInterface';
import Node from './Node';
export default class Grafo implements GrafoInterface {
  
  nodes: Node[];

  constructor() {
    this.nodes = new Array<Node>();
  }
  
  getGrafo(): Node[] {
    return this.nodes;
  }

  appendToGrafo(node:Node): string{
    this.nodes.push(node);
    return "appended with success";
  }
}
