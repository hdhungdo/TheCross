import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, ToastController} from 'ionic-angular';
import { Usercreds } from "../../../models/usercreds";
import { StyleProvider } from "../../../providers/style/style";
import { DeviceProvider } from "../../../providers/device/device";
import { FirebaseAuthProvider } from "../../../providers/firebase-auth/firebase-auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  newUser = {} as Usercreds;
  cfPassword:string;

  constructor(public navCtrl: NavController, public style: StyleProvider,
              public device: DeviceProvider, public fireAuth: FirebaseAuthProvider,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

  }

  signUp() {
    if (this.newUser.displayName === '' || this.newUser.displayName === undefined) {
      this.showAlert('Failed', 'Nick Name cannot be empty!');
    } else if (this.cfPassword === this.newUser.password) {
      let loader = this.loadingCtrl.create();
      loader.present();
      this.fireAuth.addUser(this.newUser).then((res:any) => {
        loader.dismiss();
        if (res.success) {
          this.showToast('middle', `Congratulation! Your account was created`)
          this.navCtrl.pop();
        } else {
          this.showToast('middle', res);
        }
      }).catch(err => {
        loader.dismiss();
        this.showAlert('Failed', err.message.replace('createUserWithEmailAndPassword failed: ', ''));
      });
    } else {
      this.showAlert('Failed', 'Passwords do not match!');
    }

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

  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
