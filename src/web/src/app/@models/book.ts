import { ModelFilter } from './model-filter';

export class Book extends ModelFilter {

  constructor(
    public id: number = 0,
    public userId: number = 0,
    public title: string = '',
    public description: string = '',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    ) {
    super();
  }

  public static create(rawObj: Book): Book {
    return new Book(
        rawObj.id,
        rawObj.userId,
        rawObj.title,
        rawObj.description,
        rawObj.createdAt,
        rawObj.updatedAt,
    );
  }

}
