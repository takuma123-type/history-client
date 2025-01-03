import { HistoriesRepository } from "../infrastructure/repository/HistoriesRepository";
import { HistoryItem } from "../models/presentation/HistoryItem";
import { RepositoryError } from "../infrastructure/repository/errors";

export class CreateHistoryOutput {
  readonly id: string;

  constructor(params: { id: string }) {
    this.id = params.id;
  }
}

export class CreateHistoriesUsecase {
  private historiesRepository: HistoriesRepository;

  constructor(historiesRepository: HistoriesRepository) {
    this.historiesRepository = historiesRepository;
  }

  async create(historyItem: HistoryItem): Promise<CreateHistoryOutput> {
    try {
      const response: { id: string } = await this.historiesRepository.create(historyItem);
      return new CreateHistoryOutput({ id: response.id });
    } catch (error) {
      if (error instanceof RepositoryError) {
        console.error("RepositoryError in CreateHistoriesUsecase.create:", error.details);
      } else {
        console.error("Error in CreateHistoriesUsecase.create:", error);
      }
      throw error;
    }
  }
}
