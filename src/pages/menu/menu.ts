import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage{

  rootPage:string = 'TabsPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

  }

  goToAbout() {
    this.navCtrl.push('AboutPage');
  }

  goToCalendar() {
    this.navCtrl.push('CalendarPage');
  }

  goToSetting() {
    this.navCtrl.push('SettingsPage');
  }

  goToHelp() {
    this.navCtrl.push('HelpPage');
  }

}
