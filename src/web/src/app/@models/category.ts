import { ModelFilter } from './model-filter';

export class Category extends ModelFilter {

  constructor(
    public id: number = 0,
    public name: string = '',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    ) {
    super();
  }

  public static create(rawObj: Category): Category {
    return new Category(
        rawObj.id,
        rawObj.name,
        rawObj.createdAt,
        rawObj.updatedAt,
    );
  }

}
