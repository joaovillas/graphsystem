import GrafoInterface from "./interfaces/GrafoInterface";
import Node from "./Node";
export default class Grafo implements GrafoInterface {
  nodes: Node[];

  constructor() {
    this.nodes = new Array<Node>();
  }

  getGrafo(): Node[] {
    return this.nodes;
  }

  appendToGrafo(node: Node): string {
    const nodeFounded: Node[] = this.nodes.filter((nodeExistent: Node) => {
      if (nodeExistent.identifier === node.identifier) {
        return nodeExistent;
      }
    });

    if (nodeFounded.length < 1) {
      this.nodes.push(node);
      this.updateConnections();
      return "appended with success";
    } else {
      return "This node already exist!";
    }
  }

  updateConnections(): void {
    this.nodes.forEach(externalNode => {
      const connections: number[] = [];
      this.nodes.forEach(internalNode => {
        if (internalNode.connections.includes(externalNode.identifier)) {
          connections.push(internalNode.identifier);
        }
      });
      connections.concat(externalNode.connections);
      const connectionsAux: any = [...new Set(connections)];
      externalNode.connections = connectionsAux;
    });
  }

  removeFromGrafo(identifier: number): Node[] {
    const newGrafo:Node[] = this.nodes.filter(node => {
      if (node.identifier !== identifier) {
        node.connections = node.connections.filter(conn => {
          if (conn !== identifier) {
            return conn;
          }
        });
        return node;
      }
    });
    return newGrafo;
  }

  findInGrafo(identifier: number): Node {
    const filteredNode: Node[] = this.nodes.filter((node: Node) => {
      if (node.identifier === identifier) {
        return node;
      }
    });
    return filteredNode[0] ? filteredNode[0] : null;
  }

  getDegreeFromNode(identifier: number): number {
    const foundedNode: Node = this.findInGrafo(identifier);
    return foundedNode.connections.length;
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
