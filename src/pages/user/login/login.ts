import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuthProvider } from "../../../providers/firebase-auth/firebase-auth";
import { StyleProvider } from "../../../providers/style/style";
import { Usercreds } from "../../../models/usercreds";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = {} as Usercreds;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public fireAuth: FirebaseAuthProvider, public style: StyleProvider) {
  }

  ionViewDidLoad() {

  }

  signedIn() {
    this.fireAuth.login(this.credentials).then((respond: any) => {
      if (!respond.code) {
        this.fireAuth.signedIn = true;
        this.navCtrl.pop();
      } else {
        alert(respond);
      }
    });
  }

  goToRegister() {
    this.navCtrl.push('RegisterPage');
  }

}
