import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';

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
  pages = [{
      page: 'CalendarPage',
      name: 'Calendar',
      icon: 'clock'
    },
    {
      page: 'AboutPage',
      name: 'About',
      icon: 'information-circle'
    },
    {
      page: 'SettingsPage',
      name: 'Settings',
      icon: 'cog'
    },
    {
      page: 'HelpPage',
      name: 'Help',
      icon: 'help-circle'
    }];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {

  }

  ionViewDidLoad() {

  }

  goToAbout() {
    this.menu.close('menu');
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

  goToPage(page) {
    this.menu.close('menu');
    this.navCtrl.push(page);
  }

}
