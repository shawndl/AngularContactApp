import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstObject'
})
export class FirstObjectPipe implements PipeTransform {

  /**
   * returns the first object of an array or an error message
   * @param value
   * @param key to return
   * @return {any}
   */
  transform(value: any, key: string): string {
    if (value === undefined) {
      return 'No value given';
    }
    if (value.length === 0) {
      return 'No value given';
    }
    return value[0][key];
  }

}
