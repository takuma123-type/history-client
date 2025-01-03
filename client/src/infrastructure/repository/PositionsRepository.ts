import axios from "axios";
import { API } from "../API";

interface Position {
  id: string;
  name: string;
}

interface FetchResponse {
  results: Position[];
}

export class PositionsRepository {
  async fetch(): Promise<FetchResponse> {
    try {
      const response = await axios.get<Position[]>(API.createURL(API.URL.positions()), {
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
      console.error('Error in PositionsRepository fetch:', error);
      return { results: [] };
    }
  }
}