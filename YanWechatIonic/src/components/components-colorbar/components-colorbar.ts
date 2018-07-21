import { Component } from '@angular/core';

/**
 * Generated class for the ComponentsColorbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-colorbar',
  templateUrl: 'components-colorbar.html'
})
export class ComponentsColorbarComponent {

  text: string;

  constructor() {
    console.log('Hello ComponentsColorbarComponent Component');
    this.text = 'Hello World';
  }

}
