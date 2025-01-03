import { PositionsRepository } from "../infrastructure/repository/PositionsRepository";
import { PositionItem } from "../models/presentation/PositionItem";

export class FetchPositionsOutput {
  readonly positions: PositionItem[];

  constructor(params: { positions: PositionItem[] }) {
    this.positions = params.positions;
  }
}

export class FetchPositionsUsecase {
  private positionsRepository: PositionsRepository;

  constructor(positionsRepository: PositionsRepository) {
    this.positionsRepository = positionsRepository;
  }

  async fetch(): Promise<FetchPositionsOutput> {
    try {
      const response = await this.positionsRepository.fetch();
      if (!response.results || response.results.length === 0) {
        throw new Error('No results found in the response');
      }
      const positions = response.results.map(
        (position: any) =>
          new PositionItem({
            id: position.id,
            name: position.name,
          })
      );
      return new FetchPositionsOutput({
        positions: positions,
      });
    } catch (error) {
      console.error('Error fetching positions:', error);
      throw error;
    }
  }
}