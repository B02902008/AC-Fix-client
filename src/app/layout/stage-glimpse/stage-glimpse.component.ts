import { Component, Input } from '@angular/core';

import { statIconColorLambda, statIconClassLambda } from '../../app-interface-and-const';
import { AcFixStageGlimpse, itemAccentClassLambda } from '../layout-interface-and-const';

@Component({
  selector: 'app-stage-glimpse',
  templateUrl: './stage-glimpse.component.html'
})
export class StageGlimpseComponent {

  @Input() glimpse: AcFixStageGlimpse;
  iconColor = statIconColorLambda;
  iconClass = statIconClassLambda;
  itemAccentClass = itemAccentClassLambda;

  constructor() { }

}
