import { Component } from '@angular/core';
import {Events, IonicPage, NavParams, ViewController} from 'ionic-angular';

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
  size;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public events: Events) {}

  ionViewDidLoad() {
    this.size = this.navParams.get('fontSize');
  }

  change(data) {
    this.size = data + 'pt';
    this.events.publish('textSize', data);
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
