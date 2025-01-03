import axios from "axios";
import { API } from "../API";
import { RepositoryError } from "./errors";

// CookieからauthTokenを取得する関数
const getAuthTokenFromCookie = (): string | null => {
  const match = document.cookie.match(/(^|;\s*)authToken=([^;]*)/);
  return match ? decodeURIComponent(match[2]) : null;
};

interface History {
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

interface CreateHistoryResponse {
  id: string;
}

export class HistoriesRepository {
  async create(historyData: History): Promise<CreateHistoryResponse> {
    const token = getAuthTokenFromCookie();
    if (!token) {
      throw new RepositoryError("Authorization token is missing", null);
    }

    try {
      const response = await axios.post<CreateHistoryResponse>(
        API.createURL(API.URL.histories()),
        historyData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        return response.data;
      } else {
        throw new RepositoryError("Failed to create history", response.data);
      }
    } catch (error) {
      console.error("Error in HistoriesRepository create:", error);
      throw new RepositoryError("Failed to create history", error);
    }
  }
}
