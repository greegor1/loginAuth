export class User {
    id: number;
    constructor(public login: string,  public password: string) {
        this.id = Math.floor(Math.random()*100)
    }
}

