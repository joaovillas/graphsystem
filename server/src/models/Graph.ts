import * as fs from "fs";
import {
  GraphType,
  GraphInterface,
  NodeInfo,
  ConnectionInfo
} from "../interfaces/GraphInterface";
import {PriorityQueue} from "../helpers"
import { Node } from "./Node";
import { NodeScheme } from "./NodeScheme";

interface GraphFile {
  type: GraphType;
  nodes: NodeScheme[];
}

export class Graph implements GraphInterface {
  type: GraphType;
  private rawNodes: Node[];

  constructor(type = GraphType.undirected, nodes: Node[] = []) {
    this.type = type;
    this.rawNodes = nodes;
    console.log(`new ${this.type} graph initialized`);
  }

  private get nodes(): Node[] {
    return this.rawNodes.filter(n => !n.deleted);
  }

  getNodes(): NodeInfo[] {
    return this.nodes.map(n => this.getNodeInfo(n));
  }

  getNodeInfo(node: Node): NodeInfo {
    return (
      node && {
        id: node.id,
        connections: node.connections.map(n => {
          return this.type !== GraphType.weighted
            ? n.neighbor.id
            : {
                node: n.neighbor.id,
                weight: n.weight
              };
        })
      }
    );
  }

  findNode(id: number): Node | undefined {
    return this.nodes.find(n => n.id === id);
  }

  addNode(nodeScheme: NodeScheme): string {
    if (nodeScheme.weights && this.type !== GraphType.weighted) {
      return "Erro: Grafo não suporta peso";
    }

    const nodeFounded = this.findNode(nodeScheme.id);
    if (nodeFounded) return "Erro: Nó já existente";

    const node = new Node(nodeScheme.id);
    this.rawNodes.push(node);

    nodeScheme.connections.forEach((toConnect, i) =>
      this.connectNodes(
        node.id,
        toConnect,
        this.type === GraphType.weighted ? nodeScheme.weights[i] : 1
      )
    );

    return "Nó adicionado com sucesso";
  }

  connectNodes(
    nodeId: number,
    toConnectId: number,
    weight: number = 1
  ): NodeInfo[] | string {
    if (this.type !== GraphType.weighted && weight !== 1) {
      return "Erro: Grafo não suporta peso";
    }

    const node = this.findNode(nodeId);
    if (!node) return "Erro: Nó inicial não encontrado";

    if (!node.connections.some(n => n.neighbor.id === toConnectId)) {
      const newNeighbor = this.findNode(toConnectId);
      if (!newNeighbor) return "Erro: Nó alvo não encontrado";

      node.addConnection({ weight, neighbor: newNeighbor });
      if (this.type !== GraphType.directed) {
        newNeighbor.addConnection({ weight, neighbor: node });
      }
    }

    return this.getNodes();
  }

  removeNode(id: number): NodeInfo[] | string {
    const toDelete = this.findNode(id);
    if (!toDelete) return "Erro: Nó não encontrado";

    toDelete.delete();

    return this.getNodes();
  }

  nodeDegree(node: Node): number {
    return node.connections.length;
  }

  getNodeDegree(id: number): number | undefined {
    const node = this.findNode(id);
    return node && this.nodeDegree(node);
  }

  getMinMaxAvgDegree(): string {
    if (this.nodes.length === 0) {
      return "Não há nós criados";
    }

    const degrees: number[] = this.nodes.map(this.nodeDegree);

    const max = Math.max(...degrees);
    const min = Math.min(...degrees);
    const avg =
      degrees.reduce((total: number, num: number) => total + num) /
      degrees.length;

    return "O grau max é " + max + " o grau medio é " + avg + " o min é " + min;
  }

  testConnections(nodeId: number, targetId: number): boolean | string {
    const node = this.findNode(nodeId);
    if (!node) return "Erro: Nó inicial não encontrado";
    const target = this.findNode(targetId);
    if (!target) return "Erro: Nó alvo não encontrado";

    return (
      node.connections.some(n => n.neighbor === target) &&
      target.connections.some(t => t.neighbor === node)
    );
  }

  getAdjacents(id: number): ConnectionInfo[] | string {
    const result = this.getNodeInfo(this.findNode(id));
    return typeof result === "string" ? result : result.connections;
  }

  depthFirstSearchRecursive(node: Node, visited: number[] = []): number[] {
    if (visited.includes(node.id)) return visited;
    visited.push(node.id);

    node.connections.forEach(n => {
      visited = this.depthFirstSearchRecursive(n.neighbor, visited);
    });

    return visited;
  }

  isConnected(): boolean {
    if (!this.nodes.length) return false;

    const visitedNodes = this.depthFirstSearchRecursive(this.nodes[0]);
    return visitedNodes.length === this.nodes.length;
  }

  isEulerPathPossible(): boolean {
    const count = this.nodes.filter(n => this.getNodeDegree(n.id) % 2).length;
    return count !== 2;
  }

  adjacentMatrix(): number[][] {
    const matrix: number[][] = [];

    this.nodes.forEach(nodeX => {
      const row: number[] = [];

      this.nodes.forEach(nodeY => {
        const connection = nodeX.connections.find(
          n => n.neighbor.id === nodeY.id
        );
        row.push(connection ? connection.weight : 0);
      });

      matrix.push(row);
    });

    return matrix;
  }

  loadFromFile(): NodeInfo[] {
    const graph: GraphFile = JSON.parse(
      fs.readFileSync("input/graph.json", "utf-8")
    );

    this.rawNodes = [];
    this.type = graph.type;
    graph.nodes.forEach(({ id }) => this.addNode(new NodeScheme(id)));
    graph.nodes.forEach(n => {
      n.connections.forEach((c, i) => this.connectNodes(n.id, c, n.weights[i]));
    });
    return this.getNodes();
  }

  saveOnFile(): string {
    const file: GraphFile = {
      type: this.type,
      nodes: NodeScheme.parseNodeScheme(this.nodes)
    };

    try {
      fs.writeFileSync(
        "input/graph.json",
        JSON.stringify(file, null, 2),
        "utf-8"
      );

      return "Salvo com sucesso!";
    } catch {
      return "Erro ao salvar";
    }
  }

  warshallMatrix(): number[][] {
    const matrix = this.adjacentMatrix();

    matrix.forEach((_, k) => {
      matrix.forEach((row, i) => {
        if (row[k]) {
          matrix[i] = row.map((cell, j) => (cell || matrix[k][j] ? 1 : 0));
        }
      });
    });

    return matrix;
  }

  floydMatrix(): number[][] {
    const matrix = this.adjacentMatrix();

    matrix.forEach((row, i) => {
      matrix[i] = row.map((cell, j) => (i === j ? 0 : cell || Infinity));
    });

    matrix.forEach((_, k) => {
      matrix.forEach((row, i) => {
        matrix[i] = row.map((cell, j) =>
          cell > row[k] + matrix[k][j] ? row[k] + matrix[k][j] : cell
        );
      });
    });

    return matrix;
  }

  djikstra(nodeId: number){
    const startNode: Node = this.findNode(nodeId)

    const distances = new Map<Node,number>();
    const prev = new Map<Node,Node>();
    distances.set(startNode,null)
    const pq = new PriorityQueue();
    pq.enqueue(startNode, 0);
    this.rawNodes.forEach(node => {
      if (node.id !== startNode.id) distances.set(node,Infinity);
      prev.set(node,null);
   });
   const teste: number[] = [];
    while (pq.queue.length !== 0) {
      const minNode = pq.dequeue();
      const currNode:Node = minNode.data;
      currNode.connections.forEach(connection => {
        const alt = distances.get(currNode) + connection.weight;
        if (alt < distances.get(connection.neighbor)) {
           distances.set(connection.neighbor,alt)
           prev.set(connection.neighbor, currNode);
           pq.enqueue(connection.neighbor, distances.get(connection.neighbor));
        }
     });
    }
    this.registrarElementosDoMapa(nodeId, distances)
  }

  registrarElementosDoMapa(startNode:number, distances:Map<Node,number>){
    distances.forEach((valor:Number,chave:Node) => {
        if(startNode !== chave.id) console.log(`${startNode} => ${chave.id} = $ ${valor}`)
    })
    
  }
}
