export class User {
  constructor(
    public userID: string,
    public username: number,
    public timestamp: string,
    public result: string,
    public authenticationFlag: boolean,
    public sequenceFiles: any,
    public testFiles: any,
    public Host: string
  ) {}
}

