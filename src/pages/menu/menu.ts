import {Component} from '@angular/core';
import {Config, Events, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {FirebaseAuthProvider} from "../../providers/firebase-auth/firebase-auth";

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
      page: 'HelpPage',
      name: 'Help',
      icon: 'help-circle'
    },
    {
      page: 'SettingsPage',
      name: 'Settings',
      icon: 'construct'
    }];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menu: MenuController, public fireAuth: FirebaseAuthProvider,
              public event: Events, public config: Config) {
    // this.config.set('android', 'menuType', 'reveal');
    // this.config.set('windows', 'menuType', 'reveal');
  }

  ionViewDidLoad() {

  }

  close() {
    this.menu.close('menu');
  }

  goToPage(page) {
    this.menu.close('menu');
    this.navCtrl.push(page);
  }

  signOut() {
    this.menu.close('menu');
    this.fireAuth.signedIn = false;
    this.event.publish('signedOut', true);
  }

}
