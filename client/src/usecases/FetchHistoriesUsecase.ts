import { HistoriesRepository } from "../infrastructure/repository/HistoriesRepository";
import { FetchHistoryItem } from "../models/presentation/FetchHistoryItem";

interface FetchHistoriesOutput {
  histories: FetchHistoryItem[];
}

export class FetchHistoriesUsecase {
  private historiesRepository: HistoriesRepository;

  constructor(historiesRepository: HistoriesRepository) {
    this.historiesRepository = historiesRepository;
  }

  async fetch(): Promise<FetchHistoriesOutput> {
    try {
      const response = await this.historiesRepository.fetch();
      console.log("FetchHistoriesUsecase fetch response:", response);

      if (!response || !Array.isArray(response)) {
        throw new Error("Invalid response: Expected an array.");
      }

      const fetchHistoryItems = response.map(
        (history) =>
          new FetchHistoryItem({
            id: history.id,
            company_name: history.company_name,
            created_at: history.created_at,
            updated_at: history.updated_at,
          })
      );

      console.log("FetchHistoriesUsecase fetchHistoryItems:", fetchHistoryItems);

      return { histories: fetchHistoryItems };
    } catch (error) {
      console.error("Error in FetchHistoriesUsecase fetch:", error);
      throw error;
    }
  }
}
