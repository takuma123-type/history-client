import {
  InvalidParameterError,
  FailSignUpError,
  UnauthorizedError
} from "../infrastructure/repository/errors";
import { SessionsRepository } from "../infrastructure/repository/SessionsRepository";

export class LogInInput {
  readonly email: string;
  readonly password: string;

  constructor(params: { email: string; password: string }) {
    this.email = params.email;
    this.password = params.password;
  }
}

export class LogInOutput {
  readonly token: string;

  constructor(params: { token: string }) {
    this.token = params.token;
  }
}

export class LogInUsecase {
  readonly input: LogInInput;
  private sessionRepository: SessionsRepository;

  constructor(input: LogInInput, sessionRepository: SessionsRepository) {
    this.input = input;
    this.sessionRepository = sessionRepository;
  }

  async log_in(): Promise<LogInOutput> {
    if (!this.validInput(this.input)) {
      return Promise.reject(new InvalidParameterError());
    }

    try {
      const response = await this.sessionRepository.log_in({
        email: this.input.email,
        password: this.input.password,
      });

      const token = response.token;
      if (!token) {
        throw new FailSignUpError("Token not received");
      }

      return new LogInOutput({ token });
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new FailSignUpError(error.message);
      }
      return Promise.reject(new FailSignUpError());
    }
  }

  private validInput(input: LogInInput): boolean {
    return !!input.email && !!input.password;
  }
}
