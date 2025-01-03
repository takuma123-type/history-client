export class HistoryItem {
  position: {
    id: string;
    name: string;
  };
  scale: {
    id: string;
    people: string;
  };
  core_stack: {
    id: string;
    name: string;
  };
  infrastructure: {
    id: string;
    name: string;
  };
  period: string;
  company_name: string;
  project_name: string;
  contents: string;
  others: string;

  constructor(params: {
    position: { id: string; name: string };
    scale: { id: string; people: string };
    core_stack: { id: string; name: string };
    infrastructure: { id: string; name: string };
    period: string;
    company_name: string;
    project_name: string;
    contents: string;
    others: string;
  }) {
    this.position = params.position;
    this.scale = params.scale;
    this.core_stack = params.core_stack;
    this.infrastructure = params.infrastructure;
    this.period = params.period;
    this.company_name = params.company_name;
    this.project_name = params.project_name;
    this.contents = params.contents;
    this.others = params.others;
  }
}