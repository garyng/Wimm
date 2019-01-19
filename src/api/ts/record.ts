import { ModelFilter } from './model-filter';

export class Record extends ModelFilter {

  constructor(
    public id: number = 0,
    public amount: number = 0.0,
    public description: string = '',
    public categoryId: number = 0,
    public userId: number = 0,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    ) {
    super();
  }

  public static create(rawObj: Record): Record {
    return new Record(
        rawObj.id,
        rawObj.amount,
        rawObj.description,
        rawObj.categoryId,
        rawObj.userId,
        rawObj.createdAt,
        rawObj.updatedAt,
    );
  }

}
