import { ModelFilter } from './model-filter';

export class Currency extends ModelFilter {

  constructor(
    public id: number = 0,
    public code: string = '',
    public name: string = '',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public rateToLocal: number = 1,
    ) {
    super();
  }

  public static create(rawObj: Currency): Currency {
    return new Currency(
        rawObj.id,
        rawObj.code,
        rawObj.name,
        rawObj.createdAt,
        rawObj.updatedAt,
        rawObj.rateToLocal
    );
  }

}
