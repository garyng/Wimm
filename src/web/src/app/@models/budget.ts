import { ModelFilter } from './model-filter';

export class Budget extends ModelFilter {

  constructor(
    public id: number = 0,
    public userId: number = 0,
    public categoryId: number = 0,
    public limitPerDay: number = 0.0,
    public currency: string = '',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    ) {
    super();
  }

  public static create(rawObj: Budget): Budget {
    return new Budget(
        rawObj.id,
        rawObj.userId,
        rawObj.categoryId,
        rawObj.limitPerDay,
        rawObj.currency,
        rawObj.createdAt,
        rawObj.updatedAt,
    );
  }

}
