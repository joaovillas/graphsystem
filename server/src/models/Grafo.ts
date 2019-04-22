import GrafoInterface from "./interfaces/GrafoInterface";
import Node from "./Node";
import exampleJson from "../input/example";

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
    const newGrafo: Node[] = this.nodes.filter(node => {
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

  testConnections(identifier1: number, identifier2: number): boolean {
    const grafo1: Node = this.findInGrafo(identifier1);
    const grafo2: Node = this.findInGrafo(identifier2);

    if (
      grafo1.connections.includes(grafo2.identifier) &&
      grafo2.connections.includes(grafo1.identifier)
    ) {
      return true;
    }

    return false;
  }

  getAdjacentes(identifier: number): number[] {
    const grafo: Node = this.findInGrafo(identifier);
    return grafo.connections;
  }

  appendConnectionToNode(identifier: number, connection: number):Node[] {
    const grafo: Node = this.findInGrafo(identifier);
    const grafoConection: Node = this.findInGrafo(connection);

    if (grafoConection !== null && grafo !== null) {
      if (
        !grafo.connections.includes(grafoConection.identifier) &&
        !grafoConection.connections.includes(grafo.identifier)
      ) {
        grafo.connections.push(grafoConection.identifier);
        grafoConection.connections.push(grafo.identifier);
      }
    }

    return this.getGrafo();
  }

  loadFromFile() {
    const nodess = exampleJson;

    nodess.forEach(node => {
      this.appendToGrafo(
        new Node(node.identifier, node.value, node.connections)
      );
    });
  }
}
