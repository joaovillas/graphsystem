import { Graph } from "../models/Graph";
import { Node } from "../models/Node";

export interface FormattedMatrix {
  [r: number]: { [c: number]: number };
}

export function responseHelper(message: string, statusCode: number) {
  return {
    message,
    status_code: statusCode
  };
}

export function formatMatrix(
  graph: Graph,
  matrix: number[][]
): FormattedMatrix {
  const formattedMatrix: FormattedMatrix = {};
  graph.getNodes().forEach((row, i) => {
    formattedMatrix[row.id] = {};
    graph.getNodes().forEach((column, j) => {
      formattedMatrix[row.id][column.id] = matrix[i][j];
    });
  });

  return formattedMatrix;
}

export class PriorityQueue {
  queue: Array<{ data: Node; priority: number }>;
  constructor() {
    this.queue = [];
  }

  enqueue(data: Node, priority: number) {
    this.queue.push({ data, priority });
    this.queue.sort((node1, node2) => node1.priority - node2.priority);
  }

  dequeue() {
    return this.queue.pop();
  }
}
