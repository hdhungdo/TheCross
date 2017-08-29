import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { StyleProvider } from "../../providers/style/style";

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public style: StyleProvider) {

  }

  ionViewDidLoad() {

  }

}
