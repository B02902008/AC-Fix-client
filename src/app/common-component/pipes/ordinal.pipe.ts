import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinal'
})
export class OrdinalPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if (value <= 0) { return ''; }
    if (value === 1) { return '1st'; }
    if (value === 2) { return '2nd'; }
    if (value === 3) { return '3rd'; }
    return value + 'th';
  }

}
