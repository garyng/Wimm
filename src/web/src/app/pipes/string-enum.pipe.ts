import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringEnum'
})
export class StringEnumPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Object.keys(value).map(key => ({
      key,
      value: value[key]
    }));
  }

}
