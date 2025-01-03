export interface CreateHistory {
  position: { id: string; name: string };
  scale: { id: string; people: string };
  core_stack: { id: string; name: string };
  infrastructure: { id: string; name: string };
  period: string;
  company_name: string;
  project_name: string;
  contents: string;
  others: string;
}