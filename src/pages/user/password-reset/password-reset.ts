import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { StyleProvider } from "../../../providers/style/style";
import { DeviceProvider } from "../../../providers/device/device";
import { FirebaseAuthProvider } from "../../../providers/firebase-auth/firebase-auth";

/**
 * Generated class for the PasswordResetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {
  email:string;

  constructor(public navCtrl: NavController, public style: StyleProvider,
              public device: DeviceProvider, public fireAuth: FirebaseAuthProvider,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

  }

  resetPassword() {
    this.fireAuth.sendPasswordResetEmail(this.email).then((res:any) => {
      if (res.success) {
        this.showAlert('Email Sent', 'Please check your email and follow instructions to reset your password!');
        this.navCtrl.pop();
      } else {
        this.showAlert('Failed', '');
      }
    }).catch(err => {
      this.showAlert('Failed', err.message.replace('sendPasswordResetEmail failed: ', ''));
    });
  }

  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
