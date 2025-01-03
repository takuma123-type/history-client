import { CoreStacksRepository } from "../infrastructure/repository/CoreStacksRepository";
import { CoreStackItem } from "../models/presentation/CoreStackItem";

export class FetchCoreStacksOutput {
  readonly coreStacks: CoreStackItem[];

  constructor(params: { coreStacks: CoreStackItem[] }) {
    this.coreStacks = params.coreStacks;
  }
}

export class FetchCoreStacksUsecase {
  private coreStacksRepository: CoreStacksRepository;

  constructor(coreStacksRepository: CoreStacksRepository) {
    this.coreStacksRepository = coreStacksRepository;
  }

  async fetch(): Promise<FetchCoreStacksOutput> {
    try {
      const response = await this.coreStacksRepository.fetch();
      if (!response.results || response.results.length === 0) {
        throw new Error('No results found in the response');
      }
      const coreStacks = response.results.map(
        (coreStack: any) =>
          new CoreStackItem({
            id: coreStack.id,
            name: coreStack.name,
          })
      );
      return new FetchCoreStacksOutput({
        coreStacks: coreStacks,
      });
    } catch (error) {
      console.error('Error fetching core stacks:', error);
      throw error;
    }
  }
}