import { Category } from "./category";
import { User } from "./user";

export class Recurrence {

  constructor(
    public id?: number,
    public userId?: number,
    public user?: User,
    public categoryId?: number,
    public category?: Category,
    public amount?: number,
    public description?: string,
    public frequency?: string,
    public nextTimestamp?: number,
    public currency?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public localAmount?: number,
  ) {
  }

  public static create(rawObj: Recurrence): Recurrence {
    return new Recurrence(
      rawObj.id,
      rawObj.userId,
      rawObj.user,
      rawObj.categoryId,
      rawObj.category,
      rawObj.amount,
      rawObj.description,
      rawObj.frequency,
      rawObj.nextTimestamp,
      rawObj.currency,
      rawObj.createdAt,
      rawObj.updatedAt,
      rawObj.localAmount
    );
  }

}
