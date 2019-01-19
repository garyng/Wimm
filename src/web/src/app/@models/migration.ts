import { ModelFilter } from './model-filter';

export class Migration extends ModelFilter {

  constructor(
    public id: number = 0,
    public migration: string = '',
    public batch: number = 0,
    ) {
    super();
  }

  public static create(rawObj: Migration): Migration {
    return new Migration(
        rawObj.id,
        rawObj.migration,
        rawObj.batch,
    );
  }

}
