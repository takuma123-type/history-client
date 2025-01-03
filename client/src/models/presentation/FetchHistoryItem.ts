export class FetchHistoryItem {
  id: string;
  company_name: string;
  created_at: string;
  updated_at: string;

  constructor(params: { id: string; company_name: string; created_at?: string; updated_at?: string }) {
    this.id = params.id;
    this.company_name = params.company_name;
    this.created_at = params.created_at || "N/A";
    this.updated_at = params.updated_at || "N/A";
  }
}
