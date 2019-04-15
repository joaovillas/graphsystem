import GrafoInterface from "./interfaces/GrafoInterface";
import Node from "./Node";
export default class Grafo implements GrafoInterface {
  nodes: Node[];
  node: Node;
  constructor() {
    this.nodes = new Array<Node>();
  }

  getGrafo(): Node[] {
    return this.nodes;
  }

  appendToGrafo(node: Node): string {
    this.nodes.push(node);
    return "appended with success";
  }

  findInGrafo(identifier: number): Node {
    for (let i in this.nodes) {
      if (this.nodes[i].identifier === identifier) {
        return this.nodes[i];
      }
    }
  }

  setTemplateTest() {
    const nodess = [
      {
        identifier: 1,
        value: "asdasdshadsaj",
        connections: []
      },
      {
        identifier: 2,
        value: "asdasdshadsaj",
        connections: [1]
      },
      {
        identifier: 3,
        value: "asdasdshadsaj",
        connections: [2]
      },
      {
        identifier: 4,
        value: "asdasdshadsaj",
        connections: [2, 3]
      }
    ];

    nodess.forEach(node => {
      this.appendToGrafo(
        new Node(node.identifier, node.value, node.connections)
      );
    });
  }
}
