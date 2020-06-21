import { Component, Input } from '@angular/core';

import { AutofixLoadingData } from '../dashboard-interface-and-const';

@Component({
  selector: 'app-autofix-loading',
  templateUrl: './autofix-loading.component.html'
})
export class AutofixLoadingComponent {

  @Input() dataSet: AutofixLoadingData[];

  constructor() { }

}
