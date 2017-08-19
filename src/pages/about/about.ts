import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {StyleProvider} from "../../providers/style/style";

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,
              public style: StyleProvider) {

  }

  ionViewDidLoad() {

  }

}
