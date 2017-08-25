import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {StyleProvider} from "../../../providers/style/style";

/**
 * Generated class for the FixTextPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fix-text',
  templateUrl: 'fix-text.html',
})
export class FixTextPage {
  size = 12;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams,
              public events: Events, public style: StyleProvider) {}

  ionViewDidLoad() {
    this.size = this.navParams.get('fontSize');
  }

  change(data) {
    this.size = data;
    this.events.publish('textSize', data);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  goToSystem() {
    this.navCtrl.push('SettingsPage');
    this.viewCtrl.dismiss();
  }
}
