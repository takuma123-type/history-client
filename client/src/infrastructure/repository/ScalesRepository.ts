import axios from "axios";
import { API } from "../API";

interface Scale {
  id: string;
  people: string;
}

interface FetchResponse {
  results: Scale[];
}

export class ScalesRepository {
  async fetch(): Promise<FetchResponse> {
    try {
      const response = await axios.get<Scale[]>(API.createURL(API.URL.scales()), {
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
      console.error('Error in ScalesRepository fetch:', error);
      return { results: [] };
    }
  }
}