import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {
  private intervals = {
    GB: 1073741824,
    MB: 1048576,
    KB: 1024,
    B: 1
  };

  transform(value: number, ...args: unknown[]): unknown {
    let counter;
    for (const i in this.intervals) {
      if (!this.intervals.hasOwnProperty(i)) { continue; }
      counter = Math.abs(value) / this.intervals[i];
      if (counter < 0.1) { continue; }
      return counter.toFixed(2) + ' ' + i;
    }
  }

}
