export interface Connection {
  weight: number;
  neighbor: Node;
}

export class Node {
  id: number;
  private rawConnections: Connection[] = [];
  private isDeleted: boolean = false;

  constructor(id: number) {
    this.id = id;
  }

  get connections(): Connection[] {
    return this.rawConnections.filter(n => !n.neighbor.deleted);
  }

  addConnection(connection: Connection) {
    this.rawConnections.push(connection);
  }

  get deleted(): boolean {
    return this.isDeleted;
  }

  delete() {
    this.isDeleted = true;
  }
}
