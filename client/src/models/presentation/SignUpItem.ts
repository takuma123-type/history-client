export class SignUpItem {
  readonly email: string;
  readonly password: string;
  readonly name: string;

  constructor(params: {
    email: string;
    password: string;
    name: string;
  }) {
    this.email = params.email;
    this.password = params.password;
    this.name = params.name;
  }
}