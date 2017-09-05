import { Component } from '@angular/core';
import {Config, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the FriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public config: Config) {
    this.config.set('android', 'mode', 'ios');
    this.config.set('windows', 'mode', 'ios');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

}
