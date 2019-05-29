export interface Connection {
  weight: number;
  neighbor: Node;
}

export class Node {
  id: number;
  connections: Connection[] = [];
  deleted: boolean = false;

  constructor(id: number) {
    this.id = id;
  }
}
