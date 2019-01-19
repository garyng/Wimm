import { ModelFilter } from './model-filter';

export class Rating extends ModelFilter {

  constructor(
    public id: number = 0,
    public userId: number = 0,
    public bookId: number = 0,
    public rating: number = 0,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    ) {
    super();
  }

  public static create(rawObj: Rating): Rating {
    return new Rating(
        rawObj.id,
        rawObj.userId,
        rawObj.bookId,
        rawObj.rating,
        rawObj.createdAt,
        rawObj.updatedAt,
    );
  }

}
