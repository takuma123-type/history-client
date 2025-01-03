export class ScaleItem {
  id: string;
  people: string;

  constructor(params: { id: string; people: string }) {
    this.id = params.id;
    this.people = params.people;
  }
}