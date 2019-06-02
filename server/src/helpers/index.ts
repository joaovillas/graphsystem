import { Graph } from "../models/Graph";

export type FormattedMatrix = { [r in number]: { [c in number]: number } };

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
