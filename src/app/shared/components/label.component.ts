import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-custom-label',
  template: `
  <ion-label> {{value}} </ion-label>
  `,
  styleUrls: ['../styles/common.styles.scss'],
})
export class LabelComponent {

  @Input() value: string;

  constructor() {}

}
