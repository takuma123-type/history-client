import axios from "axios";
import { API } from "../API";
import { RepositoryError } from "./errors";
import { CreateHistory } from "../../models/presentation/CreateHistory";
import { History } from "../../models/presentation/History";

// CookieからauthTokenを取得する関数
const getAuthTokenFromCookie = (): string | null => {
  const match = document.cookie.match(/(^|;\s*)authToken=([^;]*)/);
  return match ? decodeURIComponent(match[2]) : null;
};

interface CreateHistoryResponse {
  id: string;
}

interface FetchHistoriesResponse {
  histories: History[];
}

export class HistoriesRepository {
  async create(historyData: CreateHistory): Promise<CreateHistoryResponse> {
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

  async fetch(): Promise<History[]> {
    const token = getAuthTokenFromCookie();
    if (!token) {
      throw new RepositoryError("Authorization token is missing", null);
    }
  
    try {
      const response = await axios.get<History[]>(
        API.createURL(API.URL.histories()),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("HistoriesRepository fetch response:", response);
  
      // デバッグ: response全体とresponse.dataを確認
      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        console.error("Unexpected response format:", response);
        throw new RepositoryError("Unexpected response format", response);
      }
    } catch (error) {
      console.error("Error in HistoriesRepository fetch:", error);
      throw new RepositoryError("Failed to fetch histories", error);
    }
  }

  async export(historyId: string): Promise<void> {
    const token = getAuthTokenFromCookie();
    if (!token) {
      throw new RepositoryError("Authorization token is missing", null);
    }

    try {
      const response = await axios.get(
        API.createURL(`${API.URL.histories()}/${historyId}/export`),
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          responseType: 'blob', // バイナリデータとしてレスポンスを受け取る
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data as BlobPart]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'history.xlsx'); // ダウンロードするファイル名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error in HistoriesRepository export:", error);
      throw new RepositoryError("Failed to export history", error);
    }
  }
}
