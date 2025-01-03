import axios from "axios";
import { API } from "../API";

interface CoreStack {
  id: string;
  name: string;
}

interface FetchResponse {
  results: CoreStack[];
}

export class CoreStacksRepository {
  async fetch(): Promise<FetchResponse> {
    try {
      const response = await axios.get<CoreStack[]>(API.createURL(API.URL.core_stacks()), {
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
      console.error('Error in CoreStacksRepository fetch:', error);
      return { results: [] };
    }
  }
}