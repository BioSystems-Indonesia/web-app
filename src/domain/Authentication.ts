export class Authentication {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public role: string | undefined
  ) {}
}
