import { InfrastructuresRepository } from "../infrastructure/repository/InfrastructuresRepository";
import { InfrastructureItem } from "../models/presentation/InfrastructureItem";

export class FetchInfrastructuresOutput {
  readonly infrastructures: InfrastructureItem[];

  constructor(params: { infrastructures: InfrastructureItem[] }) {
    this.infrastructures = params.infrastructures;
  }
}

export class FetchInfrastructuresUsecase {
  private infrastructuresRepository: InfrastructuresRepository;

  constructor(infrastructuresRepository: InfrastructuresRepository) {
    this.infrastructuresRepository = infrastructuresRepository;
  }

  async fetch(): Promise<FetchInfrastructuresOutput> {
    try {
      const response = await this.infrastructuresRepository.fetch();
      if (!response.results || response.results.length === 0) {
        throw new Error('No results found in the response');
      }
      const infrastructures = response.results.map(
        (infrastructure: any) =>
          new InfrastructureItem({
            id: infrastructure.id,
            name: infrastructure.name,
          })
      );
      return new FetchInfrastructuresOutput({
        infrastructures: infrastructures,
      });
    } catch (error) {
      console.error('Error fetching infrastructures:', error);
      throw error;
    }
  }
}