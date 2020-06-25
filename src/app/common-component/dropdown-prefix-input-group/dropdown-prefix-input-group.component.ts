import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DropdownPrefixChoice } from './dropdown-prefix-interface';

@Component({
  selector: 'app-dropdown-prefix-input-group',
  templateUrl: './dropdown-prefix-input-group.component.html'
})
export class DropdownPrefixInputGroupComponent implements OnChanges {

  @Input() prefixChoices: DropdownPrefixChoice[] = [];
  @Input() placeholder = '';
  @Input() buttonText = 'Send';
  @Output() inputSent = new EventEmitter<string>();
  currentChoice: DropdownPrefixChoice = {} as DropdownPrefixChoice;
  inputValue: string;

  constructor() { }

  ngOnChanges(): void {
    this.currentChoice = this.prefixChoices.length > 0 ? this.prefixChoices[0] : this.currentChoice;
    this.inputValue = '';
  }

  dropdownChose(prefix: DropdownPrefixChoice): void {
    this.currentChoice = prefix;
  }

  checkInput(): void {
    this.prefixChoices.forEach(choice => {
      if (this.inputValue.startsWith(choice.prefix)) {
        this.currentChoice = choice;
        this.inputValue = this.inputValue.substring(choice.prefix.length);
      }
    });
  }

  sendBtnClick(): void {
    this.inputSent.emit(this.currentChoice.prefix + this.inputValue);
  }

}
