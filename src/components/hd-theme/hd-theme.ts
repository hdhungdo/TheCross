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

  listColor = [{
    color: 'light',
    classStyle: 'dot-light circle'
  },
    {
      color: 'hdGrey',
      classStyle: 'dot-grey circle'
    },
    {
      color: 'primary',
      classStyle: 'dot-primary circle'
    },
    {
      color: 'hdGreen',
      classStyle: 'dot-green circle'
    },
    {
      color: 'danger',
      classStyle: 'dot-red circle'
    },
    {
      color: 'hdBrown',
      classStyle: 'dot-brown circle'
    },
    {
      color: 'hdSkin',
      classStyle: 'dot-hdSkin circle'
    },
    {
      color: 'hdPurple',
      classStyle: 'dot-hdPurple circle'
    },
    {
      color: 'hdPink',
      classStyle: 'dot-hdPink circle'
    },
    {
      color: 'yellow',
      classStyle: 'dot-yellow circle'
    },
    {
      color: 'hdOrange',
      classStyle: 'dot-hdOrange circle'
    },
    {
      color: 'dark',
      classStyle: 'dot-dark circle'
    },
  ];

  constructor( public style: StyleProvider) {

  }

  changeHeaderBackground(value) {
    this.style.headerBackground = value;
    this.style.saveStyle();
  }

  changeHeaderAndTabsBackground(value) {
    this.style.headerBackground = value;
    this.style.tabsBackground = value;
    this.style.saveStyle();
  }

  changeTabsBackground(value) {
    this.style.tabsBackground = value;
    this.style.saveStyle();
  }



}
