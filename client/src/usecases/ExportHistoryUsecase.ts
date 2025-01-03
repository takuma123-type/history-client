import { HistoriesRepository } from "../infrastructure/repository/HistoriesRepository";

export class ExportHistoryUsecase {
  private historiesRepository: HistoriesRepository;

  constructor(historiesRepository: HistoriesRepository) {
    this.historiesRepository = historiesRepository;
  }

  async export(historyId: string): Promise<void> {
    try {
      await this.historiesRepository.export(historyId);
    } catch (error) {
      console.error("Error in ExportHistoryUsecase export:", error);
      throw error;
    }
  }
}