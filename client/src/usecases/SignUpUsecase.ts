import {
  InvalidParameterError,
  FailSignUpError,
  UnauthorizedError
} from "../infrastructure/repository/errors";
import { SessionsRepository } from "../infrastructure/repository/SessionsRepository";

export class SignUpInput {
  readonly email: string;
  readonly password: string;
  readonly name: string;

  constructor(params: { email: string; password: string; name: string }) {
    this.email = params.email;
    this.password = params.password;
    this.name = params.name;
  }
}

export class SignUpOutput {
  readonly token: string;

  constructor(params: { token: string }) {
    this.token = params.token;
  }
}

export class SignUpUsecase {
  readonly input: SignUpInput;
  private sessionRepository: SessionsRepository;

  constructor(
    input: SignUpInput,
    sessionRepository: SessionsRepository
  ) {
    this.input = input;
    this.sessionRepository = sessionRepository;
  }

  async sign_up(): Promise<SignUpOutput> {
    if (!this.validInput(this.input)) {
      return Promise.reject(new InvalidParameterError());
    }

    try {
      const response = await this.sessionRepository.sign_up({
        email: this.input.email,
        password: this.input.password,
        name: this.input.name
      });

      const token = response.token;
      return new SignUpOutput({ token });

    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new FailSignUpError(error.message);
      }
      return Promise.reject(new FailSignUpError());
    }
  }

  private validInput(input: SignUpInput): boolean {
    return !!input.email && !!input.password;
  }
}