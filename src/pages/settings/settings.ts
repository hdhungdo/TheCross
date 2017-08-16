import { Component } from '@angular/core';
import {Events, IonicPage, ViewController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  size = 12;

  constructor(public viewCtrl: ViewController, public events: Events,
              public storage: Storage) {}

  ionViewDidLoad() {
    this.storage.get('fontSize').then((data) => {
      if (data !== null) {
        this.size = data.textSize;
      }
    })
  }

  change(data) {
    this.size = data;
    this.events.publish('textSize', data);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
