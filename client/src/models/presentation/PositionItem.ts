export class PositionItem {
  id: string;
  name: string;

  constructor(params: { id: string; name: string }) {
    this.id = params.id;
    this.name = params.name;
  }
}