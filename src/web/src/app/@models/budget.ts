import { User } from "./user";
import { Category } from "./category";

export class Budget {

  constructor(
    public id?: number,
    public userId?: number,
    public user?: User,
    public categoryId?: number,
    public category?: Category,
    public limitPerDay?: number,
    public localAmount?: number,
    public currency?: string,
    public createdAt?: Date,
    public updatedAt?: Date
    ) {
  }

  public static create(rawObj: Budget): Budget {
    return new Budget(
        rawObj.id,
        rawObj.userId,
        rawObj.user,
        rawObj.categoryId,
        rawObj.category,
        rawObj.limitPerDay,
        rawObj.localAmount,
        rawObj.currency,
        rawObj.createdAt,
        rawObj.updatedAt,
    );
  }

}
