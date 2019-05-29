import * as fs from 'fs';
import { GraphType, GraphInterface, NodeInfo, ConnectionInfo } from "../interfaces/GrafoInterface";
import { Node } from "./Node";
import { NodeScheme } from "./NodeScheme";

export class Graph implements GraphInterface {
  type: GraphType;
  nodes: Node[];

  constructor(type = GraphType.undirected, nodes: Node[] = []) {
    this.type = type;
    this.nodes = nodes;
  }

  getNodes(): NodeInfo[] {
    return this.nodes
      .filter(n => !n.deleted)
      .map(n => this.cleanNode(n));
  }

  cleanNode({ id, connections }: Node): NodeInfo {
    return ({
      id,
      connections: connections.map(n => {
        return this.type !== GraphType.weighted ?
          n.neighbor.id : {
            node: n.neighbor,
            weight: n.weight,
          };
      })
    });
  }

  addNode(nodeScheme: NodeScheme): string {
    const nodeFounded = this.nodes.some((n) => n.id === nodeScheme.id);

    if (nodeFounded) return "Erro: Já existe um nó com esse identificador";

    const node = new Node(nodeScheme.id);

    this.nodes.push(node);
    nodeScheme.connections.forEach(
      (toConnect, i) => this.connectNodes(node.id, toConnect, nodeScheme.weights[i])
    );


    return "Nó adicionado com sucesso";
  }

  connectNodes(nodeId: number, toConnectId: number, weight: number = 1): NodeInfo[] | string {
    const node = this.nodes.find(n => n.id === nodeId);
    const newNeighbor = this.nodes.find(n => n.id === toConnectId);

    if (!node) return "Erro: Nó inicial não encontrado"
    if (!newNeighbor) return "Erro: Nó alvo não encontrado"

    node.connections.push({ weight, neighbor: newNeighbor });
    if (this.type !== GraphType.directed) newNeighbor.connections.push({ weight, neighbor: node });

    return this.getNodes();
  }

  removeNode(id: number): NodeInfo[] | string {
    const toDelete = this.nodes.find(n => n.id === id);
    if (!toDelete) return "Erro: Nó não encontrado";

    toDelete.deleted = true;

    return this.getNodes();
  }

  findNode(id: number): NodeInfo | undefined {
    const node = this.nodes.find(n => n.id === id);
    return node ? this.cleanNode(node) : undefined;
  }

  getDegreeFromNode(id: number): number | undefined {
    const node = this.nodes.find(n => n.id === id);
    return node ? node.connections.length : undefined;
  }

  getMinMaxAvgDegree(): string {
    if (this.nodes.length === 0) {
      return "Não há nós criados"
    }

    const degrees: number[] = this.nodes.map(n => n.connections.length);

    const max = Math.max(...degrees)
    const min = Math.min(...degrees)
    const avg = (degrees.reduce((total: number, num: number) => total + num)) / degrees.length

    return "O grau max é " + max + " o grau medio é " + avg + " o min é " + min
  }

  testConnections(id1: number, id2: number): boolean {
    const grafo1 = this.findNode(id1);
    const grafo2 = this.findNode(id2);

    if (
      grafo1.connections.includes(grafo2.id) &&
      grafo2.connections.includes(grafo1.id)
    ) {
      return true;
    }

    return false;
  }

  getAdjacents(id: number): ConnectionInfo[] | string {
    const result: NodeInfo = this.findNode(id);
    return typeof result === "string" ? result : result.connections;
  }

  depthFirstSearchRecursive(id: number, visited: number[] = []): number[] {
    if (visited.includes(id)) {
      return visited
    }

    visited.push(id)
    const node = this.nodes.find(n => n.id === id);
    node.connections.forEach(element => {
      visited = this.depthFirstSearchRecursive(element.neighbor.id, visited)
    });
    return visited
  }

  isConnected(): boolean {
    if (!this.nodes.length) {
      return false;
    }

    const nodeViseted = this.depthFirstSearchRecursive(this.nodes[0].id);
    if (nodeViseted.length === this.nodes.length) {
      return true;
    }
    return false;
  }

  isEulerPathPossible(): boolean {
    const count = this.nodes.filter(n => this.getDegreeFromNode(n.id) % 2).length
    return count !== 2;
  }

  getMatrizAdj(): number[][] {
    const matriz: number[][] = [];
    const nodes: Node[] = this.nodes

    this.nodes.forEach((_, i) => {
      const row: number[] = new Array<number>()
      this.nodes.forEach(
        (__, j) => {
          if (nodes[i].connections.map(c => c).includes(nodes[j].id)) {
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
    const graph = JSON.parse(fs.readFileSync('input/graph.json', 'utf-8'));
    this.type = graph.type;
    this.nodes = graph.nodes;
  }

  saveOnFile() {
    try {
      fs.writeFileSync(
        'input/graph.json',
        JSON.stringify(this, null, 2),
        'utf-8'
      );

      return "Salvo com sucesso!"
    } catch {
      return "Erro ao salvar"
    }
  }
}
