import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StyleProvider } from "../../providers/style/style";
import { DeviceProvider } from "../../providers/device/device";

/**
 * Generated class for the CalendarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  viewTitle:string;
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public style: StyleProvider, private device: DeviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  onTitleChanged(title) {
    this.viewTitle = title;
  }

}
