import { ModelFilter } from './model-filter';
import { Category } from './category';

export class Record {

  constructor(
    public id?: number,
    public amount?: number,
    public description?: string,
    public currency?: string,
    public categoryId?: number,
    public category?: Category,
    public userId?: number,
    public timestamp?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public rateToLocal?: number,
    ) {
  }

  public static create(rawObj: Record): Record {
    return new Record(
        rawObj.id,
        rawObj.amount,
        rawObj.description,
        rawObj.currency,
        rawObj.categoryId,
        rawObj.category,
        rawObj.userId,
        rawObj.timestamp,
        rawObj.createdAt,
        rawObj.updatedAt,
        0
    );
  }

}
