import { ModelFilter } from './model-filter';

export class Recurrence extends ModelFilter {

  constructor(
    public id: number = 0,
    public userId: number = 0,
    public categoryId: number = 0,
    public amount: number = 0.0,
    public description: string = '',
    public frequency: string = '',
    public nextTimestamp: number = 0,
    public currency: string = '',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    ) {
    super();
  }

  public static create(rawObj: Recurrence): Recurrence {
    return new Recurrence(
        rawObj.id,
        rawObj.userId,
        rawObj.categoryId,
        rawObj.amount,
        rawObj.description,
        rawObj.frequency,
        rawObj.nextTimestamp,
        rawObj.currency,
        rawObj.createdAt,
        rawObj.updatedAt,
    );
  }

}
