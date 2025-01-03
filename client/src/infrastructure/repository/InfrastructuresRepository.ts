import axios from "axios";
import { API } from "../API";

interface Infrastructure {
  id: string;
  name: string;
}

interface FetchResponse {
  results: Infrastructure[];
}

export class InfrastructuresRepository {
  async fetch(): Promise<FetchResponse> {
    try {
      const response = await axios.get<Infrastructure[]>(API.createURL(API.URL.infrastructures()), {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      if (response.status === 200) {
        return { results: response.data };
      } else {
        console.warn('Non-200 status code:', response.status);
        return { results: [] };
      }
    } catch (error) {
      console.error('Error in InfrastructuresRepository fetch:', error);
      return { results: [] };
    }
  }
}