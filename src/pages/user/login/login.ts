import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import { FirebaseAuthProvider } from "../../../providers/firebase-auth/firebase-auth";
import { StyleProvider } from "../../../providers/style/style";
import { Usercreds } from "../../../models/usercreds";
import { DeviceProvider } from "../../../providers/device/device";

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

  constructor(public navCtrl: NavController, public device: DeviceProvider,
              public fireAuth: FirebaseAuthProvider, public style: StyleProvider,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  signIn() {
    this.fireAuth.login(this.credentials).then((respond: any) => {
      if (respond.success) {
        this.showToast('middle', 'Login Successfully!')
        this.fireAuth.signedIn = true;
        this.navCtrl.pop();
      } else {
        alert(respond);
      }
    }).catch(err => {
      this.showToast('middle', err.message.replace('signInWithEmailAndPassword failed: ', ''));
    });
  }

  goToRegister() {
    this.navCtrl.push('RegisterPage');
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position,
      cssClass: 'toastStyle'
    });

    toast.present(toast);
  }

}
