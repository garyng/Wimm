import { ModelFilter } from './model-filter';

export class User extends ModelFilter {

  constructor(
    public id: number = 0,
    public name: string = '',
    public email: string = '',
    public auth0id: string = '',
    public currency: string = '',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    ) {
    super();
  }

  public static create(rawObj: User): User {
    return new User(
        rawObj.id,
        rawObj.name,
        rawObj.email,
        rawObj.auth0id,
        rawObj.currency,
        rawObj.createdAt,
        rawObj.updatedAt,
    );
  }

}
