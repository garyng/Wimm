export class Budget {

  constructor(
    public id?: number,
    public userId?: number,
    public user?: number,
    public categoryId?: number,
    public category?: number,
    public limitPerDay?: number,
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
        rawObj.currency,
        rawObj.createdAt,
        rawObj.updatedAt,
    );
  }

}
