import { Component, Input } from '@angular/core';

import { dangerTheme, warningTheme, successTheme } from '../../app-interface-and-const';
import { AutofixLoadingData } from '../dashboard-interface-and-const';

@Component({
  selector: 'app-loading-icon',
  templateUrl: './loading-icon.component.html'
})
export class LoadingIconComponent {

  @Input() UUID: number;
  @Input() data: AutofixLoadingData;

  constructor() { }

  iconFillingColor() {
    const percent = this.data.cur / this.data.max * 100;
    if ( percent >= 80 ) {
      return dangerTheme.code;
    } else if ( percent >= 50 ) {
      return warningTheme.code;
    } else {
      return successTheme.code;
    }
  }



}
