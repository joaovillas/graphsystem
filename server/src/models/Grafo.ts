import GrafoInterface from "./interfaces/GrafoInterface";
import Node from "./Node";
import * as fs from 'fs';

const file = fs.readFileSync('input/graph.json', 'utf-8');

export default class Grafo implements GrafoInterface {
  nodes: Node[];

  constructor(nodes: Node[] = []) {
    this.nodes = nodes;
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

  getMinMaxAvgDegree(): string {
    if (this.nodes.length === 0) {
      return "Não há nós criados"
    }

    const degree: number[] = []
    this.nodes.forEach((node: Node) => {
      degree.push(this.getDegreeFromNode(node.identifier))
    })

    const max = Math.max(...degree)
    const min = Math.min(...degree)
    const avg = (degree.reduce((total: number, num: number) => total + num)) / degree.length

    return "O grau max é " + max + " o grau medio é " + avg + " o min é " + min
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

  appendConnectionToNode(identifier: number, connection: number): Node[] {
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

  depthFirstSearchRecursive(identifier: number, visited: number[] = []): number[] {
    if (visited.includes(identifier)) {
      return visited
    }

    visited.push(identifier)
    const node = this.findInGrafo(identifier)
    node.connections.forEach(element => {
      visited = this.depthFirstSearchRecursive(element, visited)
    });
    return visited
  }

  isConnected(identifier: number): boolean {
    const nodeViseted = this.depthFirstSearchRecursive(identifier)
    if (nodeViseted.length === this.nodes.length) {
      return true;
    }
    return false;
  }

  isEulerPathPossible(): boolean {
    const count = this.nodes.filter(n => this.getDegreeFromNode(n.identifier) % 2).length
    return !(count === 1 || count > 2);
  }

  getMatrizAdj(): number[][] {
    const matriz: number[][] = [];
    const nodes: Node[] = this.nodes

    this.nodes.forEach((_, i) => {
      const row: number[] = new Array<number>()
      this.nodes.forEach(
        (n, j) => {
          if (nodes[i].connections.includes(nodes[j].identifier)) {
            row.push(1)
          } else {
            row.push(0)
          }
        }
      );
      matriz.push(row)
    })
    return matriz
  }


  loadFromFile() {
    const nodess = JSON.parse(file);
    // console.log(nodess)
    nodess.nodes.forEach((node: any) => {
      this.appendToGrafo(
        new Node(node.identifier, node.value, node.connections)
      );
    });
  }
}
