import { Component } from '@angular/core';
import {StyleProvider} from "../../providers/style/style";

/**
 * Generated class for the HdThemeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'hd-theme',
  templateUrl: 'hd-theme.html'
})
export class HdThemeComponent {

  constructor( public style: StyleProvider) {

  }

  changeHeaderBackground(value) {
    this.style.headerBackground = value;
    this.style.tabsBackground = value;
    this.style.saveStyle();
  }

}
