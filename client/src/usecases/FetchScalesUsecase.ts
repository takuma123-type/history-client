import { ScalesRepository } from "../infrastructure/repository/ScalesRepository";
import { ScaleItem } from "../models/presentation/ScaleItem";

export class FetchScalesOutput {
  readonly scales: ScaleItem[];

  constructor(params: { scales: ScaleItem[] }) {
    this.scales = params.scales;
  }
}

export class FetchScalesUsecase {
  private scalesRepository: ScalesRepository;

  constructor(scalesRepository: ScalesRepository) {
    this.scalesRepository = scalesRepository;
  }

  async fetch(): Promise<FetchScalesOutput> {
    try {
      const response = await this.scalesRepository.fetch();
      if (!response.results || response.results.length === 0) {
        throw new Error('No results found in the response');
      }
      const scales = response.results.map(
        (scale: any) =>
          new ScaleItem({
            id: scale.id,
            people: scale.people,
          })
      );
      return new FetchScalesOutput({
        scales: scales,
      });
    } catch (error) {
      console.error('Error fetching scales:', error);
      throw error;
    }
  }
}