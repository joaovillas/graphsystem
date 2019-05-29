export class NodeScheme {
	id: number;
	connections: number[];
	weights: number[] | undefined;

	constructor(id: number, connections: number[] = [], weights?: number[]) {
		this.id = id;
		this.connections = connections;
		this.weights = weights;
	}
}