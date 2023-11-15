import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-custom-input',
  template: `
  <ion-input
  [type]="inputType || 'text'"
  [placeholder]="placeholder"
  class="custom"
  [maxlength]="inputLength || 20"
  [(ngModel)]="inputValue"
  [pattern]="inputPattern || '\*'"
  (input)="onInputValueChange($event)"
></ion-input>`,
  styleUrls: ['../styles/common.styles.scss'],
})
export class InputComponent {

  @Input() label: string;
  @Input() placeholder: string;
  @Input("type") inputType: string;
  @Input("max") inputLength: any;
  @Input("patteren") inputPattern: any;
  inputValue: any = "";
  @Output('context') sendToParent = new EventEmitter();

  constructor() {}

  onInputValueChange(ev: any) {
    this.sendToParent.emit(ev.target.value);
  }

}
