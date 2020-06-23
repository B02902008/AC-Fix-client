import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() name: string;
  @Input() canCollapse = false;
  @Input() scrollableX = false;
  isCollapsed = false;

  constructor() { }

}
