import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {
  private intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  transform(value: unknown, ...args: unknown[]): string {
    if (value instanceof Date) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (Math.abs(seconds) < 30) { return 'Just now'; }
      let counter;
      for (const i in this.intervals) {
        if (!this.intervals.hasOwnProperty(i)) { continue; }
        counter = Math.floor(Math.abs(seconds) / this.intervals[i]);
        if (counter === 0) { continue; }
        return counter + ' ' + i + (counter === 1 ? ' ' : 's ') + (seconds > 0 ? 'ago' : 'later');
      }
    }
    return '-';
  }

}
